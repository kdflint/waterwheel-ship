<?php define("VOLUNTEER_ROOT", "http://localhost/waterwheel/module/volunteer"); ?>

<form id="volunteer-form" class="pure-form volunteer-form" action="<?php echo VOLUNTEER_ROOT; ?>/mod-volunteer-processor.php" method="POST">
	<input type="hidden" name="testMode" value=""/>
	<div class="mod-volunteer-frameLeft">	
		<div class="mod-volunteer-columnLeft">
			<div class="mod-volunteer-controlLabel">Contact Information</div>
				<input type="text" name="fname" placeholder="First name" maxlength="25"><span class="required"> *</span>
				<input type="text" name="lname" placeholder="Last name" maxlength="25">
				<input type="email" name="email_1" placeholder="Email" required><span class="required"> *</span>
				<input type="email" name="email_2" placeholder="Confirm Email" required><span class="required"> *</span>
			<div class="mod-volunteer-controlLabel" style="margin-top:10px;">What would you like to get from your volunteer work with Northbridge?</div>
			<div class="mod-volunteer-controlContent">
				<input type="checkbox" name="motive[]" value="1" /> Professional networking opportunities<br/>
				<input type="checkbox" name="motive[]" value="2" /> Skill development<br/>
				<input type="checkbox" name="motive[]" value="3" /> Leadership opportunities<br/>
				<input type="checkbox" name="motive[]" value="4" /> Involvement in the open source community<br/>
				<input type="checkbox" name="motive[]" value="5" /> Creative and groundbreaking work<br/>
				<input type="checkbox" name="motive[]" value="6" /> Other <input type="text" name="otherMotive" placeholder="Please specify"  maxLength="50"/><br/>
			</div>
		</div>
		<div class="mod-volunteer-columnRight">		
			<div class="mod-volunteer-controlLabel">What is your expertise?</div>
			<div class="mod-volunteer-columnRightLeft">
				<div class="mod-volunteer-controlContent">
					<input type="checkbox" name="skill[]" value="13" /> Server Admin.<br/>
					<input type="checkbox" name="skill[]" value="6" /> Database <br/>
					<input type="checkbox" name="skill[]" value="14" /> User Experience <br/>
				</div>
			</div>
			<div class="mod-volunteer-columnRightRight">
				<div class="mod-volunteer-controlContent">
					<input type="checkbox" name="skill[]" value="10"/> Coding <br/>
					<input type="checkbox" name="skill[]" value="9" /> Feature Analysis <br/>
					<input type="checkbox" name="skill[]" value="15" /> Technical Writing<br/>
				</div>
			</div>
			<div class="mod-volunteer-columnRightBottom">
				<div class="mod-volunteer-controlContent">
					<input type="checkbox" name="skill[]" value="7" /> Testing (automated or otherwise)<br/>
					<input type="checkbox" name="skill[]" value="16" /> Other <input type="text" name="otherSkill" placeholder="Please specify" maxLength="50"/><br/>
				</div>
				<div class="mod-volunteer-controlLabel" style="margin-top:10px;">What else would you like to tell us about yourself?</div>
				<div class="mod-volunteer-controlContent">
					<textarea name="otherInfo" placeholder="Specific skills, level of experience, personal goals, etc." rows="8" cols="25" maxlength="500"></textarea>
				</div>
			</div>
		</div>		
	</div>		
	<div class="mod-volunteer-frameRight">
		<div class="mod-volunteer-controlLabel">
			<p>For more information or to be considered for a team placement, submit this no-obligation form.</p>
			<p style="font-weight:normal;">Here are some resources that describe the Northbridge volunteer experience.</p>
		</div>
		<p style="margin-top:10px"><span class="fa fa-file-pdf-o fa-2x"></span> <a class="mod-volunteer-anchor" href="#">Whitepaper</a></p>
		<p><span class="fa fa-github fa-2x"></span> <a class="mod-volunteer-anchor" href="https://github.com/NorthBridge/playbook/wiki">Team Playbook</a> </p>
		<p><span class="fa fa-reply fa-2x"></span>  <a class="mod-volunteer-anchor" href="#">Reserve Orientation Seat</a></p>
		<p style="font-weight:normal;">TODO - show next two sessions from dynamic event calendar</p>	
	<a class="pure-button button-submit" id="volunteerSubmitButton" href="#" onclick="volunteerValidateAndSubmit();"><span class="fa fa-square" style="font-size:110%;" ></span> Submit</a>
	</div>
	
</form>	
