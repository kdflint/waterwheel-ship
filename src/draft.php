<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>

	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8">
		


		<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>-->
		<!--<script src="js/jquery.easing.js"></script>-->
		<!--<script src="js/jquery.slidorion.min.js"></script>-->
		
		<script language="javascript" type="text/javascript" src="script.js" ></script>
		<script language="javascript" type="text/javascript" src="jquery.js"></script>
		<script language="javascript" type="text/javascript" src="jquery.hslides.js"></script>
		<script language="javascript" type="text/javascript" src="jquery.easing.js"></script>
		<script src="Slidorion-master/js/jquery.slidorion.js"></script>

		<link rel="stylesheet" type="text/css" href="style.css" />
		<link rel="stylesheet" media="all" type="text/css" href="reset.css" />
		<link rel="stylesheet" media="all" type="text/css" href="960.css" />
		<link rel="stylesheet" media="all" type="text/css" href="style2.css" >
		<!-- SLIDER CSS  goes here -->
		<link rel="stylesheet" media="screen" type="text/css" href="slider.css" />

		<!-- http://purecss.io/menus/ -->
		<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.5.0/pure-min.css">
		
		<!-- org list http://slidorion.com/ -->
		<link rel="stylesheet" href="Slidorion-master/css/slidorion.css" />

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
						totalHeight: 170,
						minPanelWidth: 120,
						maxPanelWidth: 520
					});
				}
				));
		</script>
	
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
			<!-- Sponsor Context -->
			<div id="sponsorApp" class="sponsorApp">
				<div class="sponsorHeader">
					<img src="bg.gif" width="760" height="150"/>
				</div>
				<div class="sponsorSlider">
					<div class="container_16">
						<ul class="accord accordion1">
							<li class="one">
								<div class="headerbox"><!--<img src="http://bannersmonster.com/themes/Circo/images/pack4big.png"  alt=""  class="leftalign" />-->
									<div class="title"><strong>Sponsor</strong><img src="http://bannersmonster.com/themes/Circo/images/zipsmall.png"  alt="" />
										<p>Bring powerful technology tools to the front lines of social progress.</p>
										<!--<a href="#">Click Here</a>-->
									</div>
									<h1 class="white">Fund technology for world-changers</h1>
									<p class="white">Give global web conference capability to a team that is changing the world. Choose your sponsorship level. Track your impact. See that your dollars are really making a difference. </p>
								</div>
							</li>
							<li class="two">
								<div class="headerbox"> <!--<img src="http://bannersmonster.com/themes/Circo/images/web1.gif"  alt=""  class="imgborder leftalign" />-->
									<div class="title"><strong>Apply</strong><img src="http://bannersmonster.com/themes/Circo/images/memexsmall.png"  alt="" />
										<p>Virtual global conference room for eligible organizations. </p>
									</div>
									<h1 class="white">Is your team changing the world?</h1>
									<p class="white">If your U.S. 501(c)(3) organization is doing social justice or community-building work, you may be eligible for our global web conference package. <a href="#">Details</a></p>
								</div>
							</li>
							<li class="three">
								<div class="headerbox"><!-- <img src="http://bannersmonster.com/themes/Circo/images/pack3big.png"  alt=""  class="leftalign" />-->
									<div class="title"><strong>Volunteer</strong><img src="http://bannersmonster.com/themes/Circo/images/appsmall.png"  alt="" />
										<p>Join our influential group of volunteers deploying real-world projects!</p>
									</div>
									<h1 class="skyblue">Do you want to change the world?</h1>
									<p class="white">A New upcoming features of our company! Join us to walk with the trend</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="allianceContent">
					<div id="madeUp_index0">
						<?php include("view/mod-sponsor.html"); ?>					
					</div>
					<div id="madeUp_index1">
						<div class="sponsorContentLeft">

						</div>
						<div class="sponsorContentRight">
							<form>
								<p>Organization Name: <input type="text" /></p>
								<p>Organization Budget: <select name="budget"><option selected>Please select one</option><option>$0 - $50,000</option><option>$50,001 - $200,000</option></select></p>
								<p>Organization EIN: <input type="text" /></p>
								<p>Team Name: <input type="text" /></p>
								<p>Country/Region of Impact: <input type="text" /></p>
								<p>Email: <input type="text" /></p>
								<p>Team Mission: <input type="text" /></p>
								<p>How will web conferencing help your team achieve your mission? <input type="text" /></p>
								<p><button type="submit">Apply</a></p>
							</form>
						</div>
					</div>
					<div id="madeUp_index2">
						<div class="sponsorContentLeft">
							<form>
								<p>Organization Name: <input type="text" /></p>
								<p>Organization Budget: <select name="budget"><option selected>Please select one</option><option>$0 - $50,000</option><option>$50,001 - $200,000</option></select></p>
							</form>
						</div>
						<div class="sponsorContentRight">
							<form>
								<p>Team Name: <input type="text" /></p>
								<p>Country/Region of Impact: <input type="text" /></p>
								<p><button type="submit">Apply</a></p>
							</form>
						</div>
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
				<img src="logoShot.png" width="750" height="300"/>
			</div>
			<!-- /About Context -->
			<div class="curtain"></div>

		</div><!-- /container -->
	</body>
</html>




