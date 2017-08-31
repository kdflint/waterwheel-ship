<?php 

require_once("../core/domain/Util.php");

?>

<form id="info-email-form" class="pure-form apply-form" action="<?php echo Util::getHttpApplyPath(); ?>/mod-info-processor.php" method="POST" style="visibility:visible;opacity:1;transition: opacity 1s;">
	<div class="mod-apply-frameSingle" style="font-size:130%;">	
		<p style="margin:10px 10px 10px 30px;font-size:110%;"><b>Community webinars, no-travel volunteer training, remote Board meetings...</b>
			<!--
			<a href="#" onclick="showSpecialOfferField();" style="float:right;margin-right:20px;text-decoration:none;font-size:120%"><span id="special-offer-link" style="color:#f68620;text-decoration:none;font-weight:bold;"></span></a></p>
			-->
			<div style="font-size:100%;margin-left:30px;">
				<p>Your work deserves these tools! This grant awards a "just-right" amount of vendor-neutral, guided training for your entire team, along with up to one full year of private, configurable conference room use in our virtual conference center, <a class="mod-about-anchor" href="<?php echo Util::getDemoUrl(); ?>" target="_blank">Nexus Web Meet</a>.</p>
				<p style="font-size:90%;margin-top:20px;">The current grant cycle targets these impact areas:
				<ul style="width:240px;font-size:90%;">
					<li>Chicago: Comunity Engagement for Strong Neighborhoods</li>
					<li>Illinois: Health Care Equity</li>
					<li>United States: Systemic Racial Equity</li>
				</ul>
			</p>
			<p style="margin:20px;" ><a class="pure-button button-link one tan" href=""<?php echo($applyLink); ?>" target="_blank"><!--onclick="switchToApplyForm();"-->Details & Apply</a></p>
			<p style="margin:20px;display:none;" ><a class="pure-button button-link" href="javascript:void(0)" onclick="showInfoEmailField();">Information Packet</a></p>
			<p style="margin:20px;display:none;" ><a class="pure-button button-link" href="javascript:void(0)" onclick="showInfoWebinarField();">Streaming Webinar</a></p>
		</div>
		<!--<div class="youtube-container" id="partner_perspective_embed" style="width:420px;height:240px;left:280px;top:90px;position:absolute;">-->
		<div class="youtube-container" id="partner_perspective_embed" style="width:315px;height:210px;left:400px;top:150px;position:absolute;">
   		<div class="youtube-player" id="tk-QNJruZgM"></div>
		</div>
		
		<div id="fade" class="black_overlay" style="display:none;"></div>

		<div id="info-email" class="white_content" style="top:80px;left:260px;width:420px;min-height:40px;display:none;border-radius:8px;">
			<p><a onclick="hideInfoEmailField();" style="float:right;"><span class="fa fa-times-circle-o fa-2x" style="margin-right:4px;flat:right;color:#899d70;cursor:pointer;" ></span></a></p>&nbsp;<br/>
			<p>We will send a packet of information to your email address. Your address will be used respectfully. We will not spam you.</p>
			<span id="info-email-input"><input type="email" name="email_1" placeholder="Recipient Email" maxlength="100" style="width:320px;margin-top:10px;" required ></span>
			<a id="info-email-button" class="pure-button button-link" onclick="infoEmailValidateAndSubmit();" style="width:46px;border-radius:4px;float:right;"><span class="fa fa-play" style="margin-right:4px;" ></span>Send</a>
		</div>
		
		<div id="info-webinar" class="white_content" style="top:80px;left:260px;width:420px;min-height:40px;display:none;border-radius:8px;">
			<p><a onclick="hideInfoWebinarField();" style="float:right;"><span class="fa fa-times-circle-o fa-2x" style="margin-right:4px;flat:right;color:#899d70;cursor:pointer;" ></span></a></p>&nbsp;<br/>
			<p style="margin-top:10px;">This link will take you to an event page where you can register for a brief, no-obligation, informational webinar.</p>
			<a class="pure-button button-link" onclick="hideInfoWebinarField()" href="https://www.eventbrite.com/e/information-webinar-tickets-16317817030" target="_blank" style="width:70px;border-radius:4px;float:right;"><span class="fa fa-external-link" style="margin-right:6px;" ></span>Register</a>
		</div>
		
		<div id="special-offer" class="white_content" style="top:80px;left:260px;width:420px;min-height:40px;display:none;border-radius:8px;">
			<p>
			<a onclick="hideSpecialOffer();" style="float:right;"><span class="fa fa-times-circle-o fa-2x" style="margin-right:4px;flat:right;color:#899d70;cursor:pointer;" ></span></a>
			</p>
			<p style="font-size:120%;font-weight:bold;">
				Special Offer! Benefits Tech Pack
				<a href="https://twitter.com/intent/tweet?text=Social%20justice%20peeps...%204%20u!%20Like%20a%20food%20coop,%20for%20technology%2E&via=NorthbridgeNFP&url=http://ow.ly/oNlQ301iDDr" target="_blank">
					<img src="images/tweet.png" width="72" height="28" style="vertical-align:text-top;margin-left:10px;" alt="Tweet"/>
				</a>
				
			</p>
			<p style="width:100%;">
				<a class="pure-button button-link" href="https://www.eventbrite.com/e/mini-training-virtual-collaboration-for-social-activists-tickets-25983638763" target="_blank" style="width:46px;border-radius:4px;background:#f68620;">
					<span class="fa fa-external-link" style="margin-right:4px;" ></span>RSVP</a>
				Sample Training: Virtual collaboration
			</p>
			<p style="margin-top:10px;width:100%;">
				<a class="pure-button button-link" href="http://nexus.northbridgetech.org/demo" target="_blank" style="width:46px;border-radius:4px;background:#f68620;">
					<span class="fa fa-wrench" style="margin-right:4px;" ></span>Try</a>
				Sample Nexus: Take it for a spin!
			</p>
			<p style="margin-top:10px;width:100%;">
				<a class="pure-button button-link" href="http://northbridgetech.org/apps/members/civicrm/contribute/transact?reset=1&id=1" target="_blank" style="width:110px;border-radius:4px;background:#f68620;">
					<span class="fa fa-paper-plane" style="margin-right:4px;" ></span>Pre-approved!</a>
				Your work deserves our best...
			</p>
		</div>

	</div>	
</form>	
