<?php

require_once("Util.php");

class MessageMembershipDirectEmail {
	
	private $replyTo = "kathy.flint@northbridgetech.org";
	private $bcc = "direct.email.monitor@northbridgetech.org";
	private $subject = "Nonprofit Technology Membership Program";
	private $from = "Kathy Flint <kathy.flint@northbridgetech.org>";	
	
	private $to = "";
	private $sname = "Hello";
	private $sarea = "promote broad-reaching social justice";
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
		"https://www.linkedin.com/in/kathyflint" => "<img src='http://northbridgetech.org/images/sig.jpg' alt='Signature' title='Signature' width='200' height='50'/>"
	);
	
	private $areas = array(
		"0" => "promote broad-reaching social justice",
		"1" => "promote systemic racial equity",
		"2" => "ensure systemic racial equity for indigenous American people",
		"3" => "ensure systemic racial equity for Latino people",
		"4" => "ensure systemic racial equity for African American people",
		"5" => "promote restorative justice",
		"6" => "provide restorative, community-based advocacy",
		"7" => "promote economic and neighborhood development",
		"8" => "provide integrated social and family services",
		"9" => "promote environmental equity",
		"10" => "ensure civil rights and economic equity for women and girls",
		"11" => "promote civil rights",
		"12" => "promote international human rights"
	);

	private function formatButtons($in) {
		foreach($this->buttons as $key => $value) {
			//$in = str_replace($key, "<a class='formattedButton' href='" . $key . "'>" . $value . "</a>", $in);
			$in = str_replace($key, "<a style='text-decoration:none;font-weight:bold;width:160px;border-radius:6px;font-size:100%;padding:0.5em 1em;color:#484848;background:#b8c4a9;' href='" . $key . "'>" . $value . "</a>", $in);
		}
		return $in;
	}

	private function formatLinks($in) {
		foreach($this->links as $key => $value) {
			$in = str_replace($key, "<a class='' href='" . $key . "'>" . $value . "</a>", $in);
		}
		return $in;
	}
	
	private function getMessageBody() {
		return 
		$this->sname . ",\r\n\r\nYour efforts to " . $this->sarea . " qualify you for membership at Northbridge Technology Alliance, a 501(c)(3) organization. We are committed to social justice and since 2011 have been easing the cost and burden of technology for organizations with similar missions.\r\n\r\n<b>Does your mission-focused team wish for high-quality remote collaboration with colleagues and constituents? Are expensive virtual collaboration platforms not in your current budget?</b>\r\n\r\nWe can help. Our membership program, starting at $120 annually, will equip and train you with a state-of-the-art virtual web meeting room. Conduct remote trainings, volunteer meetings, Board meetings and small-scale webinars using an ordinary computer or laptop without leaving your office.\r\n\r\nRead more, and confirm your eligibility, with no obligation.\r\n\r\nhttp://northbridgetech.org?view=membership&c=" . $this->campaign . "&m=" . $this->crumb . "\r\n\r\nIf you know of a colleague who might benefit, please consider forwarding this message.\r\n\r\nWe look forward to working together to advance your important mission!\r\n\r\nBest regards,\r\n\r\nhttps://www.linkedin.com/in/kathyflint\r\n\r\nKathy D. Flint, CEO\r\nNorthbridge Technology Alliance\r\n\r\nP.S. Many large corporations are realizing the advantages that virtual collaboration can provide. We are <u>determined</u> that you have the same opportunities for advancing your social justice mission.\r\n\r\n";
	}
	
	//\r\n\r\nNorthbridge Technology Alliance is a 501(c)(3) technology social enterprise that has served the social justice community exclusively since 2011.

	private function getMessageFooter() {
		return "<p>Northbridge Technology Alliance creates software solutions for organizations who are engaged in social justice and community-building efforts. This message is produced and distributed by Northbridge Technology Alliance, a United States 501(c)(3) nonprofit corporation, Evanston, Illinois  60202.</p style='margin-top:10px;'>\r\n\r\n<p>Opt out: Your email address was obtained from Guidestar. This message is from a real person, and we do not intend to email you again. To ensure this, you may reply to this message with 'opt out' in the subject line. </p>" ;
	}
	
	/* generate these social media images from Front Awesome library at http://fa2png.io/ */
	private function constructHtmlMessage($boundary) {
		$formatLineBreaks = str_replace("\r\n\r\n", "\r\n</p><p style='margin-top:10px;'>", $this->getMessageBody());
		//$formatLineBreaks = str_replace("\r\n", "\r\n<br/>",$formatLineBreaks);
		$formatLineBreaks = str_replace("\r\nNorthbridge", "\r\n<br/>Northbridge",$formatLineBreaks);
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
				</p>
				</center><p>"	 . $this->getMessageFooter() . "</p>
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
" . $this->getMessageBody() . "\r\n\r\n=================\r\n" . $this->getMessageFooter() . "\r\n";
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
		$output .= "Message Body = " . $this->getMessageBody() . "\r\n";
		return $output;
	}
	
	public function toHTMLString () {
		return $this->constructHtmlMessage("xxxx");
	}

}

?>