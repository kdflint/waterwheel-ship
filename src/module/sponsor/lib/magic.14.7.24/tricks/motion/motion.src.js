/***************************************************************************
- File: motion.js
- Version: 14.7.28
- java -jar compiler2.jar --js motion.src.js --js_output_file motion.VERSION.js
***************************************************************************/

$m.trick.motion = {};

$m.t.motion =
{
	 name : "motion"

	// $m.t.motion.construct()
	,construct : function(in_wand)
	{
		return;
	}
	
	
	/////////////////////////
	// $m.t.motion.vslider
	,vslider :
	{
		 name : "vslider"
		,data_att : "motion_vslider"
		,data_att_link : "motion_vslider_link"
		,sliders : {}
		,css_rules : ""

		
		// $m.t.motion.vslider.create()
		,create : function(in_id)
		{
			var parent_id = $m.id(in_id)
				,dims = $m.attr.get(in_id, "data-mjf_mvs_dims").split("x")
				,links_cont = $m.attr.get(in_id, "data-mjf_mvs_links_id")
				,scroll_to = $m.attr.get(in_id, "data-mjf_mvs_scroll_to")
				,scroll_to_html = ""
				,parent_width = dims[0]
				,parent_height = dims[1]
				,panel_att = ""
				,panel_cnt = 0
				,panel_running_height = 0
				,link_class = ""
				,div_tag = ""
				,div_id = in_id + '_' + $m.ut.rand_num()
				,nav_tag = ""
				,nav_id = ""
				,nav_atag = "";

			$m.t.motion.vslider.sliders[div_id] = [];
			
			nav_id = div_id + '_nav';
			nav_tag = $m.tag.init("p",
			{
				 "class" : "motion_vslider_ctrls"
				,"id" : nav_id
			});
			
			if($m.is.alive(links_cont) === true)
			{
				nav_id = links_cont;
			}
			else
			{
				parent_id.parentNode.insertBefore(nav_tag, parent_id.nextSibling);
			}
			
			scroll_to_html = ($m.is.alive(scroll_to) === true && scroll_to == "true") ? "true" : "false";

			parent_id.style.width  = parent_width  + "px";
			parent_id.style.height = parent_height + "px";

			for(var i=0, len=parent_id.childNodes.length; i < len; i++)
			{
				panel_att = $m.attr.get(parent_id.childNodes[i], "data-mjf_mvs_panel");
				panel_title = $m.attr.get(parent_id.childNodes[i], "data-mjf_mvs_link");

				if(panel_att == "true")
				{
					if(panel_cnt == 0)
					{
						panel_running_height = "0";
						link_class = "motion_vslider_ctrls_link motion_vslider_ctrls_active";
					}
					else
					{
						panel_running_height = "-" + (parent_height * panel_cnt);
						link_class = "motion_vslider_ctrls_link";
					}
					
					panel_cnt++;
					parent_id.childNodes[i].style.width = parent_width + "px";
					parent_id.childNodes[i].style.height = parent_height + "px";
					
					panel_link_title = ($m.is.alive(panel_title) === true) ? panel_title + "<br>" : panel_cnt;

					$m.tag.create(nav_id, "a",
					{
						 "href" : "#"
						,"data-mjf" : "motion_vslider_link|return_false"
						,"data-mjf_mvs_id" : div_id
						,"data-mjf_mvs_scroll_to" : scroll_to_html
						,"data-mjf_mvs_pos" : panel_running_height
						,"class" : link_class
						,"id" : div_id + '_a' + panel_cnt
					}, panel_link_title);

					$m.t.motion.vslider.sliders[div_id].push(div_id + '_a' + panel_cnt);
				}
			}

			parent_id.innerHTML = '<div class="motion_vslider_cont" id="' + div_id + '">' + parent_id.innerHTML + '</div>';

			$m.t.motion.vslider.css_rules += "#" + div_id + "{height:" + parent_height + "px;width:" + (parent_width * panel_cnt) + "px;}";
		}


		// $m.t.motion.vslider.construct()
		,construct : function()
		{
			var vsliders = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att)
				,tmp_id = false;
			
			for(var i=0, len=vsliders.length; i < len; i++)
			{
				vsliders[i].style.visibility = "hidden";
				tmp_id = vsliders[i].getAttribute("id");
				this.create(tmp_id);
				vsliders[i].style.visibility = "visible";
			}

			var vslider_sheet = document.createElement("style");
			
			if($m.vd.is_msie8_or_lower === true)
			{
				vslider_sheet.style.cssText = $m.t.motion.vslider.css_rules;
			}
			else
			{
				vslider_sheet.innerHTML = $m.t.motion.vslider.css_rules;
			}
			
			document.body.appendChild(vslider_sheet);

			$m.elements.bind($m.tags.a, this.data_att_link, "click", this.exec);
		}


		// $m.t.motion.vslider.exec(IN_ID)
		,exec : function(in_id)
		{
			var scroll_to = $m.attr.get(in_id, "data-mjf_mvs_scroll_to")
				,slide_id = $m.attr.get(in_id, "data-mjf_mvs_id")
				,slide_pos = $m.attr.get(in_id, "data-mjf_mvs_pos")
				,ga_track = $m.attr.get(in_id, "data-mjf_ga_track")
				,slide_css = "";

			if(slide_id !== null && slide_pos !== null)
			{
				if($m.vd.is_gecko === true)
				{
					slide_css = "-moz-transform:translate(0px, " + slide_pos + "px)";
				}

				if($m.vd.is_webkit === true)
				{
					slide_css = "-webkit-transform:translate(0px, " + slide_pos + "px)";
				}

				if($m.vd.is_opera === true)
				{
					slide_css = "-o-transform:translate(0px, " + slide_pos + "px)";
				}

				if($m.vd.is_msie === true)
				{
					if($m.vd.is_msie9_or_lower === true)
					{
						$m.id(slide_id).style.top = slide_pos + "px";
					}
					else
					{
						slide_css = "-ms-transform:translate(0px, " + slide_pos + "px)";
					}
				}
				else
				{
					$m.attr.set(slide_id, { "style" : slide_css });
				}

				for(var i=0, len=$m.t.motion.vslider.sliders[slide_id].length; i < len; i++)
				{
					$m.css_class.remove($m.t.motion.vslider.sliders[slide_id][i], "motion_vslider_ctrls_active");
				}
				
				$m.css_class.add(in_id, "motion_vslider_ctrls_active");
				$m.id(in_id).blur();
				
				if($m.is.alive(scroll_to) === true && scroll_to == "true")
				{
					$m.smooth_scroll.construct(slide_id, 50);
				}
			}

			if(ga_track !== null)
			{
				$m.track.ga(
				{
					 "category" : "MJS Motion Vertical Slider"
					,"action" : in_id + " " + " Click"
					,"label" : $m.tags.strip.from_id(in_id)
				});
			}
		}

	}





	/////////////////////////
	// $m.t.motion.hslider
	,hslider :
	{
		 name : "hslider"
		,data_att : "motion_hslider"
		,data_att_link : "motion_hslider_link"
		,data_att_img : "motion_hslider_link_image"
		,data_att_cont : "motion_hslider_cont"
		,sliders : []
		,css_rules : ""

		
		// $m.t.motion.hslider.create()
		,create : function(in_id)
		{
			var parent_id = $m.id(in_id)
				,autostart = $m.attr.get(in_id, "data-mjf_mhs_autostart")
				,delay = $m.attr.get(in_id, "data-mjf_mhs_delay")
				,links_cont = $m.attr.get(in_id, "data-mjf_mhs_links_id")
				,scroll_to = $m.attr.get(in_id, "data-mjf_mhs_scroll_to")
				,scroll_to_html = ""
				,panel_att = ""
				,panel_title = ""
				,panel_image = ""
				,panel_image_on = ""
				,panel_cnt = 0
				,panel_running_width = 0
				,link_class = ""
				,div_tag = ""
				,div_id = in_id + '_' + $m.ut.rand_num()
				,nav_tag = ""
				,nav_id = ""
				,nav_atag = ""
				,parent_panels = [];

			$m.t.motion.hslider.sliders[div_id] = {
				 "autostart" : ($m.is.alive(autostart) === true) ? true : false
				,"delay" : ($m.is.alive(delay) === true) ? delay * 1000 : 0
				,"timeout" : false
				,"links" : []
				,"cnt" : 0
			};
			
			nav_id = div_id + '_nav';
			nav_tag = $m.tag.init("p",
			{
				 "class" : "motion_hslider_ctrls"
				,"id" : nav_id
			});
			
			if($m.is.alive(links_cont) === true)
			{
				nav_id = links_cont;
			}
			else
			{
				parent_id.parentNode.insertBefore(nav_tag, parent_id.nextSibling);
			}
			
			scroll_to_html = ($m.is.alive(scroll_to) === true && scroll_to == "true") ? "true" : "false";

			for(var i=0, len=parent_id.childNodes.length; i < len; i++)
			{
				panel_att = $m.attr.get(parent_id.childNodes[i], "data-mjf_mhs_panel");

				if(panel_att == "true")
				{
					parent_panels.push(parent_id.childNodes[i]);
				}
			}

			var parent_panels_length = parent_panels.length
				,parent_panels_width = 100 / parent_panels_length;

			for(var i=0; i < parent_panels_length; i++)
			{
				panel_att = $m.attr.get(parent_id.childNodes[i], "data-mjf_mhs_panel");
				panel_title = $m.attr.get(parent_id.childNodes[i], "data-mjf_mhs_link");
				panel_image = $m.attr.get(parent_id.childNodes[i], "data-mjf_mhs_link_img");
				panel_image_on = $m.attr.get(parent_id.childNodes[i], "data-mjf_mhs_link_img_on");

				panel_cnt = i;

				if(panel_cnt == 0)
				{
					panel_running_width = "0";
					link_class = "motion_hslider_ctrls_link motion_hslider_ctrls_active";
				}
				else
				{
					panel_running_width = "-" + (parent_panels_width * panel_cnt);
					link_class = "motion_hslider_ctrls_link";
				}
				
				panel_link_title = ($m.is.alive(panel_title) === true) ? panel_title : panel_cnt + 1;
				
				panel_image_on_html = (panel_image_on === null) ? "" : 'data-mjf_mhs_link_img_on="' + panel_image_on + '" data-mjf_mhs_link_img_default="' + panel_image + '"'; 
				panel_link_title = ($m.is.alive(panel_image) === true) ? '<img src="' + panel_image + '" alt="' + panel_link_title + '" data-mjf="motion_hslider_link_image" ' + panel_image_on_html + ' id="' + div_id + '_img' + panel_cnt + '">' : panel_link_title;

				if($m.vd.is_msie9_or_lower === false)
				{
					$m.tag.create(nav_id, "a",
					{
						 "href" : "#"
						,"data-mjf" : "motion_hslider_link|return_false"
						,"data-mjf_mhs_id" : div_id
						,"data-mjf_mhs_scroll_to" : scroll_to_html
						,"data-mjf_mhs_pos" : panel_running_width
						,"class" : link_class
						,"id" : div_id + '_a' + panel_cnt
					}, panel_link_title);
				}

				$m.css_class.add(parent_panels[i], "motion_hslider_box_" + div_id);
				parent_panels[i].style.zIndex = 100 - panel_cnt;

				$m.t.motion.hslider.sliders[div_id].links.push(div_id + '_a' + panel_cnt);
			}

			parent_id.innerHTML = '<div class="motion_hslider_cont" data-mjf="motion_hslider_cont" id="' + div_id + '">' + parent_id.innerHTML + '</div>';

			$m.t.motion.hslider.css_rules += " #" + div_id + "{width:" + (parent_panels_length * 100) + "%;}";
			$m.t.motion.hslider.css_rules += " .motion_hslider_box_" + div_id + "{position:relative; width:" + (parent_panels_width) + "%;}";
		}



		// $m.t.motion.hslider.construct()
		,construct : function()
		{
			var hsliders = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att)
				,tmp_id = false;
			
			for(var i=0, len=hsliders.length; i < len; i++)
			{
				$m.css_class.add(hsliders[i], "visibility_hidden");
				tmp_id = hsliders[i].getAttribute("id");
				this.create(tmp_id);
			}

			var hslider_sheet = document.createElement("style");
			hslider_sheet.setAttribute("type", "text/css");
			hslider_sheet.setAttribute("media", "screen");
			
			//$m.t.motion.hslider.css_rules += '.motion_hslider_cont{transition:all 500ms ease-in-out;-ms-transition:all 500ms ease-in-out;	-moz-transition:all 500ms ease-in-out;-o-transition:all 500ms ease-in-out;-webkit-transition:all 500ms ease-in-out;}';
			
			if($m.vd.is_msie8_or_lower === true)
			{
				hslider_sheet.style.cssText = $m.t.motion.hslider.css_rules;
			}
			else
			{
				hslider_sheet.innerHTML = $m.t.motion.hslider.css_rules;
			}
			
			$m.head_tag.appendChild(hslider_sheet);

			for(var i=0, len=hsliders.length; i < len; i++)
			{
				$m.css_class.remove(hsliders[i], "visibility_hidden");
			}

			$m.elements.bind($m.tags.img, this.data_att_img, "mouseover", this.img_hover);
			$m.elements.bind($m.tags.img, this.data_att_img, "mouseout", this.img_hover);
			$m.elements.bind($m.tags.img, this.data_att_img, "click", this.img_hover);
			$m.elements.bind($m.tags.a, this.data_att_link, "click", this.exec);
			
			//$m.elements.bind($m.tags.all, this.data_att_cont, "mouseover", this.pause);
			//$m.elements.bind($m.tags.all, this.data_att_cont, "mouseout", this.play);

			for(var i=0 in $m.t.motion.hslider.sliders)
			{
				if($m.t.motion.hslider.sliders[i].autostart === true)
				{
					$m.t.motion.hslider.cycle(i, 0);
				}
				
				setTimeout(function()
				{
					$m.css_class.add(i, "motion_slider_animation");
				}, 500);
				
			}
		}

		// $m.t.motion.hslider.img_hover(IN_ID)
		,img_hover : function(in_id)
		{
			var img_src = $m.attr.get(in_id, "src")
				,img_on = $m.attr.get(in_id, "data-mjf_mhs_link_img_on");
		
			if(img_on !== null)
			{
				$m.id(in_id).src = img_on;
				$m.attr.set(in_id, { "data-mjf_mhs_link_img_on" : img_src });
			}
		}

		// $m.t.motion.hslider.img_reset(IN_ID)
		,img_reset : function(in_id)
		{
			var img_src = $m.attr.get(in_id, "src")
				,img_default = $m.attr.get(in_id, "data-mjf_mhs_link_img_default");

			if(img_src != img_default)
			{
				$m.id(in_id).src = img_default;
				$m.attr.set(in_id, { "data-mjf_mhs_link_img_on" : img_src });
			}
		}

		// $m.t.motion.hslider.exec(IN_ID, IN_EVENT)
		,exec : function(in_id, in_event)
		{
			var scroll_to = $m.attr.get(in_id, "data-mjf_mhs_scroll_to")
				,slide_id = $m.attr.get(in_id, "data-mjf_mhs_id")
				,slide_pos = $m.attr.get(in_id, "data-mjf_mhs_pos")
				,ga_track = $m.attr.get(in_id, "data-mjf_ga_track")
				,slide_css = "";

			if($m.is.alive(in_event) === true && $m.is.alive($m.t.motion.hslider.sliders[slide_id]) === true)
			{
				clearTimeout($m.t.motion.hslider.sliders[slide_id].timeout);
			}

			if(slide_id !== null && slide_pos !== null)
			{
				if($m.vd.is_gecko === true)
				{
					slide_css = "-moz-transform:translate(" + slide_pos + "%, 0px)";
				}

				if($m.vd.is_webkit === true)
				{
					slide_css = "-webkit-transform:translate(" + slide_pos + "%, 0px)";
				}

				if($m.vd.is_opera === true)
				{
					slide_css = "-o-transform:translate(" + slide_pos + "%, 0px)";
				}

				if($m.vd.is_trident === true)
				{
					if($m.vd.is_msie9_or_lower === true)
					{
						$m.id(slide_id).style.left = slide_pos + "%";

						$m.de.add_item("$m.id(" + slide_id + ").style.left = " + $m.id(slide_id).style.left);
					}
					else
					{
						slide_css = "-ms-transform:translate(" + slide_pos + "%, 0px)";
						$m.attr.set(slide_id, { "style" : slide_css });
					}
				}
				else
				{
					$m.attr.set(slide_id, { "style" : slide_css });
				}

				for(var i=0, len=$m.t.motion.hslider.sliders[slide_id].links.length; i < len; i++)
				{
					$m.t.motion.hslider.img_reset(slide_id + "_img" + (i + 1));
					$m.css_class.remove($m.t.motion.hslider.sliders[slide_id].links[i], "motion_hslider_ctrls_active");
				}
				
				$m.css_class.add(in_id, "motion_hslider_ctrls_active");
				$m.id(in_id).blur();
				
				if($m.is.alive(scroll_to) === true && scroll_to == "true")
				{
					$m.smooth_scroll.construct(slide_id, 50);
				}
			}

			if(ga_track !== null)
			{
				$m.track.ga(
				{
					 "category" : "MJS Motion Horizontal Slider"
					,"action" : in_id + " " + " Click"
					,"label" : $m.tags.strip.from_id(in_id)
				});
			}
		}


		// $m.t.motion.hslider.cycle(IN_HSLIDER_SET, IN_CNT)
		,cycle : function(in_hslider_set, in_cnt)
		{
			$m.t.motion.hslider.sliders[in_hslider_set].timeout = setTimeout(function()
			{
				$m.t.motion.hslider.exec($m.t.motion.hslider.sliders[in_hslider_set].links[in_cnt]);
				
				in_cnt++;
				
				if(in_cnt >= $m.t.motion.hslider.sliders[in_hslider_set].links.length)
				{
					in_cnt = 0;
				}
				
				$m.t.motion.hslider.sliders[in_hslider_set].cnt = in_cnt;
				$m.t.motion.hslider.cycle(in_hslider_set, in_cnt);
	
			}, $m.t.motion.hslider.sliders[in_hslider_set].delay);
		}


		// $m.t.motion.hslider.play(in_id)
		,play : function(in_id)
		{
			$m.t.motion.hslider.cycle(in_id, $m.t.motion.hslider.sliders[in_id].cnt);
		}
		
		// $m.t.motion.hslider.pause(in_id)
		,pause : function(in_id)
		{
			clearTimeout($m.t.motion.hslider.sliders[in_id].timeout);
		}
	}


	/////////////////////////
	// $m.t.motion.fade_inout
	,fade_inout :
	{
		 name : "fade_inout"
		,data_att : "motion_fade_inout"
		,data_att_delay : "data-mjf_fade_inout_delay"
		,data_att_box : "motion_fade_inout_box"
		,groups : []
		,delays : []
		,timeouts : []
		,cnts : []
		,lengths : []
		,increments : 50
	
		// $m.t.motion.fade_inout.construct()
		,construct : function(in_var)
		{
			if($m.is.string(in_var) === true)
			{
				this.increments = in_var;
			}
		
			var all_fios = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att)
				,tmp_id = ""
				,tmp_boxes = [];

			for(var i=0, len=all_fios.length; i < len; i++)
			{
				tmp_id = all_fios[i].getAttribute("id");

				this.groups[tmp_id] = [];
				this.delays[tmp_id] = all_fios[i].getAttribute(this.data_att_delay) * 1000;
				this.timeouts[tmp_id] = false;
				this.cnts[tmp_id] = -1;
				
				tmp_boxes = $m.attr.get_tags_with($m.tags.get(tmp_id, "*"), $m.data_att, this.data_att_box);
				this.lengths[tmp_id] = tmp_boxes.length;

				for(var j=0; j < this.lengths[tmp_id]; j++)
				{
					this.groups[tmp_id].push(tmp_boxes[j].getAttribute("id"));
				}

				$m.t.motion.fade_inout.exec(tmp_id);
			}
		}
	
		// $m.t.motion.fade_inout.exec(IN_ID)
		,exec : function(in_id)
		{
			$m.t.motion.fade_inout.cnts[in_id]++;
			
			if($m.t.motion.fade_inout.cnts[in_id] == $m.t.motion.fade_inout.lengths[in_id])
				$m.t.motion.fade_inout.cnts[in_id] = 0;

			for(var i=0; i < $m.t.motion.fade_inout.lengths[in_id]; i++)
			{
				if($m.css_class.has($m.t.motion.fade_inout.groups[in_id][i], "display_block") === true)
				{
					$m.animate.opaque($m.t.motion.fade_inout.groups[in_id][i], "down", $m.t.motion.fade_inout.increments, function()
					{
						$m.css_class.remove($m.t.motion.fade_inout.groups[in_id][i], "display_block");
					});
				}

				if($m.css_class.has($m.t.motion.fade_inout.groups[in_id][i], "display_none") === false)
				{
					$m.css_class.add($m.t.motion.fade_inout.groups[in_id][i], "display_none");
				}
			}

			var current_box = $m.t.motion.fade_inout.groups[in_id][$m.t.motion.fade_inout.cnts[in_id]]
				current_box_id = $m.id(current_box);
			
			$m.css_class.replace(current_box, "display_none", "display_block");
			
			
			$m.animate.opaque(current_box_id, "up", $m.t.motion.fade_inout.increments);

			$m.t.motion.fade_inout.timeouts[in_id] = setTimeout(function()
			{
				$m.t.motion.fade_inout.exec(in_id);
			}, $m.t.motion.fade_inout.delays[in_id]);

		}
	}


	/////////////////////////
	// $m.t.motion.move
	,move :
	{
		 name : "move"
		,data_att : "motion_move"
		
		,data_att_dir : "data-mjf_mmove_dir"
		,data_att_amt : "data-mjf_mmove_amt"
		,data_att_delay : "data-mjf_mmove_delay"
		,data_att_speed : "data-mjf_mmove_speed"
		,data_att_steps : "data-mjf_mmove_steps"
	
		// $m.t.motion.move.construct()
		,construct : function(in_var)
		{
			var all_moves = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att)
				,tmp_style = false
				,tmp_amt_att = false
				,tmp_amt = false
				,tmp_is_positive
				,tmp_speed = false
				,tmp_steps;
			
			for(var i=0, len=all_moves.length; i < len; i++)
			{
				tmp_ele = all_moves[i];
				tmp_style = $m.attr.get(all_moves[i], $m.t.motion.move.data_att_dir);

				tmp_amt_att = $m.attr.get(all_moves[i], $m.t.motion.move.data_att_amt);

				if(tmp_amt_att.match("-"))
				{
					$m.attr.set(all_moves[i], { "data-mjf_mmove_is_positive" : "false" });
					tmp_is_positive = false;
				}
				else
				{
					$m.attr.set(all_moves[i], { "data-mjf_mmove_is_positive" : "true" });
					tmp_is_positive = true;
				}
				
				tmp_amt = parseInt(tmp_amt_att.replace(/[^\d.]/g, ""));
				tmp_delay = parseInt($m.attr.get(all_moves[i], $m.t.motion.move.data_att_delay)) * 1000;
				tmp_speed = parseInt($m.attr.get(all_moves[i], $m.t.motion.move.data_att_speed));
				tmp_steps = parseInt($m.attr.get(all_moves[i], $m.t.motion.move.data_att_steps));

				setTimeout(function()
				{
					$m.t.motion.move.exec(
					{
						 el : tmp_ele
						,style : tmp_style
						,amt : tmp_amt
						,is_positive : tmp_is_positive
						,speed : tmp_speed
						,steps : tmp_steps
						,timeout : false
					});
				}
				, tmp_delay);
			}
		}

		// $m.t.motion.move.exec(IN_OBJ)
		,exec : function(in_obj)
		{
			/**
			return;
			/**/
			var element_id = $m.id(in_obj.el);
			
			/*
			if(in_obj.style == "right")
			{
				element_id["offsetRight"] = document.body.offsetWidth - (element_id.offsetLeft + element_id.offsetWidth);
			}
			*/
			
			var tmp_offset = element_id["offset" + $m.ut.uppercase_first(in_obj.style)]
				,att_final = $m.attr.get(element_id, "data-mjf_mmove_final")
				,final_place = (in_obj.is_positive === true) ? tmp_offset + in_obj.amt : tmp_offset - in_obj.amt;
			
			/*
			$m.de.add_item("tmp_offset = " + tmp_offset);
			$m.de.add_item("in_obj.amt = " + in_obj.amt);
			$m.de.add_item("final_place = " + final_place);
			*/
			
			if($m.is.alive(att_final) === false)
			{
				att_final = final_place;
				$m.attr.set(element_id, { "data-mjf_mmove_final" : final_place });
			}

			if(in_obj.is_positive === true)
			{
				if(tmp_offset < att_final)
				{
					element_id.style[in_obj.style] = tmp_offset + in_obj.steps + "px";
	
					in_obj.timeout = setTimeout(function()
					{
						$m.t.motion.move.exec(in_obj);
					}, in_obj.speed);
				}
				else
				{
					clearTimeout(in_obj.timeout);
					element_id.style[in_obj.style] = $m.attr.get(element_id, "data-mjf_mmove_final") + "px";
					return;
				}
			}
			else
			{
				if(tmp_offset > att_final)
				{
					element_id.style[in_obj.style] = tmp_offset - in_obj.steps + "px";
	
					in_obj.timeout = setTimeout(function()
					{
						$m.t.motion.move.exec(in_obj);
					}, in_obj.speed);
				}
				else
				{
					clearTimeout(in_obj.timeout);
					element_id.style[in_obj.style] = $m.attr.get(element_id, "data-mjf_mmove_final") + "px";
					return;
				}	
			}
		}
	}


	/////////////////////////
	// $m.t.motion.vscroller
	,vscroller :
	{
		 name : "vscroller"
		,data_att : "vscroller"
		,da_autostart : "data-mjf_vscroller_autostart"
		,da_delay : "data-mjf_vscroller_delay"
		,padding : 5
		
		,items : {}
		,scrollers : {}

		,div_class : "motion_vscroller_box"

		// $m.t.motion.vscroller.create(in_id)
		,create : function(in_id)
		{
			var parent_id = $m.id(in_id)
				,tmp_array = [];

			for(var i=0, len=parent_id.childNodes.length; i < len; i++)
			{
				if(parent_id.childNodes[i].nodeName != "#text" && parent_id.childNodes[i].nodeName != "#comment")
				{
					tmp_array.push('<div class="' + $m.t.motion.vscroller.div_class + '">' + parent_id.childNodes[i].innerHTML + '</div>');
				}
			}
			
			$m.t.motion.vscroller.items[in_id] = tmp_array;
			parent_id.innerHTML = '<div class="' + $m.t.motion.vscroller.div_class + '" id="' + in_id + '_visible"></div><div class="' + $m.t.motion.vscroller.div_class + '" style="" id="' + in_id + '_hidden"></div>';
			
			var autostarted = $m.attr.get(in_id, this.da_autostart) == "true" ? true : false
				,delayed = $m.attr.get(in_id, this.da_delay);

			$m.t.motion.vscroller.scrollers[in_id] =
			{
				 parent : $m.id(in_id)
				,visible : $m.id(in_id + "_visible")
				,hidden : $m.id(in_id + "_hidden")
				,autostart : autostarted
				,delay : (delayed === null) ? 3000 : delayed * 1000
				,current : 1
				,paused : false
			}

			$m.t.motion.vscroller.scrollers[in_id].visible.innerHTML = $m.t.motion.vscroller.items[in_id][0];
			$m.t.motion.vscroller.scrollers[in_id].hidden.innerHTML = $m.t.motion.vscroller.items[in_id][1];
		}

		// $m.t.motion.vscroller.set_top(e1, e2)
		,set_top : function(e1, e2)
		{
			e1.style.top = $m.t.motion.vscroller.padding + "px";
			e2.style.top = Math.max(e1.parentNode.offsetHeight, e1.offsetHeight) + "px";
		}

		// $m.t.motion.vscroller.swap(visible, hidden)
		,swap : function(in_id)
		{
			var cvs = $m.t.motion.vscroller.scrollers[in_id]
				,tmp_guys = cvs.visible;

			cvs.visible = cvs.hidden;
			cvs.hidden = tmp_guys;
		}

		// $m.t.motion.vscroller.construct(in_wand)
		,construct : function(in_wand)
		{
			var all_vscrollers = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att)
				,tmp_id = false;
			
			for(var i=0, len=all_vscrollers.length; i < len; i++)
			{
				tmp_id = all_vscrollers[i].getAttribute("id");
				this.create(tmp_id);
				this.init(tmp_id);
			}

			$m.elements.bind(all_vscrollers, this.data_att, "mouseover", this.stop);
			$m.elements.bind(all_vscrollers, this.data_att, "mouseout", this.start);
		}

		// $m.t.motion.vscroller.init(in_id)
		,init : function(in_id)
		{
			var cvs = $m.t.motion.vscroller.scrollers[in_id];
			$m.t.motion.vscroller.set_top(cvs.visible, cvs.hidden);
			//cvs.hidden.style.visibility = "visible";
			
			if(cvs.autostart === true)
			{
				setTimeout(function()
				{
					$m.t.motion.vscroller.slide_up(in_id);
				}, cvs.delay);
			}
		}

		// $m.t.motion.vscroller.slide_up(in_id)
		,slide_up : function(in_id)
		{
			var cvs = $m.t.motion.vscroller.scrollers[in_id];
			
			if(parseInt(cvs.hidden.style.top) > ($m.t.motion.vscroller.padding + 5))
			{
				cvs.visible.style.top = parseInt(cvs.visible.style.top) - 5 + "px";
				cvs.hidden.style.top = parseInt(cvs.hidden.style.top) - 5 + "px";
				setTimeout(function()
				{
					$m.t.motion.vscroller.slide_up(in_id);
				}, 15);
			}
			else
			{
				$m.t.motion.vscroller.set_top(cvs.hidden, cvs.visible);
				$m.t.motion.vscroller.swap(in_id);
				setTimeout(function()
				{
					$m.t.motion.vscroller.rotate(in_id);
				}, cvs.delay);
			}
		}

		// $m.t.motion.vscroller.rotate()
		,rotate : function(in_id)
		{
			var cvs = $m.t.motion.vscroller.scrollers[in_id];

			if($m.t.motion.vscroller.scrollers[in_id].paused === true)
			{
				setTimeout(function()
				{
					$m.t.motion.vscroller.rotate(in_id);
				}, 1000);
			}
			else
			{
				var i = cvs.current;
				$m.t.motion.vscroller.scrollers[in_id].current = (i + 1 > $m.t.motion.vscroller.items[in_id].length - 1) ? 0 : i + 1;
				cvs.hidden.innerHTML = $m.t.motion.vscroller.items[in_id][cvs.current];
				$m.t.motion.vscroller.slide_up(in_id);
			}
		}

		// $m.t.motion.vscroller.start(in_id)
		,start : function(in_id)
		{
			$m.t.motion.vscroller.scrollers[in_id].paused = false;

			if($m.t.motion.vscroller.scrollers[in_id].autostart === false)
			{
				setTimeout(function()
				{
					$m.t.motion.vscroller.slide_up(in_id);
				}, $m.t.motion.vscroller.scrollers[in_id].delay);
			}
		}
		
		// $m.t.motion.vscroller.stop(in_id)
		,stop : function(in_id)
		{
			$m.t.motion.vscroller.scrollers[in_id].paused = true;
		}
	}


	/////////////////////
	// $m.t.motion.swipe
	,swipe :
	{
		 name : "swipe"
		,eid : "motion_swipe"
		,inside_id : "motion_swipe_inside"
		,left_id : "motion_swipe_left"
		,right_id : "motion_swipe_right"
		,div_class : "motion_swipe_box"
		,end_id : "motion_end_id"
		,cylon : {}
		,timeout : false
		,speed : 0

		// $m.t.motion.swipe.update_kids
		,update_kids : function()
		{
			var parent_id = $m.id($m.t.motion.swipe.inside_id)
				,last_child_cnt = false;

			if(parent_id === false)
			{
				return false;
			}

			for(var i=0, len=parent_id.childNodes.length; i < len; i++)
			{
				if(parent_id.childNodes[i].nodeName != "#text" && parent_id.childNodes[i].nodeName != "#comment")
				{
					parent_id.childNodes[i].className = $m.t.motion.swipe.div_class;
					last_child_cnt = i;
				}
			}

			if($m.id(parent_id.childNodes[last_child_cnt].id) === false)
				parent_id.childNodes[last_child_cnt].id = $m.t.motion.swipe.end_id;
			else
				return false;

			$m.css_class.add($m.t.motion.swipe.eid, "background_none");
			$m.css_class.remove($m.t.motion.swipe.inside_id, "visibility_hidden");
			$m.css_class.remove($m.t.motion.swipe.left_id, "visibility_hidden");
			$m.css_class.remove($m.t.motion.swipe.right_id, "visibility_hidden");
			return true;
		}

		// $m.t.motion.swipe.construct()
		,construct : function()
		{
			if(this.update_kids() === false)
			{
				$m.de.throw_browser_error( "trick.motion.swipe is not initialized correctly");
				return false;
			}

			this.eid = $m.id(this.eid);
			this.inside_id = $m.id(this.inside_id);
			this.inside_id.style.left = $m.id(this.left_id).offsetWidth + "px";

			var tmp_left = this.inside_id.offsetLeft
				,tmp_width = this.eid.offsetWidth - $m.id($m.t.motion.swipe.end_id).offsetWidth - 15
				,tmp_xpos_min = tmp_width - $m.id(this.end_id).offsetLeft - 32
				,tmp_xpos_max = tmp_left;

			this.cylon =
			{
				 left : tmp_left
				,width : tmp_width
				,xpos_min : tmp_xpos_min
				,xpos_max : tmp_xpos_max
			}


			$m.element.bind(this.left_id, "mousedown", this.slide_start);
			$m.element.bind(this.left_id, "mouseup", this.slide_stop);
			
			$m.element.bind(this.right_id, "mousedown", this.slide_start);
			$m.element.bind(this.right_id, "mouseup", this.slide_stop);
		}

		// $m.t.motion.swipe.slide_start()
		,slide_start : function()
		{
			clearTimeout($m.t.motion.swipe.timeout);

			var in_id = this.id
				,id = $m.id(in_id)
				,speed_multiply = 0;

			if(in_id == "motion_swipe_right")
			{
				speed_multiply = Math.floor(id.offsetLeft / 1);
				$m.t.motion.swipe.speed = -1 * speed_multiply;
				$m.t.motion.swipe.speed = Math.max(-10, $m.t.motion.swipe.speed);
			}
			else
			{			
				speed_multiply = 10 - Math.floor(id.offsetLeft / 5);
				$m.t.motion.swipe.speed = 1 * speed_multiply;
				$m.t.motion.swipe.speed = Math.min(20, $m.t.motion.swipe.speed);
				
				if($m.t.motion.swipe.speed < 0)
				{
					$m.t.motion.swipe.speed = 10;
				}
			}

			$m.t.motion.swipe.slide_do();
		}

		// $m.t.motion.swipe.slide_do()
		,slide_do : function()
		{
			var left_pos = $m.t.motion.swipe.inside_id.offsetLeft;
			left_pos = left_pos / 1 + $m.t.motion.swipe.speed;
			
			if(left_pos > $m.t.motion.swipe.cylon.xpos_max)
			{
				left_pos = $m.t.motion.swipe.cylon.xpos_max;
				$m.t.motion.swipe.speed = 0;

				return;
			}

			if(left_pos < $m.t.motion.swipe.cylon.xpos_min)
			{
				left_pos = $m.t.motion.swipe.cylon.xpos_min;
				$m.t.motion.swipe.speed = 0;
				
				return;
			}

			$m.t.motion.swipe.inside_id.style.left = left_pos + 'px';
			$m.t.motion.swipe.timeout = setTimeout(function()
			{
				$m.t.motion.swipe.slide_do();
			}, 35);
		}

		// $m.t.motion.swipe.slide_stop()
		,slide_stop : function()
		{
			clearTimeout($m.t.motion.swipe.timeout);
			$m.t.motion.swipe.speed = 0;
		}
	}


	/////////////////////
	// $m.t.motion.flick
	,flick :
	{
		 name : "flick"
		,eid : "motion_flick"
		,inside_id : "motion_flick_inside"
		,top_id : "motion_flick_top"
		,bottom_id : "motion_flick_bottom"
		,div_class : "motion_flick_box"
		,end_id : "motion_end_id"
		,data_att_autostart : "data-mjf_mflick_autostart"
		,autostart : false
		,cylon : {}
		,timeout : false
		,speed : false
		,increment : 0

		// $m.t.motion.flick.update_kids()
		,update_kids : function()
		{
			var parent_id = $m.id($m.t.motion.flick.inside_id)
				,last_child_cnt = false;
			
			if(parent_id === false)
			{
				return false;
			}
			
			for(var i=0, len=parent_id.childNodes.length; i < len; i++)
			{
				if(parent_id.childNodes[i].nodeName != "#text" && parent_id.childNodes[i].nodeName != "#comment")
				{
					parent_id.childNodes[i].className = $m.t.motion.flick.div_class;
					last_child_cnt = i;
				}
			}

			if( $m.id(parent_id.childNodes[last_child_cnt].id) === false)
			{
				parent_id.childNodes[last_child_cnt].id = $m.t.motion.flick.end_id;
			}
			else
			{
				return false;
			}

			$m.css_class.add($m.t.motion.flick.eid, "background_none");
			$m.css_class.remove($m.t.motion.flick.inside_id, "visibility_hidden");
			$m.css_class.remove($m.t.motion.flick.top_id, "visibility_hidden");
			$m.css_class.remove($m.t.motion.flick.bottom_id, "visibility_hidden");
			return true;
		}

		// $m.t.motion.flick.construct()
		,construct : function()
		{
			if(this.update_kids() === false)
			{
				$m.de.throw_browser_error( "trick.motion.flick is not initialized correctly");
				return false;
			}

			var tmp_id = this.eid;
			this.eid = $m.id(this.eid);
			this.inside_id = $m.id(this.inside_id);
			this.inside_id.style.top = $m.id(this.top_id).offsetHeight + "px";

			var tmp_top = this.inside_id.offsetTop
				,tmp_height = this.eid.offsetHeight - $m.id($m.t.motion.flick.end_id).offsetHeight - 15
				,tmp_ypos_min = tmp_height - $m.id(this.end_id).offsetTop - 32
				,tmp_ypos_max = tmp_top;

			this.cylon = {
				 top : tmp_top
				,height : tmp_height
				,ypos_min : tmp_ypos_min
				,ypos_max : tmp_ypos_max
			}

			var autostart = $m.attr.get(tmp_id, this.data_att_autostart);
			if(autostart !== null)
			{
				this.autostart = true;
				$m.t.motion.flick.timeout = setTimeout(function()
				{
					$m.t.motion.flick.slide_start($m.t.motion.flick.bottom_id);
				}, 5000);
			}

			$m.element.bind(this.top_id, "mousedown", this.slide_start);
			$m.element.bind(this.top_id, "mouseup", this.slide_stop);
			$m.element.bind(this.bottom_id, "mousedown", this.slide_start);
			$m.element.bind(this.bottom_id, "mouseup", this.slide_stop);
			$m.element.bind(tmp_id, "mouseover", this.slide_stop);
		}

		// $m.t.motion.flick.slide_start()
		,slide_start : function(tmp_id)
		{
			clearTimeout($m.t.motion.flick.timeout);

			if($m.is.object(tmp_id) === true)
			{
				var in_id = this.id;
				$m.t.motion.flick.speed = 15;
			}
			else
			{
				var in_id = tmp_id;
				$m.t.motion.flick.speed = 150;
			}

			var id = $m.id(in_id);
			var speed_multiply = 0;
			
			if(in_id == "motion_flick_bottom")
			{
				speed_multiply = Math.floor(id.offsetTop / 5);
				$m.t.motion.flick.increment = -1 * speed_multiply;
				$m.t.motion.flick.increment = Math.max(-10, $m.t.motion.flick.increment);
			}
			else
			{			
				speed_multiply = 10 - Math.floor(id.offsetTop / 5);
				$m.t.motion.flick.increment = 1 * speed_multiply;
				$m.t.motion.flick.increment = Math.min(10, $m.t.motion.flick.increment);
				
				if($m.t.motion.flick.increment < 0)
				{
					$m.t.motion.flick.increment = 100;
				}
			}

			$m.t.motion.flick.slide_do();
		}

		// $m.t.motion.flick.slide_do()
		,slide_do : function()
		{
			var top_pos = $m.t.motion.flick.inside_id.offsetTop;
			top_pos = top_pos / 1 + $m.t.motion.flick.increment;
			
			if(top_pos > $m.t.motion.flick.cylon.ypos_max)
			{
				top_pos = $m.t.motion.flick.cylon.ypos_max;
				$m.t.motion.flick.increment = 0;

				if($m.t.motion.flick.autostart === true)
				{
					clearTimeout($m.t.motion.flick.timeout);
					$m.t.motion.flick.timeout = setTimeout(function()
					{
						$m.t.motion.flick.slide_start($m.t.motion.flick.bottom_id);
					}, 5000);
				}

				return;
			}

			if(top_pos < $m.t.motion.flick.cylon.ypos_min)
			{
				top_pos = $m.t.motion.flick.cylon.ypos_min;
				$m.t.motion.flick.increment = 0;

				if($m.t.motion.flick.autostart === true)
				{
					clearTimeout($m.t.motion.flick.timeout);
					$m.t.motion.flick.timeout = setTimeout(function()
					{
						$m.t.motion.flick.slide_start($m.t.motion.flick.top_id);
					}, 5000);
				}
				
				return;
			}

			$m.t.motion.flick.inside_id.style.top = top_pos + 'px';
			$m.t.motion.flick.timeout = setTimeout(function()
			{
				$m.t.motion.flick.slide_do();
			}, $m.t.motion.flick.speed);
		}

		// $m.t.motion.flick.slide_stop()
		,slide_stop : function()
		{
			clearTimeout($m.t.motion.flick.timeout);
			$m.t.motion.flick.increment = 0;
		}
	}
}
