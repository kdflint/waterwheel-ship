function switchAboutView(viewIndex) {
	// Clear background color which may have been initialized in switchLeaderView())
	document.getElementById("peopleMenuItem").style.background='';
	for (i = 0; i <= 5; i++) {
    document.getElementById("aboutIndex" + i).style.visibility='hidden';
    document.getElementById("aboutIndex" + i).style.opacity='0';
    document.getElementById("aboutIndex" + i).style.zIndex='0';
    document.getElementById("aboutQuote" + i).style.visibility='hidden';
    document.getElementById("aboutQuote" + i).style.opacity='0';
	}
	document.getElementById("aboutIndex" + viewIndex).style.visibility='visible';
	document.getElementById("aboutIndex" + viewIndex).style.opacity='1';
	document.getElementById("aboutIndex" + viewIndex).style.zIndex='10';
	document.getElementById("aboutQuote" + viewIndex).style.visibility='visible';
	document.getElementById("aboutQuote" + viewIndex).style.opacity='1';

	if (viewIndex == 1) {
		// About menu Item
		document.getElementById("powtoon_embed").style.visibility='visible';
	} else {
		document.getElementById("powtoon_embed").style.visibility='hidden';
	}

	if (viewIndex == 3) {
		// People menu item
		setDefaultLeaderView();
	}
	
}

function switchAllianceView(viewIndex) {
	for (i = 0; i <= 1; i++) {
	  document.getElementById("allianceIndex" + i).style.visibility='hidden';
    document.getElementById("allianceIndex" + i).style.opacity='0';
	}
	document.getElementById("allianceIndex" + viewIndex).style.visibility='visible';
	document.getElementById("allianceIndex" + viewIndex).style.opacity='1';
}

function setDefaultLeaderView() {
	// Set default submenu item background equivalent to 'active'
	switchLeaderView(2);
	document.getElementById("defaultLeaderMenuItem").style.background='#a6c3ce';
}	

function switchLeaderView(viewIndex) {
	// Clear initialized background color
	document.getElementById("defaultLeaderMenuItem").style.background='';
	// Hold parent menu color equivalent to active (otherwise submenu focus overrides)
	document.getElementById("peopleMenuItem").style.background='#a6c3ce';
	for (i = 0; i <= 2; i++) {
	  document.getElementById("leaderIndex" + i).style.visibility='hidden';
    document.getElementById("leaderIndex" + i).style.opacity='0';
	}
	document.getElementById("leaderIndex" + viewIndex).style.visibility='visible';
	document.getElementById("leaderIndex" + viewIndex).style.opacity='1';
}

function focusLeaderPic(leader) {
	document.getElementById(leader).style.opacity='1';
}

function unfocusLeaderPic(leader) {
	document.getElementById(leader).style.opacity='.5';
}