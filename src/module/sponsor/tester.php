<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8">
		
		<link rel="stylesheet" type="text/css" href='http://fonts.googleapis.com/css?family=PT+Sans+Narrow:400'>
		<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">		
		<link rel="stylesheet" type="text/css" href="../../style.css" />
		<link rel="stylesheet" type="text/css" href="mod-sponsor.css" />
		<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css">
		<!--<link rel="stylesheet" type="text/css" href="lib/Slidorion-master/css/slidorion.css" />-->

		<script type="text/javascript" src="mod-sponsor.js"></script>				
		<script type="text/javascript" src="../../jquery.js"></script>
		<!--<script type="text/javascript" src="lib/Slidorion-master/js/jquery.slidorion.js"></script>-->
	
		<!--
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
		-->
		
		<!-- http://www.magicjs.com/resources/javascript/magic/docs/ -->
		
		<link href="lib/magic.14.7.24/stylesheets/magic.13.17.css" rel="stylesheet">
		<script type="text/javascript" src="lib/magic.14.7.24/magic.14.7.24.js" charset="UTF-8"></script>
		<script type="text/javascript" src="lib/magic.14.7.24/wand.src.js" charset="UTF-8"></script>

		<script type="text/javascript">
			$m.construct({
		 		lang : "en_us"
				,create_html5 : true
				,global_debug : false
				,animations : { use : true }
				,ajax : { debug : false, visual : true, timeout : 15 }
				,geo : { use : false, debug : false, visual : true }
				,send_timezone_to : false
			});
		</script>
		
	</head>
	<body>

		<div class="container">
			<div class="allianceContent">
					<?php include("mod-sponsor.html"); ?>					
			</div>
		</div>
	</body>
</html>




