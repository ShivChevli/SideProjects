class StoreClass{
    storeToken(token){
        localStorage.setItem("token",token);
    }
    storeUser(user){
        localStorage.setItem('user',user);
    }
    storeData(token,user){
        this.storeToken(token);
        this.storeUser(user);
    }
    getToken(){
        return localStorage.getItem("token");
    }

}

export default { Store : new StoreClass()};
