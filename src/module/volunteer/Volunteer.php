<?php

define("CORE_ROOT", "http://localhost/waterwheel/module/core"); 

require_once("Validate.php");

class Volunteer {

	private $fname;
	private $lname;
	private $email;
	private $motives = array();
	private $skills = array();
	private $motiveComment;
	private $skillComment;
	private $aboutComment;
	
	public function __construct() { }
	
	public function setFname($fin) {
		if (isset($fin) &&
			  Validate::string($fin, array('min_length' => 1, 'max_length' => 25)) &&
			  $this->isCleanCharacterSet($fin)) {
				 $this->fname = $fin;
		} else {
			throw new Exception("Invalid state on first name.");
	  }
	  return;
	}
	
	public function setLname($lin) {
		if (isset($lin)) {
		 if (Validate::string($lin, array('min_length' => 0, 'max_length' => 25)) &&
			   $this->isCleanCharacterSet($lin)) {
					 $this->lname = $lin;
			} else {
				throw new Exception("Invalid state on last name.");
	  	}
		return;
		}		
	}
	
	public function setEmail($ein) {
		if (isset($ein) &&
			filter_var($ein, FILTER_VALIDATE_EMAIL)) {
			$this->email = $ein;
		} else {
			throw new Exception("Invalid state on email.");
		}
		return;
	}
	
	public function setMotives($min) {
		if (isset($min)) {
			if (is_array($min)) {
				$clean = array();
				foreach ($min as $motiveId) {
					if (Validate::string($motiveId, array('format' => "1", "2", "3", "4", "5", "6", 'min_length' => 1, 'max_length' => 1))) {
						array_push($clean, $motiveId);
					}
				}
				if ($count($clean) == $count($min)) {
					$this->motives = $clean;
				}	else {
					throw new Exception("Invalid state on motives: invalid id");
				}
			} else {
				throw new Exception("Invalid state on motives: not an array");
			}
		}
		return;
	}
	
	public function setSkills($sin) {
		if (isset($sin)) {
			if (is_array($sin)) {
				$clean = array();
				foreach ($sin as $skillId) {
					if ($skillId >= 6 && $skillId <= 16) {
						array_push($clean, $skillId);
					}
				}
				if ($count($clean) == $count($sin)) {
					$this->skills = $clean;
				}	else {
					throw new Exception("Invalid state on skills: invalid id");
				}
			} else {
				throw new Exception("Invalid state on skills: not an array");
			}
		}
		return;
	}
	
	public function setMotiveComment($mcin) {
		if (isset($mcin)) {
			if (Validate::string($mcin, array('min_length' => 0, 'max_length' => 50)) &&
					$this->isCleanCharacterSet($mcin)) {
						$this->motiveComment = $mcin;
			}	else {
					throw new Exception("Invalid state on motive comment.");
			}
		}
		return;
	}
	
	public function setSkillComment($scin) {	
		if (isset($scin)) {
			if (Validate::string($scin, array('min_length' => 0, 'max_length' => 50)) &&
					$this->isCleanCharacterSet($scin)) {
						$this->skillComment = $scin;
			}	else {
					throw new Exception("Invalid state on skill comment.");
			}
		}
		return;
	}
	
	public function setAboutComment($acin) {
		if (isset($acin)) {
			if (Validate::string($acin, array('min_length' => 0, 'max_length' => 500)) &&
					$this->isCleanCharacterSet($acin)) {
						$this->aboutComment = $acin;
			} else {
					throw new Exception("Invalid state on about comment.");
			}
		}
		return;
	}
	
	public function activate() {
		// insert to db
		$this->sendVolunteerWelcomeEmail();
		$this->sendCoachAlertEmail();
	}
	
	public function toString() {
		return "First name = " . $this->fname;
	}
	
	private function isCleanCharacterSet($in) {
		if (isset($in) && strlen($in) > 0) {
			if (preg_match("/[<>%*&=\/\\!]/", $in)) {
				return false;
			}
		}
	return true;
	}
	
	private function sendVolunteerWelcomeEmail() {
	}
	
	private function sendCoachAlertEmail() {
	}

}

?>