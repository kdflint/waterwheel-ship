<?php

define("CORE_ROOT", "http://localhost/waterwheel/module/core"); 

require_once(CORE_ROOT . "/lib/Validate.php");


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
	
	public function setFname($in) {
		if (isset($in) &&
			  Validate::string($in, array('min_length' => 1, 'max_length' => 25)) &&
			  $this->isCleanCharacterSet($in)) {
				 $this->fname = $in;
		} else {
			throw new Exception("Invalid state on first name.");
	  }
	}
	
	public function setLname($in) {
		if (isset($in)) {
			if (Validate::string($in, array('min_length' => 0, 'max_length' => 25)) &&
				  $this->isCleanCharacterSet($in)) {
					$this->setLname($in);
			} else {
			throw new Exception("Invalid state on last name.");
	  	}
		}
	}
	
	public function setEmail($in) {
		if (isset($_POST['email']) &&
			filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$this->email = $in;
		} else {
			throw new Exception("Invalid state on email.");
		}
	}
	
	public function setMotives($in) {
		if (isset($in)) {
			if (is_array($in)) {
				$clean = array();
				foreach ($in as $motiveId) {
					if (Validate::string($motiveId, array('format' => "1", "2", "3", "4", "5", "6", 'min_length' => 1, 'max_length' => 1))) {
						array_push($clean, $motiveId);
					}
				}
				if ($count($clean) == $count($in)) {
					$this->motives = $clean;
				}	else {
					throw new Exception("Invalid state on motives: invalid id");
				}
			} else {
				throw new Exception("Invalid state on motives: not an array");
			}
		}
	}
	
	public function setSkills($in) {
		if (isset($in)) {
			if (is_array($in)) {
				$clean = array();
				foreach ($in as $skillId) {
					if ($skillId >= 6 && $skillId <= 16) {
						array_push($clean, $skillId);
					}
				}
				if ($count($clean) == $count($in)) {
					$this->skills = $clean;
				}	else {
					throw new Exception("Invalid state on skills: invalid id");
				}
			} else {
				throw new Exception("Invalid state on skills: not an array");
			}
		}
	}
	
	public function setMotiveComment($in) {
		if (isset($in)) {
			if (Validate::string($in, array('min_length' => 0, 'max_length' => 50)) &&
					$this->isCleanCharacterSet($in)) {
						$this->motiveComment = $in;
			}	else {
					throw new Exception("Invalid state on motive comment.");
			}
		}
	}
	
	public function setSkillComment($in) {	
		if (isset($in)) {
			if (Validate::string($in, array('min_length' => 0, 'max_length' => 50)) &&
					$this->isCleanCharacterSet($in)) {
						$this->skillComment = $in;
			}	else {
					throw new Exception("Invalid state on skill comment.");
			}
		}
	}
	
	public function setAboutComment($in) {
		if (isset($in)) {
			if (Validate::string($in, array('min_length' => 0, 'max_length' => 500)) &&
					$this->isCleanCharacterSet($in)) {
						$this->setAboutComment($in);
			} else {
					throw new Exception("Invalid state on about comment.");
			}
		}
	}
	
	public function activate() {
		// connect to db
		// insert
		// generate messages
	}
	
	public function toString() {
		print_r($fname);
		print_r($lname);
		print_r($email);
		print_r($motives);
		print_r($skills);
		print_r($motiveComment);
		print_r($skillComment);
		print_r($aboutComment);
	}
	
	private function isCleanCharacterSet($in) {
		if (preg_match("/[<>%*&=\/\\!]/", $in)) {
			return false;
		}
	return true;
	}

}

?>