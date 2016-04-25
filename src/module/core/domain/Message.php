<?php

require_once("Util.php");

class Message {

	// These constants correspond to message_type table pk
	const VOLUNTEER_CONFIRM = 1;
	const VOLUNTEER_NOTIFY = 2;
	const APPLICATION_CONFIRM = 3;
	const APPLICATION_NOTIFY = 4;
	const PARTNER_INFORMATION_PACKET = 5;

	private $typeNames = array(
		"None",
		"Volunteer Submission Confirmation",
		"Volunteer Submission Notification",
		"Application Submission Confirmation",
		"Application Submission Notification",
		"Membership Information Packet"
	);
	
	private $links = array(
		// Global links text-to-html translation table
		// If a link in the text version of the message exactly matches a link here, it will translate into a styled button
		"http://northbridgetech.org/index.php?view=apply_form" => "<img src='http://northbridgetech.org/images/eligibility.png' style='margin-left:20px;' alt='Eligibility Check' />",
		"https://www.eventbrite.com/e/information-webinar-tickets-16317817030" => "<img src='http://northbridgetech.org/images/webinar.png' style='margin-left:20px;' alt='Register for Webinar' />",
		"https://youtu.be/tk-QNJruZgM" => "<img src='http://northbridgetech.org/images/testimonial.png' style='margin-left:20px;' alt='Watch Testimonial' />",
		"http://northbridgetech.org/downloads/Member_Benefits_Summary.pdf" => "<img src='http://northbridgetech.org/images/benefits.png' style='margin-left:20px;' alt='Member Benefits' />",
		"http://nexus.northbridgetech.org/demo" => "<img src='http://northbridgetech.org/images/demo.png' style='margin-left:20px;' alt='Demo' />",
		"https://www.linkedin.com/in/kathyflint" => "<img src='http://northbridgetech.org/images/sig.jpg' alt='Signature' width='200' height='50'/>"
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
	private $emailStyle = ""; //"text-decoration:none;font-weight:bold;width:160px;background:none repeat scroll 0% 0% rgba(137, 157, 112, 0.6);margin:10px;border-radius:6px;font-family:Oxygen;font-size:100%;padding:0.5em 1em;color:rgba(0, 0, 0, 0.8);";

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
		return "Kathy Flint <contact@northbridgetech.org>";
	}

	private function getSubject($typeId) {
		switch ($typeId) {
	    case self::VOLUNTEER_CONFIRM:
       	return "Volunteer Submission Confirmation";
    	case self::VOLUNTEER_NOTIFY:
        return "Volunteer Notification";
    	case self::APPLICATION_CONFIRM:
        return "Application Submission Confirmation";
      case self::APPLICATION_NOTIFY;
      	return "Application Notification";
      case self::PARTNER_INFORMATION_PACKET;
      	return "[Northbridge] Information Packet";
    	default:
        return "";
		}
	}
	
	private function getSalutation($typeId) {
		switch ($typeId) {
      case self::PARTNER_INFORMATION_PACKET;
      	return "We are so glad you have discovered Northbridge Technology Alliance!";
    	default:
        return "Hello " . $this->name . ",";
		}
	}
	
	private function getTeam($typeId) {
		switch ($typeId) {
	    case self::VOLUNTEER_CONFIRM:
       	return "Northbridge Technology Alliance";
    	case self::VOLUNTEER_NOTIFY:
        return "Northbridge Internal";
    	case self::APPLICATION_CONFIRM:
        return "Northbridge Technology Alliance";
      case self::APPLICATION_NOTIFY;
      	return "Northbridge Internal";
      case self::PARTNER_INFORMATION_PACKET;
      	return "Kathy Flint, CEO<br/>Northbridge Technology Alliance";
    	default:
        return "";
		}
	}
	
