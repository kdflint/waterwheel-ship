<?php

require_once("../core/domain/Util.php");

class MessageAnnounce {
	
	private $replyTo = "contact@northbridgetech.org";
	private $bcc = "";
	private $subject = "Exclusive Technology Grant for Community-Building Teams";
	private $from = "Northbridge Technology Alliance <contact@northbridgetech.org>";
	private $to = "kathy.d.flint@gmail.com";	
	private $emailStyle = ""; // "text-decoration:none;font-weight:bold;width:160px;background:none repeat scroll 0% 0% rgba(137, 157, 112, 0.6);margin:10px;border-radius:6px;font-family:Oxygen;font-size:100%;padding:0.5em 1em;color:rgba(0, 0, 0, 0.8);";
	
	private $messageBody = "At this time, Northbridge Technology Alliance is granting 15 virtual web conference rooms to social activists and community-building teams.\r\n\r\nNorthbridge is now accepting applications for partnership. Fifteen qualified partners will be awarded a private room in the Nexus Web Conference Center.\r\n\r\nWeb conferencing increases collaboration possibilities by removing the geographic limitations of traditional face-to-face meetings.\r\n\r\nAlong with a dedicated, on-demand, fully-featured web conference room, grant winners are also provided unlimited, online, in-person training. The high-quality training we provide positions nonprofit teams to adopt and take full advantage of powerful new ways for global collaboration.\r\n\r\nLink: http://northbridgetech.org/index.php?view=apply\r\n\r\nWhitepaper: http://northbridgetech.org/downloads/Northbridge_web_conference_center.pdf\r\n\r\nNorthbridge Technology Alliance creates software solutions for organizations who are engaged in social justice and community-building efforts. Northbridge is a 501(c)(3) nonprofit.";

	public function __construct() {
	}
	
	private $links = array(
		// Global links text-to-html translation table
		// If a link in the text version of the message exactly matches a link here, it will translate into a styled button
		"http://northbridgetech.org/index.php?view=apply" => "Application Information",
		"http://northbridgetech.org/downloads/Northbridge_web_conference_center.pdf" => "How Can Web Conferencing Help Your Team?"
	);

	private function formatLinks($in) {
		foreach($this->links as $key => $value) {
			$in = str_replace($key, "<a style='" . $this->emailStyle . "' href='" . $key . "'>" . $value . "</a>", $in);
		}
		return $in;
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