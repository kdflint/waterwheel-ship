function getCurrentLevelIndex() {
	var radio = document.forms['levelForm'].levels;
	for(var i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			return i;
		}
	}
}

function copyLevelValue() {
	var radio = document.forms['levelForm'].levels;
	var display=document.getElementById("levelAmountDisplay");
	var i=getCurrentLevelIndex();
	display.innerHTML=radio[i].value;
	displayFeatures(radio[i].value);
}

function toggleSponsorDisplay() {
	
	var thisOne = document.getElementById("sponsorCheckedDisplay");
			
	if (document.forms['sponsorForm'].showSponsorship.checked) {
		thisOne.style.display='block';
	} else {
		thisOne.style.display='none';
	}

}

function toggleImpactDisplay() {
	
	var thisOne = document.getElementById("impactCheckedDisplay");
			
	if (document.forms['impactForm'].showImpact.checked) {
		thisOne.style.display='block';
	} else {
		thisOne.style.display='none';
	}

}

function toggleSearchCategory(listId) {

	var categories = document.getElementsByClassName("slidorion");
	
	for(var i = 0; i < categories.length; i++) {
		if (categories[i].id == listId) {
			categories[i].style.display='block';
		} else {
			categories[i].style.display='none';
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
	var benefactorNameDisplay = document.getElementById("benefactorNameDisplay");
	var sponsorCheckedDisplay = document.getElementById("sponsorCheckedDisplay");
	var impactCheckedDisplay = document.getElementById("impactCheckedDisplay");
	
	switch(level) {
    	case "25":
					showSponsorship.disabled=true;
					sponsorName.disabled=true;
					showImpact.disabled=true;
					impactEmail.disabled=true;
					orgButton.className="pure-button mod-sponsor-button pure-button-disabled";
					listButton.className="pure-button mod-sponsor-button pure-button-disabled";
					causeButton.className="pure-button mod-sponsor-button pure-button-disabled";
					levelAmountDisplay.innerHTML="25"
					levelServiceDisplay.innerHTML="basic";
					benefactorNameDisplay.innerHTML ="an eligible 501(c)(3) organization";
					sponsorCheckedDisplay.style.display='none';
					impactCheckedDisplay.style.display='none';
					reduceDesignateList();
        	break;
    	case "50":    	
 					showSponsorship.disabled=true;
					sponsorName.disabled=true;
					showImpact.disabled=true;
					impactEmail.disabled=true;
					orgButton.className="pure-button mod-sponsor-button";
					listButton.className="pure-button mod-sponsor-button";
					causeButton.className="pure-button mod-sponsor-button pure-button-disabled";
					levelAmountDisplay.innerHTML="50"
					levelServiceDisplay.innerHTML="basic";
					benefactorNameDisplay.innerHTML ="your designated 501(c)(3) organization";
					sponsorCheckedDisplay.style.display='none';
					impactCheckedDisplay.style.display='none';
					reduceDesignateList();
        	break;
      case "100":
					showSponsorship.disabled=false;
					sponsorName.disabled=false;
					showImpact.disabled=true;
					impactEmail.disabled=true;
					orgButton.className="pure-button mod-sponsor-button";
					listButton.className="pure-button mod-sponsor-button";
					causeButton.className="pure-button mod-sponsor-button pure-button-disabled";
					levelAmountDisplay.innerHTML="100"
					levelServiceDisplay.innerHTML="advanced";
					benefactorNameDisplay.innerHTML="your designated 501(c)(3) organization";
					toggleSponsorDisplay();
					impactCheckedDisplay.style.display='none';
					reduceDesignateList();
        	break;
      case "250":
					showSponsorship.disabled=false;
					sponsorName.disabled=false;
					showImpact.disabled=false;
					impactEmail.disabled=false;
					orgButton.className="pure-button mod-sponsor-button";
					listButton.className="pure-button mod-sponsor-button";
					causeButton.className="pure-button mod-sponsor-button";
					levelAmountDisplay.innerHTML="250"
					levelServiceDisplay.innerHTML="advanced";
					benefactorNameDisplay.innerHTML ="your designated 501(c)(3) organizations";
					toggleSponsorDisplay();
					toggleImpactDisplay();
        	break;
    	default:
        	//default code block
	} 
}

function showSlide(elementId) {
	
	var slides = document.getElementsByClassName("slide");
	var items = document.getElementsByClassName("header");
	var thisSlide = document.getElementById("slide" + elementId);
	var thisItem = document.getElementById("header" + elementId);
	
	for(var i = 0; i < slides.length; i++) {
		slides[i].style.opacity='0';
	}
	
	for(var i = 0; i < items.length; i++) {
		items[i].style.border='0px';
		items[i].style.borderTop='1px solid #ccc';
	}
	
	thisSlide.style.opacity='1';
	thisItem.style.border='1px solid orange';
}

function designateOrg(elementId) {
	
	var index = getCurrentLevelIndex();
	var boxes = document.forms['designateForm'].designation;
	var counter=0;
	
	switch(document.forms['levelForm'].levels[index].value) {
		case "250":
			// count how many boxes are checked
			for(var i = 0; i < boxes.length; i++) {
				if (boxes[i].checked) {counter++;}
			}
			// disable/enable other boxes depending on how many are allowed
			if (counter < 3) {
				for(var i = 0; i < boxes.length; i++) {
					boxes[i].disabled=false;
				}				
			}
			if (counter >= 3) {
				for(var i = 0; i < boxes.length; i++) {
					if (!boxes[i].checked) {boxes[i].disabled=true;}
				}
			}		
			break;
		default:
			var state = document.getElementById("check" + elementId).checked;
			for(var i = 0; i < boxes.length; i++) {
				boxes[i].checked=false;
				boxes[i].disabled=false;
			}
			document.getElementById("check" + elementId).checked = state;
			document.getElementById("check" + elementId).disabled=false;
			break;
	}
}

function reduceDesignateList() {

	var boxes = document.forms['designateForm'].designation;
	
	for(var i = 0; i < boxes.length; i++) {
		if (boxes[i].checked) {
			designateOrg(i+1);
			break;
		}
	}	
	
}

function loadXMLDoc() {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
  	if (xmlhttp.readyState==4 && xmlhttp.status==200) {   
    	var xmlDoc=xmlhttp.responseXML;
			var display="";
			var x=xmlDoc.getElementsByTagName("Name");
			for (var i = 0;i < x.length;i++) {
				var newId = i+1;
				var newLine = "<div class=\"header\"><a href=\"#\" onclick=\"\">" + x[i].childNodes[0].nodeValue + "</a><input id=\"check" + newId + "\" type=\"checkbox\" name=\"designation\" style=\"float:right;\" onchange=\"designateOrg('" + newId + "');\" /></div>";
	  		display=display+newLine;
  		}
			document.getElementById("orgSearchResults").innerHTML=display;
  	}
  }
	xmlhttp.open("GET","cd_catalog.xml",true);
	xmlhttp.send();
}