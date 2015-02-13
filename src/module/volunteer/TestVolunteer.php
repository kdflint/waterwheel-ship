<?php

require_once("../../config/env_config.php");
require_once($env_fileRoot . "/Validate.php");
require_once("Volunteer.php");

define("CORE_ROOT", "http://" . $env_host . "/waterwheel/module/core"); 

class TestVolunteer extends Volunteer {
	
	public function activate() {
		$this->toString();
	}
	
	public function notify() {
		return;
	}
	
}

?>