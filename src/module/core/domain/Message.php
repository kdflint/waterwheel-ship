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

	public function __construct($messageTypeId, $toAddr, $salutationName) {
		$this->type = $messageTypeId; 
		$this->to = $toAddr;
		$this->name = $salutationName;
		$this->subject = $this->getSubject($this->type);
		$this->from = $this->getFrom($this->type);
		$this->team = $this->getTeam($this->type);
		$this->messageBody = $this->getMessageBody($this->type);
	}
	
	private function getFrom($typeId) {
		return "Northbridge Technology Alliance <contact@northbridgetech.org>";
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
        return "Thank you for your application for partnership with Northbridge Technology Alliance.\r\n\r\nWe will review your information and contact you at this email address within two weeks.\r\n\r\nIf you believe you have received this message in error, would you kindly reply and let us know?";
      case self::APPLICATION_NOTIFY;
      	return "A new partnership applicaton has been received.";
    	default:
        return "";
		}		
	}
	
	private function getMessageFooter() {
		return "This message is produced and distributed by Northbridge Technology Alliance, a United States 501(c)(3) nonprofit corporation, Evanston, Illinois  60202";
	}
	
	/* generate these social media images from Front Awesome library at http://fa2png.io/ */
	private function constructHtmlMessage($boundary) {
		$formatLineBreaks = str_replace("\r\n\r\n", "</p><p>",$this->messageBody);
		return "--" . $boundary . "
Content-Type: text/html; charset=\"iso-8859-1\"
Content-Transfer-Encoding: 7bit

<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01//EN'>
<html>
	<head>
		<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Oxygen'>
		<link rel='stylesheet' type='text/css' href='http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css'>
	</head>
	<body style='font-family:Oxygen,Arial,sans-serif;color:#484848;'>
		<table style='width:90%;display:block;max-width:620px;'>
			<tr>
				<td colspan='2'><img src='" . Util::getHttpCorePath() . "/images/NB_horizontal_rgb.png' alt='Northbridge Technology Alliance Logo' width='252' height='68' style='padding-bottom:10px;padding-right:30px;'/></td>
			</tr>
			<tr>
				<td style='vertical-align:top;padding-top:10px;'>
					<a href='https://twitter.com/'" . Util::getTwitterHandle() . "' target='_blank'><img src='" . Util::getHttpCorePath() . "/images/twitter_dae0bc_32.png' width='32' height=32' alt='Twit' /></a><br/>
					<a href='https://plus.google.com/u/0/b/101145194341428988499/101145194341428988499/posts' target='_blank'><img src='" . Util::getHttpCorePath() . "/images/google-plus-square_dae0bc_32.png' width='32' height=32' alt='g+' /></a><br/>
					<a href='https://www.linkedin.com/company/2232384' target='_blank'><img src='" . Util::getHttpCorePath() . "/images/linkedin_dae0bc_32.png' width='32' height=32' alt='LI' /></a><br/>
					<a href='https://www.facebook.com/northbridgenfp#' target='_blank'><img src='" . Util::getHttpCorePath() . "/images/facebook-square_dae0bc_32.png' width='32' height=32' alt='FB' /></a><br/>
					<a href='https://github.com/NorthBridge/playbook/wiki/1.How-We-Do' target='_blank'><img src='" . Util::getHttpCorePath() . "/images/github_dae0bc_32.png' width='32' height=32' alt='GitH' /></a>
				</td>
				<td style='vertical-align:top;padding-left:10px;'><p>Hello " . $this->name . ",</p><p>" . $formatLineBreaks . "</p><p>Our regards,<br/>Northbridge " . $this->team . "</p></td>
			</tr>
			<tr><td colspan='2'style='font-size:70%;color:#666666;'><hr color='#dae0bc'/><p>" . $this->getMessageFooter() . "</td></tr>
		</table>
	</body>
</html>
--" . $boundary . "--\r\n";
	}
	
	private function constructTextMessage($boundary) {
		return "--" . $boundary . "\r\n" . "Content-Type: text/plain; charset=\"iso-8859-1\"\r\n" . "Content-Transfer-Encoding: 7bit\r\n
Hello " . $this->name . ",\r\n\r\n" . $this->messageBody . "\r\n\r\nOur regards,\r\nNorthbridge " . $this->team . "\r\n\r\n=================\r\n" . $this->getMessageFooter() . "\r\n";
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