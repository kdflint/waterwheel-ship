/***************************************************************************
- File: video.js
- Version: 12.12.21
- java -jar compiler2.jar --js video.src.js --js_output_file video.VERSION.js
***************************************************************************/

var $me_video = {

	 construct : function()
	{
		this.video_html = document.getElementById('video_html');
	}


	,insert : function()
	{
		parent.$m.t.magic_editor.inject_html($me_video.video_html.value, "block");
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}


	,cancel : function()
	{
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}
}

window.onload = function()
{
	$me_video.construct();
}