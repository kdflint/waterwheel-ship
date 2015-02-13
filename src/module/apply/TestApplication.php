<?php

require_once("../core/domain/Util.php");
require_once(Util::getFileDomainPath() . "/Application.php");

class TestApplication extends Application {
	
	public function apply() {
		$this->toString();
	}
	
	public function notify() {
		return;
	}
	
}

?>