<!DOCTYPE html>
<html>
  <head>
	<meta charset="utf-8">
	<title>King Library</title>
	<link rel="stylesheet" href="css/KingLib_8.css">
	
  </head>

  <body>
  
	<header>
	
		<div><img src="images/KingLibLogo.jpg" /></div>
		
	</header>

	<div id="featuredtitle">
		<h1>Featured Title!</h1>
		<img src="images/book_children_of_men.jpg" />
	</div>
	
	<div id="stafflist">
		<h1>Our Staff</h1>
		<table>
		<tbody>
		<tr>
		<th><img src="images/staff_lee.jpg" /></th>
		<th><img src="images/staff_shirley.jpg" /></th>
		<th><img src="images/staff_tom.jpg" /></th>
		</tr>
		</tbody>
		</table>
	</div>
	
	<div id="findtitle">
		<h1>Enter KeyWord to Search for Titles:</h1>
		
		<form action="assignment_8_booklist.php" method="post" >
		<p>
			<input type="text" name="keyword" id="keyword" />
		</p>
		
		<p>
			<input type="submit" value="Find Titles" />
		</p>
		
		</form>
	</div>
	
	<div id="logon">
		<form class="clear" action="assignment_8_logon.php" method="post" >
		<h3>Logon to your account:</h3>
			<p>
				<label for="user">User Id:</label>
				<input type="text" name="user" id="user" />
			</p>
			<p>
				<label for="pass">Password:</label>
				<input type="password" name="pass" id="pass" />
			</p>
			<input type="submit" value="Logon" />
			<a href="assignment_8_register.php">Click to Register</a>
		</form>
		
	</div>

	
	<?php

	$server = $_SERVER['SERVER_NAME'];

	$positionFound = strpos($server, 'profperry');

	if ($positionFound === false)
	{
		$server = 'localhost';
	} else {
		$server = 'Practice Area';
	}
	
	echo '<aside>SERVER: '.$server.'</aside>';
	
	?>

</body>
</html>