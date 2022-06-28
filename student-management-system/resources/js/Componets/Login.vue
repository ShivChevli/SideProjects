<template>
    <div class="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
        <div class="card card-plain mt-8">
        <div class="card-header pb-0 text-left bg-transparent">
            <h3 class="font-weight-bolder text-info text-gradient">Welcome back</h3>
            <p class="mb-0">Enter your email and password to sign in</p>
        </div>
        <div class="card-body">
            <form role="form" method="post" @submit.prevent="login">
            <label>Email</label>
            <div class="mb-3">
                <input type="email" v-model="from.email" class="form-control" @change="logChange" placeholder="Email" aria-label="Email" aria-describedby="email-addon">
            </div>
            <label>Password</label>
            <div class="mb-3">
                <input type="password" v-model="from.password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="password-addon">
            </div>
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="rememberMe">
                <label class="form-check-label" for="rememberMe">Remember me</label>
            </div>
            <div class="text-center">
                <button type="submit" class="btn bg-gradient-info w-100 mt-4 mb-0">Sign in</button>
            </div>
            </form>
        </div>
        <div class="card-footer text-center pt-0 px-lg-2 px-1">
            <p class="mb-4 text-sm mx-auto">
            Don't have an account?
            <router-link to="/register"  class="text-info text-gradient font-weight-bold">
                    Sign up
            </router-link>>
            </p>
        </div>
        </div>
    </div>
</template>

<script>
import User from '../helper/User';

export default{
    name:"Login",
    data(){
        return{
            from:{
                email: '',
                password: '',
            },
            error :{}
        }
    },
    methods:{
        logChange(){
            console.log(this.email);
        },
        login(){
            axios.post("/api/auth/login",this.from)
            .then(({data})=>{
                console.log(data);
                if(User.storeUser(data)){
                    console.log("sucess")
                    // Msg.SucessMsg("You are SucessFuly Login to System","Login Sucess");
                    swal({
                        title: "Login Sucess",
                        text: "You are SucessFuly Login to System",
                        icon: "success",
                    });
                    this.$router.push('/');
                }
                else{
                    console.log('error');
                    this.error={
                        msg: "Token is not Stored",
                    }
                }
            })
            .catch((error)=>{
                let errorData = error.response.data;
                console.log("Error :- ");

                console.log(errorData.error);
                // console.log(JSON.parse(errorData.error));
                this.error  =  errorData;
                swal({
                        title: errorData.error,
                        icon: "warning",
                    });
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
