<?php

require_once("Util.php");
require_once(PHP_ROOT . "Validate.php");

class Breadcrumb {
	
	private $campaign = 0;
	private $crumb = 0;
	
	public function __construct() { 
	}

	public function setCampaign($in) {
		if(Validate::string($in, array(
			'format' => VALIDATE_NUM,
			'min_length' => 1, 
			'max_length' => 2))) {
				$this->campaign = $in; 
		}
	}
	
	public function setCrumb($in) {
		if (ctype_xdigit($in)) {
			$this->crumb = hexdec($in);
		}
	}
	
	public function insert() {
		$query = "insert into breadcrumb (campaign, message) values ($1, $2)";
		Util::psExecute($query, array($this->campaign, $this->crumb));
	}
	
	public function toString() {
		echo "campaign=" . $this->campaign . "&message=" . $this->crumb;
	}
	
}