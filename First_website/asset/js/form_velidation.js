function fmvd()
{    
    var lname = document.getElementById('ln').value;
    var mo_number = document.getElementById('mo_no').value;
    var e_mail_add = document.getElementById('e_id').value;
    var fname = document.getElementById('fn').value;
    var pass = document.getElementById('pwd').value;
    var lo = document.getElementById('loc').value;

    if(fname=="")
    {
        alert("Enter Your Name");
        document.getElementById('fn').focus();
        return false;
    }
    var fnpatt = /^[a-zA-Z]{2,7}$/; 
    if(!fnpatt.test(fname))
    {
        alert("your Name should not contain any number\nIt's contain only Charactor");
        document.getElementById('fn').focus();
        return false;
    }
    if(lname=="")
    {
        alert("Enter last Name");
        document.getElementById('ln').focus();
        return false;
    }

    var lnpatt = /^[a-zA-Z]{2,7}$/; 

    if(!lnpatt.test(lname))
    {
        alert("your Last name should not contain any number\nIt's contain only Charactor");
        document.getElementById('ln').focus();
        return false;
    }

    if(mo_number=="")
    {
        alert("Enter Your Modile Number");
        document.getElementById('mo_no').focus();
        return false;
    }
    
    var mopatt = /^[0-9]{10}$/; 

    if(!mopatt.test(mo_number))
    {
        alert("Your Number must be in 10 degites only");
        document.getElementById('mo_no').focus();
        return false;
    }
    
    if(e_mail_add=="")
    {
        alert("Enter Your E-mail ID");
        document.getElementById('e_id').focus();
        return false;
    }
    var mailpatt = /^[a-z0-9._-]{3,15}@[a-z]{3,7}\.[a-z]{2,5}$/;

    if(!mailpatt.test(e_mail_add))
    {
        alert("Enter Your Email Id properly");
        document.getElementById('e_id').focus();
        return false;    
    }
    if(pass=="")
    {
        alert("Set Your Password");
        document.getElementById('pwd').focus();
        return false;    
    }
    var passpatt = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!$%^&*-_#@])[a-zA-Z0-9!@#$%^&*]{2,17}$/;

    if(!passpatt.test(pass))
    {
        alert("Your Passeord must be contain one Capital letter,one Number,One spcial Charector\nIt's length must be In between 7 to 15");
        document.getElementById('pwd').focus();
        return false;    
    }
    if(lo==0)
    {    
        alert("Set Your Location");
        document.getElementById('loc').focus();
        return false;    
    }
}