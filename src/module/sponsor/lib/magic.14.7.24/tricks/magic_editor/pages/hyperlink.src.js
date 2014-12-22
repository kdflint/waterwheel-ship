/***************************************************************************
- File: hyperlink.js
- Version: 12.12.21
- java -jar compiler2.jar --js hyperlink.src.js --js_output_file hyperlink.VERSION.js
***************************************************************************/

var $me_hyperlink = {
	 link_html : false
	,link_url : false
	,link_title : false
	,cur_anchor : false

	,construct : function()
	{
		if(parent.$m.is.alive(parent.$m.t.magic_editor.selection.txt) === false)
		{
			parent.$m.t.magic_editor.selection.txt = "";
		}

		this.cur_anchor = parent.$m.t.magic_editor.cur_anchor;

		this.nlink_title = document.getElementById('nlink_title');
		this.nlink_title.value = parent.$m.t.magic_editor.selection.txt;

		this.nlink_url = document.getElementById('nlink_url');
		this.nlink_url.value = "http://www.example.com/";

		this.nlink_target = document.getElementById('nlink_target');
		//this.nlink_track = document.getElementById('nlink_track');
		
		if(this.cur_anchor !== false)
		{
			document.getElementById("link_create").value = "Update Link";

			var attr_href = this.cur_anchor.getAttribute("href");
			if(parent.$m.is.alive(attr_href) === true)
			{
				this.nlink_url.value = attr_href;
			}

			var attr_target = this.cur_anchor.getAttribute("target");
			if(parent.$m.is.alive(attr_target) === true)
			{
				if(attr_target == "_blank")
				{
					this.nlink_target.checked = true;
				}
			}
		}
	}
	
	,create : function()
	{
		if($me_hyperlink.cur_anchor !== false)
		{
			parent.$m.t.magic_editor.cur_anchor.href = $me_hyperlink.nlink_url.value;
			
			$me_hyperlink.link_title = (parent.$m.is.alive($me_hyperlink.nlink_title.value) === true) ? $me_hyperlink.nlink_title.value : $me_hyperlink.nlink_url.value;
			
			parent.$m.t.magic_editor.cur_anchor.innerHTML = $me_hyperlink.link_title;

			if($me_hyperlink.nlink_target.checked === true)
			{
				parent.$m.t.magic_editor.cur_anchor.setAttribute("target", "_blank");
			}
			else
			{
				parent.$m.t.magic_editor.cur_anchor.removeAttribute("target");
			}
		}
		else
		{
			$me_hyperlink.link_html = '<a href="';
	
			$me_hyperlink.link_url = $me_hyperlink.nlink_url.value;
	
			$me_hyperlink.link_title = (parent.$m.is.alive($me_hyperlink.nlink_title.value) === true) ? $me_hyperlink.nlink_title.value : $me_hyperlink.nlink_url.value;
	
			$me_hyperlink.link_html += $me_hyperlink.link_url + '"';
			
			if($me_hyperlink.nlink_target.checked === true)
			{
				$me_hyperlink.link_html += ' target="_blank"';
			}
	
			$me_hyperlink.link_html += '>' + $me_hyperlink.link_title + '</a>';
			
			parent.$m.t.magic_editor.inject_html($me_hyperlink.link_html, "inline");
		}

		parent.$m.t.magic_editor.cur_anchor = false;
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}
	
	
	,remove : function()
	{
		parent.$m.id("magic_" + parent.$m.t.magic_editor.cur_ed).contentWindow.document.execCommand("unlink", false, null);
		parent.$m.t.magic_editor.cur_anchor = false;
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}


	,cancel : function()
	{
		parent.$m.t.magic_editor.cur_anchor = false;
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}
}

window.onload = function()
{
	$me_hyperlink.construct();
}