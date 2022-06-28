<template>

    <div>
        <router-link to="/student" class="btn btn-primary">
            Cancle
        </router-link>
    </div>
<div class="card z-index-0">
    <div class="card-header text-center pt-4">
    <h5>Student Registeation</h5>
    </div>
     <div class="row px-xl-5 px-sm-4 px-3">
    </div>
    <div class="card-body">
    <form role="form text-left" @submit.prevent="postData" method="post" enctype="multipart/form-data">
        <input type="hidden" v-if="form.id != ''" :value="form.id" name="id">
        <div class="mb-3">
        <input type="text" class="form-control" v-model="form.f_name" name="first_name" placeholder="First Name" aria-label="Name" aria-describedby="email-addon">
        </div>
        <div class="mb-3">
        <input type="text" class="form-control" v-model="form.l_name" name="last_name" placeholder="Last Name" aria-label="Name" aria-describedby="email-addon">
        </div>  
        <div class="mb-3">
        <select class="form-control" v-model="form.department_id" name="department_id" placeholder="Select Department Optiion" aria-label="Name" aria-describedby="email-addon">
            <option value=""  > Select Department</option>
            <option class="from-control" :value="item.id" v-for="item in department_options" :key="item.id"> {{ item.name}}</option>
        </select>
        </div>  
        <div class="mb-3">
        <input type="file" class="form-control" @change="updateImg" name="profile_img" placeholder="Image" aria-label="Email" aria-describedby="email-addon">
        </div>
        <div v-if="old_img != ''? true : false" class="img-div">
            <img :src="old_img" alt="" width="200" height="200">
        </div>
        <div class="text-center">
        <button type="submit" class="btn bg-gradient-dark w-100 my-4 mb-2">Register Student</button>
        </div>
        <!-- <p class="text-sm mt-3 mb-0">Already have an account? <a href="javascript:;" class="text-dark font-weight-bolder">Sign in</a></p> -->
    </form>
    </div>
</div>
</template>


<script>
import { file } from '@babel/types';
import axios from 'axios'

export default{
    name:"StudentRegisterFrom",
    data(){
        return{
            form : {
                f_name:"",
                l_name:"",
                profile_img : "",
                department_id :"",
                id: "",
            },
            department_options : [],
            error :{},
            old_img:"",
            isUpdate : this.$route.path.includes('edit'),
            // isUpdate : this.$route.path.split('/'),
        }
    },
    methods:{
        postData(){
            console.log("Form Submitted")
            axios.post('http://127.0.0.1:8000/api/Student/register', this.form)
            .then(({data})=>{
                console.log(data);
                console.log("From Submiited");
                swal({
                    title: "Student Register Sucessfuly",
                    // text: "Image File Must be less than 5 MB",
                    icon: "success",
                  });
                this.$router.push("/Student");
            })
            .catch(error=>{
                this.error = error.data;
            })  
            .catch(error=>{
                swal({
                title: "Sothing Went Wrong",
                icon: "error",
              });
            });
        },
        updateImg(event){
            console.log(event );
            console.log(this.form);
            let file = event.target.files[0];
            if(file.size > (1024*1024*50)){
                swal({
                title: "File Size excessed",
                text: "Image File Must be less than 5 MB",
                icon: "warning",
              });
            }else{
                let fileReader = new FileReader();
                fileReader.onload = event =>{
                    this.form.profile_img = event.target.result;
                    this.old_img = event.target.result;
                    console.log("From Submitted");
                }
                fileReader.readAsDataURL(file);
            }
        }
    },
    created(){
        if(this.isUpdate){
            // window.Path = "Student";
            console.log("created method Calle");
            let id = this.$route.path.split('/')[3];
            this.form.id = id;
            console.log(`Student/update/${id}`);
            axios.get(`http://127.0.0.1:8000/api/Student/update/${id}`)
            .then(({data})=>{
                console.log(data);
                if(data.status == 200){
                    this.form.f_name = data.data.first_name;
                    this.form.l_name = data.data.last_name;
                    this.form.department_id     = data.data.department_id;
                    this.old_img = '/' + data.data.profile_img;
                }
                else{
                    swal({
                        title: "Id Not Found",
                        icon: "warning",
                        });
                }
            })
            .catch(error=>{
                swal({
                title: "Error",
                text: error.data,
                icon: "warning",
              });
            });
        };

        axios.get("http://127.0.0.1:8000/api/department")
        .then(({data})=>{
            console.log("department Fetch Data");
            console.log(data);
            this.department_options = data.data;
        })
        .catch(error=>{
            console.log("error");
        })
    }
}
</script>

<style scoped>
.img-div{
    text-align: center;
}
    img{
        margin: 10px auto;
        text-align: center;
    }
    .card{
        width: 800px !important;
        margin: 20px auto;
    }
    .btn{
        margin: 20px 50px !important;
    }
</style>