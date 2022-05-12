# Student Record Management System

Simple PHP Application Which provide Graphical user interface for CRUD opration in MySql Database. This application use PHP 7.4.4 and MySql in XAMPP version .


You can download XAMPP from following website "https://www.apachefriends.org/index.html"


## User Guide 

One can use this in there local machince by Simpliy download the souce code and place this code in htdocs foulder and in code replce "redirect" variable value with your Own home.php file path in deleteDb.php, updateDb.php and insertDb.php files. 

## Database configuration 

In database part, create student database in MySql. In student database create student_record data-table by executing following sql query in MySql CLI. 

### Database table Structer

```cmd
CREATE TABLE `student`.`student_record` ( `enrollment_no` INT NOT NULL AUTO_INCREMENT ,  `name` VARCHAR(32) NOT NULL ,  `AJP` INT NOT NULL ,  `MI` INT NOT NULL ,  `TOC` INT NOT NULL ,  `WP` INT NOT NULL ,  `DV` INT NOT NULL ,  `Grade` VARCHAR(32) NOT NULL ,    PRIMARY KEY  (`enrollment_no`)) ENGINE = InnoDB;
```

## Run application

To run application, first start apache web-server and MySql database server. 

After that Go through web-url : "http://localhost/Student_record_management_system/" and Good to go. 