<?php 

require_once("../core/domain/Util.php");

?>

<!--================== Apply Module Meta ==================-->


<link rel="stylesheet" type="text/css" href="<?php echo Util::getHttpApplyPath(); ?>/mod-apply.css" />

<!-- register email-info lightbox close event -->
<script>
	$(document).mouseup(function (event){
    var clickedElement = event.target;
    if(clickedElement.id.substring(0,10) !== "info-email") {
			//hideInfoEmailField();
		}
    if(clickedElement.id.substring(0,10) !== "info-webinar") {
			//hideInfoWebinarField();
		}
	});
</script>

<script language="javascript" type="text/javascript" src="<?php echo Util::getHttpApplyPath(); ?>/mod-apply.js"></script>	