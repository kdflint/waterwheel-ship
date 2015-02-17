<?php 

require_once("domain/Util.php");
$coreHttpPath = Util::getHttpCorePath();
$envName = Util::getEnvName();
$viewArray = array("apply"=>"0", "sponsor"=>"1", "volunteer"=>"2");
$slideIndex = 0;
if(isset($_GET['view']) && isset($viewArray[$_GET['view']])) {
  $slideIndex = $viewArray[$_GET["view"]];
}

?>

<!--================== Core Module Meta ==================-->

<!-- initialize calendar widget -->
<script id="spc-event-calendar-script" src="http://northbridgetech.org/dev/nexus/module/calendar/services/event-calendar/event-calendar.php?accessKey=98641b8c5f580fd30198f0d162e55a1e"></script>

<script>
  initSPCWidgets(function() {
     $("#calendars").spcCalendars();
     $("#month-calendar").spcMonthCalendar();
     $("#upcoming-events").spcUpcomingEvents();
     $("#event-search").spcSearch();
     $("#event-list").spcEventList();
   });
</script>

<!-- http://purecss.io/ -->
<link rel="stylesheet" type="text/css" href="<?php echo $coreHttpPath; ?>/style/pure-min.css" />
<!-- http://fortawesome.github.io/Font-Awesome/ -->
<link rel="stylesheet" type="text/css" href="<?php echo $coreHttpPath; ?>/style/font-awesome-4.2.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="<?php echo $coreHttpPath; ?>/style/style.css" />				
<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Numans|Nova+Round|Nova+Square|Coda|Oswald:400,300|Nunito:400,300|Asap|Dosis:400,500,300|Ropa+Sans&subset=latin,latin-ext">
<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Open+Sans|Roboto|Lato|Montserrat|Nobile|Varela|Doppio+One|Convergence|Share+Tech|Noto+Sans|Oxygen|Varela+Round|Chivo|Inder|Spinnaker'>
<link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>

<script language="javascript" type="text/javascript" src="<?php echo $coreHttpPath; ?>/lib/jquery.js"></script>
<script language="javascript" type="text/javascript" src="<?php echo $coreHttpPath; ?>/lib/script.js" ></script>
<script language="javascript" type="text/javascript" src="<?php echo $coreHttpPath; ?>/lib/jquery.hslides.js"></script>
<script language="javascript" type="text/javascript" src="<?php echo $coreHttpPath; ?>/lib/jquery.easing.js"></script>
		
<!-- initialize horizontal sliders, using context passed to page -->
<script type="text/javascript">
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



