<template>
<div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
            <div class="card z-index-0">
              <div class="card-header text-center pt-4">
                <h5>Register </h5>
              </div>
              <div class="card-body">
                <form role="form text-left" method="post" @submit.prevent="register">
                  <div class="mb-3">
                    <input type="text" class="form-control" name="name" v-model="from.name" placeholder="Name" aria-label="Name" aria-describedby="email-addon">
                  </div>
                  <div class="mb-3">
                    <input type="email" class="form-control" name="email" v-model="from.email" placeholder="Email" aria-label="Email" aria-describedby="email-addon">
                  </div>
                  <div class="mb-3">
                    <input type="password" class="form-control" name="password" v-model="from.password" placeholder="Password" aria-label="Password" aria-describedby="password-addon">
                  </div>
                  <div class="mb-3">
                    <input type="password" class="form-control" name="password_confirmation" v-model="from.password_confirmation" placeholder="Password" aria-label="Password" aria-describedby="password-addon">
                  </div>
                  <div class="form-check form-check-info text-left">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked="">
                    <label class="form-check-label" for="flexCheckDefault">
                      I agree the <a href="javascript:;" class="text-dark font-weight-bolder">Terms and Conditions</a>
                    </label>
                  </div>
                  <div class="text-center">
                    <button type="submit" class="btn bg-gradient-dark w-100 my-4 mb-2">Sign up</button>
                  </div>
                  <p class="text-sm mt-3 mb-0">Already have an account?  <router-link to="/login" class="text-dark font-weight-bolder">Sign in</router-link></p>
                </form>
              </div>
            </div>
          </div>
</template>

<script>
import axios from 'axios'
import User from '../helper/User';


export default{
    name:"Register",
    data(){
        return{
            from:{
                name:null,
                email:null,
                password:null,
                password_confirmation:null
            },
            error:{}
        }
    },
    methods:{
        register(){
            axios.post("/api/auth/signin",this.from)
            .then(({data})=>{
              swal({
                title: "Register Sucess",
                text: "You are SucessFuly Register to System",
                icon: "success",
              });
              console.log(data);
              this.$router.push("/");
            })
            .catch(error=>{
                console.log(error);
                this.error  =  error
            })
        }
    },
    beforeCreate(){
        if(User.isLogedIn()){
            this.$router.push("/");
        }
    }
}
</script>
