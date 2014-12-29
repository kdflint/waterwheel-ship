/***************************************************************************
- File: wand.js - Let's use the wand
- Version: 14.7.14
- java -jar compiler2.jar --js wand.src.js --js_output_file wand.VERSION.js
***************************************************************************/

/** 
 * $m.h.add_commas
 *
 */
$m.h.add_commas =
{
	 name : "add_commas"
	,data_att : "add_commas"
	,timeout : false

	// $m.h.add_commas.construct()
	,construct : function()
	{
		var init_fields = $m.attr.get_fields_with("document", ['text','textarea'], $m.data_att, this.data_att);
		
		$m.elements.bind(init_fields, this.data_att, "keyup", this.exec);
		$m.elements.bind(init_fields, this.data_att, "change", this.exec);
	}

	// $m.h.add_commas.exec(IN_ID)
	,exec : function(in_id)
	{
		var id = $m.id(in_id);
		
		clearTimeout($m.h.add_commas.timeout);
		
		if($m.is.alive(id.value) === true)
		{
			$m.h.add_commas.timeout = setTimeout(function()
			{
				id.value = $m.ut.add_commas(id.value);
			}, 750);
		}
	}
}


/**
 * $m.h.ajax_click
 *
 */
$m.h.ajax_click =
{
	 name : "ajax_click"
	,data_att : "ajax_click"

	// $m.h.ajax_click.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}

	// $m.h.ajax_click.exec()
	,exec : function(in_id)
	{
		var ajax_click = new $m.ajax();
		ajax_click.init(in_id);
		ajax_click.exec();
	}
}


/**
 * $m.h.ajax_field_submit_click
 *
 */
$m.h.ajax_field_submit_click =
{
	 name : "ajax_field_submit_click"
	,data_att : "ajax_field_submit_click"
	,data_att_group : "data-mjf_afsc"
	,allowed_fields : ['text','password','file','textarea','select','radio','checkbox']
	,timer : false

	// $m.h.ajax_field_submit_click.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}
	
	// $m.h.ajax_field_submit_click.exec()
	,exec : function(in_id)
	{
		var ajax_field_submit_click = new $m.ajax()
			,this_group = $m.attr.get(in_id, $m.h.ajax_field_submit_click.data_att_group)
			,group_fields = [];

		ajax_field_submit_click.init(in_id);
		
		group_fields = $m.attr.get_fields_with($m.body_id, $m.h.ajax_field_submit_click.allowed_fields, $m.h.ajax_field_submit_click.data_att_group, this_group);

		for(var i=0, len=group_fields.length; i < len; i++)
		{
			if($m.tag.get_name(group_fields[i]) == "select")
			{
				group_fields[i] = group_fields[i];
			
				for(var j=0, slen=group_fields[i].length; j < slen; j++)
				{
					if(group_fields[i][j].selected === true)
					{
						ajax_field_submit_click.config.query += "&" + $m.attr.get(group_fields[i], "name") + "=" + encodeURIComponent(group_fields[i][j].value);
					}
				}
				
				continue;
			}
			
			if((group_fields[i].type == "radio" || group_fields[i].type == "checkbox") && group_fields[i].checked === true)
			{
				ajax_field_submit_click.config.query += "&" + $m.attr.get(group_fields[i], "name") + "=" + encodeURIComponent(group_fields[i].value);
				continue;
			}
			else if((group_fields[i].type == "radio" || group_fields[i].type == "checkbox") && group_fields[i].checked !== true)
			{
				continue;
			}
			else
			{
				ajax_field_submit_click.config.query += "&" + $m.attr.get(group_fields[i], "name") + "=" + encodeURIComponent(group_fields[i].value);
			}
		}

		ajax_field_submit_click.method = "post";
		ajax_field_submit_click.exec();

		if(ajax_field_submit_click.request.errord === true)
		{
			clearTimeout($m.h.ajax_field_submit_click.timer);
			return false;
		}
	}
}


/**
 * $m.h.ajax_field_submit_kc
 *
 */
$m.h.ajax_field_submit_kc =
{
	 name : "ajax_field_submit_kc"
	,data_att : "ajax_field_submit_kc"
	,data_att_group : "data-mjf_afskc"
	,allowed_simple_fields : ['text','password','file','textarea','select']
	,allowed_checked_fields : ['radio','checkbox']
	,allowed_all_fields : []
	,timer : false

	// $m.h.ajax_field_submit_kc.construct()
	,construct : function()
	{
		var simple_fields = $m.attr.get_fields_with($m.body_id, this.allowed_simple_fields, $m.data_att, this.data_att);
		$m.elements.bind(simple_fields, this.data_att, "keyup", this.init);
		$m.elements.bind(simple_fields, this.data_att, "change", this.init);
		
		var checked_fields = $m.attr.get_fields_with($m.body_id, this.allowed_checked_fields, $m.data_att, this.data_att);
		$m.elements.bind(checked_fields, this.data_att, "click", this.exec);
		
		this.allowed_all_fields = this.allowed_simple_fields.concat(this.allowed_checked_fields);
	}

	// $m.h.ajax_field_submit_kc.init()
	,init : function(in_id, in_event)
	{
		clearTimeout($m.h.ajax_field_submit_kc.timer);
		
		if($m.keycode.is_worthy($m.keycode.get(in_event)) === true || $m.tag.get_name(in_id) == "select")
		{
			$m.h.ajax_field_submit_kc.timer = setTimeout(function()
			{
				$m.h.ajax_field_submit_kc.exec(in_id);
	
			}, 750);
		}
	}
	
	// $m.h.ajax_field_submit_kc.exec()
	,exec : function(in_id)
	{
		var ajax_field_submit_kc = new $m.ajax()
			,this_group = $m.attr.get(in_id, $m.h.ajax_field_submit_kc.data_att_group)
			,group_fields = [];

		ajax_field_submit_kc.init(in_id);
		
		if($m.is.alive(this_group) === true)
		{
			group_fields = $m.attr.get_fields_with($m.body_id, $m.h.ajax_field_submit_kc.allowed_all_fields, $m.h.ajax_field_submit_kc.data_att_group, this_group);
		}
		else
		{
			group_fields.push($m.id(in_id));
		}

		for(var i=0, len=group_fields.length; i < len; i++)
		{
			if($m.tag.get_name(group_fields[i]) == "select")
			{
				group_fields[i] = group_fields[i];
			
				for(var j=0, slen=group_fields[i].length; j < slen; j++)
				{
					if(group_fields[i][j].selected === true)
					{
						ajax_field_submit_kc.config.query += "&" + $m.attr.get(group_fields[i], "name") + "=" + encodeURIComponent(group_fields[i][j].value);
					}
				}
				
				continue;
			}
			
			if((group_fields[i].type == "radio" || group_fields[i].type == "checkbox") && group_fields[i].checked === true)
			{
				ajax_field_submit_kc.config.query += "&" + $m.attr.get(group_fields[i], "name") + "=" + encodeURIComponent(group_fields[i].value);
				continue;
			}
			else if((group_fields[i].type == "radio" || group_fields[i].type == "checkbox") && group_fields[i].checked !== true)
			{
				continue;
			}
			else
			{
				ajax_field_submit_kc.config.query += "&" + $m.attr.get(group_fields[i], "name") + "=" + encodeURIComponent(group_fields[i].value);
			}
		}

		ajax_field_submit_kc.method = "post";
		ajax_field_submit_kc.exec();

		if(ajax_field_submit_kc.request.errord === true)
		{
			clearTimeout($m.h.ajax_field_submit_kc.timer);
			return false;
		}
	}
}


/**
 * $m.h.ajax_change
 *
 */
$m.h.ajax_change =
{
	 name : "ajax_change"
	,data_att : "ajax_change"
	,timer : false

	// $m.h.ajax_change.construct()
	,construct : function()
	{
		var good_fields = $m.attr.get_fields_with($m.body_id, ['text','password','file','textarea','select'], $m.data_att, this.data_att);
		$m.elements.bind(good_fields, this.data_att, "change", this.exec);
	}

	// $m.h.ajax_change.exec()
	,exec : function(in_id, in_event)
	{
		clearTimeout($m.h.ajax_change.timer);

		$m.h.ajax_change.timer = setTimeout(function()
		{
			var ajax_change = new $m.ajax();
		
			ajax_change.init(in_id);
			ajax_change.config.query += "&" + $m.attr.get(in_id, "name") + "=" + encodeURIComponent($m.id(in_id).value);
			ajax_change.exec();
			
			if(ajax_change.request.errord === true)
			{
				clearTimeout($m.h.ajax_change.timer);
				return false;
			}

		}, 750);

	}
}


/**
 * $m.h.ajax_kc
 *
 */
$m.h.ajax_kc =
{
	 name : "ajax_kc"
	,data_att : "ajax_kc"
	,timer : false

	// $m.h.ajax_kc.construct()
	,construct : function()
	{
		var good_fields = $m.attr.get_fields_with($m.body_id, ['text','password','file','textarea','select'], $m.data_att, this.data_att);
		$m.elements.bind(good_fields, this.data_att, "keyup", this.exec);
		$m.elements.bind(good_fields, this.data_att, "change", this.exec);
	}

	// $m.h.ajax_kc.exec()
	,exec : function(in_id, in_event)
	{
		clearTimeout($m.h.ajax_kc.timer);
		
		if($m.keycode.is_worthy($m.keycode.get(in_event)) === true || $m.tag.get_name(in_id) == "select")
		{
			$m.h.ajax_kc.timer = setTimeout(function()
			{
				var ajax_kc = new $m.ajax();
			
				ajax_kc.init(in_id);
				ajax_kc.config.query += "&" + $m.attr.get(in_id, "name") + "=" + encodeURIComponent($m.id(in_id).value);
				ajax_kc.exec();
				
				if(ajax_kc.request.errord === true)
				{
					clearTimeout($m.h.ajax_kc.timer);
					return false;
				}
	
			}, 750);
		}
	}
}


/**
 * $m.h.ajax_onload
 *
 */
$m.h.ajax_onload =
{ 
	// $m.h.ajax_onload.construct()
	construct : function(in_wand)
	{
		if($m.is.alive(in_wand.element_id) === false)
		{
			$m.de.throw_browser_error("$m.wand.ajax_onload.element_id is required.");
		}
		else if($m.is.alive(in_wand.url) === false)
		{
			$m.de.throw_browser_error("$m.wand.ajax_onload.url is required.");
		}
		else if($m.ajax_init === false)
		{
			var ajax_onload = new $m.ajax();
			ajax_onload.init(in_wand);
			ajax_onload.exec();
		}
	}
}


/**
 * $m.h.ajax_polling
 *
 */
$m.h.ajax_polling =
{ 
	 running_polls : []
	,timer : false

	// $m.h.ajax_polling.construct()
	,construct : function(in_wand)
	{
		if($m.is.alive(in_wand.element_id) === false)
		{
			$m.de.throw_browser_error("$m.wand.ajax_polling.element_id is required.");
		}
		else if($m.is.alive(in_wand.interval) === false)
		{
			$m.de.throw_browser_error("$m.wand.ajax_polling.interval is required.");
		}
		else if($m.is.alive(in_wand.url) === false)
		{
			$m.de.throw_browser_error("$m.wand.ajax_polling.url is required.");
		}
		else
		{
			if($m.is.in_array(this.running_polls, in_wand.element_id) === false)
			{
				this.running_polls.push(in_wand.element_id);

				var ajax_poll = new $m.ajax();
				ajax_poll.init(in_wand);
				ajax_poll.delete_xhttp = false;

				setInterval(function()
				{
					ajax_poll.exec();
					
					if(ajax_poll.request.errord === true)
					{
						clearTimeout($m.h.ajax_polling.timer);
						return false;
					}
					
				}, in_wand.interval * 1000);
			}
		}
	}
}


/**
 * $m.h.ajax_submit
 *
 */
$m.h.ajax_submit =
{		
	 name : "ajax_submit"
	,data_att : "ajax_submit"

	// $m.h.ajax_submit.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.form, this.data_att, "submit", this.exec);
	}

	// $m.h.ajax_submit.exec()
	,exec : function(in_id, in_event, in_asl)
	{
		var ajax_submit = new $m.ajax();

		ajax_submit.init(in_id);
		ajax_submit.config.method = $m.attr.get(in_id, "method");
		ajax_submit.config.url = ($m.is.alive(in_asl) === true) ? in_asl : $m.attr.get(in_id, "action");
		ajax_submit.exec();

		if(ajax_submit.request.errord === true)
		{
			return false;
		}
	}
}


/**
 * $m.h.ajax_submit_kc
 *
 */
$m.h.ajax_submit_kc =
{		
	 name : "ajax_submit_kc"
	,data_att : "ajax_submit_kc"
	,timer : false

	// $m.h.ajax_submit_kc.construct()
	,construct : function()
	{
		var good_fields = $m.attr.get_fields_with($m.body_id, ['text','password','file','textarea','select'], $m.data_att, this.data_att);
		$m.elements.bind(good_fields, this.data_att, "keyup", this.exec);
		$m.elements.bind(good_fields, this.data_att, "change", this.exec);
	}

	// $m.h.ajax_submit_kc.exec()
	,exec : function(in_id, in_event)
	{
		clearTimeout($m.h.ajax_submit_kc.timer);

		if($m.keycode.is_worthy($m.keycode.get(in_event)) === true || $m.tag.get_name(in_id) == "select")
		{
			$m.h.ajax_submit_kc.timer = setTimeout(function()
			{
				var ajax_submit_kc = new $m.ajax()
					,form_id_name = $m.attr.get(in_id, "data-mjf_askc_form_id")
					,form_id = $m.id(form_id_name)
					,form_action = $m.attr.get(in_id, "data-mjf_askc_action");

				var form_action_final = $m.is.alive(form_action) ? form_action : $m.attr.get(form_id_name, "action");
				
				if($m.is.alive(form_action_final) === false)
				{
					$m.de.throw_browser_error("$m.h.ajax_submit_kc.exec() -- could not determine the form action");
					return false;
				}

				if($m.is.alive($m.h.form_required.valid_forms[form_id_name]) === true)
				{
					if($m.h.form_required.exec(form_id_name) === true)
					{
						$m.h.ajax_submit.exec(form_id_name, in_event, form_action_final);
					}
				}
				else
				{
					$m.h.ajax_submit.exec(form_id_name, in_event, form_action_final);
				}

			}, 750);
		}
	}
}


/**
 * $m.h.ajax_submit_link
 *
 */
