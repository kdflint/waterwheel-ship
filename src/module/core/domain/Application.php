<?php

require_once("Util.php");

class Application {

	private $uuid;
	private $oname;
	private $ein;
	private $url;
	private $budget;
	private $tname;
	private $cname;
	private $email;
	private $services = array();
	private $serviceComment;
	private $reach;
	private $mission;
	
	public function __construct() { 
	}
	
	public function setOname($oin) {
		if (isset($oin) &&
			  Validate::string($oin, array('min_length' => 1, 'max_length' => 75)) &&
			  Util::isCleanCharacterSet($oin)) {
				 $this->oname = $oin;
		} else {
			throw new Exception("Invalid state on organization name.");
	  }
	  return;
	}
	
	public function setTname($tin) {
		if (isset($tin) &&
			  Validate::string($tin, array('min_length' => 1, 'max_length' => 50)) &&
			  Util::isCleanCharacterSet($tin)) {
				 $this->tname = $tin;
		} else {
			throw new Exception("Invalid state on team name.");
	  }
	  return;
	}
	
		public function setCname($cin) {
		if (isset($cin) &&
			  Validate::string($cin, array('min_length' => 1, 'max_length' => 50)) &&
			  Util::isCleanCharacterSet($cin)) {
				 $this->cname = $cin;
		} else {
			throw new Exception("Invalid state on contact name.");
	  }
	  return;
	}

	public function setEmail($email) {
		if (isset($email) &&
			filter_var($email, FILTER_VALIDATE_EMAIL) &&
			strlen($email) <= 100) {
			$this->email = $email;
		} else {
			throw new Exception("Invalid state on email.");
		}
		return;
	}
	
	public function setEin($ein) {
		$tmp;
		if (isset($ein)) {
			$tmp = str_replace("-","",$ein);
		}
		if (isset($tmp) &&
			  Validate::string($tmp, array('format' => VALIDATE_NUM, 'min_length' => 9, 'max_length' => 9))) {
				 $this->ein = $tmp;
		} else {
			throw new Exception("Invalid state on ein.");
	  }
	  return;
	}
	
	public function setUrl($url) {
		if (isset($url) &&
			// TODO - finish this validation
			// filter_var($url, FILTER_VALIDATE_URL, FILTER_FLAG_HOST_REQUIRED) &&
			strlen($url) <= 100) {
			$this->url = $url;
		} else {
			throw new Exception("Invalid state on web address.");
		}
		return;
	}
	
	public function setReach($rin) {
		if (isset($rin) &&
			  Validate::string($rin, array('min_length' => 1, 'max_length' => 100)) &&
			  Util::isCleanCharacterSet($rin)) {
				 $this->reach = $rin;
		} else {
			throw new Exception("Invalid state on service reach.");
	  }
	  return;
	}
	
	public function setMission($min) {
		if (isset($min) &&
			  Validate::string($min, array('min_length' => 1, 'max_length' => 300)) &&
			  Util::isCleanCharacterSet($min)) {
				 $this->mission = $min;
		} else {
			throw new Exception("Invalid state on mission.");
	  }
	  return;
	}
		
	public function setServices($svin) {
		if (isset($svin)) {
			if (is_array($svin)) {
				$clean = array();
				foreach ($svin as $serviceId) {
					if (Validate::number($serviceId, array('decimal' => 'false', 'min' => 1, 'max' => 9))) { 
						array_push($clean, $serviceId);
					}
				}
				if (count($clean) == count($svin)) {
					$this->services = $clean;
				}	else {
					throw new Exception("Invalid state on services: invalid id");
				}
			} else {
				throw new Exception("Invalid state on services: not an array");
			}
		}
		return;
	}
	
	// TODO - service comment not getting into db - what's up?
	public function setServiceComment($scin) {
		if (isset($scin)) {
			if (Validate::string($scin, array('min_length' => 0, 'max_length' => 50)) &&
					Util::isCleanCharacterSet($scin)) {
						$this->serviceComment = $scin;
			}	else {
					throw new Exception("Invalid state on service comment.");
			}
		}
		return;
	}
	
	public function setBudget($bid) {
		if (isset($bid) &&
			Validate::number($bid, array('decimal' => 'false', 'min' => 1, 'max' => 6))) {
				$this->budget = $bid;			
		} else {
			throw new Exception("Invalid state on budget.");
		}
	}
	
	private function setUuid() {
		$this->uuid = Util::newUuid();
	}
		
	public function apply() {
		return $this->insertApplication();
	}
	
	public function notify() {
		$this->queueApplicationConfirmMessage();
		$this->queueApplicationNotifyMessage();
	}
	
	public function toString() {
		return "Organization name = " . $this->oname;
		// TODO - finish implementation
	}
		
	private function insertApplication() {
		$this->setUuid();
		$query = "insert into grant_application (uuid, oname, ein, url, budget_id_fk, tname, cname, email, reach, mission, status_id_fk) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, '6') returning id";
		$result = Util::psExecute($query, array($this->uuid, $this->oname, $this->ein, $this->url, $this->budget, $this->tname, $this->cname, $this->email, $this->reach, $this->mission));
		$row = pg_fetch_row($result);
		$appId = $row[0];

		$query = "insert into grant_application_service_area (grant_application_id_fk, service_area_id_fk) values ($1, $2)";			
		foreach ($this->services as $serviceId) {
			Util::psExecute($query, array($appId, $serviceId));
		}
		
		if (isset($this->serviceComment) && strlen($this->serviceComment) > 0) {
			$query = "update grant_application_service_area set note = $1 where grant_application_id_fk = " . $appId . " and service_area_id_fk = '9'";
			Util::psExecute($query, array($this->serviceComment));
		}

		return;
	}

	private function queueApplicationConfirmMessage() {
		$query = Util::getMessageQueueInsert();
		$result = Util::psExecute($query, array("3", $this->email, $this->cname));
		return;
	}
	
	private function queueApplicationNotifyMessage() {
		$query = Util::getMessageQueueInsert();
		$result = Util::psExecute($query, array("4", "kathy.flint@northbridgetech.org", "Kathy"));
		return;
	}

}

?>