/***************************************************************************
- File: palette.js
- Version: 11.11.15
- java -jar compiler2.jar --js palette.src.js --js_output_file palette.VERSION.js
***************************************************************************/

var $me_palette = {
	colors : [
		 "FFFFFF","CCCCCC","C0C0C0","999999","666666","333333","000000"
		,"FFCCCC","FF6666","FF0000","CC0000","990000","660000","330000"
		,"FFCC99","FF9966","FF9900","FF6600","CC6600","993300","663300"
		,"FFFF99","FFFF66","FFCC66","FFCC33","CC9933","996633","663333"
		,"FFFFCC","FFFF33","FFFF00","ffCC00","999900","666600","333300"
		,"99FF99","66FF99","33FF33","33CC00","009900","006600","003300"
		,"99FFFF","33FFFF","66CCCC","00CCCC","339999","336666","003333"
		,"CCFFFF","66FFFF","33CCFF","3366FF","3333FF","000099","000066"
		,"CCCCFF","9999FF","6666CC","6633FF","6600CC","333399","330099"
		,"FFCCFF","FF99FF","CC66CC","CC33CC","993399","663366","330033"
	]

	,build : function()
	{
		var new_html = "";

		for(var i=0, len=$me_palette.colors.length; i<len; i++)
			new_html += '<a href="#" onclick="$me_palette.choose(\'' + $me_palette.colors[i] + '\'); return false;" title="#' + $me_palette.colors[i] + '" style="background-color:#' + $me_palette.colors[i] + ';" id="c_' + $me_palette.colors[i] + '"></a>';

		document.getElementById("me_color_palette").innerHTML = new_html;
	}

	,choose : function(in_color)
	{
		var editor = parent.document.getElementById("magic_" + parent.$m.t.magic_editor.cur_ed).contentWindow;

		if(parent.$m.vd.is_msie === false)
			editor.document.execCommand("styleWithCSS", null, true);

		try
		{
			parent.$m.t.magic_editor.btns[parent.$m.t.magic_editor.cur_cmd].command();
			editor.document.execCommand(parent.$m.t.magic_editor.btns[parent.$m.t.magic_editor.cur_cmd].command(), false, "#" + in_color);
			editor.focus();
		}
		catch(e)
		{
			return false;
		}

		parent.$m.id("magic_editor_palette").style.visibility = "hidden";
		return false;
	}
}

window.onload = function()
{
	$me_palette.build();
}