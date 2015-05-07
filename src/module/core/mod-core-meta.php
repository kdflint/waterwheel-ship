<?php 

require_once("domain/Util.php");
$coreHttpPath = Util::getHttpCorePath();
$envName = Util::getEnvName();

$viewArray = array("apply"=>"0", "sponsor"=>"1", "volunteer"=>"2", "apply_form"=>"0");
$viewSuccess = array(
	"volunteer"=>"Got it! Your confirmation email will be delivered in a few minutes.",
	"apply"=>"Got it! Your confirmation email will be delivered in a few minutes."
	);

// initialize slide focus
$slideIndex = 0;
if (isset($_GET['view']) && isset($viewArray[$_GET['view']])) {
  $slideIndex = $viewArray[$_GET["view"]];
  $_GET['context'] = "nexus";
}

// initialize user messages
$message = "";
if(isset($_GET['view']) && isset($_GET['success']) && isset($viewSuccess[$_GET['view']])) {
  $message = $viewSuccess[$_GET["view"]];
}

?>

<!--================== Core Module Meta ==================-->

<meta name="viewport" content="width=device-width,initial-scale=1">

<!-- http://purecss.io/ -->
<link rel="stylesheet" type="text/css" href="<?php echo $coreHttpPath; ?>/style/pure-min.css" />
<!-- http://fortawesome.github.io/Font-Awesome/ -->
<link rel="stylesheet" type="text/css" href="<?php echo $coreHttpPath; ?>/style/font-awesome-4.2.0/css/font-awesome.min.css">
<!-- https://www.google.com -->
<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Oswald:400,300|Open+Sans|Oxygen|Swanky+and+Moo+Moo">
<link rel="stylesheet" type="text/css" href="<?php echo $coreHttpPath; ?>/style/style.css" />		
<link rel="stylesheet" type="text/css" href="<?php echo $coreHttpPath; ?>/mod-core.css" />	

<!-- Stripe -->
<script language="javascript" type="text/javascript" src="https://checkout.stripe.com/v2/checkout.js"></script>
<script language="javascript" type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js"></script>

<script language="javascript" type="text/javascript" src="<?php echo $coreHttpPath; ?>/lib/jquery.js"></script>
<script language="javascript" type="text/javascript" src="<?php echo $coreHttpPath; ?>/lib/script.js" ></script>
<script language="javascript" type="text/javascript" src="<?php echo $coreHttpPath; ?>/lib/jquery.hslides.js"></script>
<script language="javascript" type="text/javascript" src="<?php echo $coreHttpPath; ?>/lib/jquery.easing.js"></script>

<!-- initialize horizontal sliders, using context passed to page -->
<script language="javascript" type="text/javascript">
		$((function(){
			enterFunction = function(){
				$(this).html('ACTIVE');
			}
			leaveFunction = function(){
				$(this).html('inactive');
			}
			$('.accordion1').hSlides({
				totalWidth: 740,
				totalHeight: 90,
				minPanelWidth: 120,
				maxPanelWidth: 500
			});
			$('li:eq(<?php echo $slideIndex; ?>)').trigger('click');
		}
		));
</script>

<!-- initialize social media plugins -->
<script language="javascript" type="text/javascript" src="https://apis.google.com/js/platform.js" async defer></script>
<script language="javascript" type="text/javascript" src="//platform.linkedin.com/in.js"> lang: en_US</script>
<div id="fb-root"></div>
<script language="javascript" type="text/javascript">(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

