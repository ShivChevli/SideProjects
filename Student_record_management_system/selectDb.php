<?php

    require_once("connection.php");

    $sql = "SELECT * FROM `student_record`";
    $res = $con->query($sql);
    if($res){
    while($row = $res->fetch_array()){
        echo "<tr> <td>" . $row['enrollment_no'] . "</td> <td>" . $row['name'] . "</td> <td>" . $row['AJP'] . "</td> <td>" . $row["TOC"] . "</td> <td>". $row["MI"]. "</td> <td>" . $row["WP"] . "</td> <td>" . $row['DV'] . "</td> <td>"  . $row['Grade'] . "</td><td><a href='dataInsrtFrom.php?id=". $row['enrollment_no']."'> Edit </a></td>";
        echo "<td><form action='deleteDb.php'><input type='hidden' name='id' value=". $row['enrollment_no'] ."><button type='submit' class='btn bg-danger'>Delete</button> </form> </td></tr>";
    }
    }
    else{
        echo $con->error;
    }
    $con->close();