	private function formatLinks($in) {
		foreach($this->links as $key => $value) {
			$in = str_replace($key, "<a style='" . $this->emailStyle . "' href='" . $key . "'>" . $value . "</a>", $in);
		}
		return $in;
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
      	return "A new partnership application has been received.";
      case self::PARTNER_INFORMATION_PACKET;
      	return "Here is the information that you requested recently.\r\n\r\nQuestions? Just reply to this email. You will reach a real person who is determined that your social mission succeed.\r\n\r\nI look forward to bending the arc with you!\r\n\r\nRegards,\r\n\r\nhttps://www.linkedin.com/in/kathyflint\r\n\r\nKathy Flint, CEO&nbsp;<br/>Northbridge Technology Alliance\r\n\r\n<hr color='#dae0bc'/>\r\n\r\nNorthbridge creates software solutions for charitable organizations who are engaged in social justice and community-raising efforts so that their collective impact is increased.\r\n\r\nNorthbridge is a membership organization. Membership with Northbridge is open to folks who are working toward social justice and community-raising goals. Membership benefits include: \r\n\r\n* Usage license for our member-owned Nexus Web Meet virtual conference center\r\n\r\n* Expert, instructor-led training to help you adopt the latest streaming collaboration technologies\r\n\r\n* Caucus participation: a lightweight, structured way for you to participate in the advancement of technologies for the social justice community\r\n\r\n\r\nChecking your eligibility for membership takes just a few minutes.\r\n\r\nhttp://northbridgetech.org/index.php?view=apply_form\r\n\r\nYou may enjoy a brief webinar hosted by Founder and CEO Kathy Flint. In this live, informal setting, Kathy will talk about our innovative community and the benefits of membership. Questions welcome in this interactive setting!\r\n\r\nhttps://www.eventbrite.com/e/information-webinar-tickets-16317817030\r\n\r\nHere is a video testimonial from one Northbridge member describing his experience with Nexus Web Meet.\r\n\r\nhttps://youtu.be/tk-QNJruZgM\r\n\r\nWhitepaper: Membership Benefits\r\n\r\nhttp://northbridgetech.org/downloads/Member_Benefits_Summary.pdf\r\n\r\nTry: Nexus Web Meet\r\n\r\nhttp://nexus.northbridgetech.org/demo";
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
		$formatLinkButtons = $this->formatLinks($formatLineBreaks);
		return "--" . $boundary . "
Content-Type: text/html; charset=\"iso-8859-1\"
Content-Transfer-Encoding: 7bit

<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01//EN'>
<html>
	<head>
		<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Oxygen'>
	</head>
	<body style='font-family:\"Oxygen\",Arial,sans-serif;color:#484848;'>
	<center>
		<table style='display:block;max-width:620px;text-align:left;font-family:\"Oxygen\",Arial,sans-serif;color:#484848;'>
  		<tr>
	    	<td style='text-align:center;'>
					<a href='http://northbridgetech.org'><img src='" . Util::getHttpCorePath() . "/images/NB_horizontal_tagline_rgb.png' alt='Northbridge Technology Alliance Logo' width='330' height='103' style='margin-bottom:20px;margin-left:-30px;'/></a>
    		</td>
  		</tr>
			<tr>
				<td style='vertical-align:top;'><p>" . $this->getSalutation($this->type) . "</p><p>" . $formatLinkButtons . "</p>	</td>
	  	</tr>
	  	<tr>
				<td style='vertical-align:top;padding-top:10px;font-size:70%;'>
					<hr color='#dae0bc'/>
					<center>
						<a href='https://twitter.com/'" . Util::getTwitterHandle() . "' target='_blank'><img src='" . Util::getHttpCorePath() . "/images/twitter_dae0bc_32.png' width='32' height=32' style='margin-right:15px;'/></a>
						<a href='//plus.google.com/u/0/101145194341428988499?prsrc=3' rel='publisher' target='_blank' style='text-decoration:none;'><img src='" . Util::getHttpCorePath() . "/images/google-plus-	square_dae0bc_32.png' width='32' height=32' style='margin-right:15px;' /></a>
						<a href='https://www.linkedin.com/company/2232384' target='_blank'><img src='" . Util::getHttpCorePath() . "/images/linkedin_dae0bc_32.png' width='32' height=32' style='margin-right:15px;'/></a>
						<a href='https://www.facebook.com/northbridgenfp#' target='_blank'><img src='" . Util::getHttpCorePath() . "/images/facebook-square_dae0bc_32.png' width='32' height=32' style='margin-right:15px;'/></a>
						<a href='https://github.com/NorthBridge/playbook/wiki/1.How-We-Do' target='_blank'><img src='" . Util::getHttpCorePath() . "/images/github_dae0bc_32.png' width='32' height=32' style='margin-right:15px;'/></a>
					</center>
					<p style='font-size:90%;color:#666666;'>" . $this->getMessageFooter() . "</td></tr>
				</td>
			</tr>
		</table>
	<center>
	</body>
</html>
--" . $boundary . "--\r\n";
	}
	
	private function constructTextMessage($boundary) {
		return "--" . $boundary . "\r\n" . "Content-Type: text/plain; charset=\"iso-8859-1\"\r\n" . "Content-Transfer-Encoding: 7bit\r\n
Hello " . $this->name . ",\r\n\r\n" . $this->messageBody . "\r\n\r\nWarm regards,\r\n\r\nKarhy Flint, CEO\r\n\r\nNorthbridge " . $this->team . "\r\n\r\n=================\r\n" . $this->getMessageFooter() . "\r\n";
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
		$output  = "\nMessage Type = " . $this->typeNames[$this->type] . "\n";
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

	public function toHTMLString () {
		return $this->constructHtmlMessage("xxxx");
	}

}

?>