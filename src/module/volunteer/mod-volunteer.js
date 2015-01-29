function volunteerValidateAndSubmit() {
		var pass = true;

    var fnameField = document.forms["volunteer-form"]["fname"];
    var fname = fnameField.value;
    if (fname == null || fname == "") {
    	alert("here1");
      fnameField.placeholder = "First name is required.";
      pass = false;
    } else if (!isSafeCharacterSet(fname)) {
    	alert("here2");
    	fnameField.placeholder = "Not allowed: % * < >";
    	fnameField.value = "";
    	pass = false;
    }
    
    // when done, this will submit form
    alert(Boolean(pass));
    
    /*
    
    var lname = document.forms["volunteerForm"]["lname"].value;
    if (lname != null && lname != "") {
    	if (!isSafeCharacterSet(lname)) {
	      pass = false;
    	}
    	if (lname.length > 25) {
    		pass = false;
    	}
    }

    var email_1 = document.forms["volunteerForm"]["email_1"].value;
    if (email_1 == null || email_1 == "") {
      pass = false;
    }
    if (!isValidEmail(email_1)) {
    	pass = false;
    }
    if (email_1.length > 100)) {
      pass = false;
    }

    var email_2 = document.forms["volunteerForm"]["email_2"].value;
    if (email_2 == null || email_2 == "") {
      pass = false;
    }
    if (email_1 != email_2) {
    	pass = false;
    }
    if (email_2.length > 100)) {
      pass = false;
    }    
    
    if (Boolean(pass)) {
    	submit;
    }
    */
}
