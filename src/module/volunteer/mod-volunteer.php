<?php 

require_once("../core/domain/Util.php");

?>

<!-- This is actually the Membership Application form, moved into the Volunteer module, replacing the old Volunteer interest form. -->
<!-- It's much easier to re-use the existing form name despite the possible confusion! -->
<!-- All styles pointed to volunteer module style names -->
<!-- The original Membership Application form is preserved in the Apply module -->


<div class="mod-volunteer-frameLeft"  style="font-size:130%;">	
		<p style="margin:10px 10px 10px 30px;font-size:130%;"><b>Who? Broad impact areas for 2018</b>
		<div style="font-size:100%;margin-left:30px;">
			
		<ul style="font-size:90%;">
    <li>Chicago: Community Engagement for Strong Neighborhoods</li>
    <li>Illinois: Health Care Equity</li>
    <li>USA: Systemic Racial Equity</li>
    <li>International: Human Rights</li>
    <li>Other, by invitation (LOI to <a class="benefits-grid" href="mailto:grants@northbridgetech.org">grants@northbridgetech.org</a>)</li>
		</ul>
		
		<p>We consider all of these common teamwork situations to be eligible.</p>
		
		<ul style="font-size:90%;">
    <li>Task force or committee working within a local faith community</li>
    <li>Staff committee fulfilling the work of a traditional nonprofit service-oriented program</li>
    <li>Board of Directors</li>
    <li>Grass-roots, community-based activism group</li>
    <li>Local chapter of an NGO</li>
    <li>Academic or research project</li>
		</ul>
		<p style="margin-top:20px;">
		<p>
		</div>
	
	<?php /* Hiding this whole form because I may want to reuse it. ** ?>
	
	<form id="volunteer-form" class="pure-form volunteer-form" action="" method="POST" style="display:none;">
	<input type="hidden" name="testMode" value=""/>
		<?php if (false) {
			echo "<div id='fade' class='black_overlay'></div>"; 
			echo "<div id='light_userprofile' class='white_content'>";
			include("mod-closed.php");
			echo "</div>";
		} ?>
		<p style="font-size:130%;font-weight:bold;margin-left:5px;"></p>
		<div class="mod-volunteer-columnLeft">		
     	<div class="mod-volunteer-controlLabel" style="margin-top:0px;font-size:110%;">Describe your group, team, committee, work group, task 
force or Board<span class="required"> *</span></div>
			<div id="structure-area" class="mod-volunteer-controlContent" style="height:110px;border-radius:4px;">
       	<input type="checkbox" name="structure[]" value="0" /> Grass roots, community organized<br/>
       	<input type="checkbox" name="structure[]" value="1" /> Part of an incorporated or regulated nonprofit/charity<br/>
       	<input type="checkbox" name="structure[]" value="2" /> Part of a tax-exempt nonprofit/charity<br/>
			</div>
			<div class="mod-volunteer-controlLabel" style="margin-top:0px;font-size:110%;">Describe your resources</div>
			<div style="margin-bottom:5px;">If your work is cross-organizational (hurray!) please represent one of your primary sponsors.</div>
      <select id="country" name="country">
      	<option value="0" selected>Governing Country</option>
				<?php include("countryDropdownOptions.html"); ?>
      </select><span class="required" > *</span>
      <select id="cause" name="budget-team" style="margin-top:5px;">
      	<option value="0" selected>Project or Team Budget</option>
      	<option value="1">$0 - $10,000</option>
      	<option value="2">$10,001 - $100,000</option>
      	<option value="3">$100,001 - $250,000</option>
      	<option value="4">$250,001 - $500,000</option>
      	<option value="5">$500,001 - $1,000,000</option>
       	<option value="6"> &gt; $1,000,000</option>
      </select><span class="required" > *</span>
      <select id="cause" name="budget" style="margin-top:5px;">
      	<option value="0" selected>Organizational Budget</option>
      	<option value="1">$0 - $10,000</option>
      	<option value="2">$10,001 - $100,000</option>
      	<option value="3">$100,001 - $250,000</option>
      	<option value="4">$250,001 - $500,000</option>
      	<option value="5">$500,001 - $1,000,000</option>
       	<option value="6"> &gt; $1,000,000</option>
      </select>

			<!--
			<div style="margin-top:10px;">
				<div class="mod-volunteer-controlLabel">Contact Email (optional)</div>
				<input type="email" name="email_1" placeholder="Email">
				<input type="email" name="email_2" placeholder="Confirm Email">		
			</div>
			-->
		</div>
		<div class="mod-volunteer-columnRight">		
			<div class="mod-volunteer-controlLabel" style="font-size:110%;">Where is your progress?<span class="required"> *</span></div>
			<div id="service-area-area" class="mod-volunteer-controlContent" style="height:165px;border-radius:4px;">
				<div class="mod-volunteer-columnRightLeft">
					<input type="checkbox" name="services[]" value="9" /> Human Services<br/>
					<input type="checkbox" name="services[]" value="4" /> Restorative Justice<br/>
					<input type="checkbox" name="services[]" value="5" /> Human Rights<br/>
					<input type="checkbox" name="services[]" value="6" /> Health Equity<br/>
					<input type="checkbox" name="services[]" value="8" /> Intersectional Systemic Equity<br/>
					<input type="checkbox" name="services[]" value="1" /> Underserved Community Development<br/>
					<!--<input type="checkbox" name="services[]" value="3" /> Research and Public Policy<br/>-->
					<input type="checkbox" name="services[]" value="3" /> Other Social Justice or Community-Raising Focus<br/>
					<!--<input type="checkbox" name="services[]" value="5" /> Advocacy/Education<br/>-->
				</div>
				<div class="mod-volunteer-columnRightRight">
					<input type="checkbox" name="services[]" value="7" /> Education Equity<br/>
					<input type="checkbox" name="services[]" value="8" /> Environment Equity<br/>
					<input type="checkbox" name="services[]" value="8" /> Housing Equity<br/>
				</div>
			</div>

		<a class="pure-button button-submit" id="applySubmitButton" href="#" onclick="applyValidateAndSubmit('volunteer-form');" style="background:#fcb040;bottom:-94px;width:85%;left:auto;"><span class="fa fa-play" style="font-size:110%;margin-right:4px;" ></span> Check Eligibility</a>
		</div>		
	</form>	
	<?php */ ?>
	</div>	
	
	<div class="mod-volunteer-frameRight">
		<div style="margin:10px;">
		<!--<p id="user-message4" class="skyblue" style="font-size:130%;font-weight:bold;margin-left:5px;margin-top:10px;">Use this no-obligation form to check eligibility for our grant and membership programs.</p>-->
		<p id="user-message4" class="skyblue" style="font-size:130%;font-weight:bold;">We are fostering a diverse profile of 2018 grantees.</p>
		<p class="skyblue" style="font-size:130%;font-weight:bold;margin-top:10px;">If your work touches one or more of our impact areas, we welcome your application!</p>
		<p id="user-message2" class="user-message" style="bottom:auto;font-size:120%;"></p>
		<p style="margin-top:10px;"><a class="benefits-grid" href="<?php echo Util::getStaticDownloadPath(); ?>/Whitepaper_GranteeFAQ.pdf" target="_blank"><span class="fa fa-file-pdf-o fa-2x orange" style="margin-right:8px;"></span><span class="skyblue" style="font-size:130%;"><b>FAQ</b></span></a></p>
		<p style-"margin-top:10px;"><a class="benefits-grid" href="<?php echo Util::getStaticDownloadPath(); ?>/Whitepaper_GrantGuidelines.pdf" target="_blank"><span class="fa fa-file-pdf-o fa-2x orange" style="margin-right:8px;"></span><span class="skyblue" style="font-size:130%;"><b>Submission Guidelines</b></span></a></p>
		<p class="skyblue" style="font-size:120%;font-weight:bold;margin-top:10px;">Questions to <a class="benefits-grid" href="mailto:grants@northbridgetech.org">grants@northbridgetech.org</a></p>
	</div>
		<!--
		<div id="apply-disabled" style="display:none;">
			<a class="pure-button pure-button-disabled button-submit mod-sponsor-button two tan" href="#" onclick="alert('Please confirm your eligibility before viewing the application forms.');" style="bottom:47px;width:75%;left:auto;" target="_blank"><span class="fa fa-paper-plane" style="font-size:110%;margin-right:5px;" ></span>APPLY NOW</a>
		</div>
		<div id="apply-link" style="display:block;">
			<a class="pure-button button-submit mod-sponsor-button two tan" href="<?php echo($applyLink); ?>"  style="bottom:47px;width:75%;left:auto;" target="_blank"><span class="fa fa-paper-plane" style="font-size:110%;margin-right:5px;" ></span>APPLY NOW</a>
		</div>
		-->
		<?php include("apply.php"); ?>
	</div>
	


		<!--
		<p style="margin-top:10px"><span class="fa fa-file-pdf-o fa-2x"></span> <a class="mod-volunteer-anchor" href="<?php echo Util::getStaticDownloadPath(); ?>/Northbridge_partnership.pdf" style="margin-left:5px;font-weight:bold;" target="_blank" >Partnership Details</a></p>
		<p><span class="fa fa-video-camera fa-2x"></span> <a class="mod-volunteer-anchor" href="https://youtu.be/tk-QNJruZgM" target="_blank" style="margin-left:5px;font-weight:bold;">A Partner Perspective</a> </p>
		<p><span class="fa fa-comment-o fa-2x"></span>  <a class="mod-volunteer-anchor" href="https://www.eventbrite.com/e/information-webinar-tickets-16317817030" style="margin-left:3px;font-weight:bold;" target="_blank">Information Webinar</a></p>
		-->
