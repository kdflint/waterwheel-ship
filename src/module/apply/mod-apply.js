function showInfoWebinarField() {
	document.getElementById("info-webinar").style.display='block';
	document.getElementById("fade").style.display='block';
	document.getElementById("partner_perspective_embed").style.visibility='hidden';
}

function hideInfoWebinarField() {
	document.getElementById("info-webinar").style.display='none';
	document.getElementById("fade").style.display='none';	
	document.getElementById("partner_perspective_embed").style.visibility='visible';
}

function hideSpecialOffer() {
	document.getElementById("special-offer").style.display='none';
	document.getElementById("fade").style.display='none';	
	document.getElementById("partner_perspective_embed").style.visibility='visible';	
}

function showInfoEmailField() {
	document.getElementById("info-email").style.display='block';
	document.getElementById("fade").style.display='block';
	document.getElementById("partner_perspective_embed").style.visibility='hidden';
}

function showSpecialOfferField() {
	document.getElementById("special-offer").style.display='block';
	document.getElementById("fade").style.display='block';
	document.getElementById("partner_perspective_embed").style.visibility='hidden';	
	document.getElementById("special-offer-link").innerHTML = 'Special Offer';

}

function hideInfoEmailField() {
	document.getElementById("info-email").style.display='none';
	document.getElementById("fade").style.display='none';
	document.getElementById("partner_perspective_embed").style.visibility='visible';
	var input = document.getElementById("info-email-input");
	var control = document.getElementById("info-email-button");
	input.innerHTML = "<input id='info-email-input' type='email' name='email_1' placeholder='Recipient Email' maxlength='100' style='width:320px;margin-top:10px;' required >";
	control.innerHTML = "<span class='fa fa-play' style='margin-right:4px;' ></span>Send";
  control.onclick = function() {infoEmailValidateAndSubmit();};
}

function showInfoSuccessMessage(email_address) {
	var input = document.getElementById("info-email-input");
	var control = document.getElementById("info-email-button");
  input.innerHTML = "<span style='width:320px;position:absolute;margin-left:5px;margin-top:5px;'>Got it! Your information packet will be delivered in a few minutes to " + email_address + "</span>";
  control.innerHTML = "<span class='fa fa-close' style='margin-right:4px;' ></span>Close";
  control.onclick = function() {hideInfoEmailField();};
}

function infoEmailValidateAndSubmit() {
	
		pass = true;
		var applyForm = document.forms["info-email-form"];
		var submitButton = document.getElementById("info-email-button");
		var errorBackground = "rgba(252,176,64,0.5) url('') no-repeat right top";

    var email_1Field = applyForm["email_1"];
    var email_1 = email_1Field.value;
    email_1Field.style.backgroundColor = "white";
    email_1Field.placeholder = "Recipient Email";
    if (email_1 == null || email_1 == "") {
      email_1Field.placeholder = "Valid email is required.";
      email_1Field.style.background = errorBackground;
      pass = false;
    } else if (!isValidEmail(email_1)) {
      email_1Field.placeholder = "Valid email is required.";
      email_1Field.style.background = errorBackground;
      email_1Field.value = "";
   	 	pass = false;
    } else if (email_1.length > 100) {
      email_1Field.placeholder = "Email max length is 100";
      email_1Field.style.background = errorBackground;
      email_1Field.value = "";
      pass = false;
    }
           
 		if (Boolean(pass)) {
 			var xhr = new XMLHttpRequest();
 			var processor = "../apply/mod-info-processor.php";
			xhr.onreadystatechange = function() {
  			if (xhr.readyState > 1 && xhr.status == 200) {
					showInfoSuccessMessage(email_1);
  			} else {
  			}
  		} 
    	xhr.open('POST', processor);
    	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    	xhr.send("email_1=" + email_1);			
 		}  
}

