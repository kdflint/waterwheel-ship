/***************************************************************************
- File: paste_msword.js
- Version: 13.2.1
- java -jar compiler2.jar --js paste_msword.src.js --js_output_file paste_msword.VERSION.js
***************************************************************************/

var $me_paste_msword = {

	 construct : function()
	{
		this.paste_msword_html = document.getElementById('paste_msword_html');
		this.paste_msword_html.focus();
	}


	,insert : function()
	{
		parent.d = $me_paste_msword.paste_msword_html.innerHTML;
		parent.$m.t.magic_editor.inject_html(parent.cleanHTML(), "block");
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}


	,cancel : function()
	{
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}
}

window.onload = function()
{
	$me_paste_msword.construct();
}

