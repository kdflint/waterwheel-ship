<?php

require_once("../core/domain/Util.php");
require_once(Util::getFileDomainPath() . "/Volunteer.php");

class TestVolunteer extends Volunteer {
	
	public function activate() {
		$this->toString();
	}
	
	public function notify() {
		return;
	}
	
}

?>