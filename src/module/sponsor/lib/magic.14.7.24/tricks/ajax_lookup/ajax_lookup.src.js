/***************************************************************************
- File: ajax_lookup.js
- Version: 11.4.29
***************************************************************************/

/*

 - magic.src.js now has keycode functions.
 -- Use them!

*/


$m.trick.ajax_lookup = {};

$m.t.ajax_lookup =
{
	 name : "ajax_lookup"
	
	// $m.t.ajax_lookup.construct()
	,construct : function(in_wand)
	{
		if($m.ajax_init === false)
			$m.insert_link.stylesheet($m.config.basedir + "tricks/ajax_lookup.css");
	}

	// $m.t.ajax_lookup.ajax_suggest
	,ajax_suggest :
	{
		 name : "ajax_suggest"
		,data_att : "ajax_suggest"
		,timer : ""
		,filter_speed : 750
		,update_id : ""

		// $m.t.ajax_lookup.ajax_suggest.is_good_lookup_key()
		,is_good_lookup_keycode : function(in_keycode)
		{
			// TODO
			// - Make a regex to filter out keycodes not worth searching
			// -- home, end, page up, page down, shift, etc.
 
 			if(in_keycode >= 48 && in_keycode <= 90) // keys A-Z and 0-9
				return true;
			else if(in_keycode >= 96 && in_keycode <= 105) // numpad keys 0-9
				return true;
			else if(in_keycode == 8 || in_keycode == 46) // backspace and delete
				return true;
			else
				return false;
		}

		// $m.t.ajax_lookup.ajax_suggest.construct()
		,construct : function()
		{
			var input_kids = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att)
			$m.elements.bind(input_kids, this.data_att, "keyup", this.search);
			$m.elements.bind(input_kids, this.data_att, "blur", this.decide);
		}

		// $m.t.ajax_lookup.ajax_suggest.search()
		,search : function(in_id, in_event)
		{
			clearTimeout($m.t.ajax_lookup.ajax_suggest.timer);
			var keycode = $m.get_keycode(in_event);

			// Grab 40 (down arrow) and focus on <select>
			if(keycode == "40")
			{
				var ds_id = $m.id($m.attr.get(in_id, "data-mjf_suggest_id"));
				if(ds_id !== false)
				{
					ds_id.focus();
					ds_id.selectedIndex = 0;
				}
			}
			// Grab good lookup keycodes and filter
			else if($m.t.ajax_lookup.ajax_suggest.is_good_lookup_keycode(keycode) === true)
			{
				$m.t.ajax_lookup.ajax_suggest.timer = setTimeout(function()
				{
					$m.t.ajax_lookup.ajax_suggest.filter(in_id, in_event)
				}, $m.t.ajax_lookup.ajax_suggest.filter_speed);
			}
			// Grab 27 (escape) and hide <select>
			else if(keycode == "27")
			{
				var id = $m.id(in_id);
				$m.id(id.getAttribute("data-mjf_ajax_update_id")).style.display = "none";
			}
			else
			{
				return;
			}
		}

		// $m.t.ajax_lookup.ajax_suggest.filter()
		,filter : function(in_id)
		{
			var id = $m.id(in_id)
				,settings = $m.ajax.init_settings(id);

			settings.query += "&" + id.name + "=" + id.value + "&eparent=" + in_id + "&eid=" + settings.update_id;
			settings.callback_success = "$m.t.ajax_lookup.ajax_suggest.update('" + in_id + "')"
	
			$m.ajax.request.element_id = in_id;
			$m.ajax.send(settings);
		}

		// $m.t.ajax_lookup.ajax_suggest.update()
		,update : function(in_id)
		{
			$m.ajax.simple_content_update();
			
			var id = $m.id(in_id);
			$m.id(id.getAttribute("data-mjf_ajax_update_id")).style.display = "block";
		}
		
		// $m.t.ajax_lookup.ajax_suggest.decide()
		,decide : function(in_id, in_event)
		{
			var keycode = $m.get_keycode(in_event);

			// Grab 9 (tab) and 27 (escape) and then hide the <select>
			if(keycode == "9" || keycode == "27")
				$m.t.ajax_lookup.ajax_suggest.hide(in_id);

			// Grab 40 (down arrow) and focus on <select>
			if(keycode == "40")
				return;

			$m.returnd.set(in_id, "blur", "true");
		}
		
		// $m.t.ajax_lookup.ajax_suggest.hide()
		,hide : function(in_id, in_event)
		{
			var id = $m.id(in_id)
				,suggest_list_parent_id = $m.id(id.getAttribute("data-mjf_ajax_update_id"));

			suggest_list_parent_id.style.display = "none";
		}
	}


	// $m.t.ajax_lookup.suggest_select
	,suggest_select :
	{
		 name : "suggest_select"
		,data_att : "suggest_select"

		// $m.t.ajax_lookup.suggest_select.construct()
		,construct : function()
		{
			$m.elements.bind($m.tags.all, this.data_att, "blur", this.change);
			$m.elements.bind($m.tags.all, this.data_att, "change", this.change);
			$m.elements.bind($m.tags.all, this.data_att, "click", this.click);
			$m.elements.bind($m.tags.all, this.data_att, "keypress", this.keystroke);
		}

		// Buggy when there's only one <option> in the <select> :-(

		// $m.t.ajax_lookup.suggest_select.change()
		,change : function(in_id)
		{
			var id = $m.id(in_id)
				,selectedIndex = id.selectedIndex
				,id_options = id.options[selectedIndex]
				,opt_value = id_options.value
				,opt_text = id_options.text
				,parent_id = $m.id(id.getAttribute("data-mjf_ss_parent"));

			parent_id.value = opt_text;
			
			var hidden_id = $m.id(in_id + "_hidden");
			if(hidden_id !== false)
				$m.id(hidden_id + "_hidden").value = opt_value;
			
			$m.returnd.set(in_id, "change", "true");
			$m.returnd.set(in_id, "blur", "true");
		}
		
		// $m.t.ajax_lookup.suggest_select.keystroke()
		,keystroke : function(in_id, in_event)
		{
			var keycode = $m.get_keycode(in_event);
			
			// Grab 13 (enter, return) and 27 (escape)
			if(keycode == "13" || keycode == "27")
				$m.t.ajax_lookup.suggest_select.click(in_id)
		}

		// $m.t.ajax_lookup.suggest_select.click()
		,click : function(in_id)
		{
			var id = $m.id(in_id);
			$m.id(id.getAttribute("data-mjf_ss_update")).style.display = "none";
			$m.id(id.getAttribute("data-mjf_ss_parent")).focus();
		}
	}
	
}



