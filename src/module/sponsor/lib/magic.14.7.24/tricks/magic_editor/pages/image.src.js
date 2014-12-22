/***************************************************************************
- File: image.js
- Version: 12.12.21
- java -jar compiler2.jar --js image.src.js --js_output_file image.VERSION.js
***************************************************************************/

var $me_image = {
	 img_html : false
	,cur_img : false
	,parent_anchor : false

	,construct : function()
	{
		if(parent.$m.is.alive(parent.$m.t.magic_editor.selection.txt) === false)
		{
			parent.$m.t.magic_editor.selection.txt = "";
		}

		this.cur_img = parent.$m.t.magic_editor.cur_image;

		this.nimg_url_id = document.getElementById("img_url");

		this.nimg_title_id = document.getElementById("img_title");
		this.nimg_title_id.value = parent.$m.t.magic_editor.selection.txt;

		if(this.nimg_title_id.value == "false")
		{
			this.nimg_title_id.value = "";
		}


		this.nimg_alt_id = document.getElementById("img_alt");
		this.nimg_alt_id.value = parent.$m.t.magic_editor.selection.txt;

		if(this.nimg_alt_id.value == "false")
		{
			this.nimg_alt_id.value = "";
		}

		this.nimg_margin_top_id = document.getElementById("img_margin_top");
		this.nimg_margin_right_id = document.getElementById("img_margin_right");
		this.nimg_margin_bottom_id = document.getElementById("img_margin_bottom");
		this.nimg_margin_left_id = document.getElementById("img_margin_left");

		this.nimg_float_none_id = document.getElementById("img_float_none");
		this.nimg_float_left_id = document.getElementById("img_float_left");
		this.nimg_float_right_id = document.getElementById("img_float_right");

		this.nimg_border_id = document.getElementById("img_border");

		this.nimg_link_id = document.getElementById("img_link");
		this.nimg_link_target_id = document.getElementById("img_link_target");

		if(this.cur_img !== false)
		{
			document.getElementById("img_create").value = "Update Image";
		
			var attr_src = this.cur_img.getAttribute("src");
			if(parent.$m.is.alive(attr_src) === true)
			{
				this.nimg_url_id.value = attr_src;
			}

			var attr_title = this.cur_img.getAttribute("title");
			if(parent.$m.is.alive(attr_title) === true)
			{
				this.nimg_title_id.value = attr_title;
			}

			var attr_alt = this.cur_img.getAttribute("alt");
			if(parent.$m.is.alive(attr_alt) === true)
			{
				this.nimg_alt_id.value = attr_alt;
			}

			var margin_top = parseInt(this.cur_img.style.marginTop);
			this.nimg_margin_top_id.value = (isNaN(margin_top)) ? "0" : margin_top;

			var margin_right = parseInt(this.cur_img.style.marginRight);
			this.nimg_margin_right_id.value = (isNaN(margin_right)) ? "0" : margin_right;

			var margin_bottom = parseInt(this.cur_img.style.marginBottom);
			this.nimg_margin_bottom_id.value = (isNaN(margin_bottom)) ? "0" : margin_bottom;

			var margin_left = parseInt(this.cur_img.style.marginLeft);
			this.nimg_margin_left_id.value = (isNaN(margin_left)) ? "0" : margin_left;

			var css_float = this.cur_img.style.cssFloat
				,style_float = this.cur_img.style.styleFloat;
			
			if(parent.$m.is.alive(css_float) === true || parent.$m.is.alive(style_float) === true)
			{
				if(css_float == "left" || style_float == "left")
				{
					this.nimg_float_left_id.checked = true;
				}

				if(css_float == "right" || style_float == "right")
				{
					this.nimg_float_right_id.checked = true;
				}
			}

			var attr_border = this.cur_img.getAttribute("border");
			if(parent.$m.is.alive(attr_border) === true)
			{
				this.nimg_border_id.value = attr_border;
			}

			this.parent_anchor = this.cur_img.parentNode;
			if(parent.$m.is.alive(this.parent_anchor) === true)
			{
				if(parent.$m.tag.get_name(this.parent_anchor) == "a")
				{
					var attr_href = this.parent_anchor.getAttribute("href");
					if(parent.$m.is.alive(attr_href) === true)
					{
						this.nimg_link_id.value = attr_href;
					}
		
					var attr_target = this.parent_anchor.getAttribute("target");
					if(parent.$m.is.alive(attr_target) === true)
					{
						if(attr_target == "_blank")
						{
							this.nimg_link_target_id.checked = true;
						}
					}
				}
				else
				{
					this.parent_anchor = false;
				}
			}
			else
			{
				this.parent_anchor = false;
			}
		}
	}
	
	,create : function()
	{
		if($me_image.cur_img !== false)
		{
			parent.$m.t.magic_editor.cur_image.src = $me_image.nimg_url_id.value;
			parent.$m.t.magic_editor.cur_image.title = $me_image.nimg_title_id.value;
			parent.$m.t.magic_editor.cur_image.alt = $me_image.nimg_alt_id.value;

			var css_text = "float: ";
			
			if($me_image.nimg_float_left_id.checked == true)
			{
				css_text += $me_image.nimg_float_left_id.value;
			}
			else if($me_image.nimg_float_right_id.checked == true)
			{
				css_text += $me_image.nimg_float_right_id.value;
			}
			else
			{
				css_text += $me_image.nimg_float_none_id.value;
			}
	
			css_text += "; ";
				
			if(parent.$m.is.alive($me_image.nimg_margin_top_id.value) === true)
			{
				css_text += "margin-top: " + parseInt($me_image.nimg_margin_top_id.value) + "px; ";
			}

			if(parent.$m.is.alive($me_image.nimg_margin_bottom_id.value) === true)
			{
				css_text += "margin-bottom: " + parseInt($me_image.nimg_margin_bottom_id.value) + "px; ";
			}

			if(parent.$m.is.alive($me_image.nimg_margin_right_id.value) === true)
			{
				css_text += "margin-right: " + parseInt($me_image.nimg_margin_right_id.value) + "px; ";
			}

			if(parent.$m.is.alive($me_image.nimg_margin_left_id.value) === true)
			{
				css_text += "margin-left: " + parseInt($me_image.nimg_margin_left_id.value) + "px; ";
			}
			
			parent.$m.t.magic_editor.cur_image.style.cssText = css_text;
			parent.$m.t.magic_editor.cur_image.border = $me_image.nimg_border_id.value;

			if($me_image.parent_anchor !== false)
			{
				if($me_image.nimg_link_id.value.length > 7)
				{
					$me_image.parent_anchor.href = $me_image.nimg_link_id.value;
					
					if($me_image.nimg_link_target_id.checked == true)
					{
						$me_image.parent_anchor.setAttribute("target", "_blank");
					}
					else
					{
						$me_image.parent_anchor.removeAttribute("target");
					}
				}
				else
				{
					parent.$m.tag.replace($me_image.parent_anchor, parent.$m.t.magic_editor.cur_image);
				}
			}
			else
			{
				if($me_image.nimg_link_id.value.length > 7)
				{
					if(parent.$m.vd.is_msie7_or_lower)
					{
						alert("Oops. This won't work with your current browser.");
					}
					else
					{
						var tmp_img = parent.$m.tag.clone(parent.$m.t.magic_editor.cur_image)
							,tmp_anchor = parent.$m.tag.init("a", { "href" : $me_image.nimg_link_id.value });
	
						if($me_image.nimg_link_target_id.checked == true)
						{
							tmp_anchor.setAttribute("target", "_blank");
						}

						tmp_anchor.appendChild(tmp_img);
						parent.$m.tag.replace(parent.$m.t.magic_editor.cur_image, tmp_anchor);
					}
				}
			}
		}
		else
		{
			$me_image.img_html = '<img src="';
			
			var temp = $me_image.nimg_url_id.value.split('.')
				,extension = temp[temp.length-1].toLowerCase();
	
			if(extension == 'gif' || extension == 'jpg' || extension == 'jpeg' || extension == 'jpe' || extension == 'png')
			{
				$me_image.img_html += $me_image.nimg_url_id.value + '" ';
			}
			
			$me_image.img_html += 'title="' + $me_image.nimg_title_id.value + '" ';
			$me_image.img_html += 'alt="' + $me_image.nimg_alt_id.value + '" ';
			
			$me_image.img_html += 'style="float: ';
			
			if($me_image.nimg_float_left_id.checked == true)
			{
				$me_image.img_html += $me_image.nimg_float_left_id.value;
			}
			else if($me_image.nimg_float_right_id.checked == true)
			{
				$me_image.img_html += $me_image.nimg_float_right_id.value;
			}
			else
			{
				$me_image.img_html += $me_image.nimg_float_none_id.value;
			}
	
			$me_image.img_html += '; ';
				
			if(parent.$m.is.alive($me_image.nimg_margin_top_id.value) === true)
			{
				$me_image.img_html += "margin-top: " + parseInt($me_image.nimg_margin_top_id.value) + "px; ";
			}

			if(parent.$m.is.alive($me_image.nimg_margin_bottom_id.value) === true)
			{
				$me_image.img_html += "margin-bottom: " + parseInt($me_image.nimg_margin_bottom_id.value) + "px; ";
			}

			if(parent.$m.is.alive($me_image.nimg_margin_right_id.value) === true)
			{
				$me_image.img_html += "margin-right: " + parseInt($me_image.nimg_margin_right_id.value) + "px; ";
			}

			if(parent.$m.is.alive($me_image.nimg_margin_left_id.value) === true)
			{
				$me_image.img_html += "margin-left: " + parseInt($me_image.nimg_margin_left_id.value) + "px; ";
			}

			$me_image.img_html += '" border="' + $me_image.nimg_border_id.value + '">';

			if($me_image.nimg_link_id.value.length > 7)
			{
				var anchor_html = '<a href="' + $me_image.nimg_link_id.value + '"';

				if($me_image.nimg_link_target_id.checked === true)
				{
					anchor_html += ' target="_blank"';
				}

				$me_image.img_html = anchor_html + '>' + $me_image.img_html + '</a>';
			}
			
			parent.$m.t.magic_editor.inject_html($me_image.img_html, "inline");
		}
		
		parent.$m.t.magic_editor.cur_image = false;
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}

	,cancel : function()
	{
		parent.$m.t.magic_editor.cur_image = false;
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}
}

window.onload = function()
{
	$me_image.construct();
}
