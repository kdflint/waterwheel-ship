<?php 

require_once("../core/domain/Util.php");

?>

<form id="apply-form" class="pure-form apply-form" action="<?php echo Util::getHttpApplyPath(); ?>/mod-apply-processor.php" method="POST">
	<input type="hidden" name="testMode" value=""/>
	<div class="mod-apply-frameLeft">	
		<?php if (false) {
			echo "<div id='fade' class='black_overlay'></div>"; 
			echo "<div id='light_userprofile' class='white_content'>";
			include("mod-closed.php");
			echo "</div>";
		} ?>
		<div class="mod-apply-columnLeft">
			<div class="mod-apply-controlLabel">Team Information</div>
				<input type="text" name="tname" placeholder="Team Name" maxlength="50"></span>
				<input type="text" name="cname" placeholder="Contact Name" maxlength="50"><span class="required"> *</span>
				<input type="email" name="email_1" placeholder="Email" required><span class="required"> *</span>
				<input type="email" name="email_2" placeholder="Confirm Email" required><span class="required"> *</span>
			
			<div class="mod-apply-controlLabel" style="margin-top: 10px;">Organization Information</div>
				<input type="text" name="oname" placeholder="Organization Name" maxlength="75"><span class="required"> *</span>
				<input type="text" name="ein" placeholder="EIN" maxlength="10"></span>
				<input type="text" name="url" placeholder="Web Site" maxlength="100"><span class="required"> *</span>
         <select id="cause" name="budget">
         		<option value="0" selected>Organization Budget Req'd</option>
         		<option value="1">$0 - $10,000</option>
         		<option value="2">$10,001 - $100,000</option>
         		<option value="3">$100,001 - $250,000</option>
         		<option value="4">$250,001 - $500,000</option>
         		<option value="5">$500,001 - $1,000,000</option>
          	<option value="6"> &gt; $1,000,000</option>
         </select><span class="required" > *</span>
		</div>
		<div class="mod-apply-columnRight">		
			<div class="mod-apply-controlLabel">What is your team's service area?<span class="required"> *</span></div>
			<div class="mod-apply-columnRightLeft">
				<div class="mod-apply-controlContent">
					<input type="checkbox" name="services[]" value="1" /> Community Developmnt<br/>
					<input type="checkbox" name="services[]" value="3" /> Research & Public Policy<br/>
					<input type="checkbox" name="services[]" value="9" /> Human Services<br/>
					<input type="checkbox" name="services[]" value="4" /> Restorative Justice<br/>
				</div>
			</div>
			<div class="mod-apply-columnRightRight">
				<div class="mod-apply-controlContent">
					<input type="checkbox" name="services[]" value="6" /> Health Equity<br/>
					<input type="checkbox" name="services[]" value="7" /> Education Equity<br/>
					<input type="checkbox" name="services[]" value="8" /> Environment Equity<br/>
					<input type="checkbox" name="services[]" value="5" /> Human/Civil Rights<br/>
				</div>
			</div>
			<div class="mod-apply-columnRightBottom">
				<div class="mod-apply-controlContent">
					<input id="serviceOther" type="checkbox" name="services[]" value="2" /> Other <input type="text" name="otherService" placeholder="Please specify" maxLength="50" style="width:78%;"  onkeypress="otherCommentsSelectCheckbox('serviceOther', this);"/><br/>
				</div>
				<div class="mod-apply-controlLabel" style="margin-top:10px;">What is your team's service reach?<span class="required"> *</span></div>
				<div class="mod-apply-controlContent">
					<input type="text" name="reach" placeholder="Population and geography"  maxLength="100" style="width:100%;"/>
					</div>
				<div class="mod-apply-controlLabel" style="margin-top:10px;">What is your team's mission?<span class="required"> *</span></div>
				<div class="mod-apply-controlContent">
					<textarea name="mission" placeholder="Specific goals or formal mission statement. 300 characters or less, please." rows="5" maxlength="300" style="width:100%;"></textarea>
				</div>
			</div>
		</div>		
	</div>		
	<div class="mod-apply-frameRight">
		<div class="mod-apply-controlLabel">
			<p>No gimmicks. No obligation. Use this form to apply for partnership with Northbridge Technology Alliance.</p>
			<p style="font-weight:normal;">Partnership gains eligibility for Northbridge technology services, including space in our global web conference center.</p>
		</div>
		<p style="margin-top:10px"><span class="fa fa-file-pdf-o fa-2x"></span> <a class="mod-apply-anchor" href="<?php echo Util::getStaticDownloadPath(); ?>/Northbridge_partnership.pdf" style="margin-left:5px;font-weight:bold;" target="_blank" >Partnership Details</a></p>
		<p style="margin-top:10px"><span class="fa fa-file-pdf-o fa-2x"></span> <a class="mod-apply-anchor" href="<?php echo Util::getStaticDownloadPath(); ?>/Northbridge_tech_specs.pdf" style="margin-left:5px;font-weight:bold;" target="_blank" >Conference Room Details</a></p>
		<p><span class="fa fa-comment-o fa-2x"></span>  <a class="mod-apply-anchor" href="https://www.eventbrite.com/e/orientation-webinar-tickets-16320055726?ref=ecal" style="margin-left:3px;font-weight:bold;" target="_blank">Orientation Webinar</a></p>
		<p style="position:absolute;left:140px;">
			<a class="twitter-share-button"
				href="https://twitter.com/share"
				data-url="<?php echo Util::getHttpCorePath(); ?>/index.php?view=apply"
				data-via="<?php echo Util::getTwitterHandle(); ?>"
				data-text="Exclusive opportunity for community building nonprofits.">Tweet
			</a>
			<script>
				window.twttr=(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);t._e=[];t.ready=function(f){t._e.push(f);};return t;}(document,"script","twitter-wjs"));
			</script>
		</p>
		<p id="user-message0" class="user-message"><?php echo $message; ?></p>	
		<a class="pure-button button-submit" id="applySubmitButton" href="#" onclick="applyValidateAndSubmit();" style="background:#99af7d;"><span class="fa fa-play" style="font-size:110%;margin-right:4px;" ></span> Apply</a>
	</div>
	
</form>	
