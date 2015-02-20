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
			<div class="mod-apply-controlLabel">Organization Information</div>
				<input type="text" name="oname" placeholder="Organization Name" maxlength="75"><span class="required"> *</span>
				<input type="text" name="ein" placeholder="EIN" maxlength="10"><span class="required"> *</span>
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
			<div class="mod-apply-controlLabel" style="margin-top: 10px;">Team Information</div>
				<input type="text" name="tname" placeholder="Team Name" maxlength="50"><span class="required"> *</span>
				<input type="text" name="cname" placeholder="Contact Name" maxlength="50"><span class="required"> *</span>
				<input type="email" name="email_1" placeholder="Email" required><span class="required"> *</span>
				<input type="email" name="email_2" placeholder="Confirm Email" required><span class="required"> *</span>
		</div>
		<div class="mod-apply-columnRight">		
			<div class="mod-apply-controlLabel">What is your team's service area?<span class="required"> *</span></div>
			<div class="mod-apply-columnRightLeft">
				<div class="mod-apply-controlContent">
					<input type="checkbox" name="services[]" value="1" /> Human trafficking<br/>
					<input type="checkbox" name="services[]" value="3" /> Domestic Violence<br/>
					<input type="checkbox" name="services[]" value="9" /> Sexual Violence<br/>
					<input type="checkbox" name="services[]" value="4" /> Racial Reconciliation<br/>
				</div>
			</div>
			<div class="mod-apply-columnRightRight">
				<div class="mod-apply-controlContent">
					<input type="checkbox" name="services[]" value="6"/> Housing Equity<br/>
					<input type="checkbox" name="services[]" value="7" /> Education Equity<br/>
					<input type="checkbox" name="services[]" value="8" /> Health Equity<br/>
					<input type="checkbox" name="services[]" value="5" /> Human Rights<br/>
				</div>
			</div>
			<div class="mod-apply-columnRightBottom">
				<div class="mod-apply-controlContent">
					<input type="checkbox" name="services[]" value="2" /> Other <input type="text" name="otherService" placeholder="Please specify" maxLength="50" style="width:78%;"/><br/>
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
			<p>No gimmicks. No obligation. Use this form to apply for space in our global web conference center.</p>
		</div>
		<p style="margin-top:10px"><span class="fa fa-file-pdf-o fa-2x"></span> <a class="mod-apply-anchor" href="#">Grant Details</a> [TODO]</p>
		<p style="margin-top:10px"><span class="fa fa-file-pdf-o fa-2x"></span> <a class="mod-apply-anchor" href="#">Service Details</a> [TODO]</p>
		<p><span class="fa fa-reply fa-2x"></span>  <a class="mod-apply-anchor" href="#">Reserve Orientation Seat</a></p>
		<p id="user-message1" class="user-message" style="visibility:hidden;"><?php echo $message; ?></p>	
	<a class="pure-button button-submit" id="applySubmitButton" href="#" onclick="applyValidateAndSubmit();"><span class="fa fa-play" style="font-size:110%;margin-right:4px;" ></span> Apply</a>
	</div>
	
</form>	
