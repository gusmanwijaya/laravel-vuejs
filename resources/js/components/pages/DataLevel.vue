<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Data Level</h3>
                        <div class="card-tools">
                            <button
                                class="btn btn-sm btn-primary"
                                type="button"
                                data-toggle="modal"
                                data-target="#modal"
                                @click="showModal()"
                            >
                                Tambah Level
                            </button>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="form-group">
                            <div class="table-responsive">
                                <table class="table">
                                    <tr>
                                        <th>Nama Level</th>
                                        <th>Aksi</th>
                                    </tr>
                                    <tr v-for="level in levels" :key="level.id">
                                        <td>{{ level.nama_level }}</td>
                                        <td>
                                            <button
                                                data-toggle="modal"
                                                data-target="#modal"
                                                type="button"
                                                class="btn btn-sm btn-warning"
                                                @click="showModalEdit(level)"
                                            >
                                                <i class="fas fa-edit"></i>
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                class="btn btn-sm btn-danger"
                                                @click="destroy(level.id)"
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
                            {{ statusModal ? "Edit" : "Tambah" }} Level
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
                    <form @submit.prevent="statusModal ? update() : store()">
                        <div class="modal-body">
                            <div class="form-group">
                                <input
                                    id="nama_level"
                                    name="nama_level"
                                    type="text"
                                    class="form-control"
                                    placeholder="Nama Level"
                                    v-model="form.nama_level"
                                    :class="{
                                        'is-invalid': form.errors.has(
                                            'nama_level'
                                        )
                                    }"
                                />
                                <HasError :form="form" field="nama_level" />
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
    name: "DataLevel",
    data() {
        return {
            levels: [],
            loading: false,
            disabled: false,
            statusModal: false,
            form: new Form({
                id: "",
                nama_level: ""
            })
        };
    },
    methods: {
        readData(data) {
            this.levels = data;
        },
        store() {
            this.$Progress.start();

            this.loading = true;
            this.disabled = true;

            let formData = {
                nama_level: this.form.nama_level
            };

            this.form
                .post("http://laravel-vuejs.test/api/level/store", formData)
                .then(() => {
                    Refresh.$emit("refreshData");
                    $("#modal").modal("hide");
                    Toast.fire({
                        icon: "success",
                        title: "Data berhasil ditambah!"
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
        update() {
            this.$Progress.start();

            this.loading = true;
            this.disabled = true;

            let formData = {
                nama_level: this.form.nama_level
            };

            this.form
                .put(
                    "http://laravel-vuejs.test/api/level/" +
                        this.form.id +
                        "/update",
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
        destroy(id) {
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
                                "http://laravel-vuejs.test/api/level/" +
                                    id +
                                    "/destroy"
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
                                    "Data gagal dihapus karena data level masih digunakan di data users.",
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
        showModalEdit(level) {
            this.statusModal = true;
            this.form.reset();
            $("#modal").modal("show");
            this.form.fill(level);
        }
    },
    mounted() {
        this.$Progress.start();
        axios
            .get("http://laravel-vuejs.test/api/level/index")
            .then(result => this.readData(result.data))
            .catch(error => console.log(error));

        Refresh.$on("refreshData", () => {
            axios
                .get("http://laravel-vuejs.test/api/level/index")
                .then(result => this.readData(result.data))
                .catch(error => console.log(error));
        });
        this.$Progress.finish();
    }
};
</script>
