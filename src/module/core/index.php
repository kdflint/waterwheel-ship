<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>

	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8">
		
		<!-- mod-sponsor-meta.html, but copied and paths modified -->	
		<link rel="stylesheet" type="text/css" href='http://fonts.googleapis.com/css?family=PT+Sans+Narrow:400'>
		<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">		
		<link rel="stylesheet" type="text/css" href="style.css" />
		<link rel="stylesheet" type="text/css" href="../sponsor/mod-sponsor.css" />
		<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css">
		<link href="../sponsor/lib/magic.14.7.24/stylesheets/magic.13.17.css" rel="stylesheet">

		<script type="text/javascript" src="../sponsor/mod-sponsor.js"></script>				
		<script type="text/javascript" src="jquery.js"></script>
		<script type="text/javascript" src="../sponsor/lib/magic.14.7.24/magic.14.7.24.js" charset="UTF-8"></script>
		<script type="text/javascript" src="../sponsor/lib/magic.14.7.24/wand.src.js" charset="UTF-8"></script>

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
		<!-- end mod-sponsor-meta.html -->		
				
		<script language="javascript" type="text/javascript" src="script.js" ></script>
		<script language="javascript" type="text/javascript" src="jquery.hslides.js"></script>
		<script language="javascript" type="text/javascript" src="jquery.easing.js"></script>

		<link rel="stylesheet" media="all" type="text/css" href="reset.css" />
		<link rel="stylesheet" media="all" type="text/css" href="960.css" />
		<link rel="stylesheet" media="all" type="text/css" href="style2.css" >
		<!-- SLIDER CSS  goes here -->
		<link rel="stylesheet" media="screen" type="text/css" href="slider.css" />


		<!-- initialize horizontal sliders -->
		<script type="text/javascript">
				$((function(){
					enterFunction = function(){
						$(this).html('ACTIVE');
					}
					leaveFunction = function(){
						$(this).html('inactive');
					}

				$('.accordion1').hSlides({
						totalWidth: 760,
						totalHeight: 120,
						minPanelWidth: 120,
						maxPanelWidth: 520
					});
				}
				));
		</script>
	
		<!-- initialize horizontal sliders ?? -->
		<script type='text/javascript'>
			$(document).ready(function(){
				$(document).ready("#dropmenu ul").css({display: "none"}); // Opera Fix
				$(document).ready("#dropmenu li").hover(function(){
					$(document).ready(this).find('ul:first').css({visibility: "visible",display: "none"}).show(268);
					},function(){
					$(document).ready(this).find('ul:first').css({visibility: "hidden"});
					});
			});
		</script>

	</head>

	<body>
		<div class="container">
			<!-- Sponsor Context -->
			<div id="sponsorApp" class="sponsorApp">
				<div class="sponsorHeader">
					<img src="corp_images/final_files/final_files/NB_horizontal_rgb.png" width="500" height="136"/>
				</div>
				<div class="sponsorSlider">
					<div class="container_16">
						<ul class="accord accordion1">
							<li class="one">
								<div class="headerbox"><!--<img src="http://bannersmonster.com/themes/Circo/images/pack4big.png"  alt=""  class="leftalign" />-->
									<div class="title"><strong>Sponsor</strong>
										<p></p>
										<!--<a href="#">Click Here</a>-->
									</div>
									<h1 class="white">Fund technology for world-changers</h1>
									<p class="white"><b>Give global web conference capability to a team that is changing the world.</b> Choose your sponsorship level. Track your impact. See that your dollars are really making a difference on the front lines of social progress.</p>
								</div>
							</li>
							<li class="two">
								<div class="headerbox"> <!--<img src="http://bannersmonster.com/themes/Circo/images/web1.gif"  alt=""  class="imgborder leftalign" />-->
									<div class="title"><strong>Apply</strong>
										<p></p>
									</div>
									<h1 class="white">Is your team changing the world?</h1>
									<p class="white">Is your U.S. 501(c)(3) organization is doing social justice or community-building work? You may be eligible for a virtual global web conference room.</p>
								</div>
							</li>
							<li class="three">
								<div class="headerbox"><!-- <img src="http://bannersmonster.com/themes/Circo/images/pack3big.png"  alt=""  class="leftalign" />-->
									<div class="title"><strong>Volunteer</strong>
										<p></p>
									</div>
									<h1 class="skyblue">Do you want to change the world?</h1>
									<p class="white">Join our influential group of volunteers deploying real-world projects! Use your skills to help others change the world.</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="allianceContent">
					<div id="madeUp_index0">
						<?php include("../sponsor/mod-sponsor.html"); ?>						
					</div>
					<div id="madeUp_index1">

					</div>
					<div id="madeUp_index2">

					</div>
				</div>
			</div>
			<!-- /Sponsor Context -->
			<!-- Global Navigation Context -->
			<div id="navApp" class="navApp">
				<div class="pure-menu pure-menu-open">
					<ul>
						<li><a href="#">Item</a></li>
						<li><a href="#">Item</a></li>
						<li><a href="#">Item</a></li>
						<li><a href="#">Item</a></li>
						<li><a href="#">Item</a></li>
						<li><a href="#">Item</a></li>
					</ul>
				</div>
				<button id="contextSwitch" class="button" onClick="switchToAbout()">About NorthBridge</button>
			</div>
			<!-- /Global Navigation Context -->
			<!-- About Context -->
			<div id="aboutApp" class="aboutApp">
				<img src="corp_images/final_files/final_files/NB_horizontal_tagline_rgb.png" width="750" height="232"/>
			</div>
			<!-- /About Context -->
			<div class="curtain"></div>

		</div><!-- /container -->
	</body>
</html>




