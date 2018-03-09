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
	
	<section class="response">

		<table border="1">

			<tr>
				<th>ID</th>
				<th>Last Name</th>
				<th>First Name</th>
				<th>Email</th>
				<th>Birth Year</th>
				<th>City</th>
				<th>Userid</th>
				<th>Password</th>
			</tr>

		<?php
			require('../../DBtest_pptest.php');
				
				$host =  'localhost';
				$userid =  'P13';
				$password = '7dosql7';
				$dbname = 'testdb';

				$db = mysqli_perry_pconnect($host, $userid, $password, $dbname);
				
				if (!$db) { print "<h1>Unable to Connect to MySQL</h1>"; }
				
			$sql_statement = "SELECT * FROM student_p13_patron ORDER BY lastname, firstname;";
			$patron_query = mysqli_query($db, $sql_statement);
			
			if (!$patron_query) {
					$output_display = "<p style='color: red;'>MySQL No: ".mysqli_errno($db)."<br>";
					$output_display .= "MySQL Error: ".mysqli_error($db)."<br>";
					$output_display .= "<br>SQL: ".$response_rows."<br>";
					$output_display .= "<br>MySQL Affected Rows: ".mysqli_affected_rows($db)."</p>";
				}
				
			
			else {
			
			$response_rows = mysqli_num_rows($patron_query);
			
			for($ii = 1; $ii <= $response_rows; $ii++){
			
				$row = mysqli_fetch_array($patron_query);

				$id = $row['patron_id'];
				$last = $row['lastname'];
				$first = $row['firstname'];
				$email = $row['email'];
				$city = $row['city'];
				$year = $row['birthyear'];
				$user = $row['userid'];
				$pass = $row['password'];
				
				$table = '<tr>';
				$table .= '<th>'.$id.'</th>';
				$table .= '<th>'.$last.'</th>';
				$table .= '<th>'.$first.'</th>';
				$table .= '<th>'.$email.'</th>';
				$table .= '<th>'.$city.'</th>';
				$table .= '<th>'.$year.'</th>';
				$table .= '<th>'.$user.'</th>';
				$table .= '<th>'.$pass.'</th>';
				$table .= '</tr>';
				
				echo $table;
				
			};
			
		}
			
		?>

		</table>
	</section>
</body>
</html>