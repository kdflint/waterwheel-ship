function applyValidateAndSubmit() {
		
		var pass = true;
		var applyForm = document.forms["apply-form"];

    var onameField = applyForm["oname"];
    var oname = onameField.value;
    onameField.style.backgroundColor = "white";
    onameField.placeholder = "Organization name";
    if (oname == null || oname == "") {
      onameField.placeholder = "Organization name is required.";
      onameField.style.backgroundColor = "rgba(252,176,64,0.5)";
      pass = false;
    } else if (!isSafeCharacterSet(oname)) {
    	onameField.placeholder = "Not allowed: < > % * & = / \\ !";
      onameField.style.backgroundColor = "rgba(252,176,64,0.5)";
    	onameField.value = "";
    	pass = false;
    }
     
    var tnameField = applyForm["tname"];
    var tname = tnameField.value;
    tnameField.style.backgroundColor = "white";
    tnameField.placeholder = "Team name";
    if (tname == null || tname == "") {
      tnameField.placeholder = "Team name is required.";
      tnameField.style.backgroundColor = "rgba(252,176,64,0.5)";
      pass = false;
    } else if (!isSafeCharacterSet(tname)) {
    	tnameField.placeholder = "Not allowed: < > % * & = / \\ !";
      tnameField.style.backgroundColor = "rgba(252,176,64,0.5)";
    	tnameField.value = "";
    	pass = false;
    }
 
    var cnameField = applyForm["cname"];
    var cname = cnameField.value;
    cnameField.style.backgroundColor = "white";
    cnameField.placeholder = "Contact name";
    if (cname == null || cname == "") {
      cnameField.placeholder = "Contact name is required.";
      cnameField.style.backgroundColor = "rgba(252,176,64,0.5)";
      pass = false;
    } else if (!isSafeCharacterSet(cname)) {
    	cnameField.placeholder = "Not allowed: < > % * & = / \\ !";
      cnameField.style.backgroundColor = "rgba(252,176,64,0.5)";
    	cnameField.value = "";
    	pass = false;
    }
    
    var einField = applyForm["ein"];
    var ein = einField.value;
    einField.style.backgroundColor = "white";
    einField.placeholder = "EIN";
    if (ein == null || ein == "" ) {
      einField.placeholder = "EIN is required.";
      einField.style.backgroundColor = "rgba(252,176,64,0.5)";
      pass = false;
    } else if (!ein.match(/[\d]{2}-?[\d]{7}/)) {
    	einField.placeholder = "Valid EIN is required.";
      einField.style.backgroundColor = "rgba(252,176,64,0.5)";
    	einField.value = "";
    	pass = false;
    }
    
    var urlField = applyForm["url"];
    var url = urlField.value;
    urlField.style.backgroundColor = "white";
    urlField.placeholder = "Web Site";
    if (url == null || url == "") {
      urlField.placeholder = "Web Site is required.";
      urlField.style.backgroundColor = "rgba(252,176,64,0.5)";
      pass = false;
    } else if (url.match(/[<>*]+/) || url.length < 4 || !url.match(/[.]+/)) {
    	urlField.placeholder = "Valid Web Site is required.";
      urlField.style.backgroundColor = "rgba(252,176,64,0.5)";
    	urlField.value = "";
    	pass = false;
    }

    var budgetField = applyForm["budget"];
    var budget = budgetField.value;
    budgetField.style.backgroundColor = "white";
    if (budget == null || budget == "" || budget == "0") {
      budgetField.style.backgroundColor = "rgba(252,176,64,0.5)";
      pass = false;
    }
    
    var email_1Field = applyForm["email_1"];
    var email_1 = email_1Field.value;
    email_1Field.style.backgroundColor = "white";
    email_1Field.placeholder = "Email";
    if (email_1 == null || email_1 == "") {
      email_1Field.placeholder = "Valid email is required.";
      email_1Field.style.backgroundColor = "rgba(252,176,64,0.5)";
      pass = false;
    } else if (!isValidEmail(email_1)) {
      email_1Field.placeholder = "Valid email is required.";
      email_1Field.style.backgroundColor = "rgba(252,176,64,0.5)";
      email_1Field.value = "";
    	pass = false;
    } else if (email_1.length > 100) {
    	alert("max length exceeded");
      email_1Field.placeholder = "Email max length is 100";
      email_1Field.style.backgroundColor = "rgba(252,176,64,0.5)";
      email_1Field.value = "";
      pass = false;
    }
       
    var email_2Field = applyForm["email_2"];
    var email_2 = email_2Field.value;
    email_2Field.style.backgroundColor = "white";
    email_2Field.placeholder = "Confirm Email";
    if (email_2 == null || email_2 == "") {
      email_2Field.placeholder = "Valid email is required.";
      email_2Field.style.backgroundColor = "rgba(252,176,64,0.5)";
      pass = false;
    } else if (!isValidEmail(email_2)) {
      email_2Field.placeholder = "Valid email is required.";
      email_2Field.style.backgroundColor = "rgba(252,176,64,0.5)";
      email_2Field.value = "";
    	pass = false;
    } else if (email_2.length > 100) {
      email_2Field.placeholder = "Email max length is 100";
      email_2Field.style.backgroundColor = "rgba(252,176,64,0.5)";
      email_2Field.value = "";
      pass = false;
    } else if (!(email_1 == null || email_1 == "") && email_1 != email_2) {
      email_2Field.placeholder = "Email does not match.";
      email_2Field.style.backgroundColor = "rgba(252,176,64,0.5)";
      email_2Field.value = "";
    	pass = false;
    }  
    
    var otherServiceField = applyForm["otherService"];
    var oService = otherServiceField.value;
    otherServiceField.style.backgroundColor = "white";
    otherServiceField.placeholder = "Please specify";
    if (oService == null || oService == "") {
  		// valid condition
  	} else if (!isSafeCharacterSet(oService)) {
    	otherServiceField.placeholder = "Not allowed: < > % * & = / \\ !";
      otherServiceField.style.backgroundColor = "rgba(252,176,64,0.5)";
    	otherServiceField.value = "";
    	pass = false;
    }
    
    var reachField = applyForm["reach"];
    var reach = reachField.value;
    reachField.style.backgroundColor = "white";
    reachField.placeholder = "Population and geography";
    if (reach == null || reach == "") {
      reachField.placeholder = "Population and geography is required.";
      reachField.style.backgroundColor = "rgba(252,176,64,0.5)";
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
      missionField.style.backgroundColor = "rgba(252,176,64,0.5)";
      pass = false;
  	} else { 
  		missionField.value = mission.replace(/[<>%*&=/\\!]/g, '');
    }
    
 		if (Boolean(pass)) {
 			applyForm.submit();
 		}   
}
