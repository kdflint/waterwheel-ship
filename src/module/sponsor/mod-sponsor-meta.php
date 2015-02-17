<?php 

require_once("../core/domain/Util.php");

?>

<!--================== Sponsor Module Meta ==================-->

<link rel="stylesheet" type="text/css" href='http://fonts.googleapis.com/css?family=PT+Sans+Narrow:400'>		
<link rel="stylesheet" type="text/css" href="<?php echo Util::getHttpSponsorPath(); ?>/mod-sponsor.css" />
<link href="<?php echo Util::getHttpSponsorPath(); ?>/lib/magic.14.7.24/stylesheets/magic.13.17.css" rel="stylesheet">

<script type="text/javascript" src="<?php echo Util::getHttpSponsorPath(); ?>/mod-sponsor.js"></script>				
<script type="text/javascript" src="<?php echo Util::getHttpSponsorPath(); ?>/lib/magic.14.7.24/magic.14.7.24.js" charset="UTF-8"></script>
<script type="text/javascript" src="<?php echo Util::getHttpSponsorPath(); ?>/lib/magic.14.7.24/wand.src.js" charset="UTF-8"></script>

<script type="text/javascript">
	$m.construct({
 		lang : "en_us"
		,create_html5 : true
		,global_debug : false
		,animations : { use : true }
		,ajax : { debug : false, visual : true, timeout : 15 }
		,geo : { use : false, debug : false, visual : true }
		,send_timezone_to : false
	});
</script>

