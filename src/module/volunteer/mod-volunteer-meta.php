<?php 

require_once("../../config/env_config.php");

define("VOLUNTEER_ROOT", "http://" . $env_host . "/waterwheel/module/volunteer"); 

?>

<!--================== Volunteer Module Meta ==================--!>


<link rel="stylesheet" type="text/css" href="<?php echo VOLUNTEER_ROOT; ?>/mod-volunteer.css" />

<script type="text/javascript" src="<?php echo VOLUNTEER_ROOT; ?>/mod-volunteer.js"></script>	