<?php

require_once("../../config/env_config.php");
require_once($env_fileRoot . "/php/Validate.php");

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