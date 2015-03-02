function getCurrentLevelIndex() {
	var radio = document.forms['sponsor-form'].levels;
	for (var i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			return i;
		}
	}
}

function getCurrentLevelAmount() {
	var index = getCurrentLevelIndex();	
	var otherLevel = document.getElementById("sponsorLevelOptionOther").value;
	if (index < 4) {
		return document.forms['sponsor-form'].levels[index].value;
	} else if (index == 4) {
   	var otherLevel = document.getElementById("sponsorLevelOptionOther").value;
   	if (otherLevel.length < 1 || parseInt(otherLevel) < 1) {
			return "undefined";
  	} else if (parseInt(otherLevel) < 25) {
  		return "0";
		} else if (parseInt(otherLevel) < 50) {
			return "25";
		} else if (parseInt(otherLevel) < 100) {
			return "50";
		} else if (parseInt(otherLevel) < 250) {
			return "100";
		} else if (parseInt(otherLevel) < 500) {
			return "250";
		} else {
			return "500";
		}
	}		
	
}

function copyLevelValue() {
	document.getElementById("sponsorLevelOptionOther").value = "";
	var radio = document.forms['sponsor-form'].levels;
	var index = getCurrentLevelIndex();
	displayFeatures(radio[index].value);
}

function copyOtherLevelValue() {
	displayFeatures("other");
}

function copyDesignateValue() {
	var boxes = document.forms['sponsor-form'].designation;
	var display = document.getElementById("designateNameDisplay");
	var catDisplay = "";
	var counter = 0;
	for (var i = 0; i < boxes.length; i++) {
		if (boxes[i].checked) {
			catDisplay = catDisplay + boxes[i].value + ", ";
			counter++;
		}
	}
	if (counter > 0) {
		display.innerHTML = catDisplay.replace(/(, $)/g, "") // remove trailing comma
	} else {
		display.innerHTML = "your designated 501(c)(3) organization";
	}
}

function copyCauseValue() {
	var index = document.forms['sponsor-form'].cause.selectedIndex;
	var display = document.getElementById("designateNameDisplay");
	display.innerHTML = document.forms['sponsor-form'].cause.options[index].value;
}

function toggleSponsorDisplay() {
	var customDisplay = document.getElementById("sponsorCheckedDisplay");
	var optOutDisplay = document.getElementById("sponsorOptOutDisplay");		
	if (document.forms['sponsor-form'].showSponsorship.checked) {
		customDisplay.style.display = 'block';
		optOutDisplay.style.display = 'none';
	} else {
		customDisplay.style.display = 'none';
		optOutDisplay.style.display = 'block';
	}
}

function toggleImpactDisplay() {
	var customDisplay = document.getElementById("impactCheckedDisplay");
	var optOutDisplay = document.getElementById("impactOptOutDisplay");		
	if (!document.forms['sponsor-form'].showImpact.checked) {
		customDisplay.style.display = 'block';
		optOutDisplay.style.display = 'none';
	} else {
		customDisplay.style.display = 'none';
		optOutDisplay.style.display = 'block';
	}
}

function toggleSearchCategory(listId, callingButton) {
	var categories = document.getElementsByClassName("mod-sponsor-designate");
	if((callingButton === undefined) || (callingButton.className.indexOf("disabled") == -1)) {
		for(var i = 0; i < categories.length; i++) {
			if (categories[i].id == listId) {
				categories[i].style.display = 'block';
			} else {
			categories[i].style.display = 'none';
			}
		}	
	}
}