$m.h.ajax_submit_link =
{		
	 name : "ajax_submit_link"
	,data_att : "ajax_submit_link"

	// $m.h.ajax_submit_link.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}

	// $m.h.ajax_submit_link.exec()
	,exec : function(in_id, in_event)
	{
		var form_id_name = $m.attr.get(in_id, "data-mjf_asl_form_id")
			,form_id = $m.id(form_id_name)
			,form_action = $m.attr.get(in_id, "data-mjf_asl_action")
			,name_value = $m.attr.get(in_id, "data-mjf_asl_name_value");

		var form_action_final = $m.is.alive(form_action) ? form_action : $m.attr.get(form_id_name, "action");
		
		if($m.is.alive(form_action_final) === false)
		{
			$m.de.throw_browser_error("$m.h.ajax_submit_link.exec() -- could not determine the form action");
			return false;
		}

		if($m.tag.get_name(in_id) == "a")
		{
			$m.id(in_id).blur();
		}

		if($m.is.alive(name_value) === true)
		{
			form_action_final += (form_action_final.indexOf("?") == -1) ? "?" : "&";
			form_action_final += name_value;
		}
		
		if($m.is.alive($m.h.form_required.valid_forms[form_id_name]) === true)
		{
			if($m.h.form_required.exec(form_id_name) === true)
			{
				$m.h.ajax_submit.exec(form_id_name, in_event, form_action_final);
			}
		}
		else
		{
			$m.h.ajax_submit.exec(form_id_name, in_event, form_action_final);
		}
	}
}


/**
 * $m.h.ajax_unload
 *
 */
$m.h.ajax_unload =
{
	 // $m.h.ajax_unload.construct()
	 construct : function(in_wand)
	{
		if($m.is.alive(in_wand.element_id) === false)
		{
			$m.de.throw_browser_error("$m.wand.ajax_unload.element_id is required.");
		}
		else if($m.is.alive(in_wand.url) === false)
		{
			$m.de.throw_browser_error("$m.wand.ajax_unload.url is required.");
		}
		else
		{
			$m.win.bind("beforeunload", function(in_event)
			{
				in_event = in_event || window.event;

				if($m.is.alive(in_wand.update_id) === false)
				{
					in_wand.update_id = $m.body_id;
				}
				
				var ajax_unload = new $m.ajax();
				ajax_unload.init(in_wand);
				ajax_unload.exec();
			});
		}
	}
}


/**
 * $m.h.change_field_type
 *
 */
$m.h.change_field_type = 
{
	 name : "change_field_type"
	,data_att : "change_field_type"
	,data_att_cft : "data-mjf_cft"
	,data_att_cft_clear : "data-mjf_cft_clear"

	// $m.h.change_field_type.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.get($m.document, "input"), this.data_att, "focus", this.exec);
	}

	// $m.h.change_field_type.exec()
	,exec : function(in_id)
	{
		var id = $m.id(in_id)
			,field_atts = $m.attr.get_all(id)
			,clear_value = $m.attr.get(in_id, $m.h.change_field_type.data_att_cft_clear)
			,attributes = {};

		field_atts.type = $m.attr.get(in_id, $m.h.change_field_type.data_att_cft);
		id.onfocus = null;

		if((clear_value !== false))
		{
			field_atts.value = "";
		}

		id.parentNode.insertBefore($m.tag.init("input", field_atts), id.nextSibling).focus();
		id.parentNode.removeChild(id);
	}
}


/**
 * $m.h.check_all_boxes
 *
 */
$m.h.check_all_boxes =
{
	 name : "check_all_boxes"
	,data_att : "check_all_boxes"
	,checkall_att : "data-mjf_checkall"

	// $m.h.check_all_boxes.construct()
	,construct : function()
	{
		var init_checkboxes = []
			,good_checkboxes = [];

		for(var i=0, f_len=$m.tags.form.length; i < f_len; i++)
		{
			init_checkboxes = $m.attr.get_fields_with($m.tags.form[i], ['checkbox'], $m.data_att, this.data_att);
			good_checkboxes = good_checkboxes.concat(init_checkboxes);
		}

		$m.elements.bind(good_checkboxes, this.data_att, "click", this.exec);
	}

	// $m.h.check_all_boxes.exec()
	,exec : function(in_id)
	{
		var id = $m.id(in_id)
			,init_checkboxes = []
			,check_these_boxes = []
			,check_them = id.checked === true ? true : false;

		for(var i=0, f_len=$m.tags.form.length; i < f_len; i++)
		{
			init_checkboxes = $m.attr.get_fields_with($m.tags.form[i], ['checkbox'], $m.h.check_all_boxes.checkall_att, in_id)
			check_these_boxes = check_these_boxes.concat(init_checkboxes);
		}

		for(var i=0, c_len=check_these_boxes.length; i < c_len; i++)
		{
			if(check_these_boxes[i].disabled === false)
			{
				if(check_them === false)
				{
					check_these_boxes[i].checked = true;
					check_these_boxes[i].click();
				}
				else
				{
					check_these_boxes[i].checked = false;
					check_these_boxes[i].click();
				}
			}
		}
	}
}


/**
 * $m.h.check_other_onfocus
 *
 */
$m.h.check_other_onfocus =
{
	 name : "check_other_onfocus"
	,data_att : "check_other_onfocus"
	,check_other_onfocus_id_att : "data-mjf_check_other_onfocus_id"

	// $m.h.check_other_onfocus.construct()
	,construct : function()
	{
		var init_fields = []
			,good_fields = [];

		for(var i=0, f_len=$m.tags.form.length; i < f_len; i++)
		{
			init_fields = $m.attr.get_fields_with($m.tags.form[i], ['text','password','textarea','file','select'], $m.data_att, this.data_att);
			good_fields = good_fields.concat(init_fields);
		}

		$m.elements.bind(good_fields, this.data_att, "focus", this.exec);
	}

	// $m.h.check_other_onfocus.exec()
	,exec : function(in_id)
	{
		$m.id($m.attr.get(in_id, $m.h.check_other_onfocus.check_other_onfocus_id_att)).checked = true;
	}
}


/**
 * $m.h.checked_picker
 *
 */
$m.h.checked_picker =
{
	 name : "checked_picker"
	,data_att : "checked_picker"
	,data_att_grp : "data-mjf_checked_picker_group"
	,data_att_lbl : "data-mjf_checked_picker_label"
	,check_sets : {}
	,timer : ""
	,delay : 150

	// $m.h.checked_picker.construct()
	,construct : function(in_wand)
	{
		if($m.vd.is_mobile_touch === true)
		{
			return;
		}

		var tmp_checks = $m.attr.get_tags_with($m.tags.get($m.document, "input"), $m.data_att, this.data_att)
			,tmp_check_name = ""
			,tmp_check_group = ""
			,tmp_id = ""
			,tmp_parent = ""
			,tmp_html = ""
			,tmp_lbl = "";

		for(var j=0, to_len=tmp_checks.length; j < to_len; j++)
		{
			if($m.attr.get(tmp_checks[j], "type") == "checkbox")
			{
				tmp_check_grp = $m.attr.get(tmp_checks[j], this.data_att_grp);
				
				if($m.ajax_init === true && $m.is.object(this.check_sets[tmp_check_grp]) === true)
				{
					this.check_sets[tmp_check_grp] = {};
				}
			}
		}

		for(var j=0, to_len=tmp_checks.length; j < to_len; j++)
		{
			if($m.attr.get(tmp_checks[j], "type") == "checkbox")
			{
				tmp_check_grp = $m.attr.get(tmp_checks[j], this.data_att_grp);
				tmp_check_id = $m.attr.get(tmp_checks[j], "id");

				if($m.is.object(this.check_sets[tmp_check_grp]) === false)
				{
					this.check_sets[tmp_check_grp] = {};
				}

				tmp_lbl = $m.attr.get(tmp_checks[j], this.data_att_lbl);

				this.check_sets[tmp_check_grp][tmp_check_id] = {
					 state : (tmp_checks[j].checked === true) ? true : false
					,label : tmp_lbl
					,text : $m.tags.strip.from_id(tmp_lbl).toLowerCase()
					,display : "block"
				}
			}
		}

		$m.elements.bind($m.tags.get($m.document, "input"), this.data_att, "click", this.exec);
	}

	// $m.h.checked_picker.exec(IN_ID)
	,exec : function(in_id)
	{
		var id = $m.id(in_id)
			,group_id = $m.attr.get(in_id, $m.h.checked_picker.data_att_grp)
			,label_id = $m.attr.get(in_id, $m.h.checked_picker.data_att_lbl)
			,cur_state_bool = (id.checked === true) ? false : true
			,new_state_bool = ""
			,parent_id = "";

		if(cur_state_bool === true)
		{
			parent_id = $m.id("checked_picker_list_" + group_id + "_off");
			new_state_bool = false;
		}
		else
		{
			parent_id = $m.id("checked_picker_list_" + group_id + "_on");
			new_state_bool = true;
		}
		
		id.checked = new_state_bool;
		$m.h.checked_picker.check_sets[group_id][in_id].state = new_state_bool;
		
		setTimeout(function()
		{
			var old_label = $m.tag.remove(label_id);
			parent_id.appendChild(old_label);
		}, $m.h.checked_picker.delay);
	}


	// $m.h.checked_picker.test(IN_EVENT)
	,test : function(in_event)
	{
		clearTimeout($m.h.checked_picker.timer);
		
		if($m.get_keycode(in_event) == 13)
		{
			return false;
		}
		else
		{
			return true;
		}
	}


	// $m.h.checked_picker.search(IN_PARENT_ID, IN_VALUE, IN_EVENT)
	,search : function(in_parent_id, in_value, in_event)
	{
		clearTimeout($m.h.checked_picker.timer);
		
		$m.h.checked_picker.timer = setTimeout(function()
		{
			$m.h.checked_picker.filter(in_parent_id, in_value);
		}, 750);
	}


	// $m.h.checked_picker.filter(IN_PARENT_ID, IN_VAL)
	,filter : function(in_parent_id, in_val)
	{
		var new_state = ""
			query = in_val.toLowerCase();
	
		for(var cb in $m.h.checked_picker.check_sets[in_parent_id])
		{
			new_state = ($m.h.checked_picker.check_sets[in_parent_id][cb].text.indexOf(query) == -1) ? "none" : "block";
			$m.h.checked_picker.check_sets[in_parent_id][cb].display = new_state;
			$m.id($m.h.checked_picker.check_sets[in_parent_id][cb].label).style.display = new_state;
		}
	}


	// $m.h.checked_picker.clear(IN_PARENT_ID)
	,clear : function(in_parent_id)
	{
		$m.id(in_parent_id + "_search").value = "";
		$m.h.checked_picker.filter(in_parent_id, "");
	}


	// $m.h.checked_picker.toggle_all(IN_PARENT_ID, IN_STATE)
	,toggle_all : function(in_parent_id, in_state)
	{
		$m.h.checked_picker.delay = 0;
		
		var old_state = "",
			checked_state = ""
			id_string = "checked_picker_list_" + in_parent_id;

		if(in_state === true)
		{
			old_state = false;
			checked_state = true;
			id_string += "_off";
		}
		else
		{
			old_state = true;
			checked_state = false;
			id_string += "_on";
		}

		for(var cb in $m.h.checked_picker.check_sets[in_parent_id])
		{
			if($m.h.checked_picker.check_sets[in_parent_id][cb].state == old_state && $m.h.checked_picker.check_sets[in_parent_id][cb].display == "block")
			{
				$m.id(cb).checked = checked_state;
				$m.h.checked_picker.exec(cb);
			}
		}

		$m.h.checked_picker.delay = 150;
	}
}


/**
 * $m.h.clear_onclick
 *
 */
$m.h.clear_onclick =
{
 	 name : "clear_onclick"
	,data_att : "clear_onclick"
	,data_att_form : "data-mjf_coc_form"

	// $m.h.clear_onclick.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}
	
	// $m.h.clear_onclick.exec()
	,exec : function(in_id)
	{
		var form_name = $m.attr.get(in_id, $m.h.clear_onclick.data_att_form)
			,form_id = $m.id(form_name)
			,field_type = ""
			,input_fields = $m.tags.get(form_name, "input");

		for(var i=0, i_len=input_fields.length; i < i_len; i++)
		{
			field_type = $m.attr.get(input_fields[i], "type");
		
			if(field_type == "checkbox" || field_type == "radio")
			{
				input_fields[i].checked = false;
			}
			else if(field_type == "submit" || field_type == "reset" || field_type == "button")
			{
				continue;
			}
			else
			{
				input_fields[i].value = "";
			}
		}
		
		var textarea_fields = $m.tags.get(form_name, "textarea");

		for(var i=0, ta_len=textarea_fields.length; i < ta_len; i++)
		{
			textarea_fields[i].value = "";
		}

		var select_fields = $m.tags.get(form_name, "select");

		for(var i=0, s_len=select_fields.length; i < s_len; i++)
		{
			select_fields[i].selectedIndex = -1;
		}
	}
}


/**
 * $m.h.clear_onfocus
 *
 */
$m.h.clear_onfocus =
{
 	 name : "clear_onfocus"
	,data_att : "clear_onfocus"

	// $m.h.clear_onfocus.construct()
	,construct : function()
	{
		var init_fields = []
			,good_fields = [];

		for(var i=0, f_len=$m.tags.form.length; i < f_len; i++)
		{
			init_fields = $m.attr.get_fields_with($m.tags.form[i], ['text','password','textarea'], $m.data_att, this.data_att);
			good_fields = good_fields.concat(init_fields);
		}

		$m.elements.bind(good_fields, this.data_att, "focus", this.do_focus);
		$m.elements.bind(good_fields, this.data_att, "blur", this.do_blur);
	}

	// $m.h.clear_onfocus.do_blur()
	,do_blur : function(in_id)
	{
		var current_field = $m.id(in_id);
		
		if($m.is.alive(current_field.value) === false)
		{
			current_field.value = current_field.defaultValue;
		}
	}

	// $m.h.clear_onfocus.do_focus()
	,do_focus : function(in_id)
	{
		var current_field = $m.id(in_id);

		if(current_field.defaultValue == current_field.value)
		{
			current_field.value = "";
		}
	}
}


/**
 * $m.h.clear_onload
 *
 */
$m.h.clear_onload =
{
 	 name : "clear_onload"
	,data_att : "clear_onload"

	// $m.h.clear_onload.construct()
	,construct : function()
	{
		setTimeout(function()
		{
			var good_fields = $m.attr.get_fields_with($m.body_id, ['text','password','textarea'], $m.data_att, $m.h.clear_onload.data_att);
			
			for(var i=0, len=good_fields.length; i < len; i++)
			{
				good_fields[i].value = "";
			}
		}, 500);
	}
}


/**
 * $m.h.deferred_load
 *
 */
