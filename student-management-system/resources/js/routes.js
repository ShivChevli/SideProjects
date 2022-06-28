// These can be imported from other files
const Home = require('./Componets/Home.vue').default;
const About = { template: '<div>About</div>' }
let Login = require("./Componets/Login.vue").default;
let Register = require("./Componets/Register.vue").default;
let LogOut = require("./Componets/LogOut.vue").default;

//Student Section
let StudentForm = require("./Componets/StudentManagement/StudentRegisterFrom.vue").default;
let StudentList = require("./Componets/StudentManagement/StudentList.vue").default;


//Department section
let DepartmentFrom = require("./Componets/Department/Register.vue").default;
let DepartmentList = require("./Componets/Department/index.vue").default;

export const routes = [
    { path: '/', component: Home , name:"home"},
    { path: '/about', component: About },
    { path: '/login', component: Login , name:"login"},
    { path: '/logout', component: LogOut , name:"logout"},
    { path: '/register', component: Register , name:"register"},
    
    //Student Detail
    { path: '/student', component: StudentList , name:"student_list"},
    { path: '/student/register', component: StudentForm , name:"student_register_form"},
    { path: '/student/edit/:id', component: StudentForm , name:"student_update_form"},


    //Department 
    { path: '/department', component : DepartmentList, name:"department"},
    { path: '/department/registration', component : DepartmentFrom, name:"departmentRegistrationFrom"},
    { path: '/department/edit/:id', component : DepartmentFrom, name:"departmentEditFrom"},
]