<?php

define("CORE_ROOT", "http://localhost/waterwheel/module/core"); 

require_once("Validate.php");
require_once("Volunteer.php");

class TestVolunteer extends Volunteer {
	
	public function activate() {
		$this->toString();
	}
	
}

?>