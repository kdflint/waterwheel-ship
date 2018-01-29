<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<?php 

require_once("domain/Util.php");
require_once("domain/Breadcrumb.php");

$campaign = $message = $marketerId = "";
$crumb = new Breadcrumb();
$specialOfferTrigger = "false";
$useragent = $_SERVER['HTTP_USER_AGENT'];
$msie_8 = FALSE;
$mobileHttpPath = Util::getHttpMobilePath();
$viewArray = array("apply"=>"2", "sponsor"=>"1", "volunteer"=>"2", "apply_form"=>"2", "membership"=>"0");
$viewSuccess = array(
	"volunteer"=>"Got it! Your confirmation email will be delivered in a few minutes.",
	"apply_form"=>"Got it! Your confirmation email will be delivered in a few minutes."
	);
$isMemberContext = false;
$slideIndex = 0;
$userMessage = "";

if (isset($_GET['c']) && strlen($_GET['c']) > 0 && Util::isCleanCharacterSet($_GET['c'])) {
	$campaign = substr($_GET['c'],0,2);
	$crumb->setCampaign($campaign);
	if (isset($_GET['m']) && strlen($_GET['m']) > 0 && Util::isCleanCharacterSet($_GET['m'])) {
		$message = substr($_GET['m'],0,4);
		$crumb->setCrumb($message);
	}
	$crumb->insert();
}

// initialize Apply link according to most recent marketer referral
if (isset($_GET['r']) && strlen($_GET['r']) == 1 && Util::isAllowedMarketerId($_GET['r'])) {
	$marketerId = $_GET['r'];
	setcookie("member_campaign_id", $marketerId, time() + (86400 * 30), "/"); // 86400 = 1 day
} else if (isset($_COOKIE['member_campaign_id']) && strlen($_COOKIE['member_campaign_id']) == 1 && Util::isAllowedMarketerId($_COOKIE['member_campaign_id'])) {
	$marketerId = $_COOKIE['member_campaign_id'];
} else {
	$marketerId = "1";
}
//$applyLink = Util::getMemberRegrUrl($marketerId);
$applyLink = "http://northbridgetech.org/apps/members/grant";

if (!strcmp($campaign, '2')) {
 $specialOfferTrigger = "true"; 
}

if ($useragent) {
	$msie_8 = strpos($useragent, 'MSIE 8') || strpos($useragent, 'MSIE 7') ||  strpos($useragent, 'MSIE 6') ? TRUE : FALSE;
}

if (isset($_GET['context']) && !strcmp($_GET['context'], 'desktop')) {
	// request is explicitly for desktop site - bypass mobile redirect
} else {
	if(Util::isMobileUserAgent($useragent)) { 
		header('Location: ' . $mobileHttpPath . '/index.php?context=mobile');
		exit(0);
	} else if($msie_8) { 
		header('Location: ' . $mobileHttpPath . '/index.php?context=ie8');
		exit(0);
	}
}

// initialize slide focus
if (isset($_GET['view']) && isset($viewArray[$_GET['view']])) {
  $slideIndex = $viewArray[$_GET["view"]];
  $isMemberContext = true;
}

// initialize user messages
if(isset($_GET['view']) && isset($_GET['success']) && isset($viewSuccess[$_GET['view']])) {
  $userMessage = $viewSuccess[$_GET["view"]];
}

?>

<html>

	<head>
		<title>Northbridge Technology Alliance</title>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8">		
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<meta name="description" content="Nonprofit. Technology grants for social justice leaders. Shouldn't your technology be as great as you are?">
		<?php 
			include("mod-core-meta.php");
			include("../apply/mod-apply-meta.php"); 
			include("../sponsor/mod-sponsor-meta.php"); 
			include("../volunteer/mod-volunteer-meta.php"); 
			include("../about/mod-about-meta.php"); 
		?>		
		
