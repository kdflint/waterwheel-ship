function switchToAbout() {
	document.getElementById("navApp").style.left='0px';
	document.getElementById("aboutApp").style.left='200px';
	document.getElementById("sponsorApp").style.transitionDelay='0s'; 
	document.getElementById("sponsorApp").style.opacity='.5';
	document.getElementById("smallLogo").style.opacity = "0";
	document.getElementById("testtest").style.opacity = "1";
 	document.getElementById("contextSwitch").innerHTML='Web Tools';
	document.getElementById("contextSwitch").onclick = function() {switchToSponsor()}
}

function switchToSponsor() {
	document.getElementById("navApp").style.left='760px';
	document.getElementById("aboutApp").style.left='960px';
	document.getElementById("sponsorApp").style.transitionDelay="2s"; 
	document.getElementById("sponsorApp").style.opacity="1";
	document.getElementById("smallLogo").style.opacity = "1";
	document.getElementById("testtest").style.opacity = "0";
	document.getElementById("contextSwitch").innerHTML='About Northbridge';
	document.getElementById("contextSwitch").onclick = function() {switchToAbout()}
}

function showTeamSponsorForm() {
	document.getElementById("teamSponsorForm").style.opacity='1';
	document.getElementById("causeSponsorForm").style.opacity='0';
	document.getElementById("levelSponsorForm").style.opacity='0';
}

function showCauseSponsorForm() {
	document.getElementById("causeSponsorForm").style.opacity='1';
	document.getElementById("teamSponsorForm").style.opacity='0';
	document.getElementById("levelSponsorForm").style.opacity='0';
}

function showLevelSponsorForm() {
	document.getElementById("causeSponsorForm").style.opacity='0';
	document.getElementById("teamSponsorForm").style.opacity='0';
	document.getElementById("levelSponsorForm").style.opacity='1';
}