$m.h.deferred_load =
{
 	 name : "deferred_load"
	,data_att : "deferred_load"
	,data_att_src : "data-mjf_deferred_load_src"

	// $m.h.deferred_load.construct()
	,construct : function()
	{
		var good_tags = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att)
			,tag_type = ""
			,deferred_src = "";

		for(var i=0, len=good_tags.length; i < len; i++)
		{
			tag_type = $m.tag.get_name(good_tags[i]);
			deferred_src = $m.attr.get(good_tags[i], this.data_att_src);
			
			if($m.is.alive(deferred_src) === false)
			{
				$m.de.throw_browser_error("Deferred Load: Missing data-mjf_deferred_load_src attribute for $m.h.deferred_load.construct() -- " + good_tags[i]);
				return false;
			}

			if(tag_type == "img" || tag_type == "iframe")
			{
				good_tags[i].src = deferred_src;
			}
		}
	}
}


/**
 * $m.h.click_enable_disable
 *
 */
$m.h.click_enable_disable =
{
	 name : "click_enable"

	,data_att : "click_enable_disable"

	,data_att_enable_id : "data-mjf_click_enable_id"
	,data_att_disable_id : "data-mjf_click_disable_id"
	,data_att_enable_disable_id : "data-mjf_click_enable_disable_id"

	,data_att_enable_group : "data-mjf_click_enable_group"
	,data_att_disable_group : "data-mjf_click_disable_group"
	,data_att_enable_disable_group : "data-mjf_click_enable_disable_group"


	// $m.h.click_enable_disable.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}

	// $m.h.click_enable_disable.exec()
	,exec : function(in_id)
	{
		var enable_id = $m.attr.get(in_id, $m.h.click_enable_disable.data_att_enable_id)
			,disable_id = $m.attr.get(in_id, $m.h.click_enable_disable.data_att_disable_id)
			,enable_disable_id = $m.attr.get(in_id, $m.h.click_enable_disable.data_att_enable_disable_id)
			,enable_group = $m.attr.get(in_id, $m.h.click_enable_disable.data_att_enable_group)
			,disable_group = $m.attr.get(in_id, $m.h.click_enable_disable.data_att_disable_group)
			,enable_disable_group = $m.attr.get(in_id, $m.h.click_enable_disable.data_att_enable_disable_group)
			,field_types = ['text','password','textarea','file','select','radio','checkbox'];

		if($m.is.alive(enable_id) === true)
		{
			$m.id(enable_id).disabled = false;
		}
		else if($m.is.alive(disable_id) === true)
		{
			$m.id(disable_id).disabled = true;
		}
		else if($m.is.alive(enable_disable_id) === true)
		{
			if($m.id(in_id).checked === true)
			{
				$m.id(enable_disable_id).disabled = false;
			}
			else
			{
				$m.id(enable_disable_id).disabled = true;
			}
		}
		else if($m.is.alive(enable_group) === true)
		{
			var group_flds = $m.attr.get_fields_with($m.body_id, field_types, $m.h.click_enable_disable.data_att_enable_group, enable_group);
			
			for(var i=0, len=group_flds.length; i < len; i++)
			{
				if($m.attr.get(group_flds[i], $m.data_att) === $m.h.click_enable_disable.data_att)
				{
					continue;
				}
				
				$m.id(group_flds[i]).disabled = false;
			}
		}
		else if($m.is.alive(disable_group) === true)
		{
			var group_flds = $m.attr.get_fields_with($m.body_id, field_types, $m.h.click_enable_disable.data_att_disable_group, disable_group);
			
			for(var i=0, len=group_flds.length; i < len; i++)
			{
				if($m.attr.get(group_flds[i], $m.data_att) === $m.h.click_enable_disable.data_att)
				{
					continue;
				}
				
				$m.id(group_flds[i]).disabled = true;
			}
		}
		else if($m.is.alive(enable_disable_group) === true)
		{
			var group_flds = $m.attr.get_fields_with($m.body_id, field_types, $m.h.click_enable_disable.data_att_enable_disable_group, enable_disable_group)
				,able_state = ($m.id(in_id).checked === true) ? false : true;

			for(var i=0, len=group_flds.length; i < len; i++)
			{
				if($m.attr.get(group_flds[i], $m.data_att) === $m.h.click_enable_disable.data_att)
				{
					continue;
				}
				
				$m.id(group_flds[i]).disabled = able_state;
			}
		}
	}
}


/**
 * $m.h.confirm_click
 *
 */
$m.h.confirm_click =
{
	 name : "confirm_click"
	,data_att : "confirm_click"

	// $m.h.confirm_click.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}

	// $m.h.confirm_click.exec()
	,exec : function(in_id)
	{
		return confirm($m.id(in_id).title);
	}
}


/**
 * $m.h.confirm_unload
 *
 */
$m.h.confirm_unload =
{
	 name : "confirm_unload"

	// $m.h.confirm_unload.construct(IN_WAND)
	,construct : function(in_wand)
	{
		if($m.is.alive($m.lang.core) === false)
		{
			$m.lang.core.msgs.navigate_away.general = "";
		}
	
		var confirm_msg = ($m.is.string(in_wand) === true) ? in_wand : $m.lang.core.msgs.navigate_away.general;
		
		$m.win.bind("beforeunload", function(in_event)
		{
			in_event = in_event || window.event;

			if(in_event)
			{
				in_event.returnValue = confirm_msg;
			}

			return confirm_msg;
		});
	}
}


/**
 * $m.h.copy_fields
 *
 */
$m.h.copy_fields =
{
	 name : "copy_fields"
	,data_att : "copy_fields"
	,data_att_on : "data-mjf_cf_on"
	,data_att_master : "data-mjf_cf_master"
	,data_att_slaves : "data-mjf_cf_slaves"
	,data_att_slave : "data-mjf_cf_slave"
	,data_att_m2s : "data-mjf_cf_m2s"
	,data_att_m2slave : "data-mjf_cf_m2slave"
	,data_att_only_empty : "data-mjf_cf_only_empty"
	,timeout : false
	

	// $m.h.copy_fields.construct()
	,construct : function()
	{
		var good_tags = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att);

		for(var k=0, len=good_tags.length; k < len; k++)
		{
			$m.elements.bind(good_tags[k], this.data_att, $m.attr.get(good_tags[k], this.data_att_on), this.exec);
		}
	}

	// $m.h.copy_fields.exec()
	,exec : function(in_id)
	{
		var id = $m.id(in_id), tmp_id = ""
			,clear_value = false
			,cf_master = $m.attr.get(in_id, $m.h.copy_fields.data_att_master)
			,cf_master_id = ($m.is.alive(cf_master) === true) ? $m.id(cf_master) : false
			,cf_slave = $m.attr.get(in_id, $m.h.copy_fields.data_att_slave)
			,cf_m2s = $m.attr.get(in_id, $m.h.copy_fields.data_att_m2s)
			,only_empty = "";

		if($m.tag.get_name(in_id) == "input" && $m.attr.get(in_id, "type") == "checkbox" && id.checked === false)
		{
			clear_value = true;
		}
		
		clearTimeout($m.h.copy_fields.timeout);

		$m.h.copy_fields.timeout = setTimeout(function()
		{
			if($m.is.alive(cf_slave) === true)
			{
				only_empty = $m.attr.get(cf_slave, $m.h.copy_fields.data_att_only_empty);
	
				if(only_empty == "true" && $m.is.alive($m.id(cf_slave).value) === true)
				{
					return;
				}
	
				if(clear_value === true)
				{
					$m.id(cf_slave).value = "";
				}
				else
				{
					$m.id(cf_slave).value = ($m.tag.get_name(in_id) == "select") ? cf_master_id[cf_master_id.selectedIndex].value : cf_master_id.value;
				}
			}
			else if($m.is.alive(cf_m2s) === true)
			{
				var set_tags = $m.attr.get_tags_with($m.tags.all, $m.h.copy_fields.data_att_m2s, cf_m2s)
					,tmp_master = ""
					,tmp_master_id = ""
					,tmp_slave = "";
				
				for(var k=0, len=set_tags.length; k < len; k++)
				{
					tmp_master = $m.attr.get(set_tags[k], "id");
	
					if(in_id == tmp_master)
					{
						continue;
					}
	
					tmp_master_id = $m.id(tmp_master);
					tmp_slave = $m.attr.get(tmp_master_id, $m.h.copy_fields.data_att_m2slave)
	
					only_empty = $m.attr.get(tmp_slave, $m.h.copy_fields.data_att_only_empty);
					
					if(only_empty == "true" && $m.is.alive($m.id(tmp_slave).value) === true)
					{
						continue;
					}				
					
					$m.id(tmp_slave).value = (clear_value === true) ? "" : tmp_master_id.value;
				}
			}
			else
			{
				var cf_set = $m.attr.get(in_id, $m.h.copy_fields.data_att_slaves)
					,set_tags = $m.attr.get_tags_with($m.tags.all, $m.h.copy_fields.data_att_slaves, cf_set);
	
				for(var k=0, len=set_tags.length; k < len; k++)
				{
					only_empty = $m.attr.get(set_tags[k], $m.h.copy_fields.data_att_only_empty);
	
					if(only_empty == "true" && $m.is.alive(set_tags[k].value) === true)
					{
						continue;
					}
				
					tmp_id = $m.attr.get(set_tags[k], "id");
					
					if(clear_value === true && cf_master != tmp_id)
					{
						$m.id(tmp_id).value = "";
					}
					else
					{
						if(cf_master_id === false)
						{
							$m.id(tmp_id).value = ($m.tag.get_name(in_id) == "select") ? id[id.selectedIndex].value : id.value;
						}
						else
						{
							$m.id(tmp_id).value = cf_master_id.value;
						}
					}
				}
			}
		}, 1000);
	}
}




/**
 * $m.h.copy_value_to_html
 *
 */
$m.h.copy_value_to_html =
{
	 name : "copy_value_to_html"
	,data_att : "copy_value_to_html"

	// $m.h.copy_value_to_html.construct()
	,construct : function()
	{
		var init_fields = $m.attr.get_fields_with("document", ['text','textarea'], $m.data_att, this.data_att);
		
		$m.elements.bind(init_fields, this.data_att, "keyup", this.exec);
		$m.elements.bind(init_fields, this.data_att, "change", this.exec);
	}

	// $m.h.copy_value_to_html.exec()
	,exec : function(in_id)
	
	{
		// Kathy add
		var defaultOut = {sponsorName:"the donor", impactEmail:"the donor email address"};
	
		if ($m.id(in_id).value.length > 0) {
			$m.id($m.attr.get(in_id, "data-mjf_cvth_id")).innerHTML = $m.id(in_id).value;
		} else {
			// display default value when there is no input present
			$m.id($m.attr.get(in_id, "data-mjf_cvth_id")).innerHTML = defaultOut[in_id];
		}
	}
}





/**
 * $m.h.4_class_update
 *
 */
$m.h.css_class_update =
{
	 name : "css_class_update"
	,data_att : "css_class_update"
	,data_att_ccu_id : "data-mjf_ccu_id"
	,data_att_ccu_exec : "data-mjf_ccu_exec"

	// $m.h.css_class_update.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}

	// $m.h.css_class_update.exec()
	,exec : function(in_id)
	{
		var ccu_id = $m.attr.get(in_id, $m.h.css_class_update.data_att_ccu_id)
			,ccu_exec = $m.attr.get(in_id, $m.h.css_class_update.data_att_ccu_exec)
			,exec_args = ccu_exec.match(/\((.+?)\)/);

		if($m.is.alive(exec_args[0]) === true)
		{
			if($m.tag.get_name(in_id) == "a")
			{
				$m.id(in_id).blur();
			}
		
			exec_args = exec_args[0].replace(/\(|\)|\s/g, "");

			if(ccu_exec.indexOf("add") === 0)
			{
				$m.css_class.add(ccu_id, exec_args);
			}
			else if(ccu_exec.indexOf("replace") === 0)
			{
				var replace_args = exec_args.split(",");
				$m.css_class.replace(ccu_id, replace_args[0], replace_args[1]);
			}
			else if(ccu_exec.indexOf("remove") === 0)
			{
				$m.css_class.remove(ccu_id, exec_args);
			}
		}
	}
}


/**
 * $m.h.dropdown_menu
 *
 */
$m.h.dropdown_menu =
{
	 name : "dropdown_menu"
	,data_att : "dropdown_menu"
	,uls_tag : {}
	,lis : []
	,timeout : false
	,timeout_setting : false

	// $m.h.dropdown_menu.construct()
	,construct : function(in_wand)
	{
		var good_uls = $m.attr.get_tags_with($m.tags.get($m.document, "ul"), $m.data_att, this.data_att)
			,all_lis = []
			,tmp_lis_id = ""
			,tmp_uls = "";

		this.uls_tag = {};
		this.lis = [];

		for(var i=0, uls_len=good_uls.length; i < uls_len; i++)
		{
			all_lis = $m.tags.get($m.attr.get(good_uls[i], "id"), "li");
			
			for(var j=0, lis_len=all_lis.length; j < lis_len; j++)
			{
				tmp_lis_id = $m.attr.get(all_lis[j], "id");
				this.lis.push(tmp_lis_id);
				
				if($m.is.alive(tmp_lis_id) === true)
				{
					tmp_uls = $m.tags.get(tmp_lis_id, "ul");
	
					if(tmp_uls[0] !== undefined)
					{
						this.uls_tag[tmp_lis_id] = tmp_uls[0];

						tmp_lis_id_obj = $m.id(tmp_lis_id);
						$m.attr.set(tmp_lis_id_obj,
						{
							 "class" : "ddm_li_off"
							,"data-mjf_ddm" : "off"
						});

						if($m.vd.is_mobile_touch === true)
						{
							tmp_lis_id_obj.setAttribute("onclick", "$m.h.dropdown_menu.show('" + tmp_lis_id + "')");
						}
						else
						{
							tmp_lis_id_obj.setAttribute("onmouseover", "$m.h.dropdown_menu.show('" + tmp_lis_id + "')");
							tmp_lis_id_obj.setAttribute("onmouseout", "$m.h.dropdown_menu.hide('" + tmp_lis_id + "')");
						}
					}
				}
			}
		}
		
		$m.element.attach($m.body_id, "touchstart", this.hide_all);
	}

	// $m.h.dropdown_menu.show()
	,show : function(in_id)
	{
		clearTimeout($m.h.dropdown_menu.timeout);

		var id = $m.id(in_id);

		var current_state = $m.attr.get(in_id, "data-mjf_ddm");
		
		for(var i in $m.h.dropdown_menu.uls_tag)
		{
			$m.attr.set(i, { "class" : "ddm_li_off" });
			$m.attr.set($m.h.dropdown_menu.uls_tag[i], { "class" : "" });
		}

		if($m.vd.is_mobile_touch === true)
		{
			if(current_state == "off")
			{
				$m.attr.set($m.h.dropdown_menu.uls_tag[in_id], { "class" : "ddm_ul_on" });
				$m.attr.set(id,
				{
					 "class" : "ddm_li_on"
					,"data-mjf_ddm" : "on"
				});
			}
			else
			{
				$m.attr.set($m.h.dropdown_menu.uls_tag[in_id], { "class" : "" });
				$m.attr.set(id,
				{
					 "class" : "ddm_li_off"
					,"data-mjf_ddm" : "off"
				});
			}
		}
		else
		{
			$m.attr.set(id, { "class" : "ddm_li_on" });
			$m.attr.set($m.h.dropdown_menu.uls_tag[in_id], { "class" : "ddm_ul_on" });
		}
	}

	// $m.h.dropdown_menu.hide()
	,hide : function(in_id)
	{
		var id_string = ($m.is.good_string(in_id) === true) ? in_id : this.id;
		
		$m.h.dropdown_menu.timeout = setTimeout(function()
		{
			$m.attr.set(id_string, { "class" : "ddm_li_off" });
			$m.attr.set(id_string, { "data-mjf_ddm" : "off" });
			$m.attr.set($m.h.dropdown_menu.uls_tag[id_string], { "class" : "" });

		}, 400);
	}

	// $m.h.dropdown_menu.hide_all()
	,hide_all : function(in_event)
	{
		for(var i=0, len=$m.h.dropdown_menu.lis.length; i < len; i++)
		{
			$m.h.dropdown_menu.hide($m.h.dropdown_menu.lis[i]);
		}
	}
}


