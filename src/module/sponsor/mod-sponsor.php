<?php 

require_once("../core/domain/Util.php");

?>

<script type="text/javascript">$m.wand.copy_value_to_html = true;</script>
		
<div class="mod-sponsor-contentLeft">
	<form id="sponsor-form" class="pure-form sponsor-form" action="<?php echo Util::getHttpSponsorPath(); ?>/mod-sponsor-processor.php" method="POST">							
		<div class="mod-sponsor-controlLevel">
			<div class="mod-sponsor-controlLabel">
				Your Level
			</div>
			<div class="mod-sponsor-controlContent">
				<input id="option1" type="radio" name="levels" value="25" onclick="copyLevelValue();"/>&nbsp;$25&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input id="option2" type="radio" name="levels" value="50" onchange="copyLevelValue();" />&nbsp;$50&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input id="option3" type="radio" name="levels" value="100" onclick="copyLevelValue();" checked/>&nbsp;$100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input id="option4" type="radio" name="levels" value="250" onclick="copyLevelValue();" />&nbsp;$250&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<input id="option5" type="radio" name="levels" value="500" onclick="copyLevelValue();" />&nbsp;$
				<input id="optionOther" type="text" name="otherLevel" size="5" placeholder="Other" style="font-size:80%;"/>
			</div>
		</div>							
		<div class="mod-sponsor-controlSponsorship">
			<div class="mod-sponsor-controlLabel">
				Sponsorship
			</div>	
			<div class="mod-sponsor-controlContent">
				<fieldset style="border:0px;">
					<label for="showSponsorship">
	 					<input id="showSponsorship" type="checkbox" onchange="toggleSponsorDisplay();" checked/> Public?&nbsp;&nbsp;
  				</label>
	        <input type="text" placeholder="Please use this name" style="font-size: 80%;margin-left:17px;" data-mjf="copy_value_to_html" data-mjf_cvth_id="sponsorNameDisplay" size="30" id="sponsorName">
	      </fieldset>
			</div>							
		</div>							
		<div class="mod-sponsor-controlImpact">
			<div class="mod-sponsor-controlLabel">
				Impact Report
			</div>	
			<div class="mod-sponsor-controlContent">
		    <fieldset style="border:0px;">
					<label for="showImpact">
   					<input id="showImpact" type="checkbox" onchange="toggleImpactDisplay();" disabled /> No Thanks&nbsp;&nbsp;
					</label>
	        <input type="email" placeholder="Please email report to" style="font-size: 80%;" data-mjf="copy_value_to_html" data-mjf_cvth_id="impactEmailDisplay" id="impactEmail" size="30" disabled>
				</fieldset>
			</div>							
		</div>						
		<div class="mod-sponsor-controlDesignate">
			<div class="mod-sponsor-controlLabel">
				Designate By									
				<a class="pure-button mod-sponsor-button" id="listButton" href="#" onclick="toggleSearchCategory('waitingList', this);" style="font-size: 80%;">Waiting List</a>
				<a class="pure-button mod-sponsor-button" id="orgButton" href="#" onclick="toggleSearchCategory('searchResultsList', this);" style="font-size: 80%;">Org Name</a>
				<a class="pure-button mod-sponsor-button pure-button-disabled pure-button-disabled" id="causeButton" href="#" onclick="toggleSearchCategory('causeList', this);" style="font-size: 80%;">Cause</a>
			</div>	
			<div class="mod-sponsor-controlContent">							
				<div class="mod-sponsor-designate" id="waitingList">
					<div class="mod-sponsor-slider">
 						<div class="slide" id="slide1"><img src="<?php echo Util::getHttpSponsorPath(); ?>/images/cat.gif" height="" width="200" style="margin:2px;"/></div>
						<div class="slide" id="slide2"><img src="<?php echo Util::getHttpSponsorPath(); ?>/images/ec.gif" height="" width="" style="margin:2px;"/></div>
       			<div class="slide" id="slide3"><img src="<?php echo Util::getHttpSponsorPath(); ?>/images/cfcht.png" height="" width="200" style="margin:2px;"/></div>
       			<div class="slide" id="slide4">Ravenswood Community Services</div>
       			<div class="slide" id="slide5">Fellowship Housing</div>
       			<div class="slide" id="slide6">Stuff 6</div>
       			<div class="slide" id="slide7">Stuff 7</div>
       			<div class="slide" id="slide8">Stuff 8</div>
       			<div class="slide" id="slide9">Stuff 9</div>
       			<div class="slide" id="slide10">Stuff 10</div>
    			</div>
    			<div class="mod-sponsor-accordion">
			    	<div class="header" id="header1"><a href="#" onclick="showSlide('1');">Chicago Adventure Therapy</a><input id="check1L" type="checkbox" name="designation" value="Chicago Adventure Therapy" style="float:right;" onchange="designateOrg('1L');" /></div>
        		<div class="header" id="header2"><a href="#" onclick="showSlide('2');">Episcopal Diocese of Chicago</a><input id="check2L" type="checkbox" name="designation" value="Fellowship Housing" style="float:right;" onchange="designateOrg('2L');" /></div>
        		<div class="header" id="header3"><a href="#" onclick="showSlide('3');">Center for Faith and Community Health Transformation</a><input id="check3L" type="checkbox" name="designation" value="Center for Faith and Community Health Transformation" style="float:right;" onchange="designateOrg('3L');" /></div>
        		<div class="header" id="header4"><a href="#" onclick="showSlide('4');">Ravenswood Community Services</a><input id="check4L" type="checkbox" name="designation" value="Ravenswood Community Services" style="float:right;" onchange="designateOrg('4L');" /></div>
        		<div class="header" id="header5"><a href="#" onclick="showSlide('5');">Fellowship Housing</a><input id="checkL5" type="checkbox" name="designation" value="Episcopal Diocese of Chicago" style="float:right;" onchange="designateOrg('5L');" /></div>
        		<div class="header" id="header6"><a href="#" onclick="showSlide('6');">Another</a><input id="check6L" type="checkbox" name="designation" value="Another" style="float:right;" onchange="designateOrg('6L');" /></div>
        		<div class="header" id="header7"><a href="#" onclick="showSlide('7');">Another</a><input id="check7L" type="checkbox" name="designation" value="Another" style="float:right;" onchange="designateOrg('7L');" /></div>
        		<div class="header" id="header8"><a href="#" onclick="showSlide('8');">Another</a><input id="check8L" type="checkbox" name="designation" value="Another" style="float:right;" onchange="designateOrg('8L');" /></div>
        		<div class="header" id="header9"><a href="#" onclick="showSlide('9');">Another</a><input id="check9L" type="checkbox" name="designation" value="Another" style="float:right;" onchange="designateOrg('9L');" /></div>
        		<div class="header" id="header10"><a href="#" onclick="showSlide('10');">Another</a><input id="check10L" type="checkbox" name="designation" value="Another" style="float:right;" onchange="designateOrg('10L');" /></div>        						
    			</div>
    		</div>
    		<div class="mod-sponsor-designate" id="searchResultsList">
        	<div class="mod-sponsor-slider">
	      		<textarea rows="2" cols="22" placeholder="Search by Organization Name" style="font-size: 80%;margin:5px;" ></textarea>
				   	<input type="text" placeholder="Search by EIN" style="font-size: 80%;margin:5px;" size="12">
				   	<a class="pure-button mod-sponsor-button" id="" href="#" style="font-size: 80%;" onclick="loadSearchResults()"><span class="fa fa-search" ></span> Search</a>
				   </div>									
    			<div class="mod-sponsor-accordion">
	    			<div id="orgSearchResults">
    				</div>
    			</div>
    			</div>    								
  				<div class="mod-sponsor-designate" id="causeList">
     				<div class="mod-sponsor-slider" style="width:50%;">
         			<select id="cause" size="4" style="font-size: 70%; overflow: hidden; width: 100%; height: 100%; padding: 10px;" onchange="copyCauseValue();">
           			<option value="Domestic Violence interventions">Domestic Violence</option>
           			<option value="advance Equitable Health Care">Equitable Health Care</option>
           			<option value="support At-Risk Youth">At-Risk Youth</option>
           			<option value="support Whatever">Whatever</option>
           			<option value="advance Whatever">Whatever</option>
           			<option value="improve Whatever">Whatever</option>
           			<option value="increase Whatever">Whatever</option>
         			</select>	
         		</div>									
  					<div class="mod-sponsor-accordion" style="width:50%;">
    					&nbsp;&nbsp;Geographic preference<br/>
    					&nbsp;&nbsp;<input id="holdForDesignate" type="checkbox" onchange="" />&nbsp;Reserve my gift for this region<br/>
    	   			<input type="text" placeholder="US Postal Code" style="font-size: 80%;margin:5px;" size="17">
          		<textarea rows="2" cols="16" placeholder="State/Province/Country/Region" style="font-size: 80%;margin:5px;"></textarea>						        		
    				</div>
					</div>
				</div>		
			</div>
	</form>
