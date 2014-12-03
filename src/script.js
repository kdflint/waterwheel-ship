function switchToAbout() {
	document.getElementById("navApp").style.left='0px';
	document.getElementById("aboutApp").style.left='200px';
	document.getElementById("sponsorApp").style.transitionDelay="0s"; 
	document.getElementById("sponsorApp").style.opacity='.5';
	document.getElementById("contextSwitch").innerHTML='Apply/Sponsor/Volunteer';
	document.getElementById("contextSwitch").onclick = function() {switchToSponsor()}
}

function switchToSponsor() {
	document.getElementById("navApp").style.left='760px';
	document.getElementById("aboutApp").style.left='960px';
	document.getElementById("sponsorApp").style.transitionDelay="2s"; 
	document.getElementById("sponsorApp").style.opacity='1';
	document.getElementById("contextSwitch").innerHTML='About NorthBridge';
	document.getElementById("contextSwitch").onclick = function() {switchToAbout()}
}