function applyValidateAndSubmit(thisForm) {
		
 		var applyLink = document.getElementById("apply-link");
 		var applyDisabled = document.getElementById("apply-disabled")
 		//applyLink.style.display = "none";
		//applyDisabled.style.display = "block";

		var pass = true;
		var eligibleDecision = [];
		var eligibleMessage = [];
		var applyForm = document.forms[thisForm];
		var submitButton = document.getElementById("applySubmitButton");
		var errorBackground = "rgba(252,176,64,0.5) url('') no-repeat right top";
		document.getElementById("service-area-area").style.background = "white";
		document.getElementById("structure-area").style.background = "white";
		var areaLit = false;
		
    var budgetField = applyForm["budget-team"];
    var budget = budgetField.value;
    budgetField.style.backgroundColor = "white";
    if (budget == null || budget == "" || budget == "0") {
      budgetField.style.background = errorBackground;
      pass = false;
    }
          
    var countryField = applyForm["country"];
    var country = countryField.value;
    countryField.style.backgroundColor = "white";
    if (country == null || country == "" || country == "0") {
      countryField.style.background = errorBackground;
      pass = false;
    }
		
    var structureBoxes = applyForm["structure[]"];
    checkedCount = 0;
    for (var i=0, length = structureBoxes.length; i<length; i++) {
    	if (structureBoxes[i].checked == true) {
        checkedCount++;
     	}
		}
		if (checkedCount == 0) {
			if (!Boolean(areaLit)) {
				eligibleMessage[0] = "To be eligible, your group must have some type of structure.";
				eligibleDecision[0] = "Your group is not eligible for benefits with Northbridge.";
				document.getElementById("structure-area").style.background = errorBackground;
				areaLit = true;
			}
		} else if (checkedCount == 1) {
			if (structureBoxes[0].checked == true && budget >= 2) {
				eligibleMessage[0] = "For your community organized work to be eligible, you must have a budget of < $10,001 USD. (Please consider some type of nonprofit incorporation structure if your budget exceeds this amount.)";
				eligibleDecision[0] = "You are not eligible for membership with Northbridge.";
				if (!Boolean(areaLit)) {
					document.getElementById("structure-area").style.background = errorBackground;
					areaLit = true;
				}
			}
  	}

    var serviceBoxes = applyForm["services[]"];
    var checkedCount = 0;
    for (var i=0, length = serviceBoxes.length; i<length; i++) {
    	if (serviceBoxes[i].checked == true) {
        checkedCount++;
     	}
		}
		if (checkedCount == 0) {
			eligibleMessage[0] = "To be eligible for benefits or grants, you must be working in one of our impact areas.";
			eligibleDecision[0] = "Your group is not eligible for benefits with Northbridge.";
			document.getElementById("service-area-area").style.background = errorBackground;
			areaLit = true;
		} else if (checkedCount >= 1 && !(
			serviceBoxes[0].checked == true ||
			serviceBoxes[1].checked == true ||
			serviceBoxes[2].checked == true ||
			serviceBoxes[3].checked == true ||
			serviceBoxes[4].checked == true ||
			serviceBoxes[5].checked == true ||
			serviceBoxes[7].checked == true ||
			serviceBoxes[8].checked == true ||
			serviceBoxes[9].checked == true
			)) {
			eligibleMessage[1] = "Depending on more details of your impact area, you may be eligible for benefits or grants. Our application process will collect that information.";
			eligibleDecision[1] = "Your group may be eligible for benefits with Northbridge.";
  	}
  			    	
		eligibleMessage[2] = "";
		eligibleDecision[2] = '<span style="font-size:150%">Good stuff!</span><p style="margin-top:10px;">You are eligible for some level of grants or benefits with Northbridge.</p><p style="margin-top:10px;">Click the blue button to see what applications are open now.</p>';
		var decisionIndex = 2;
		
		if (eligibleDecision[0]) {
			decisionIndex = 0;
		} else if (eligibleDecision[1]) {
			decisionIndex = 1;
		} else {
			decisionIndex = 2;
		}
      
 		if (Boolean(pass)) {
 			// This indicates we passed form validation, not passed eligibility check
 			document.getElementById('user-message4').innerHTML = eligibleDecision[decisionIndex];
 			document.getElementById('user-message2').innerHTML = eligibleMessage[decisionIndex];
 			if (decisionIndex > 0) {
 				applyLink.style.display = "block";
				applyDisabled.style.display = "none";
 			} else {
 				applyLink.style.display = "block";
				applyDisabled.style.display = "none";
 			}
 		} else {
 			document.getElementById('user-message4').innerHTML = "If you fill out this form completely, we can check eligibility for your team, committee, work group, Board or task force.";
 			document.getElementById('user-message2').innerHTML = "";
			document.getElementById("service-area-area").style.background = "white";
			document.getElementById("structure-area").style.background = "white";
			//document.getElementById("apply-link").style.display = "none";
 		}
 	
}

