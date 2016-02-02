<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<?php 

require_once("domain/Util.php");

//http://detectmobilebrowsers.com/
$useragent=$_SERVER['HTTP_USER_AGENT'];

if (isset($_GET['context']) && !strcmp($_GET['context'], 'desktop')) {
	// request is explicitly for desktop site - bypass mobile redirect
} else {
	// if user agent matches a mobile pattern, go to mobile site
	if(preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4))) {
		header('Location: http://northbridgetech.org/apps/waterwheel/module/mobile/index.php');
	}
}

$msie_8 = FALSE;
$ua = $_SERVER["HTTP_USER_AGENT"];
if ($ua) {
	$msie_8 = strpos($ua, 'MSIE 8.0') ? TRUE : FALSE;
}

?>

<html>

	<head>
		<title>Northbridge Technology Alliance</title>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8">		
		<?php 
			include("mod-core-meta.php");
			include("../apply/mod-apply-meta.php"); 
			include("../sponsor/mod-sponsor-meta.php"); 
			include("../volunteer/mod-volunteer-meta.php"); 
			include("../about/mod-about-meta.php"); 
		?>		
		
<!--================== End Meta ==================-->

	<script type="text/javascript">
		$(window).load(function() {
			$(".loader").fadeOut("slow");
		})
	</script>
	
	<script type="text/javascript">
		$(window).load(function() { // makes sure the whole site is loaded
			$("#status").fadeOut("slow"); // will first fade out the loading animation
			$("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
		})
	</script>
	
	</head>

	<body>
		<!--<div class="loader"></div>-->
		<div id="preloader">
			<div id="status">One moment...</div>
		</div>

		<?php if($msie_8) { ?>
			<div style="background: #000; text-align: center; position: absolute; top: 0px; width: 100%; color: #FFF;">This website is not compatible with your Internet Explorer version. <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie" target="_blank" style="color: #fff; text-decoration: underline;">Please upgrade here.</a></div>
			<iframe width="360" height="700" src="http://northbridgetech.org/apps/waterwheel/module/mobile/index.php?context=ie8" frameborder="0" scrolling="no" allowfullscreen></iframe>
		<?php } else { ?>

		<div class="container">
			<div id="curtain" class="curtain"></div>
					
			<!-- Sponsor Context -->
			<div id="sponsorApp" class="sponsorApp">
				<div class="sponsorHeader">
					<div class="sponsorHeaderLeft">
						<span class="fa fa-group yellow sponsorHeaderLeader"></span>
						<p class="skyblue sponsorHeaderHeadline">Nexus&nbsp;web&nbsp;tools<br/>for&nbsp;world-changers<br/>
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
						<?php include("whitepaper-link.php"); ?>	
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
									<p class="white" style="font-size:115%;margin-top:15px;">You may be eligible for a global web meeting room.</p>
								</div>
							</li>
							<li class="two">
								<div class="headerbox">	
									<div class="title"><strong>Sponsor</strong>
										<p><span class="fa fa-money fa-3x tan" ></p>
									</div>
									<h1 class="slider white">Fund technology for world-changers</h1>
									<p class="white"><b>Give a web conference room to a team that is changing the world.</b> Choose your level. Track your impact. Make a difference.</p>
								</div>
							</li>
							<li class="three">
								<div class="headerbox">
									<div class="title"><strong>Volunteer</strong>
										<p><span class="fa fa-cogs fa-3x otherblue"/></p>
									</div>
									<h1 class="slider skyblue">Be as big as you want to be!</h1>
									<p class="skyblue"><b>Use your technical skills to help others change the world.</b> Join our influential group of volunteers deploying real-world projects.<br/></p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="allianceContent">
					<div id="madeUp_index0">
						<?php 
							include("../apply/mod-apply.php");
							include("../apply/mod-info.php");
							if (isset($_GET['view']) && !strcmp($_GET['view'], 'apply_form')) {
								// For now, this behaviour is overridden by hslides condition at line 119 (activeIndex == 0)
								?><script type="text/javascript">switchToApplyForm()</script> <?php
							}
						?>		
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
				</div>
				<div id="navTopAboutContext">
					<?php include("whitepaper-link.php"); ?>			
				</div>
				<div id="calendar" style="position:absolute;top:192px;width:200px;">
					<button id="contextSwitch" class="button" onClick="switchToAbout()">About Northbridge<span class="fa fa-chevron-circle-right fa-2x tan" style="margin-left:10px;vertical-align:middle;"></span></button>
					<div id="sm-links" style="margin-top:10px;">
						<a href="https://twitter.com/<?php echo Util::getTwitterHandle(); ?>" target="_blank"><span class="fa fa-twitter fa-3x skyblue" style="margin-left:5px;"></span></a>
						<a href="//plus.google.com/u/0/101145194341428988499?prsrc=3" rel="publisher" target="_blank" style="text-decoration:none;"><span class="fa fa-google-plus-square fa-3x skyblue" style="margin-left:5px;"></span></a>						
						<a href="https://www.linkedin.com/company/2232384" target="_blank"><span class="fa fa-linkedin fa-3x skyblue" style="margin-left:5px;"></span></a>
						<a href="https://www.facebook.com/northbridgenfp#" target="_blank"><span class="fa fa-facebook-square fa-3x skyblue" style="margin-left:5px;"></span></a>
						<a href="https://github.com/NorthBridge/playbook/wiki/1.How-We-Do" target="_blank"><span class="fa fa-github fa-3x skyblue" style="margin-left:5px;"></span></a>
					</div>
					<!-- EventBrite widget -->
						<div style="width:200px;text-align:center;margin-left:5px;margin-top:10px;" >
							<iframe  src="https://www.eventbrite.com/calendar-widget?eid=16317964471&showPrivate=1&sig=AGbIMNxpHUlRkcT_ZbQGyQ7X_arlwKyFyQ" frameborder="0" height="377" width="200" marginheight="0" marginwidth="0" scrolling="no" allowtransparency="true">
							</iframe>
							<div style="font-family:Helvetica, Arial; font-size:10px; padding:5px 0 5px; margin:2px; width:195px; text-align:center;" >
								<a style="color:#ddd; text-decoration:none;" target="_blank" href="http://www.eventbrite.com/r/ecal">Event management</a> 
								<span style="color:#ddd;">powered by</span> 
								<a style="color:#ddd; text-decoration:none;" target="_blank" href="http://www.eventbrite.com?ref=ecal">Eventbrite</a>
							</div>
						</div>
				</div>
				<?php // include("../..."); 
				?>
			</div>
			<!-- /Global Navigation Context -->

			<!--<div class="curtain"></div>-->
			
			<!-- About Context -->
			<div id="aboutApp" class="aboutApp">
				<div class="aboutHeader">
					<img src="images/NB_horizontal_tagline_rgb.png" width="515" height="160" style="padding:30px 10px 10px 30px;"/>
					<div id="aboutQuote0" class="mod-about-quotes">[News is] a first rough draft of history.<br/>Graham.</div>
					<div id="aboutQuote1" class="mod-about-quotes" style="visibility:visible;opacity:1;">In the shadow of each other, the people live.<br/>Proverb.</div>
					<div id="aboutQuote2" class="mod-about-quotes">It always seems impossible until it's done.<br/>Mandela</div>
					<div id="aboutQuote3" class="mod-about-quotes">... go instead where there is no path and leave a trail.<br/>Emerson</div>
					<div id="aboutQuote4" class="mod-about-quotes">working together... we might just be able to fix it...<br/>Cascio</div>
					<div id="aboutQuote5" class="mod-about-quotes">All in.<br/>No regrets.<br/>Flint</div>
					<div style="position:absolute;top:135px;left:560px;"> 
						<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank"> 
							<input type="hidden" name="cmd" value="_s-xclick"> <input type="hidden" name="notify_url" value="http://northbridgetech.org/paypalIpnListener.php"> <input type="hidden" name="hosted_button_id" value="CR3GPPFSE7ARW">
							<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" style="position:absolute;margin-left:30px;margin-top:18px;"> 
							<a href="javascript:void(0)" onclick="alert('To donate by check, please mail your contribution to:\n\nNorthbridge Technology Alliance\n400 South Blvd., Unit A\nEvanston, IL  60202')" style="position:absolute;margin-left:135px;"><img src="images/Check_Pen.png" alt="by Check" ></a>
							<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"> 
						</form> 
					</div>
					<div class="pure-menu pure-menu-open pure-menu-horizontal" style="margin-left:47px;font-size:140%;letter-spacing:.75px;">
	   				<ul>
        			<li><a href="#" onclick="switchAboutView(0);">News</a></li>
        			<li><a id="defaultMenuItem" href="#" onclick="switchAboutView(1);">About</a></li>
        			<li><a href="#" onclick="switchAboutView(4);">Alliance</a></li>
        			<li><a href="#" onclick="switchAboutView(2);">Projects</a></li>
        			<li><a href="#" onclick="switchAboutView(3);">Leaders</a></li>
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
						<?php include("../about/alliance.php"); ?>		
          </div>
					<div id="aboutIndex5" class="mod-about-frame">
						<?php include("../about/gallery.php"); ?>		
          </div>
				</div>
			</div>

			<!-- /About Context -->
			
		</div><!-- /container -->
		
		<!-- initialize major context -->
		<?php if (isset($_GET['context']) && !strcmp($_GET['context'], 'nexus')) { ?>
			<script type="text/javascript">
				switchToSponsor();
			</script>
		<?php } else { ?>
			<script type="text/javascript">
				switchToAbout();
			</script>				
		<?php } ?> 
		
		<script type="text/javascript">
			var stateObj = { foo: "bar" };
			history.pushState(stateObj, "", "index.php#");
		</script>	
		
		<?php } ?>		

	</body>
</html>
