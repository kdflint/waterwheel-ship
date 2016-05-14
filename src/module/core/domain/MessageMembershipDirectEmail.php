<?php

require_once("../core/domain/Util.php");

class MessageMembershipDirectEmail {
	
	private $replyTo = "kathy.flint@northbridgetech.org";
	private $bcc = "direct.email.monitor@northbridgetech.org";
	private $subject = "Nonprofit Technology Membership Program";
	private $from = "Kathy Flint <kathy.flint@northbridgetech.org>";	
	private $emailStyle = "text-decoration:none;font-weight:bold;width:160px;background:none repeat scroll 0% 0% rgba(137, 157, 112, 0.6);border-radius:6px;font-size:100%;padding:0.5em 1em;color:rgba(0, 0, 0, 0.8);";
	private $linkStyle = "";
	
	private $to = "";
	private $sname = "Hello";
	private $sarea = "social justice";
	private $crumb = "";
	private $campaign = "1";
	
	public function __construct($email, $name, $code, $crumb) {
		if ($name) { $this->sname = "Dear " . $name; }
		if ($code && isset($this->areas[$code])) { $this->sarea = $this->areas[$code]; }
		if ($email && Util::validateEmail($email)) { $this->to = $email; } 
		if ($crumb) { $this->crumb = $crumb; }
		$this->buttons["http://northbridgetech.org?view=membership&c=" . $this->campaign . "&m=" . $crumb] = "Northbridge Member Benefits";
	}
	
	private $buttons = array(
		// Global links text-to-html translation table
		// If a link in the text version of the message exactly matches a link here, it will translate into a styled button. Example:
		//"http://northbridgetech.org?view=membership" => "Northbridge Member Benefits"
	);

	private $links = array(
		// Global links text-to-html translation table
		// If a link in the text version of the message exactly matches a link here, it will translate into a link. Example:
		"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CR3GPPFSE7ARW" => "<img alt='Donate' src='https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif'>",
		"https://www.linkedin.com/in/kathyflint" => "<img src='http://northbridgetech.org/images/sig.jpg' alt='Signature' title='Signature' width='200' height='50'/>"
	);
	
	private $areas = array(
		"0" => "social justice",
		"1" => "systemic racial equity",
		"2" => "systemic racial equity for indigenous American people",
		"3" => "systemic racial equity for Latino people",
		"4" => "systemic racial equity for African American people",
		"5" => "restorative justice"
	);

	private function formatButtons($in) {
		foreach($this->buttons as $key => $value) {
			$in = str_replace($key, "<a style='" . $this->emailStyle . "' href='" . $key . "'>" . $value . "</a>", $in);
		}
		return $in;
	}

	private function formatLinks($in) {
		foreach($this->links as $key => $value) {
			$in = str_replace($key, "<a style='" . $this->linkStyle . "' href='" . $key . "'>" . $value . "</a>", $in);
		}
		return $in;
	}
	
	private function getMessageBody() {
		return 
		$this->sname . ",\r\n\r\nGuidestar reports that you are working in the area of " . $this->sarea . ". This places you within 10% of U.S. nonprofit organizations who qualify for this opportunity.\r\n\r\nNorthbridge Technology Alliance is a 501(c)(3) technology social enterprise that has served the social justice community since 2011.\r\n\r\n<b>Does your mission-focused team wish for a way to do high-quality, remote collaboration with your colleagues and constituents?</b>\r\n\r\nThrough our membership program, starting at $120 annually, you can be equipped with a state-of-the-art virtual web meeting room, good for webinars, trainings, volunteer meetings and Board meetings.\r\n\r\nRead more, with no obligation.\r\n\r\nhttp://northbridgetech.org?view=membership&c=" . $this->campaign . "&m=" . $this->crumb . "\r\n\r\nIf you prefer not to click on an email link, search the web for \"Northbridge Technology Alliance\"\r\n\r\nWould you please forward this message to a colleague who might benefit?\r\n\r\nBest regards,\r\n\r\nhttps://www.linkedin.com/in/kathyflint\r\n\r\nKathy D. Flint, CEO\r\nNorthbridge Technology Alliance\r\n\r\nP.S. Many large corporations are realizing the advantages that virtual collaboration can provide. We are determined that you have the same opportunities for advancing your social justice mission!";
	}

