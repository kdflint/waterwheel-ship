<?php

require_once("../core/domain/Util.php");
header("location:" . Util::getHttpVolunteerPath() . "/tester.php?view=volunteer&success=true");

?>