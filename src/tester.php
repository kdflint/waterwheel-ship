<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8">
		
		<link href='http://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700' rel='stylesheet' type='text/css'>
		<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
		
		<link rel="stylesheet" type="text/css" href="style.css" />
		<link rel="stylesheet" type="text/css" href="view/mod-sponsor.css" />
		<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css">
		<link rel="stylesheet" href="Slidorion-master/css/slidorion.css" />
	
		<script language="javascript" type="text/javascript" src="jquery.js"></script>
		<script src="Slidorion-master/js/jquery.slidorion.js"></script>
		
		<script type='text/javascript'>
			$(document).ready(function(){
				$(document).ready('#slidorion').slidorion({
					speed: 1000,
					interval: 4000,
					effect: 'none',
					autoPlay: 'false'
				});
			});
		</script>
	</head>
	<body>
		<div class="container">
			<div class="allianceContent">
					<?php include("view/mod-sponsor.html"); ?>					
			</div>
		</div>
	</body>
</html>




