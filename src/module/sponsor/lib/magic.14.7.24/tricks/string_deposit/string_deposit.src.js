/***************************************************************************
- File: string_deposit.js
- Version: 13.1.25
- java -jar compiler2.jar --js string_deposit.src.js --js_output_file string_deposit.VERSION.js
***************************************************************************/

$m.trick.string_deposit = {}

$m.t.string_deposit =
{
	 name : "string_deposit"
	,data_att : "string_deposit"
	,data_att_url : "data-mjf_string_deposit_url"
	,data_att_dims : "data-mjf_string_deposit_dims"
	,data_att_has : "data-mjf_strdep_has"
	,data_att_parent : "data-mjf_strdep_parent"
	,data_att_set : "set_strdep"
	,data_att_action : "data-mjf_string_deposit_action"

	,cur : {
		  input : ""
		 ,cursor : ""
		 ,action : "insert"
		 ,deposits : {}
		 ,deposit_id : false
		 ,deposit_template : false
		 ,deposit_action : "overwrite"
	}
	
	,config : {
		 title : "String Deposit"
		,url : "strdep_ex.html"
		,dims : "400x265"
	}
	

	/**
	 * Main constructor for trick -- $m.t.string_deposit.construct()
	 * 
	 */
	,construct : function(in_wand)
	{
		var input_fields = {}
			,strdep_url = false
			,strdep_dims = false
			,has_strdep = false
			,anchor_id = false;

		if($m.is.alive($m.trick.string_deposit.config) === true)
		{
			if($m.is.alive($m.trick.string_deposit.config.title) === true)
			{
				this.config.title = $m.trick.string_deposit.config.title;
			}
	
			if($m.is.alive($m.trick.string_deposit.config.url) === true)
			{
				this.config.url = $m.trick.string_deposit.config.url;
			}
	
			if($m.is.alive($m.trick.string_deposit.config.dims) === true)
			{
				this.config.dims = $m.trick.string_deposit.config.dims;
			}
		}

		if($m.is.alive($m.trick.magic_editor) === true && $m.ajax_init === false)
		{
			$m.t.magic_editor.buttons["string_deposit"] = {
				 name : "string_deposit"
				,use_css : false
				,title : this.config.title
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "custom"
				,darkroom_url : this.config.url
				,darkroom_dims : this.config.dims
				,command : function(in_id)
				{
					var magic_editor_ta = $m.attr.get(in_id, "data-mjf_me_taid");

					strdep_url  = $m.attr.get(magic_editor_ta, $m.t.string_deposit.data_att_url);
					strdep_dims = $m.attr.get(magic_editor_ta, $m.t.string_deposit.data_att_dims);

					$m.attr.set(in_id,
					{
						 "data-mjf_dr_type" : "iframe"
						,"data-mjf_dr_iframe_src" : $m.is.alive(strdep_url) ? strdep_url : $m.t.string_deposit.config.url
						,"data-mjf_dr_iframe_dim" : $m.is.alive(strdep_dims) ? strdep_dims : $m.t.string_deposit.config.dims
					});

					$m.t.darkroom.exec(in_id);
				}
			}
		}
		
		if($m.is.in_array($m.t.magic_editor.types[$m.trick.magic_editor.config.type], "string_deposit") === false)
		{
			$m.t.magic_editor.types[$m.trick.magic_editor.config.type].push("string_deposit");
		}

		for(var i=0, f_len=$m.tags.form.length; i < f_len; i++)
		{
			input_fields = $m.attr.get_fields_with($m.tags.form[i], ['text','textarea'], $m.data_att, this.data_att);
			
			for(var j=0, i_len=input_fields.length; j < i_len; j++)
			{
				if($m.attr.has_value(input_fields[j], $m.data_att, "magic_editor") === true)
				{
					continue;
				}
				
				strdep_url  = $m.attr.get(input_fields[j], this.data_att_url);
				strdep_dims = $m.attr.get(input_fields[j], this.data_att_dims);
				has_strdep  = $m.attr.get(input_fields[j], this.data_att_has);
				
				if($m.is.alive(has_strdep) === false)
				{
					anchor_id = input_fields[j].id + "_link_" + $m.ut.rand_num(5);
				
					$m.tag.insert_after(input_fields[j], $m.tag.init("a",
					{
						 "data-mjf" : "set_strdep|darkroom|return_false"
						,"data-mjf_dr_type" : "iframe"
						,"data-mjf_dr_iframe_src" : $m.is.alive(strdep_url) ? strdep_url : this.config.url
						,"data-mjf_dr_iframe_dim" : $m.is.alive(strdep_dims) ? strdep_dims : this.config.dims
						,"data-mjf_strdep_parent" : input_fields[j].id
						,"href" : "#"
						,"class" : "strdep_icon"
						,"title" : this.config.title
						,"id" : anchor_id
					}));
					
					$m.tag.create(anchor_id, "img",
					{
						 "src" : $m.config.basedir + "tricks/string_deposit/icon_string_deposit.png"
						,"alt" : ""
						
					});
					
					$m.attr.set(input_fields[j], { "data-mjf_strdep_has" : "true" });
				}
			}
		}

		$m.elements.bind($m.tags.a, this.data_att_set, "click", this.set);
		$m.t.darkroom.init();
	}
	
	
	// $m.t.string_deposit.set()
	,set : function(in_id)
	{
		$m.t.string_deposit.cur.input = $m.attr.get(in_id, $m.t.string_deposit.data_att_parent);
		$m.t.string_deposit.cur.cursor = $m.cursor.get($m.t.string_deposit.cur.input);
	 	$m.t.string_deposit.cur.action = ($m.attr.has_value($m.t.string_deposit.cur.input, $m.t.string_deposit.data_att_action, "overwrite") === true) ? "overwrite" : "insert";
	 	
	 	if($m.is.alive($m.trick.magic_editor) === true)
	 	{
	 		$m.t.magic_editor.cur_ed = false;
	 	}
	}
	
	
	// $m.t.string_deposit.write()
	,write : function()
	{
		var str_dep_line = ""
			,str_dep_html = ""
			,final_html = "";

		for(var i in $m.t.string_deposit.cur.deposits)
		{
			str_dep_line = $m.t.string_deposit.cur.deposit_template;
			
			for(var j in $m.t.string_deposit.cur.deposits[i])
			{
				str_dep_line = str_dep_line.replace(j, $m.t.string_deposit.cur.deposits[i][j]);
				str_dep_line = str_dep_line.replace(/string_deposit="(.+?)"/, "onclick=\"parent.$m.t.string_deposit.exec('$1');return false;\"");
			}

			str_dep_html += str_dep_line;
		}

		switch($m.t.string_deposit.cur.deposit_action)
		{
			case "append":
				final_html = $m.t.string_deposit.cur.deposit_id.innerHTML + str_dep_html;
				break;

			case "prepend":
				final_html = str_dep_html + $m.t.string_deposit.cur.deposit_id.innerHTML;
				break;

			default:
				final_html = str_dep_html;
				break;
		}

		if($m.tag.get_name($m.t.string_deposit.cur.deposit_id) == "table" && $m.vd.is_msie === true)
		{
			var new_table = "<table"
				,table_attributes = $m.attr.get_all($m.t.string_deposit.cur.deposit_id)
				,new_div = $m.tag.init("div", false, $m.tag.get_iframe_doc($m.t.darkroom.ids.iframe_div_iframe));

			for(var i in table_attributes)
			{
				new_table += ' ' + i + '="' + table_attributes[i] + '"';
			}
			
			new_div.innerHTML = new_table + ">" + final_html + "</table>";

			$m.tag.replace($m.t.string_deposit.cur.deposit_id, new_div);
		}
		else
		{
			$m.t.string_deposit.cur.deposit_id.innerHTML = final_html;
		}
	}
	
	
	// $m.t.string_deposit.exec()
	,exec : function(in_val)
	{
		if($m.is.alive(in_val) === false)
		{
			in_val = "";
		}
		
		if($m.is.alive($m.trick.magic_editor) === true && $m.is.alive($m.t.magic_editor.cur_ed) === true)
		{
			$m.t.magic_editor.selection.save("magic_" + $m.t.magic_editor.cur_ed);
			$m.t.magic_editor.inject_html(in_val, "inline");
		}
		else
		{
			var cur_input = $m.id($m.t.string_deposit.cur.input)
				,new_input = "";
	
			if($m.t.string_deposit.cur.action == "overwrite")
			{
				cur_input.value = in_val;
			}
			else
			{
				new_input = cur_input.value.substr(0, $m.t.string_deposit.cur.cursor) + in_val + cur_input.value.substr($m.t.string_deposit.cur.cursor, cur_input.value.length);
				cur_input.value = new_input;
				$m.t.string_deposit.cur.cursor = cur_input.value.length;
			}
			
			$m.cursor.set($m.t.string_deposit.cur.input, $m.t.string_deposit.cur.cursor);
		}
		
		$m.t.darkroom.hide("mjf_darkroom_iframe_div");
		
		return false;
	}

}