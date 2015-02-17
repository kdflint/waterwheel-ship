<?php

require_once("Util.php");

class Message {

	// These constants correspond to message_type table pk
	const VOLUNTEER_CONFIRM = 1;
	const VOLUNTEER_NOTIFY = 2;
	const APPLICATION_CONFIRM = 3;
	const APPLICATION_NOTIFY = 4;

	private $typeNames = array(
		"None",
		"Volunteer Submission Confirmation",
		"Volunteer Submission Notification",
		"Application Submission Confirmation",
		"Application Submission Notification"
	);

	private $type;
	private $replyTo;
	private $bcc = "kathy.flint@northbridgetech.org";
	private $subject;
	private $from;
	private $team;
	private $messageBody;
	private $to;	
	private $name;

	public function __construct($typeId) {
		$this->type = $typeId; 
		$this->subject = $this->getSubject($this->type);
		$this->from = $this->getFrom($this->type);
		$this->team = $this->getTeam($this->type);
		$this->messageBody = $this->getMessageBody($this->type);
	}
	
	public function setToAddr($to) {
		$this->to = $to;
	}

	public function setSalutationName($name) {
		$this->name = $name;
	}

	private function getFrom($typeId) {
		return "Northbridge Technology Alliance <noreply@northbridgetech.org>";
	}

	private function getSubject($typeId) {
		switch ($typeId) {
	    case self::VOLUNTEER_CONFIRM:
       	return "Volunteer Submission Confirmation";
    	case self::VOLUNTEER_NOTIFY:
        return "Volunteer Notification";
    	case self::APPLICATION_CONFIRM:
        return "Application Subject";
      case self::APPLICATION_NOTIFY;
      	return "Application Notification";
    	default:
        return "";
		}
	}
	
	private function getTeam($typeId) {
		switch ($typeId) {
	    case self::VOLUNTEER_CONFIRM:
       	return "Technology Alliance";
    	case self::VOLUNTEER_NOTIFY:
        return "Internal";
    	case self::APPLICATION_CONFIRM:
        return "Technology Alliance";
      case self::APPLICATION_NOTIFY;
      	return "Internal";
    	default:
        return "";
		}
	}
	
	private function getMessageBody($typeId) {
		switch ($typeId) {
	    case self::VOLUNTEER_CONFIRM:
	    // TODO - need a real reply address in case email is in error
       	return "Thanks for your interest in volunteering with Northbridge! We look forward to welcoming you into some interesting project work.\r\n\r\nA team coach will contact you at this email address within a few days to talk about the next steps.\r\n\r\nIf you believe you have received this message in error, would you kindly reply and let us know?";
    	case self::VOLUNTEER_NOTIFY:
        return "A new volunteer submission has been received.";
    	case self::APPLICATION_CONFIRM:
    	// TODO - finish
        return "Thank you for your application for space in the Northbridge Technology Alliance global web conference center.";
      case self::APPLICATION_NOTIFY;
      	return "A new grant applicaton has been received.";
    	default:
        return "";
		}		
	}
	
	private function constructHtmlMessage($boundary) {
		$formatLineBreaks = str_replace("\r\n\r\n", "</p><p>",$this->messageBody);
		return "--" . $boundary . "
Content-Type: text/html; charset=\"iso-8859-1\"
Content-Transfer-Encoding: 7bit

<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01//EN'>
<html>
	<head>
		<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Oxygen'>
	</head>
	<body style='font-family:Oxygen,Arial,sans-serif;color:#333333;'>
		<table style='width:90%;display:block;max-width:620px;'>
			<tr><td><img src='http://northbridgetech.org/dev/waterwheel/module/core/images/NB_horizontal_rgb.png' alt='Northbridge Technology Alliance Logo' width='252' height='68' style='padding-bottom:15px;'/></td></tr>
			<tr><td><p>Hello " . $this->name . ",</p><p>" . $formatLineBreaks . "</p><p>Our regards,<br/>Northbridge " . $this->team . "</p></td></tr>
			<tr><td style='font-size:70%;color:#666666;'><hr/><p>This message is produced and distributed by Northbridge Technology Alliance, a United States 501(c)(3) nonprofit corporation, Evanston, Illinois  60202</td></tr>
		</table>
	</body>
</html>
--" . $boundary . "--\r\n";
	}
	
	private function constructTextMessage($boundary) {
		return "--" . $boundary . "\r\n" . "Content-Type: text/plain; charset=\"iso-8859-1\"\r\n" . "Content-Transfer-Encoding: 7bit\r\n
Hello " . $this->name . ",\r\n\r\n" . $this->messageBody . "\r\n\r\nOur regards,\r\nNorthbridge " . $this->team . "\r\n\r\n=================\r\nThis message is produced and distributed by Northbridge Technology Alliance,\r\na United States 501(c)(3) nonprofit corporation, Evanston, Illinois  60202\r\n";
	}
	
	private function constructMessage($boundary) {
		return $this->constructTextMessage($boundary) . $this->constructHtmlMessage($boundary);
	}
	
	public function send() {
		$boundary = uniqid('NTA');
		$headers = "From: " . $this->from . "\r\n";
		$headers .= "Bcc: " . $this->bcc . "\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: multipart/alternative; boundary=\"" . $boundary . "\"";
		mail($this->to, $this->subject, $this->constructMessage($boundary), $headers);
	}
	
	public function toString() {
		$output  = "Message Type = " . $this->typeNames[$this->type] . "\n";
		$output .= "To = " . $this->to . "\n";
		$output .= "From = " . $this->from . "\n";
		$output .= "Reply To = " . $this->replyTo . "\n";
		$output .= "Bcc = " . $this->bcc . "\n";
		$output .= "Name = " . $this->name . "\n";
		$output .= "Team = " . $this->team . "\n";
		$output .= "Subject = " . $this->subject . "\n";
		$output .= "Message Body = " . $this->messageBody . "\n";
		return $output;
	}

}

?>