/**
 * $m.h.dynamic_tabs
 *
 */
$m.h.dynamic_tabs =
{
	 name : "dynamic_tabs"
	,data_att : "dynamic_tabs"
	
	,dtabs : {}
	
	,dtab_anchors_id : []
	,dtab_anchors : []
	,dtab_groups : []

	// $m.h.dynamic_tabs.construct()
	,construct : function(in_wand)
	{
		var tab_set = $m.attr.get_tags_with($m.tags.a, $m.data_att, this.data_att)
			,good_anchors = []
			,tmp_id = ""
			,dtab_set = ""
			,this_shct = false
			,result_set = $m.storage.get.table($m.storage.db_wand + "dynamic_tabs")
			,tab_id = false;
		
		this.dtab_anchors_id = [];
		this.dtab_anchors = [];
		this.dtab_groups = [];

		for(var k=0, a_len=tab_set.length; k < a_len; k++)
		{
			if($m.attr.get(tab_set[k], "data-mjf_dtab_set") !== null)
			{
				dtab_set = $m.attr.get(tab_set[k], "data-mjf_dtab_set");

				if($m.is.array(this.dtab_anchors[dtab_set]) === true)
				{
					this.dtab_anchors[dtab_set].push($m.attr.get(tab_set[k], "id"));
				}
				else
				{
					this.dtab_anchors[dtab_set] = [];
					this.dtab_anchors[dtab_set].push($m.attr.get(tab_set[k], "id"));
				}

				good_anchors.push(tab_set[k]);
				this.dtab_anchors_id.push($m.attr.get(tab_set[k], "id"));
			}
		}

		if($m.is.array(in_wand) === true)
		{
			var autostart = false
				,delay = false;
			
			for(var i=0, len=in_wand.length; i < len; i++)
			{
				if($m.is.alive(in_wand[i].name) === false)
				{
					continue;
				}
				
				autostart = ($m.is.alive(in_wand[i].autostart) === true) ? in_wand[i].autostart : false;
				delay = ($m.is.alive(in_wand[i].delay) === true) ? in_wand[i].delay : 0;
			
				this.dtabs[in_wand[i].name] = {
					 "autostart" : autostart
					,"delay" : delay * 1000
					,"timeout" : false
					,"ids" : this.dtab_anchors[in_wand[i].name]
				};
			}
		}

		/**
		$m.shortcut.bind("Alt+1", function() { $m.h.dynamic_tabs.exec("tab_set_1_1_link"); });
		$m.shortcut.bind("Alt+2", function() { $m.h.dynamic_tabs.exec("tab_set_1_2_link"); });
		$m.shortcut.bind("Alt+3", function() { $m.h.dynamic_tabs.exec("tab_set_1_3_link"); });
		/**/
		
		for(var x=0, x_len=this.dtab_anchors_id.length; x < x_len; x++)
		{
			this_shct = $m.attr.get(this.dtab_anchors_id[x], "data-mjf_dtab_shct");

			if(this_shct !== null)
			{
				$m.shortcut.bind(this_shct, "$m.h.dynamic_tabs.exec('" + this.dtab_anchors_id[x] + "');");
			}
		}

		$m.elements.bind(good_anchors, this.data_att, "click", this.exec);

		for(var j=0, all_len=$m.tags.all.length; j < all_len; j++)
		{
			if($m.attr.has_value($m.tags.all[j], $m.data_att, this.data_att))
			{
				continue;
			}

			tmp_id = $m.attr.get($m.tags.all[j], "id");

			if(tmp_id !== null && $m.attr.get($m.tags.all[j], "data-mjf_dtab_set") !== null)
			{
				$m.animate.css.opacity(tmp_id);
				
				if($m.css_class.has(tmp_id, "display_block") === false)
				{
					$m.css_class.add(tmp_id, "mjf_hide");
				}

				dtab_set = $m.attr.get($m.tags.all[j], "data-mjf_dtab_set");
				if($m.is.array(this.dtab_groups[dtab_set]) === true)
				{
					this.dtab_groups[dtab_set].push(tmp_id);
				}
				else
				{
					this.dtab_groups[dtab_set] = [];
					this.dtab_groups[dtab_set].push(tmp_id);
				}
			}
		}

		if($m.is.alive(window.location.hash))
		{
			var possible_tab = window.location.hash.replace(/^#/, "");
			if($m.id(possible_tab) && $m.is.in_array(this.dtab_anchors_id, possible_tab) !== false)
			{
				this.exec(possible_tab);
				window.location = "#";
			}
		}
		
		if($m.is.alive(result_set) === true)
		{
			var record_id = ""
				,page_code = ""
				,window_code = $m.ut.friendly_url(window.location);
		
			for(var i in result_set)
			{
				record_id = $m.storage.get.page_tiny_id(i);
				page_code = $m.storage.get.page_code(i);
			
				if($m.is.alive(this.dtabs[record_id]) === true && $m.is.alive(this.dtabs[record_id].autostart) === true)
				{
					this.dtabs[record_id].autostart = false;
				}
			
				tab_id = $m.id(result_set[i].id);
				
				if($m.is.alive(tab_id) === true && window_code == page_code)
				{
					this.exec(result_set[i].id);
				}
			}
		}

		for(var i in this.dtabs)
		{
			if(this.dtabs[i].autostart === true)
			{
				this.cycle(i, 0);
			}
		}
	}

	// $m.h.dynamic_tabs.exec(in_id, in_event)
	,exec : function(in_id, in_event)
	{
		var tab_id = $m.id(in_id)
			,previous_tab = ""
			,ga_track = $m.attr.get(in_id, "data-mjf_ga_track")
			,current_tab_set = $m.attr.get(in_id, "data-mjf_dtab_set");

		if($m.is.alive(in_event) === true && $m.is.alive($m.h.dynamic_tabs.dtabs[current_tab_set]) === true)
		{
			clearTimeout($m.h.dynamic_tabs.dtabs[current_tab_set].timeout);
		}
		
		if($m.is.alive($m.h.dynamic_tabs.dtabs[current_tab_set]) === true)
		{
			for(var i=0, dt_len=$m.h.dynamic_tabs.dtabs[current_tab_set].ids.length; i < dt_len; i++)
			{
				$m.css_class.remove($m.h.dynamic_tabs.dtabs[current_tab_set].ids[i], "tab_link_active");
			}
		}
		else
		{
			for(var i=0, dt_len=$m.h.dynamic_tabs.dtab_anchors[current_tab_set].length; i < dt_len; i++)
			{
				$m.css_class.remove($m.h.dynamic_tabs.dtab_anchors[current_tab_set][i], "tab_link_active");
			}
		}

		$m.css_class.add(tab_id, "tab_link_active");
		tab_id.blur();

		for(var i=0, dtg_len=$m.h.dynamic_tabs.dtab_groups[current_tab_set].length; i < dtg_len; i++)
		{
			previous_tab = $m.h.dynamic_tabs.dtab_groups[current_tab_set][i];
			
			if($m.css_class.has(previous_tab, "mjf_hide") === false)
			{
				$m.css_class.add(previous_tab, "mjf_hide");
			}
			
			$m.css_class.remove(previous_tab, "display_block");
		}

		var current_tab = $m.attr.get(in_id, "data-mjf_dtab_id");
		$m.css_class.replace(current_tab, "mjf_hide", "display_block");

		if($m.attr.get(in_id, "data-mjf_dtab_cookie") === false || $m.attr.get(in_id, "data-mjf_dtab_cookie") != "false")
		{
			$m.storage.set($m.storage.db_wand + "dynamic_tabs", $m.storage.create.data_record(current_tab_set, "id", in_id));
		}
		else
		{
			$m.storage.remove($m.storage.db_wand + "dynamic_tabs", current_tab_set);
		}

		//window.location.hash = "#" + in_id;
		//window.location.href = window.location.href + "#" + in_id + "asdf";
		//$m.de.add_item("window.location.href = " + window.location.href);

		if(ga_track !== null)
		{
			$m.track.ga(
			{
				 "category" : "MJF Dynamic Tabs"
				,"action" : in_id + " " + "Click"
				,"label" : current_tab
			});
		}
	}

	// $m.h.dynamic_tabs.cycle(in_tab_set)
	,cycle : function(in_tab_set, in_cnt)
	{
		$m.h.dynamic_tabs.dtabs[in_tab_set].timeout = setTimeout(function()
		{
			$m.h.dynamic_tabs.exec($m.h.dynamic_tabs.dtabs[in_tab_set].ids[in_cnt]);
			
			in_cnt++;
			
			if(in_cnt >= $m.h.dynamic_tabs.dtabs[in_tab_set].ids.length)
			{
				in_cnt = 0;
			}

			$m.h.dynamic_tabs.cycle(in_tab_set, in_cnt);

		}, $m.h.dynamic_tabs.dtabs[in_tab_set].delay);	
	}
}


/**
 * $m.h.elastic_textareas -- http://stackoverflow.com/a/7875
 *
 */
$m.h.elastic_textareas =
{
	 name : "elastic_textareas"
	,data_att : "elastic_textareas"
	,data_att_max_h : "data-mjf_elastic_textareas_max_height"
	,is_resizing : false
	,resize_timer : false

	// $m.h.elastic_textareas.construct()
	,construct : function()
	{
		var textarea_fields = $m.attr.get_fields_with("document", ['textarea'], $m.data_att, this.data_att)
			,current_id = "";
		
		for(var i=0, len=textarea_fields.length; i < len; i++)
		{
			current_id = $m.attr.get(textarea_fields[i], "id");
			
			$m.style.set(current_id, { "overflow" : "hidden" });
			$m.style.set(current_id, { "resize" : "none" });

			$m.h.elastic_textareas.exec(current_id);
		}
	
		$m.elements.bind(textarea_fields, this.data_att, "keyup", this.test);
		$m.elements.bind(textarea_fields, this.data_att, "change", this.exec);
		
		$m.win.bind("resize", function()
		{
			$m.h.elastic_textareas.resize_all();
		});
	}
	

	// $m.h.elastic_textareas.resize_all(IN_ID, IN_EVENT)
	,resize_all : function(in_id, in_event)
	{
		clearTimeout($m.h.elastic_textareas.resize_timer);

		$m.h.elastic_textareas.resize_timer = setTimeout(function()
		{
			$m.h.elastic_textareas.construct();
			
		}, 500);
	}


	// $m.h.elastic_textareas.test(IN_ID, IN_EVENT)
	,test : function(in_id, in_event)
	{
		var keycode = $m.keycode.get(in_event);

		if((keycode >= 37 && keycode <= 40) || (keycode >= 16 && keycode <= 18))
		{
			return;
		}

		$m.h.elastic_textareas.exec(in_id);
	}


	// $m.h.elastic_textareas.exec(in_id)
	,exec : function(in_id)
	{
		var id = $m.id(in_id)
			,max_height = $m.attr.get(in_id, $m.h.elastic_textareas.exec.data_att_max_h)

		$m.vd.get_view_port();

		if($m.is.alive(max_height) === true)
		{
			if(max_height > $m.vd.visible_page_height)
			{
				max_height = $m.vd.visible_page_height - 30;
			}
		}
		else
		{
			max_height = $m.vd.visible_page_height - 30;
		}

		id.style.height = "30px";

		/*
		if(id.clientHeight == id.scrollHeight)
		{
			id.style.height = "30px";
		}
		*/

		var adjusted_height = id.clientHeight;

		if($m.is.alive(max_height) === false || max_height > adjusted_height)
		{
			adjusted_height = Math.max(id.scrollHeight, adjusted_height);

			if(max_height)
			{
				adjusted_height = Math.min(max_height, adjusted_height);
			}

			if(adjusted_height > id.clientHeight)
			{
				$m.style.set(in_id, { "height" : adjusted_height + "px" });
			}
		}
	}
}


/**
 * $m.h.empty_onclick
 *
 */
$m.h.empty_onclick =
{
	 name : "empty_onclick"
	,data_att : "empty_onclick"
	,data_att_empty_id : "data-mjf_empty_click_id"

	// $m.h.empty_onclick.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}

	// $m.h.empty_onclick.exec()
	,exec : function(in_id)
	{
		var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id;
		
		if($m.is.alive(id) === true)
		{
			var ele_to_empty = $m.attr.get(in_id, $m.h.empty_onclick.data_att_empty_id)
				,ele_to_empty_id = $m.is.good_id(ele_to_empty);
		
			if($m.is.alive(ele_to_empty_id) === true)
			{
				if($m.vd.is_mobile_touch === true)
				{
					ele_to_empty_id.innerHTML = "";
				}
				else
				{
					$m.animate.opaque(ele_to_empty_id, "down", 30, function()
					{
						ele_to_empty_id.innerHTML = "";
						ele_to_empty_id.style.opacity = 1;
					});
				}
			}
		}
	}
}


/**
 * $m.h.fire_event
 *
 */
$m.h.fire_event =
{
	 name : "fire_event"
	,data_att : "fire_event"
	,data_att_on : "data-mjf_fe_on"
	,data_att_exe : "data-mjf_fe_exe"
	,data_att_id : "data-mjf_fe_id"

	// $m.h.fire_event.construct()
	,construct : function()
	{
		var good_tags = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att);

		for(var k=0, len=good_tags.length; k < len; k++)
		{
			$m.elements.bind(good_tags[k], this.data_att, $m.attr.get(good_tags[k], this.data_att_on), this.exec);
		}
	}

	// $m.h.fire_event.exec(IN_ID)
	,exec : function(in_id)
	{
		var id = $m.id(in_id)
			,action = $m.attr.get(in_id, $m.h.fire_event.data_att_exe)
			,action_id = $m.attr.get(in_id, $m.h.fire_event.data_att_id);

		try
		{
			$m.id(action_id)[action]();
		}
		catch(err)
		{
			$m.de.throw_browser_error("$m.h.fire_event.exec(" + in_id + ") failed");
		}

		if($m.tag.get_name(in_id) == "a")
		{
			id.blur();
		}
	}
}


