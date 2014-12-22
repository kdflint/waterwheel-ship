function copyLevelValue() {
	var radio = document.forms['levelForm'].levels;
	var display=document.getElementById("levelAmountDisplay");
	for(var i = 0; i < radio.length; i++) {
		if (radio[i].checked) {
			display.innerHTML=radio[i].value;
			displayFeatures(radio[i].value);
			break;
		}
	}
}

function displayFeatures(level) {
	
	var showSponsorship = document.getElementById("showSponsorship");
	var sponsorName = document.getElementById("sponsorName");
	var showImpact = document.getElementById("showImpact");
	var impactEmail = document.getElementById("impactEmail");
	var causeButton = document.getElementById("causeButton");
	
	switch(level) {
    	case "25":
					showSponsorship.disabled=true;
					sponsorName.disabled=true;
					showImpact.disabled=true
					impactEmail.disabled=true;
					causeButton.className="pure-button mod-sponsor-button pure-button-disabled";
        	break;
    	case "50":
					showSponsorship.disabled=true;
					sponsorName.disabled=true;
					sponsorName.value="";
					showImpact.disabled=true
					impactEmail.disabled=true;
					impactEmail.value="";
					causeButton.className="pure-button mod-sponsor-button pure-button-disabled";
        	break;
      case "100":
					showSponsorship.disabled=false;
					sponsorName.disabled=false;
					showImpact.disabled=true
					impactEmail.disabled=true;
					causeButton.className="pure-button mod-sponsor-button";
        	break;
      case "250":
					showSponsorship.disabled=false;
					sponsorName.disabled=false;
					showImpact.disabled=false
					impactEmail.disabled=false;
					causeButton.className="pure-button mod-sponsor-button";
        	break;
      case "500":
					showSponsorship.disabled=false;
					sponsorName.disabled=false;
					showImpact.disabled=false
					impactEmail.disabled=false;
					causeButton.className="pure-button mod-sponsor-button";
        	break;
    	default:
        	//default code block
	} 
}