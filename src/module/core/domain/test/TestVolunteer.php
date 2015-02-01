<?php

define("CORE_ROOT", "http://localhost/waterwheel/module/core"); 

require_once(CORE_ROOT . "/lib/Validate.php");
require_once(CORE_ROOT . "/domain/Volunteer.php");

class TestVolunteer extends Volunteer {
	
	private $exception;
	
	public function setFname($in) {
		try { parent::setFname($in); }
		catch (Exception $e) { $this->exception = $e; }
	}

	public function activate() {
		$this->toString();
	}
	
	public function toString() {
		parent::toString();
		print_r($exception);
	}
	
}

?>