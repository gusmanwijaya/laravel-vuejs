<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Data Level</div>

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
                                        <td>Edit | Hapus</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
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
            levels: []
        };
    },
    methods: {
        loadData(data) {
            this.levels = data;
        }
    },
    mounted() {
        axios
            .get("http://laravel-vuejs.test/api/level")
            .then(res => this.loadData(res.data))
            .catch(err => console.log(err));
    }
};
</script>