<!--================== End Meta ==================-->

	<script type="text/javascript">
		imagePath = '<?php echo Util::getHttpCorePath() . "/images"; ?>';		

		$(window).load(function() { // makes sure the whole site is loaded
			$("#status").fadeOut("slow"); // will first fade out the loading animation
			$("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website
      $("#members-icon-gallery").mThumbnailScroller({
      	axis:"y",
				type:"click-52",
				style:"buttons-in"
      });
			$('body').on('keypress', '#info-email', function(args) {
				// Enter key is pressed inside the information form
    		if (args.keyCode == 13) {
       	 	$("#info-email-button").click();
        	return false;
    		}
			});
			if (<?php echo $specialOfferTrigger; ?>) {
				showSpecialOfferField();
			}
		})
	</script>
	
	</head>

	<body>
		<div id="preloader">
			<div id="status" style="font-size:200%;">
				One moment... 
			</div>
		</div>

		<div class="container">
			<div id="curtain" class="curtain"></div>
					
			<!-- Sponsor Context -->
			<div id="sponsorApp" class="sponsorApp">
				<div class="sponsorHeader">
					<div class="sponsorHeaderLeft">
						<p class="skyblue sponsorHeaderHeadline" style="line-height:130%;">2018<br/>Tech Grant for<br/>social justice leaders</p>
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
									<div class="title"><strong>Why?</strong>
										<p><span class="fa fa-handshake-o fa-4x tan" style="margin-top:-5px"></span></p>
									</div>
									<h1 class="slider white">2018 Technology Grant</h1>
									<p class="white" style="font-size:115%;margin-top:15px;">Valued at $5,000</p>
								</div>
							</li>
							<li class="two">
								<div class="headerbox">	
									<div class="title"><strong>What?</strong>
										<p><span class="fa fa-users fa-3x tan" ></span></p>
									</div>
									<h1 class="slider white">2018 Technology Grant</h1>
									<p class="white" style="font-size:115%;margin-top:15px;">Valued at $5,000</p>
									<p class="white"><b></b></p>
								</div>
							</li>
							<li class="three" id="volunteer-tab">
								<div class="headerbox">
									<div class="title"><strong>Who?</strong>
										<p><span class="fa fa-id-card-o fa-3x otherblue"></span></p>
									</div>
									<h1 class="slider skyblue">2018 Technology Grant</h1>
									<p class="skyblue" style="font-size:115%;margin-top:15px;"><b>Valued at $5,000</b></p>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="allianceContent">
					<div id="madeUp_index0">
						<?php 
							//include("../apply/mod-apply.php");
							include("../apply/mod-info.php");
							if (isset($_GET['view']) && !strcmp($_GET['view'], 'apply_form')) {
								// For now, this behaviour is overridden by jquery.hslides.js condition at about line 119 (activeIndex == 0)
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
					<div id="sm-links" style="margin-top:10px;margin-bottom:10px;">
						<a href="https://twitter.com/<?php echo Util::getTwitterHandle(); ?>" target="_blank"><span class="fa fa-twitter fa-3x skyblue" style="margin-left:5px;"></span></a>
						<a href="//plus.google.com/u/0/101145194341428988499?prsrc=3" rel="publisher" target="_blank" style="text-decoration:none;"><span class="fa fa-google-plus-square fa-3x skyblue" style="margin-left:5px;"></span></a>						
						<a href="https://www.linkedin.com/company/2232384" target="_blank"><span class="fa fa-linkedin fa-3x skyblue" style="margin-left:5px;"></span></a>
						<a href="https://www.facebook.com/northbridgenfp#" target="_blank"><span class="fa fa-facebook-square fa-3x skyblue" style="margin-left:5px;"></span></a>
						<a href="https://github.com/NorthBridge/playbook/wiki/1.How-We-Do" target="_blank"><span class="fa fa-github fa-3x skyblue" style="margin-left:5px;"></span></a>
					</div>
					<!-- Twitter widget
					<a class="twitter-timeline" width="520" height="415" href="https://twitter.com/NorthbridgeNFP" data-widget-id="568601776015024128">Tweets by @NorthbridgeNFP</a>
					<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
					-->
					<!-- EventBrite widget
						<div style="width:200px;text-align:center;margin-left:5px;margin-top:10px;" >
							<iframe  src="https://www.eventbrite.com/calendar-widget?eid=16317964471&showPrivate=1&sig=AGbIMNxpHUlRkcT_ZbQGyQ7X_arlwKyFyQ" frameborder="0" height="377" width="200" marginheight="0" marginwidth="0" scrolling="no" allowtransparency="true">
							</iframe>
							<div style="font-family:Helvetica, Arial; font-size:10px; padding:5px 0 5px; margin:2px; width:195px; text-align:center;" >
								<a style="color:#ddd; text-decoration:none;" target="_blank" href="http://www.eventbrite.com/r/ecal">Event management</a> 
								<span style="color:#ddd;">powered by</span> 
								<a style="color:#ddd; text-decoration:none;" target="_blank" href="http://www.eventbrite.com?ref=ecal">Eventbrite</a>
							</div>
						</div>
						-->
						<div id="members-icon-gallery" class="icon-gallery">
						
  						<ul>
								<li><img src="<?php echo Util::getHttpCorePath(); ?>/images/icon-gallery/cala_banner.jpg" /></li>
								<li><img src="<?php echo Util::getHttpCorePath(); ?>/images/icon-gallery/cat.gif" /></li>
								<li><img src="<?php echo Util::getHttpCorePath(); ?>/images/icon-gallery/edc_logo.png" /></li>
								<li><img src="<?php echo Util::getHttpCorePath(); ?>/images/icon-gallery/ibarj_complete.png" /></li>
								<li><img src="<?php echo Util::getHttpCorePath(); ?>/images/icon-gallery/sunflower_foundation.jpg" /></li>
								<li><img src="<?php echo Util::getHttpCorePath(); ?>/images/icon-gallery/courage_campaign.jpg" /></li>
								<li><img src="<?php echo Util::getHttpCorePath(); ?>/images/icon-gallery/ayuda.png" /></li>
								<li><img src="<?php echo Util::getHttpCorePath(); ?>/images/icon-gallery/cfhr.png" /></li>
								<li><img src="<?php echo Util::getHttpCorePath(); ?>/images/icon-gallery/fh.png" /></li>
								<li><img src="<?php echo Util::getHttpCorePath(); ?>/images/icon-gallery/cfcht_logo.png" /></li>
								<li><img src="<?php echo Util::getHttpCorePath(); ?>/images/icon-gallery/crossroads.jpg" /></li>
								<li><img src="<?php echo Util::getHttpCorePath(); ?>/images/icon-gallery/roosevelt_univ.png" /></li>
								<li><img src="<?php echo Util::getHttpCorePath(); ?>/images/icon-gallery/prc.jpg" /></li>
								<li><img src="<?php echo Util::getHttpCorePath(); ?>/images/icon-gallery/worldtrust.png" /></li>
  						</ul>
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
					<img src="images/NB_horizontal_tagline_rgb.png" width="515" height="160" style="padding:30px 10px 10px 30px;" />
					<div id="aboutQuote0" class="mod-about-quotes">[News is] a first rough draft of history.<br/>P. Graham</div>
					<div id="aboutQuote1" class="mod-about-quotes" style="visibility:visible;opacity:1;">In the shadow of each other, the people live.<br/>Proverb</div>
					<div id="aboutQuote2" class="mod-about-quotes">It always seems impossible until it's done.<br/>N. Mandela</div>
					<div id="aboutQuote3" class="mod-about-quotes">To&nbsp;build&nbsp;community requires vigilant awareness...<br/>b. hooks</div>
					<div id="aboutQuote4" class="mod-about-quotes">together... we might just be able to fix it...<br/>J. Cascio</div>
					<div id="aboutQuote5" class="mod-about-quotes">All in, no regrets.<br/>K. Flint</div>
					<div style="position:absolute;top:135px;left:590px;"> 
						<a href="http://members.northbridgetech.org/donate" target="_blank"><img src="images/donate-now.png" width="150" height="57" /></a>
						<!--
						<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank"> 
							<input type="hidden" name="cmd" value="_s-xclick"> <input type="hidden" name="notify_url" value="http://northbridgetech.org/paypalIpnListener.php"> <input type="hidden" name="hosted_button_id" value="CR3GPPFSE7ARW">
							<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" style="position:absolute;margin-left:30px;margin-top:18px;"> 
							<a href="javascript:void(0)" onclick="alert('To donate by check, please mail your contribution to:\n\nNorthbridge Technology Alliance\n400 South Blvd., Unit A\nEvanston, IL  60202')" style="position:absolute;margin-left:135px;"><img src="images/Check_Pen.png" alt="by Check" ></a>
							<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"> 
						</form> 
						-->
					</div>
					<div class="pure-menu pure-menu-open pure-menu-horizontal" style="margin-left:47px;font-size:140%;letter-spacing:.75px;">
	   				<ul>
        			<li><a id="defaultMenuItem" href="#" onclick="switchAboutView(1);" tabindex="1">About</a></li>
        			<li><a href="#" onclick="switchAboutView(2);" tabindex="2">Nexus</a></li>
        			<li><a href="#" onclick="switchToGrant();" tabindex="5">Grants</a></li>
        			<li><a href="#" onclick="switchAboutView(4);" tabindex="3">Impact</a></li>
        			<li><a id="peopleMenuItem" href="#" onclick="switchAboutView(3);" tabindex="4">People</a></li>
        			<!--<li><a href="#" onclick="switchAboutView(0);" tabindex="5">Blog</a></li>-->
        			<li><a href="#" onclick="switchAboutView(5);" tabindex="6">Gallery</a></li>
    				</ul>
					</div>
				</div>
				<div class="aboutContent">
					<div id="aboutIndex0" class="mod-about-frame">
						<!--<?php include("../about/news.php"); ?>	-->	
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
		<?php if (true) { ?>
		<?php //if ($isMemberContext) { ?>
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
			
		<script type="text/javascript">
			transformYouTubeDivs();
		</script>

	</body>
</html>
