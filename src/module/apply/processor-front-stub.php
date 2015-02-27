<?php

require_once("../core/domain/Util.php");
header("location:" . Util::getHttpApplyPath() . "/tester.php?view=volunteer&success=true");

?>