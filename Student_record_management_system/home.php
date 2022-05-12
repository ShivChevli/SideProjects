<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Record Management System</title>
    <link rel="stylesheet" href="main.css">
</head>

<body>
    <main>
        <h1>Welcome to Student Record Management System</h1>
        <h2 class="heading2">Student Record</h2>
        <table border=1>
            <tr>
                <th>Enrollment Number</th>
                <th>Student Name</th>
                <th>AJP</th>
                <th>TOC</th>
                <th>MI</th>
                <th>WP</th>
                <th>DV</th>
                <th>Grade</th>
                <th>Edite</th>
                <th>Delete</th>
            </tr>
            <?php 
                require_once("selectDb.php");
            ?>
        </table>

        <footer>
            <a class="activate" href="dataInsrtFrom.php">Insert Data</a>
        </footer>
    </main>
</body>
<script>
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", function (event) {
            if (!confirm("Do you want to delete This record ?")) {
                event.preventDefault();
            }
        });
    })
</script>
</html>