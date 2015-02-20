function switchAboutView(viewIndex) {
	
	for (i = 0; i <= 5; i++) {
    document.getElementById("aboutIndex" + i).style.visibility='hidden';
    document.getElementById("aboutIndex" + i).style.opacity='0';
    document.getElementById("aboutQuote" + i).style.visibility='hidden';
    document.getElementById("aboutQuote" + i).style.opacity='0';
	}

	document.getElementById("aboutIndex" + viewIndex).style.visibility='visible';
	document.getElementById("aboutIndex" + viewIndex).style.opacity='1';
	document.getElementById("aboutQuote" + viewIndex).style.visibility='visible';
	document.getElementById("aboutQuote" + viewIndex).style.opacity='1';
	
}