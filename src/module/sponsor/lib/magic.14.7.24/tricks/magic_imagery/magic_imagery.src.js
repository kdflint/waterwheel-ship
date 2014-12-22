/***************************************************************************
- File: magic_imagery.js
- Version: 13.6.12
- java -jar compiler2.jar --js magic_imagery.src.js --js_output_file magic_imagery.VERSION.js
***************************************************************************/


/*
	TODO

	- don't re-initialize existing imagery if already set
	
	- on smaller resize, fix left thumb width

	
	- fix nav imgs and descs for horizontal views for iOS
	- close img or something for descriptions
	
	- full screen option
	
			
	//$m.smooth_scroll_overflow.construct(thumb_id, "down");
	//$m.smooth_scroll_overflow.construct(thumb_id, "down");
	//$m.smooth_scroll.construct(next_id);
	
*/



$m.trick.magic_imagery = {};

$m.t.magic_imagery =
{
	 name : "magic_imagery"
	,data_att : "magic_imagery"
	,data_att_link : "magic_imagery_link"
	
	,data_att_height : "data-mjf_mi_height"
	,data_att_pos : "data-mjf_mi_pos"
	
	,data_att_full : "data-mjf_mi_full"
	,data_att_thumb : "data-mjf_mi_thumb"
	
	,data_att_layout : "data-mjf_mi_layout"
	,data_att_has_mi : "data-mjf_magic_imagery_has"
	
	,all : []
	,first_load : true
	,current : false
	
	,is_resizing : false
	,resize_timer : false


	/**
	 * Main constructor for trick -- $m.t.magic_imagery.construct()
	 * 
	 */
	,construct : function(in_wand)
	{
		clearTimeout($m.t.magic_imagery.resize_timer);

		$m.t.magic_imagery.resize_timer = setTimeout(function()
		{
			clearTimeout($m.t.magic_imagery.resize_timer);
			$m.t.magic_imagery.is_resizing = false;
			
		}, 1000);

		$m.t.magic_imagery.is_resizing = true;

		setTimeout(function()
		{
			//$m.de.add_item(">>>>>>>>>>>> Executing >>> $m.t.magic_imagery.construct()");
		
			var has_mi = false
				,image_conts = $m.attr.get_tags_with($m.tags.all, $m.data_att, $m.t.magic_imagery.data_att)
				,cur_img_cont = false
				,cur_img_cont_id = false
				,cur_img_cont_height = false
				,cur_img_cont_width = false
				
				,cur_child = false
				,cur_child_class = false
				
				,child_full = false
				,child_full_pos = false
				,child_full_desc_css = ""
				
				,child_thumb = false
				,child_thumb_pos = false
				,child_thumb_images = false
				,child_thumb_links = false
				,child_thumb_height = false
				,child_thumb_width = false
				
				,tmp_id = false
				,rand_id = false
				,tmp_cont = false
				
				,found_first = false
				,first_click = false
				,cont_layout = "";

			$m.t.magic_imagery.all = [];

			for(var i=0, len=image_conts.length; i < len; i++)
			{
				//$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++");
				
				cur_img_cont = image_conts[i];
				cur_img_cont_id = $m.attr.get(cur_img_cont, "id");
				cur_img_cont_height = parseInt($m.attr.get(cur_img_cont, $m.t.magic_imagery.data_att_height));
				cur_img_cont_width = cur_img_cont.offsetWidth;
				
				if($m.is.alive($m.attr.get(cur_img_cont, $m.t.magic_imagery.data_att_has_mi)) === false)
				{
					$m.attr.set(cur_img_cont, { "data-mjf_magic_imagery_has" : "true" });
					has_mi = false;
				}
				else
				{
					has_mi = true;
				}

				if($m.is.alive(cur_img_cont_height) === false)
				{
					$m.de.throw_browser_error("Missing `data-mjf_mi_height` attribute for `" + cur_img_cont_id + "` element in $m.t.magic_imagery.construct(). Skipping this element.");
					continue;
				}

				for(var j=0, clen=cur_img_cont.childNodes.length; j < clen; j++)
				{
					cur_child = cur_img_cont.childNodes[j];
					cur_child_class = $m.attr.get(cur_child, "class");
					
					if($m.is.alive(cur_child_class) === true)
					{
						if(cur_child_class.match(/magic_imagery_full/))
						{
							tmp_id = $m.attr.get(cur_child, "id");
							
							if($m.is.alive(tmp_id) === true)
							{
								child_full = tmp_id;
							}
							else
							{
								rand_id = cur_img_cont_id + "_" + $m.ut.rand_num();
								$m.attr.set(cur_child, { "id" : rand_id });
								child_full = rand_id;
							}
						}
						
						if(cur_child_class.match(/magic_imagery_thumbs/))
						{
							tmp_id = $m.attr.get(cur_child, "id");
							
							if($m.is.alive(tmp_id) === true)
							{
								child_thumb = tmp_id;
							}
							else
							{
								rand_id = cur_img_cont_id + "_" + $m.ut.rand_num();
								$m.attr.set(cur_child, { "id" : rand_id });
								child_thumb = rand_id;
							}
						}
					}
				}
				
				//$m.de.add_item("child_full = " + child_full);
				//$m.de.add_item("child_thumb = " + child_thumb);
				
				if($m.is.alive(child_full) === true && $m.is.alive(child_thumb) === true)
				{
					//$m.de.add_item("here we go");
				
					$m.css_class.add(cur_img_cont, "overflow_hidden");

					$m.style.set(cur_img_cont,
					{
					     "height" : cur_img_cont_height + "px"
					});

					child_thumb_images = $m.tags.get(child_thumb, "img");
				
					child_full_pos = $m.attr.get(child_full, $m.t.magic_imagery.data_att_pos);
					child_thumb_pos = $m.attr.get(child_thumb, $m.t.magic_imagery.data_att_pos);
	
					if($m.is.alive(child_full_pos) === true && $m.is.alive(child_thumb_pos) === true)
					{
						if($m.is.alive(child_thumb_images[0]) === true && $m.is.alive(child_thumb_images[0].offsetWidth) === true)
						{
							child_thumb_width = child_thumb_images[0].offsetWidth + 30;
							
							//$m.de.add_item("child_thumb_width = " + child_thumb_width);

							if(child_full_pos == "left" || child_full_pos == "right")
							{
								$m.css_class.add(child_full, "magic_imagery_" + child_full_pos);
							}
		
							if(child_thumb_pos == "left" || child_thumb_pos == "right")
							{
								$m.css_class.add(child_thumb, "magic_imagery_" + child_thumb_pos);
							}

							$m.style.set(child_full,
							{
								 "height" : cur_img_cont_height + "px"
								,"width" : cur_img_cont_width - child_thumb_width - 30 + "px"
							});
		
							$m.style.set(child_thumb,
							{
								 "height" : cur_img_cont_height + "px"
								,"width" : child_thumb_width + "px"
							});
							
							
							/*
							var child_full_test = cur_img_cont_width - child_thumb_width - 30 + "px";
							$m.de.add_item("child_full_test = " + child_full_test);
							
							$m.id(child_full).style.width = child_full_test;
							
							var cur_img_cont_width = $m.style.get(cur_img_cont, "width");
							var cur_img_cont_height = $m.style.get(cur_img_cont, "height");
							$m.de.add_item("cur_img_cont = " + cur_img_cont_width + " x " + cur_img_cont_height);
							
							var child_full_width = $m.style.get(child_full, "width");
							var child_full_height = $m.style.get(child_full, "height");
							$m.de.add_item("child_full = " + child_full_width + " x " + child_full_height);
							
							var child_thumb_width = $m.style.get(child_thumb, "width");
							var child_thumb_height = $m.style.get(child_thumb, "height");
							$m.de.add_item("child_thumb = " + child_thumb_width + " x " + child_thumb_height);
							*/
						}
						
						cont_layout = "vertical";
					}
					else
					{
						if($m.is.alive(child_thumb_images[0]) === true && $m.is.alive(child_thumb_images[0].offsetHeight) === true)
						{
							child_thumb_height = child_thumb_images[0].offsetHeight + 30;
						
							$m.style.set(child_full,
							{
								 "height" : cur_img_cont_height - child_thumb_height + "px"
								,"width" : cur_img_cont_width + "px"
							});
		
							$m.style.set(child_thumb,
							{
								 "height" : child_thumb_height + "px"
								,"width" : cur_img_cont_width + "px"
							});
						
							$m.css_class.add(child_thumb, "magic_imagery_horizontal");
						}
						
						cont_layout = "horizontal";
					}

					if(has_mi === false)
					{
						$m.element.bind(child_full, "mouseover", $m.t.magic_imagery.show_desc);
						$m.element.bind(child_full, "mouseout", $m.t.magic_imagery.hide_desc);

						$m.tag.create(child_full, "img",
						{
							 "class" : "magic_imagery_full_img"
							,"src" : $m.config.basedir + "images/backgrounds/bg_overlay.png"
							,"style" : "height:100%;width:75%;"
							,"id" : child_full + "_full_image"
						});

						$m.tag.create(child_full, "div",
						{
							 "class" : "magic_imagery_desc"
							,"id" : child_full + "_cont"
						});

						$m.tag.create(child_full, "p",
						{
							 "class" : "magic_imagery_full_nav"
							,"id" : child_full + "_nav"
						});
					}

					$m.t.magic_imagery.all[child_full] = {};
					
					$m.t.magic_imagery.all[child_thumb] =
					{
						"list" : {}
					};

					child_thumb_links = $m.tags.get(child_thumb, "a");

					for(var k=0, llen=child_thumb_links.length; k < llen; k++)
					{
						$m.attr.set(child_thumb_links[k], { "data-mjf_mi_full" : child_full }); // cur_img_cont_id
						$m.attr.set(child_thumb_links[k], { "data-mjf_mi_thumb" : child_thumb });
						$m.attr.set(child_thumb_links[k], { "data-mjf_mi_layout" : cont_layout });

						tmp_id = $m.attr.get(child_thumb_links[k], "id");

						if($m.is.alive(tmp_id) === true)
						{
							tmp_cont = $m.id(tmp_id + "_cont").innerHTML;
							
							$m.t.magic_imagery.all[child_full][tmp_id] = tmp_cont;
							$m.t.magic_imagery.all[child_thumb][tmp_id] = k;
							$m.t.magic_imagery.all[child_thumb].list[k] = tmp_id;
						}

						if(k == 0 && found_first === false)
						{
							first_click = tmp_id;
							found_first = true;
							
							if(i == 0)
							{
								$m.t.magic_imagery.current = tmp_id;
							}
						}
					}
					
					if(has_mi === false)
					{
						$m.t.magic_imagery.thumb_click(first_click);
					}
				}

				child_full = false;
				child_thumb = false;
				found_first = false;
				first_click = false;
			}

			if($m.t.magic_imagery.first_load === true)
			{
				$m.t.magic_imagery.first_load = false;
			}

		}, 100);

		$m.elements.bind($m.tags.a, $m.t.magic_imagery.data_att_link, "click", $m.t.magic_imagery.thumb_click);
	}
	
	
	/**
	 *  -- $m.t.magic_imagery.show_desc
	 * 
	 */
	,show_desc : function(in_id)
	{
		var id = ($m.is.string(in_id) === true) ? in_id : this.id
			,cont_id = id + "_cont";

		if($m.is.alive($m.id(cont_id).innerHTML) === true)
		{
			$m.css_class.add(cont_id, "magic_imagery_desc_hover");
		}
	}
	
	
	/**
	 *  -- $m.t.magic_imagery.hide_desc
	 * 
	 */
	,hide_desc : function(in_id)
	{
		var id = ($m.is.string(in_id) === true) ? in_id : this.id
		$m.css_class.remove(id + "_cont", "magic_imagery_desc_hover");
	}


	/**
	 *  -- $m.t.magic_imagery.thumb_click
	 * 
	 */
	,thumb_click : function(in_id, in_event)
	{
		//$m.de.add_item(">>>>>>>>>>>> Executing >>> $m.t.magic_imagery.thumb_click(" + in_id + ")");
		//$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++");
		
		if($m.t.magic_imagery.current === in_id && $m.t.magic_imagery.first_load === false)
		{
			return;
		}

		$m.t.magic_imagery.current = in_id;

		var	thumb_id = $m.attr.get(in_id, $m.t.magic_imagery.data_att_thumb)
			,full_id = $m.attr.get(in_id, $m.t.magic_imagery.data_att_full)
			,full_id_width = parseInt($m.style.get(full_id, "width"))
			,full_id_height = parseInt($m.style.get(full_id, "height"))

			,full_img = full_id + "_full_image"
			,full_img_width = ""
			,full_img_height = ""
			,full_link = $m.attr.get(in_id, "href")

			,layout = $m.attr.get(in_id, $m.t.magic_imagery.data_att_layout)
			,position = $m.t.magic_imagery.all[thumb_id][in_id]

			,prev_id = $m.t.magic_imagery.all[thumb_id].list[position - 1]
			,prev_img = ""
			,next_id = $m.t.magic_imagery.all[thumb_id].list[position + 1]
			,next_img = ""

			,tmp_img = new Image()
			,nav_html = "";


		$m.css_class.add(full_img, "magic_imagery_animate");
		$m.css_class.remove(full_img, "magic_imagery_full_img_max");
		$m.t.magic_imagery.hide_desc(full_id);
		
		if(layout == "horizontal")
		{
			prev_img = $m.config.basedir + "images/icons/icon_arrow_left.png";
			next_img = $m.config.basedir + "images/icons/icon_arrow_right.png";
		}
		else
		{
			prev_img = $m.config.basedir + "images/icons/icon_arrow_up.png";
			next_img = $m.config.basedir + "images/icons/icon_arrow_down.png";
		}

		if($m.is.good_id(prev_id) !== false)
		{
			tmp_img.src = $m.attr.get(prev_id, "href");
			nav_html += '<img src="' + prev_img + '" alt="" class="magic_imagery_full_nav_img" onclick="$m.t.magic_imagery.thumb_click(\'' + prev_id + '\');return false;">';
		}
		else
		{
			nav_html += '<img src="' + prev_img + '" alt="" class="magic_imagery_full_nav_img magic_imagery_full_nav_img_disabled">';
		}
		
		

		if($m.is.good_id(next_id) !== false)
		{
			tmp_img.src = $m.attr.get(next_id, "href");
			nav_html += '<img src="' + next_img + '" alt="" class="magic_imagery_full_nav_img" onclick="$m.t.magic_imagery.thumb_click(\'' + next_id + '\');return false;">';
		}
		else
		{
			nav_html += '<img src="' + next_img + '" alt="" class="magic_imagery_full_nav_img magic_imagery_full_nav_img_disabled">';
		}

		tmp_img.src = full_link;

		setTimeout(function()
		{
			$m.id(full_img).src = full_link;

			full_img_width = tmp_img.width;
			full_img_height = tmp_img.height;
			
			//$m.de.add_item("full_img_width = " + full_img_width + " AND full_img_height = " + full_img_height);
			//$m.de.add_item("full_id_width = " + full_id_width + " AND full_id_height = " + full_id_height);

			if(full_img_width > full_id_width || full_img_height > full_id_height)
			{
				//$m.de.add_item("magic_imagery_full_img_max");
				
				$m.css_class.add(full_img, "magic_imagery_full_img_max");
				
				$m.style.set(full_img,
				{
					 "height" : "auto"
					,"width" : "auto"
				});
			}
			else if(full_img_width == full_img_height)
			{
				//$m.de.add_item("full_img_width == full_img_height");
				
				if(full_id_width > full_id_height)
				{
					//$m.de.add_item("full_id_width > full_id_height");
				
					$m.style.set(full_img,
					{
						 "height" : full_id_height + "px"
						,"width" : "auto"
					});
				}
				else
				{
					//$m.de.add_item("full_id_width < full_id_height");
				
					$m.style.set(full_img,
					{
						 "height" : "auto"
						,"width" : full_id_width + "px"
					});
				}
			}
			else if(full_img_width > full_img_height)
			{
				//$m.de.add_item("full_img_width > full_img_height");
			
				$m.style.set(full_img,
				{
					 "height" : "auto"
					,"width" : full_id_width + "px"
				});
			}
			else
			{
				//$m.de.add_item("else");
			
				$m.style.set(full_img,
				{
					 "height" : full_id_height + "px"
					,"width" : "auto"
				});
			}
			
			$m.css_class.remove(full_img, "magic_imagery_animate");

			$m.id(full_id + "_nav").innerHTML = nav_html;
			$m.id(full_id + "_cont").innerHTML = $m.t.magic_imagery.all[full_id][in_id];
			
			if($m.is.alive($m.t.magic_imagery.all[full_id][in_id]) === true)
			{
				
				$m.t.magic_imagery.show_desc(full_id);
			}
			
			
			if($m.is.alive(in_event) === true)
			{
				$m.id(in_id).focus();
			}
		
		}, 300);
	}
}


$m.win.bind("resize", function()
{
	if($m.is.alive($m.t.magic_imagery.resize_timer) === true)
	{
		clearTimeout($m.t.magic_imagery.resize_timer);
	}

	$m.t.magic_imagery.resize_timer = setTimeout(function()
	{
		$m.t.magic_imagery.construct();
	
	}, 500);
});