function displayFeatures(level) {
	
	var showSponsorship = document.getElementById("showSponsorship");
	var sponsorName = document.getElementById("sponsorName");
	var showImpact = document.getElementById("showImpact");
	var impactEmail = document.getElementById("impactEmail");
	var causeButton = document.getElementById("causeButton");
	var levelAmountDisplay = document.getElementById("levelAmountDisplay");
	var levelServiceDisplay = document.getElementById("levelServiceDisplay");
	var designateSlides = document.getElementsByClassName("mod-sponsor-slider");
	var designateNameDisplay = document.getElementById("designateNameDisplay");
	var designateMessageDisplay = document.getElementById("designateMessageDisplay");
	var sponsorCheckedDisplay = document.getElementById("sponsorCheckedDisplay");
	var sponsorOptOutDisplay = document.getElementById("sponsorOptOutDisplay");
	var impactCheckedDisplay = document.getElementById("impactCheckedDisplay");
	var impactOptOutDisplay = document.getElementById("impactOptOutDisplay");
	var otherAmount = document.getElementById("sponsorLevelOptionOther");
	
	otherAmount.style.background = "rgba(255,255,255,1) url('') no-repeat right top";
	
	switch(level) {
    	case "0":
					showSponsorship.disabled = true;
					sponsorName.disabled = true;
					showImpact.disabled = true;
					impactEmail.disabled = true;
					orgButton.className = "pure-button mod-sponsor-button pure-button-disabled";
					listButton.className = "pure-button mod-sponsor-button pure-button-disabled";
					causeButton.className = "pure-button mod-sponsor-button pure-button-disabled";
					levelAmountDisplay.innerHTML = "";
					levelTimeDisplay.innerHTML = "valuable";
					levelServiceDisplay.innerHTML = "";
					showSlide('0');
					designateSlides[0].style.border = "0px solid #004d62";
					toggleHeaders("disable");
					designateNameDisplay.innerHTML = "a Northbridge partner organization";
					designateMessageDisplay.innerHTML = "Northbridge will be happy to designate your gift to one of our eligible partners.";
					sponsorCheckedDisplay.style.display = 'none';
					sponsorOptOutDisplay.style.display = 'none';
					impactCheckedDisplay.style.display = 'none';
					impactOptOutDisplay.style.display = 'none';
					reduceDesignateList();
					toggleSearchCategory('waitingList');
        	break;
    	case "25":
					showSponsorship.disabled = true;
					sponsorName.disabled = true;
					showImpact.disabled = true;
					impactEmail.disabled = true;
					orgButton.className = "pure-button mod-sponsor-button pure-button-disabled";
					listButton.className = "pure-button mod-sponsor-button pure-button-disabled";
					causeButton.className = "pure-button mod-sponsor-button pure-button-disabled";
					levelAmountDisplay.innerHTML = "of $25";
					levelTimeDisplay.innerHTML = "6 months";
					levelServiceDisplay.innerHTML = "of basic";
					showSlide('0');
					designateSlides[0].style.border = "0px solid #004d62";
					toggleHeaders("disable");
					designateNameDisplay.innerHTML = "a Northbridge partner organization";
					designateMessageDisplay.innerHTML = "Northbridge will be happy to designate your gift to one of our eligible partners.";
					sponsorCheckedDisplay.style.display = 'none';
					sponsorOptOutDisplay.style.display = 'none';
					impactCheckedDisplay.style.display = 'none';
					impactOptOutDisplay.style.display = 'none';
					reduceDesignateList();
					toggleSearchCategory('waitingList');
        	break;
    	case "50":    	
 					showSponsorship.disabled = true;
					sponsorName.disabled = true;
					showImpact.disabled = true;
					impactEmail.disabled = true;
					orgButton.className = "pure-button mod-sponsor-button";
					listButton.className = "pure-button mod-sponsor-button";
					causeButton.className = "pure-button mod-sponsor-button pure-button-disabled";
					levelAmountDisplay.innerHTML= "of $50";
					levelTimeDisplay.innerHTML = "1 year";
					levelServiceDisplay.innerHTML = "of basic";
					designateSlides[0].style.border = "1px solid #004d62";
					toggleHeaders("enable");
					designateNameDisplay.innerHTML = "your designated Northbridge partner organization";
					designateMessageDisplay.innerHTML = "If you wish, you may designate your gift to one eligible Northbridge partner.";
					sponsorCheckedDisplay.style.display = 'none';
					sponsorOptOutDisplay.style.display = 'none';
					impactCheckedDisplay.style.display = 'none';
					impactOptOutDisplay.style.display = 'none';
					reduceDesignateList();
					toggleSearchCategory('waitingList');
        	break;
      case "100":
					showSponsorship.disabled = true;
					sponsorName.disabled = true;
					showImpact.disabled = true;
					impactEmail.disabled = true;
					orgButton.className = "pure-button mod-sponsor-button";
					listButton.className = "pure-button mod-sponsor-button";
					causeButton.className = "pure-button mod-sponsor-button pure-button-disabled";
					levelAmountDisplay.innerHTML = "of $100";
					levelTimeDisplay.innerHTML = "1 year";
					levelServiceDisplay.innerHTML = "of advanced";
					designateSlides[0].style.border = "1px solid #004d62";
					toggleHeaders("enable");
					designateNameDisplay.innerHTML = "your designated Northbridge partner organization";
					designateMessageDisplay.innerHTML = "If you wish, you may designate your gift to one eligible Northbridge partner.";
					sponsorCheckedDisplay.style.display = 'none';
					sponsorOptOutDisplay.style.display = 'none';
					impactCheckedDisplay.style.display = 'none';
					impactOptOutDisplay.style.display = 'none';
					reduceDesignateList();
					toggleSearchCategory('waitingList');
        	break;
      case "250":
					showSponsorship.disabled = false;
					sponsorName.disabled = false;
					showImpact.disabled = true;
					impactEmail.disabled = true;
					orgButton.className = "pure-button mod-sponsor-button";
					listButton.className = "pure-button mod-sponsor-button";
					causeButton.className = "pure-button mod-sponsor-button";
					levelAmountDisplay.innerHTML = "of $250";
					levelTimeDisplay.innerHTML = "1 year";
					levelServiceDisplay.innerHTML = "of advanced";
					toggleHeaders("enable");
					designateSlides[0].style.border = "1px solid #004d62";
					designateNameDisplay.innerHTML = "your designated Northbridge partner organizations";
					designateMessageDisplay.innerHTML = "If you wish, you may designate your gift to two eligible Northbridge partners.";
					toggleSponsorDisplay();
					impactCheckedDisplay.style.display = 'none';
					impactOptOutDisplay.style.display = 'none';
					reduceDesignateList();
        	break;
       case "500":
					showSponsorship.disabled = false;
					sponsorName.disabled = false;
					showImpact.disabled = false;
					impactEmail.disabled = false;
					orgButton.className = "pure-button mod-sponsor-button";
					listButton.className = "pure-button mod-sponsor-button";
					causeButton.className = "pure-button mod-sponsor-button";
					levelAmountDisplay.innerHTML = "of $500";
					levelTimeDisplay.innerHTML = "1 year";
					levelServiceDisplay.innerHTML = "of advanced";
					toggleHeaders("enable");
					designateSlides[0].style.border = "1px solid #004d62";
					designateNameDisplay.innerHTML = "your designated Northbridge partner organizations";
					designateMessageDisplay.innerHTML = "If you wish, you may designate your gift to three eligible Northbridge partners.";
					toggleSponsorDisplay();
					toggleImpactDisplay();
					reduceDesignateList();
        	break;
      case "other":
      		otherCommentsSelectCheckbox("sponsorLevelOption5");
      		var otherLevel = getCurrentLevelAmount();
      		if (otherLevel == "undefined") {
						displayFeatures("0");
						otherAmount.style.background = "rgba(252,176,64,0.5) url('') no-repeat right top";
      			break;
      		} else { 
      			displayFeatures(otherLevel);
					}
					levelAmountDisplay.innerHTML = "of $" + document.getElementById("sponsorLevelOptionOther").value;
					break;
    	default:
	} 
}

