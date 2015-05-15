<?php 

require_once("../core/domain/Util.php");
$message = "";

?>

<form id="info-email-form" class="pure-form apply-form" action="<?php echo Util::getHttpApplyPath(); ?>/mod-info-processor.php" method="POST" style="visibility:visible;opacity:1;transition: opacity 1s;">
	<div class="mod-apply-frameSingle" style="font-size:130%;">	
		<p style="margin:30px;"><b>Partnership with Northbridge:&nbsp;&nbsp;No games. No gimmicks. Just your mission.</b></p>
		<p style="margin:20px;" ><a class="pure-button button-link" href="javascript:void(0)" onclick="showInfoEmailField();">Information Packet</a></p>
		<p style="margin:20px;" ><a class="pure-button button-link" href="https://www.eventbrite.com/e/information-webinar-tickets-16320068765?ref=ecal" target="_blank">Register for Webinar</a></p>
		<p style="margin:20px;" ><a class="pure-button button-link" href="javascript:void(0)" onclick="switchToApplyForm()" >Application Form</a></p>
		<iframe id="partner_perspective_embed" width="378" height="213" style="position:absolute;left:290px;top:90px;" src="https://www.youtube.com/embed/tk-QNJruZgM?rel=0" allowfullscreen="true"></iframe>
		
		<div id="fade" class="black_overlay" style="display:none;"></div>
		<div id="info-email" class="white_content" style="top:80px;left:260px;width:420px;min-height:40px;display:none;border-radius:8px;">
			<input type="hidden" name="testMode" value=""/>
			<span id="info-email-input"><input type="email" name="email_1" placeholder="Recipient Email" maxlength="100" style="width:320px;margin-top:10px;" required ></span>
			<a id="info-email-button" class="pure-button button-link" onclick="infoEmailValidateAndSubmit();" style="width:46px;border-radius:4px;float:right;"><span class="fa fa-play" style="margin-right:4px;" ></span>Send</a>
		</div>
	</div>	
</form>	
