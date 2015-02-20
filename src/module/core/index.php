<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>

	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8">		
		<?php 
			include("mod-core-meta.php");
			include("../apply/mod-apply-meta.php"); 
			include("../sponsor/mod-sponsor-meta.php"); 
			include("../volunteer/mod-volunteer-meta.php"); 
			include("../about/mod-about-meta.php"); 
		?>		
		
		<!--================== End Meta ==================-->
		
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
										<!--
										<p><span class="fa fa-fire fa-3x tan" ></p>
										<p><span class="fa fa-life-buoy fa-3x tan" ></p>
										<p><span class="fa fa-unlock fa-3x tan" ></p>
										<p><span class="fa fa-bolt fa-3x tan" ></p>
										<p><span class="fa fa-bullseye fa-3x tan" ></p>
										<p><span class="fa fa-dollar fa-3x tan" ></p>
										-->
										<p><span class="fa fa-money fa-3x tan" ></p>
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
					<p class="skyblue sponsorHeaderCaption">Shouldn't your technology be as great as you are?</p>		
					<a class="whitepaper-button" id="" href="#" onclick="">
						<span class="fa fa-file-pdf-o fa-2x otherblue"></span>&nbsp;<span class="skyblue">Whitepaper</span>
					</a>				
				</div>
				<button id="contextSwitch" class="button" style="position:absolute;top:195px;" onClick="switchToAbout()">About Northbridge<span class="fa fa-chevron-circle-right fa-2x tan" style="margin-left:10px;vertical-align:middle;"></span></button>
				<div id="calendar" style="position:absolute;top:250px;">
					<div id="sm-links" style="margin-bottom:15px;">
						<a href="https://twitter.com/<?php echo Util::getTwitterHandle(); ?>" target="_blank"><span class="fa fa-twitter fa-3x olive" style="margin-left:7px;"></a>
						<a href="https://plus.google.com/u/0/b/101145194341428988499/101145194341428988499/posts" target="_blank"><span class="fa fa-google-plus-square fa-3x olive" style="margin-left:7px;"></a>
						<a href="https://www.linkedin.com/company/2232384" target="_blank"><span class="fa fa-linkedin fa-3x olive" style="margin-left:7px;"></a>
						<a href="https://www.facebook.com/northbridgenfp#" target="_blank"><span class="fa fa-facebook-square fa-3x olive"></a>
						<a href="https://github.com/NorthBridge/playbook/wiki/1.How-We-Do" target="_blank"><span class="fa fa-github fa-3x olive" style="margin-left:7px;"></a>
					</div>
					<div id="event-list"></div>
				</div>
				<?php // include("../..."); ?>
			</div>
			<!-- /Global Navigation Context -->
			<!-- About Context -->
			<div id="aboutApp" class="aboutApp" style="border:0px solid;">
				<div class="aboutHeader">
					<img src="images/NB_horizontal_tagline_rgb.png" width="515" height="160" style="padding:30px 10px 10px 30px;"/>
					<div id="aboutQuote0" class="mod-about-quotes">Need a quote. Citation</div>
					<div id="aboutQuote1" class="mod-about-quotes" style="visibility:visible;opacity:1;">All in. No regrets.</br>Flint</div>
					<div id="aboutQuote2" class="mod-about-quotes">It always seems impossible until it's done.</br>Mandela</div>
					<div id="aboutQuote3" class="mod-about-quotes">... go instead where there is no path and leave a trail.</br>Emerson</div>
					<div id="aboutQuote4" class="mod-about-quotes">working together... we might just be able to fix it...</br>Cascio</div>
					<div id="aboutQuote5" class="mod-about-quotes">Need a quote. Citation</div>
					<div class="pure-menu pure-menu-open pure-menu-horizontal" style="text-align:right;font-size:140%;letter-spacing:.75px;">
	   				<ul>
        			<li><a href="#" onclick="switchAboutView(0);">News</a></li>
        			<li><a id="defaultMenuItem" href="#" onclick="switchAboutView(1);">About</a></li>
        			<li><a href="#" onclick="switchAboutView(2);">Projects</a></li>
        			<li><a href="#" onclick="switchAboutView(3);">Leaders</a></li>
        			<li><a href="#" onclick="switchAboutView(4);">Partners</a></li>
        			<li><a href="#" onclick="switchAboutView(5);">Gallery</a></li>
    				</ul>
					</div>
				</div>
				<div class="aboutContent">
					<div id="aboutIndex0" class="mod-about-frame">
						<?php include("../about/news.php"); ?>		
           </div>
					<div id="aboutIndex1" class="mod-about-frame" style="visibility:visible;opacity:1;">
						<?php include("../about/about.php"); ?>		
          </div>
					<div id="aboutIndex2" class="mod-about-frame">
						<?php include("../about/projects.php"); ?>		
          </div>
					<div id="aboutIndex3" class="mod-about-frame">
						<?php include("../about/leaders.php"); ?>		
          </div>
					<div id="aboutIndex4" class="mod-about-frame">
						<?php include("../about/partners.php"); ?>		
          </div>
					<div id="aboutIndex5" class="mod-about-frame">
						<?php include("../about/gallery.php"); ?>		
          </div>
				</div>          

			</div>
			<!-- /About Context -->
			<div class="curtain"></div>
		</div><!-- /container -->
		
		<!-- initialize major context -->
		<?php if (isset($_GET['context']) && !strcmp($_GET['context'], 'about')) { ?>
			<script type="text/javascript">
				switchToAbout();
			</script>
		<?php } ?> 

	</body>
</html>




