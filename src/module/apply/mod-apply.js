function showInfoWebinarField() {
	document.getElementById("info-webinar").style.display='block';
	document.getElementById("fade").style.display='block';
}

function hideInfoWebinarField() {
	document.getElementById("info-webinar").style.display='none';
	document.getElementById("fade").style.display='none';	
}

function showInfoEmailField() {
	document.getElementById("info-email").style.display='block';
	document.getElementById("fade").style.display='block';
}

function hideInfoEmailField() {
	document.getElementById("info-email").style.display='none';
	document.getElementById("fade").style.display='none';
	var input = document.getElementById("info-email-input");
	var control = document.getElementById("info-email-button");
	input.innerHTML = "<input id='info-email-input' type='email' name='email_1' placeholder='Recipient Email' maxlength='100' style='width:320px;margin-top:10px;' required >";
	control.innerHTML = "<span class='fa fa-play' style='margin-right:4px;' ></span>Send";
  control.onclick = function() {infoEmailValidateAndSubmit();};
}

function showInfoSuccessMessage(email_address) {
	var input = document.getElementById("info-email-input");
	var control = document.getElementById("info-email-button");
  input.innerHTML = "<span style='width:320px;position:absolute;margin-left:5px;margin-top:5px;'>Got it! Your information packet will be delivered in a few minutes to " + email_address + ".</span>";
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

function applyValidateAndSubmit() {
		
		var pass = true;
		var applyForm = document.forms["apply-form"];
		var submitButton = document.getElementById("applySubmitButton");
		var errorBackground = "rgba(252,176,64,0.5) url('') no-repeat right top";

    var onameField = applyForm["oname"];
    var oname = onameField.value;
    onameField.style.backgroundColor = "white";
    onameField.placeholder = "Organization name";
    if (oname == null || oname == "") {
      onameField.placeholder = "Organization name is required.";
      onameField.style.background = errorBackground;
      pass = false;
    } else if (!isSafeCharacterSet(oname)) {
    	onameField.placeholder = "Not allowed: < > % * & = / \\ !";
      onameField.style.background = errorBackground;
    	onameField.value = "";
    	pass = false;
    }
     
    var tnameField = applyForm["tname"];
    var tname = tnameField.value;
    tnameField.style.backgroundColor = "white";
    tnameField.placeholder = "Team name";
    if (tname == null || tname == "") {
      pass = true;
    } else if (!isSafeCharacterSet(tname)) {
    	tnameField.placeholder = "Not allowed: < > % * & = / \\ !";
      tnameField.style.background = errorBackground;
    	tnameField.value = "";
    	pass = false;
    }
 
    var cnameField = applyForm["cname"];
    var cname = cnameField.value;
    cnameField.style.backgroundColor = "white";
    cnameField.placeholder = "Contact name";
    if (cname == null || cname == "") {
      cnameField.placeholder = "Contact name is required.";
      cnameField.style.background = errorBackground;
      pass = false;
    } else if (!isSafeCharacterSet(cname)) {
    	cnameField.placeholder = "Not allowed: < > % * & = / \\ !";
      cnameField.style.background = errorBackground;
    	cnameField.value = "";
    	pass = false;
    }
    
    var einField = applyForm["ein"];
    var ein = einField.value;
    einField.style.backgroundColor = "white";
    einField.placeholder = "EIN";
    if (ein == null || ein == "" ) {
      pass = true;
    } else if (!ein.match(/[\d]{2}-?[\d]{7}/)) {
    	einField.placeholder = "Valid EIN is required (or none).";
      einField.style.background = errorBackground;
    	einField.value = "";
    	pass = false;
    }
    
    var urlField = applyForm["url"];
    var url = urlField.value;
    urlField.style.backgroundColor = "white";
    urlField.placeholder = "Web Site";
    if (url == null || url == "") {
      pass = true;
    } else if (url.match(/[<>*]+/) || url.length < 4 || !url.match(/[.]+/)) {
    	urlField.placeholder = "Valid Web Site is required.";
      urlField.style.background = errorBackground;
    	urlField.value = "";
    	pass = false;
    }

    var budgetField = applyForm["budget"];
    var budget = budgetField.value;
    budgetField.style.backgroundColor = "white";
    if (budget == null || budget == "" || budget == "0") {
      budgetField.style.background = errorBackground;
      pass = false;
    }
    
    var email_1Field = applyForm["email_1"];
    var email_1 = email_1Field.value;
    email_1Field.style.backgroundColor = "white";
    email_1Field.placeholder = "Email";
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
       
    var email_2Field = applyForm["email_2"];
    var email_2 = email_2Field.value;
    email_2Field.style.backgroundColor = "white";
    email_2Field.placeholder = "Confirm Email";
    if (email_2 == null || email_2 == "") {
      email_2Field.placeholder = "Valid email is required.";
      email_2Field.style.background = errorBackground;
      pass = false;
    } else if (!isValidEmail(email_2)) {
      email_2Field.placeholder = "Valid email is required.";
      email_2Field.style.background = errorBackground;
      email_2Field.value = "";
    	pass = false;
    } else if (email_2.length > 100) {
      email_2Field.placeholder = "Email max length is 100";
      email_2Field.style.background = errorBackground;
      email_2Field.value = "";
      pass = false;
    } else if (!(email_1 == null || email_1 == "") && email_1 != email_2) {
      email_2Field.placeholder = "Email does not match.";
      email_2Field.style.background = errorBackground;
      email_2Field.value = "";
    	pass = false;
    }  
       
    var otherServiceField = applyForm["otherService"];
    var serviceBoxes = applyForm["services[]"];
    var oService = otherServiceField.value;
    otherServiceField.style.backgroundColor = "white";
    otherServiceField.placeholder = "Please specify";
    var checkedCount = 0;
    for (var i=0, length = serviceBoxes.length; i<length; i++) {
    	if (serviceBoxes[i].checked == true) {
        checkedCount++;
     	}
		}
		if (checkedCount == 0) {
    	otherServiceField.placeholder = "Please select at least one";
      otherServiceField.style.background = errorBackground;
			pass = false;
		} else if (oService == null || oService == "") {
			if (serviceBoxes[8].checked == true) {
	    	otherServiceField.placeholder = "Please specify";
      	otherServiceField.style.background = errorBackground;
				pass = false;			
			} else {
				// valid condition
			}
  	} else if (!isSafeCharacterSet(oService)) {
    	otherServiceField.placeholder = "Not allowed: < > % * & = / \\ !";
      otherServiceField.style.background = errorBackground;
    	otherServiceField.value = "";
    	pass = false;
    }
    
    var reachField = applyForm["reach"];
    var reach = reachField.value;
    reachField.style.backgroundColor = "white";
    reachField.placeholder = "Population and geography";
    if (reach == null || reach == "") {
      reachField.placeholder = "Population and geography is required.";
      reachField.style.background = errorBackground;
      pass = false;
  	} else { 
  		reachField.value = reach.replace(/[<>%*&=/\\!]/g, '');
    }
    
    var missionField = applyForm["mission"];
    var mission = missionField.value;
    missionField.style.backgroundColor = "white";
    missionField.placeholder = "Specific goals or formal mission statement. 300 characters or less, please.";
    if (mission == null || mission == "") {
      missionField.placeholder = "Specific goals or formal mission statement is required.";
      missionField.style.background = errorBackground;
      pass = false;
  	} else { 
  		missionField.value = mission.replace(/[<>%*&=/\\!]/g, '');
    }
    
 		if (Boolean(pass)) {
 			submitButton.disabled = true;  
 			submitButton.innerHTML = "One Moment"; 
 			submitButton.style.opacity = ".6";
 			applyForm.submit();
 		}   
}
