/***************************************************************************
- File: drag_n_drop.js
- Version: 14.2.14
- java -jar compiler2.jar --js drag_n_drop.src.js --js_output_file drag_n_drop.VERSION.js
***************************************************************************/

$m.trick.drag_n_drop = {};

$m.t.drag_n_drop =
{
	 name : "drag_n_drop"

	,data_att_handle : "drag_n_drop_handle"
	,data_att_parent : "data-mjf_drag_n_drop_parent"
	,data_att_value : "data-mjf_drag_n_drop_value"
	,data_att_update_field : "data-mjf_drag_n_drop_update_field"
	,data_att_callback : "data-mjf_drag_n_drop_callback"
	,data_att_remove : "data-mjf_drag_n_drop_remove"

	,is_handle : false


	/**
	 * Main constructor for trick -- $m.t.drag_n_drop.construct()
	 * 
	 */
	,construct : function(in_wand)
	{
		//$m.de.add_item("Executing >>> $m.t.drag_n_drop.construct()");
	
		if($m.is.alive($m.lang.drag_n_drop) === false)
		{
			$m.insert_link.script($m.config.basedir + "tricks/drag_n_drop/lang/" + $m.config.lang + ".js");
		}
	}


	/**
	 *  -- $m.t.drag_n_drop.sort
	 * 
	 */
	,sort :
	{
		 name : "sort"
		,data_att : "drag_n_drop_sort"
		,data_att_parent_set : "data-mjf_drag_n_drop_parent_set"
		,source : null
		,placeholder : null
		,valids : []

		/**
		 * Initializes the sort drag and drop -- $m.t.drag_n_drop.sort.construct()
		 * 
		 *
		 */
		,construct : function()
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.sort.construct()");
		
			var dnd_containers = $m.attr.get_tags_with($m.tags.all, $m.data_att, $m.t.drag_n_drop.sort.data_att)
				,dnd_container_id_string = ""
				,dnd_container_id = ""
				,allow_delete = false
				,set_parent = false
				,child_id_string = ""
				,child_id = ""
				,drag_helper_id_string = "mjs_drag_helper";
			
			for(var i=0, dlen=dnd_containers.length; i < dlen; i++)
			{
				dnd_container_id_string = $m.attr.get(dnd_containers[i], "id");
				dnd_container_id = $m.id(dnd_container_id_string);
				
				allow_delete = $m.attr.has_value(dnd_container_id_string, $m.t.drag_n_drop.data_att_remove, "true");
				set_parent = $m.attr.get(dnd_container_id_string, $m.t.drag_n_drop.sort.data_att_parent_set);

				for(var j=0, clen=dnd_container_id.childNodes.length; j < clen; j++)
				{
					if(dnd_container_id.childNodes[j].nodeName != "#text" && dnd_container_id.childNodes[j].nodeName != "#comment")
					{
						child_id_string = $m.attr.get(dnd_container_id.childNodes[j], "id");
						child_id = $m.id(child_id_string);
						
						if($m.attr.has_value(child_id_string, "class", "dnd_sort_box") === true)
						{
							if($m.is.alive(set_parent) === false)
							{
								set_parent = dnd_container_id_string;
							}
						
							$m.attr.set(child_id_string,
							{
								 "draggable" : "true"
								,"data-mjf_drag_n_drop_parent" : dnd_container_id_string
								,"data-mjf_drag_n_drop_parent_set" : set_parent
							});


							if($m.is.alive(allow_delete) === true && $m.is.alive(child_id) === true && child_id.innerHTML.indexOf("icon_clear") == -1)
							{
								$m.tag.html(child_id, '<img src="' + $m.config.basedir + 'images/icons/icon_clear.png" class="dnd_sort_box_remove" alt="Remove?" onclick="$m.t.drag_n_drop.sort.remove(\'' + child_id_string + '\')">', "prepend");
							}

							if($m.vd.is_mobile_touch === true)
							{
								$m.element.attach(child_id_string, "touchstart", $m.t.drag_n_drop.sort.drag_start);
								$m.element.attach(child_id_string, "touchmove", $m.t.drag_n_drop.sort.touch_move);
								$m.element.attach(child_id_string, "touchend", $m.t.drag_n_drop.sort.touch_end);
							}
							else
							{
								$m.css_class.add(child_id_string, "dnd_grab");
								$m.css_class.add(child_id_string, "mjf_atrans");
							
								$m.element.attach(child_id_string, "dragstart", $m.t.drag_n_drop.sort.drag_start);
								$m.element.attach(child_id_string, "dragenter", $m.t.drag_n_drop.sort.drag_enter);
								$m.element.attach(child_id_string, "dragover", $m.t.drag_n_drop.sort.drag_over);
								$m.element.attach(child_id_string, "dragleave", $m.t.drag_n_drop.sort.drag_leave);
								$m.element.attach(child_id_string, "drop", $m.t.drag_n_drop.sort.drag_drop);
								$m.element.attach(child_id_string, "dragend", $m.t.drag_n_drop.sort.drag_end);

								//$m.element.attach(child_id_string, "click", $m.t.drag_n_drop.sort.test);

								if(dnd_container_id.childNodes[j].dragDrop && $m.vd.is_msie9_or_lower === true)
								{
									$m.element.attach(dnd_container_id.childNodes[j], "mousedown", function(in_object)
									{
										return function()
										{
											in_object.dragDrop();
										};
									
									} (dnd_container_id.childNodes[j]));
								}
							}
							
							var dnd_sort_box_kids = $m.tags.get(child_id, "*");
							
							for(var k=0, klen=dnd_sort_box_kids.length; k < klen; k++)
							{
								if($m.attr.has_value(dnd_sort_box_kids[k], "data-mjf_drag_n_drop_ignore", "true") === true)
								{
									$m.attr.set(dnd_sort_box_kids[k], { "data-mjf_drag_n_drop_parent" : child_id_string });

									$m.element.attach(dnd_sort_box_kids[k], "mousedown", $m.t.drag_n_drop.set.handle_false);
									$m.element.attach(dnd_sort_box_kids[k], "mouseup", $m.t.drag_n_drop.set.handle_true);
								}
							}
						}
					}
				}
			}

			$m.tag.create($m.body_id, "div",
			{
				 "class" : "dnd_sort_box display_none"
				,"id" : drag_helper_id_string
			});

			$m.t.drag_n_drop.sort.placeholder = $m.id(drag_helper_id_string);
			$m.attr.set(drag_helper_id_string, { "draggable" : "true" });
			
			$m.element.attach(drag_helper_id_string, "dragover", $m.t.drag_n_drop.sort.drag_over);
			$m.element.attach(drag_helper_id_string, "drop", $m.t.drag_n_drop.sort.drag_drop);
			
			$m.t.drag_n_drop.sort.update_fields();
		}


		// $m.t.drag_n_drop.sort.test()
		,test : function(in_event)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.sort.test()");
		}


		// $m.t.drag_n_drop.sort.drag_start()
		,drag_start : function(in_event)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.sort.drag_start()");
			//$m.de.add_item("this.id = " + this.id);

			var this_event = $m.event.get(in_event)
				,this_target = $m.event.get_target(this_event)
				,this_element = ($m.is.alive(this.id) === true) ? this : this_target;

			$m.t.drag_n_drop.sort.source = ($m.is.alive(this.id) === true) ? this.id : this_target.id;

			try
			{
				this_event.dataTransfer.effectAllowed = "move";
				this_event.dataTransfer.setData("text/html", this.innerHTML);
			}
			catch(e){ }

			if($m.is.alive(this_event.touches) === true && this_event.touches.length == 1)
			{
				var touch = this_event.touches[0]
					,pos = $m.position.get_xy($m.t.drag_n_drop.sort.source);

				$m.attr.set($m.t.drag_n_drop.sort.source,
				{
					 "data-mjf_drag_n_drop_free_x" : (touch.pageX - pos[0])
					,"data-mjf_drag_n_drop_free_y" : (touch.pageY - pos[1])
				});
				
				$m.stop_bubble(this_event);
			}
		}


		// $m.t.drag_n_drop.sort.drag_enter()
		,drag_enter : function(in_event)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.sort.drag_enter()");
			//$m.de.add_item("this.id = " + this.id);

			var this_event = $m.event.get(in_event)
				,this_target = $m.event.get_target(this_event)
				,this_element = ($m.is.alive(this.id) === true) ? this : this_target
				,this_parent = $m.attr.get(this_element, $m.t.drag_n_drop.data_att_parent)
				,set_parent = $m.attr.get($m.t.drag_n_drop.sort.source, $m.t.drag_n_drop.sort.data_att_parent_set);
			
			if($m.attr.has_value(this_target, "class", "dnd_sort_box") === false)
			{
				return;
			}

			if(this_parent != set_parent && set_parent != "any")
			{
				return false;
			}

			//if($m.t.drag_n_drop.sort.source != this_element)
			if($m.id($m.t.drag_n_drop.sort.source) != this_element)
			{
				var this_prev_sib = $m.tag.get_prev_sibling(this_element)
					,this_next_sib = $m.tag.get_next_sibling(this_element);
			
				if($m.is.alive(this_prev_sib) === false)
				{
					$m.tag.insert_before(this_element, $m.t.drag_n_drop.sort.placeholder);
				}
				
				else if($m.is.alive(this_prev_sib) === true && this_prev_sib != $m.t.drag_n_drop.sort.placeholder && $m.is.alive(this_next_sib) === true && this_next_sib != $m.t.drag_n_drop.sort.placeholder)
				{
					$m.tag.insert_after(this_element, $m.t.drag_n_drop.sort.placeholder);
				}
				
				else if($m.is.alive(this_prev_sib) === true && this_prev_sib == $m.t.drag_n_drop.sort.placeholder)
				{
					$m.tag.insert_after(this_element, $m.t.drag_n_drop.sort.placeholder);
				}
				
				else if($m.is.alive(this_next_sib) === true && this_next_sib == $m.t.drag_n_drop.sort.placeholder)
				{
					$m.tag.insert_before(this_element, $m.t.drag_n_drop.sort.placeholder);
				}
			}
			else
			{
				$m.tag.insert_before(this_element, $m.t.drag_n_drop.sort.placeholder);
				$m.css_class.add(this_element, "dnd_grab_current");
			}

			$m.css_class.replace($m.t.drag_n_drop.sort.placeholder, "display_none", "display_block");
		}


		// $m.t.drag_n_drop.sort.drag_over()
		,drag_over : function(in_event)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.sort.drag_over()");
			//$m.de.add_item("this.id = " + this.id);

			in_event.dataTransfer.dropEffect = "move";
			$m.stop_bubble(in_event);
		}


		// $m.t.drag_n_drop.sort.drag_leave()
		,drag_leave : function(in_event)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.sort.drag_leave()");
			//$m.de.add_item("this.id = " + this.id);
		}


		// $m.t.drag_n_drop.sort.drag_drop()
		,drag_drop : function(in_event)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.sort.drag_drop()");
			//$m.de.add_item("this.id = " + this.id);

			var this_event = $m.event.get(in_event)
				,this_target = $m.event.get_target(this_event)
				,this_element = ($m.is.alive(this.id) === true) ? this : this_target
				,this_parent = $m.attr.get(this_element, $m.t.drag_n_drop.data_att_parent)
				,set_parent = $m.attr.get($m.t.drag_n_drop.sort.source, $m.t.drag_n_drop.sort.data_att_parent_set);

			if($m.is.alive(this_parent) === true)
			{
				if(this_parent != set_parent && set_parent != "any")
				{
					return false;
				}
			}

			$m.stop_bubble(in_event);

			var iframe_kids = $m.tags.get($m.t.drag_n_drop.sort.source, "iframe")
				,holding_tank = {}
				,iframe_doc = ""
				,iframe_id = "";

			if($m.is.alive(iframe_kids) === true)
			{
				for(var i=0, len = iframe_kids.length; i < len; i++)
				{
					iframe_doc = $m.tag.get_iframe_doc(iframe_kids[i]);
					iframe_id = "dnd_iframe_id_" + $m.ut.rand_num();
					$m.attr.set(iframe_kids[i], { "data-mjf_dnd_iframe_id" : iframe_id });

					holding_tank[iframe_id] = [];
					
					try
					{
						holding_tank[iframe_id].head_tag = document.importNode($m.tag.get_head(iframe_doc), true);
						holding_tank[iframe_id].body_tag = document.importNode($m.tag.get_body(iframe_doc), true);
					}
					catch(e)
					{
						//alert("Unable to import nodes in $m.t.drag_n_drop.sort.drag_drop() --- failed because \n\n" + e);
					}

					holding_tank[iframe_id].body_attrs = $m.attr.get_all(iframe_doc.body);
				}
			}
			
			var removed_node = $m.tag.remove($m.t.drag_n_drop.sort.source);
			$m.tag.insert_before(this_element, removed_node);

			iframe_kids = $m.tags.get(removed_node, "iframe");

			if($m.is.alive(iframe_kids) === true)
			{
				setTimeout(function()
				{
					for(var i=0, len = iframe_kids.length; i < len; i++)
					{
						iframe_doc = $m.tag.get_iframe_doc(iframe_kids[i]);
						iframe_id = $m.attr.get(iframe_kids[i], "data-mjf_dnd_iframe_id");
						$m.attr.remove(iframe_kids[i], "data-mjf_dnd_iframe_id");

						try
						{
							if($m.is.alive(holding_tank[iframe_id].head_tag) === true)
							{
								$m.tag.replace($m.tag.get_head(iframe_doc), holding_tank[iframe_id].head_tag);
							}

							if($m.is.alive(holding_tank[iframe_id].body_tag) === true)
							{
								$m.tag.replace($m.tag.get_body(iframe_doc), holding_tank[iframe_id].body_tag);
							}
						}
						catch(e)
						{
							//alert("Unable to replace nodes in $m.t.drag_n_drop.sort.drag_drop() --- failed because \n\n" + e);
						}
					}
				
				}, 10);
			}
			
			$m.css_class.replace($m.t.drag_n_drop.sort.placeholder, "display_block", "display_none");
		}


		// $m.t.drag_n_drop.sort.drag_end()
		,drag_end : function(in_event)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.sort.drag_end()");

			var this_event = $m.event.get(in_event)
				,this_target = $m.event.get_target(this_event)
				,this_element = ($m.is.alive(this.id) === true) ? this : this_target
				,parent_id_string = $m.attr.get(this_element, $m.t.drag_n_drop.data_att_parent)
				,update_field_id_string = $m.attr.get(parent_id_string, $m.t.drag_n_drop.data_att_update_field)
				,update_field_id = $m.is.good_id(update_field_id_string)
				,callback_string = $m.attr.get(parent_id_string, $m.t.drag_n_drop.data_att_callback);

			$m.css_class.remove(this_element, "dnd_grab_current");
			$m.css_class.replace($m.t.drag_n_drop.sort.placeholder, "display_block", "display_none");
			$m.t.drag_n_drop.sort.source = null;
			
			if($m.is.alive(callback_string) === true)
			{
				if($m.is.alive(window[callback_string]) === true)
				{
					window[callback_string](this_element);
				}
				else
				{
					$m.de.throw_browser_error("$m.t.drag_n_drop.sort.drag_end() === data-mjf_drag_n_drop_callback `' + callback_string + '` does not exist.");
				}
			}

			if($m.is.alive(update_field_id) === true)
			{
				$m.t.drag_n_drop.sort.update_fields(parent_id_string);
			}
		}
		
		
		// $m.t.drag_n_drop.sort.remove()
		,remove : function(in_id)
		{
			var do_remove = confirm($m.lang.drag_n_drop.remove)
				,parent_id_string = $m.attr.get(in_id, $m.t.drag_n_drop.data_att_parent);
			
			if(do_remove === true)
			{
				$m.css_class.add(in_id, "dnd_removed");
			
				setTimeout(function()
				{
					$m.tag.remove(in_id);
					$m.t.drag_n_drop.sort.update_fields(parent_id_string);
					
				}, 750);
			}
		}
		
		
		// $m.t.drag_n_drop.sort.touch_move()
		,touch_move : function(in_event)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.sort.touch_move()");

			var this_event = $m.event.get(in_event)
				,this_target = $m.event.get_target(this_event)
				,this_element = ($m.is.alive(this.id) === true) ? this : this_target;
			
			if($m.is.alive(this_event.touches) === true && this_event.touches.length == 1)
			{
				var touch = this_event.touches[0];
	
				this_element.style.position = "absolute";
				this_element.style.left = (touch.pageX - parseInt($m.attr.get(this_element, "data-mjf_drag_n_drop_free_x"))) + "px";
				this_element.style.top = (touch.pageY - parseInt($m.attr.get(this_element, "data-mjf_drag_n_drop_free_y"))) + "px";
				
				var this_prev_sib = $m.tag.get_prev_sibling(this_element)
					,this_next_sib = $m.tag.get_next_sibling(this_element);
				
				//$m.de.add_item("this_element.offsetLeft = " + this_element.offsetLeft);
				//$m.de.add_item("this_element.offsetTop = " + this_element.offsetTop);

				//$m.de.add_item("this_prev_sib.id = " + this_prev_sib.id);
				//$m.de.add_item("this_prev_sib.offsetLeft = " + this_prev_sib.offsetLeft);
				//$m.de.add_item("this_prev_sib.offsetTop = " + this_prev_sib.offsetTop);
				
				//$m.de.add_item("this_next_sib.id = " + this_next_sib.id);

				//$m.tag.insert_before(this_element, $m.t.drag_n_drop.sort.placeholder);
				//$m.css_class.replace($m.t.drag_n_drop.sort.placeholder, "display_none", "display_block");

				$m.stop_bubble(this_event);
			}
		}


		// $m.t.drag_n_drop.sort.touch_end()
		,touch_end : function(in_event)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.sort.touch_end()");
		
			var this_event = $m.event.get(in_event);
			
			if($m.is.alive(this_event.touches) === true && this_event.touches.length == 1)
			{
				var touch = this_event.touches[0];

				
				$m.stop_bubble(this_event);
			}
		}
		
		
		// $m.t.drag_n_drop.sort.update_fields()
		,update_fields : function(in_parent)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.sort.update_fields()");
		
			var dnd_containers = []
				,dnd_container_id = ""
				,update_field = ""
				,child_id_string = ""
				,child_value = ""
				,sort_order = [];
		
			if($m.is.alive(in_parent) === true)
			{
				dnd_containers.push($m.id(in_parent));
			}
			else
			{
				dnd_containers = $m.attr.get_tags_with($m.tags.all, $m.data_att, $m.t.drag_n_drop.sort.data_att);
			}

			for(var i=0, dlen=dnd_containers.length; i < dlen; i++)
			{
				dnd_container_id = $m.id($m.attr.get(dnd_containers[i], "id"));
				update_field = $m.is.good_id($m.attr.get(dnd_container_id, $m.t.drag_n_drop.data_att_update_field));
				
				if($m.is.alive(update_field) === true)
				{
					for(var j=0, clen=dnd_container_id.childNodes.length; j < clen; j++)
					{
						if(dnd_container_id.childNodes[j].nodeName != "#text" && dnd_container_id.childNodes[j].nodeName != "#comment")
						{
							child_id_string = $m.attr.get(dnd_container_id.childNodes[j], "id");
							child_value = $m.attr.get(child_id_string, $m.t.drag_n_drop.data_att_value);
							
							if($m.is.alive(child_value) === true)
							{
								sort_order.push(child_value);
							}
						}
					}
					
					update_field.value = sort_order.join("|");
				}

				sort_order = [];
			}
		}
	}








	/**
	 *  -- $m.t.drag_n_drop.free
	 * 
	 */
	,free :
	{
		 name : "free"
		,data_att : "drag_n_drop_free"
		,source : null


		/**
		 * Initializes the free drag and drop -- $m.t.drag_n_drop.free.construct()
		 * 
		 *
		 */
		,construct : function()
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.free.construct()");
			
			if($m.vd.is_msie9_or_lower === true)
			{
				return;
			}
		
			var dnd_containers = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att)
				,dnd_container_id_string = ""
				,dnd_container_id = ""
				,dnd_handles = null
				,tag_name = "";

			for(var i=0, len=dnd_containers.length; i < len; i++)
			{
				dnd_container_id_string = $m.attr.get(dnd_containers[i], "id");
				
				if($m.vd.is_mobile_touch === true)
				{
					$m.element.attach(dnd_container_id_string, "touchstart", $m.t.drag_n_drop.free.touch_start);
					$m.element.attach(dnd_container_id_string, "touchmove", $m.t.drag_n_drop.free.touch_move);
					$m.element.attach(dnd_container_id_string, "touchend", $m.t.drag_n_drop.free.drag_end);
				}
				else
				{
					$m.element.attach(dnd_container_id_string, "dragstart", $m.t.drag_n_drop.free.drag_start);
					$m.element.attach(dnd_container_id_string, "dragend", $m.t.drag_n_drop.free.drag_end);

					if(dnd_containers[i].dragDrop && $m.vd.is_msie9_or_lower === true)
					{
						$m.element.attach(dnd_containers[i], "mousedown", function(in_object)
						{
							return function()
							{
								in_object.dragDrop();
							};
						
						} (dnd_containers[i]));
					}
				}
				
				dnd_handles = $m.attr.get_tags_with($m.tags.get(dnd_containers[i], "*"), $m.data_att, $m.t.drag_n_drop.data_att_handle);
				
				if(dnd_handles.length > 0)
				{
					$m.attr.set(dnd_container_id_string, { "data-mjf_dnd_has_handle" : "true" });
					
					for(var j=0, hlen=dnd_handles.length; j < hlen; j++)
					{
						$m.attr.set(dnd_handles[j], { "data-mjf_drag_n_drop_parent" : dnd_container_id_string });
					
						if($m.vd.is_mobile_touch === true)
						{
							$m.element.attach(dnd_handles[j], "touchstart", $m.t.drag_n_drop.set.handle_true);
							$m.element.attach(dnd_handles[j], "touchend", $m.t.drag_n_drop.set.handle_false);
						}
						else
						{
							$m.css_class.add(dnd_handles[j], "dnd_grab");
							$m.element.attach(dnd_handles[j], "mousedown", $m.t.drag_n_drop.set.handle_true);
							$m.element.attach(dnd_handles[j], "mouseup", $m.t.drag_n_drop.set.handle_false);
						}
					}
				}
				else
				{
					$m.attr.set(dnd_container_id_string, { "draggable" : "true" });
					$m.css_class.add(dnd_container_id_string, "dnd_grab");
				}
			}

			dnd_containers = null;
			dnd_handles = null;
		}

		
		// $m.t.drag_n_drop.free.drag_start()
		,drag_start : function(in_event)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.free.drag_start()");
			
			var this_event = $m.event.get(in_event)
				,this_target = $m.event.get_target(this_event);

			$m.t.drag_n_drop.free.source = ($m.is.alive(this.id) === true) ? this : this_target;
			
			if($m.attr.has_value($m.t.drag_n_drop.free.source, "data-mjf_dnd_has_handle", "true") && $m.t.drag_n_drop.is_handle === false)
			{
				return;
			}

			$m.t.drag_n_drop.free.source.style.left = $m.t.drag_n_drop.free.source.offsetLeft + "px";
			$m.t.drag_n_drop.free.source.style.top = $m.t.drag_n_drop.free.source.offsetTop + "px";

			try
			{
				this_event.dataTransfer.effectAllowed = "move";
				this_event.dataTransfer.setData("Text", "");
			}
			catch(e){ }

			$m.attr.set($m.t.drag_n_drop.free.source,
			{
				 "data-mjf_drag_n_drop_free_x" : ($m.t.drag_n_drop.free.source.offsetLeft - in_event.clientX - 5)
				,"data-mjf_drag_n_drop_free_y" : ($m.t.drag_n_drop.free.source.offsetTop - in_event.clientY - 5)
			});
			
			$m.element.attach($m.body_id, "dragover", $m.t.drag_n_drop.free.drag_over);
			$m.element.attach($m.body_id, "drop", $m.t.drag_n_drop.free.drag_drop);
		}


		// $m.t.drag_n_drop.free.drag_over()
		,drag_over : function(in_event)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.free.drag_over()");

			$m.stop_bubble(in_event);
		}


		// $m.t.drag_n_drop.free.drag_drop()
		,drag_drop : function(in_event)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.free.drag_drop()");
		
			var this_event = $m.event.get(in_event);
			
			if($m.attr.has_value($m.t.drag_n_drop.free.source, "data-mjf_dnd_has_handle", "true") && $m.t.drag_n_drop.is_handle === false)
			{
				return;
			}
			
			if($m.is.alive($m.t.drag_n_drop.free.source) === true)
			{
				$m.t.drag_n_drop.free.source.style.position = "absolute";
				$m.t.drag_n_drop.free.source.style.left = (this_event.clientX + parseInt($m.attr.get($m.t.drag_n_drop.free.source, "data-mjf_drag_n_drop_free_x"))) + "px";
				$m.t.drag_n_drop.free.source.style.top = (this_event.clientY + parseInt($m.attr.get($m.t.drag_n_drop.free.source, "data-mjf_drag_n_drop_free_y"))) + "px";
				$m.t.drag_n_drop.free.source = null;
			}

			$m.t.drag_n_drop.set.handle_false(in_event);

			$m.stop_bubble(this_event);
		}

			// $m.t.drag_n_drop.free.drag_drop_frame()
			,drag_drop_frame : function(in_event)
			{
				//$m.de.add_item("Executing >>> $m.t.drag_n_drop.free.drag_drop_frame()");
			
				var this_event = $m.event.get(in_event)
					,move_x = 0
					,move_y = 0;
	
				if($m.attr.has_value($m.t.drag_n_drop.free.source, "id", "mjf_darkroom_iframe_div"))
				{
					move_x = this_event.clientX + parseInt($m.t.drag_n_drop.free.source.style.left) + 15 + parseInt($m.attr.get($m.t.drag_n_drop.free.source, "data-mjf_drag_n_drop_free_x"));
					move_y = this_event.clientY + parseInt($m.t.drag_n_drop.free.source.style.top) + 20;
				}
				else
				{
					move_x = this_event.clientX + parseInt($m.attr.get($m.t.drag_n_drop.free.source, "data-mjf_drag_n_drop_free_x"));
					move_y = this_event.clientY + parseInt($m.attr.get($m.t.drag_n_drop.free.source, "data-mjf_drag_n_drop_free_y"));
				}
	
				if($m.is.alive($m.t.drag_n_drop.free.source) === true)
				{
					$m.t.drag_n_drop.free.source.style.position = "absolute";
					$m.t.drag_n_drop.free.source.style.left = move_x + "px";
					$m.t.drag_n_drop.free.source.style.top = move_y + "px";
					$m.t.drag_n_drop.free.source = null;
				}
			}


		// $m.t.drag_n_drop.free.drag_end()
		,drag_end : function(in_event)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.free.drag_end()");
		
			$m.t.drag_n_drop.set.handle_false(in_event);

			var this_event = $m.event.get(in_event)
				,this_target = $m.event.get_target(this_event)
				,this_element = ($m.is.alive(this.id) === true) ? this : this_target
				,callback_string = $m.attr.get(this_element, $m.t.drag_n_drop.data_att_callback);

			if($m.attr.has_value(this_element, "data-mjf_dnd_has_handle", "true"))
			{
				$m.attr.set(this_element, { "draggable" : "false" });
			}
			
			if($m.is.alive(callback_string) === true)
			{
				if($m.is.alive(window[callback_string]) === true)
				{
					window[callback_string](this.id);
				}
				else
				{
					$m.de.throw_browser_error("$m.t.drag_n_drop.free.drag_end() === data-mjf_drag_n_drop_callback `' + callback_string + '` does not exist.");
				}
			}
			
			$m.element.detach($m.body_id, "dragover", $m.t.drag_n_drop.free.drag_over);
			$m.element.detach($m.body_id, "drop", $m.t.drag_n_drop.free.drag_drop);
		}


		// $m.t.drag_n_drop.free.touch_start()
		,touch_start : function(in_event)
		{
			var this_event = $m.event.get(in_event);

			if($m.is.alive(this_event.touches) === true && this_event.touches.length == 1)
			{
				$m.t.drag_n_drop.free.source = this;
				
				/*
				var test_att = $m.attr.has_value($m.t.drag_n_drop.free.source, "data-mjf_dnd_has_handle", "true");
				
				$m.de.add_item("test_att = " + test_att);
				$m.de.add_item("$m.t.drag_n_drop.is_handle = " + $m.t.drag_n_drop.is_handle);

				if($m.attr.has_value($m.t.drag_n_drop.free.source, "data-mjf_dnd_has_handle", "true") && $m.t.drag_n_drop.is_handle === false)
				{
					$m.de.add_item("$m.t.drag_n_drop.free.touch_start() -- not handle");
				
					return;
				}
				else
				{
					$m.de.add_item("$m.t.drag_n_drop.free.touch_start() -- handle!");
				}
				*/

				var touch = this_event.touches[0]
					,pos = $m.position.get_xy($m.t.drag_n_drop.free.source);

				$m.attr.set($m.t.drag_n_drop.free.source,
				{
					 "data-mjf_drag_n_drop_free_x" : (touch.pageX - pos[0])
					,"data-mjf_drag_n_drop_free_y" : (touch.pageY - pos[1])
				});
			}
		}


		// $m.t.drag_n_drop.free.touch_move()
		,touch_move : function(in_event)
		{
			var this_event = $m.event.get(in_event);
			
			if($m.is.alive(this_event.touches) === true && this_event.touches.length == 1)
			{
				var touch = this_event.touches[0];

				$m.t.drag_n_drop.free.source.style.position = "absolute";
				$m.t.drag_n_drop.free.source.style.left = (touch.pageX - parseInt($m.attr.get($m.t.drag_n_drop.free.source, "data-mjf_drag_n_drop_free_x"))) + "px";
				$m.t.drag_n_drop.free.source.style.top = (touch.pageY - parseInt($m.attr.get($m.t.drag_n_drop.free.source, "data-mjf_drag_n_drop_free_y"))) + "px";
				
				$m.stop_bubble(this_event);
			}
		}

	}


	// $m.t.drag_n_drop.set
	,set :
	{
		 //$m.t.drag_n_drop.set.handle_true()
		 handle_true : function(in_event)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.set.handle_true()");
		
			$m.t.drag_n_drop.is_handle = true;

			var this_event = $m.event.get(in_event)
				,this_target = $m.event.get_target(this_event)
				,this_element = ($m.is.alive(this.id) === true) ? this : this_target;

			$m.attr.set($m.attr.get(this_element, "data-mjf_drag_n_drop_parent"), { "draggable" : "true" });
		}

		 //$m.t.drag_n_drop.set.handle_false()
		,handle_false : function(in_event)
		{
			//$m.de.add_item("Executing >>> $m.t.drag_n_drop.set.handle_false()");

			$m.t.drag_n_drop.is_handle = false;

			var this_event = $m.event.get(in_event)
				,this_target = $m.event.get_target(this_event)
				,this_element = ($m.is.alive(this.id) === true) ? this : this_target;

			$m.attr.set($m.attr.get(this_element, "data-mjf_drag_n_drop_parent"), { "draggable" : "false" });
		}


		
		
	}

}