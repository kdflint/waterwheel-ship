<?php 

require_once("../core/domain/Util.php");

?>

<!-- This is actually the Membership Application form, moved into the Volunteer module, replacing the old Volunteer interest form. -->
<!-- It's much easier to re-use the existing form name despite the possible confusion! -->
<!-- All styles pointed to volunteer module style names -->
<!-- The original Membership Application form is preserved in the Apply module -->

<form id="volunteer-form" class="pure-form volunteer-form" action="" method="POST">
	<input type="hidden" name="testMode" value=""/>
	<div class="mod-volunteer-frameLeft">	
		<?php if (false) {
			echo "<div id='fade' class='black_overlay'></div>"; 
			echo "<div id='light_userprofile' class='white_content'>";
			include("mod-closed.php");
			echo "</div>";
		} ?>
		<p style="font-size:130%;font-weight:bold;margin-left:5px;margin-top:10px;"></p>
		<div class="mod-volunteer-columnLeft">		
			<div class="mod-volunteer-controlLabel">What is your team's service area?<span class="required"> *</span></div>
			<div id="service-area-area" class="mod-volunteer-controlContent" style="height:165px;border-radius:4px;">
				<div class="mod-volunteer-columnRightLeft">
					<input type="checkbox" name="services[]" value="9" /> Human Services<br/>
					<input type="checkbox" name="services[]" value="4" /> Restorative Justice<br/>
					<input type="checkbox" name="services[]" value="5" /> Human Rights<br/>
					<input type="checkbox" name="services[]" value="6" /> Health Equity<br/>
					<!--<input type="checkbox" name="services[]" value="5" /> Advocacy/Education<br/>-->
				</div>
				<div class="mod-volunteer-columnRightRight">
					<!--<input type="checkbox" name="services[]" value="6" /> Health Equity<br/>-->
					<input type="checkbox" name="services[]" value="7" /> Education Equity<br/>
					<input type="checkbox" name="services[]" value="8" /> Environment Equity<br/>
					<input type="checkbox" name="services[]" value="8" /> Housing Equity<br/>
				</div>
				<div style="position: absolute;top: 112px;">
					<input type="checkbox" name="services[]" value="8" /> Intersectional Systemic Equity<br/>
					<input type="checkbox" name="services[]" value="1" /> Underserved Community Development<br/>
					<!--<input type="checkbox" name="services[]" value="3" /> Research and Public Policy<br/>-->
					<input type="checkbox" name="services[]" value="3" /> Other Social Justice or Community-Raising Focus<br/>
				</div>
			</div>
			<div style="margin-top:10px;">
				<div class="mod-volunteer-controlLabel">Contact Email (optional)</div>
				<input type="email" name="email_1" placeholder="Email">
				<input type="email" name="email_2" placeholder="Confirm Email">		
			</div>
		</div>
		<div class="mod-volunteer-columnRight">		
			<div class="mod-volunteer-controlLabel" style="margin-top: 0px;">Describe your organizational affiliation</div>
			<div style="margin-bottom:5px;">If your work is cross-organizational (hurray!) please represent one of your primary sponsors.</div>
      <select id="country" name="country">
      	<option value="0" selected>Governing Country</option>
				<?php include("countryDropdownOptions.html"); ?>
      </select><span class="required" > *</span>
      <select id="cause" name="budget" style="margin-top:5px;">
      	<option value="0" selected>Organizational Budget</option>
      	<option value="1">$0 - $10,000</option>
      	<option value="2">$10,001 - $100,000</option>
      	<option value="3">$100,001 - $250,000</option>
      	<option value="4">$250,001 - $500,000</option>
      	<option value="5">$500,001 - $1,000,000</option>
       	<option value="6"> &gt; $1,000,000</option>
      </select><span class="required" > *</span>
     	<div class="mod-volunteer-controlLabel" style="margin-top: 10px;">Describe your organizational structure<span class="required"> *</span></div>
			<div id="structure-area" class="mod-volunteer-controlContent" style="height:70px;border-radius:4px;">
       	<input type="checkbox" name="structure[]" value="0" /> Grass roots, community organized<br/>
       	<input type="checkbox" name="structure[]" value="1" /> Incorporated or regulated nonprofit/charity<br/>
       	<input type="checkbox" name="structure[]" value="2" /> Tax-exempt nonprofit/charity<br/>
			</div>
		<a class="pure-button button-submit" id="applySubmitButton" href="#" onclick="applyValidateAndSubmit('volunteer-form');" style="background:#fcb040;bottom:-46px;width:85%;left:auto;"><span class="fa fa-play" style="font-size:110%;margin-right:4px;" ></span> Check Eligibility</a>

		</div>		
	</div>		
	<div class="mod-volunteer-frameRight">
		<p id="user-message4" class="skyblue" style="font-size:130%;font-weight:bold;margin-left:5px;margin-top:10px;">Use this no-obligation form to check membership eligibility for yourself, your team, committee, work group, Board or task force.</p>
		<p id="user-message2" class="user-message" style="bottom:auto;margin-top:10px;font-size:120%;"></p>
		<div id="apply-disabled" style="display:block;">
			<a class="pure-button pure-button-disabled button-submit mod-sponsor-button" href="#" onclick="alert('Please confirm your eligibility before viewing the registration form.');" style="bottom:47px;width:75%;left:auto;" target="_blank"><span class="fa fa-paper-plane" style="font-size:110%;margin-right:5px;" ></span>View Registration Form</a>
		</div>
		<div id="apply-link" style="display:none;">
			<a class="pure-button button-submit mod-sponsor-button" href="<?php echo($applyLink); ?>"  style="bottom:47px;width:75%;left:auto;" target="_blank"><span class="fa fa-paper-plane" style="font-size:110%;margin-right:5px;" ></span>View Registration Form</a>
		</div>
	</div>
	
</form>	

		<!--
		<p style="margin-top:10px"><span class="fa fa-file-pdf-o fa-2x"></span> <a class="mod-volunteer-anchor" href="<?php echo Util::getStaticDownloadPath(); ?>/Northbridge_partnership.pdf" style="margin-left:5px;font-weight:bold;" target="_blank" >Partnership Details</a></p>
		<p><span class="fa fa-video-camera fa-2x"></span> <a class="mod-volunteer-anchor" href="https://youtu.be/tk-QNJruZgM" target="_blank" style="margin-left:5px;font-weight:bold;">A Partner Perspective</a> </p>
		<p><span class="fa fa-comment-o fa-2x"></span>  <a class="mod-volunteer-anchor" href="https://www.eventbrite.com/e/information-webinar-tickets-16317817030" style="margin-left:3px;font-weight:bold;" target="_blank">Information Webinar</a></p>
		-->
