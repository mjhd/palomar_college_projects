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
	
	<?php 
	
		$first = trim($_POST["first"]);
		$last = trim($_POST["last"]);
		$email = trim($_POST["email"]);
		$city = trim($_POST["city"]);
		$year = trim($_POST["year"]);
		$user = trim($_POST["user"]);
		$pass = trim($_POST["pass"]);
		
		// Validation
		
		if ( $first == null || $last == null ) { 
			echo '<p>ERROR! Please enter a first and last name</p>'; 
			}
			
		else if ( $first != null && $last != null ) { 
			printf('<p>Your name: %s %s </p>', $first, $last); 
			}
		
		if ($email == null){ 
			echo '<p>ERROR! Please enter an email</p>'; 
			}
		else if ($email != null){ 
			printf('<p>Your email: %s </p>', $email); 
			}
			
		if ($year == null){ 
			echo '<p>ERROR! Please enter a birth year</p>'; 
			}
		else if ($year != null){ 
			printf('<p>Your birth year: %d </p>', $year); 
			}
			
		if ($city == '-'){ 
			echo '<p>ERROR! Please select a city</p>'; 
			}
		else if ($city != '-'){ 
			printf('<p>Your city: %s </p>', $city); 
			}
		
		if ($user == null){ 
			echo '<p>ERROR! Please select a Userid</p>'; 
			}
		else if ($user != null){ 
			printf('<p>Your Userid: %s </p>', $user); 
			}
			
		if ($pass == null){ 
			echo '<p>ERROR! Please select a password</p>'; 
			}
		else if ($pass != null){ 
			printf('<p>Your password: %s </p>', $pass); 
			}		
			
		// Age grouping
		
		$thisYear = date('Y');
		$ageGap = $thisYear - $year;
		
		if ( $ageGap <= 15 ) { echo '<p>You are in the age group: Children</p>'; }
		else if ( $ageGap > 15 && $ageGap <= 55) { echo '<p>You are in the age group: Adults</p>'; }
		else if ( $ageGap > 55) { echo '<p>You are in the age group: Seniors</p>'; }
		
		
		
		// Add post info to mh_patron table
		require('../../DBtest_pptest.php');
		
				
				$host =  'localhost';
				$userid =  'P13';
				$password = '7dosql7';
				$dbname = 'testdb';

				$db = mysqli_perry_pconnect($host, $userid, $password, $dbname);
				
				if (!$db) { print "<h1>Unable to Connect to MySQL</h1>"; }
		
		$id_statement = "SELECT * FROM student_p13_patron";
		$id_generate = mysqli_query($db, $id_statement);
		$new_id = mysqli_num_rows($id_generate) + 1;

		$sql_statement = "INSERT INTO student_p13_patron (patron_id, lastname, firstname, email, city, birthyear, userid, password) "; 
		$sql_statement .= "values ("; 
		$sql_statement .= $new_id.", '".$last."', '".$first."', '".$email."', '".$city."' , ".$year." , '".$user."' , '".$pass."'"; 
		$sql_statement .= ");";
		
		$insert_query = mysqli_query($db, $sql_statement);
		
		if ($insert_query)
	{
		echo "Entry for ".$last." ".$first." has been added";
		
	} else {
	    $errno = mysqli_errno($db);

	    if ($errno == '1062') {
			echo "<p style='color: red'>Patron ".$firstname." ".$lastname." is already in Table ";
		} 
		
		else {
			echo("<h4>MySQL No: ".mysqli_errno($db)."</h4>");
			echo("<h4>MySQL Error: ".mysqli_error($db)."</h4>");
			echo("<h4>SQL: ".$statement."</h4>");
			echo("<h4>MySQL Affected Rows: ".mysqli_affected_rows($db)."</h4>");
		}

		echo 'NotAdded';
	}

		
		
	?>
	
	</section>

</body>
</html>


