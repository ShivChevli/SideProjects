class TokenClass{

    isValid(token){
        let t = token.split('.')[0];
        if(t.iss == 'http://127.0.0.1:8000/login'){
            return true;
        }
        return false;
    }

}

export default {
    Token : new TokenClass()
};