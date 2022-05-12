<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Insert From</title>
    <link rel="stylesheet" href="style.css">
    <style>
        main{
            width:600px;
        }
    </style>
</head>

<body>
    <?php
        $enroll_no = 0;
        $AJP = 0;
        $MI = 0;
        $TOC = 0;
        $DV = 0;
        $WP = 0;
        $name="";
        $target = "insertDb.php";
        $title = "Insert";

        if(isset($_GET["id"])){
            require_once("connection.php");
            $id = $_GET["id"];
            $sql = "SELECT * FROM `student_record` WHERE `enrollment_no`=".$_GET["id"];
            $res = $con->query($sql);
            if($row = $res->fetch_array()){
                // echo "Data Fetch";
                $enroll_no = $_GET["id"];
                $name = $row["name"];
                $AJP = $row["AJP"];
                $TOC = $row["TOC"];
                $MI = $row["MI"];
                $DV = $row["DV"];
                $WP = $row["WP"];
                $target= "updateDb.php";

                $title = "Update ";
            }
        }
        // echo "$id : $name : $department : $designation";
    ?>
    <main>
        <h1> <?= $title ?> Student Record <?php 
            if($enroll_no != 0){
                echo "for Enrollment Number " . $enroll_no;
            }
        ?></h1>
        <form method="post" action="<?= $target ?>">

            <div style="display: 
                <?php 
                    if($enroll_no != 0){
                        echo "none";
                    }
                    else{
                        echo "block";
                    }
                ?>
            ;">
                <label for="enroll_no">Enrollment Number : </label>
                <input type="number" name="enroll_no" value="<?= $enroll_no ?>"> <br>
            </div>

            <div>
                <label for="name">Name: </label>
                <input type="text" name="name" value="<?= $name ?>"> <br>
            </div>

            <div>
                <label for="AJP">AJP Marks : </label>
                <input type="number" max=100 min=0 name="AJP" value="<?= $AJP ?>">
            </div>

            <div>
                <label for="TOC">TOC Marks : </label>
                <input type="number" max=100 min=0 name="TOC" value="<?= $TOC ?>">
            </div>
            <div>
                <label for="MI">MI Marks : </label>
                <input type="number" max=100 min=0 name="MI" value="<?= $MI ?>">
            </div>
            <div>
                <label for="WP">WP Marks : </label>
                <input type="number" max=100 min=0 name="WP" value="<?= $WP ?>">
            </div>
            <div>
                <label for="DV">DV Marks : </label>
                <input type="number" max=100 min=0 name="DV" value="<?= $DV ?>">
            </div>
            <button class="btn"><?= $title ?></button>
        </form>
    </main>
</body>

</html>