	private function getMessageFooter() {
		return "Northbridge Technology Alliance creates software solutions for organizations who are engaged in social justice and community-building efforts. This message is produced and distributed by Northbridge Technology Alliance, a United States 501(c)(3) nonprofit corporation, Evanston, Illinois  60202";
	}
	
	/* generate these social media images from Front Awesome library at http://fa2png.io/ */
	private function constructHtmlMessage($boundary) {
		$formatLineBreaks = str_replace("\r\n\r\n", "</p><p style='margin-top:10px;'>", $this->getMessageBody());
		$formatLineBreaks = str_replace("\r\n", "<br/>",$formatLineBreaks);
		$formatLinks = $this->formatLinks($formatLineBreaks);
		$formatLinkButtons = $this->formatButtons($formatLinks);
		return "--" . $boundary . "
Content-Type: text/html; charset=\"iso-8859-1\"
Content-Transfer-Encoding: 7bit

<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html>
	<head>
			<meta http-equiv='Content-type' content='text/html;charset=UTF-8'>	
	</head>
	<body>
	<center>
		<table style='display:block;max-width:620px;color:#484848;font-family:Arial,sans-serif;'>
			<tr>
				<td style='text-align:center;'>
					<img src='http://northbridgetech.org/images/NB_horizontal_tagline_rgb.png' alt='Northbridge Technology Alliance: Helping people change the world' title='Northbridge Technology Alliance: Helping people change the world' width='330' height='103' style='padding-bottom:30px;'/
				</td>
			</tr>
			<tr>
				<td style='text-align:left;vertical-align:top;padding-left:10px;'><p>" . $formatLinkButtons . "</p></td>
			</tr>
			<tr>
				<td style='text-align:left;font-size:70%;color:#666666;'>
				<hr color='#dae0bc'/>
				<center>
				<p>
					<a href='https://twitter.com/'" . Util::getTwitterHandle() . "' target='_blank'><img style='margin-right:15px;' src='" . Util::getHttpCorePath() . "/images/twitter_dae0bc_32.png' width='32' height=32' alt='TW' title='Twitter'/></a>
					<a href='//plus.google.com/u/0/101145194341428988499?prsrc=3' rel='publisher' target='_blank' style='text-decoration:none;'><img style='margin-right:15px;' src='" . Util::getHttpCorePath() . "/images/google-plus-square_dae0bc_32.png' width='32' height=32' alt='GP' title='GooglePlus'/></a>
					<a href='https://www.linkedin.com/company/2232384' target='_blank'><img style='margin-right:15px;' src='" . Util::getHttpCorePath() . "/images/linkedin_dae0bc_32.png' width='32' height=32' alt='LI' title='LinkedIn' /></a>
					<a href='https://www.facebook.com/northbridgenfp#' target='_blank'><img style='margin-right:15px;' src='" . Util::getHttpCorePath() . "/images/facebook-square_dae0bc_32.png' width='32' height=32' alt='FB' title='Facebook'/></a>
					<a href='https://github.com/NorthBridge/playbook/wiki/1.How-We-Do' target='_blank'><img style='margin-right:15px;' src='" . Util::getHttpCorePath() . "/images/github_dae0bc_32.png' width='32' height=32' alt='GH' title='GitHub' /></a>
				</p></center><p>"	 . $this->getMessageFooter() . "
				</p>
				</td>
			</tr>
		</table>
	</center>
	</body>
</html>
--" . $boundary . "--\r\n";
	}
	
	private function constructTextMessage($boundary) {
		return "--" . $boundary . "\r\n" . "Content-Type: text/plain; charset=\"iso-8859-1\"\r\n" . "Content-Transfer-Encoding: 7bit\r\n
" . $this->messageBody . "\r\n\r\n=================\r\n" . $this->getMessageFooter() . "\r\n";
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
		$output = "To = " . $this->to . "\r\n";
		$output .= "From = " . $this->from . "\r\n";
		$output .= "Reply To = " . $this->replyTo . "\r\n";
		$output .= "Bcc = " . $this->bcc . "\r\n";
		$output .= "Subject = " . $this->subject . "\r\n";
		$output .= "Path = " . Util::getHttpCorePath() . "\r\n";
		$output .= "Twitter = " . Util::getTwitterHandle() . "\r\n";
		$output .= "Message Body = " . $this->messageBody . "\r\n";
		return $output;
	}
	
	public function toHTMLString () {
		return $this->constructHtmlMessage("xxxx");
	}

}

?>