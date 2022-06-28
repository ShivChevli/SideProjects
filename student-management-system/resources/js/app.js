import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

//Dependency Of Root Componentes
import {createApp} from 'vue';
import { createRouter, createWebHistory, useRouter , RouterLinkProps} from 'vue-router';
import swal from 'sweetalert';
import { routes } from './routes';

//Global Accesse Components 
window.User = require('./helper/User');
window.swal = swal;
window.Path = "Dashboard";

//Dependency Components
let RouteDisplay = require("./Componets/RouteDisplay.vue").default;
let SideNevigation = require("./Componets/SideNevigation.vue").default;


//Export EventBus Component For heandaling Events 
export const busEvent = createApp({});


const router = createRouter({
    history: createWebHistory(),
    routes: routes, // short for `routes: routes`
  });

let app = createApp({
  components: {
    RouteDisplay,
    SideNevigation,
  },
  data(){
    return {
      activeLink :"",
    }
  },
  methods:{
    change(data){
      console.log('changeFunction Call');
      console.log(data);
      document.querySelector(`#${data}`).classList.add('active');
    }
  } 
});
app.use(router);
app.mount("#app");
