/***************************************************************************
- File: magic_calendar.js
- Version: 14.6.3
- java -jar compiler2.jar --js magic_calendar.src.js --js_output_file magic_calendar.VERSION.js

- https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date

***************************************************************************/

$m.trick.magic_calendar = {};

$m.t.magic_calendar =
{
	 name : "magic_calendar"
	,data_att : "magic_calendar"
	,data_att_has : "data-mjf_mcal_has"
	,data_att_parent : "data-mjf_mcal_parent"
	,data_att_dformat : "data-mjf_mcal_date_format"
	,data_att_tformat : "data-mjf_mcal_time_format"
	
	,iframe_id : ""
	
	,cur : {
		 input : ""
		,format : ""

		,year : 0
		,month : 0
		,day : 0
		
		,hour : 0
		,minute : 0
		,second : 0
		,ampm : ""
	}

	,ori : {
		 year : ""
		,month : ""
		,day : ""
		
		,hour : ""
		,minute : ""
		,second : ""
		,ampm : ""
	}

	,format : {
		 date : [
			 "MM-dd-yyyy"
			,"MM/dd/yyyy"
			,"yyyy-MM-dd"
			,"yyyy/MM/dd"
			,"MMM dd, yyyy"
			,"MMMM dd, yyyy"
		]
		
		,time : [
			  "H:mm:ss ampm"
			 ,"H:mm ampm"
		]
	}
	
	,uses_time : false
	,uses_time_seconds : false
	,final_height : 0
	,increments : 25
	

	// $m.t.magic_calendar.construct()
	,construct : function(in_wand)
	{
		$m.dt.get_date_now();
	
		if($m.is.alive(this.earliest_year) === false)
		{
			this.earliest_year = $m.dt.current_year - 100;
		}
		
		if($m.is.alive(this.furthest_year) === false)
		{
			this.furthest_year = $m.dt.current_year + 50;
		}

		var input_fields = {}
			has_calendar = false;

		for(var i=0, f_len=$m.tags.form.length; i < f_len; i++)
		{
			input_fields = $m.attr.get_fields_with($m.tags.form[i], ['text'], $m.data_att, this.data_att);
			
			for(var j=0, i_len=input_fields.length; j < i_len; j++)
			{
				has_calendar = $m.attr.get(input_fields[j], this.data_att_has);

				if($m.is.alive(has_calendar) === false)
				{
					var anchor_id = input_fields[j].id + "_link_" + $m.ut.rand_num(5);
				
					$m.tag.insert_after(input_fields[j], $m.tag.init("a",
					{
						 "data-mjf" : "magic_calendar|return_false"
						,"data-mjf_mcal_parent" : input_fields[j].id
						,"href" : "#"
						,"class" : "mcal_icon"
						,"id" : anchor_id
					}));
					
					$m.tag.create(anchor_id, "img",
					{
						 "src" : $m.config.basedir + "images/icons/icon_calendar.png"
						,"alt" : ""
						
					});
					
					$m.attr.set(input_fields[j], { "data-mjf_mcal_has" : "true" });
				}
			}
		}

		if($m.ajax_init === false)
		{
			this.iframe_id = "magic_cal" + $m.ut.rand_num(5);
		
			var iframe_cal = $m.tag.init("iframe",
			{
				 "id" : this.iframe_id
				,"name" : this.iframe_id
				,"src" : $m.config.basedir + "tricks/magic_calendar/mcal.html"
				,"class" : "mcal_iframe"
				,"frameborder" : "0"
				,"scrolling" : "no"
			});
	
			iframe_cal.style.cssText  = ($m.vd.is_msie7_or_lower === true) ? "overflow:hidden;" : "";
			iframe_cal.style.cssText += "height:260px;left:0;top:0;visibility:hidden;"
			
			$m.id($m.body_id).appendChild(iframe_cal);
			
			var cal_id = $m.id(this.iframe_id);
	
			if($m.vd.is_msie7_or_lower === true)
			{
				cal_id.style.height = "300px";
				cal_id.style.width = "350px";
			}
			
			this.final_height = parseInt($m.id(cal_id).style.height);
		}

		$m.dt.get_date_now();
		$m.elements.bind($m.tags.a, this.data_att, "click", this.exec);
		$m.element.attach($m.body_id, "mousedown", $m.t.magic_calendar.hide);
		$m.element.attach($m.body_id, "keydown", $m.t.magic_calendar.hide);
		$m.element.attach($m.body_id, "keydown", $m.t.magic_calendar.hide);
		$m.element.attach($m.body_id, "touchstart", $m.t.magic_calendar.hide);
	}


	// $m.t.magic_calendar.exec()
	,exec : function(in_id)
	{
		$m.t.magic_calendar.cur.input = $m.attr.get(in_id, $m.t.magic_calendar.data_att_parent);
		$m.t.magic_calendar.cur.dformat = $m.attr.get($m.t.magic_calendar.cur.input, $m.t.magic_calendar.data_att_dformat);
		$m.t.magic_calendar.cur.tformat = $m.attr.get($m.t.magic_calendar.cur.input, $m.t.magic_calendar.data_att_tformat);
		$m.t.magic_calendar.reset();

		if($m.t.magic_calendar.parse_date() == false)
		{
			return false;
		}

		$m.t.magic_calendar.write();

		var iframe_id = $m.id($m.t.magic_calendar.iframe_id)
			,id_pos = $m.position.get_xy(in_id)
			,final_left = id_pos[0] + 22
			,final_top = id_pos[1] - 20;

		$m.vd.get_view_port();

		if((final_top + $m.t.magic_calendar.final_height) <= ($m.vd.scrolled_top + $m.vd.visible_page_height))
		{
			iframe_id.style.top = final_top + "px";
		}
		else
		{
			iframe_id.style.top = id_pos[1] - $m.t.magic_calendar.final_height + 30 + "px";
		}
		
		if(($m.vd.visible_page_width - final_left) < 325)
		{
			iframe_id.style.left = final_left - 385 + "px";
		}
		else
		{
			iframe_id.style.left = final_left + "px";
		}

		if($m.vd.is_mobile_touch === true)
		{
			iframe_id.style.visibility = "visible";
		}
		else
		{
			iframe_id.style.opacity = 0;
			iframe_id.style.visibility = "visible";
			$m.animate.opaque(iframe_id, "up", $m.t.magic_calendar.increments);		
		}
		
		$m.css_class.add($m.t.magic_calendar.cur.input, "mcal_field_on");

		$m.tag.get_iframe_doc($m.t.magic_calendar.iframe_id).getElementById("mcal_date_picked").focus();
	}


	// $m.t.magic_calendar.reset()
	,reset : function(in_id)
	{
		$m.t.magic_calendar.cur.year = 0;
		$m.t.magic_calendar.cur.month = 0;
		$m.t.magic_calendar.cur.day = 0;
		
		$m.t.magic_calendar.cur.hour = 0;
		$m.t.magic_calendar.cur.minute = 0;
		$m.t.magic_calendar.cur.second = 0;
		
		$m.t.magic_calendar.cur.ampm = "";
	}


	// $m.t.magic_calendar.hide()
	,hide : function(in_id)
	{
		var iframe_id = $m.id($m.t.magic_calendar.iframe_id);
		
		iframe_id.style.visibility = "hidden";
		iframe_id.style.top = "-1000px";
		iframe_id.style.left = "-1000px";
		
		$m.css_class.remove($m.t.magic_calendar.cur.input, "mcal_field_on");
	}
/*


	// $m.tag.get_iframe_doc()
	,giframe : function()
	{
		if(document.getElementById($m.t.magic_calendar.iframe_id).contentDocument)
		{
			return document.getElementById($m.t.magic_calendar.iframe_id).contentDocument;
		}
		else
		{
			return document.frames[$m.t.magic_calendar.iframe_id].document;
		}
	}
*/


	// $m.t.magic_calendar.parse_date()
	,parse_date : function()
	{
		var field_value = $m.id($m.t.magic_calendar.cur.input).value
			
			,mcal_dformat = $m.is.in_array($m.t.magic_calendar.format.date, $m.t.magic_calendar.cur.dformat)
			,mcal_date = ""
			
			,mcal_tformat = false
			
			,param = {
				 year : $m.dt.current_year
				,month : $m.dt.obj_date.getMonth()
				,day : $m.dt.obj_date.getDate()
				,hour : $m.dt.obj_date.getHours()
				,minute : $m.dt.obj_date.getMinutes()
				,second : $m.dt.obj_date.getSeconds()
			}
			
			,date_time_split = ""
			,date_pieces = ""
			
			,time_str = ""
			,time_pieces = ""

			ampm_str = (param.hour > 11) ? "pm" : "am";

		if($m.is.alive(field_value) === false)
		{
			if($m.is.alive($m.t.magic_calendar.cur.tformat) === true)
			{
				$m.t.magic_calendar.uses_time = true;
				
				if($m.t.magic_calendar.cur.tformat.length == 12)
				{
					$m.t.magic_calendar.uses_time_seconds = true;
				}
			}
		}
		else
		{
			if($m.is.alive($m.t.magic_calendar.cur.tformat) === true)
			{
				mcal_tformat = $m.is.in_array($m.t.magic_calendar.format.time, $m.t.magic_calendar.cur.tformat);
			}

			if(mcal_tformat === false)
			{
				$m.t.magic_calendar.uses_time = false;
				$m.t.magic_calendar.uses_time_seconds = false;
			
				if(mcal_dformat === false)
				{
					return false;
				}
			}
			else
			{
				$m.t.magic_calendar.uses_time = true;
				date_time_split = field_value.split(" ");

				ampm_str = date_time_split[date_time_split.length - 1];
				time_str = date_time_split[date_time_split.length - 2];

				if($m.is.alive(time_str) === true)
				{
					time_pieces = time_str.split(":");
					
					if($m.is.alive(time_pieces) === true)
					{
						if(ampm_str == "pm")
						{
							time_pieces[0] = parseInt(time_pieces[0]) + 12;
						}
	
						if(time_pieces[0] == 24)
						{
							time_pieces[0] = 12;
						}
			
						param.hour = time_pieces[0];
						param.minute = time_pieces[1];
						
						if($m.is.alive(time_pieces[2]) === true)
						{
							param.second = time_pieces[2];
							$m.t.magic_calendar.uses_time_seconds = true;
						}
					}
				}

				if(mcal_tformat == 0)
				{
					$m.t.magic_calendar.uses_time_seconds = true;
				}
			}
	
			switch(mcal_dformat)
			{
				case 0: // MM-dd-yyyy
					date_pieces = field_value.split("-");
					param.year = (mcal_tformat !== false) ? date_pieces[2].split(" ")[0] : date_pieces[2];
					param.month = (date_pieces[0] - 1);
					param.day = date_pieces[1];
					break;
				
				case 1: // MM/dd/yyyy
					date_pieces = field_value.split("/");
					param.year = (mcal_tformat !== false) ? date_pieces[2].split(" ")[0] : date_pieces[2];
					param.month = (date_pieces[0] - 1);
					param.day = date_pieces[1];
					break;
	
				case 2: // yyyy-MM-dd
					date_pieces = field_value.split("-");
					param.year = date_pieces[0];
					param.month = (date_pieces[1] - 1);
					param.day = (mcal_tformat !== false) ? date_pieces[2].split(" ")[0] : date_pieces[2];
					break;
	
				case 3: // yyyy/MM/dd
					date_pieces = field_value.split("/");
					param.year = date_pieces[0];
					param.month = (date_pieces[1] - 1);
					param.day = (mcal_tformat !== false) ? date_pieces[2].split(" ")[0] : date_pieces[2];
					break;
				
				case 4: // MMM dd, yyyy
					field_value = field_value.replace(",", "");
					date_pieces = field_value.split(" ");
					param.year = (mcal_tformat !== false) ? date_pieces[2].split(" ")[0] : date_pieces[2];
					param.month = $m.is.in_array($m.dt.month_names_short, date_pieces[0]);
					param.day = date_pieces[1];
					break;
				
				case 5: // MMMM dd, yyyy
					field_value = field_value.replace(",", "");
					date_pieces = field_value.split(" ");
					param.year = (mcal_tformat !== false) ? date_pieces[2].split(" ")[0] : date_pieces[2];
					param.month = $m.is.in_array($m.dt.month_names, date_pieces[0]);
					param.day = date_pieces[1];
					break;
			}
		}

		mcal_date = new Date(param.year, param.month, param.day, param.hour, param.minute, param.second);

		if(isNaN(mcal_date.getYear()) === true)
		{
			$m.t.magic_calendar.cur.year = $m.dt.current_year;
			$m.t.magic_calendar.cur.month = $m.dt.obj_date.getMonth();
			$m.t.magic_calendar.cur.day = $m.dt.obj_date.getDate();
			
			$m.t.magic_calendar.cur.hour = $m.dt.obj_date.getHours();
			$m.t.magic_calendar.cur.minute = $m.dt.obj_date.getMinutes();
			$m.t.magic_calendar.cur.second = $m.dt.obj_date.getSeconds();
		}
		else
		{
			$m.t.magic_calendar.cur.year = mcal_date.getFullYear();
			$m.t.magic_calendar.cur.month = mcal_date.getMonth();
			$m.t.magic_calendar.cur.day = mcal_date.getDate();
			
			$m.t.magic_calendar.cur.hour = mcal_date.getHours();
			$m.t.magic_calendar.cur.minute = mcal_date.getMinutes();
			$m.t.magic_calendar.cur.second = mcal_date.getSeconds();
		}
		
		$m.t.magic_calendar.cur.ampm = ampm_str;
		$m.t.magic_calendar.ori.ampm = ampm_str;

		$m.t.magic_calendar.ori.year = $m.t.magic_calendar.cur.year;
		$m.t.magic_calendar.ori.month = $m.t.magic_calendar.cur.month;
		$m.t.magic_calendar.ori.day = $m.t.magic_calendar.cur.day;

		$m.t.magic_calendar.ori.hour = $m.t.magic_calendar.cur.hour;
		$m.t.magic_calendar.ori.minute = $m.t.magic_calendar.cur.minute;
		$m.t.magic_calendar.ori.second = $m.t.magic_calendar.cur.second;
	}
	
	
	// $m.t.magic_calendar.set()
	,set : function()
	{
		var mcal_dformat = $m.is.in_array($m.t.magic_calendar.format.date, $m.t.magic_calendar.cur.dformat)
			,month_int = parseInt($m.t.magic_calendar.cur.month)
			,day_int = parseInt($m.t.magic_calendar.cur.day)
			,set_month = (month_int < 9) ? "0" + (month_int + 1) : month_int + 1
			,set_day = (day_int < 10) ? "0" + day_int : day_int
			,date_str = ""
			,time_str = "";
		
		switch(mcal_dformat)
		{
			case 0: // MM-dd-yyyy
				date_str = set_month + "-" + set_day + "-" + $m.t.magic_calendar.cur.year;
				break;

			case 1: // MM/dd/yyyy
				date_str = set_month + "/" + set_day + "/" + $m.t.magic_calendar.cur.year;
				break;

			case 2: // yyyy-MM-dd
				date_str = $m.t.magic_calendar.cur.year + "-" + set_month + "-" + set_day;
				break;

			case 3: // yyyy/MM/dd
				date_str = $m.t.magic_calendar.cur.year + "/" + set_month + "/" + set_day;
				break;

			case 4: // MMM dd, yyyy
				if($m.t.magic_calendar.cur.day.length == 1)
					$m.t.magic_calendar.cur.day = "0" + $m.t.magic_calendar.cur.day;
				
				date_str = $m.dt.month_names_short[$m.t.magic_calendar.cur.month] + " " + $m.t.magic_calendar.cur.day + ", " + $m.t.magic_calendar.cur.year;
				break;
			
			case 5: // MMMM dd, yyyy
				date_str = $m.dt.month_names[$m.t.magic_calendar.cur.month] + " " + set_day + ", " + $m.t.magic_calendar.cur.year;
				break;
		}

		if($m.is.alive($m.t.magic_calendar.cur.tformat) === true)
		{
			var mcal_tformat = $m.is.in_array($m.t.magic_calendar.format.time, $m.t.magic_calendar.cur.tformat)
				,hour_format = ""
				,minute_format = ""
				,second_format = "";

			hour_format = ($m.t.magic_calendar.cur.hour > 12) ? $m.t.magic_calendar.cur.hour - 12 : $m.t.magic_calendar.cur.hour;
			minute_format = ($m.t.magic_calendar.cur.minute < 10) ? "0" + $m.t.magic_calendar.cur.minute : $m.t.magic_calendar.cur.minute;
			
			time_str += " " + hour_format + ":" + minute_format;
			
			if(mcal_tformat == 0)
			{
				second_format = ($m.t.magic_calendar.cur.second < 10) ? "0" + $m.t.magic_calendar.cur.second : $m.t.magic_calendar.cur.second;
				time_str += ":" + second_format;
			}
			
			time_str += " " + $m.t.magic_calendar.cur.ampm;
		}

		$m.id($m.t.magic_calendar.cur.input).value = date_str + time_str;
		
		
		if($m.vd.is_mobile_touch === false)
		{
			$m.cursor.set($m.t.magic_calendar.cur.input, "end");
		}

		$m.t.magic_calendar.hide();
	}


	// $m.t.magic_calendar.pick(in_piece, in_this)
	,pick : function(in_piece, in_this)
	{
		var id = in_this.id;
		$m.t.magic_calendar.cur[in_piece] = in_this.value;
		$m.t.magic_calendar.write();
		
		if(id !== false)
		{
			$m.tag.get_iframe_doc($m.t.magic_calendar.iframe_id).getElementById(id).focus();
		}
	}


	// $m.t.magic_calendar.go(in_way)
	,go : function(in_way, in_this)
	{
		var id = in_this.id;
		$m.t.magic_calendar.cur.month = (in_way == "prev") ? $m.t.magic_calendar.cur.month - 1 : $m.t.magic_calendar.cur.month + 1;

		if($m.t.magic_calendar.cur.month < 0)
		{
			$m.t.magic_calendar.cur.month = 11
			$m.t.magic_calendar.cur.year--;
		}
		
		if($m.t.magic_calendar.cur.month > 11)
		{
			$m.t.magic_calendar.cur.month = 0
			$m.t.magic_calendar.cur.year++;
		}

		$m.t.magic_calendar.write();
		
		if(id !== false)
		{
			$m.tag.get_iframe_doc($m.t.magic_calendar.iframe_id).getElementById(id).focus();
		}
	}


	// $m.t.magic_calendar.update(in_piece, in_val)
	,update : function(in_piece, in_val)
	{
		$m.t.magic_calendar.pick(in_piece,
		{
			 id : false
			,value : in_val
		});

		$m.t.magic_calendar.set();
	}


	// $m.t.magic_calendar.today(in_this)
	,today : function(in_this)
	{
		var current_dt =
		{
			 id : false
			,value : $m.dt.current_year
		};

		$m.t.magic_calendar.pick('year', current_dt);
		
		current_dt.value = $m.dt.obj_date.getMonth();
		$m.t.magic_calendar.pick('month', current_dt);
		
		current_dt.value = $m.dt.obj_date.getDate();
		$m.t.magic_calendar.pick('day', current_dt);
		
		$m.t.magic_calendar.write();
		
		var date_current_id = $m.tag.get_iframe_doc($m.t.magic_calendar.iframe_id).getElementById("mcal_date_current");

		if(date_current_id)
		{
			date_current_id.focus();
		}
	}


	// $m.t.magic_calendar.write()
	,write : function()
	{
		var mcal_id = $m.tag.get_iframe_doc($m.t.magic_calendar.iframe_id).getElementById("mcal_cont")
			,mcal_html = ""
			,i = 0
			,j = 0
			,ip0 = ""
			,mp1 = ""
			,td_val = ""
			,cur_css = ""
			,a_id = ""
			,selected_mon = ""
			,selected_day = ""
			,selected_year = "";


		//// Build drop down calendar

		mcal_html += '<table cellpadding="0" cellspacing="0" border="0" class="mcal_table"><tr><th colspan="7">';
		mcal_html += '<a href="#" onclick="parent.$m.t.magic_calendar.go(\'prev\', this);return false;" tabIndex="1" title="Previous Month" id="mcal_pmonth_picker"><img src="' + $m.config.basedir + 'images/icons/icon_arrow_left.png" alt=""></a> ';
		mcal_html += '<select name="mcal_month" class="mcal_select" onchange="parent.$m.t.magic_calendar.pick(\'month\', this);" onkeyup="parent.$m.t.magic_calendar.pick(\'month\', this);" tabIndex="2" id="mcal_month_picker"> ';

		for(i=0; i < 12; i++)
		{
			selected_mon = (i == $m.t.magic_calendar.cur.month) ? 'selected="selected"' : '';
			mcal_html += '<option value="' + i + '" ' + selected_mon + '>' + $m.dt.month_names[i] + '</option>';
		}

		mcal_html += '</select><input type="hidden" name="mcal_day" value="';

		for(i=1; i < 32; i++)
		{
			if(i == $m.t.magic_calendar.cur.day)
			{
				mcal_html += i;
			}
		}

		mcal_html += '"> <select name="mcal_year" class="mcal_select" onchange="parent.$m.t.magic_calendar.pick(\'year\', this);" onkeyup="parent.$m.t.magic_calendar.pick(\'year\', this);" tabIndex="3" id="mcal_year_picker">';
		
		for(i=$m.t.magic_calendar.earliest_year; i < $m.t.magic_calendar.furthest_year; i++)
		{
			selected_year = (i == $m.t.magic_calendar.cur.year) ? 'selected="selected"' : '';
			mcal_html += '<option value="' + i + '" ' + selected_year + '>' + i + '</option>';
		}
		
		mcal_html += '</select> <a href="#" onclick="parent.$m.t.magic_calendar.go(\'next\', this);return false;" tabIndex="4" title="Next Month" id="mcal_nmonth_picker"><img src="' + $m.config.basedir + 'images/icons/icon_arrow_right.png" alt=""></a></td></tr>';

		var mcal_date_val = new Date($m.t.magic_calendar.cur.year, $m.t.magic_calendar.cur.month, 1)
			,start_day = mcal_date_val.getDay();


		if((($m.t.magic_calendar.cur.year % 4 == 0) && ($m.t.magic_calendar.cur.year % 100 != 0)) || ($m.t.magic_calendar.cur.year % 400 == 0))
		{
			$m.dt.month_days[1] = 29; 
		}
		

		//// Build grid calendar

		mcal_html += '<tr class="mcal_subhead">';
		
		for(i=0; i < 7; i++)
		{
			mcal_html += '<td>' + $m.dt.weekdays[i] + '</td>';
		}
			
		mcal_html += '</tr><tr>';
		
		var column = 0
			,last_month = $m.t.magic_calendar.cur.month - 1
			,ti = 5;

		if(last_month == -1)
		{
			last_month = 11;
		}


		for(i=0; i < start_day; i++)
		{
			td_val = $m.dt.month_days[last_month] - start_day + i + 1;
			mcal_html += '<td class="mcal_other_month">' + td_val + '</td>';
			column++;
		}

		for(i=1; i <= $m.dt.month_days[$m.t.magic_calendar.cur.month]; i++)
		{
			ip0 = "0" + i;
			mp1 = parseInt($m.t.magic_calendar.cur.month) + 1;
			cur_css = '';
			a_id = '';
		
			if((ip0 == $m.dt.current_date) && (mp1 == $m.dt.current_month) && ($m.t.magic_calendar.cur.year == $m.dt.current_year))
			{
				cur_css += ' mcal_date_cur';
				a_id = 'id="mcal_date_current"'
			}

			if((i == $m.t.magic_calendar.ori.day) && ($m.t.magic_calendar.cur.month == $m.t.magic_calendar.ori.month) && ($m.t.magic_calendar.cur.year == $m.t.magic_calendar.ori.year))
			{
				cur_css += ' mcal_date_sel';
				a_id = 'id="mcal_date_picked"'
			}

			mcal_html += '<td class="mcal_date' + cur_css + '"><strong><a href="#" onclick="parent.$m.t.magic_calendar.update(\'day\', \'' + i + '\');return false;" tabIndex="' + ti + '" ' + a_id + '>' + i + '</a></strong></td>';

			column++;
			ti++;

			if(column == 7)
			{
				mcal_html += '</tr><tr>';
				column = 0;
			}
			
		}

		if(column > 0)
		{
			for(i=1; column < 7; i++)
			{
				mcal_html += '<td class="mcal_other_month">' + i + '</td>';
				column++;
			}
		}
		
		ti++;
		mcal_html += '</tr><tr><td class="mcal_subhead" colspan="7"><a href="#" onclick="parent.$m.t.magic_calendar.today(this);return false;" tabIndex="' + ti + '" title="Go to Today" id="mcal_today_picker"><img src="' + $m.config.basedir + 'images/icons/icon_calendar_today.png" alt=""></a> ';
		ti++;
		
		if($m.t.magic_calendar.uses_time === true)
		{
			var tmp_hour = ""
				,selected_hour = ""
				,selected_minute = ""
				,minute_display = ""
				,selected_second = ""
				,second_display = ""
				,selected_am = ""
				,selected_pm = "";

			mcal_html += '<select name="mcal_hour" class="mcal_select" onchange="parent.$m.t.magic_calendar.pick(\'hour\', this);" tabIndex="' + ti + '" id="mcal_hour_picker">';
			ti++;

			tmp_hour = ($m.t.magic_calendar.cur.hour > 12) ? $m.t.magic_calendar.cur.hour - 12 : $m.t.magic_calendar.cur.hour;

			for(i=1; i < 13; i++)
			{
				selected_hour = (i == tmp_hour) ? 'selected="selected"' : '';
				mcal_html += '<option value="' + i + '" ' + selected_hour + '>' + i + '</option>';
			}
			
			mcal_html += '</select> : <select name="mcal_minute" class="mcal_select" onchange="parent.$m.t.magic_calendar.pick(\'minute\', this);" tabIndex="' + ti + '" id="mcal_minute_picker">';
			ti++;
			
			for(i=0; i < 61; i++)
			{
				selected_minute = (i == $m.t.magic_calendar.cur.minute) ? 'selected="selected"' : '';
				minute_display = (i < 10) ? "0" + i : i;
				mcal_html += '<option value="' + i + '" ' + selected_minute + '>' + minute_display + '</option>';
			}

			mcal_html += '</select> ';
			
			if($m.t.magic_calendar.uses_time_seconds === true)
			{
				mcal_html += ' : <select name="mcal_second" class="mcal_select" onchange="parent.$m.t.magic_calendar.pick(\'second\', this);" tabIndex="' + ti + '" id="mcal_second_picker">';
				ti++;
				
				for(i=0; i < 61; i++)
				{
					selected_second = (i == $m.t.magic_calendar.cur.second) ? 'selected="selected"' : '';
					second_display = (i < 10) ? "0" + i : i;
					mcal_html += '<option value="' + i + '" ' + selected_second + '>' + second_display + '</option>';
				}
				
				mcal_html += '</select> ';
			}
			
			mcal_html += '<select name="mcal_ampm" class="mcal_select" onchange="parent.$m.t.magic_calendar.pick(\'ampm\', this);" tabIndex="' + ti + '" id="mcal_ampm_picker">';
			ti++;
			
			if($m.t.magic_calendar.cur.ampm == "am")
			{
				selected_am = 'selected="selected"';
			}
			
			if($m.t.magic_calendar.cur.ampm == "pm")
			{
				selected_pm = 'selected="selected"';
			}
			
			mcal_html += '<option value="am" ' + selected_am + '>am</option>';
			mcal_html += '<option value="pm" ' + selected_pm + '>pm</option>';

			mcal_html += '</select> ';
		}
		
		mcal_html += '<a href="#" onclick="parent.$m.t.magic_calendar.set();return false;" title="Update form field"><img src="' + $m.config.basedir + 'images/icons/icon_calendar_done.png" alt="" tabIndex="' + ti + '"></a></td></tr></table>';

		mcal_id.innerHTML = mcal_html.replace("<tr></tr>", "");		
	}

}
