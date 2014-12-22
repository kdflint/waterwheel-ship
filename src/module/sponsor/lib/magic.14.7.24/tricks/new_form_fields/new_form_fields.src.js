/***************************************************************************
- File: new_form_fields.js
- Version: 13.3.26
- java -jar compiler2.jar --js new_form_fields.src.js --js_output_file new_form_fields.VERSION.js
***************************************************************************/

$m.t.new_form_fields =
{
	 name : "new_form_fields"
	,data_att : "new_form_fields"
	,data_att_close : "new_form_fields_close"
	,nff_att : "data-mjf_nff"
	,good_tags : ["input","textarea"]
	,good_types : ["text","radio","checkbox","file"]



	// $m.t.new_form_fields.construct()
	,construct : function(in_wand)
	{
		if($m.is.alive($m.lang.new_form_fields) === false && $m.ajax_init === false)
		{
			$m.insert_link.script($m.config.basedir + "tricks/new_form_fields/lang/" + $m.config.lang + ".js", function()
			{
				$m.t.new_form_fields.init(in_wand);
			});
		}
		else
		{
			$m.t.new_form_fields.init(in_wand);
		}
	}


	// $m.t.new_form_fields.exec()
	,exec : function(in_id)
	{
		var id = $m.id(in_id)
			,all_field_atts = $m.attr.get(in_id, $m.t.new_form_fields.nff_att)
			,atts = {}
			,field_atts = all_field_atts.split("|")
			,errord = false;

		for(var i=0, len=field_atts.length; i < len; i++)
		{
			att_entry = field_atts[i].split(":");
			atts[att_entry[0]] = att_entry[1];
		}

		if(atts.tag === undefined)
		{
			$m.t.new_form_fields.missing_att('tag');
			errord = true;
		}
		else
		{
			if($m.is.in_array($m.t.new_form_fields.good_tags, atts.tag) === false)
			{
				$m.t.new_form_fields.invalid_att("tag", atts.tag);
				errord = true;
			}
			else
			{
				var new_tag = atts.tag;
				delete atts["tag"];
			}
		}

		if(atts.type !== undefined && atts.tag !== "textarea")
		{
			if($m.is.in_array($m.t.new_form_fields.good_types, atts.type) === false)
			{
				$m.t.new_form_fields.invalid_att("type", atts.type);
				errord = true;
			}
		}

		if($m.is.alive(atts.name) === false)
		{
			$m.t.new_form_fields.missing_att('name');
			errord = true;
		}
		
		if($m.is.alive(atts.parent) === false)
		{
			$m.t.new_form_fields.missing_att('parent');
			errord = true;
		}
		else
		{
			var tag_parent = atts.parent;
			delete atts["parent"];
		}

		if(errord === true)
		{
			return false;
		}

		if($m.id(atts.id) !== false)
		{
			atts.id += "_" + $m.ut.rand_num();
		}

		if(atts.type === "radio" || atts.type === "checkbox")
		{
			atts.value = prompt($m.lang.new_form_fields.prompt_field_value, "");

			if($m.is.alive(atts.value) === true)
			{
				atts.value = "Unknown";
			}
		}

		var new_field_span_id = "field_" + atts.id + "_" + $m.ut.rand_num();
		$m.tag.create(tag_parent, "span", { "id" : new_field_span_id });

		var br_after_field = false
			,has_label = false;

		if(atts.br_after_field !== undefined)
		{
			br_after_field = atts["br_after_field"];
			delete atts["br_after_field"];
		}

		if(atts.label !== undefined)
		{
			var label_html = prompt($m.lang.new_form_fields.prompt_label_value, "")
				,label_position = atts["label"];
			
			delete atts["label"];
			
			if($m.is.alive(label_html) === true)
			{
				label_html += " ";
				has_label = true;
			}
			
			if(atts.id !== undefined)
			{
				atts.id = atts.name;
			}
		}

		var new_field_img_id = "img_" + atts.id + "_" + $m.ut.rand_num();
		$m.tag.create(new_field_span_id, "img",
		{
			 "src" : $m.config.basedir + "images/icons/icon_trash.png"
			,"class" : "new_field_close_img"
			,"title" : "Remove this field"
			,"id" : new_field_img_id
			,"data-mjf" : "new_form_fields_close"
			,"data-mjf_nff_parent" : new_field_span_id
		});

		var tmp_img = $m.id(new_field_img_id);

		if(has_label === true)
		{
			var br_after_label = false;

			if(atts.br_after_label !== undefined)
			{
				br_after_label = atts["br_after_label"];
				delete atts["br_after_label"];
				br_after_label = true;
			}

			if(label_position == "before")
			{
				$m.tag.create(new_field_span_id, "label",
				{
					 "for" : atts.id
					,"id" : atts.id + "_" + $m.ut.rand_num()
				}, label_html);

				if(br_after_label !== false)
				{
					for(var i=0; i < br_after_label; i++)
					{
						$m.tag.create(new_field_span_id, "br");
					}
				}

				$m.tag.create(new_field_span_id, new_tag, atts);
			}
			else
			{
				$m.tag.create(new_field_span_id, new_tag, atts);
				$m.tag.create(new_field_span_id, "label",
				{
					 "for" : atts.id
					,"id" : atts.id + "_" + $m.ut.rand_num()
				}, label_html);
			}
		}
		else
		{
			$m.tag.create(new_field_span_id, new_tag, atts);
		}

		if(br_after_field !== false)
		{
			for(var i=0; i < br_after_field; i++)
			{
				$m.tag.create(new_field_span_id, "br");
			}
		}

		$m.init_children(false);
	}

	// $m.t.new_form_fields.missing_att()
	,missing_att : function(in_att)
	{
		$m.de.throw_browser_error("Whoops, you have forgotten to include the attribute `" + in_att + "` for your new field");
	}
	
	// $m.t.new_form_fields.invalid_att()
	,invalid_att : function(in_type, in_value)
	{
		$m.de.throw_browser_error("Whoops, `" + in_value + "` currently is not an allowed " + in_type);
	}
	
	// $m.t.new_form_fields.close()
	,close : function(in_id)
	{
		$m.tag.remove($m.attr.get(in_id, "data-mjf_nff_parent"));
	}


	// $m.t.new_form_fields.init(in_wand)
	,init : function(in_wand)
	{
		$m.elements.bind($m.tags.a, this.data_att, "click", this.exec);
		$m.elements.bind($m.tags.img, this.data_att_close, "click", this.close);
	}
}