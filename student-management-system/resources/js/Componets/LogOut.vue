<template>
</template>
<script>
import User from '../helper/User'


export default{
    name:"LogOut",
    created(){
        console.log("Logout Called");
        User.clearUser();
        this.$router.push("/login");
    }
}
</script>