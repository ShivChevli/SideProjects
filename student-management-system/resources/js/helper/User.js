let Token = require('./Token');
let StoreHapler = require('./Store');

class User{
    isLogedIn(){
        console.log(StoreHapler);
        
        if(this.getToken() == null){
            return false;
        }
        return true;
    }


    storeUser(data){
        let user = data.user;
        let token = data.access_token;
        console.log(this.isValid(token));
        if(this.isValid(token)){
            this.storeData(token,user);
            document.querySelector(".login-div").style.display="none";
            document.querySelector(".logout-div").style.display="flex";
            return true;
        }
        return false;
    }

    clearUser(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        document.querySelector(".login-div").style.display="flex";
        document.querySelector(".logout-div").style.display="none";   
    }

    isValid(token){
        let payload = this.payload(token);
        if(payload){
            return payload.iss = "http://127.0.0.1:8000/login" ? true : false; 
        }
    }
    payload(token){
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    }


    storeData(token,user){
        localStorage.setItem('user',user);
        localStorage.setItem('token',token);
    }
    getToken(){
        return localStorage.getItem("token")
    }
    getUserName(){
        return localStorage.getItem("user");
    }
}

export default User = new User();
