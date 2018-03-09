<!DOCTYPE html>
<html >
  <head>
	<meta charset="utf-8">
	<title>King Library</title>
	<link rel="stylesheet" href="css/KingLib_8.css">
	
  </head>

  <body>
  
	<header>
	
		<div><img src="images/KingLibLogo.jpg" /></div>
		
	</header>
	
	<?php
		$user = trim($_POST["user"]);
		$pass = trim($_POST["pass"]);

		require('../../DBtest_pptest.php');
			
			$host =  'localhost';
			$userid =  'P13';
			$password = '7dosql7';
			$dbname = 'testdb';

			$db = mysqli_perry_pconnect($host, $userid, $password, $dbname);
			
			if (!$db) { print "<h1>Unable to Connect to MySQL</h1>"; }
			
		$sql_statement = "SELECT * FROM student_p13_patron WHERE userid='".$user."';";
		$patron_query = mysqli_query($db, $sql_statement);
		
		
		if (!$patron_query) {
				$output_display = "<p style='color: red;'>MySQL No: ".mysqli_errno($db)."<br>";
				$output_display .= "MySQL Error: ".mysqli_error($db)."<br>";
				$output_display .= "<br>SQL: ".$response_rows."<br>";
				$output_display .= "<br>MySQL Affected Rows: ".mysqli_affected_rows($db)."</p>";
			}
			
		else{
		
			$response_rows = mysqli_num_rows($patron_query);
			$row = mysqli_fetch_array($patron_query);
			$valid_pass = $row['password'];
			
			$name = $row['firstname'];
			$email = $row['email'];
			
			if($response_rows == 0 || $pass != $valid_pass) { 
				echo '<p>The username and/or password you have entered is invalid <br />System cannot log you onto the system</p> <p>GO BACK and try again.</p>';
				}
			else {
			
				echo '<div class="response"><h3>Sucessful Logon for Patron:</h3><table border="1"><tr><th>Name</th><th>Email</th></tr>';
				echo '<tr><th>'.$name.'</th><th>'.$email.'</th></tr>';
				echo '</table></div>';
				
				}
			}
				
				
		
	?>

</table>