<?php

/* USAGE
**   Include this file within the domain object that is responsible for creating the message instance
**   Set three local variables: $salutionName, $messageBody, $teamName
**   Those variables will combine with this template to create the entire message body
*/

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
	<head>
		<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Oxygen'>
	</head>
	<body style='font-family:Oxygen,Arial,sans-serif;color:#333333;'>
		<table style='width:560px;'>
			<tr><td colspan='2'><img src='http://northbridgetech.org/dev/waterwheel/module/core/images/NB_horizontal_rgb.png' width='302' height='82' style='padding-bottom:20px;'/></td></tr>
			<tr><td><p>Hello <? echo $salutionName; ?>,</p><p><? echo $messageBody; ?></p><p>Our regards,<br/>Northbridge <? echo $teamName; ?></p></td><td style='vertical-align:top;'>sidebar</td></tr>
			<tr><td colspan='2' style='font-size:70%;color:#666666;'><hr/><p>This message is produced and distributed by Northbridge Technology Alliance, a United States 501(c)(3) nonprofit corporation, Evanston, Illinois  60202</td></tr>
		</table>
	</body>
</html>