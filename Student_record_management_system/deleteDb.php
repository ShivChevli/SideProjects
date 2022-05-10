<?php 
    require_once("connection.php");
  
    $id = $_GET["id"];

    $sql = "DELETE FROM `student_record` WHERE `enrollment_no` = $id";
    
    echo $sql;
    $res = $con->query($sql);

    if($res){
        $redirect = "http://localhost/User-define/Wp_practical/Assignment_6_3/Student_record_management_system/";
        header('Location:'.$redirect);
    }
    else{
        echo "<br>Error". $res;
        var_dump($con->error);
    }
?>