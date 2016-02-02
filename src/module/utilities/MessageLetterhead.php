<?php

require_once("../core/domain/Util.php");

class MessageLetterhead {
	
	private $replyTo = "kathy.flint@northbridgetech.org";
	private $bcc = "";
	private $subject = "[Nexus] System Problem Resolved";
	private $from = "Northbridge Technology Alliance <noreply@northbridgetech.org>";
	private $to = "kathy.flint@northbridgetech.org";	
	private $emailStyle = "text-decoration:none;font-weight:bold;width:160px;background:none repeat scroll 0% 0% rgba(137, 157, 112, 0.6);margin-top:20px;margin-bottom:20px;border-radius:6px;font-family:Oxygen;font-size:100%;padding:0.5em 1em;color:rgba(0, 0, 0, 0.8);";
	private $linkStyle = "";
	
/*
	private $messageBody = 
"Dear Northbridge Supporter,\r\n\r\nCongratulations are in order! Look at what YOU have created.\r\n\r\n\r\nhttp://nexus.northbridgetech.org/demo\r\n\r\n\r\nOur sophisticated web conferencing app that YOU have created is now used <b>internationally by 43 nonprofit organizations</b> who are transforming society in the following areas: Community Development, Education Equity, Environment Equity, Health Equity, Human/Civil Rights, and Human Services.\r\n\r\n<i>\"This is to good to be true - thank you!\"</i> - Chicago Antiracism Commission\r\n\r\nYet, it IS true. And this is what happens when generous people like you, intent on improving society, act on their intention.\r\n\r\n<b>With an end-of-year holiday gift, will you help us scale our impact from tens to hundreds?</b>\r\n\r\nhttps://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CR3GPPFSE7ARW\r\n\r\nFor just $50, we can provide 120 hours of web conferencing facilities to a community-building organization. \r\n\r\nFor $250, we can provide 24/7 global webinar capacity.\r\n\r\n<b>Will you help us end our fiscal year in the best position possible?</b>\r\n\r\nThanks as always, and my best regards,\r\n\r\nKathy Flint, CEO\r\nNorthbridge Technology Alliance";
*/
	
	private $messageBody = 
"Dear Nexus Web Meet User,\r\n\r\nToday we discovered and resolved a system defect that may have affected your ability over the past three weeks to login, enroll, or reset your Nexus Web Meet password.\r\n\r\nIf you have not experienced difficulty with any of that functionality, you can safely disregard this message!\r\n\r\nIf you have recently experienced difficulty with any of those functions, you may wish to attempt your activity again. If you have any questions, or if problems persist, please reply to this email.\r\n\r\nWe sincerely apologize for any inconvenience this may have cause for you!\r\n\r\nSincerely,\r\n\r\nThe Support Team at\r\nNorthbridge Technology Alliance";
	
	public function __construct() {
	}
	
	private $buttons = array(
		// Global links text-to-html translation table
		// If a link in the text version of the message exactly matches a link here, it will translate into a styled button. Example:
		"http://nexus.northbridgetech.org/demo" => "Nexus Web Meet Demo"
	);

	private $links = array(
		// Global links text-to-html translation table
		// If a link in the text version of the message exactly matches a link here, it will translate into a link. Example:
		"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CR3GPPFSE7ARW" => "<img alt='Donate' src='https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif'>"
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
	
	private function getMessageFooter() {
		return "Northbridge Technology Alliance creates software solutions for organizations who are engaged in social justice and community-building efforts. This message is produced and distributed by Northbridge Technology Alliance, a United States 501(c)(3) nonprofit corporation, Evanston, Illinois  60202";
	}
	
	/* generate these social media images from Front Awesome library at http://fa2png.io/ */
	private function constructHtmlMessage($boundary) {
		$formatLineBreaks = str_replace("\r\n\r\n", "</p><p>",$this->messageBody);
		$formatLineBreaks = str_replace("\r\n", "<br/>",$formatLineBreaks);
		$formatLinks = $this->formatLinks($formatLineBreaks);
		$formatLinkButtons = $this->formatButtons($formatLinks);
		return "--" . $boundary . "
Content-Type: text/html; charset=\"iso-8859-1\"
Content-Transfer-Encoding: 7bit

<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01//EN'>
<html>
	<head>
		<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Oxygen'>
	</head>
	<body style='font-family:Oxygen,Arial,sans-serif;color:#484848;'>
		<table style='width:90%;display:block;max-width:620px;'>
			<tr>
				<td colspan='2'><img src='" . Util::getHttpCorePath() . "/images/NB_horizontal_rgb.png' alt='Northbridge Technology Alliance Logo' width='252' height='68' style='padding-bottom:10px;padding-right:30px;'/></td>
			</tr>
			<tr>
				<td style='vertical-align:top;padding-top:10px;'>
					<a href='https://twitter.com/'" . Util::getTwitterHandle() . "' target='_blank'><img src='" . Util::getHttpCorePath() . "/images/twitter_dae0bc_32.png' width='32' height=32' /></a><br/>
					<a href='//plus.google.com/u/0/101145194341428988499?prsrc=3' rel='publisher' target='_blank' style='text-decoration:none;'><img src='" . Util::getHttpCorePath() . "/images/google-plus-square_dae0bc_32.png' width='32' height=32' /></a><br/>
					<a href='https://www.linkedin.com/company/2232384' target='_blank'><img src='" . Util::getHttpCorePath() . "/images/linkedin_dae0bc_32.png' width='32' height=32' /></a><br/>
					<a href='https://www.facebook.com/northbridgenfp#' target='_blank'><img src='" . Util::getHttpCorePath() . "/images/facebook-square_dae0bc_32.png' width='32' height=32' /></a><br/>
					<a href='https://github.com/NorthBridge/playbook/wiki/1.How-We-Do' target='_blank'><img src='" . Util::getHttpCorePath() . "/images/github_dae0bc_32.png' width='32' height=32' /></a>
				</td>
				<td style='vertical-align:top;padding-left:10px;'><p>" . $formatLinkButtons . "</p></td>
			</tr>
			<tr><td colspan='2'style='font-size:70%;color:#666666;'><hr color='#dae0bc'/><p>" . $this->getMessageFooter() . "</td></tr>
		</table>
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

}

?>