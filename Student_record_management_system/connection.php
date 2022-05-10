<?php
$con = new mysqli("localhost","root","","student");

if(mysqli_connect_error()){
    die("connection fail <br>" . mysqli_connect_error());
}

function FindGrade($total){
    $ans = "Fail";
    if($total >= 75){
        $ans = "Distinction";
    }
    else if ($total >= 55){
        $ans = "First Class";
    }
    else if ($total >= 45){
        $ans = "Second Class";
    }
    else if($total >= 35){
        $ans = "Third Class";
    }

    return $ans;
}