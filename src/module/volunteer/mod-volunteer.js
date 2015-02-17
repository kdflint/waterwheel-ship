function volunteerValidateAndSubmit() {
			
		var pass = true;
		var volunteerForm = document.forms["volunteer-form"];
		var submitButton = document.getElementById("volunteerSubmitButton");
		var errorBackground = "rgba(252,176,64,0.5) url('') no-repeat right top";

    var fnameField = volunteerForm["fname"];
    var fname = fnameField.value;
    fnameField.style.backgroundColor = "white";
    fnameField.placeholder = "First name";
    if (fname == null || fname == "") {
      fnameField.placeholder = "First name is required.";
      fnameField.style.background = errorBackground;
      pass = false;
    } else if (!isSafeCharacterSet(fname)) {
    	fnameField.placeholder = "Not allowed: < > % * & = / \\ !";
      fnameField.style.background = errorBackground;
    	fnameField.value = "";
    	pass = false;
    }
     
    var lnameField = volunteerForm["lname"];
    var lname = lnameField.value;
    lnameField.style.backgroundColor = "white";
    lnameField.placeholder = "Last name";
    if (lname == null || lname == "") {
  		// valid condition
  	} else if (!isSafeCharacterSet(lname)) {
    	lnameField.placeholder = "Not allowed: < > % * & = / \\ !";
      lnameField.style.background = errorBackground;
    	lnameField.value = "";
    	pass = false;
    }
    
    var email_1Field = volunteerForm["email_1"];
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
    	alert("max length exceeded");
      email_1Field.placeholder = "Email max length is 100";
      email_1Field.style.background = errorBackground;
      email_1Field.value = "";
      pass = false;
    }
       
    var email_2Field = volunteerForm["email_2"];
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
    
    var otherMotiveField = volunteerForm["otherMotive"];
    var oMotive = otherMotiveField.value;
    otherMotiveField.style.backgroundColor = "white";
    otherMotiveField.placeholder = "Please specify";
    if (oMotive == null || oMotive == "") {
  		// valid condition
  	} else if (!isSafeCharacterSet(oMotive)) {
    	otherMotiveField.placeholder = "Not allowed: < > % * & = / \\ !";
      otherMotiveField.style.background = errorBackground;
    	otherMotiveField.value = "";
    	pass = false;
    }
    
    var otherSkillField = volunteerForm["otherSkill"];
    var oSkill = otherSkillField.value;
    otherSkillField.style.backgroundColor = "white";
    otherSkillField.placeholder = "Please specify";
    if (oSkill == null || oSkill == "") {
  		// valid condition
  	} else if (!isSafeCharacterSet(oSkill)) {
    	otherSkillField.placeholder = "Not allowed: < > % * & = / \\ !";
      otherSkillField.style.background = errorBackground;
    	otherSkillField.value = "";
    	pass = false;
    }

    var otherInfoField = volunteerForm["otherInfo"];
    var oInfo = otherInfoField.value;
    otherInfoField.style.backgroundColor = "white";
    if (oInfo == null || oInfo == "") {
  		// valid condition
  	} else { 
  		otherInfoField.value = oInfo.replace(/[<>%*&=/\\!]/g, '');
    }
    
 		if (Boolean(pass)) {
 			submitButton.disabled = true;  
 			submitButton.innerHTML = "One Moment"; 
 			submitButton.style.opacity = ".6";
 			volunteerForm.submit();
 		}   
}
