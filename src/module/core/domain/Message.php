<?php

require_once("Util.php");

class Message {
	
	// These constants correspond to message_type table pk
	const VOLUNTEER_CONFIRM = 1;
	const VOLUNTEER_NOTIFY = 2;
	const APPLICATION_CONFIRM = 3;
	const APPLICATION_NOTIFY = 4;

	private $type;
	private $replyTo;
	private $from;
	private $team;
	private $message;
	private $to;	
	private $name;

	public function __construct($typeId) {
		$this->type = $typeId; 
		$this->from = $this->getFrom($this->type);
		$this->team = $this->getTeam($this->type);
		$this->message = $this->getMessage($this->type);
	}
	
	public function setToAddr($to) {
		$this->to = $to;
	}

	public function setSalutationName($name) {
		$this->name = $name;
	}
	
	private function getFrom($typeId) {
		return "Northbridge <noreply@northbridgetech.org>";
	}
	
	private function getTeam($typeId) {
		switch ($typeId) {
	    case VOLUNTEER_CONFIRM:
       	return "Technology Alliance";
       	break;
    	case VOLUNTEER_NOTIFY:
        return "Internal";
        break;
    	case APPLICATION_CONFIRM:
        return "Technology Alliance";
        break;
      case APPLICATION_NOTIFY;
      	return "Internal";
      	break;
    	default:
        return "";
		}
	}
	
	private function getMessage($typeId) {
		switch ($typeId) {
	    case VOLUNTEER_CONFIRM:
       	return "Thanks for your interest in Northbridge!";
       	break;
    	case VOLUNTEER_NOTIFY:
        return "A new volunteer submission has been received.";
        break;
    	case APPLICATION_CONFIRM:
        return "We have received your application.";
        break;
      case APPLICATION_NOTIFY;
      	return "A new grant applicaton has been received.";
      	break;
    	default:
        return "";
		}		
	}

}

?>