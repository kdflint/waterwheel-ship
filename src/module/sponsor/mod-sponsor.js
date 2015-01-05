function getCurrentLevelIndex() {
	var radio = document.forms['sponsorForm'].levels;
	for (var i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			return i;
		}
	}
}

function copyLevelValue() {
	var radio = document.forms['sponsorForm'].levels;
	var display = document.getElementById("levelAmountDisplay");
	var index = getCurrentLevelIndex();
	display.innerHTML = radio[index].value;
	displayFeatures(radio[index].value);
}

function copyDesignateValue() {
	var boxes = document.forms['sponsorForm'].designation;
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
	var index = document.forms['sponsorForm'].cause.selectedIndex;
	var display = document.getElementById("designateNameDisplay");
	display.innerHTML = document.forms['sponsorForm'].cause.options[index].value;
}

function toggleSponsorDisplay() {
	var customDisplay = document.getElementById("sponsorCheckedDisplay");
	var optOutDisplay = document.getElementById("sponsorOptOutDisplay");		
	if (document.forms['sponsorForm'].showSponsorship.checked) {
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
	if (!document.forms['sponsorForm'].showImpact.checked) {
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
	var designateNameDisplay = document.getElementById("designateNameDisplay");
	var sponsorCheckedDisplay = document.getElementById("sponsorCheckedDisplay");
	var sponsorOptOutDisplay = document.getElementById("sponsorOptOutDisplay");
	var impactCheckedDisplay = document.getElementById("impactCheckedDisplay");
	var impactOptOutDisplay = document.getElementById("impactOptOutDisplay");
	
	switch(level) {
    	case "25":
					showSponsorship.disabled = true;
					sponsorName.disabled = true;
					showImpact.disabled = true;
					impactEmail.disabled = true;
					orgButton.className = "pure-button mod-sponsor-button pure-button-disabled";
					listButton.className = "pure-button mod-sponsor-button pure-button-disabled";
					causeButton.className = "pure-button mod-sponsor-button pure-button-disabled";
					levelAmountDisplay.innerHTML = "25";
					levelTimeDisplay.innerHTML = "6 months";
					levelServiceDisplay.innerHTML = "basic";
					designateNameDisplay.innerHTML = "an eligible 501(c)(3) organization";
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
					levelAmountDisplay.innerHTML= "50"
					levelTimeDisplay.innerHTML = "1 year";
					levelServiceDisplay.innerHTML = "basic";
					designateNameDisplay.innerHTML = "your designated 501(c)(3) organization";
					sponsorCheckedDisplay.style.display = 'none';
					sponsorOptOutDisplay.style.display = 'none';
					impactCheckedDisplay.style.display = 'none';
					impactOptOutDisplay.style.display = 'none';
					reduceDesignateList();
					toggleSearchCategory('waitingList');
        	break;
      case "100":
					showSponsorship.disabled = false;
					sponsorName.disabled = false;
					showImpact.disabled = true;
					impactEmail.disabled = true;
					orgButton.className = "pure-button mod-sponsor-button";
					listButton.className = "pure-button mod-sponsor-button";
					causeButton.className = "pure-button mod-sponsor-button pure-button-disabled";
					levelAmountDisplay.innerHTML = "100"
					levelTimeDisplay.innerHTML = "1 year";
					levelServiceDisplay.innerHTML = "advanced";
					designateNameDisplay.innerHTML = "your designated 501(c)(3) organization";
					toggleSponsorDisplay();
					impactCheckedDisplay.style.display = 'none';
					impactOptOutDisplay.style.display = 'none';
					reduceDesignateList();
					toggleSearchCategory('waitingList');
        	break;
      case "250":
					showSponsorship.disabled = false;
					sponsorName.disabled = false;
					showImpact.disabled = false;
					impactEmail.disabled = false;
					orgButton.className = "pure-button mod-sponsor-button";
					listButton.className = "pure-button mod-sponsor-button";
					causeButton.className = "pure-button mod-sponsor-button";
					levelAmountDisplay.innerHTML = "250"
					levelTimeDisplay.innerHTML = "1 year";
					levelServiceDisplay.innerHTML = "advanced";
					designateNameDisplay.innerHTML = "your designated 501(c)(3) organizations";
					toggleSponsorDisplay();
					toggleImpactDisplay();
					reduceDesignateList();
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
	thisItem.style.border = '1px solid orange';
}

function designateOrg(elementId) {
	var index = getCurrentLevelIndex();
	var boxes = document.forms['sponsorForm'].designation;
	var counter = 0;
	switch(document.forms['sponsorForm'].levels[index].value) {
		case "250":
			// at this level, up to three boxes are allowed to be selected at one time
			for(var i = 0; i < boxes.length; i++) {
				if (boxes[i].checked) {counter++;}
			}
			// disable/enable other boxes depending on how many checks are allowed for this level
			if (counter < 3) {
				for(var i = 0; i < boxes.length; i++) {
					boxes[i].disabled = false;
				}				
			}
			if (counter >= 3) {
				for(var i = 0; i < boxes.length; i++) {
					if (!boxes[i].checked) {boxes[i].disabled = true;}
				}
			}	
			copyDesignateValue();				
			break;
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
	var boxes = document.forms['sponsorForm'].designation;
	var index = getCurrentLevelIndex();
	if (document.forms['sponsorForm'].levels[index].value == '25') {
		for(var i = 0; i < boxes.length; i++) {
			boxes[i].disabled = true;
		}
	}	else {
		for(var i = 0; i < boxes.length; i++) {	
			boxes[i].disabled = false;
			if (boxes[i].checked) {
				designateOrg(i + 1);
				break;
			}
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