/**
 * $m.h.form_changed_alert
 *
 */
$m.h.form_changed_alert =
{
	 name : "form_changed_alert"
	,data_att : "form_changed_alert"
	,watch_forms : []

	// $m.h.form_changed_alert.construct()
	,construct : function()
	{
		var init_forms = $m.attr.get_tags_with($m.tags.form, $m.data_att, this.data_att);
	
		$m.elements.bind(init_forms, this.data_att, "submit", this.ignore);
		
		for(var i=0, f_len=init_forms.length; i < f_len; i++)
		{
			if($m.is.object(this.watch_forms[init_forms[i].id]) === false)
			{
				this.watch_forms[init_forms[i].id] = {};
			}
			
			this.watch_forms[init_forms[i].id].should_confirm = false;
		}

		$m.win.bind("beforeunload", function(in_event)
		{
			var form_changed = false
				,tmp_form = false
				,tmp_form_id = false
				,form_fields = false
				,current_select = false				
				,options = $m.tags.get($m.document, "option");

			for(var i=0, f_len=init_forms.length; i < f_len; i++)
			{
				tmp_form_id = init_forms[i].id;
			
				form_fields = $m.get_form_fields(init_forms[i], ['text','password','file','textarea','select','radio','checkbox']);

				for(var j=0, ff_len=form_fields.length; j < ff_len; j++)
				{
					if($m.is.alive(form_fields[j].type) === true && (form_fields[j].type == "radio" || form_fields[j].type == "checkbox"))
					{
						if(form_fields[j].defaultChecked != form_fields[j].checked)
						{
							form_changed = true;
						}
					}
					else if($m.tag.get_name(form_fields[j]) == 'select')
					{
						current_select = form_fields[j].selectedIndex;

						if(options[current_select].defaultSelected != options[current_select].selected)
						{
							form_changed = true;
						}
					}
					else
					{
						if(form_fields[j].defaultValue != form_fields[j].value)
						{
							form_changed = true;
						}
					}
				}
			}
			
			if(form_changed === true)
			{
				in_event = in_event || window.event;
			
				if(in_event)
				{
					in_event.returnValue = $m.lang.core.msgs.navigate_away.form;
				}
	
				return $m.lang.core.msgs.navigate_away.form;			
			}
		});
	}

	// $m.h.form_changed_alert.ignore_form(IN_ID)
	,ignore : function(in_id)
	{
		$m.h.form_changed_alert.watch_forms[in_id].should_confirm = false;
	}
}


/**
 * $m.h.form_required
 *
 */
$m.h.form_required =
{
	 name : "form_required"
	,data_att : "form_required"
	,required_att : "field_required"
	,required_msg_append : "_required_msg"
	,valid_forms : []

	// $m.h.form_required.construct(IN_WAND)
	,construct : function(in_wand)
	{
		var init_forms = $m.attr.get_tags_with($m.tags.form, $m.data_att, this.data_att);
		
		for(var i=0, f_len=init_forms.length; i < f_len; i++)
		{
			tmp_form_id = $m.attr.get(init_forms[i], "id");
			$m.attr.set(init_forms[i], { "name" : tmp_form_id });
			this.valid_forms[tmp_form_id] = true;
		}
	
		$m.elements.bind(init_forms, this.data_att, "submit", this.exec);
	}

	// $m.h.form_required.exec()
	,exec : function(in_id)
	{
		if($m.trick.darkroom == true && $m.is.in_array($m.t.darkroom.dr_forms, in_id) === false && $m.attr.get(in_id, "data-mjf_dr_hide") !== "false")
		{
			$m.t.darkroom.hide_all();
		}

		var tmp_form = $m.id(in_id)
			,valid_form = true
			,required_options = []
			,first_option = false
			,good_options = []
			,tmp_options = []
			,tmp_opt = ""
			,options_cnt = 0
			,field_parent = ""
			,first_parent = ""
			,first_parent_set = false
			,fld_required_msg = false
			,fld_required_msg_id = false;

		// Inputs and textareas
		var required_simple = $m.attr.get_fields_with(in_id, ['text','password','textarea','file'], $m.data_att, $m.h.form_required.required_att);

		for(var field in required_simple)
		{
			if($m.is.good_id(required_simple[field].id) === false)
			{
				continue;
			}
		
			field_parent = $m.attr.get(required_simple[field], "data-mjf_err_parent");

			if($m.is.alive(field_parent) === true)
			{
				$m.css_class.remove(field_parent, "field_error_parent");
			}
			else
			{
				$m.css_class.remove(required_simple[field].parentNode, "field_error_parent");
			}

			$m.css_class.remove(required_simple[field].id, "field_error");

			fld_required_msg = required_simple[field].id + $m.h.form_required.required_msg_append;
			fld_required_msg_id = $m.id(fld_required_msg);
			
			if($m.is.alive(fld_required_msg_id) === true)
			{
				$m.css_class.replace(fld_required_msg, "field_error_msg_on", "field_error_msg_off");
			}

			if(required_simple[field].type != "file")
			{
				required_simple[field].value = $m.trim(required_simple[field].value);
			}

			if($m.is.alive(required_simple[field].value) === false)
			{
				if(required_simple[field].disabled === false && required_simple[field].readOnly === false)
				{
					if(first_parent_set === false)
					{
						first_parent = required_simple[field].parentNode;
						first_parent_set = true;
					}

					if($m.is.alive(field_parent) === true)
					{
						$m.css_class.add(field_parent, "field_error_parent");
					}
					else
					{
						$m.css_class.add(required_simple[field].parentNode, "field_error_parent");
					}

					$m.css_class.add(required_simple[field].id, "field_error");
					valid_form = false;
					
					if($m.is.alive(fld_required_msg_id) === true)
					{
						$m.css_class.replace(fld_required_msg, "field_error_msg_off", "field_error_msg_on");
					}
				}
			}
		}
		
		// Select boxes
		var required_selects = $m.attr.get_fields_with(tmp_form, ['select'], $m.data_att, $m.h.form_required.required_att);

		for(field in required_selects)
		{
			if($m.is.good_id(required_selects[field].id) === false)
			{
				continue;
			}
		
			field_parent = $m.attr.get(required_selects[field], "data-mjf_err_parent");

			if($m.is.alive(field_parent) === true)
			{
				$m.css_class.remove(field_parent, "field_error_parent");
			}
			else
			{
				$m.css_class.remove(required_selects[field].parentNode, "field_error_parent");
			}

			$m.css_class.remove(required_selects[field].id, "field_error");

			fld_required_msg = required_selects[field].id + $m.h.form_required.required_msg_append;
			fld_required_msg_id = $m.id(fld_required_msg);

			if($m.is.alive(fld_required_msg_id) === true)
			{
				$m.css_class.replace(fld_required_msg, "field_error_msg_on", "field_error_msg_off");
			}

			if($m.is.alive(required_selects[field].value) === false)
			{
				if(required_selects[field].disabled === false)
				{
					if(first_parent_set === false)
					{
						first_parent = required_selects[field].parentNode;
						first_parent_set = true;
					}


					if($m.is.alive(field_parent) === true)
					{
						$m.css_class.add(field_parent, "field_error_parent");
					}
					else
					{
						$m.css_class.add(required_selects[field].parentNode, "field_error_parent");
					}

					$m.css_class.add(required_selects[field].id, "field_error");
					valid_form = false;

					if($m.is.alive(fld_required_msg_id) === true)
					{
						$m.css_class.replace(fld_required_msg, "field_error_msg_off", "field_error_msg_on");
					}
				}
			}
		}
		
		// Radio buttons and checkboxes
		tmp_options = $m.attr.get_fields_with(tmp_form, ['radio','checkbox'], $m.data_att, $m.h.form_required.required_att);

		for(var i=0, to_len=tmp_options.length; i < to_len; i++)
		{
			if(tmp_opt == $m.attr.get(tmp_options[i], "name"))
			{
				continue;
			}
			else
			{
				tmp_opt = $m.attr.get(tmp_options[i], "name");
			}

			required_options.push(document[in_id][$m.attr.get(tmp_options[i], "name")]);
		}

		for(field in required_options)
		{
			options_cnt = 0;
			
			if($m.is.alive(required_options[field].length) === true)
			{
				for(var i=0, og_len=required_options[field].length; i < og_len; i++)
				{
					if(required_options[field][i].checked === true)
					{
						options_cnt++;
					}
				}

				first_option = $m.id($m.attr.get(required_options[field][0], "id"));
			}
			else
			{
				if($m.is.good_id(required_options[field].id) === false)
				{
					continue;
				}
			
				first_option = $m.id($m.attr.get(required_options[field], "id"));
				
				if(first_option.checked === true)
				{
					options_cnt++;
				}
			}
			
			field_parent = $m.attr.get(first_option, "data-mjf_err_parent");

			fld_required_msg = first_option.id + $m.h.form_required.required_msg_append;
			fld_required_msg_id = $m.id(fld_required_msg);
			
			if($m.is.alive(fld_required_msg_id) === true)
			{
				$m.css_class.replace(fld_required_msg, "field_error_msg_on", "field_error_msg_off");
			}

			if(options_cnt == 0)
			{
				if(first_parent_set === false)
				{
					first_parent = first_option.parentNode;
					first_parent_set = true;
				}

				if($m.is.alive(field_parent) === true)
				{
					$m.css_class.add(field_parent, "field_error_parent");
				}
				else
				{
					$m.css_class.add(first_option.parentNode, "field_error_parent");
				}

				valid_form = false;
				
				if($m.is.alive(fld_required_msg_id) === true)
				{
					$m.css_class.replace(fld_required_msg, "field_error_msg_off", "field_error_msg_on");
				}
			}
			else
			{
				if($m.is.alive(field_parent) === true)
				{
					$m.css_class.remove(field_parent, "field_error_parent");
				}
				else
				{
					$m.css_class.remove(first_option.parentNode, "field_error_parent");
				}
			}
		}

		if(valid_form === true)
		{
			return true;
		}
		else
		{
			$m.smooth_scroll.construct(first_parent, 20);
			first_parent_set = false;
			return false;
		}
	}
}


/**
 * $m.h.frame_reload
 *
 */
$m.h.frame_reload =
{
	 name : "frame_reload"
	,data_att : "frame_reload"

	// $m.h.frame_reload.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}

	// $m.h.frame_reload.exec()
	,exec : function(in_id)
	{
		var id = $m.id(in_id)
			,frame_str = $m.attr.get(in_id, "data-mjf_frame_id")
			,frame_id = $m.id(frame_str);

		if($m.is.alive(frame_id) === true)
		{
			frame_id.src = frame_id.src;
		}
		else
		{
			$m.de.throw_browser_error("Frame ID \"" + frame_str + "\" does not exist!");
		}

		id.blur();
	}
}


/**
 * $m.h.ga_click_track
 *
 */
$m.h.ga_click_track =
{
	 name : "ga_click_track"
	,data_att : "ga_click_track"

	// $m.h.ga_click_track.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}

	// $m.h.ga_click_track.exec()
	,exec : function(in_id)
	{
		var id_href = $m.attr.get(in_id, "href");

		if($m.is.alive(id_href) === true)
		{
			$m.track.ga(
			{
				 "category" : "MJF GA Click"
				,"action" : in_id + " " + "Click"
				,"label" : id_href
			});
		}
	}
}


/**
 * $m.h.geo_get
 *
 */
$m.h.geo_get =
{
	 name : "geo_get"
	,data_att : "geo_get"

	// $m.h.geo_get.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}

	// $m.h.geo_get.exec()
	,exec : function(in_id)
	{
		var id = $m.id(in_id)
			,settings = $m.geo.init_settings(in_id);

		if($m.tag.get_name(in_id) == "a")
		{
			id.blur();
		}

		$m.geo.request.found_location = false;

		if($m.geo.send_request(settings, in_id) === false)
		{
			$m.geo.get_error("Error getting location.");
			return false;
		}
	}
}


/**
 * $m.h.html5_audio
 *
 */
$m.h.html5_audio =
{
	 name : "html5_audio"
	,data_att : "html5_audio"

	// $m.h.html5_audio.construct(IN_WAND)
	,construct : function(in_wand)
	{
		var audio_tags = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att)
			,type = ""
			,link = ""
			,update_id = ""
			,autoplay = ""
			,loop = "";

		for(var i=0, len=audio_tags.length; i < len; i++)
		{
			type = "audio/" + $m.attr.get(audio_tags[i], "data-mjf_h5a_type");
			link = $m.attr.get(audio_tags[i], "href");
			update_id = $m.attr.get(audio_tags[i], "data-mjf_h5a_id");

			autoplay = $m.attr.get(audio_tags[i], "data-mjf_h5a_autoplay");
			loop = $m.attr.get(audio_tags[i], "data-mjf_h5a_loop");
		
			if(document.createElement("audio").canPlayType && document.createElement("audio").canPlayType(type))
			{
				autoplay_html = ($m.is.alive(autoplay) === true && autoplay == 'true') ? 'autoplay="autoplay"' : '';
				loop_html = ($m.is.alive(loop) === true && loop == 'true') ? 'loop="loop"' : '';
				audio_html  = '<audio controls="controls" ' + autoplay_html + ' ' + loop_html + ' preload="auto"><source src="' + link + '" type="' + type + '"></audio>';
			}
			else
			{
				autoplay_html = ($m.is.alive(autoplay) === true && autoplay == 'true') ? 'true' : 'false';
				loop_html = ($m.is.alive(loop) === true || loop == 'true') ? 'true' : 'false';
				audio_html  = '<object width="300" height="50" type="' + type + '" classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,0,02,902"><param name="src" value="' + link + '"><param name="autoplay" value="' + autoplay_html + '"><param name="autoStart" value="' + autoplay_html + '"><param name="controller" value="true"><param name="loop" value="' + loop_html + '"><embed src="' + link + '" width="300" height="50" autostart="' + autoplay_html + '" controller="true" loop="' + loop_html + '"></object>';
			}

			$m.id(update_id).innerHTML = audio_html;
		}
	}
}





/**
 * $m.h.html5_video
 *
 */
