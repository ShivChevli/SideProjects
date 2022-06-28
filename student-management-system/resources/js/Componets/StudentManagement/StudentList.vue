<template>
    <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 class="text-white text-capitalize ps-3">Student List </h6>
              </div>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                        <th class="text-center text-uppercase  font-weight-bolder">Profile</th>
                      <th class="text-uppercase font-weight-bolder ">First Name</th>
                      <th class="text-uppercase font-weight-bolder ">Last Name</th>
                      <th class="text-center text-uppercase  font-weight-bolder ">Department Name</th>
                      <th class="text-center text-uppercase  font-weight-bolder ">Action tab</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="items in data" :key="items.id">
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
                        {{  items.name }}
                      </td>
                      <td>
                        <router-link :to="items.edit_url" class="btn btn-primary">
                            Edit 
                        </router-link>
                        <button @click="deleteItem(items.id)" class="btn btn-outline-primary">
                            Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        <div>
            <router-link to="/Student/register" class="btn btn-primary">
                Add New Record
            </router-link>
        </div>
</template>
<script>
import axios from 'axios'
import { busEvent } from '../../app'
import { RouterLink } from 'vue-router'

export default{
    name:"StudentList",
    data(){
        return {
            data : [],
        }
    },
    methods:{
        getAll(){
            axios.get("http://127.0.0.1:8000/api/Student/")
            .then(({data})=>{
                console.log(data);
                this.data = data.data;   
                this.data = data.data.map(myData =>{ 
                  console.log(myData.id);
                  let edit_url = '/student/edit/' + myData.id;
                  myData['edit_url'] = edit_url;
                  return myData
            });
            })
            .catch(error=>{
                swal({
                    title: error,
                    icon: "warning",
                    });
            })
        },
        deleteItem(id){
            console.log(id);
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    axios.delete(`http://127.0.0.1:8000/api/Student/delete/${id}`)
                    .then(({data})=>{
                            if(data.status == 200){
                                swal({
                                title: "Record Deleted Sucessfully Sucessfuly",
                                // text: "Image File Must be less than 5 MB",
                                icon: "success",
                            });
                            this.data = this.data.filter(data => data.id != id);
                        }
                    })
                    .catch(error=>{
                        console.log(error);
                        swal({
                            title: "Something went Wrong",
                            // text: "Image File Must be less than 5 MB",
                            icon: "warning",
                        });
                    })
                } 
                });
        }
    },
    emits:[
      'routePara'
    ],
    created(){
        this.getAll();
    }

}
</script>
<style scoped>
td,th{
    color: #000 !important;
}
.btn{
    margin: 10px 20px;
}
</style>