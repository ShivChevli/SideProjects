<?php 
    require_once("connection.php");
  
    $enroll_no = $_POST["enroll_no"];
    $name = $_POST["name"];
    $AJP = $_POST["AJP"];
    $MI = $_POST["MI"];
    $TOC = $_POST["TOC"];
    $DV = $_POST["DV"];
    $WP = $_POST["WP"];

    // echo $name." : ". $department. " : ".$designation."<hr>";

    $total = ($AJP + $MI + $TOC + $WP + $DV ) / 5;
    $grade = FindGrade($total);

    $sql = "INSERT INTO `student_record`(`enrollment_no`, `name`, `AJP`, `MI`, `TOC`, `WP`, `DV`, `Grade`)  VALUES ('".$enroll_no."','".$name."', '".$AJP."', '".$MI."', '".$TOC."', '".$WP."', '".$DV."', '".$grade."')";
    echo $sql;

    echo $total . "\n";

    echo $grade;
    $res = $con->query($sql);

    if($res){
        $redirect = "http://localhost/User-define/Wp_practical/Assignment_6_3/Student_record_management_system/";
        header('Location:'.$redirect);
    }
    else{
        echo "Error". $res;
        var_dump($con->error);
    }
?>