$m.h.html5_video =
{
	 name : "html5_video"
	,data_att : "html5_video"
	,data_att_play : "html5_video_play"
	,data_att_pause : "html5_video_pause"
	,data_att_stop : "html5_video_stop"
	,data_att_seek : "html5_video_seek"
	,data_att_end : "html5_video_end"
	,uses_flash : false

	// $m.h.html5_video.construct()
	,construct : function(in_wand)
	{
		var video_options = {}
			,video_tags = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att)
			,video_start_html = ""
			,video_html = ""
			,video_stop_html = ""
			,dims;

		video_options.path = "";
		video_options.poster = "";

		video_options.flv = "";

		video_options.mp4 = "";
		video_options.good_mp4 = false;

		video_options.ogg = "";
		video_options.good_ogg = false;

		video_options.webm = "";
		video_options.good_webm = false;

		video_options.color_bg = "";
		video_options.color_fg = "";

		video_options.dims = "";
		video_options.js_callback = "";
		
		video_options.autoload = "";
		video_options.autoplay = "";

		video_options.update_id = "";
			
		video_options.does_video = $m.media.supports.video();
	
		for(var i=0, len=video_tags.length; i < len; i++)
		{
			video_options.path = $m.attr.get(video_tags[i], "data-mjf_h5v_path");
			
			video_options.poster = $m.attr.get(video_tags[i], "data-mjf_h5v_poster");
			video_options.poster_html = ($m.is.alive(video_options.poster) === true) ? 'poster="' + video_options.poster + '"' : '';
			
			video_options.flv = $m.attr.get(video_tags[i], "data-mjf_h5v_flv");

			video_options.color_bg =  $m.attr.get(video_tags[i], "data-mjf_h5v_color_bg");
			video_options.color_bg_html = ($m.is.alive(video_options.color_bg) === true) ? video_options.color_bg : '000000';

			video_options.color_fg = $m.attr.get(video_tags[i], "data-mjf_h5v_color_fg");
			video_options.color_fg_html = ($m.is.alive(video_options.color_fg) === true) ? video_options.color_fg : '991517';

			dims = $m.attr.get(video_tags[i], "data-mjf_h5v_dims").split("x");
			video_options.video_width = parseInt(dims[0]);
			video_options.video_height = parseInt(dims[1]);

			video_options.js_callback = $m.attr.get(video_tags[i], "data-mjf_h5v_js_callback");

			video_options.autoload = $m.attr.get(video_tags[i], "data-mjf_h5v_autoload");
			video_options.autoload_html = ($m.is.alive(video_options.autoload) === null || video_options.autoload == 'false') ? 'preload="meta"' : 'preload="auto"';

			video_options.autoplay = $m.attr.get(video_tags[i], "data-mjf_h5v_autoplay");
			video_options.autoplay_html = ($m.is.alive(video_options.autoplay) === true && video_options.autoplay == 'true') ? 'autoplay="autoplay"' : '';

			video_options.update_id = $m.attr.get(video_tags[i], "id");
			
			if(!video_options.does_video)
			{
				video_html = $m.h.html5_video.get_flv_html(video_options);
			}
			else
			{
				var sources_html = [];
				
				video_options.mp4 = $m.attr.get(video_tags[i], "data-mjf_h5v_mp4");

				if($m.is.alive(video_options.mp4) === true)
				{
					var test_h264 = $m.media.supports.h264();
					//$m.de.add_item("test_h264 = '" + test_h264 + "'");
					//$m.de.get_type("test_h264", test_h264);

					if($m.is.alive(test_h264) === true)
					{
						sources_html.push('<source src="' + video_options.path + video_options.mp4 + '" type="video/mp4"></source>');
						video_options.good_mp4 = true;
						//$m.de.add_item("yes for h264!");
					}
					else
					{
						//$m.de.add_item("no for h264!");
					}
				}

				video_options.ogg = $m.attr.get(video_tags[i], "data-mjf_h5v_ogg");

				if($m.is.alive(video_options.ogg) === true)
				{
					var test_theora = $m.media.supports.theora();
					//$m.de.add_item("test_theora = '" + test_theora + "'");
					//$m.de.get_type("test_theora", test_theora);
				
					if($m.is.alive(test_theora) === true)
					{
						sources_html.push('<source src="' + video_options.path + video_options.ogg + '" type="video/ogg"></source>');
						video_options.good_ogg = true;
						//$m.de.add_item("yes for ogg!");
					}
					else
					{
						//$m.de.add_item("no for ogg!");
					}
				}

				video_options.webm = $m.attr.get(video_tags[i], "data-mjf_h5v_webm");

				if($m.is.alive(video_options.webm) === true)
				{
					var test_vorbis = $m.media.supports.vorbis();
					//$m.de.add_item("test_vorbis = '" + test_vorbis + "'");
					//$m.de.get_type("test_vorbis", test_vorbis);

					if($m.is.alive(test_vorbis) === true)
					{
						sources_html.push('<source src="' + video_options.path + video_options.webm + '" type="video/webm"></source>');
						video_options.good_webm = true;
						//$m.de.add_item("yes for vorbis!");
					}
					else
					{
						//$m.de.add_item("no for vorbis!");
					}
				}
				
				if(video_options.good_mp4 === true || video_options.good_ogg === true || video_options.good_webm === true)
				{
					var vid_width = ($m.is.alive(video_options.video_width) === true) ? 'width="' + video_options.video_width + '"' : ''; 
					var vid_height = ($m.is.alive(video_options.video_height) === true) ? 'height="' + video_options.video_height + '"' : ''; 
				
					video_start_html = '<video ' + vid_width + ' ' + vid_height + ' controls="controls" ' + video_options.autoplay_html + ' ' + video_options.autoload_html + ' ' + video_options.poster_html + 'id="' + video_options.update_id + '_video">';
					video_stop_html = '</video>';
					
					for(var j=0, slen=sources_html.length; j < slen; j++)
					{
						video_html += sources_html[j];
					}
					
					$found_support = true;
				}
				else
				{
					$found_support = false;
				}
				
				if($found_support === false && $m.is.alive(video_options.flv) === true)
				{
					video_html += $m.h.html5_video.get_flv_html(video_options);
				}
			}

			$m.id(video_options.update_id).innerHTML = video_start_html + video_html + video_stop_html;
			
			if(video_options.js_callback !== null && (video_options.good_mp4 === true || video_options.good_ogg === true || video_options.good_webm === true))
			{
				$m.win.bind("load", function()
				{
					document.getElementById(video_options.update_id + "_video").addEventListener('ended', function()
					{
						$m.ev.all(video_options.js_callback);
					}, false);
				});
			}
		}
		
		$m.elements.bind($m.tags.all, this.data_att_play, "click", this.play);

		$m.elements.bind($m.tags.all, this.data_att_pause, "click", this.pause);
		$m.elements.bind($m.tags.all, this.data_att_stop, "click", this.stop);
		$m.elements.bind($m.tags.all, this.data_att_seek, "click", this.seek);
		$m.elements.bind($m.tags.all, this.data_att_end, "click", this.end);
	}


	// $m.h.html5_video.get_flv_html()
	,get_flv_html : function(in_options)
	{
		if($m.is.alive(in_options.flv) === true)
		{
			$m.h.html5_video.uses_flash = true;
		
			var swf_folder = $m.config.basedir + "flash/"
				,autoload_html = ($m.is.alive(in_options.autoload) === null || in_options.autoload == 'false') ? 'off' : 'on'
				,autoplay_html = ($m.is.alive(in_options.autoplay) === true && in_options.autoplay == 'true') ? 'on' : 'off'
				,js_callback_html = ($m.is.alive(in_options.js_callback) === true) ? 'on' : 'off'
				,swf_link = swf_folder + 'player_flv.swf?movie=' + in_options.path + in_options.flv + '&amp;bgcolor=0x' + in_options.color_bg_html + '&amp;fgcolor=0x' + in_options.color_fg_html + '&amp;volume=100&amp;autoplay=' + autoplay_html + '&amp;autoload=' + autoload_html + '&amp;mute=off&amp;autorewind=on&amp;js_callback=' + js_callback_html;

			in_options.video_height = in_options.video_height + 40;

			video_html  = '<object width="' + in_options.video_width + '" height="' + in_options.video_height + '"';
			
			if($m.vd.is_msie === true)
			{
				video_html += 'type="application/x-shockwave-flash"';
			}
			
			video_html += ' id="' + in_options.update_id + '_video"><param name="movie" value="' + swf_link + '"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always">';
			
			if($m.vd.is_msie === false)
			{
				video_html += '<embed name="' + in_options.update_id + '_video" src="' + swf_link + '" width="' + in_options.video_width + '" height="' + in_options.video_height + '" allowFullScreen="true" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
			}
			
			video_html += '</object>';

			if(in_options.js_callback !== null)
			{
				player_callback = function()
				{
					$m.ev.all(in_options.js_callback);
				}
			}
		}
		else
		{
			video_html = '<p><img src="' + $m.config.basedir + 'images/misc/broken_video.png" alt="Darn, unable to load this video." width="300" height="240"></p>';
		}

		return video_html;
	}


	// $m.h.html5_video.play()
	,play : function(in_id)
	{
		var video_name = $m.attr.get(in_id, "data-mjf_h5v_video_id") + "_video";
		
		setTimeout(function()
		{
			if($m.h.html5_video.uses_flash === true)
			{
				var video_obj = $m.get_flash_object(video_name)
					,call_result = video_obj.play_video();
	
				///$m.de.add_item("call_result = " + call_result);
			}
			else
			{
				$m.id(video_name).play();
			}
		}, 1000);
		

	}

	// $m.h.html5_video.pause()
	,pause : function(in_id)
	{
		var video_name = $m.attr.get(in_id, "data-mjf_h5v_video_id") + "_video";
		
		if($m.h.html5_video.uses_flash === true)
		{
			var video_obj = $m.get_flash_object(video_name)
				,call_result = video_obj.pause_video();

			///$m.de.add_item("call_result = " + call_result);
		}
		else
		{
			$m.id(video_name).pause();
		}
	}

	// $m.h.html5_video.stop()
	,stop : function(in_id)
	{
		var video_name = $m.attr.get(in_id, "data-mjf_h5v_video_id") + "_video";
		
		if($m.h.html5_video.uses_flash === true)
		{
			var video_obj = $m.get_flash_object(video_name)
				,call_result = video_obj.stop_video();

			///$m.de.add_item("call_result = " + call_result);
		}
		else
		{
			var video_obj = $m.id(video_name);
			video_obj.pause();
			video_obj.currentTime = 0;
		}
	}

	// $m.h.html5_video.seek()
	,seek : function(in_id)
	{
		var video_name = $m.attr.get(in_id, "data-mjf_h5v_video_id") + "_video"
			,seek_time = parseFloat($m.attr.get(in_id, "data-mjf_h5v_seek_time"));
		
		if($m.h.html5_video.uses_flash === true)
		{
			var video_obj = $m.get_flash_object(video_name)
				,call_result = video_obj.seek_video(seek_time);

			///$m.de.add_item("call_result = " + call_result);
		}
		else
		{
			$m.id(video_name).currentTime = seek_time;
		}
	}

	// $m.h.html5_video.end()
	,end : function(in_id)
	{
		var video_name = $m.attr.get(in_id, "data-mjf_h5v_video_id") + "_video";
		
		if($m.h.html5_video.uses_flash === true)
		{
			var video_obj = $m.get_flash_object(video_name)
				,call_result = video_obj.end_video();

			///$m.de.add_item("call_result = " + call_result);
		}
		else
		{
			var video_obj = $m.id(video_name);
			video_obj.currentTime = video_obj.duration;
		}
	}
}


/**
 * $m.h.img_rollovers
 *
 */
$m.h.img_rollovers =
{
	 name : "img_rollovers"
	,data_att : "img_rollovers"
	,increments : 15

	// $m.h.img_rollovers.construct()
	,construct : function()
	{
		if($m.vd.is_mobile_touch === true)
		{
			return;
		}
		
		var id = ""
			,cache_img = "";
		
		for(var i=0, all_len=$m.tags.img.length; i < all_len; i++)
		{
			if($m.attr.has_value($m.tags.img[i], $m.data_att, this.data_att))
			{
				id = $m.id($m.tags.img[i]);
				cache_img = new Image();
				cache_img.src = $m.attr.get(id, "data-mjf_img_on");

				$m.attr.set(id, { "data-mjf_img_off" : $m.tags.img[i].src });
			}
		}

		$m.elements.bind($m.tags.img, this.data_att, "mouseover", this.do_rollover);
		$m.elements.bind($m.tags.img, this.data_att, "mouseout", this.undo_rollover);
	}

	// $m.h.img_rollovers.do_rollover()
	,do_rollover : function(in_id)
	{
		$m.id(in_id).src = $m.attr.get(in_id, "data-mjf_img_on");
	}

	// $m.h.img_rollovers.undo_rollover()
	,undo_rollover : function(in_id)
	{
		$m.id(in_id).src = $m.attr.get(in_id, "data-mjf_img_off");
	}
}


/**
 * $m.h.img_slideshow
 *
 */
$m.h.img_slideshow =
{
	 name : "img_slideshow"
	,data_att : false
	,img_folder : false
	,imgs : []
	,img_id : {}
	,cnt : 0
	,delay : false
	,animate : false
	,increments : 25
	,timeout: false

	// $m.h.img_slideshow.construct()
	,construct : function(in_wand)
	{
		$m.h.img_slideshow.click.construct();
		
		this.imgs = in_wand.imgs;
		this.img_id = $m.id(in_wand.img_id);
		this.img_folder = this.img_id.src.slice(0, this.img_id.src.lastIndexOf("/") + 1);
		this.delay = in_wand.delay * 1000;
		this.animate = in_wand.animate;

		var cache_img;
		
		for(var i=0, len=this.imgs.length; i < len; i++)
		{
			cache_img = new Image();
			cache_img.src = this.img_folder + this.imgs[i];
		}

		this.start();
	}

	// $m.h.img_slideshow.start()
	,start : function()
	{
		this.timeout = setTimeout("$m.h.img_slideshow.cycle()", $m.h.img_slideshow.delay);
	}
	
	// $m.h.img_slideshow.cycle()
	,cycle : function()
	{
		$m.h.img_slideshow.cnt++;

		if($m.h.img_slideshow.cnt == $m.h.img_slideshow.imgs.length)
		{
			$m.h.img_slideshow.cnt = 0;
		}

		if($m.h.img_slideshow.animate === true)
		{
			$m.animate.opaque($m.h.img_slideshow.img_id, "down", $m.h.img_slideshow.increments, function()
			{
				$m.h.img_slideshow.img_id.src = $m.h.img_slideshow.img_folder + $m.h.img_slideshow.imgs[$m.h.img_slideshow.cnt];
				$m.animate.opaque($m.h.img_slideshow.img_id, "up", $m.h.img_slideshow.increments);
			});
		}
		else
		{
			$m.h.img_slideshow.img_id.src = $m.h.img_slideshow.img_folder + $m.h.img_slideshow.imgs[$m.h.img_slideshow.cnt];
		}

		$m.h.img_slideshow.timeout = setTimeout(function()
		{
			$m.h.img_slideshow.cycle();
		}, $m.h.img_slideshow.delay);
	}

	// $m.h.img_slideshow.click
	,click :
	{
		 name : "click"
		,data_att : "img_slideshow_click"

		// $m.h.img_slideshow.click.construct()
		,construct : function()
		{
			$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
		}
		
		// $m.h.img_slideshow.click.exec()
		,exec : function(in_id)
		{
			if($m.h.img_slideshow.animate === true)
			{
				$m.animate.opaque($m.h.img_slideshow.img_id, "down", $m.h.img_slideshow.increments, function()
				{
					$m.h.img_slideshow.img_id.src = $m.h.img_slideshow.img_folder + in_id;
					$m.animate.opaque($m.h.img_slideshow.img_id, "up", $m.h.img_slideshow.increments);
				});
			}
			else
			{
				$m.h.img_slideshow.img_id.src = $m.h.img_slideshow.img_folder + in_id;
			}

			clearTimeout($m.h.img_slideshow.timeout);
		}
	}
}


