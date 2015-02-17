<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>

	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8">		
		<?php 
			include("mod-core-meta.php");
			include("../apply/mod-apply-meta.php"); 
			include("../sponsor/mod-sponsor-meta.php"); 
			include("../volunteer/mod-volunteer-meta.php"); 
		?>		
	</head>

	<body>
		<div class="container">
			<!-- Sponsor Context -->
			<div id="sponsorApp" class="sponsorApp">
				<div class="sponsorHeader">
					<div class="sponsorHeaderLeft">
						<span class="fa fa-group yellow sponsorHeaderLeader"></span>
						<p class="skyblue sponsorHeaderHeadline">Web&nbsp;conferencing<br/>for&nbsp;world-changers<br/>
							<span class="fa fa-comments"></span>
							<span class="fa fa-play-circle" style="margin:5px;"></span>
							<span class="fa fa-laptop" style="margin:5px;"></span>
							<span class="fa fa-globe" style="margin:5px;"></span>
							<span class="fa fa-microphone" style="margin:5px;"></span>
							<span class="fa fa-video-camera" style="margin:5px;"></span>
							<span class="fa fa-mobile" style="margin:5px;"></span>
						</p>			
					</div>
					<div class="sponsorHeaderRight" id="sponsorHeaderRight">
						<p class="skyblue sponsorHeaderCaption">Shouldn't your technology<br/>be as great as you are?</p>		
						<a class="whitepaper-button" id="" href="#" onclick="">
							<span class="fa fa-file-pdf-o fa-2x otherblue"></span>&nbsp;<span class="skyblue">Whitepaper</span>
						</a>
					</div>
				</div>
				<div class="sponsorSlider">
					<div class="container_16">
						<ul class="accord accordion1">
							<li class="one">
								<div class="headerbox">
									<div class="title"><strong>Apply</strong>
										<p><span class="fa fa-send fa-3x tan" ></p>
									</div>
									<h1 class="slider white">Is your team changing the world?</h1>
									<p class="white"><b>Is your U.S. 501(c)(3) organization doing social justice or community building?</b> You may be eligible for a global web conference room.</p>
								</div>
							</li>
							<li class="two">
								<div class="headerbox">	
									<div class="title"><strong>Sponsor</strong>
										<p><span class="fa fa-life-buoy fa-3x tan" ></p>
									</div>
									<h1 class="slider white">Fund technology for world-changers</h1>
									<p class="white"><b>Give a virtual web conference room to a team that is changing the world.</b> Choose your level. Track your impact. Make a difference.</p>
								</div>
							</li>
							<li class="three">
								<div class="headerbox">
									<div class="title"><strong>Volunteer</strong>
										<p><span class="fa fa-cogs fa-3x otherblue"/></p>
									</div>
									<h1 class="slider skyblue">Do you want to change the world?</h1>
									<p class="skyblue"><b>Join our influential group of volunteers deploying real-world projects!</b><br/>Use your skills to help others change the world.</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="allianceContent">
					<div id="madeUp_index0">
						<?php include("../apply/mod-apply.php"); ?>		
					</div>
					<div id="madeUp_index1">
						<?php include("../sponsor/mod-sponsor.php"); ?>				
					</div>
					<div id="madeUp_index2">
						<?php include("../volunteer/mod-volunteer.php"); ?>
					</div>
				</div>
			</div>
			<!-- /Sponsor Context -->
			<!-- Global Navigation Context -->
			<div id="navApp" class="navApp">
				<div id="navTopSponsorContext">
						<img src="images/NB_vertical_rgb.png" width="200" height="161" id="smallLogo"/>
						<a class="whitepaper-button" id="testtest" href="#" onclick="" style="opacity:0;">
							<span class="fa fa-file-pdf-o fa-2x otherblue "></span> <span class="skyblue">Whitepaper</span>
						</a>
				</div>
				<div id="navTopAboutContext">
					<p class="skyblue sponsorHeaderCaption">Shouldn't your technology<br/>be as great as you are?</p>		
					<a class="whitepaper-button" id="" href="#" onclick="">
						<span class="fa fa-file-pdf-o fa-2x otherblue"></span>&nbsp;<span class="skyblue">Whitepaper</span>
					</a>				
				</div>
				<button id="contextSwitch" class="button" style="position:absolute;top:230px;" onClick="switchToAbout()">About Northbridge<span class="fa fa-chevron-circle-right fa-2x tan" style="margin-left:10px;vertical-align:middle;"></span></button>
				<div id="calendar" style="position:absolute;top:325px;">
					<p>Upcoming Events</p>
					<div id="event-list"></div>
				</div>
				<?php // include("../..."); ?>
			</div>
			<!-- /Global Navigation Context -->
			<!-- About Context -->
			<div id="aboutApp" class="aboutApp">
				<img src="images/NB_horizontal_tagline_rgb.png" width="680" height="212" style="padding:30px 10px 10px 30px;"/>
			</div>
			<!-- /About Context -->
			<div class="curtain"></div>
		</div><!-- /container -->
		
		<!-- initialize major context -->
		<?php if (!strcmp($_GET['context'], 'about')) { ?>
			<script type="text/javascript">
				switchToAbout();
			</script>
		<?php } ?> 

	</body>
</html>




