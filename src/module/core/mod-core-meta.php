<?php define("CORE_ROOT", "http://localhost/waterwheel/module/core"); ?>

<!--================== Core Module Meta ==================--!>

<!-- http://purecss.io/ -->
<link rel="stylesheet" type="text/css" href="<?php echo CORE_ROOT; ?>/style/pure-min.css" />
<!-- http://fortawesome.github.io/Font-Awesome/ -->
<link rel="stylesheet" type="text/css" href="<?php echo CORE_ROOT; ?>/style/font-awesome-4.2.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="<?php echo CORE_ROOT; ?>/style/style.css" />				
<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Numans|Nova+Round|Nova+Square|Coda|Oswald:400,300|Nunito:400,300|Asap|Dosis:400,500,300|Ropa+Sans&subset=latin,latin-ext">
<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Open+Sans|Roboto|Lato|Montserrat|Nobile|Varela|Doppio+One|Convergence|Share+Tech|Noto+Sans|Oxygen|Varela+Round|Chivo|Inder|Spinnaker'>
<link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>

<script language="javascript" type="text/javascript" src="<?php echo CORE_ROOT; ?>/lib/jquery.js"></script>
<script language="javascript" type="text/javascript" src="<?php echo CORE_ROOT; ?>/lib/script.js" ></script>
<script language="javascript" type="text/javascript" src="<?php echo CORE_ROOT; ?>/lib/jquery.hslides.js"></script>
<script language="javascript" type="text/javascript" src="<?php echo CORE_ROOT; ?>/lib/jquery.easing.js"></script>
		
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
				totalHeight: 90,
				minPanelWidth: 120,
				maxPanelWidth: 520
			});
		}
		));
</script>
	
<!-- initialize horizontal sliders - remove??
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
-->