/**
 * $m.h.lightswitch
 *
 */
$m.h.lightswitch =
{
	 name : "lightswitch"
	,data_att : "lightswitch"
	,single_clickers : []
	,css :
	{
		 block : "lightswitch_block"
		,none : "lightswitch_none"
	}

	// $m.h.lightswitch.construct()
	,construct : function()
	{
		var clickers = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att)
			,toggle_all = ""
			,toggle_all_clickers = []
			,toggle_all_use_css = ""
			,current_id = ""
			,tmp_id = ""
			,tmp_ids = []
			,content_id = ""
			,is_checkbox = false
			,result_set = $m.storage.get.table($m.storage.db_wand + "lightswitch")
			,record_id = ""
			,switch_id = false
			,page_code = ""
			,window_code = $m.ut.friendly_url(window.location);
		
		this.single_clickers = [];
		
		if($m.is.alive(result_set) === true && $m.ajax_init === false)
		{
			for(var i in result_set)
			{
				record_id = $m.storage.get.page_tiny_id(i);
				switch_id = $m.id(record_id);
				page_code = $m.storage.get.page_code(i);
				
				if($m.is.alive(switch_id) === true && window_code == page_code)
				{
					$m.attr.set(record_id, { "data-mjf_lswitch_state" : result_set[i].state });
					tmp_ids.push(record_id);
				}
			}
		}

		for(var i=0, len=clickers.length; i < len; i++)
		{
			toggle_all = $m.attr.get(clickers[i], "data-mjf_lswitch_all");
			
			if(toggle_all == "collapse")
			{
				toggle_all_use_css = $m.attr.get(clickers[i], "data-mjf_lswitch_use_css");
				
				if(!($m.is.alive(toggle_all_use_css) && toggle_all_use_css == "false"))
				{
					$m.css_class.add(clickers[i], this.css.block);
				}
				
				toggle_all_clickers.push(clickers[i]);
				continue;
			}
			else if(toggle_all == "expand")
			{
				toggle_all_use_css = $m.attr.get(clickers[i], "data-mjf_lswitch_use_css");
			
				if(!($m.is.alive(toggle_all_use_css) && toggle_all_use_css == "false"))
				{
					$m.css_class.add(clickers[i], this.css.none);
				}

				toggle_all_clickers.push(clickers[i]);
				continue;
			}
			else
			{
				this.single_clickers.push(clickers[i]);
			}

			tmp_id = $m.attr.get(clickers[i], "id");
			
			current_id = $m.id(tmp_id);
			current_id_use_css = $m.attr.get(current_id, "data-mjf_lswitch_use_css");

			is_checkbox = ($m.tag.get_name(current_id) == "input" && $m.attr.get(current_id, "type") == "checkbox");
			
			if(is_checkbox === true)
			{
				current_id_use_css = "false";
				$m.attr.set(tmp_id, { "data-mjf_lswitch_use_css" : "false" });
			}
			
			if($m.is.in_array(tmp_ids, tmp_id) === false)
			{
				content_id = $m.attr.get(current_id, "data-mjf_lswitch_id");

				if($m.css_class.has(content_id, "display_block"))
				{
					if(is_checkbox === true)
					{
						current_id.checked = true;
					}

					if(!($m.is.alive(current_id_use_css) && current_id_use_css == "false"))
					{
						$m.css_class.add(tmp_id, this.css.block);
					}

					$m.attr.set(tmp_id, { "data-mjf_lswitch_state" : "block" });
				}
				else if($m.css_class.has(content_id, "display_inline"))
				{
					if(!($m.is.alive(current_id_use_css) && current_id_use_css == "false"))
					{
						$m.css_class.add(tmp_id, this.css.block);
					}

					$m.attr.set(tmp_id, { "data-mjf_lswitch_state" : "inline" });
				}
				else if($m.css_class.has(content_id, "table-row"))
				{
					if(!($m.is.alive(current_id_use_css) && current_id_use_css == "false"))
					{
						$m.css_class.add(tmp_id, this.css.block);
					}

					$m.attr.set(tmp_id, { "data-mjf_lswitch_state" : "table-row" });
				}
				else
				{
					if(is_checkbox === true)
					{
						current_id.checked = false;
					}

					if(!($m.is.alive(current_id_use_css) && current_id_use_css == "false"))
					{
						$m.css_class.add(tmp_id, this.css.none);
					}

					$m.attr.set(current_id, { "data-mjf_lswitch_state" : "none" });
				}
			}
			else
			{
				$m.h.lightswitch.update(tmp_id, $m.attr.get(current_id, "data-mjf_lswitch_state"), false);
			}
		}

		$m.elements.bind(this.single_clickers, this.data_att, "click", this.exec);
		$m.elements.bind(toggle_all_clickers, this.data_att, "click", this.toggle_all);
	}

	// $m.h.lightswitch.toggle_all(IN_ID)
	,toggle_all : function(in_id)
	{
		var requested_state = $m.attr.get(in_id, "data-mjf_lswitch_all")
			,set_state = ""
			,ls_display = "";
		
		switch(requested_state)
		{
			case "collapse":
				$m.css_class.replace(in_id, $m.h.lightswitch.css.block, $m.h.lightswitch.css.none);
				$m.attr.set(in_id, { "data-mjf_lswitch_all" : "expand" });
				set_state = "none";
				break;
			case "expand":
				$m.css_class.replace(in_id, $m.h.lightswitch.css.none, $m.h.lightswitch.css.block);
				$m.attr.set(in_id, { "data-mjf_lswitch_all" : "collapse" });
				set_state = "block";
				break;
		}
		
		for(var i=0, len=$m.h.lightswitch.single_clickers.length; i < len; i++)
		{
			if(set_state == "block")
			{
				ls_display = $m.attr.get($m.h.lightswitch.single_clickers[i], "data-mjf_lswitch_display");
				
				if(ls_display == "inline")
				{
					set_state = "inline";
				}
				else if(ls_display == "table-row")
				{
					set_state = "table-row";
				}
			}

			$m.h.lightswitch.update($m.h.lightswitch.single_clickers[i], set_state, true);
		}
	}

	// $m.h.lightswitch.exec(IN_ID)
	,exec : function(in_id)
	{
		var id = $m.id(in_id)
			,current_state = $m.attr.get(in_id, "data-mjf_lswitch_state")
			,content_id = $m.attr.get(in_id, "data-mjf_lswitch_id")
			,lswitch_display = $m.attr.get(in_id, "data-mjf_lswitch_display")
			,css_display = (lswitch_display === null) ? "" : lswitch_display;

		if(current_state == "none")
		{
			switch(css_display)
			{
				case "":
				case "block":
					new_state = "block";
					break;

				case "inline":
					new_state = "inline";
					break;

				case "table-row":
					new_state = "table-row";
					break;

				default:
					new_state = "none";
					break;
			}
		}
		else
		{
			new_state = "none";
		}

		if($m.tag.get_name(in_id) == "a")
		{
			id.blur();
		}

		$m.h.lightswitch.update(in_id, new_state, true);
		$m.attr.set(in_id, { "data-mjf_lswitch_state" : new_state });
	}

	// $m.h.lightswitch.update(IN_ID, DESIRED_STATE)
	,update : function(in_id, in_state, in_animate)
	{
		var id = $m.id("in_id")
			,id_use_css = $m.attr.get(in_id, "data-mjf_lswitch_use_css")
			,content_id = $m.attr.get(in_id, "data-mjf_lswitch_id")
			,animate_increments = $m.attr.get(in_id, "data-mjf_lswitch_animate_increments")
			,content_id_obj = $m.id(content_id);

		if($m.is.alive(animate_increments) === false)
		{
			animate_increments = 5;
		}
		
		if(animate_increments == 0 || $m.vd.is_mobile_touch === true)
		{
			in_animate = false;
		}

		switch(in_state)
		{
			case "none":
				if(id_use_css === null || id_use_css != "false")
				{
					$m.css_class.replace(in_id, $m.h.lightswitch.css.block, $m.h.lightswitch.css.none);
				}

				if($m.css_class.has(content_id, "display_block") === true)
				{
					$m.css_class.replace(content_id, "overflow_auto", "overflow_hidden");
					
					if(in_animate === true && $m.config.animations.use === true)
					{
						var animate_lightswitch = new $m.animation(content_id_obj.offsetHeight, 0);
						animate_lightswitch.exec(
							 animate_increments
							,function(position)
							{
								content_id_obj.style.height = position + "px";
							}
							,function()
							{
								content_id_obj.style.height = 0;
								$m.css_class.replace(content_id, "display_block", "display_none");
							}
						);
					}
					else
					{
						content_id_obj.style.height = 0;
						$m.css_class.replace(content_id, "display_block", "display_none");
					}
				}
				else if($m.css_class.has(content_id, "display_table-row") === true)
				{
					$m.css_class.replace(content_id, "display_table-row", "display_none");
				}
				else
				{
					$m.css_class.replace(content_id, "display_inline", "display_none");
				}

				break;


			case "block":
				if(id_use_css === null || id_use_css != "false")
				{
					$m.css_class.replace(in_id, $m.h.lightswitch.css.none, $m.h.lightswitch.css.block);
				}

				if(in_animate === true && $m.config.animations.use === true)
				{
					$m.css_class.replace(content_id, "overflow_auto", "overflow_hidden");
					content_id_obj.style.height = "auto";

					$m.css_class.replace(content_id, "display_none", "display_block");

					var animate_lightswitch = new $m.animation(0, content_id_obj.offsetHeight);
					content_id_obj.style.height = 0;
					
					animate_lightswitch.exec(
						 animate_increments
						,function(position)
						{
							content_id_obj.style.height = position + "px";
						}
						,function()
						{
							$m.css_class.remove(content_id, "overflow_hidden");
							content_id_obj.style.height = "auto";
						}
					);
				}
				else
				{
					content_id_obj.style.height = "auto";
					$m.css_class.replace(content_id, "display_none", "display_block");
				}

				break;

			case "inline":
				if(id_use_css === null || id_use_css != "false")
				{
					$m.css_class.replace(in_id, $m.h.lightswitch.css.none, $m.h.lightswitch.css.block);
				}

				$m.css_class.replace(content_id, "display_none", "display_inline");
				break;

			case "table-row":
				if(id_use_css === null || id_use_css != "false")
				{
					$m.css_class.replace(in_id, $m.h.lightswitch.css.none, $m.h.lightswitch.css.block);
				}

				$m.css_class.replace(content_id, "display_none", "display_table-row");
				break;
		}

		var lswitch_cookie = $m.attr.get(in_id, "data-mjf_lswitch_cookie");

		if(lswitch_cookie === null || lswitch_cookie != "false")
		{
			$m.storage.set($m.storage.db_wand + "lightswitch", $m.storage.create.data_record(in_id, "state", in_state));
		}
		else
		{
			$m.storage.remove($m.storage.db_wand + "lightswitch", in_id);
		}
	}
}


/**
 * $m.h.open_new_win
 *
 */
$m.h.open_new_win =
{
	 name : "open_new_win"
	,data_att : "open_new_win"

	// $m.h.open_new_win.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}

	// $m.h.open_new_win.exec()
	,exec : function(in_id)
	{
		var id = $m.id(in_id)
			,new_win_name = "new_win_" + in_id, new_window
			,id_dim = $m.attr.get(in_id, "data-mjf_win_dim")
			,id_href = $m.attr.get(in_id, "href")
			,ga_track = $m.attr.get(in_id, "data-mjf_ga_track");

		if($m.is.alive(id_href) === true && ga_track !== null)
		{
			$m.track.ga(
			{
				 "category" : "MJF Open New Win"
				,"action" : in_id + " " + "Click"
				,"label" : id_href
			});
		}

		if(id_dim == "normal")
		{
			new_window = window.open(id_href, new_win_name);
		}
		else
		{
			var win_dims = id_dim.split("x")
				,window_options = "toolbar=no,location=no,resizable=yes,scrollbars=yes,menubar=no,width=" + win_dims[0] + ",height=" + win_dims[1];

			new_window = window.open(id_href, new_win_name, window_options);
		}

		id.blur();
	}
}


/**
 * $m.h.password_strength_checker
 *
 */
