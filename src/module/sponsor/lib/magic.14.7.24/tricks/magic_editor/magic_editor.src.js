/***************************************************************************
- File: magic_editor.js
- Version: 14.1.12
- java -jar compiler2.jar --js magic_editor.src.js --js_output_file magic_editor.VERSION.js
***************************************************************************/

/*
	References
	- http://www.quirksmode.org/dom/execCommand.html
	- http://msdn.microsoft.com/en-us/library/ms536419%28v=vs.85%29.aspx
*/

$m.trick.magic_editor = {};

$m.t.magic_editor =
{
	 name : "magic_editor"
	,data_att : "magic_editor"
	,idiv : false

	,debug : false
	
	,config : {}
	,all : {}
	,dds : []

	,cur_ed : false
	,cur_cmd : false
	,cur_selection : false
	,cur_image : false
	,cur_anchor : false
	,cur_table : false
	
	,cur_iframe_height : 0
	,cur_iframe_width : 0

	,attributes : ["id","class","href","src","alt","title","style","size","rel","param","width","height","colspan","rowspan","align","valign","cols","rows","tabindex","onmouseover","onmousedown","onmouseup","onmousemove","onblur","onfocus","onkeypress","onkeydown","onkeyup","target","longdesc","usemap","bgcolor","background","border","lang"]
	,newlines_after : ["h\\d","p","div","pre","form","table","ol","ul","li","blockquote","center","dl","dt","dd","dir","fieldset","noscript","iframe","noscript","tr","td","tbody","head"]

	,unsupported : {
		msie : ["undo","redo"]
	}
	
	,buttons : {}
	
	,button_styles : {
		
		
	}

	,types : {
	
		"simple" : [
			 "undo"
			,"redo"
				,"separator"
			,"bold"
			,"italic"
			,"underline"
			,"strikethrough"
				,"separator"
			,"hyperlink"
			,"image"
				,"separator"
			,"list_ordered"
			,"list_unordered"
				,"separator"
			,"indent"
			,"outdent"
				,"separator"
			,"justify_left"
			,"justify_center"
			,"justify_right"
		]
	
		,"advanced" : [
			 "undo"
			,"redo"
				,"separator"
			,"bold"
			,"italic"
			,"underline"
			,"strikethrough"
				,"separator"
			,"content_style"
			,"font_family"
			,"font_size"
			,"font_color"
			,"hilite_color"
			,"remove_formatting"
				,"separator"
			,"hyperlink"
			//	,"separator"
			,"image"
			,"table"
			,"video"
			,"special_characters"
			,"paste_msword"
				,"separator"
			,"list_ordered"
			,"list_unordered"
			,"superscript"
			,"subscript"
				,"separator"
			,"indent"
			,"outdent"
			,"blockquote"
				,"separator"
			,"justify_left"
			,"justify_center"
			,"justify_right"
				,"separator"
			,"view_full"
			,"search"
			,"code_view"
				,"separator"
			,"help"
		]
	}


	// $m.t.magic_editor.construct()
	,construct : function(in_wand)
	{
		if($m.is.alive($m.lang.magic_editor) === false && $m.ajax_init === false)
		{
			$m.insert_link.script($m.config.basedir + "tricks/magic_editor/pages/special_character_list.13.6.24.js");
			$m.insert_link.script($m.config.basedir + "tricks/magic_editor/pages/word_html_cleaner.js");
			$m.insert_link.script($m.config.basedir + "tricks/magic_editor/lang/" + $m.config.lang + ".js", function()
			{
				$m.t.magic_editor.init(in_wand);
			});
		}
		else
		{
			$m.t.magic_editor.init(in_wand);
		}
	}


	// $m.t.magic_editor.init(in_wand)
	,init : function(in_wand)
	{
		if($m.is.alive(in_wand) === false)
		{
			$m.de.throw_browser_error("Magic Editor: $m.trick.magic_editor.config not declared!");
			return false;
		}
		
		this.config = in_wand.config;
		this.load_btns();

		var init_editors = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att) // YUCK
			,tmp_id = false
			,tmp_tag = false;

		for(var i=0, len=init_editors.length; i < len; i++)
		{
			tmp_id = $m.attr.get(init_editors[i], "id");
			tmp_tag = $m.tag.get_name(tmp_id);
			
			if(tmp_tag == "div" || tmp_tag == "textarea")
			{
				this.load(init_editors[i]);
			}
			else
			{
				$m.de.throw_browser_error("Magic Editor says `" + tmp_id + "` is not a <div> or <textarea> and therefore will be ignored.");		
			}
		}

		if($m.ajax_init === false)
		{
			// Create a hidden div for various internal use
			$m.tag.create($m.body_tag, "div",
			{
				 "id" : "magic_editor_idiv"
				,"class" : "display_none"
			});
			this.idiv = $m.id("magic_editor_idiv");
	
			// Create the Color Palette
			var iframe_palette = $m.tag.init("iframe",
			{
				 "id" : "magic_editor_palette"
				,"name" : "magic_editor_palette"
				,"src" : $m.config.basedir + "tricks/magic_editor/pages/palette.html"
				,"scrolling" : "no"
			});
	
			iframe_palette.style.cssText = ($m.vd.is_msie === true) ? "height:175px;width:125px;overflow:hidden;" : "height:170px;width:119px;";
			iframe_palette.style.cssText += "border:1px solid #bcbecd;position:absolute;top:0;left:0;visibility:hidden;z-index:99999;"
			$m.body_tag.appendChild(iframe_palette);
	
			if($m.vd.is_msie === true)
			{
				var palette_id = $m.id("magic_editor_palette");
				palette_id.style.height = "175px";
				palette_id.style.width = "125px";
			}
		}

		var dds = $m.attr.get_tags_with($m.tags.all, $m.data_att, "magic_editor_dd_b");

		for(var i=0, len=dds.length; i < len; i++)
		{
			$m.t.magic_editor.dds.push($m.attr.get(dds[i], "id"));
		}
	
		$m.element.bind($m.body_id, "mousedown", $m.t.magic_editor.hide_everything);

		$m.elements.bind($m.tags.a, "magic_editor_btn", "mouseover", this.over);
		$m.elements.bind($m.tags.a, "magic_editor_btn", "mouseout", this.out);
		$m.elements.bind($m.tags.a, "magic_editor_btn", "click", this.click);

		$m.elements.bind($m.tags.get($m.document, "div"), "magic_editor_dd", "mouseover", this.over);
		$m.elements.bind($m.tags.get($m.document, "div"), "magic_editor_dd", "mouseout", this.out);
		$m.elements.bind($m.tags.get($m.document, "div"), "magic_editor_dd", "click", this.toggle_dropdown);

		$m.elements.bind($m.tags.a, "magic_editor_dd_item", "mousedown", this.click);

		$m.elements.bind($m.tags.a, "magic_editor_pa", "mouseover", this.over);
		$m.elements.bind($m.tags.a, "magic_editor_pa", "mouseout", this.out);
		$m.elements.bind($m.tags.a, "magic_editor_pa", "click", this.show_palette);

		$m.elements.bind($m.tags.a, "magic_editor_dr", "mouseover", this.over);
		$m.elements.bind($m.tags.a, "magic_editor_dr", "mouseout", this.out);
		$m.elements.bind($m.tags.a, "magic_editor_dr", "click", this.click_dr);

		$m.elements.bind($m.tags.form, "magic_editor_form", "submit", this.send);

		$m.shortcut.bind("esc", function() { $m.t.magic_editor.hide_everything(); });

		$m.t.darkroom.init();
	}

	// $m.t.magic_editor.load()
	,load : function(in_editor)
	{
		var editor = $m.attr.get(in_editor, "id")
			,editor_id = $m.id(editor);

		//$m.attr.set(editor, { "data-mfj_me_offset_width" : "editor.offsetWidth" });
		
		$m.t.magic_editor.all[editor] = editor;

		if($m.is.alive($m.attr.get(editor, "data-mjf_magic_editor_has")) === false)
		{
			$m.css_class.add(editor, "display_none");
			$m.css_class.add(editor, "magic_editor_code");

			var is_ta = ($m.tag.get_name(editor) == "textarea") ? true : false;
	
			// Magic Editor container
			var container_1_id = "magic_editor_" + editor + "_1_c";
			var container_1 = $m.tag.init("div",
			{
				 "class" : "display_none magic_editor_container"
				,"id" : container_1_id
			});
			in_editor.parentNode.insertBefore(container_1, editor_id);
			var container_1_id_id = $m.id(container_1_id);
	
			// Toolbar 1
			var toolbar_1_id = "magic_editor_" + editor + "_1_tb";
			var toolbar_1 = $m.tag.init("div",
			{
				 "class" : "magic_editor_toolbar magic_editor_toolbar_1st"
				,"id" : toolbar_1_id
			});
			container_1_id_id.appendChild(toolbar_1);

			// iframe
			var iframed_id = "magic_editor_" + editor
				,iframed_height = (is_ta === true) ? in_editor.rows * 15 : "400";
			
			var iframed = $m.tag.init("iframe",
			{
				 "class" : "magic_editor_iframe display_none"
				,"id" : iframed_id
				,"name" : iframed_id
				,"data-mjf" : "magic_editor_frame"
				,"height" : iframed_height
				,"src" : "about:blank"
			});
	
			container_1_id_id.appendChild(iframed);

			var tmp_content = (is_ta === true) ? editor_id.value : editor_id.innerHTML;
	
			/*
			if($m.is.alive(tmp_content) === false)
			{
				tmp_content = "<p>" + $m.lang.magic_editor.add_content_here + "</p>";
			}
			*/
	
			var cur_iframed_id = $m.id(iframed_id)
				,cur_iframed_doc = cur_iframed_id.contentWindow.document;
	
			cur_iframed_doc.open();
			cur_iframed_doc.write(tmp_content);
			cur_iframed_doc.close();
			
			cur_iframed_doc.body.contentEditable = true;

			$m.element.attach(cur_iframed_doc, "mousedown", $m.t.magic_editor.hide_everything);
			$m.element.attach(cur_iframed_doc, "keypress", $m.t.magic_editor.hide_everything);
			
			// This is in a setTimeout because IE won't recognize the new iframe <head> otherwise
			setTimeout(function()
			{
				var head_tag = cur_iframed_doc.getElementsByTagName("head")
					,extra_css = $m.t.magic_editor.config.css_links
					,css_tag = false;
	
				/*
				for(var i=0, css_len=extra_css.length; i < css_len; i++)
				{
					$m.tag.create(head_tag[0], "link",
					{
						 "href" : extra_css[i]
						,"rel" : "stylesheet"
						,"type" : "text/css"
					});
				}
				*/

				for(var i=0, css_len=extra_css.length; i < css_len; i++)
				{
					css_tag = cur_iframed_doc.createElement("link");
					css_tag.setAttribute("href", extra_css[i]);
					css_tag.setAttribute("rel", "stylesheet");
					css_tag.setAttribute("type", "text/css");
					head_tag[0].appendChild(css_tag);
				}

	 			var body_tag = cur_iframed_doc.getElementsByTagName("body")[0];
	 			$m.attr.set(body_tag, { "id" : "magic_editor_content_body" });
	
				$m.element.attach(body_tag, "mousedown", function(event)
				{
					$m.t.magic_editor.cur_image = false;
					$m.t.magic_editor.cur_anchor = false;
					$m.t.magic_editor.cur_table = false;
					$m.t.magic_editor.find_element(editor, event);
				});
				
				$m.element.attach(body_tag, "mouseup", function(event)
				{
					$m.t.magic_editor.selection.save(iframed_id, event);
					$m.t.magic_editor.bind_iframe_elements(editor);
				});
				
				$m.element.attach(body_tag, "dblclick", function(event)
				{
					$m.t.magic_editor.selection.save(iframed_id, event);
					$m.t.magic_editor.bind_iframe_elements(editor);
				});
	
				$m.element.attach(body_tag, "keyup", function(event)
				{
					$m.t.magic_editor.selection.save(iframed_id, event);
					$m.t.magic_editor.bind_iframe_elements(editor);
				});
				
				parent.$m.shortcut.bind("esc", function()
				{
					parent.$m.t.darkroom.hide_all();
				}, { target : cur_iframed_doc });
	
				$m.t.magic_editor.bind_iframe_elements(editor);
				
				$m.css_class.remove(iframed_id, "display_none");
	
			}, 0);
	
			this.load_toolbar(toolbar_1_id, editor, cur_iframed_doc);
	
			$m.css_class.remove(container_1_id, "display_none");
			$m.attr.set(in_editor, { "data-mjf_magic_editor_has" : "true" });

			// This is in a setTimeout because Firefox won't recognize the new iframe document otherwise
			setTimeout(function()
			{
				try
				{
					cur_iframed_doc.execCommand('enableInlineTableEditing', false, false);
				}
				catch(e){}
			}, 100);
		}
	}
	
	
	// $m.t.magic_editor.find_element()
	,find_element : function(in_editor, in_event)
	{
		var target = $m.event.get_target(in_event)
			,tag_name = $m.tag.get_name(target)
			,parent_node = target.parentNode
			,parent_tag_name = $m.tag.get_name(parent_node)
			,found_table_parent = false;

		$m.t.magic_editor.btns_deactivate(in_editor);
		$m.t.magic_editor.btns_activate(target, in_editor);
		
		if(tag_name == "table")
		{
			$m.t.magic_editor.cur_table = target;
		}

		while(parent_node != null)
		{
			$m.t.magic_editor.btns_activate(parent_node, in_editor);
			parent_node = parent_node.parentNode;
			parent_tag_name = $m.tag.get_name(parent_node);
			
			if($m.tag.get_name(parent_node) == "table" && found_table_parent === false)
			{
				$m.t.magic_editor.cur_table = parent_node;
				found_table_parent = true;
			}
		}

	}


	// $m.t.magic_editor.btns_deactivate(IN_EDITOR)
	,btns_deactivate : function(in_editor)
	{
		var a_tags = $m.tags.get("magic_editor_" + in_editor + "_1_tb", "a")
			,div_tags = $m.tags.get("magic_editor_" + in_editor + "_1_tb", "div")
			,div_id = null;
	
		for(var i=0, len=a_tags.length; i < len; i++)
		{
			$m.t.magic_editor.out($m.attr.get(a_tags[i], "id"));
		}
		
		for(var i=0, len=div_tags.length; i < len; i++)
		{
			div_id = $m.attr.get(div_tags[i], "id");
			
			if($m.is.alive(div_id) === true)
			{
				$m.t.magic_editor.out($m.attr.get(div_tags[i], "id"));
			}
		}
	}


	// $m.t.magic_editor.btns_activate(IN_ELEMENT)
	,btns_activate : function(in_element, in_editor)
	{
		var element_id = ($m.is.string(in_element) === true) ? $m.id(in_element) : in_element
			,element_tag = $m.tag.get_name(element_id)
			,btn_name = false;

		if($m.is.alive(element_id.style) === true)
		{
			if(element_id.style.fontWeight == "bold")
			{
				$m.t.magic_editor.over("magic_editor_btn_bold_" + in_editor);
			}

			if(element_id.style.textDecoration == "underline")
			{
				$m.t.magic_editor.over("magic_editor_btn_underline_" + in_editor);
			}
			
			if(element_id.style.textDecoration == "line-through")
			{
				$m.t.magic_editor.over("magic_editor_btn_strikethrough_" + in_editor);
			}

			if($m.is.alive(element_id.style.fontFamily) === true)
			{
				$m.t.magic_editor.over("magic_editor_dd_font_family_" + in_editor);
			}
			
			if($m.is.alive(element_id.style.fontSize) === true)
			{
				$m.t.magic_editor.over("magic_editor_dd_font_size_" + in_editor);
			}

			if($m.is.alive(element_id.style.color) === true)
			{
				$m.t.magic_editor.over("magic_editor_btn_font_color_" + in_editor);
			}
			
			if($m.is.alive(element_id.style.backgroundColor) === true)
			{
				$m.t.magic_editor.over("magic_editor_btn_hilite_color_" + in_editor);
			}

			switch(element_id.style.textAlign)
			{
				case "center":
					$m.t.magic_editor.over("magic_editor_btn_justify_center_" + in_editor);
					break;

				case "right":
					$m.t.magic_editor.over("magic_editor_btn_justify_right_" + in_editor);
					break;
				
				case "left":
					$m.t.magic_editor.over("magic_editor_btn_justify_left_" + in_editor);
					break;
			}
		}

		switch(element_tag)
		{
			case "b":
			case "strong":
				btn_name = "bold";
				break;
			
			case "i":
			case "em":
				btn_name = "italic";
				break;
			
			case "u":
				btn_name = "underline";
				break;
			
			case "a":
				btn_name = "hyperlink";
				break;
			
			case "img":
				btn_name = "image";
				break;
			
			case "table":
				btn_name = "table";
				break;
			
			case "ol":
				btn_name = "list_ordered";
				break;

			case "ul":
				btn_name = "list_unordered";
				break;

			case "sup":
				btn_name = "superscript";
				break;

			case "sub":
				btn_name = "subscript";
				break;

			case "blockquote":
				btn_name = "blockquote";
				break;
		}
		
		if(btn_name !== false)
		{
			$m.t.magic_editor.over("magic_editor_btn_" + btn_name + "_" + in_editor);
		}
	}



	// $m.t.magic_editor.bind_iframe_elements()
	,bind_iframe_elements : function(in_editor)
	{
		var giframe_doc = $m.tag.get_iframe_doc("magic_editor_" + in_editor)
			,doc_images = giframe_doc.images
			,doc_anchors = giframe_doc.getElementsByTagName("a")
			,has_child_img = false;
		
		for(var i=0, img_len = doc_images.length; i < img_len; i++)
		{
			if($m.vd.is_msie === true)
			{
				doc_images[i].onclick = function()
				{
					$m.t.magic_editor.cur_image = this;
					$m.exec.go("magic_editor_btn_image_" + in_editor, "onclick");
					return false;
				};
			}
			else
			{
				$m.element.attach(doc_images[i], "dblclick", function()
				{
					$m.t.magic_editor.cur_image = this;
					$m.exec.go("magic_editor_btn_image_" + in_editor, "onclick");
					return false;
				});
			}
		}

		for(var i=0, a_len = doc_anchors.length; i < a_len; i++)
		{
			has_child_img = false;
		
			for(var j=0, c_len = children_len = doc_anchors[i].childNodes.length; j < c_len; j++)
			{
				if(doc_anchors[i].childNodes[j].nodeName == "IMG")
				{
					has_child_img = true;
					break;
				}
			}
			
			if(has_child_img === true)
			{
				continue;
			}

			if($m.vd.is_msie === true)
			{
				doc_anchors[i].ondblclick = function()
				{
					$m.t.magic_editor.selection.txt = this.innerHTML;
					$m.t.magic_editor.cur_anchor = this;
					$m.exec.go("magic_editor_btn_hyperlink_" + in_editor, "onclick");
					return false;
				};
			}
			else
			{
				$m.element.attach(doc_anchors[i], "dblclick", function()
				{
					$m.t.magic_editor.selection.txt = this.innerHTML;
					$m.t.magic_editor.cur_anchor = this;
					$m.exec.go("magic_editor_btn_hyperlink_" + in_editor, "onclick");
					return false;
				});
			}
		}
	}


	// $m.t.magic_editor.load_toolbar()
	,load_toolbar : function(in_toolbar, in_editor, in_iframe_doc)
	{
		var toolbar = $m.t.magic_editor.types[$m.t.magic_editor.config.type]
			,btns = $m.t.magic_editor.btns
			,new_toolbar_content = ""
			,win_keystrokes = {}
			,mac_keystrokes = {}
			,cur_id = "";

		for(var i in toolbar)
		{
			if(toolbar[i] == "separator")
			{
				new_toolbar_content += '<div class="magic_editor_btn magic_editor_seperator"></div>';
			}
			else
			{
				switch(btns[toolbar[i]].command_type)
				{
					case "dropdown":
						new_toolbar_content += '<div title="' + btns[toolbar[i]].title + '" class="magic_editor_btn magic_editor_btn_' + toolbar[i] + '" data-mjf="magic_editor_dd" data-mjf_me_cmd="' + toolbar[i] + '" data-mjf_me_editor="editor_' + in_editor + '" data-mjf_me_taid="' + in_editor + '" id="magic_editor_dd_' + toolbar[i] + '_' + in_editor + '"><p class="magic_editor_dd_list" data-mjf="magic_editor_dd_b" id="magic_editor_dd_' + toolbar[i] + '_' + in_editor + '_b">';

						for(var j=0, len=btns[toolbar[i]].options.length; j < len; j++)
						{
							new_toolbar_content += '<a href="#" style="' + btns[toolbar[i]].styles[j] + '" data-mjf="magic_editor_dd_item" data-mjf_me_editor="editor_' + in_editor + '" data-mjf_me_cmd="' + toolbar[i] + '" data-mjf_me_cmd_opt="' + j + '" data-mjf_me_parent="magic_editor_dd_' + toolbar[i] + '_' + in_editor + '_b" data-mjf_me_taid="' + in_editor + '" id="magic_editor_dd_item_' + toolbar[i] + '_' + in_editor + j + '">' + btns[toolbar[i]].options[j] + '</a>';
						}

						new_toolbar_content += '</p></div>';
						break;

					case "palette":
						new_toolbar_content += '<a href="#" title="' + btns[toolbar[i]].title + '" class="magic_editor_btn magic_editor_btn_' + toolbar[i] + '" data-mjf="magic_editor_pa" data-mjf_me_cmd="' + toolbar[i] + '" data-mjf_me_editor="editor_' + in_editor + '" data-mjf_me_taid="' + in_editor + '" id="magic_editor_btn_' + toolbar[i] + '_' + in_editor + '"></a>';
						break;

					case "darkroom":
						new_toolbar_content += '<a href="#" title="' + btns[toolbar[i]].title + '" class="magic_editor_btn magic_editor_btn_' + toolbar[i] + '" data-mjf="magic_editor_dr|darkroom|return_false" data-mjf_dr_type="iframe" data-mjf_dr_iframe_src="' + btns[toolbar[i]].darkroom_url + '" data-mjf_dr_iframe_dim="' + btns[toolbar[i]].darkroom_dims + '" data-mjf_me_cmd="' + toolbar[i] + '" data-mjf_me_editor="editor_' + in_editor + '" data-mjf_me_taid="' + in_editor + '" id="magic_editor_btn_' + toolbar[i] + '_' + in_editor + '"></a>';
						break;

					default:
						if($m.vd.is_msie === true && $m.is.in_array($m.t.magic_editor.unsupported.msie, toolbar[i]) !== false)
						{
							continue;
						}
					
						cur_id = 'magic_editor_btn_' + toolbar[i] + '_' + in_editor;
						
						if($m.is.alive(btns[toolbar[i]].win_keystroke) === true)
						{
							win_keystrokes[cur_id] = btns[toolbar[i]].win_keystroke;
						}

						if($m.is.alive(btns[toolbar[i]].mac_keystroke) === true)
						{
							mac_keystrokes[cur_id] = btns[toolbar[i]].mac_keystroke;
						}

						new_toolbar_content += '<a href="#" title="' + btns[toolbar[i]].title + '" class="magic_editor_btn magic_editor_btn_' + toolbar[i] + '" data-mjf="magic_editor_btn" data-mjf_me_cmd="' + toolbar[i] + '" data-mjf_me_editor="editor_' + in_editor + '" data-mjf_me_taid="' + in_editor + '" id="' + cur_id + '"></a>';
						break;
				}
			}
		}

		$m.id(in_toolbar).innerHTML = new_toolbar_content + '<br class="clear_both">';

		if($m.vd.is_windows === true || $m.vd.is_linux === true)
		{
			var win_key = false;
			
			for(win_key in win_keystrokes)
			{
				$m.shortcut.bind(win_keystrokes[win_key], "$m.t.magic_editor.click('" + win_key + "');", { target : in_iframe_doc });
			}
		}
		else if($m.vd.is_macintosh === true)
		{
			var mac_key = false;
			
			for(mac_key in mac_keystrokes)
			{
				$m.shortcut.bind(mac_keystrokes[mac_key], "$m.t.magic_editor.click('" + mac_key + "');", { target : in_iframe_doc });
			}
		}
	}

	// $m.t.magic_editor.click(IN_ID)
	,click : function(in_id, in_event)
	{
		var id = $m.id(in_id)
			,me_id = "magic_" + $m.attr.get(in_id, "data-mjf_me_editor")
			,editor = $m.id(me_id).contentWindow.document
			,cmd = $m.attr.get(in_id, "data-mjf_me_cmd")
			,cur_iframe_doc = $m.tag.get_iframe_doc("magic_" + $m.attr.get(in_id, "data-mjf_me_editor"));

		if($m.vd.is_msie === false)
		{
			if($m.t.magic_editor.btns[cmd].use_css === true)
			{
				editor.execCommand("styleWithCSS", null, true);
			}
			else
			{
				editor.execCommand("styleWithCSS", null, false);
			}
		}

		switch($m.t.magic_editor.btns[cmd].command_type)
		{
			case "default":
				editor.execCommand($m.t.magic_editor.btns[cmd].command(), false, null);
				break;

			case "dropdown":
				if($m.vd.is_msie === true)
				{
					$m.t.magic_editor.selection.restore(me_id);
				}

				editor.execCommand($m.t.magic_editor.btns[cmd].command(), false, $m.t.magic_editor.btns[cmd].values[$m.attr.get(in_id, "data-mjf_me_cmd_opt")]);
				break;

			case "custom":
				$m.t.magic_editor.btns[cmd].command(in_id, in_event);
				break;
		}

		id.blur();
		$m.t.magic_editor.set_cur_ed(in_id);
		$m.t.magic_editor.btns_deactivate($m.attr.get(in_id, "data-mjf_me_taid"));
		cur_iframe_doc.body.focus();
		return false;
	}

	// $m.t.magic_editor.click_dr(IN_ID)
	,click_dr : function(in_id, in_event)
	{
		var ta_id = $m.attr.get(in_id, "data-mjf_me_taid")
			,me_id = "magic_" + $m.attr.get(in_id, "data-mjf_me_editor");
		
		$m.id(in_id).blur();
		$m.t.magic_editor.set_cur_ed(in_id);

		if($m.is.alive($m.id(ta_id).value) === false)
		{
			$m.tag.get_iframe_doc(me_id).body.focus();
			$m.t.magic_editor.selection.save(me_id, in_event);
		}
	}

	// $m.t.magic_editor.over()
	,over : function(in_id)
	{
		$m.id(in_id).style.borderColor = "#b2bcd0";
	}

	// $m.t.magic_editor.out()
	,out : function(in_id)
	{
		$m.id(in_id).style.borderColor = ($m.vd.is_msie6_or_lower === true) ? "#dbdbda" : "transparent";
	}

	// $m.t.magic_editor.toggle_dropdown()
	,toggle_dropdown : function(in_id, in_event)
	{
		$m.css_class.add(in_id + "_b", "visibility_visible");
		$m.id("magic_editor_palette").style.visibility = "hidden";
		$m.id(in_id).focus();
		$m.stop_bubble(in_event);
		return false;
	}

	// $m.t.magic_editor.show_palette()
	,show_palette : function(in_id, in_event)
	{
		var id = $m.id(in_id)
			,id_pos = $m.position.get_xy(in_id)
			,palette_id = $m.id("magic_editor_palette");

		$m.t.magic_editor.hide_dropdowns();

		palette_id.style.left = id_pos[0] + "px";
		palette_id.style.top = id_pos[1] + 19 + "px";
		id.style.borderColor = "#bcbecd";

		$m.t.magic_editor.set_cur_ed(in_id);
		palette_id.style.visibility = "visible";
		
		$m.stop_bubble(in_event);
		return false;
	}

	// $m.t.magic_editor.set_cur_ed(in_id)
	,set_cur_ed : function(in_id)
	{
		$m.t.magic_editor.cur_ed = $m.attr.get(in_id, "data-mjf_me_editor");
		$m.t.magic_editor.cur_cmd = $m.attr.get(in_id, "data-mjf_me_cmd");
	}

	// $m.t.magic_editor.hide_dropdowns()
	,hide_dropdowns : function(in_id, in_event)
	{
		for(var i=0, len=$m.t.magic_editor.dds.length; i < len; i++)
		{
			$m.css_class.remove($m.t.magic_editor.dds[i], "visibility_visible");
		}
	}

	// $m.t.magic_editor.hide_everything()
	,hide_everything : function()
	{
		$m.id("magic_editor_palette").style.visibility = "hidden";
		$m.t.magic_editor.hide_dropdowns();
	}

	// $m.t.magic_editor.selection
	,selection :
	{
		 txt : ""
		,html : ""
	
		 // $m.t.magic_editor.selection.save(in_me_id, in_event)
		,save : function(in_me_id, in_event)
		{
			//$m.de.add_item("in_event = " + in_event);
		
			var me_id = $m.id(in_me_id)
				,win = me_id.contentWindow
				,doc = win.document;

			if($m.vd.is_msie8_or_lower)
			{
				$m.t.magic_editor.cur_selection = doc.selection.createRange();
				$m.t.magic_editor.selection.html = $m.t.magic_editor.cur_selection.htmlText;
			}
			else 
			{
				$m.t.magic_editor.cur_selection = win.getSelection();
				$m.t.magic_editor.idiv.innerHTML = "";
				$m.t.magic_editor.idiv.appendChild($m.t.magic_editor.cur_selection.getRangeAt(0).cloneContents());
				$m.t.magic_editor.selection.html = $m.t.magic_editor.idiv.innerHTML;
			}

			$m.t.magic_editor.selection.txt = $m.t.magic_editor.selection.get_as_text(in_me_id);
			
			if($m.is.alive(in_event) === true)
			{
				$m.t.magic_editor.selection.event = $m.event.get(in_event);
				$m.t.magic_editor.selection.event_target = $m.event.get_target($m.t.magic_editor.selection.event);
			}
		}
		
		// $m.t.magic_editor.selection.restore(in_me_id)
		,restore : function(in_me_id)
		{
			var me_id = $m.id(in_me_id)
				,win = me_id.contentWindow
				,doc = win.document;
			
			if(doc.selection && doc.selection.createRange)
			{
				try
				{
					var range = doc.body.createTextRange();
					range.findText($m.t.magic_editor.selection.html);
					range.select();
				}
				catch(e){}
			}
		}

		// $m.t.magic_editor.selection.get_text(in_me_id)
		,get_as_text : function(in_me_id)
		{
			var me_id = $m.id(in_me_id)
				,win = me_id.contentWindow
				,doc = win.document
				,selection = $m.t.magic_editor.cur_selection;
			
			if(win.getSelection)
			{
				return selection.toString();
			}
			else if(doc.selection && doc.selection.createRange)
			{
				return selection.text;
			}
		}
	}

	// $m.t.magic_editor.replace_entities(in_content)
	,replace_entities : function(in_content)
	{
		var replace_entities = "";
	
		for(var i in $m.t.magic_editor.entities)
		{
			for(var j in $m.t.magic_editor.entities[i])
			{
				replace_entities = new RegExp(String.fromCharCode($m.t.magic_editor.entities[i][j][1]), 'gm');
				in_content = in_content.replace(replace_entities, '&' + j + ';');
			}
		}

		return in_content;
	}


	// $m.t.magic_editor.clean(in_content)
	,clean : function(in_content)
	{
		var match_this = ""
			,replace_with = ""
			,removed_cnt = "";
		
		// trim
		in_content.replace(/^\s+|\s+$/g, "");
		
		// lower case tags
		match_this = new RegExp("<(/?)([A-Z]+)", "g");
		replace_with = "<$1$2";
		in_content = in_content.replace(match_this, function(replace_with)
		{
			return replace_with.toLowerCase();
		});

		// Word junk
		var bull = String.fromCharCode(8226)
			,middot = String.fromCharCode(183);

		in_content = in_content.replace(new RegExp('<p class=MsoHeading.*?>(.*?)<\/p>', 'gim'), '<p><strong>$1</strong></p>');
		in_content = in_content.replace(new RegExp('<span>(.*?)<\/span>', 'gim'), '$1');
		in_content = in_content.replace(/<o:p><\/o:p>/gim, '');

		in_content = in_content.replace(new RegExp(' class="?MsoNormal"?', 'gim'), '');
		in_content = in_content.replace(new RegExp(' class="?NormalWeb7"?', 'gim'), '');
		in_content = in_content.replace(new RegExp(' style="margin: 0in 0in 0pt;?"', 'gim'), '');
		in_content = in_content.replace(new RegExp(' style=""', 'gim'), '');
		in_content = in_content.replace(new RegExp('mso-bidi-font-weight', 'gim'), 'font-weight');
		in_content = in_content.replace(new RegExp('<b style="font-weight: normal">(.+?)</b>', 'gim'), '$1');
		in_content = in_content.replace(new RegExp(' style="mso-tab-count: [0-9]+"', 'gim'), '');
		in_content = in_content.replace(new RegExp('tab-stops: list [0-9]+.0pt">', 'gim'), '">' + "--list--");
		in_content = in_content.replace(new RegExp(bull + "(.*?)<BR>", "gim"), "<p>" + middot + "$1</p>");
		in_content = in_content.replace(new RegExp('<SPAN style="mso-list: Ignore">', 'gim'), "<span>" + bull);
		in_content = in_content.replace(new RegExp('<b>(.*?)<\/b>', 'gim'), '<strong>$1</strong>');
		in_content = in_content.replace(new RegExp('<i>(.*?)<\/i>', 'gim'), '<em>$1</em>');

		/*
		in_content = in_content.replace(/<(\/)*(\\?xml:|meta|link|span|font|del|ins|st1:|[ovwxp]:)((.|\s)*?)>/gim, ''); // Unwanted tags
		in_content = in_content.replace(/(style|type|start)=("(.*?)"|(\w*))/gim, ''); // Unwanted sttributes
		in_content = in_content.replace(/<style(.*?)style>/gim, '');   // Style tags
		in_content = in_content.replace(/<script(.*?)script>/gim, ''); // Script tags
		in_content = in_content.replace(/<!--(.*?)-->/gim, '');
		*/

		// Gecko cleanup
		in_content = in_content.replace(new RegExp('-moz-background-inline-policy:', 'gim'), '');
		in_content = in_content.replace(new RegExp('-moz-background-origin:', 'gim'), '');
		in_content = in_content.replace(new RegExp('-moz-background-clip:', 'gim'), '');
		in_content = in_content.replace(new RegExp('\\s-moz-initial;', 'gim'), '');

		// Webkit cleanup
		in_content = in_content.replace(new RegExp(' class="?Apple-style-span"?', 'gim'), '');
		in_content = in_content.replace(new RegExp(' class="?webkit-block-placeholder"?', 'gim'), '');

		// quote attributes
		for(i=0; i < $m.t.magic_editor.attributes.length; i++)
		{
			match_this = new RegExp("\\s" + $m.t.magic_editor.attributes[i] + "=([\\w|-]+)\\b", "gim");
			replace_with = " " + $m.t.magic_editor.attributes[i] + "=\"$1\"";
			in_content = in_content.replace(match_this, replace_with);
		}

		// lower case style
		match_this = new RegExp("style=\"([\\w+-?\\w+\\s?:\\s?\\w+;?]+)\"", "g");
		replace_with = "style=\"$1\"";
		in_content = in_content.replace(match_this, function(replace_with)
		{
			return replace_with.toLowerCase();
		});

		// add new lines after block elements
		for(i=0, len=$m.t.magic_editor.newlines_after.length; i<len; i++)
		{
			match_this = new RegExp("</(" + $m.t.magic_editor.newlines_after[i] + ")>(?!\\n|\\r)", 'gim');
			replace_with = "</$1>\n";
			in_content = in_content.replace(match_this, replace_with);
		}

		//return in_content;

		// fonts to spans - ugly but works for most cases
		/*
		in_content = in_content.replace(new RegExp('<font', 'gim'), '<span');
		in_content = in_content.replace(new RegExp(' color="(.*?)"', 'gim'), ' style="color:$1;"');
		in_content = in_content.replace(new RegExp(' face="(.*?)"', 'gim'), ' style="font-family:$1;"');
		in_content = in_content.replace(new RegExp(' style="(.*?)" style="(.*?)" style="(.*?)"', 'gim'), ' style="$1$2$3"');
		in_content = in_content.replace(new RegExp(' style="(.*?)" style="(.*?)"', 'gim'), ' style="$1$2"');
		in_content = in_content.replace(new RegExp('</font>', 'gim'), '</span>');
		*/
		
		return $m.t.magic_editor.replace_entities(in_content);
	}

	// $m.t.magic_editor.inject_html(in_html, in_type)
	,inject_html : function(in_html, in_type)
	{
		var me_id_doc = $m.tag.get_iframe_doc("magic_" + $m.t.magic_editor.cur_ed)
			,me_id_body = me_id_doc.body;
		
		if(me_id_body.innerHTML == "" || me_id_body.innerHTML == "<br>")
		{
			me_id_body.innerHTML = in_html;
			return true;
		}
	
		if($m.vd.is_msie8_or_lower === true)
		{
			try
			{
				switch(in_type)
				{
					case "block":
						in_html = "<div>" + in_html + "</div>";
						break;
					case "inline":
						in_html = "<span>" + in_html + "</span>";
						break;
				}

				return $m.t.magic_editor.cur_selection.pasteHTML(in_html);
			}
			catch(e)
			{
				$m.de.throw_browser_error("$m.t.magic_editor.inject_html() --- cannot pasteHTML()");
				return false;
			}
		}
		else
		{
			var anything_selected = $m.selection.get(me_id_doc);

			if(anything_selected == "")
			{
				$m.t.magic_editor.selection.restore("magic_" + $m.t.magic_editor.cur_ed);
			}

			$m.selection.replace(in_html, me_id_doc);
			return true;
		}
	}


	// $m.t.magic_editor.send()
	,send : function(in_id)
	{
		if($m.config.global_debug !== false)
		{
			$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Executing >>> $m.t.magic_editor.send(" + in_id + ")");
		}

		var id = $m.id(in_id)
			,all = $m.t.magic_editor.all
			,tmp_id = ""
			,tmp_iframe = ""
			,html_val = ""
			,stripped_cont = "";

		for(var i in all)
		{
			tmp_id = $m.id(all[i]);
			tmp_iframe = $m.tag.get_iframe_doc("magic_editor_" + i);

			if($m.is.alive(tmp_id) === false || tmp_iframe === false)
			{
				continue;
			}

			html_val = ($m.css_class.has(tmp_id, "display_none") === true) ? tmp_iframe.body.innerHTML : html_val = tmp_id.value;
			tmp_id.value = $m.t.magic_editor.clean(html_val);
			
			tmp_id.value = tmp_id.value.replace(new RegExp('<span class="magic_editor_search_results">(.*?)<\/span>', 'gim'), '$1');
			
			/*
			stripped_cont = $m.tags.strip.from_cont(tmp_id.value).replace(/^\s+|\s+$/g, "");
			
			if(stripped_cont.length == 1 || stripped_cont == "<br>" || stripped_cont == "")
			{
				tmp_id.value = "";
			}
			*/
			
			if(tmp_id.value == "<br>")
			{
				tmp_id.value = "";
			}
		}

		if($m.t.magic_editor.debug === true)
		{
			return false;
		}
	}


	// $m.t.magic_editor.load_btns()
	,load_btns : function()
	{
		// List of default buttons
		$m.t.magic_editor.btns =
		{
			bold :
			{
				 name : "bold"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.bold
				,win_keystroke : "Ctrl+B"
				,mac_keystroke : "Cmd+B"
				,command_type : "default"
				,command : function() { return "bold"; }
			}
	
			,italic :
			{
				 name : "italic"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.italic
				,win_keystroke : "Ctrl+I"
				,mac_keystroke : "Cmd+I"
				,command_type : "default"
				,command : function() { return "italic"; }
			}
			
			,underline :
			{
				 name : "underline"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.underline
				,win_keystroke : "Ctrl+U"
				,mac_keystroke : "Cmd+U"
				,command_type : "default"
				,command : function() { return "underline"; }
			}
	
			,strikethrough :
			{
				 name : "strikethrough"
				,use_css : true
				,title : $m.lang.magic_editor.btn_titles.strikethrough
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "default"
				,command : function() { return "strikethrough"; }
			}
	
			,justify_left :
			{
				 name : "justify_left"
				,use_css : true
				,title : $m.lang.magic_editor.btn_titles.justify_left
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "default"
				,command : function() { return "justifyleft"; }
			}
			
			,justify_center :
			{
				 name : "justify_center"
				,use_css : true
				,title : $m.lang.magic_editor.btn_titles.justify_center
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "default"
				,command : function() { return "justifycenter"; }
			}
			
			,justify_right :
			{
				 name : "justify_right"
				,use_css : true
				,title : $m.lang.magic_editor.btn_titles.justify_right
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "default"
				,command : function() { return "justifyright"; }
			}
			
			,list_ordered :
			{
				 name : "list_ordered"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.list_ordered
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "default"
				,command : function() { return "insertorderedlist"; }
			}
			
			,list_unordered :
			{
				 name : "list_unordered"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.list_unordered
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "default"
				,command : function() { return "insertunorderedlist"; }
			}
			
			,indent :
			{
				 name : "indent"
				,use_css : true
				,title : $m.lang.magic_editor.btn_titles.indent
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "default"
				,command : function() { return "indent"; }
			}
			
			,outdent :
			{
				 name : "outdent"
				,use_css : true
				,title : $m.lang.magic_editor.btn_titles.outdent
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "default"
				,command : function() { return "outdent"; }
			}
			
			,superscript :
			{
				 name : "superscript"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.superscript
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "default"
				,command : function() { return "superscript"; }
			}
			
			,subscript :
			{
				 name : "subscript"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.subscript
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "default"
				,command : function() { return "subscript"; }
			}
	
			,content_style :
			{
				 name : "content_style"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.content_style
				,win_keystroke : ""
				,mac_keystroke : ""
				,options : [$m.lang.magic_editor.btn_titles.content_style_paragraph, $m.lang.magic_editor.btn_titles.content_style_heading_1, $m.lang.magic_editor.btn_titles.content_style_heading_2, $m.lang.magic_editor.btn_titles.content_style_heading_3]
				,values : ["<p>","<h1>","<h2>","<h3>"]
				,styles : ["font-size: 12px;","font-size: 18px;","font-size: 16px;","font-size: 14px;"]
				,command_type : "dropdown"
				,command : function() { return "formatblock"; }
			}
	
			,font_family :
			{
				 name : "font_family"
				,use_css : true
				,title : $m.lang.magic_editor.btn_titles.font_family
				,win_keystroke : ""
				,mac_keystroke : ""
				,options : ["Arial","Courier New","Georgia","Tahoma","Times New Roman","Verdana"]
				,values : ["Arial","Courier New","Georgia","Tahoma","Times New Roman","Verdana"]
				,styles : ["font-family: Arial, sans-serif;","font-family: Courier New, monospace;","font-family: Tahoma, sans-serif;","font-family: Times New Roman, serif;","font-family: Georgia, serif;","font-family: Verdana, serif;"]
				,command_type : "dropdown"
				,command : function() { return "fontname"; }
			}
			
			,font_size :
			{
				 name : "font_size"
				,use_css : true
				,title : $m.lang.magic_editor.btn_titles.font_size
				,win_keystroke : ""
				,mac_keystroke : ""
				,options : [$m.lang.magic_editor.btn_titles.font_size_small, $m.lang.magic_editor.btn_titles.font_size_normal, $m.lang.magic_editor.btn_titles.font_size_large, $m.lang.magic_editor.btn_titles.font_size_huge]
				,values : ["1","3","5","7"]
				,styles : ["font-size: 9px;","font-size: 12px;","font-size: 16px;","font-size: 22px;"]
				,command_type : "dropdown"
				,command : function() { return "fontsize"; }
			}
			
			,font_color :
			{
				 name : "font_color"
				,use_css : true
				,title : $m.lang.magic_editor.btn_titles.font_color
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "palette"
				,command : function() { return "forecolor"; }
			}
			
			,hilite_color :
			{
				 name : "hilite_color"
				,use_css : true
				,title : $m.lang.magic_editor.btn_titles.hilite_color
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "palette"
				,command : function() { return ($m.vd.is_msie === true) ? "backcolor" : "hilitecolor"; }
			}
	
			,blockquote :
			{
				 name : "blockquote"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.blockquote
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "custom"
				,command : function(in_id, in_event)
				{
					$m.t.magic_editor.set_cur_ed(in_id);
					$m.t.magic_editor.selection.save("magic_" + $m.t.magic_editor.cur_ed, in_event);
					
					if($m.vd.is_msie === true)
					{
						$m.t.magic_editor.inject_html("<blockquote>" + $m.t.magic_editor.selection.html + "</blockquote>", "block");
					}
					else
					{
						var editor = $m.attr.get(in_id, "data-mjf_me_editor")
							,current_textarea_id = $m.id($m.t.magic_editor.all[$m.attr.get(in_id, "data-mjf_me_taid")])
							,iframe_doc = $m.tag.get_iframe_doc("magic_" + editor);
		
						current_textarea_id.value = iframe_doc.body.innerHTML.replace($m.t.magic_editor.selection.html, "MAGIC_EDITOR_PLACEHOLDER");
						
						if(current_textarea_id.value.match("<p>MAGIC_EDITOR_PLACEHOLDER</p>"))
						{
							iframe_doc.body.innerHTML = current_textarea_id.value.replace("<p>MAGIC_EDITOR_PLACEHOLDER</p>", "<blockquote><p>" + $m.t.magic_editor.selection.html + "</p></blockquote>");
						}
						else
						{
							iframe_doc.body.innerHTML = current_textarea_id.value.replace("MAGIC_EDITOR_PLACEHOLDER", "<blockquote>" + $m.t.magic_editor.selection.html + "</blockquote>");
						}
					}
				}
			}
	
			,remove_formatting :
			{
				 name : "remove_formatting"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.remove_formatting
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "custom"
				,command : function(in_id)
				{
					if(confirm($m.lang.magic_editor.confirm_clean_content))
					{
						var editor = $m.attr.get(in_id, "data-mjf_me_editor")
							,iframe_doc = $m.tag.get_iframe_doc("magic_" + editor);

						d = iframe_doc.body.innerHTML;
						iframe_doc.body.innerHTML = cleanHTML();
						iframe_doc.execCommand("removeFormat", false, null);
					}
				}
			}
	
			,hyperlink :
			{
				 name : "hyperlink"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.hyperlink
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "darkroom"
				,darkroom_url : $m.config.basedir + "tricks/magic_editor/pages/hyperlink.html"
				,darkroom_dims : "400x250"
				,command : function() { return; }
			}
	
			,image :
			{
				 name : "image"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.image
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "darkroom"
				,darkroom_url : $m.config.basedir + "tricks/magic_editor/pages/image.html"
				,darkroom_dims : "500x565"
				,command : function() { return; }
			}
	
			,video :
			{
				 name : "video"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.video
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "darkroom"
				,darkroom_url : $m.config.basedir + "tricks/magic_editor/pages/video.html"
				,darkroom_dims : "500x320"
				,command : function() { return; }
			}
			
			,paste_msword :
			{
				 name : "paste_msword"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.paste_msword
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "darkroom"
				,darkroom_url : $m.config.basedir + "tricks/magic_editor/pages/paste_msword.html"
				,darkroom_dims : "850x565"
				,command : function() { return; }
			}
			
			,special_characters :
			{
				 name : "special_characters"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.special_characters
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "darkroom"
				,darkroom_url : $m.config.basedir + "tricks/magic_editor/pages/special_characters.html"
				,darkroom_dims : "505x230"
				,command : function() { return; }
			}

			,table : {
				 name : "table"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.table
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "darkroom"
				,darkroom_url : $m.config.basedir + "tricks/magic_editor/pages/table.html"
				,darkroom_dims : "400x540"
				,command : function() { return; }
			}

			,view_full :
			{
				 name : "view_full"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.view_full
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "custom"
				,command : function(in_id)
				{
					var current_editor = $m.attr.get(in_id, "data-mjf_me_editor")
						,current_editor_cnt = $m.attr.get(in_id, "data-mjf_me_taid")
						,current_magic_div = "magic_" + current_editor + "_1_c"
						,current_toolbar_1 = "magic_" + current_editor + "_1_tb"
						,current_iframe = "magic_" + current_editor
						,current_iframe_id = $m.id(current_iframe);

					// Switching to normal size mode
					if($m.css_class.has(in_id, "magic_editor_border_4986fe") === true)
					{
						$m.css_class.remove($m.body_id, "overflow_hidden");
						$m.css_class.remove(current_magic_div, "magic_editor_view_full");
						$m.css_class.remove(current_toolbar_1, "width_full");
						
						current_iframe_id.style.height = $m.t.magic_editor.cur_iframe_height;
						current_iframe_id.style.width = $m.t.magic_editor.cur_iframe_width;

						$m.css_class.remove(in_id, "magic_editor_border_4986fe");

						$m.smooth_scroll.construct(current_magic_div);
					}
					// Switching to full window mode
					else
					{
						$m.smooth_scroll.construct($m.body_id);
					
						$m.css_class.add($m.body_id, "overflow_hidden");
						$m.css_class.add(current_magic_div, "magic_editor_view_full");
						$m.css_class.add(current_toolbar_1, "width_full");
						
						$m.t.magic_editor.cur_iframe_height = current_iframe_id.style.height;
						$m.t.magic_editor.cur_iframe_width = current_iframe_id.style.width;
						
						$m.vd.get_view_port();
						current_iframe_id.style.height = ($m.vd.visible_page_height - 70) + "px";

						$m.css_class.add(in_id, "magic_editor_border_4986fe");
					}
				}
			}

			,code_view :
			{
				 name : "mode_code"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.code_view
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "darkroom"
				,darkroom_url : $m.config.basedir + "tricks/magic_editor/pages/code_view.html"
				,darkroom_dims : "850x540"
				,command : function() { return; }
			}

			,clean_code :
			{
				 name : "clean_code"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.clean_code
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "custom"
				,command : function(in_id)
				{
					var editor = $m.attr.get(in_id, "data-mjf_me_editor")
						current_iframe = "magic_" + editor
						current_textarea = $m.t.magic_editor.all[$m.attr.get(in_id, "data-mjf_me_taid")]
						current_iframe_id = $m.id(current_iframe)
						current_textarea_id = $m.id(current_textarea)
						iframe_doc = $m.tag.get_iframe_doc(current_iframe);
	
					if($m.css_class.has(current_textarea, "display_none") === true)
					{
						iframe_doc.body.innerHTML = $m.t.magic_editor.clean(iframe_doc.body.innerHTML);
					}
					else
					{
						current_textarea_id.value = $m.t.magic_editor.clean(current_textarea_id.value);
					}
				}
			}
	
			,undo :
			{
				 name : "undo"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.undo
				,win_keystroke : ""
				,mac_keystroke : "Cmd+Z"
				,command_type : "default"
				,command : function() { return "undo"; }
			}
	
			,redo :
			{
				 name : "redo"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.redo
				,win_keystroke : ""
				,mac_keystroke : "Shift+Cmd+Z"
				,command_type : "default"
				,command : function() { return "redo"; }
			}
	
			,search :
			{
				 name : "search"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.search
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "darkroom"
				,darkroom_url : $m.config.basedir + "tricks/magic_editor/pages/search.html"
				,darkroom_dims : "400x250"
				,command : function() { return; }
			}
	
			,help :
			{
				 name : "help"
				,use_css : false
				,title : $m.lang.magic_editor.btn_titles.help
				,win_keystroke : ""
				,mac_keystroke : ""
				,command_type : "darkroom"
				,darkroom_url : ($m.vd.is_macintosh === true) ? $m.config.basedir + "tricks/magic_editor/pages/help_mac.html" : $m.config.basedir + "tricks/magic_editor/pages/help_pc.html"
				,darkroom_dims : "600x500"
				,command : function() { return; }
			}
	
			,separator :
			{
				 name : "separator"
			}
		}

		for(var i in $m.t.magic_editor.buttons)
		{
			$m.t.magic_editor.btns[i] = $m.t.magic_editor.buttons[i];
		}
	}
}