</div>
<div class="mod-sponsor-contentRight">
	<p>Your generous gift of $<span id="levelAmountDisplay">100</span> provides <span id="levelTimeDisplay">1 year</span> of <span id="levelServiceDisplay">advanced</span> web conference service to <span id="designateNameDisplay">an eligible 501(c)(3) organization</span>.</p>															
	<p id="sponsorCheckedDisplay">This gift will be acknowledged in the name of <span id="sponsorNameDisplay">the donor</span>.</p>
	<p id="sponsorOptOutDisplay">At your request this gift will remain anonymous.</p>						
	<p id="impactCheckedDisplay">We will be delighted to send your targeted impact report to <span id="impactEmailDisplay">the donation email address</span>.</p>
	<p id="impactOptOutDisplay">At your request we will withold your targeted impact report.</p>	
	<p id="user-message0" class="user-message"><?php echo $message; ?></p>	
	<div class="mod-sponsor-sponsorButtons">						
		<a class="pure-button mod-sponsor-button" id="" href="#"  onclick="" style="padding:5px;font-family: 'PT Sans Narrow', sans-serif;font-size:110%;"><span class="fa fa-paypal" style="font-size:110%;"></span> PayPal</a>
		<a class="pure-button mod-sponsor-button" id="" href="#" onclick="" style="padding:5px;font-family: 'PT Sans Narrow', sans-serif;font-size:110%;font-size:110%;"><span class="fa fa-cc-stripe" style="font-size:120%;" ></span> Credit</a>
		<a class="pure-button mod-sponsor-button" id="" href="#" onclick="" style="padding:5px;font-family: 'PT Sans Narrow', sans-serif;font-size:110%;"><span class="fa fa-envelope" style="font-size:110%;" ></span> Check</a>						
	</div>
</div>
					