$m.h.password_strength_checker =
{
	 name : "password_strength_checker"
	,data_att : "password_strength_checker"
	,timer : false

	// $m.h.password_strength_checker.construct()
	,construct : function()
	{
		var input_fields = $m.attr.get_fields_with($m.body_id, ['text','password'], $m.data_att, this.data_att);

		for(var j=0, len=input_fields.length; j < len; j++)
		{
			if($m.attr.has_value(input_fields[j], "data-mjf_pass_check_has", "true") === false)
			{
				$m.tag.insert_after(input_fields[j], $m.tag.init("span", { "id" : input_fields[j].id + "_score_title" }));

				$m.tag.insert_after(input_fields[j], $m.tag.init("span",
				{
					 "class" : "mjf_password_strength_checker_container"
					,"id" : input_fields[j].id + "_score_visual"
				}));
				
				$m.tag.insert_after(input_fields[j], $m.tag.init("br"));

				$m.attr.set(input_fields[j], { "data-mjf_pass_check_has" : "true" });
			}
		}

		$m.elements.bind(input_fields, this.data_att, "keyup", this.exec);
		$m.elements.bind(input_fields, this.data_att, "change", this.exec);
	}

	// $m.h.password_strength_checker.exec(IN_ID, IN_EVENT)
	,exec : function(in_id, in_event)
	{
		clearTimeout($m.h.password_strength_checker.timer);
		
		$m.h.password_strength_checker.timer = setTimeout(function()
		{
			$m.h.password_strength_checker.render(in_id, $m.h.password_strength_checker.score($m.id(in_id).value));

		}, 750);
	}
	
	// $m.h.in_passwordword_checker.score(IN_PASSWORD) -- http://stackoverflow.com/questions/948172/in_passwordword-strength-meter/11268104#11268104
	,score : function(in_password)
	{
		var score = 0;

		if($m.is.alive(in_password) === false)
		{
			return score;
		}
		
		var letters = new Object();
		
		for(var i=0, len = in_password.length; i < len; i++)
		{
			letters[in_password[i]] = (letters[in_password[i]] || 0) + 1;
			score += 5.0 / letters[in_password[i]];
		}

		var variations = {
			 digits : /\d/.test(in_password)
			,lower  : /[a-z]/.test(in_password)
			,upper  : /[A-Z]/.test(in_password)
			,non_words : /\W/.test(in_password)
		}
		
		variation_cnt = 0;

		for(var check in variations)
		{
			variation_cnt += (variations[check] == true) ? 1 : 0;
		}

		score += (variation_cnt - 1) * 10;
		
		return parseInt(score);
	}

	// $m.h.password_strength_checker.render(IN_ID, IN_SCORE)
	,render : function(in_id, in_score)
	{
		if($m.is.alive(in_id) === false)
		{
			return false;
		}
		
		if($m.is.alive(in_score) === false)
		{
			return false;
		}
		
		var score_title = $m.lang.core.msgs.passwords.too_short
			,score_width = "0";

		if(in_score > 80)
		{
			score_title = $m.lang.core.msgs.passwords.strong;
			score_width = "100";
		}
		else if(in_score > 60)
		{
			score_title = $m.lang.core.msgs.passwords.good;
			score_width = "80";
		}
		else if(in_score >= 30)
		{
			score_title = $m.lang.core.msgs.passwords.weak;
			score_width = "30";
		}

		$m.id(in_id + "_score_visual").innerHTML = '<span class="bg_colors_blue" style="width:' + score_width + '%;"></span>';
		$m.id(in_id + "_score_title").innerHTML = $m.lang.core.msgs.passwords.strength + score_title;
	}
}



/**
 * $m.h.print_onclick
 *
 */
$m.h.print_onclick =
{
	 name : "print_onclick"
	,data_att : "print_onclick"

	// $m.h.print_onclick.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}

	// $m.h.print_onclick.exec()
	,exec : function(in_id)
	{
		if(window.print)
		{
			window.print();
		}

		if($m.tag.get_name(in_id) == "a")
		{
			$m.id(in_id).blur();
		}
	}
}


/**
 * $m.h.print_onload
 *
 */
$m.h.print_onload =
{
	 name : "print_onload"
	,data_att : "print_onload"

	// $m.h.print_onload.construct()
	,construct : function()
	{
		if(window.print)
		{
			window.print();
		}
	}
}


/**
 * $m.h.remove_onclick
 *
 */
$m.h.remove_onclick =
{
	 name : "remove_onclick"
	,data_att : "remove_onclick"
	,data_att_remove_id : "data-mjf_remove_click_id"

	// $m.h.remove_onclick.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}

	// $m.h.remove_onclick.exec()
	,exec : function(in_id)
	{
		var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id;

		if($m.is.alive(id) === true)
		{
			var remove_id = $m.attr.get(in_id, $m.h.remove_onclick.data_att_remove_id);

			if($m.vd.is_mobile_touch === true)
			{
				$m.tag.remove(remove_id);
			}
			else
			{
				$m.animate.opaque(remove_id, "down", 30, function()
				{
					$m.tag.remove(remove_id);
				});
			}
		}
	}
}


/**
 * $m.h.same_height
 *
 */
$m.h.same_height =
{
	 name : "same_height"
	,data_att : "same_height"
	,data_att_kids : "same_height_child"

	// $m.h.same_height.construct()
	,construct : function(in_wand)
	{
		var delay = ($m.is.number(in_wand) === true) ? in_wand * 1000 : 1;
	
		setTimeout(function()
		{
			$m.h.same_height.exec();

		}, delay);
	}
	
	// $m.h.same_height.exec()
	,exec : function()
	{
		var all_sh = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att)
			,tmp_all_sh_kids = []
			,all_sh_kids = []
			,tallest = 0;

		for(var i=0, len=all_sh.length; i < len; i++)
		{
			tmp_all_sh_kids = $m.tags.get(all_sh[i], "*");
			
			for(var j=0, klen=tmp_all_sh_kids.length; j < klen; j++)
			{
				if($m.attr.has_value(tmp_all_sh_kids[j], $m.data_att, this.data_att_kids) !== false)
				{
					all_sh_kids.push(tmp_all_sh_kids[j]);
				}
			}

			for(var j=0, klen=all_sh_kids.length; j < klen; j++)
			{
				if(all_sh_kids[j].offsetHeight > tallest)
				{
					tallest = all_sh_kids[j].offsetHeight;
				}
			}
			
			for(var j=0, klen=all_sh_kids.length; j < klen; j++)
			{
				all_sh_kids[j].style.height = tallest + "px";
			}
		}
	}
}


/**
 * $m.h.smooth_scroll_to
 *
 */
$m.h.smooth_scroll_to =
{
	 name : "smooth_scroll_to"
	,data_att : "smooth_scroll_to"
	,data_att_to : "data-mjf_smooth_scroll_to_id"
	,data_att_top : "data-mjf_smooth_scroll_to_top"
	,data_att_left : "data-mjf_smooth_scroll_to_left"
	

	// $m.h.smooth_scroll_to.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}

	// $m.h.smooth_scroll_to.exec()
	,exec : function(in_id)
	{
		var id = $m.id(in_id)
			,scroll_to_id = $m.id($m.attr.get(in_id, $m.h.smooth_scroll_to.data_att_to));
		
		id.blur();
		
		if($m.is.alive(scroll_to_id) === true)
		{
			var scroll_to_top = $m.attr.get(in_id, $m.h.smooth_scroll_to.data_att_top)
				,minus_top = $m.is.alive(scroll_to_top) ? scroll_to_top : 0
				,scroll_to_left = $m.attr.get(in_id, $m.h.smooth_scroll_to.data_att_left)
				,minus_left = $m.is.alive(scroll_to_left) ? scroll_to_left : 0;

			$m.smooth_scroll.construct(scroll_to_id, minus_top, minus_left);
		}
	}
}


/**
 * $m.h.s2lcus
 *
 */
$m.h.s2lcus = 
{
	 name : "s2lcus"
	,data_att : "s2lcus"
	
	// $m.h.s2lcus.construct()
	,construct : function()
	{
		var init_fields = []
			,good_fields = [];

		for(var i=0, f_len=$m.tags.form.length; i < f_len; i++)
		{
			init_fields = $m.attr.get_fields_with($m.tags.form[i], ['text','textarea'], $m.data_att, this.data_att);
			good_fields = good_fields.concat(init_fields);
		}

		$m.elements.bind(good_fields, this.data_att, "keyup", this.exec);
		$m.elements.bind(good_fields, this.data_att, "change", this.exec);
	}

	// $m.h.s2lcus.exec()
	,exec : function(in_id)
	{
		$m.id($m.attr.get(in_id, "data-mjf_s2lcus")).value = $m.ut.friendly_url($m.id(in_id).value);
	}
}


/**
 * $m.h.submit_onclick
 *
 */
$m.h.submit_onclick =
{
	 name : "submit_onclick"
	,data_att : "submit_onclick"

	// $m.h.submit_onclick.construct()
	,construct : function()
	{
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}

	// $m.h.submit_onclick.exec()
	,exec : function(in_id)
	{
		var form_id_name = $m.attr.get(in_id, "data-mjf_soc_id")
			,form_id = $m.id(form_id_name)
			,name_value = $m.attr.get(in_id, "data-mjf_soc_name_value");

		if($m.tag.get_name(in_id) == "a")
		{
			$m.id(in_id).blur();
		}

		if(name_value !== null)
		{
			var form_action = $m.attr.get(form_id_name, "action");

			if(form_action.indexOf("?") == -1)
			{
				$m.attr.set(form_id, { "action" : form_action + "?" + name_value } );
			}
			else
			{
				$m.attr.set(form_id, { "action" : form_action + "&" + name_value } );
			}
		}

		if($m.is.alive($m.h.form_required.valid_forms[form_id_name]) === true)
		{
			if($m.h.form_required.exec(form_id_name) === true)
			{
				form_id.submit();
			}
		}
		else
		{
			form_id.submit();
		}
	}
}


/**
 * $m.h.table_rower
 *
 * /
$m.h.table_rower =
{
	 name : "table_rower"
	,data_att : "table_rower"
	,tables : {}

	// $m.h.table_rower.construct()
	,construct : function(in_wand)
	{
		this.tables = in_wand;
		$m.elements.bind($m.tags.all, this.data_att, "click", this.exec);
	}

	// $m.h.table_rower.exec()
	,exec : function(in_id)
	{
		var table_map = $m.h.table_rower.tables[$m.attr.get(in_id, "data-mjf_trower_id")];
		
		for(var row in table_map)
		{
			$m.de.get_object("table_map[row]", table_map[row]);

			for(var cell in row)
			{
				$m.de.get_object("table_map[row[cell]]", table_map[row[cell]]);
			}
		}
	}
}
*/


/**
 * $m.h.text_resize
 *
 */
$m.h.text_resize = 
{
	 name : "text_resize"
	,data_att : "text_resize"
	,data_att_resize_id : "data-mjf_resize_id"
	,data_att_resize_amt : "data-mjf_resize_amt"
	,default_size : 12

	// $m.h.text_resize.construct()
	,construct : function()
	{
		var result_set = $m.storage.get.table($m.storage.db_wand + "text_resize")
			,resize_id = false
			,record_id = ""
			,page_code = ""
			,window_code = $m.ut.friendly_url(window.location);
		
		if($m.is.alive(result_set) === true && $m.ajax_init === false)
		{
			for(var i in result_set)
			{
				record_id = $m.storage.get.page_tiny_id(i);
				resize_id = $m.id(record_id);
				page_code = $m.storage.get.page_code(i);
				
				if($m.is.alive(resize_id) === true && window_code == page_code)
				{
					resize_id.style.fontSize = result_set[i].font_size_final;
				}
			}
		}

		this.default_size = $m.wand.text_resize;
		$m.elements.bind($m.tags.a, this.data_att, "click", this.exec);
	}

	// $m.h.text_resize.exec()
	,exec : function(in_id)
	{
		var resize_e = $m.attr.get(in_id, $m.h.text_resize.data_att_resize_id)
			,resize_id = $m.id(resize_e)
			,resize_amt = $m.attr.get(in_id, $m.h.text_resize.data_att_resize_amt)
			,font_size_int = 0;

		if($m.is.alive(resize_id.style) === true && $m.is.alive(resize_id.style.fontSize) === true)
		{
			font_size_int = parseInt(resize_id.style.fontSize);
		}
		else
		{
			resize_id.style.fontSize = $m.h.text_resize.default_size + "px";
			font_size_int = parseInt(resize_id.style.fontSize);
		}

		switch(resize_amt)
		{
			case "-1":
				font_size_final = (font_size_int < 8) ? 8 : font_size_int - 1;
				break;

			case "+1":
				font_size_final = font_size_int + 1;
				break;

			case "0":
			default:
				font_size_final = $m.h.text_resize.default_size;
				break;
		}
		
		font_size_final += "px";
		resize_id.style.fontSize = font_size_final;

		$m.storage.set($m.storage.db_wand + "text_resize", $m.storage.create.data_record(resize_e, "font_size_final", font_size_final));
	}
}


/**
 * $m.h.tool_tip
 *
 */
$m.h.tool_tip =
{
	 name : "tool_tip"
	,data_att : "tool_tip"
	,data_att_cont : "data-mjf_tt_id"
	,all : []
	,css : { all : "tool_tip_cont", on : "tool_tip_cont_on" }
	,increments : 25
	,timeout : false

	// $m.h.tool_tip.construct()
	,construct : function()
	{
		var on_event = ($m.vd.is_mobile_touch === true) ? "click" : "mouseover"
			,off_event = ($m.vd.is_mobile_touch === true) ? "blur" : "mouseout"
			,tool_tips = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att)
			,current_tip = "";

		this.all = [];

		for(var i=0, len=tool_tips.length; i < len; i++)
		{
			current_tip = $m.attr.get(tool_tips[i], this.data_att_cont);
			this.all.push(current_tip);

			$m.element.bind(current_tip, on_event, this.show_tip_cont);
			$m.element.bind(current_tip, off_event, this.hide_tip_cont);
		}

		$m.elements.bind(tool_tips, this.data_att, on_event, this.show_tip);
		$m.elements.bind(tool_tips, this.data_att, off_event, this.hide_tip);

		$m.element.attach($m.body_id, "keypress", this.hide_all);
		$m.element.attach($m.body_id, "mousedown", this.hide_all);
		$m.element.attach($m.body_id, "touchstart", this.hide_all);
	}

	// $m.h.tool_tip.show_tip()
	,show_tip : function(in_id)
	{
		clearTimeout($m.h.tool_tip.timeout);

		$m.h.tool_tip.hide_all();

		var tip_cont = $m.attr.get(in_id, $m.h.tool_tip.data_att_cont)
			tip_cont_id = $m.id(tip_cont);
		
		tip_cont_id.style.opacity = 0;
		$m.css_class.add(tip_cont_id, $m.h.tool_tip.css.on);

		$m.animate.opaque(tip_cont, "up", $m.h.tool_tip.increments);
	}
	
	// $m.h.tool_tip.hide_tip()
	,hide_tip : function(in_id)
	{
		var tip_cont = $m.attr.get(in_id, $m.h.tool_tip.data_att_cont)
			tip_cont_id = $m.id(tip_cont);
	
		$m.h.tool_tip.timeout = setTimeout(function()
		{
			$m.animate.opaque(tip_cont_id, "down", $m.h.img_rollovers.increments, function()
			{
				$m.css_class.remove(tip_cont_id, $m.h.tool_tip.css.on);
			});
		}, 1000);
	}
	
	// $m.h.tool_tip.show_tip_cont()
	,show_tip_cont : function()
	{
		clearTimeout($m.h.tool_tip.timeout);
		$m.css_class.add(this.id, $m.h.tool_tip.css.on);
	}

	// $m.h.tool_tip.hide_tip_cont()
	,hide_tip_cont : function()
	{
		var in_id = this.id;

		$m.h.tool_tip.timeout = setTimeout(function()
		{
			$m.css_class.remove(in_id, $m.h.tool_tip.css.on);
		}, 1000);
	}
	
	// $m.h.tool_tip.hide_all()
	,hide_all : function()
	{
		for(var i=0, len=$m.h.tool_tip.all.length; i < len; i++)
		{
			$m.css_class.remove($m.h.tool_tip.all[i], $m.h.tool_tip.css.on);
		}
	}

}

