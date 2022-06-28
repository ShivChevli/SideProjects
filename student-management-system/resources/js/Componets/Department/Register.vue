<template>
    <div>
        <router-link to="/department" class="btn btn-primary">
            Cancle
        </router-link>
    </div>
    <div class="card z-index-0">
        <div class="card-header text-center pt-4">
            <h5>Depaartment Registeation</h5>
        </div>
        <div class="row px-xl-5 px-sm-4 px-3">
        </div>
        <div class="card-body">
            <form role="form text-left" @submit.prevent="postData" method="post" enctype="multipart/form-data">
                <input type="hidden" v-if="form.id != ''" :value="form.id" name="id">
                <div class="mb-3">
                    <input type="text" class="form-control" v-model="form.name" name="name"
                        placeholder="Enter Department Name" aria-label="Name" aria-describedby="email-addon">
                </div>
                <div class="text-center">
                    <button type="submit" class="btn bg-gradient-dark w-100 my-4 mb-2">Register Department</button>
                </div>
                <!-- <p class="text-sm mt-3 mb-0">Already have an account? <a href="javascript:;" class="text-dark font-weight-bolder">Sign in</a></p> -->
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "DepartmentRegistrationFrom",
        data() {
            return {
                form: {
                    name: "",
                    id: '',
                },
                error: []
            }
        },
        methods: {
            postData() {
                axios.post('http://127.0.0.1:8000/api/department', this.form)
                    .then(({ data }) => {
                        console.log(data);
                        if (data.status == 200) {
                            swal({
                                title: "Department Register Sucessfuly",
                                // text: "Image File Must be less than 5 MB",
                                icon: "success",
                            });
                            this.$router.push("/department");
                        }
                    })
            }
        },
        created() {
            console.log(this.$route.params);

            if (this.$route.params.id != null) {
                this.form.id = this.$route.params.id;
                axios.get(`http://127.0.0.1:8000/api/department/${this.form.id}`)
                    .then(({ data }) => {
                        console.log(data);
                        if (data.status == 200) {
                            this.form = data.data;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    }
</script>
<style scoped>
    .card {
        max-width: 700px !important;
    }
</style>