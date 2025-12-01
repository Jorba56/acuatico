<?php
include "243biblioteca.php";
$array=[sumar($_GET['num1'],$_GET['num2']),restar($_GET['num1'],$_GET['num2']),multiplicar($_GET['num1'],$_GET['num2']),dividir($_GET['num1'],$_GET['num2'])];
print_r $array;
?>