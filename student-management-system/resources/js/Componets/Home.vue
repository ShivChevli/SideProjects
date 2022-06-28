<template>
    <div class="card mt-4 mb-1" v-for="key,value in data">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
          <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
            <h6 class="text-white text-capitalize ps-3">{{value}}</h6>
          </div>
        </div>
        <div class="card-body px-0">
          <div class="table-responsive p-0">
            <table class="table align-items-center">
              <thead>
                <tr>
                  <th class="text-uppercase text-xxs font-weight-bolder opacity-7 ">Profile</th>
                  <th class="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2 ">First Name</th>
                  <th class="text-center text-uppercase text-xxs font-weight-bolder opacity-7 ">Last Name</th>
                  <th class="text-center text-uppercase text-xxs font-weight-bolder opacity-7 ">Department Name</th>
                  <th class="opacity-7 text-white opacity-8"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="items in key">
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div>
                        <img :src="items.profile_img" class="avatar avatar-sm me-3 border-radius-lg" style="width: 50px !important; height: 50px !important;" alt="user1">
                      </div>
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">{{ items.first_name }} {{ items.last_name }}</h6>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle text-center">
                    <span class=" font-weight-bold text-dark">{{ items.first_name}}</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class=" font-weight-bold text-dark">{{ items.last_name}}</span>
                  </td>
                  <td class="align-middle">
                    {{   items.name }}
                  </td>
                </tr>
               
              </tbody>
            </table>
          </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import User from '../helper/User'

export default{
    name:"Home",
    data(){
      return{
        data:""
      }
    },
    methods:{
      fetchData(){
        axios.get('http://127.0.0.1:8000/api/Student/dasbord_data')
        .then(({data})=>{
          console.log(data)
          this.data = data
        })
      }
    },
    created(){
        if(!User.isLogedIn()){
            this.$router.push("/login")
        }
        this.fetchData();
    }

}
</script>

<style>
.btn{
    margin: 30px 50px;
}
</style>