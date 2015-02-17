<?php

require_once("Util.php");

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
			  Util::isCleanCharacterSet($fin)) {
				 $this->fname = $fin;
		} else {
			throw new Exception("Invalid state on first name.");
	  }
	  return;
	}
	
	public function setLname($lin) {
		if (isset($lin)) {
		 if (Validate::string($lin, array('min_length' => 0, 'max_length' => 25)) &&
			   Util::isCleanCharacterSet($lin)) {
					 $this->lname = $lin;
			} else {
				throw new Exception("Invalid state on last name.");
	  	}
		return;
		}		
	}
	
	public function setEmail($ein) {
		if (isset($ein) &&
			filter_var($ein, FILTER_VALIDATE_EMAIL) &&
			strlen($ein) <= 100) {
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
					if (Validate::number($motiveId, array('decimal' => 'false', 'min' => 1, 'max' => 6))) { 
						array_push($clean, $motiveId);
					}
				}
				if (count($clean) == count($min)) {
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
					if (Validate::number($skillId, array('decimal' => 'false', 'min' => 6, 'max' => 16))) {
						array_push($clean, $skillId);
					}
				}
				if (count($clean) == count($sin)) {
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
					Util::isCleanCharacterSet($mcin)) {
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
					Util::isCleanCharacterSet($scin)) {
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
					Util::isCleanCharacterSet($acin)) {
						$this->aboutComment = $acin;
			} else {
					throw new Exception("Invalid state on about comment.");
			}
		}
		return;
	}
	
	public function activate() {
		return $this->insertVolunteer();
	}
	
	public function notify() {
		$this->queueVolunteerConfirmMessage();
		$this->queueVolunteerNotifyMessage();
	}
	
	public function toString() {
		return "First name = " . $this->fname;
		// TODO - finish impl
	}
			
	public function insertVolunteer() {
		$query = "insert into volunteer (email, fname, lname, descr, status_id_fk) values ($1, $2, $3, $4, '1') returning id";
		$result = Util::psExecute($query, array($this->email, $this->fname, $this->lname, $this->aboutComment));
		$row = pg_fetch_row($result);
		$volunteerId = $row[0];

		$query = "insert into volunteer_skill (volunteer_id_fk, skill_id_fk) values ($1, $2)";			
		foreach ($this->skills as $skillId) {
			Util::psExecute($query, array($volunteerId, $skillId));
		}
		
		if (isset($this->skillComment) && strlen($this->skillComment) > 0) {
			$query = "update volunteer_skill set note = $1 where volunteer_id_fk = " . $volunteerId . " and skill_id_fk = '16'";
			Util::psExecute($query, array($this->skillComment));
		}
		
		$query = "insert into volunteer_motive (volunteer_id_fk, motive_id_fk) values ($1, $2)";			
		foreach ($this->motives as $motiveId) {
			Util::psExecute($query, array($volunteerId, $motiveId));
		}
		
		if (isset($this->motiveComment) && strlen($this->motiveComment) > 0) {
			$query = "update volunteer_motive set note = $1 where volunteer_id_fk = " . $volunteerId . " and motive_id_fk = '6'";
			Util::psExecute($query, array($this->motiveComment));
		}	
		return;
	}
	
	private function queueVolunteerConfirmMessage() {
		$query = Util::getMessageQueueInsert();
		$result = Util::psExecute($query, array("1", $this->email, $this->fname . " " . $this->lname));
		return;
	}
	
	private function queueVolunteerNotifyMessage() {
		$query = Util::getMessageQueueInsert();
		$result = Util::psExecute($query, array("2", "kathy.flint@northbridgetech.org", "Coaches"));
		return;
	}
	
}

?>