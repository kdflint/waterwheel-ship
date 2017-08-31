<?php

require_once("Util.php");

class SojournersSponsoredEmail {
	
	private $replyTo = "kathy.flint@northbridgetech.org";
	private $bcc = "";
	private $subject = "Exclusive Invitation for Sojourners Community";
	private $from = "Kathy Flint <kathy.flint@northbridgetech.org>";	
	
	private $to = "";
	private $sname = "";
	private $sarea = "";
	private $crumb = "";
	private $campaign = "";
	
	public function __construct($email) {
		if ($email && Util::validateEmail($email)) { $this->to = $email; } 
		//$this->buttons["http://northbridgetech.org?view=membership&c=2" = "Northbridge Member Benefits"];
	}
	
	private $buttons = array(
		// Global links text-to-html translation table
		// If a link in the text version of the message exactly matches a link here, it will translate into a styled button. Example:
		"http://northbridgetech.org?view=membership&c=2" => "Explore Northbridge Benefits"
	);

	private $links = array(
		// Global links text-to-html translation table
		// If a link in the text version of the message exactly matches a link here, it will translate into a link. Example:
		"https://www.linkedin.com/in/kathyflint" => "<img src='http://northbridgetech.org/images/sig.jpg' alt='Signature' title='Signature' width='200' height='50'/>"
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

		
		//\r\n\r\nWe have a solution, using our member-owned cooperative approach to application development.
		return 
		"Dear Sojourner,
		
		\r\n\r\nSo, imagine a food coop, but for technology...

		\r\n\r\nNorthbridge Technology Alliance is entirely devoted to advancing progress toward an intentionally sustainable and equitable society.

		\r\n\r\nIn that spirit, here is an invitation, available <u>exclusively</u> to the social justice community!

		\r\n\r\n<b>Might your mission-focused team or committee make use of better remote collaboration tools?</b>

		\r\n\r\nOur members have told us that web-based meetings and webinars are a useful collaboration tool. Unfortunately, like so many other cutting edge technologies, grass roots and nonprofits find themselves going without, for cost and other reasons.
		
		\r\n\r\n<b>We have a solution, using our member-owned, cooperative approach to technology development.</b>
			
		\r\n\r\nOur membership program, starting at $120 annually, <u>equips and trains</u> Northbridge members with a state-of-the-art virtual web meeting room. This enables them to do long-distance collaboration, such as remote trainings, Board meetings and small-scale webinars, without leaving home or office.

		\r\n\r\nNot only that, but our members regularly work with our technology volunteers, developing new tools to support their socially progressive missions.
		
		\r\n\r\nhttp://northbridgetech.org?view=membership&c=2	

		\r\n\r\nWant to see what Northbridge is about before joining? Explore our benefits and join us for a mini training on the ways that web-based collaboration can further your socially progressive work. 
									
		\r\n\r\nLooking forward to bending the arc with you!
		
		\r\n\r\nBest regards,
		
		\r\n\r\nhttps://www.linkedin.com/in/kathyflint
		
		\r\n\r\nKathy D. Flint, CEO\r\nNorthbridge Technology Alliance
		
		\r\n\r\nP.S. Many large corporations are realizing the advantages that virtual collaboration can provide. We are <u>determined</u> that you have the same opportunities for advancing your social justice mission.\r\n\r\n";
				
	}
	
	private function getMessageFooter() {
		return "<p style='font-size:90%'>Northbridge Technology Alliance, a US 501(c)(3) social enterprise, creates software solutions for organizations who are engaged in social justice and community-building efforts.</p>" ;
	}
	
	/* generate these social media images from Font Awesome library at http://fa2png.io/ */
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
			<table style='display:block;max-width:600px;color:#484848;font-family:Arial,sans-serif;text-align:center;' align='center'>
				<tr>
					<td style='text-align:center;' align='center'>
						<img src='http://northbridgetech.org/images/NB_horizontal_tagline_rgb.png' alt='Northbridge Technology Alliance: Helping people change the world' title='Northbridge Technology Alliance: Helping people change the world' width='330' height='103' style='padding-bottom:30px;'/>
					</td>
				</tr>
			<tr>
				<td style='vertical-align:top;padding-left:10px;text-align:left;' align='left'><p>" . $formatLinkButtons . "</p></td>
			</tr>
			<tr>
				<td style='text-align:left;font-size:100%;color:#666666;' align='left'>
				<hr color='#dae0bc'/>
				<center>
				<p>
					<a href='https://twitter.com/'" . Util::getTwitterHandle() . "' target='_blank'><img style='margin-right:15px;' src='" . Util::getHttpCorePath() . "/images/twitter_dae0bc_32.png' width='32' height=32' alt='TW' title='Twitter'/></a>
					<a href='//plus.google.com/u/0/101145194341428988499?prsrc=3' rel='publisher' target='_blank' style='text-decoration:none;'><img style='margin-right:15px;' src='" . Util::getHttpCorePath() . "/images/google-plus-square_dae0bc_32.png' width='32' height=32' alt='GP' title='GooglePlus'/></a>
					<a href='https://www.linkedin.com/company/2232384' target='_blank'><img style='margin-right:15px;' src='" . Util::getHttpCorePath() . "/images/linkedin_dae0bc_32.png' width='32' height=32' alt='LI' title='LinkedIn' /></a>
					<a href='https://www.facebook.com/northbridgenfp#' target='_blank'><img style='margin-right:15px;' src='" . Util::getHttpCorePath() . "/images/facebook-square_dae0bc_32.png' width='32' height=32' alt='FB' title='Facebook'/></a>
					<a href='https://github.com/NorthBridge/playbook/wiki/1.How-We-Do' target='_blank'><img style='margin-right:15px;' src='" . Util::getHttpCorePath() . "/images/github_dae0bc_32.png' width='32' height=32' alt='GH' title='GitHub' /></a>
				</p>
				</center>
				<p>"	 . $this->getMessageFooter() . "</p>
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