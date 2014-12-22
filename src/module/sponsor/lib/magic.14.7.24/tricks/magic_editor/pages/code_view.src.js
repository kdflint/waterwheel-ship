/***************************************************************************
- File: code_view.js
- Version: 13.7.2
- java -jar compiler2.jar --js code_view.src.js --js_output_file code_view.VERSION.js
***************************************************************************/

var $me_code_view = {

	 construct : function()
	{
		var cur_ed = parent.$m.t.magic_editor.cur_ed
			,cur_ed_cnt = parseInt(cur_ed);

		this.code_view_wrap_id = document.getElementById('code_view_wrap');
		this.code_view_html_id = document.getElementById('code_view_html');

		this.current_iframe = "magic_" + cur_ed;
		this.current_iframe_id = parent.$m.id(this.current_iframe);
		this.current_textarea_id = parent.$m.id(parent.$m.t.magic_editor.all[cur_ed_cnt]);

		this.code_view_html_id.value = parent.$m.t.magic_editor.clean(parent.$m.tag.get_iframe_doc(this.current_iframe).body.innerHTML);
		
		var result_set = parent.$m.storage.get.table("magic_editor");
		
		if(parent.$m.is.alive(result_set) === true && parent.$m.is.alive(result_set.code_view) === true && parent.$m.is.alive(result_set.code_view.word_wrap) === true)
		{
			if(result_set.code_view.word_wrap === "on")
			{
				$me_code_view.code_view_wrap_id.checked = true;
				parent.$m.attr.set($me_code_view.code_view_html_id, { "wrap" : "on" });
			}
		}
	}
	
	,toggle_wrap : function()
	{
		var wrap_state = "off"
			,data_record = {};
	
		if($me_code_view.code_view_wrap_id.checked === true)
		{
			parent.$m.attr.set($me_code_view.code_view_html_id, { "wrap" : "on" });
			wrap_state = "on";
		}
		else
		{
			parent.$m.attr.set($me_code_view.code_view_html_id, { "wrap" : "off" });
		}
		
		$me_code_view.code_view_html_id.focus();

		data_record["code_view"] = {
			"word_wrap" : wrap_state
		};
		
		parent.$m.storage.set("magic_editor", data_record);
	}


	,update : function()
	{
		parent.$m.tag.get_iframe_doc($me_code_view.current_iframe).body.innerHTML = $me_code_view.code_view_html_id.value;
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}


	,clean : function()
	{
		$me_code_view.code_view_html_id.value = parent.$m.t.magic_editor.clean($me_code_view.code_view_html_id.value);
	}


	,cancel : function()
	{
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}
}

window.onload = function()
{
	$me_code_view.construct();
}

