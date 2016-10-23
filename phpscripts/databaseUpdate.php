<?php

$key = $_REQUEST["key"];
$tag = $_REQUEST["tag"];

$dbhost = 'localhost';
$dbuser = 'danbiwer_discogs';
$dbpass = '';
$conn = mysql_connect($dbhost,$dbuser,$dbpass);
if(! $conn){
	die('Could not connect: ' . mysql_error());
}

$sql = "INSERT INTO `DiscogsLog` (`ID`, `keyword`, `tag`, `date`, `count`) VALUES (NULL, 'testing4', 'artist', NOW(), '3')";

mysql_select_db('danbiwer_discogsSearchLog');
$retval = mysql_query($sql, $conn);
if(!retval){
	die('Could not enter data: ' . mysql_error());
}
echo "Entered data successfully\n";
mysql_close($conn);
?>
