<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Data Users</h3>
                        <div class="card-tools">
                            <button
                                class="btn btn-sm btn-primary"
                                type="button"
                                data-toggle="modal"
                                data-target="#modal"
                                @click="showModal()"
                            >
                                Tambah User
                            </button>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="form-group">
                            <div class="table-responsive">
                                <table class="table">
                                    <tr>
                                        <th>Nama User</th>
                                        <th>Email</th>
                                        <th>Level</th>
                                        <th>Aksi</th>
                                    </tr>
                                    <tr v-for="user in users" :key="user.id">
                                        <td>{{ user.name }}</td>
                                        <td>{{ user.email }}</td>
                                        <td>{{ user.level.nama_level }}</td>
                                        <td>
                                            <button
                                                data-toggle="modal"
                                                data-target="#modal"
                                                @click="showModalEdit(user)"
                                                type="button"
                                                class="btn btn-sm btn-warning"
                                            >
                                                <i class="fas fa-edit"></i> Edit
                                            </button>

                                            <button
                                                @click="deleteData(user.id)"
                                                type="button"
                                                class="btn btn-sm btn-danger"
                                            >
                                                <i class="fas fa-trash-alt"></i>
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div
            class="modal fade"
            id="modal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="modalTitle"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalTitle">
                            {{ statusModal ? "Edit" : "Tambah" }} User
                        </h5>
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form
                        @submit.prevent="
                            statusModal ? editData() : simpanData()
                        "
                    >
                        <div class="modal-body">
                            <div class="form-group">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    class="form-control"
                                    placeholder="Nama User"
                                    v-model="form.name"
                                    :class="{
                                        'is-invalid': form.errors.has('name')
                                    }"
                                />
                                <HasError :form="form" field="name" />
                            </div>
                            <div class="form-group">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    class="form-control"
                                    placeholder="Email Address"
                                    v-model="form.email"
                                    :class="{
                                        'is-invalid': form.errors.has('email')
                                    }"
                                />
                                <HasError :form="form" field="email" />
                            </div>
                            <div class="form-group">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    class="form-control"
                                    placeholder="Password"
                                    v-model="form.password"
                                    :class="{
                                        'is-invalid': form.errors.has(
                                            'password'
                                        )
                                    }"
                                />
                                <HasError :form="form" field="password" />
                            </div>
                            <div class="form-group">
                                <select
                                    name="level_id"
                                    id="level_id"
                                    class="form-control select2"
                                    v-model="form.level_id"
                                    :class="{
                                        'is-invalid': form.errors.has(
                                            'level_id'
                                        )
                                    }"
                                >
                                    <option value=""></option>
                                    <option
                                        :value="level.id"
                                        v-for="level in levels"
                                        :key="level.id"
                                    >
                                        {{ level.nama_level }}
                                    </option>
                                </select>
                                <HasError :form="form" field="level_id" />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                class="btn"
                                :disabled="disabled"
                                :class="
                                    statusModal ? 'btn-warning' : 'btn-primary'
                                "
                            >
                                <i
                                    v-show="loading"
                                    class="fa fa-spinner fa-spin"
                                ></i>
                                {{ statusModal ? "Edit" : "Tambah" }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "DataUsers",
    data() {
        return {
            loading: false,
            disabled: false,
            statusModal: false,
            users: [],
            levels: [],
            form: new Form({
                id: "",
                name: "",
                email: "",
                password: "",
                level_id: ""
            })
        };
    },
    methods: {
        loadData(data) {
            this.users = data;
        },
        loadDataLevel(data) {
            this.levels = data;
        },
        simpanData() {
            this.$Progress.start();
            this.loading = true;
            this.disabled = true;

            let formData = {
                name: this.form.name,
                email: this.form.email,
                password: this.form.password,
                level_id: this.form.level_id
            };

            this.form
                .post("http://laravel-vuejs.test/api/apiUsers", formData)
                .then(() => {
                    Refresh.$emit("refreshData");
                    $("#modal").modal("hide");
                    Toast.fire({
                        icon: "success",
                        title: "Data berhasil disimpan!"
                    });
                    this.$Progress.finish();
                    this.loading = false;
                    this.disabled = false;
                })
                .catch(() => {
                    this.$Progress.fail();
                    this.loading = false;
                    this.disabled = false;
                });
        },
        editData() {
            this.$Progress.start();
            this.loading = true;
            this.disabled = true;

            let formData = {
                name: this.form.name,
                email: this.form.email,
                password: this.form.password,
                level_id: this.form.level_id
            };

            this.form
                .put(
                    "http://laravel-vuejs.test/api/apiUsers/" + this.form.id,
                    formData
                )
                .then(() => {
                    Refresh.$emit("refreshData");
                    $("#modal").modal("hide");
                    Toast.fire({
                        icon: "success",
                        title: "Data berhasil diedit!"
                    });
                    this.$Progress.finish();
                    this.loading = false;
                    this.disabled = false;
                })
                .catch(() => {
                    this.$Progress.fail();
                    this.loading = false;
                    this.disabled = false;
                });
        },
        deleteData(id) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success ml-2",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });

            swalWithBootstrapButtons
                .fire({
                    title: "Apakah kamu ingin menghapus data?",
                    text: "Data yang sudah terhapus tidak dapat dikembalikan!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Ya, hapus!",
                    cancelButtonText: "Tidak, batal!",
                    reverseButtons: true
                })
                .then(result => {
                    if (result.isConfirmed) {
                        this.$Progress.start();

                        this.form
                            .delete(
                                "http://laravel-vuejs.test/api/apiUsers/" + id
                            )
                            .then(() => {
                                swalWithBootstrapButtons.fire(
                                    "Terhapus!",
                                    "Data berhasil dihapus.",
                                    "success"
                                );
                                this.$Progress.finish();
                                Refresh.$emit("refreshData");
                            })
                            .catch(() => {
                                swalWithBootstrapButtons.fire(
                                    "Gagal!",
                                    "Data gagal dihapus.",
                                    "error"
                                );
                                this.$Progress.fail();
                            });
                    } else {
                        swalWithBootstrapButtons.fire(
                            "Batal!",
                            "Data tidak jadi dihapus :)",
                            "error"
                        );
                    }
                });
        },
        showModal() {
            this.statusModal = false;
            this.form.reset();
            $("#modal").modal("show");
        },
        showModalEdit(user) {
            this.statusModal = true;
            this.form.reset();
            $("#modal").modal("show");
            this.form.fill(user);
        }
    },
    mounted() {
        this.$Progress.start();
        axios
            .get("http://laravel-vuejs.test/api/apiUsers")
            .then(res => this.loadData(res.data))
            .catch(error => console.log(error));

        Refresh.$on("refreshData", () => {
            axios
                .get("http://laravel-vuejs.test/api/apiUsers")
                .then(res => this.loadData(res.data))
                .catch(error => console.log(error));
        });
        this.$Progress.finish();

        axios
            .get("http://laravel-vuejs.test/api/level")
            .then(res => this.loadDataLevel(res.data))
            .catch(error => console.log(error));
    }
};
</script>
