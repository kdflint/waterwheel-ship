/***************************************************************************
- File: special_characters.js
- Version: 13.6.24
- java -jar compiler2.jar --js special_characters.src.js --js_output_file special_characters.VERSION.js
***************************************************************************/

var $me_special_characters = {

	 construct : function()
	{
		var result_set = parent.$m.storage.get.table("magic_editor")
			,build_group = "Punctuation"
			,special_characters_group_id = document.getElementById('special_characters_group');

		this.special_characters_prev_id = document.getElementById('special_characters_prev');

		if(parent.$m.is.alive(result_set) === true && parent.$m.is.alive(result_set.special_characters) === true && parent.$m.is.alive(result_set.special_characters.special_characters_group) === true)
		{
			build_group = result_set.special_characters.special_characters_group;
		}
		
		if(build_group == null)
		{
			build_group = "Punctuation";
		}

		this.build(build_group);

		var scg_html = '<select onchange="$me_special_characters.build(this.value)">';

		for(var i in parent.$m.t.magic_editor.entities)
		{
			selected_html = (build_group == i) ? ' selected="selected"' : '';
		
			scg_html += '<option' + selected_html + ' value="' + i + '">' + i + '</option>';			
		}
		
		special_characters_group_id.innerHTML = scg_html + "</select>";
	}


	,build : function(in_symbol)
	{
		var special_characters_cont_id = document.getElementById('special_characters_cont')
			,sc_html = ""
			,cur_desc = ""
			,data_record = {}
			,ignore_characters = [
				,"emsp"
				,"ensp"
				,"nbsp"
				,"shy"
				,"thinsp"
			];

		for(var i in parent.$m.t.magic_editor.entities[in_symbol])
		{
			cur_desc = parent.$m.t.magic_editor.entities[in_symbol][i][0];
		
			if(parent.$m.is.in_array(ignore_characters, i) === false)
			{
				sc_html += '<a href="#" title="' + cur_desc + '" onmouseover="$me_special_characters.show(\'' + i + '\');" onclick="$me_special_characters.insert(\'' + i + '\');">&' + i + ';</a>';
			}
		}
		
		special_characters_cont_id.innerHTML = sc_html;

		data_record["special_characters"] = {
			"special_characters_group" : in_symbol
		};
		
		parent.$m.storage.set("magic_editor", data_record);
	}


	,show : function(in_symbol)
	{
		$me_special_characters.special_characters_prev_id.innerHTML = "&" + in_symbol + ";";
	}


	,insert : function(in_symbol)
	{
		parent.$m.t.magic_editor.inject_html("&" + in_symbol + ";", "inline");
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}



	,cancel : function()
	{
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}
}

window.onload = function()
{
	$me_special_characters.construct();
}

