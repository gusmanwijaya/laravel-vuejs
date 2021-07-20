<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Data Users</h3>
                        <div class="card-tools">
                            <button
                                class="btn btn-primary"
                                type="button"
                                data-toggle="modal"
                                data-target="#modalTambahUser"
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
                                        <td>Edit | Hapus</td>
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
            id="modalTambahUser"
            tabindex="-1"
            role="dialog"
            aria-labelledby="modalTambahUserTitle"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalTambahUserTitle">
                            Tambah User
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
                    <form @submit.prevent="simpanData()">
                        <div class="modal-body">
                            <div class="form-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Nama User"
                                    v-model="form.name"
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Email Address"
                                    v-model="form.email"
                                />
                            </div>
                            <div class="form-group">
                                <input
                                    type="password"
                                    class="form-control"
                                    placeholder="Password"
                                    v-model="form.password"
                                />
                            </div>
                            <div class="form-group">
                                <select
                                    name="level_id"
                                    id="level_id"
                                    class="form-control select2"
                                    v-model="form.level_id"
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
                            <button type="submit" class="btn btn-primary">
                                Tambah
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
            users: [],
            levels: [],
            form: new Form({
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
            let formData = {
                name: this.form.name,
                email: this.form.email,
                password: this.form.password,
                level_id: this.form.level_id
            };

            axios
                .post("http://laravel-vuejs.test/api/apiUsers", formData)
                .then(() => {
                    Refresh.$emit("refreshData");
                    $("#modalTambahUser").modal("hide");
                    Toast.fire({
                        icon: "success",
                        title: "Data berhasil disimpan!"
                    });
                })
                .catch(error => console.log(error));
        },
        showModal() {
            this.form.reset();
            $("#modalTambahUser").modal("show");
        }
    },
    mounted() {
        axios
            .get("http://laravel-vuejs.test/api/users")
            .then(res => this.loadData(res.data))
            .catch(error => console.log(error));

        Refresh.$on("refreshData", () => {
            axios
                .get("http://laravel-vuejs.test/api/users")
                .then(res => this.loadData(res.data))
                .catch(error => console.log(error));
        });

        axios
            .get("http://laravel-vuejs.test/api/level")
            .then(res => this.loadDataLevel(res.data))
            .catch(error => console.log(error));
    }
};
</script>
