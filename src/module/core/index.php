<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>

	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8">		
		<?php 
			include("../sponsor/mod-sponsor-meta.php"); 
			include("mod-core-meta.php");
		?>		
	</head>

	<body>
		<div class="container">
			<!-- Sponsor Context -->
			<div id="sponsorApp" class="sponsorApp">
				<div class="sponsorHeader">
					<div class="sponsorHeaderLeft">
						<span class="fa fa-group yellow" style="margin:5px;font-size:46px;padding-top:30px;"></span>
						<span class="skyblue">Web&nbsp;conferencing</span>
						<p class="skyblue" style="text-indent:70px;">for&nbsp;world-changers</p>	
						<p class="otherblue">
							<span class="fa fa-comments" style="margin: 5px 5px 5px 70px;"></span>
							<span class="fa fa-play-circle" style="margin:5px;"></span>
							<span class="fa fa-laptop" style="margin:5px;"></span>
							<span class="fa fa-globe" style="margin:5px;"></span>
							<span class="fa fa-microphone" style="margin:5px;"></span>
							<span class="fa fa-video-camera" style="margin:5px;"></span>
							<span class="fa fa-mobile" style="margin:5px;"></span>
					</p>			
					</div>
					<div class="sponsorHeaderRight">
						<a class="whitepaper-button" id="" href="#" onclick="">
							<span class="fa fa-file-pdf-o fa-2x otherblue " style="margin:2px;"></span> <span class="skyblue">Whitepaper</span>
						</a>
						<p class="skyblue" style="font-size:13px;line-height:100%;font-family:Arial,sans-serif;font-weight:lighter;position:absolute;top:50px;left:90px;"><i>Shouldn't your technology<br/>be as good as you are?</i></p>		
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
									<p class="white"><b>Is your U.S. 501(c)(3) organization is doing social justice and community-building work?</b> You are eligible for a virtual global web conference room.</p>
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
						<?php //include("../sponsor/mod-sponsor.php"); ?>		
					</div>
					<div id="madeUp_index1">
						<?php include("../sponsor/mod-sponsor.php"); ?>				
					</div>
					<div id="madeUp_index2">
						<?php // include("../volunteer/mod-volunteer.html"); ?>
					</div>
				</div>
			</div>
			<!-- /Sponsor Context -->
			<!-- Global Navigation Context -->
			<div id="navApp" class="navApp">
			<div id="navTop" style="display:block;width:200px;height:200px">
					<img src="images/NB_vertical_rgb.png" width="200" height="161" style="padding: 15px 0px" id="smallLogo"/>
					<a class="whitepaper-button" id="testtest" href="#" onclick="" style="opacity:0;">
						<span class="fa fa-file-pdf-o fa-2x otherblue " style="margin:2px;"></span> <span class="skyblue">Whitepaper</span>
					</a>
			</div>
			<button id="contextSwitch" class="button" onClick="switchToAbout()">About Northbridge</button>
				<?php // include("../..."); ?>
			</div>
			<!-- /Global Navigation Context -->
			<!-- About Context -->
			<div id="aboutApp" class="aboutApp">
				<img src="images/NB_horizontal_tagline_rgb.png" width="700" height="218" style="padding:30px 10px 10px 10px;"/>
			</div>
			<!-- /About Context -->
			<div class="curtain"></div>

		</div><!-- /container -->
	</body>
</html>




