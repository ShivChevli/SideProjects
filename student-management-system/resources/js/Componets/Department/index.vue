<template>

    <div class="card my-4">
            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 class="text-white text-capitalize ps-3">Department List </h6>
              </div>
            </div>
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                        <th class="text-center text-uppercase  font-weight-bolder">Department Id</th>
                      <th class="text-uppercase font-weight-bolder ">Department Name</th>
                      <th class="text-uppercase font-weight-bolder ">Actino Tabs</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="items in recoreds" :key="items.id">
                      
                      <td class="align-middle  text-center">
                        <span class=" font-weight-bold text-dark">{{ items.id}}</span>
                      </td>
                      <td class="align-middle">
                        <span class=" font-weight-bold text-dark">{{ items.name}}</span>
                      </td>
                      <td>
                        <router-link :to="{name : 'departmentEditFrom', params:{ id:items.id }}" class="btn btn-primary">
                            Edit 
                        </router-link>
                        <button @click="deleterecord(items.id)" class="btn btn-outline-primary">
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
            <router-link to="/department/registration" class="btn btn-primary">
                Add New Record
            </router-link>
        </div>
</template>
<script>
import axios from 'axios'
export default{
    name:"department",
    data(){
        return {
            recoreds : []
        }
    },
    methods:{
        deleterecord(id){
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
                    axios.delete(`http://127.0.0.1:8000/api/department/${id}`)
                    .then(({data})=>{
                            if(data.status == 200){
                                swal({
                                title: "Record Deleted Sucessfully Sucessfuly",
                                icon: "success",
                            });
                            this.recoreds = this.recoreds.filter(data => data.id != id);
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
        },  
                
    },
    created(){
        axios.get("http://127.0.0.1:8000/api/department")
        .then(({data})=>{
            console.log("Data")
            console.log(data);
            this.recoreds = data.data;
        })
        .catch(error=>{
            console.log(error);
            console.log(error.response.error);
        })
    }
}
</script>

<style>
.card{
    /* width: 800px !important; */
    margin: 20px auto;
}
</style>