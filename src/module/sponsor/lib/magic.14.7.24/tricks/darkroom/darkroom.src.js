/***************************************************************************
- File: darkroom.js
- Version: 13.5.28
- java -jar compiler2.jar --js darkroom.src.js --js_output_file darkroom.VERSION.js
***************************************************************************/

$m.trick.darkroom = {};

$m.t.darkroom =
{
	 name : "darkroom"
	,data_att : "darkroom"
	,data_att_content : "data-mjf_dr_id"
	,data_att_xy : "data-mjf_dr_xy"
	,data_att_overlay : "data-mjf_dr_overlay"
	,data_att_form : "data-mjf_dr_form"
	,data_att_type : "data-mjf_dr_type"
	,data_att_iframe_src : "data-mjf_dr_iframe_src"
	,data_att_iframe_dim : "data-mjf_dr_iframe_dim"
	,data_att_dim : "data-mjf_dr_dim"
	,data_att_cancel : "dr_cancel"

	,dr_contents : []
	,dr_forms : []
	
	,css : {
		 all : "mjf_darkroom_content"
		,current : "mjf_darkroom_content_current"
		,close_img : "mjf_darkroom_close_img"
	}
	
	,ids : {
		 overlay : "mjf_darkroom_overlay"
		,iframe_div : "mjf_darkroom_iframe_div"
		,iframe_div_iframe : "mjf_darkroom_iframe"
		,img_only_p : "mjf_darkroom_img_only_p"
		,img_only_cache : "mjf_darkroom_img_only_cache"
		,img_only_cache_id : false
		,img_only_img : "mjf_darkroom_img_only"
		,img_only_title : "mjf_darkroom_img_only_title"
	}
	
	,buffer : 20
	,buffer_top : 10
	
	,is : {
		 image : false
		,iframe : false
	}
	

	// $m.t.darkroom.construct()
	,construct : function()
	{
		if($m.is.alive($m.lang.darkroom) === false && $m.ajax_init === false)
		{
			$m.insert_link.script($m.config.basedir + "tricks/darkroom/lang/" + $m.config.lang + ".js", function()
			{
				$m.t.darkroom.init();
			});
		}
		else
		{
			$m.t.darkroom.init();
		}
	}


	// $m.t.darkroom.init()
	,init : function()
	{
		//$m.de.add_item("$m.t.darkroom.init() 1");

		var good_clicks = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att)
			,body_id = $m.id($m.body_id)
			,need_img_div = false
			,cache_img = ""
			,need_iframe = false;
		
		//$m.de.add_item("$m.t.darkroom.init() 2");

		for(var k=0, a_len=good_clicks.length; k < a_len; k++)
		{
			var dr_content = $m.attr.get(good_clicks[k], this.data_att_content)
				,dr_content_id = $m.id(dr_content)
				,dr_type = $m.attr.get(good_clicks[k], this.data_att_type)
				,css_class = ($m.vd.is_msie8_or_lower === true) ? this.css.all + " mjf_darkroom_content_noshadow" : this.css.all;

			if($m.is.alive(dr_type) === true)
			{
				switch(dr_type)
				{
					case "image":
						need_img_div = true;
						this.dr_contents.push(this.ids.img_only_p);
						this.create_img_cache();
						$m.t.darkroom.ids.img_only_cache_id.innerHTML += '<img src="' + $m.attr.get(good_clicks[k], "href") + '" alt="">';
						break;
					
					case "iframe":
						need_iframe = true;
						this.dr_contents.push(this.ids.iframe_div);
						break;
				}
			}
			else if($m.is.in_array(this.dr_contents, dr_content) === false)
			{
				this.dr_contents.push(dr_content);
				this.insert_cancel_img(dr_content);

				if($m.vd.is_msie8_or_lower === true)
				{
					$m.css_class.add(dr_content, "mjf_darkroom_content_noshadow");
				}
			
				$m.css_class.add(dr_content, "visibility_hidden");
				$m.css_class.remove(dr_content, "display_none");
				
				$m.attr.set(dr_content,
				{
					 "data-mjf_dr_width" : dr_content_id.offsetWidth + 20
					,"data-mjf_dr_height" : dr_content_id.offsetHeight + 10
					,"data-mjf" : "drag_n_drop_free"
				});

				$m.css_class.add(dr_content, this.css.all);
				$m.css_class.remove(dr_content, "visibility_hidden");
			}

			var darkroom_form = $m.attr.get(good_clicks[k], this.data_att_form);
			if($m.is.alive(darkroom_form) === true && $m.is.in_array(this.dr_forms, darkroom_form) === false)
			{
				this.dr_forms.push(darkroom_form);
			}
		}

		//$m.de.add_item("$m.t.darkroom.init() 3");
		
		if($m.id(this.ids.overlay) === false)
		{
			var dr_overlay_div = $m.tag.init("div", { "id" : this.ids.overlay });
		
			if($m.vd.is_msie6_or_lower === true)
			{
				dr_overlay_div.style.cssText += "filter: alpha(opacity = 85);";
			}

			body_id.appendChild(dr_overlay_div);

			$m.win.bind("resize", function()
			{
				$m.t.darkroom.resize_overlay();
			});
		}

		if(need_img_div === true && $m.id(this.ids.img_only_p) === false)
		{
			$m.tag.create($m.body_id, "p",
			{
				 "data-mjf" : "drag_n_drop_free"
				,"class" : css_class
				,"id" : this.ids.img_only_p
			});

			$m.tag.create(this.ids.img_only_p, "img",
			{
				 "alt" : ""
				,"id" : this.ids.img_only_img
			});

			$m.tag.create(this.ids.img_only_p, "br");
			$m.tag.create(this.ids.img_only_p, "span", { "id" : this.ids.img_only_title });

			this.insert_cancel_img(this.ids.img_only_p);
		}

		if(need_iframe === true && $m.id(this.ids.iframe_div) === false)
		{
			$m.tag.create($m.body_id, "div",
			{
				 "data-mjf" : "drag_n_drop_free"
				,"class" : css_class
				,"id" : this.ids.iframe_div
			});

			$m.tag.create(this.ids.iframe_div, "iframe",
			{
				 "frameBorder" : 0
				,"border" : 0
				,"src" : "about:blank"
				,"id" : this.ids.iframe_div_iframe
			});

			this.insert_cancel_img(this.ids.iframe_div);
			
			if($m.is.alive($m.t.drag_n_drop) === true)
			{
				$m.element.attach(this.ids.iframe_div_iframe, "dragover", $m.t.drag_n_drop.free.drag_over);
				$m.element.attach(this.ids.iframe_div_iframe, "drop", $m.t.drag_n_drop.free.drag_drop);
				$m.element.attach(this.ids.iframe_div_iframe, "load", $m.t.darkroom.iframe_events);
			}
		}

		$m.elements.bind(good_clicks, this.data_att, "click", this.exec);
		$m.elements.bind($m.tags.img, this.data_att_cancel, "mousedown", this.hide);
		$m.shortcut.bind("esc", function(){ $m.t.darkroom.hide_all(); });
		
		if($m.is.alive($m.t.drag_n_drop) === true)
		{
			$m.t.drag_n_drop.free.construct();
		}
	}
	
	
	// $m.t.darkroom.iframe_events()
	,iframe_events : function()
	{
		$m.css_class.remove($m.t.darkroom.ids.iframe_div_iframe, "mjf_darkroom_iframe_loading");
	
		var iframe_doc = $m.tag.get_iframe_doc($m.t.darkroom.ids.iframe_div_iframe);
	
		if($m.is.alive(iframe_doc) === true)
		{
			var iframe_body = $m.tag.get_body(iframe_doc);
			
			$m.element.attach(iframe_body, "dragover", $m.t.drag_n_drop.free.drag_over);
			$m.element.attach(iframe_body, "drop", $m.t.drag_n_drop.free.drag_drop_frame);
			$m.shortcut.bind("esc", function() { parent.$m.t.darkroom.hide_all(); }, { target : iframe_body });

			if($m.vd.is_mobile_touch === true)
			{
				$m.id($m.t.darkroom.ids.iframe_div).style.height = iframe_body.offsetHeight + 50 + "px";
				$m.attr.set($m.t.darkroom.ids.iframe_div_iframe, { "height" : iframe_body.offsetHeight });
			}
		}
	}


	// $m.t.darkroom.exec(IN_ID)
	,exec : function(in_id)
	{
		var id = $m.id(in_id)
			,dr_name = $m.attr.get(in_id, $m.t.darkroom.data_att_content)
			,dr_id = $m.id(dr_name)
			,pos_xy = $m.attr.get(in_id, $m.t.darkroom.data_att_xy)
			,dr_overlay_id = ""
			,dr_type = $m.attr.get(in_id, $m.t.darkroom.data_att_type);

		if($m.tag.get_name(in_id) == "a")
		{
			var id_href = $m.attr.get(in_id, "href")
				,ga_track = $m.attr.get(in_id, "data-mjf_ga_track");

			if($m.is.alive(id_href) === true && ga_track === null)
			{
				$m.track.ga(
				{
					 "category" : "MJF Darkroom"
					,"action" : in_id + " " +  "Click"
					,"label" : dr_name
				});
			}

			id.blur();
		}
		
		$m.vd.get_view_port();

		if($m.attr.has_value(id, $m.t.darkroom.data_att_overlay, "true") === true)
		{
			dr_overlay_id = $m.id($m.t.darkroom.ids.overlay);

			dr_overlay_id.style.height = $m.vd.total_page_height + "px";
			dr_overlay_id.style.width = $m.vd.total_page_width + "px";
			dr_overlay_id.style.display = "block";
		}

		if($m.is.alive(dr_type) === true)
		{
			var dr_id_width = 0;
		
			switch(dr_type)
			{
				case "image":
					var id_href = $m.attr.get(in_id, "href")
						,dr_id = $m.id($m.t.darkroom.ids.img_only_p)
						,img_id = $m.id($m.t.darkroom.ids.img_only_img)
						,test_title = $m.attr.get(in_id, "title")
						,cache_img = new Image();
					
					$m.t.darkroom.is.image = true;

					cache_img.src = id_href;

					$m.css_class.add(dr_id, "dr_visibility_hidden");
					$m.css_class.add(dr_id, $m.t.darkroom.css.current);

					/* dr_id.style.left = 0; */
					/* dr_id.style.top = 0; */

					img_id.src = cache_img.src;

					$m.id($m.t.darkroom.ids.img_only_title).innerHTML = $m.is.alive(test_title) === true ? test_title : "";
					dr_id.style.height = "auto";
					$m.t.darkroom.set_xy(dr_id, cache_img.width, dr_id.offsetHeight);

					break;

				case "iframe":
					$m.attr.set($m.t.darkroom.ids.iframe_div_iframe, { "src" : "about:blank" });
					
					$m.t.darkroom.is.iframe = true;
				
					var dr_id = $m.id($m.t.darkroom.ids.iframe_div)
						,iframe_dim = $m.attr.get(in_id, $m.t.darkroom.data_att_dim)
						,iframe_dim_old = $m.attr.get(in_id, $m.t.darkroom.data_att_iframe_dim)
						,new_width = ($m.vd.is_msie === true) ? 5 : 10
						,iframe_id = $m.id($m.t.darkroom.ids.iframe_div_iframe)
						,iframe_new_width = 0
						,iframe_new_height = 0;

					$m.css_class.add($m.t.darkroom.ids.iframe_div_iframe, "mjf_darkroom_iframe_loading");
					$m.css_class.add(dr_id, "dr_visibility_hidden");
					$m.css_class.add(dr_id, $m.t.darkroom.css.current);
					
					/* dr_id.style.top = 0; */
					/* dr_id.style.width = 0; */

					if($m.is.alive(iframe_dim_old) === true)
					{
						iframe_dim = iframe_dim_old;
					}

					if(iframe_dim.match("x"))
					{
						iframe_dims = iframe_dim.split("x");
						iframe_new_width = parseInt(iframe_dims[0]);
						iframe_new_height = parseInt(iframe_dims[1]);

						$m.t.darkroom.set_xy(dr_id, iframe_new_width + new_width, iframe_new_height + 20);

						dr_id_width = parseInt(dr_id.style.width);
						
						if(iframe_new_width > dr_id_width)
						{
							iframe_new_width = dr_id_width - new_width;
						}
					}
					else
					{
						var target_height = $m.vd.visible_page_height - 60;
					
						dr_id.style.height = target_height + "px";

						$m.t.darkroom.set_xy(dr_id, $m.vd.total_page_width, target_height);
						
						iframe_new_width = parseInt(dr_id.style.width) - new_width;
						iframe_new_height = parseInt(target_height) - 20;
					}

					$m.attr.set(iframe_id,
					{
						 "src" : $m.attr.get(in_id, $m.t.darkroom.data_att_iframe_src)
						,"width" : iframe_new_width
						,"height" : iframe_new_height
					});

					break;
			}
		}
		else
		{
			$m.css_class.add(dr_id, "dr_visibility_hidden");
			$m.css_class.add(dr_id, $m.t.darkroom.css.current);

			var cont_dim = $m.attr.get(in_id, $m.t.darkroom.data_att_dim)
				,cont_new_width = ""
				,cont_new_width = ""
				,new_width = ($m.vd.is_msie === true) ? 5 : 10;
			
			if($m.is.alive(cont_dim) === true)
			{
				if(cont_dim.match("x"))
				{
					cont_dims = cont_dim.split("x");
					cont_new_width = parseInt(cont_dims[0]);
					cont_new_height = parseInt(cont_dims[1]);
					
					dr_id.style.overflow = "auto";
	
					$m.t.darkroom.set_xy(dr_id, cont_new_width + new_width, cont_new_height + 20);
				}
				else
				{
					var target_height = $m.vd.visible_page_height - 60;
					dr_id.style.height = target_height + "px";
					$m.t.darkroom.set_xy(dr_id, $m.vd.total_page_width, target_height);
				}
			}
			else
			{
				$m.t.darkroom.set_xy(dr_id, $m.attr.get(dr_id, "data-mjf_dr_width"), $m.attr.get(dr_id, "data-mjf_dr_height"));
			}
		}
		
		//dr_id.style.top = $m.vd.scrolled_top + 10 + "px";

		$m.css_class.remove(dr_id, "dr_visibility_hidden");

		if($m.is.alive(pos_xy) === true)
		{
			var id_pos = $m.position.get_xy(in_id)
				,new_xy = pos_xy.split("x")
				,new_x = (new_xy[0].match("-")) ? id_pos[0] - parseInt(new_xy[0].replace("-", "")) : id_pos[0] + parseInt(new_xy[0])
				,new_y = (new_xy[1].match("-")) ? id_pos[1] - parseInt(new_xy[1].replace("-", "")) : id_pos[1] + parseInt(new_xy[1]);

			dr_id.style.left = new_x + "px";
			dr_id.style.top = new_y + "px";
		}
	
		$m.t.darkroom.is.image = false;
		$m.t.darkroom.is.iframe = false;
	}


	// $m.t.darkroom.resize_overlay()
	,resize_overlay : function()
	{
		var dr_overlay_id = $m.id($m.t.darkroom.ids.overlay);
		
		if(dr_overlay_id.style.display == "block")
		{
			dr_overlay_id.style.display = "none";
			$m.vd.get_view_port();
			dr_overlay_id.style.height = $m.vd.total_page_height + "px";
			dr_overlay_id.style.width = $m.vd.total_page_width + "px";
			dr_overlay_id.style.display = "block";
		}
	}


	// $m.t.darkroom.set_xy(IN_ID, IN_WIDTH, IN_HEIGHT)
	,set_xy : function(in_id, in_width, in_height)
	{
		var width_int = parseInt(in_width);

		if($m.vd.total_page_width >= (width_int + $m.t.darkroom.buffer))
		{
			in_id.style.left = parseInt($m.vd.total_page_width / 2) - parseInt(width_int / 2) - 10 + "px";
			in_id.style.width = width_int + "px";
		}
		else
		{
			in_id.style.left = $m.t.darkroom.buffer + "px";
			in_id.style.width = $m.vd.total_page_width - ($m.t.darkroom.buffer * 2) - 10 + "px";
		}


		var height_int = parseInt(in_height)
			,final_top = 0;

		if($m.vd.visible_page_height >= (height_int + $m.t.darkroom.buffer_top))
		{
			final_top = parseInt($m.vd.visible_page_height / 2) - parseInt(height_int / 2) + $m.vd.scrolled_top;
			
			if(final_top < 10)
			{
				final_top = 20;
			}

			in_id.style.height = height_int + 10 + "px";
		}
		else
		{
			final_top = $m.t.darkroom.buffer_top + $m.vd.scrolled_top;
			
			var extra_height = ($m.t.darkroom.is.image === true) ? 30 : 10;
			in_id.style.height = height_int + extra_height + "px";
		}
		
		in_id.style.top = final_top + "px";
	}


	// $m.t.darkroom.create_img_cache(IN_BODY_ID)
	,create_img_cache : function(in_body_id)
	{
		if($m.id($m.t.darkroom.ids.img_only_cache) === false)
		{
			$m.tag.create($m.body_id, "p", { "id" : $m.t.darkroom.ids.img_only_cache });
			$m.t.darkroom.ids.img_only_cache_id = $m.id($m.t.darkroom.ids.img_only_cache);
		}
	}


	// $m.t.darkroom.insert_cancel_img(IN_ID)
	,insert_cancel_img : function(in_id)
	{
		var id = $m.id(in_id);

		if($m.is.alive(id) === false)
		{
			return false;
		}

		if($m.is.alive($m.lang.darkroom) === false)
		{
			$m.lang.darkroom = { close : "Close" };
		}
		
		
		
		
/*
		$m.tag.create(id, "div",
		{
			 "class" : $m.t.darkroom.css.scroll_cont
			,"id" : in_id + ".scroll_cont"
			
		});
*/

		$m.tag.create(id, "span",
		{
			 "data-mjf" : "drag_n_drop_handle"
			,"class" : "mjf_darkroom_handle"
			,"id" : in_id + ".handle"
		}, null, "first");

		$m.tag.create(id, "img",
		{
			 "src" : $m.config.basedir + "images/icons/icon_close_16x16.png"
			,"alt" : $m.lang.darkroom.close
			,"title" : $m.lang.darkroom.close
			,"height" : "16"
			,"width" : "16"
			,"data-mjf" : $m.t.darkroom.data_att_cancel
			,"class" : $m.t.darkroom.css.close_img
			,"id" : in_id + ".close_img"
		}, null, "first");
		
		
	}


	// $m.t.darkroom.hide(IN_ID)
	,hide : function(in_id)
	{
		if($m.is.alive(in_id) === false)
		{
			return false;
		}
		
		var dr_id = in_id.split(".")[0]
			dr_id_obj = $m.id(dr_id);
		
		dr_id_obj.style.top = parseInt(dr_id_obj.style.top) + 75 + "px";
		dr_id_obj.style.opacity = .5;
		
		setTimeout(function()
		{
			$m.css_class.remove(dr_id, $m.t.darkroom.css.current);
			dr_id_obj.style.opacity = 1;

		}, 250);
		
		$m.id($m.t.darkroom.ids.overlay).style.display = "none";
	}


	// $m.t.darkroom.hide_all()
	,hide_all : function()
	{
		for(var i=0, len=$m.t.darkroom.dr_contents.length; i < len; i++)
		{
			$m.css_class.remove($m.t.darkroom.dr_contents[i], $m.t.darkroom.css.current);
		}

		$m.id($m.t.darkroom.ids.overlay).style.display = "none";
	}
}

