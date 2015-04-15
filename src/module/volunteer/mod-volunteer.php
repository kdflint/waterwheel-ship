<?php 

require_once("../core/domain/Util.php");

?>

<form id="volunteer-form" class="pure-form volunteer-form" action="<?php echo Util::getHttpVolunteerPath(); ?>/mod-volunteer-processor.php" method="POST">
	<input type="hidden" name="testMode" value=""/>
	<input type="hidden" name="sliderIndex" value="2"/>
	<div class="mod-volunteer-frameLeft">	
		<div class="mod-volunteer-columnLeft">
			<div class="mod-volunteer-controlLabel">Contact Information</div>
				<input type="text" name="fname" placeholder="First name" maxlength="25"><span class="required"> *</span>
				<input type="text" name="lname" placeholder="Last name" maxlength="25">
				<input type="email" name="email_1" placeholder="Email" required><span class="required"> *</span>
				<input type="email" name="email_2" placeholder="Confirm Email" required><span class="required"> *</span>
			<div class="mod-volunteer-controlLabel" style="margin-top:10px;">What would you like to get from your volunteer work with Northbridge?</div>
			<div class="mod-volunteer-controlContent">
				<input type="checkbox" name="motives[]" value="1" /> Professional networking opportunities<br/>
				<input type="checkbox" name="motives[]" value="2" /> Skill development<br/>
				<input type="checkbox" name="motives[]" value="3" /> Leadership opportunities<br/>
				<input type="checkbox" name="motives[]" value="4" /> Involvement in the open source community<br/>
				<input type="checkbox" name="motives[]" value="5" /> Creative and groundbreaking work<br/>
				<input id="motiveOther" type="checkbox" name="motives[]" value="6" /> Other <input type="text" name="otherMotive" placeholder="Please specify"  maxLength="50" style="width:70%;" onkeypress="otherCommentsSelectCheckbox('motiveOther', this);"/><br/>
			</div>
		</div>
		<div class="mod-volunteer-columnRight">		
			<div class="mod-volunteer-controlLabel">What is your expertise?</div>
			<div class="mod-volunteer-columnRightLeft">
				<div class="mod-volunteer-controlContent">
					<input type="checkbox" name="skills[]" value="13" /> Server Admin.<br/>
					<input type="checkbox" name="skills[]" value="6" /> Database <br/>
					<input type="checkbox" name="skills[]" value="14" /> User Experience <br/>
				</div>
			</div>
			<div class="mod-volunteer-columnRightRight">
				<div class="mod-volunteer-controlContent">
					<input type="checkbox" name="skills[]" value="10"/> Coding <br/>
					<input type="checkbox" name="skills[]" value="9" /> Feature Analysis <br/>
					<input type="checkbox" name="skills[]" value="15" /> Technical Writing<br/>
				</div>
			</div>
			<div class="mod-volunteer-columnRightBottom">
				<div class="mod-volunteer-controlContent">
					<input type="checkbox" name="skills[]" value="7" /> Testing (automated or otherwise)<br/>
					<input id="skillOther" type="checkbox" name="skills[]" value="16" /> Other <input type="text" name="otherSkill" placeholder="Please specify" maxLength="50" style="width:78%;" onkeypress="otherCommentsSelectCheckbox('skillOther', this);"/><br/>
				</div>
				<div class="mod-volunteer-controlLabel" style="margin-top:10px;">What else would you like to tell us about yourself?</div>
				<div class="mod-volunteer-controlContent">
					<textarea name="otherInfo" placeholder="Specific skills, level of experience, personal goals, etc." rows="8" maxlength="500" style="width:100%;"></textarea>
				</div>
			</div>
		</div>		
	</div>		
	<div class="mod-volunteer-frameRight">
		<div class="mod-volunteer-controlLabel">
			<p>For more information or to be considered for a team placement, submit this no-obligation form.</p>
			<p style="font-weight:normal;">Here are some resources that describe the Northbridge volunteer experience.</p>
		</div>
		<!--<p><span class="fa fa-file-pdf-o fa-2x"></span> <a class="mod-volunteer-anchor" href="<?php echo Util::getHttpVolunteerPath(); ?>/whyVolunteerWithNorthbridge.pdf" target="_blank" style="margin-left:5px;">Why Volunteer?</a></p>-->
		<p><span class="fa fa-github fa-2x"></span> <a class="mod-volunteer-anchor" href="https://github.com/NorthBridge/playbook/wiki/1.How-We-Do" target="_blank" style="margin-left:5px;font-weight:bold;">Team Playbook</a> </p>
		<p><span class="fa fa-video-camera fa-2x"></span> <a class="mod-volunteer-anchor" href="https://youtu.be/KrasyjOjglM" target="_blank" style="margin-left:5px;font-weight:bold;">A Volunteer Perspective</a> </p>
		<p><span class="fa fa-comment-o fa-2x"></span> <a class="mod-volunteer-anchor" href="https://www.eventbrite.com/e/orientation-webinar-tickets-16320055726?ref=ecal" target="_blank" style="margin-left:3px;font-weight:bold;">Orientation Webinar</a></p>
		<p style="position:absolute;left:140px;">
			<a class="twitter-share-button"
				href="https://twitter.com/share"
				data-url="<?php echo Util::getHttpCorePath(); ?>/index.php?view=volunteer"
				data-via="<?php echo Util::getTwitterHandle(); ?>"
				data-text="Excellent FOSS tech volunteer opportunities!">Tweet
			</a>
			<script>
				window.twttr=(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);t._e=[];t.ready=function(f){t._e.push(f);};return t;}(document,"script","twitter-wjs"));
			</script>
		</p>
		<p id="user-message2" class="user-message"><?php echo $message; ?></p>	
		<a class="pure-button button-submit" id="volunteerSubmitButton" href="#" onclick="volunteerValidateAndSubmit();" style="background:#fcb040;"><span class="fa fa-play" style="font-size:110%;margin-right:4px;" ></span> Submit</a>
	</div>
	
</form>	

