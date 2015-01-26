function switchToAbout() {
	document.getElementById("navApp").style.left='0px';
	document.getElementById("aboutApp").style.left='200px';
	document.getElementById("sponsorApp").style.transitionDelay='0s'; 
	document.getElementById("sponsorApp").style.opacity='.5';
	document.getElementById("navTopSponsorContext").style.opacity = "0";
	document.getElementById("navTopAboutContext").style.opacity = "1";
	document.getElementById("sponsorHeaderRight").style.left = "20px";
 	document.getElementById("contextSwitch").innerHTML='<span class="fa fa-chevron-circle-left fa-2x tan" style="margin-right:10px;vertical-align:middle;"></span>Web Tools';
	document.getElementById("contextSwitch").onclick = function() {switchToSponsor()}
}

function switchToSponsor() {
	document.getElementById("navApp").style.left='760px';
	document.getElementById("aboutApp").style.left='960px';
	document.getElementById("sponsorApp").style.transitionDelay="2s"; 
	document.getElementById("sponsorApp").style.opacity="1";
	document.getElementById("navTopSponsorContext").style.opacity = "1";
	document.getElementById("navTopAboutContext").style.opacity = "0";
	document.getElementById("sponsorHeaderRight").style.left = "520px";
	document.getElementById("contextSwitch").innerHTML='About Northbridge<span class="fa fa-chevron-circle-right fa-2x tan" style="margin-left:10px;vertical-align:middle;vertical-align:middle;">';
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