function showSlide(elementId) {
	var slides = document.getElementsByClassName("slide");
	var items = document.getElementsByClassName("header");
	var thisSlide = document.getElementById("slide" + elementId);
	var thisItem = document.getElementById("header" + elementId);
	for(var i = 0; i < slides.length; i++) {
		slides[i].style.opacity = '0';
	}
	for(var i = 0; i < items.length; i++) {
		items[i].style.border = '0px';
		items[i].style.borderTop = '1px solid #ccc';
	}
	thisSlide.style.opacity = '1';
	thisItem.style.border = '2px solid #fcb040';
}

function designateOrg(elementId) {
	var boxes = document.forms['sponsor-form'].designation;
	var counter = 0;
	switch(getCurrentLevelAmount()) {
		case "250":
			// at this level, up to two boxes are allowed to be selected at one time
			for(var i = 0; i < boxes.length; i++) {
				if (boxes[i].checked) {counter++;}
			}
			// disable/enable other boxes depending on how many checks are allowed for this level
			if (counter < 2) {
				for(var i = 0; i < boxes.length; i++) {
					boxes[i].disabled = false;
				}				
			}
			if (counter >= 2) {
				for(var i = 0; i < boxes.length; i++) {
					if (!boxes[i].checked) {boxes[i].disabled = true;}
				}
			}	
			copyDesignateValue();				
			break;
		case "500":
			
		default:
			// at this level, only one box is allowed to be selected at one time
			var box = document.getElementById("check" + elementId);
			var state = box.checked;

			for(var i = 0; i < boxes.length; i++) {
				boxes[i].checked = false;
				boxes[i].disabled = false;
			}
			box.checked = state;
			box.disabled = false;			
			copyDesignateValue();
			break;
	}
}

function reduceDesignateList() {
	var boxes = document.forms['sponsor-form'].designation;
	var disableBoxes = false;
	var curAmount = getCurrentLevelAmount();
	if (curAmount == "0") { disableBoxes = true; }
	if (curAmount == "25") { disableBoxes = true; }
	if (curAmount == "undefined") { disableBoxes = true; }
	if (disableBoxes) {
		for(var i = 0; i < boxes.length; i++) {
			boxes[i].disabled = true;
		}
	}	else {
		for(var i = 0; i < boxes.length; i++) {	
			boxes[i].disabled = false;
			if (boxes[i].checked) {
				designateOrg(i + "L");
			}
		}	
	}
}

function toggleHeaders(state) {
	var designateHeaders = document.getElementsByClassName("header");
	if (state == "disable") {
		for (var i = 0; i < designateHeaders.length; i++) {
			designateHeaders[i].className = "header unavailable";
		}
	} else {
		for (var i = 0; i < designateHeaders.length; i++) {
			designateHeaders[i].className = "header";
		}
	}		
}

function loadSearchResults() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
  	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {   
    	var xmlDoc = xmlhttp.responseXML;
			var display = "";
			var x = xmlDoc.getElementsByTagName("Name");
			for (var i = 0;i < x.length;i++) {
				var newId = i + 1;
				var newLine = "<div class=\"header\"><a href=\"#\" onclick=\"\">" + x[i].childNodes[0].nodeValue + "</a><input id=\"check" + newId + "S\" type=\"checkbox\" name=\"designation\" value=\"" + x[i].childNodes[0].nodeValue + "\" style=\"float:right;\" onchange=\"designateOrg('" + newId + "S');\" /></div>";
	  		display = display + newLine;
  		}
			document.getElementById("orgSearchResults").innerHTML = display;
  	}
  }
	xmlhttp.open("GET","cd_catalog.xml",true);
	xmlhttp.send();
}