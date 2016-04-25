<?php

require_once("../core/domain/Util.php");

class MessageLetterhead {
	
	private $replyTo = "kathy.flint@northbridgetech.org";
	private $bcc = "";
	private $subject = "Exclusive Technology Benefits";
	private $from = "Kathy Flint <kathy.flint@northbridgetech.org>";
	private $to = "kathy.flint@northbridgetech.org";	
	private $emailStyle = "text-decoration:none;font-weight:bold;width:160px;background:none repeat scroll 0% 0% rgba(137, 157, 112, 0.6);border-radius:6px;font-family:Oxygen;font-size:100%;padding:0.5em 1em;color:rgba(0, 0, 0, 0.8);";
	private $linkStyle = "";
	
/*
	private $messageBody = 
"Dear Northbridge Supporter,\r\n\r\nCongratulations are in order! Look at what YOU have created.\r\n\r\n\r\nhttp://nexus.northbridgetech.org/demo\r\n\r\n\r\nOur sophisticated web conferencing app that YOU have created is now used <b>internationally by 43 nonprofit organizations</b> who are transforming society in the following areas: Community Development, Education Equity, Environment Equity, Health Equity, Human/Civil Rights, and Human Services.\r\n\r\n<i>\"This is to good to be true - thank you!\"</i> - Chicago Antiracism Commission\r\n\r\nYet, it IS true. And this is what happens when generous people like you, intent on improving society, act on their intention.\r\n\r\n<b>With an end-of-year holiday gift, will you help us scale our impact from tens to hundreds?</b>\r\n\r\nhttps://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CR3GPPFSE7ARW\r\n\r\nFor just $50, we can provide 120 hours of web conferencing facilities to a community-building organization. \r\n\r\nFor $250, we can provide 24/7 global webinar capacity.\r\n\r\n<b>Will you help us end our fiscal year in the best position possible?</b>\r\n\r\nThanks as always, and my best regards,\r\n\r\nKathy Flint, CEO\r\nNorthbridge Technology Alliance";
*/
	
	private $messageBody = 
"Hello,\r\n\r\nResearching in Guidestar, I discovered your organization.\r\n\r\nI am the founder of Northbridge Technology Alliance, a nonprofit social enterprise that has served the social justice community since 2011.\r\n\r\nIt is important to me that you become aware of our new technology benefits package.\r\n\r\nThrough this program, starting at $120 annually, you can be equipped with a state-of-the-art virtual web meeting room, good for webinars, trainings, volunteer meetings, and Board meetings.\r\n\r\nThere are more benefits in addition... read more, with no obligation.\r\n\r\nhttp://northbridgetech.org?view=apply\r\n\r\nMany large corporations are realizing the advantages that virtual collaboration can provide. We are determined that you have the same opportunities for advancing your mission!\r\n\r\nLooking forward to bending the arc alongside you,\r\n\r\nKathy D. Flint, CEO\r\nNorthbridge Technology Alliance\r\n\r\n";
	
	public function __construct() {
	}
	
	private $buttons = array(
		// Global links text-to-html translation table
		// If a link in the text version of the message exactly matches a link here, it will translate into a styled button. Example:
		"http://nexus.northbridgetech.org/demo" => "Try Nexus",
		"http://northbridgetech.org?view=apply" => "Northbridge Member Benefits"
	);

	private $links = array(
		// Global links text-to-html translation table
		// If a link in the text version of the message exactly matches a link here, it will translate into a link. Example:
		"https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CR3GPPFSE7ARW" => "<img alt='Donate' src='https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif'>",
		//"http://northbridgetech.org?view=apply" => "Northbridge Member Benefits"
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
	
	public function toHTMLString () {
		return $this->constructHtmlMessage("xxxx");
	}

}

?>