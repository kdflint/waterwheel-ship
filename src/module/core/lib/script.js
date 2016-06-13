var imagePath;

function switchToAbout() {
	document.getElementById("navApp").style.left='0px';
	document.getElementById("aboutApp").style.left='200px';
	document.getElementById("sponsorApp").style.transitionDelay='0s'; 
	document.getElementById("sponsorApp").style.opacity='.5';
	document.getElementById("navTopSponsorContext").style.opacity = '0';
	document.getElementById("navTopAboutContext").style.opacity = "1";
	document.getElementById("sponsorHeaderRight").style.left = "20px";
	document.getElementById("powtoon_embed").style.visibility='visible';
	document.getElementById("partner_perspective_embed").style.visibility='hidden';
	document.getElementById("curtain").style.width = "0px";
 	document.getElementById("contextSwitch").innerHTML='<span class="fa fa-chevron-circle-left fa-2x tan" style="margin-right:10px;vertical-align:middle;"></span>Membership';
 	switchAboutView(1);
 	document.getElementById("defaultMenuItem").focus();
	document.getElementById("contextSwitch").onclick = function() {switchToSponsor()}
	window.scrollTo(0,0);
}

function switchToSponsor() {
	document.getElementById("navApp").style.left='760px';
	document.getElementById("aboutApp").style.left='960px';
	document.getElementById("sponsorApp").style.transitionDelay="2s"; 
	document.getElementById("sponsorApp").style.opacity="1";
	document.getElementById("navTopSponsorContext").style.opacity = "1";
	document.getElementById("navTopAboutContext").style.opacity = "0";
	document.getElementById("sponsorHeaderRight").style.left = "520px";
	document.getElementById("powtoon_embed").style.visibility='hidden';
	document.getElementById("partner_perspective_embed").style.visibility='visible';
	document.getElementById("curtain").style.width = "900px";
	document.getElementById("contextSwitch").innerHTML='About Northbridge<span class="fa fa-chevron-circle-right fa-2x tan" style="margin-left:10px;vertical-align:middle;vertical-align:middle;">';
	document.getElementById("contextSwitch").onclick = function() {switchToAbout()}
	hideInfoEmailField();
	hideInfoWebinarField();
	hideSpecialOffer();
	switchToApplyInfo();
	window.scrollTo(0,0);
}

function switchToApplyForm() {
	/*
	document.getElementById("info-email-form").style.visibility="hidden";
	document.getElementById("info-email-form").style.opacity="0";
	document.getElementById("apply-form").style.visibility="visible";
	document.getElementById("apply-form").style.opacity="1";
	document.getElementById("partner_perspective_embed").style.visibility='hidden';
	*/
	document.getElementById("volunteer-form").reset();
	$('li:eq(2)').trigger('click');		
}

function switchToApplyInfo() {
	document.getElementById("info-email-form").style.visibility="visible";
	document.getElementById("info-email-form").style.opacity="1";
	//document.getElementById("apply-form").style.visibility="hidden";
	//document.getElementById("apply-form").style.opacity="0";
	document.getElementById("partner_perspective_embed").style.visibility='visible';
	//document.getElementById("user-message0").innerHTML='';
}

function switchToVolunteer() {
	switchToSponsor();
	switchToApplyForm();
	//$('li:eq(2)').trigger('click');	
}

function isValidEmail(email) {
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
        return false;
    }
    return true;
}

function isSafeCharacterSet(set) {	
	if(set.indexOf('<') > -1 ||
		 set.indexOf('>') > -1 ||
		 set.indexOf('%') > -1 ||
		 set.indexOf('*') > -1 ||
		 set.indexOf('&') > -1 ||
		 set.indexOf('=') > -1 ||
		 set.indexOf('\/') > -1 ||
		 set.indexOf('\\') > -1 ||
		 set.indexOf('!') > -1) {
  	return false;
	}
	return true;
}

function otherCommentsSelectCheckbox(checkboxId) {
		document.getElementById(checkboxId).checked=true;
}

function labnolThumb(id) {
    // Use a local copy of the youtube thumbnail, sized as we need it. Find original at //i.ytimg.com/vi/<video_id>/hqdefault.jpg
    return '<img class="youtube-thumb" src="' + imagePath + '/' + id + '/hqdefault.jpg"><div class="play-button"></div>';
}
 
function labnolIframe() {
    var iframe = document.createElement("iframe");
    var vlink = this.parentNode.id;   	   
    iframe.setAttribute("src", "//www.youtube.com/embed/" + vlink + "?allowfullscreen=1&autoplay=1");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("class", "youtube-iframe");
    this.parentNode.replaceChild(iframe, this);
}

function transformYouTubeDivs() {
   var v = document.getElementsByClassName("youtube-player");
   for (var n = 0; n < v.length; n++) {
    var p = document.createElement("div");
   	p.innerHTML = labnolThumb(v[n].id);
   	p.onclick = labnolIframe;
   	v[n].appendChild(p);
 	}
}

function insertBreadcrumb() {
}