<?php 

require_once("domain/Util.php");
$coreHttpPath = Util::getHttpCorePath();

?>

<!--================== Core Module Meta ================== -->

<!-- initialize social media plugins -->
<script language="javascript" type="text/javascript" src="https://apis.google.com/js/platform.js" async defer></script>
<script language="javascript" type="text/javascript" src="//platform.linkedin.com/in.js"> lang: en_US</script>

<script language="javascript" type="text/javascript">(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>


<!-- http://purecss.io/ -->
<link rel="stylesheet" type="text/css" href="<?php echo $coreHttpPath; ?>/style/pure-min.css">
<!-- http://fortawesome.github.io/Font-Awesome/ -->
<link rel="stylesheet" type="text/css" href="<?php echo $coreHttpPath; ?>/style/font-awesome-4.2.0/css/font-awesome.min.css">
<!-- https://www.google.com -->
<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Oswald:400,300|Open+Sans|Oxygen:400,300,700|Swanky+and+Moo+Moo">
<link rel="stylesheet" type="text/css" href="<?php echo $coreHttpPath; ?>/style/style.css">		
<link rel="stylesheet" type="text/css" href="<?php echo $coreHttpPath; ?>/mod-core.css">	

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

