<?php 
    require_once("connection.php");
  
    $enroll_no = $_POST["enroll_no"];
    $name = $_POST["name"];
    $AJP = $_POST["AJP"];
    $MI = $_POST["MI"];
    $TOC = $_POST["TOC"];
    $DV = $_POST["DV"];
    $WP = $_POST["WP"];

    $total = ($AJP + $MI + $TOC + $WP + $DV ) / 5;
    $grade = FindGrade($total);


    $sql = "UPDATE `student_record` SET `name`='$name',`AJP`='$AJP',`MI`='$MI', `TOC`=$TOC, `WP`=$WP, `DV`=$DV, `Grade`='$grade' WHERE `enrollment_no`=$enroll_no";
    echo $sql;
    
    $res = $con->query($sql);

    if($res){
        $redirect = "http://localhost/User-define/Wp_practical/Assignment_6_3/Student_record_management_system/home.php";
        header('Location:'.$redirect);
    }
    else{
        echo "<br>Error". $res;
        var_dump($con->error);
    }
?>