<template>
    <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5" id="nevigation-path" >
        <li class="text-sm">
            <span class="opacity-5 text-dark" >Page </span>
        </li>    
        <li class="breadcrumb-item text-sm" v-for="item in path" :key="item.id">
            <RouterLink :to='getPath(item)' class="opacity-5 text-dark" >{{ capitalizeFirstLetter(item) }}</RouterLink>
        </li>
    </ol>
    <h6 class="font-weight-bolder mb-0" id="currentPage">{{ Heading }}</h6>
</template>
<script>
import { RouterLink, useRouter } from 'vue-router';

export default{
    name:"RouteDisplay",
    data(){
        return{
            path : [],
            Heading : ""
        }
    },
    methods:{
        setPath(){ 
            
            if( ! isNaN(this.path[this.path.length-1])){
                this.path.pop(this.length - 1);
            }
            this.Heading = this.capitalizeFirstLetter(this.path[this.path.length-1]);    
        },
        capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        getPath(data){
            return '/'+data;
        }
    },
    components: {
        RouterLink,
    },
    created(){
        useRouter().afterEach(rout=>{
            console.log("After each Function IS called for ");
            console.log(rout);
            console.log(rout.path);
            this.path = rout.path.split("/");
            this.setPath();
        })
    }
}
</script>