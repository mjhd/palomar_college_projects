<?php
$Fname = $_POST["Fname"];
$Lname = $_POST["Lname"];
$gender = $_POST["gender"];
$food = $_POST["food"];
$quote = $_POST["quote"];
$education = $_POST["education"];
$TofD = $_POST["TofD"];

echo "Hello, ".$Fname." ".$Lname.".<br />";
echo "You are ".$gender.", and you like ";
foreach ($food as $f) {
echo $f."<br />";
}
echo "<i>".$quote."</i><br />";
echo "You're favorite time is ".$TofD.", and you passed ".$education."!<br />";
?>