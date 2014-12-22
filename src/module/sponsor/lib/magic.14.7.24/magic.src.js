/***************************************************************************
- File: magic.js - Let's have some magic
- Version: 14.7.24
- java -jar compiler2.jar --js magic.src.js --js_output_file magic.VERSION.js
***************************************************************************/

var $m =
{
	 timer : new Date().getTime()
	,timer_ajax : false
	,wand : {}
	,trick : {}
	,h : {}
	,t : {}
	,lang : {}
	,vd : {}
	,ready : false
	,ajax_init : false
	,data_att : "data-mjf"
	,document : document
	,head_tag : document.getElementsByTagName("head")[0]
	,body_id : "magic_body"
	,ga : false
	,debugger_css_version : "12.4.19"
	,xhttp : false
	,ajax_ids : {}
	,html_singletons : ["area","base","br","col","command","embed","hr","img","iframe","input","link","meta","param","source"]
	
	,app_cache : {
		available : !!window.applicationCache
	}

	,error_wrapper :
	{
		 open : "<span class=\"field_error_msg_on\">"
		,close : "</span>"
	}


	/**
	 * $m.ajax
	 *
	 */
	,ajax : function(in_id)
	{
		this.config = {
			 callback : "simple_content_update"
			,element_id : false
			,ga_track : true
			,method : "get"
			,password : ""
			,query : ""
			,timeout : $m.config.ajax.timeout
			,update_id : false
			,update_id_action : "overwrite"
			,update_id_scroll_top : false
			,update_id_scroll_to : false
			,url : false
			,username : ""
		};

		this.json_queue = [];

		this.request = {
			 response_text : false
			,update_id_action : false
			,errord : false

			,timeout : {
				 did : false
				,id : false
			}

			,rs_msg : [
				 "0. UNSENT - Open hasn't been called"
				,"1. OPENED - Send hasn't been called"
				,"2. HEADERS RECEIVED - Send has been called"
				,"3. LOADING - Server responded; Downloading response data"
				,"4. DONE - Operation complete"
			]
			
			,error_codes : {
				 "e0" : "Your request wasn't sent. Something on your computer is blocking it."
				,"e400" : "400 Bad Request"
				,"e401" : "401 Unauthorized"
				,"e403" : "403 Forbidden"
				,"e404" : "404 Not Found"
				,"e405" : "405 Method Not Allowed"
				,"e408" : "408 Request Timeout"
				,"e500" : "500 Internal Server Error"
				,"e501" : "501 Not Implemented"
				,"e502" : "502 Bad Gateway"
				,"e503" : "503 Service Unavailable"
				,"e504" : "504 Gateway Timeout"
				,"e505" : "505 HTTP Version Not Supported"
			}
		};		

		this.xhttp = $m.init_xml();
		
		if($m.is.alive(this.xhttp) === false)
		{
			$m.de.throw_browser_error("$m.ajax() unable to initialize AJAX");
		}


		// $m.ajax.init(IN_VAR)
		this.init = function(in_var)
		{
			if($m.is.alive(in_var) === false)
			{
				$m.de.throw_browser_error("Missing IN_VAR argument for $m.ajax.init()");
				return false;
			}

			if($m.is.string(in_var) === true)
			{
				var tmp_config = {};

				tmp_config.callback = $m.attr.get(in_var, "data-mjf_ajax_call_on_success");
				tmp_config.element_id = in_var;
				tmp_config.ga_track = $m.attr.get(in_var, "data-mjf_ga_track");
				tmp_config.method = $m.attr.get(in_var, "data-mjf_ajax_method");
				tmp_config.password = $m.attr.get(in_var, "data-mjf_ajax_password");
				tmp_config.query = $m.attr.get(in_var, "data-mjf_ajax_query");
				tmp_config.timeout = $m.attr.get(in_var, "data-mjf_ajax_timeout");
				tmp_config.update_id = $m.attr.get(in_var, "data-mjf_ajax_update_id");
				tmp_config.update_id_action = $m.attr.get(in_var, "data-mjf_ajax_update_id_action");
				tmp_config.update_id_scroll_top = $m.attr.get(in_var, "data-mjf_ajax_update_id_scroll_top") == "true"
				tmp_config.update_id_scroll_to = $m.attr.get(in_var, "data-mjf_ajax_update_id_scroll_to");
				tmp_config.url = $m.attr.get(in_var, "data-mjf_ajax_url");
				tmp_config.username = $m.attr.get(in_var, "data-mjf_ajax_username");
			}
			else
			{
				tmp_config = in_var;
			}

			if($m.tag.get_name(in_var) == "form")
			{
				tmp_config.query = $m.query_string.create(in_var);
			}
			else if(tmp_config.query === null)
			{
				tmp_config.query = "";
			}
			else
			{
				var tmp_query = $m.query_string.parse(tmp_config.query);
				tmp_config.query = $m.query_string.create(tmp_query);
			}

			for(var i in tmp_config)
			{
				if($m.is.alive(tmp_config[i]) === false || i == "interval")
				{
					continue;
				}

				//$m.de.add_item("tmp_config[" + i + "] = " + tmp_config[i]);
				this.config[i] = tmp_config[i];
			}

			if(this.config.callback === "magic_json")
			{
				this.config.callback = "parse_returned_json";
			}
			
			if(this.config.ga_track === "false")
			{
				this.config.ga_track = false;
			}

			this.config.timeout = parseInt(this.config.timeout);
			
			if(this.config.update_id_scroll_top === "true")
			{
				this.config.update_id_scroll_top = true;
			}
			
			if(this.config.update_id_scroll_to === "true")
			{
				this.config.update_id_scroll_to = true;
			}

			//$m.de.get_object("this.config", this.config);
		};


		// $m.ajax.just_html_update()
		this.just_html_update = function(in_this)
		{
			//$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Executing >>> $m.ajax.just_html_update()");
			
			if($m.is.alive(in_this) === false)
			{
				$m.de.throw_browser_error("$m.ajax.just_html_update() === in_this `' + in_this + '` does not exist.");
				return false;
			}
			
			var this_object = in_this
				,update_id = $m.is.good_id(this_object.config.update_id)
				,response_text = $m.ev.script(this_object.request.response_text);

			if(update_id === false)
			{
				$m.de.throw_browser_error("$m.ajax.just_html_update() === update_id `' + this_object.config.update_id + '` does not exist.");
				return false;
			}

			if($m.config.ajax.debug === true)
			{
				$m.de.add_item("$m.ajax.just_html_update() --- this_object.config.update_id = " + this_object.config.update_id + " \n this_object.request.response_text = " + this_object.request.response_text);
			}

			if(this_object.request.errord === false)
			{
				if(this_object.config.update_id_action === "append")
				{
					$m.tag.html(update_id, response_text, "append");
				}
				else if(this_object.config.update_id_action === "prepend")
				{
					$m.tag.html(update_id, response_text, "prepend");
				}
				else
				{
					$m.tag.html(update_id, response_text, "replace");
				}
			}
	
			if(this_object.config.update_id_scroll_top === true)
			{
				$m.smooth_scroll_overflow.construct(this_object.config.update_id, 'up');
			}
	
			if(this_object.config.update_id_scroll_to === true)
			{
				$m.smooth_scroll.construct(this_object.config.update_id);
			}
		};


		// $m.ajax.parse_returned_json()
		this.parse_returned_json = function(in_this)
		{
			if($m.is.alive(in_this) === false)
			{
				$m.de.throw_browser_error("$m.ajax.parse_returned_json() === in_this `' + in_this + '` does not exist.");
				return false;
			}
			
			var this_object = in_this
				,returned_content = $m.try_json_unpack(this_object.request.response_text)
				,current_json = ""
				,update_id = ""
				,updated_how = "";
			
			if($m.config.ajax.debug === true)
			{
				$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Executing >>> $m.ajax.parse_returned_json()");
				$m.de.add_item("this_object.request.response_text = " + this_object.request.response_text);
			}

			if($m.is.alive(returned_content) === true)
			{
				for(var x in returned_content)
				{
					current_json = returned_content[x];
					updated_how = "replace";

					if($m.config.ajax.debug === true)
					{
						var json_debug_string = "$m.ajax.parse_returned_json_update() --- current_json properties \n";
					
						if($m.is.alive(current_json.update_id) === true)
						{
							json_debug_string += ".update_id = " + current_json.update_id + "\n";
						}
						else
						{
							json_debug_string += ".update_id doesn't exist \n";
						}
		
						if($m.is.alive(current_json.update_html) === true)
						{
							json_debug_string += ".update_html = " + current_json.update_html + "\n";
						}
						else
						{
							json_debug_string += ".update_html doesn't exist \n";
						}
		
						if($m.is.alive(current_json.update_method) === true)
						{
							json_debug_string += ".update_method = " + current_json.update_method + "\n";
						}
						else
						{
							json_debug_string += ".update_method doesn't exist \n";
						}
		
						if($m.is.alive(current_json.update_callback) === true)
						{
							json_debug_string += ".update_callback = " + current_json.update_callback + "\n";
						}
						else
						{
							json_debug_string += ".update_callback doesn't exist \n";
						}
						
						$m.de.add_item("current_json = " + json_debug_string);
					}

					if($m.config.ajax.visual === true)
					{
						$m.css_class.add(current_json.update_id, "ajax_visual_content");
					}

					update_id = $m.is.good_id(current_json.update_id);
					
					if($m.is.alive(current_json.update_method) === true)
					{
						if(current_json.update_method == "append")
						{
							updated_how = "append";
						}
						else if(current_json.update_method == "prepend")
						{
							updated_how = "prepend";
						}
					}
					
					if(update_id !== false)
					{
						if($m.is.string(current_json.update_html) === true)
						{
							$m.tag.html(update_id, current_json.update_html, updated_how);
						}
					}

					if($m.config.ajax.visual === true)
					{
						setTimeout(function(in_update_id)
						{
							return function()
							{
								$m.css_class.remove(in_update_id, "ajax_visual_content");
							};
						
						} (current_json.update_id), 1500);
					}
					
					if($m.is.alive(current_json.update_callback) === true)
					{
						$m.ev.all(current_json.update_callback);
					}
				}
				
				$m.timer_ajax = new Date().getTime();

				setTimeout(function()
				{
					$m.init_children(true);

				}, 500);				
			}
			else
			{
				$m.de.throw_browser_error($m.lang.core.ajax.failed_msg);
			}
		}


		// $m.ajax.exec()
		this.exec = function()
		{
			var this_object = this;

			setTimeout(function()
			{
				this_object.send(this_object);

			}, 0);
		}


		// $m.ajax.send()
		this.send = function(in_this)
		{
			var this_object = in_this;
			
			if($m.config.ajax.debug === true)
			{
				$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Executing >>> $m.ajax.send()");
			}
			
			if($m.config.ajax.debug === true)
			{
				var config_debug = " Configuration:\n";
			
				for(var property in this_object.config)
				{
					config_debug += property + " = '" + this_object.config[property] + "' \n";
				}

				$m.de.add_item("$m.ajax.send() --- " + config_debug);
			}
			
			if($m.tag.get_name(this_object.config.element_id) == "a")
			{
				$m.id(this_object.config.element_id).blur();
			}
			
			if($m.tag.get_name(this_object.config.element_id) == "form")
			{
				var reset_form = $m.attr.get(this_object.config.element_id, "data-mjf_ajax_form_reset");

				if(reset_form !== null && reset_form == "true")
				{
					$m.id(this_object.config.element_id).reset();
				}
			}

			if($m.config.ajax.visual === true)
			{
				if($m.is.good_id(this_object.config.element_id))
				{
					if($m.tag.get_name(this_object.config.element_id) == "form")
					{
						$m.css_class.add(this_object.config.element_id, "ajax_visual_form");
					}
					else
					{
						$m.css_class.add(this_object.config.element_id, "ajax_visual");
					}
				}
				
				if($m.is.good_id(this_object.config.update_id))
				{
					$m.css_class.add(this_object.config.update_id, "mjf_atrans");
					$m.css_class.add(this_object.config.update_id, "ajax_visual_content");
				}
			}

			var query_string = ($m.is.alive(this_object.config.query) === true) ? this_object.config.query : ""
				,final_query_string = query_string + "&ajax_call=" + new Date().getTime();

			if(this_object.xhttp)
			{
				this_object.xhttp.onreadystatechange = function()
				{
					switch(this_object.xhttp.readyState)
					{
						case 0:
							if($m.config.ajax.debug === true)
							{
								$m.de.add_item("this_object.xhttp.onreadystatechange() --- xhttp.readyState = " + this_object.request.rs_msg[0] + " for '" + this_object.config.element_id + "'");
							}
		
							break;
		
						case 1:
							if($m.config.ajax.debug === true)
							{
								$m.de.add_item("this_object.xhttp.onreadystatechange() --- xhttp.readyState = " + this_object.request.rs_msg[1] + " for '" + this_object.config.element_id + "'");
							}
		
							break;
		
						case 2:
							if($m.config.ajax.debug === true)
							{
								$m.de.add_item("this_object.xhttp.onreadystatechange() --- xhttp.readyState = " + this_object.request.rs_msg[2] + " for '" + this_object.config.element_id + "'");
							}
		
							break;
		
						case 3:
							if($m.config.ajax.debug === true)
							{
								$m.de.add_item("this_object.xhttp.onreadystatechange() --- xhttp.readyState = " + this_object.request.rs_msg[3] + " for '" + this_object.config.element_id + "'");
							}
		
							break;
		
						case 4:
							if($m.config.ajax.debug === true)
							{
								$m.de.add_item("this_object.xhttp.onreadystatechange() --- xhttp.readyState = " + this_object.request.rs_msg[4] + " for '" + this_object.config.element_id + "'");
								$m.de.add_item("this_object.xhttp.onreadystatechange()--- this_object.xhttp.status = " + this_object.xhttp.status);
							}
	
							if(this_object.request.timeout.did === true)
							{
								this_object.request.response_text = $m.error_wrapper.open + $m.lang.core.ajax.timeout_msg + $m.error_wrapper.close;
								this_object.request.timeout.did = false;
								this_object.request.errord = true;
							}
							else
							{
								var check_status = "e" + this_object.xhttp.status;
								
								if($m.is.alive(this_object.request.error_codes[check_status]) === true)
								{
									this_object.request.response_text = "<span class=\"field_error_msg_on\">" + this_object.request.error_codes[check_status] + "</span>";
									this_object.request.errord = true;
								}
								else if(this_object.xhttp.status == 200)
								{
									this_object.request.response_text = (this_object.xhttp.responseText == 0) ? $m.error_wrapper.open + $m.lang.core.ajax.waiting_msg + $m.error_wrapper.close : this_object.xhttp.responseText;
								}
								else
								{
									this_object.request.errord = true;
								}
							}
							
							clearTimeout(this_object.request.timeout.id);
	
							if($m.is.alive(this_object[this_object.config.callback]) === true)
							{
								this_object[this_object.config.callback](this_object);
							}
							else if($m.is.alive(window[this_object.config.callback]) === true)
							{
								window[this_object.config.callback](this_object);
							}
							else
							{
								$m.de.throw_browser_error("this_object.xhttp.onreadystatechange() === this_object.config.callback `' + this_object.config.callback + '` does not exist.");
							}
							
							this_object.request.errord = false;
	
							if(this_object.config.ga_track === true)
							{
								$m.track.ga({
									 "category" : "MJF AJAX"
									,"action" : this_object.config.element_id + " " + $m.ut.uppercase_first(this_object.config.method)
									,"label" : this_object.config.url
								});
							}
		
							if($m.config.ajax.visual === true)
							{
								if($m.is.good_id(this_object.config.element_id))
								{
									if($m.tag.get_name(this_object.config.element_id) == "form")
									{
										$m.css_class.remove(this_object.config.element_id, "ajax_visual_form");
									}
									else
									{
										$m.css_class.remove(this_object.config.element_id, "ajax_visual");
									}
								}
								
								if($m.is.good_id(this_object.config.update_id))
								{
									setTimeout(function()
									{
										$m.css_class.remove(this_object.config.update_id, "ajax_visual_content");
									}, 1500);
								}
							}

							break;
					}
				}

				switch(this_object.config.method.toLowerCase())
				{
					//this_object.xhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				
					case "get":
						this_object.xhttp.open("GET", this_object.config.url + "?" + final_query_string, true, this_object.config.username, this_object.config.password);

						if($m.config.ajax.debug === true)
						{
							$m.de.add_item("$m.ajax.send() --- this_object.xhttp.open('GET', '" + this_object.config.url + "?" + final_query_string + "', true, " + this_object.config.username + ", " + this_object.config.password + ")");
						}

						this_object.xhttp.send(null);
						break;
	
					case "post":
						this_object.xhttp.open("POST", this_object.config.url, true, this_object.config.username, this_object.config.password);

						if($m.config.ajax.debug === true)
						{
							$m.de.add_item("$m.ajax.send() --- this_object.xhttp.open('POST', '" + this_object.config.url + "', true, " + this_object.config.username + ", " + this_object.config.password + ")");
						}
	
						this_object.xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						this_object.xhttp.send(final_query_string);
				}

				var this_object_again = this_object;
				
				this_object.request.timeout.id = setTimeout(function()
				{
					this_object_again.timed_out(this_object_again);

				}, this_object.config.timeout * 1000);

				return true;
			}
			else
			{
				this_object.request.response_text = $m.error_wrapper.open + $m.lang.core.ajax.failed_msg + $m.error_wrapper.close;
				this_object.config.update_id_action = "overwrite";
				this_object.request.errord = true;
				this_object.just_html_update();
			}
			
			return true;
		};


		// $m.ajax.simple_content_update()
		this.simple_content_update = function(in_this)
		{
			//$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Executing >>> $m.ajax.simple_content_update()");
			
			if($m.is.alive(in_this) === false)
			{
				$m.de.throw_browser_error("$m.ajax.simple_content_update() === in_this `' + in_this + '` does not exist.");
				return false;
			}
			
			var this_object = in_this
				,update_id = $m.is.good_id(this_object.config.update_id);
			
			
			//var response_text = "";
			var response_text = $m.ev.script(this_object.request.response_text);
			
			if(update_id === false)
			{
				$m.de.throw_browser_error("$m.ajax.simple_content_update() === update_id `' + this_object.config.update_id + '` does not exist.");
				return false;
			}
	
			if($m.config.ajax.debug === true)
			{
				$m.de.add_item("$m.ajax.simple_content_update() --- $m.ajax.config.update_id = " + this_object.config.update_id + " \n $m.ajax.request.response_text = " + this_object.request.response_text);
			}
			
			if(this_object.request.errord === true)
			{
				$m.tag.html(update_id, response_text, "prepend");
			}
			else
			{
				if(this_object.config.update_id_action === "append")
				{
					$m.tag.html(update_id, response_text, "append");
				}
				else if(this_object.config.update_id_action === "prepend")
				{
					$m.tag.html(update_id, response_text, "prepend");
				}
				else
				{
					$m.tag.html(update_id, response_text, "replace");
				}
			}
	
			if(this_object.config.update_id_scroll_top === true)
			{
				$m.smooth_scroll_overflow.construct(this_object.config.update_id, 'up');
			}
	
			if(this_object.config.update_id_scroll_to === true)
			{
				$m.smooth_scroll.construct(this_object.config.update_id);
			}
	
			$m.timer_ajax = new Date().getTime();
			
			setTimeout(function()
			{
				$m.init_children(true);

			}, 500);
	
			this_object.request.errord = false;
		}


		// $m.ajax.timed_out()
		this.timed_out = function(in_this)
		{
			var this_object = in_this;
		
			this_object.request.timeout.did = true;
			this_object.xhttp.abort();
		};
	}


	/**
	 * $m.animate // http://code.stephenmorley.org/javascript/smooth-movement/
	 *
	 */
	,animation : function(in_position, in_target)
	{
		this.position = in_position === undefined ? 0 : in_position;
		this.target = in_target === undefined ? 0 : in_target;
		
		this.velocity = 0;
		this.interval = null;

		this.exec = function(in_speed, in_update_listener, in_stop_listener)
		{
			// clear any current animation interval
			if(this.interval)
			{
				window.clearInterval(this.interval);
			}

			// create the new animation interval
			this.interval = window.setInterval(
				this.create_closure(in_update_listener, in_stop_listener)
			, in_speed);
		}

		this.create_closure = function(in_update_listener, in_stop_listener)
		{
			// store a reference to the 'this' object
			var this_object = this;
			
			// return the animation closure
			return function()
			{
				// update the movement
				this_object.update();
				
				// call the update listener
				in_update_listener(this_object.position, this_object);
				
				// check whether the movement has stopped
				if(this_object.has_stopped())
				{
					// clear the animation interval
					window.clearInterval(this_object.interval);

					this_object.interval = null;

					// call the stop listener if one was supplied
					if(in_stop_listener)
					{
						in_stop_listener(this_object);
					}
				}
			}
		}

		this.update = function()
		{
			// check whether the velocity is negative
			if(this.velocity < 0)
			{
				// check whether we must decelerate or can accelerate
				if(this.target > this.position - this.velocity * (this.velocity - 1) / 2)
				{
					// we must decelerate to avoid overshooting, so decrease the speed
					this.velocity ++;
				}
				else if(this.target <= this.position - (this.velocity - 1) * (this.velocity - 2) / 2)
				{
					// we can accelerate without overshooting, so increase the speed
					this.velocity --;
				}
			}
			else
			{
				// check whether we must decelerate or can accelerate
				if(this.target < this.position + this.velocity * (this.velocity + 1) / 2)
				{
					// we must decelerate to avoid overshooting, so decrease the speed
					this.velocity--;
				}
				else if(this.target >= this.position + (this.velocity + 1) * (this.velocity + 2) / 2)
				{
					// we can accelerate without overshooting, so increase the speed
					this.velocity++;
				}
			}
			
			// update the position
			this.position += this.velocity;
			
			// return the new position
			return this.position;
		}
		
		this.has_stopped = function()
		{
			// return whether we have stopped
			return (this.position == this.target && this.velocity == 0);
		}

		return this;
	}


	/**
	 * $m.animate
	 *
	 */
	,animate :
	{
		 // $m.animation.opacity(IN_ID, IN_DIRECTION, IN_SPEED, IN_CALLBACK)
		 opaque : function(in_id, in_direction, in_speed, in_callback)
		{
			if($m.config.animations.use === true)
			{
				var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id
					,direction = $m.is.alive(in_direction) ? in_direction : "up"
					,start_animation = 0
					,stop_animation = 0
					,animate_speed = $m.is.alive(in_speed) ? in_speed : 100
					,callback = $m.is.alive(in_callback) ? in_callback : function(){}
					,final_setting = 1;

				if(direction == "up")
				{
					start_animation = 0;
					stop_animation = 10;
					id.style.opacity = 0;
					final_setting = 1;
				}
				else
				{
					start_animation = 10;
					stop_animation = 0;
					id.style.opacity = 1;
					final_setting = 0;
				}
				
				var animate_opaque = new $m.animation(start_animation, stop_animation);
				animate_opaque.exec(
					 animate_speed
					,function(position)
					{
						position = position * .1;
						id.style.opacity = position;
					}
					,function()
					{
						id.style.opacity = final_setting;
						callback();
					}
				);
			}
			else
			{
				callback();
			}
		}
		
		,css :
		{
			// $m.animate.css.opacity(IN_ID)
			opacity : function(in_id)
			{
				if($m.config.animations.use === true)
				{
					$m.css_class.add(in_id, "mjf_otrans");
				}
			}
		}
	}


	/**
	 * $m.array
	 *
	 */
	,array :
	{
		// $m.array.remove_value(IN_ARRAY, IN_VALUE)
		remove_value : function(in_array, in_value)
		{
			var val_index = (Array.prototype.indexOf) ? in_array.indexOf(in_value) : $m.array.index_of(in_array, in_value);

			if(val_index != -1)
			{
				in_array.splice(val_index, 1);
			}
			else
			{
				$m.de.add_item("$m.array.remove_value() --- in_value (" + in_value + ") NOT FOUND!");
			}

			return in_array;
		}
		
		// $m.array.index_of(IN_ARRAY, IN_VALUE, IN_START)
		,index_of : function(in_array, in_value, in_start)
		{
			in_start = in_start || 0;

			var arr_len = in_array.length;
	
			while(in_start < arr_len)
			{
				if(in_array[in_start] === in_value)
				{
					return in_start;
				}
				
				++in_start;
			}
	
			return -1;
		}
	}


	/**
	 * $m.attr
	 *
	 */
	,attr :
	{
		// $m.attr.set(IN_ID, { "data-awesome" : "true" });
		set : function(in_id, in_atts)
		{
			if($m.is.alive(in_id) === false)
			{
				return false;
			}
			
			//$m.de.get_type("in_id", in_id);
			
			var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id;
			
			for(var a in in_atts)
			{
				if(a == "class" && $m.vd.is_msie7_or_lower)
				{
					tmp_val = in_atts[a];
					a = "className";
					in_atts[a] = tmp_val;
				}
				
				try
				{
					id.setAttribute(a, in_atts[a]);
				}
				catch(e)
				{
					$m.de.throw_fatal("$m.attr.set(`" + in_id + "`, `" + a + "=" + in_atts[a] + "`) --- failed because " + e);
				}
			}
			
			return true;
		}


		// $m.attr.get(IN_ID, IN_ATT);
		,get : function(in_id, in_att)
		{
			if($m.is.alive(in_id) === false)
			{
				return false;
			}

			var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id;

			if($m.vd.is_msie7_or_lower === true)
			{
				if($m.is.alive(id.attributes) === true && $m.is.object(id.attributes[in_att]) === true && $m.is.alive(id.attributes[in_att].nodeValue) === true)
				{
					return id.attributes[in_att].nodeValue;
				}
				else
				{
					return null;
				}
			}
			else
			{
				if(id.getAttribute)
				{
					var attr = id.getAttribute(in_att);
	
					if(attr === null)
					{
						return null;
					}
					else
					{
						return attr;
					}
				}
				else
				{
					return false;
				}
			}
		}
			// $m.attr.get_tags_with(IN_TAGS, IN_ATT, IN_VAL);
			,get_tags_with : function(in_tags, in_att, in_val)
			{
				var good_tags = [];
				
				for(var i=0, it_len=in_tags.length; i < it_len; i++)
				{
					if($m.attr.get(in_tags[i], "id") !== null && $m.attr.get(in_tags[i], in_att) !== null)
					{
						if($m.attr.has_value(in_tags[i], in_att, in_val) === true)
						{
							good_tags.push(in_tags[i]);
						}
					}
				}

				return good_tags;
			}

			// $m.attr.get_fields_with(IN_PARENT, IN_FIELD_TYPES, IN_ATT, IN_VAL);
			,get_fields_with : function(in_parent, in_field_types, in_att, in_val)
			{
				in_att = in_att || false;
				in_val = in_val || false;
			
				var parent_id = (in_parent == "document") ? $m.id($m.body_id) : $m.id(in_parent)
					,check_fields = []
					,good_fields = []
					,textarea_tag = 'textarea'
					,select_tag = 'select'
					,input_tag = ['button','checkbox','file','password','radio','submit','text'];
					
				if($m.is.in_array(in_field_types, "text") !== false)
				{
					in_field_types = in_field_types.concat(['color','date','datetime','datetime-local','email','month','number','search','tel','time','url','week']);
				}

				if($m.is.in_array(in_field_types, input_tag) !== false)
				{
					var input_fields = $m.tags.get(parent_id, "input");

					for(var j=0, if_len=input_fields.length; j < if_len; j++)
					{
						for(var field_type in in_field_types)
						{
							if(in_att === false && in_val === false)
							{
								good_fields.push(input_fields[j]);
							}
							else
							{
								if(input_fields[j].type == in_field_types[field_type] && $m.attr.has_value(input_fields[j], in_att, in_val) === true)
								{
									good_fields.push(input_fields[j]);
								}
							}
						}
					}
				}
				
				if($m.is.in_array(in_field_types, textarea_tag) !== false)
				{
					var textarea_fields = $m.tags.get(parent_id, "textarea");

					for(var j=0, tf_len=textarea_fields.length; j < tf_len; j++)
					{
						if(in_att === false && in_val === false)
						{
							good_fields.push(textarea_fields[j]);
						}
						else
						{
							if($m.attr.has_value(textarea_fields[j], in_att, in_val) === true)
							{
								good_fields.push(textarea_fields[j]);
							}
						}
					}
				}
			
				if($m.is.in_array(in_field_types, select_tag) !== false)
				{
					var select_fields = $m.tags.get(parent_id, "select");

					for(var j=0, sf_len=select_fields.length; j < sf_len; j++)
					{
						if(in_att === false && in_val === false)
						{
							good_fields.push(select_fields[j]);
						}
						else
						{
							if($m.attr.has_value(select_fields[j], in_att, in_val) === true)
							{
								good_fields.push(select_fields[j]);
							}
						}
					}
				}
			
				return good_fields;
			}

			// $m.attr.get_all(IN_ID);
			,get_all : function(in_id)
			{
				var id = $m.id(in_id)
					,returned_atts = {}
					,len = id.attributes.length;
		
				for(var i=0; i < len; i++)
				{
					if($m.vd.is_msie7_or_lower)
					{
						if(id.attributes[i].specified && id.attributes[i].name)
						{
							returned_atts[id.attributes[i].name] = id.attributes[i].value;
						}
					}
					else
					{
						if(id.attributes[i].name)
						{
							returned_atts[id.attributes[i].name] = id.attributes[i].value;
						}
					}
				}
		
				return returned_atts;
			}

		// $m.attr.has_value(IN_ELEMENT, IN_ATT, IN_VAL);
		,has_value : function(in_element, in_att, in_val)
		{
			if($m.is.alive(in_element) === false)
			{
				return false;
			}

			if($m.is.string(in_element) === true)
			{
				in_element = $m.id(in_element);
			}

			if(in_element.getAttribute)
			{
				var att_val = $m.attr.get(in_element, in_att);

				if($m.is.alive(att_val) === false)
				{
					return false;
				}
				else
				{
					if(att_val.indexOf("|") != -1)
					{
						var all_att_vals = att_val.split("|");
					}
					else if(att_val.indexOf(" ") != -1)
					{
						var all_att_vals = att_val.split(" ");
					}
					else if($m.is.string(att_val) === true)
					{
						if(att_val == in_val)
						{
							return true;
						}
						else
						{
							return false;
						}
					}
	
					if($m.is.in_array(all_att_vals, in_val) === false)
					{
						return false;
					}
					else
					{
						return true;
					}
				}
			}
			else
			{
				return false;
			}
		}

		// $m.attr.remove(IN_ID, IN_ATT);
		,remove : function(in_id, in_att)
		{
			$m.id(in_id).removeAttribute(in_att);
		}
	}


	/**
	 * Sets the config options, JSON if needed, browser details, timezone and if HTML5 should be created - $m.construct()
	 *
	 * @param {object} in_config Various Magic configuration options
	 */
	,construct : function(in_config)
	{
		$m.config = "";
		$m.config.basedir = "";
		$m.config = in_config;
		
		if($m.is.alive($m.config.basedir) === false)
		{
			this.find_baseurl();
		}

		if($m.is.alive($m.config.lang) === false)
		{
			$m.config.lang = "en_us";
		}

		$m.insert_link.script($m.config.basedir + "lang/" + $m.config.lang + ".js", function()
		{
			$m.dt.localize();
		});
		
		if(typeof JSON != "object")
		{
			$m.insert_link.script($m.config.basedir + "assist/json2.js");
		}

		this.vd.construct();
		this.dt.calc_timezone();

		if($m.config.create_html5 === true && $m.vd.is_msie9_or_lower)
		{
			$m.create_html5();
		}
	}


	/**
	 * Creates HTML5 elements for MSIE browsers so they can be styled - $m.create_html5()
	 *
	 */
	,create_html5 : function()
	{
		var html5_tags = ["abbr","article","aside","audio","bb","canvas","datagrid","datalist","details","dialog","eventsource","figure","footer","header","hgroup","mark","menu","meter","nav","output","progress","section","time","video"];

		for(var i=0, len=html5_tags.length; i < len; i++)
		{
			document.createElement(html5_tags[i]);
		}
	}


	/**
	 * $m.css_class
	 *
	 */
	,css_class :
	{
		// $m.css_class.add(IN_ID, IN_CLASS)
		add : function(in_id, in_class)
		{
			var css_class = $m.attr.get(in_id, "class");

			if($m.is.alive(css_class) === false)
			{
				$m.attr.set(in_id, { "class" : in_class });
			}
			else
			{
				var all_classes = css_class.split(" ");

				if($m.is.in_array(all_classes, in_class) === false)
				{
					all_classes.push(in_class);
					$m.attr.set(in_id, { "class" : all_classes.join(" ") });
				}
			}
		}

		// $m.css_class.remove(IN_ID, IN_CLASS)
		,remove : function(in_id, in_class)
		{
			var id_class = $m.attr.get(in_id, "class");

			if($m.is.alive(id_class) === false)
			{
				return false;
			}
			else
			{
				var all_classes = id_class.split(" ")
					,array_index = $m.is.in_array(all_classes, in_class);
		
				if(array_index !== false)
				{
					all_classes.splice(array_index, 1);
					$m.attr.set(in_id, { "class" : all_classes.join(" ") });
				}
				else
				{
					return false;
				}
			}
		}

		// $m.css_class.replace(IN_ID, IN_MATCH_CLASS, IN_REPLACE_CLASS)
		,replace : function(in_id, in_match_class, in_replace_class)
		{
			$m.css_class.remove(in_id, in_match_class);
			$m.css_class.add(in_id, in_replace_class);
		}

		// $m.css_class.has(IN_ID, IN_CLASS)
		,has : function(in_id, in_class)
		{
			return $m.attr.has_value(in_id, "class", in_class);
		}
	}


	/**
	 * $m.cursor
	 *
	 */
	,cursor :
	{
		// $m.cursor.set(IN_ID, IN_POS)
		set : function(in_id, in_pos)
		{
			var id = $m.id(in_id);

			if($m.is.alive(id) === false)
			{
				return false;
			}
	
			if(id.value.length == 0)
			{
				try
				{
					id.focus();
				}
				catch(e)
				{
					$m.de.add_item("$m.cursor.get(" + in_id + ", " + in_pos + ") --- failed because " + e);
				}
			}
			else
			{
				var cursor_pos = 0;
				cursor_pos = (in_pos == "end") ? id.value.length : in_pos;
			
				if(id.setSelectionRange) // Mozilla, WebKit
				{
					try
					{
						id.focus();
						id.setSelectionRange(id.value.length, cursor_pos);
					}
					catch(e)
					{
						$m.de.add_item("$m.cursor.get(" + in_id + ", " + in_pos + ") --- failed during id.setSelectionRange");
					}
				}
				else
				{
					if(id.createTextRange) // MSIE
					{
						try
						{
							range = id.createTextRange();
							range.collapse(true);
							range.moveEnd('character', cursor_pos);
							range.moveStart('character', id.value.length);
							range.select();
						}
						catch(e)
						{
							$m.de.add_item("$m.cursor.get(" + in_id + ", " + in_pos + ") --- failed during id.createTextRange");
						}
					}
				}
			}
		}
	
		// $m.cursor.get(IN_ID)
		,get : function(in_id)
		{
			var id = $m.id(in_id);

			if($m.is.alive(id) === false)
			{
				return false;
			}
	
			if(id.selectionStart)
			{
				return id.selectionStart;
			}
			else if(document.selection)
			{
				id.focus();
				
				var r = document.selection.createRange();
		
				if(r == null)
				{
					return 0;
				}
				
				var re = id.createTextRange()
					,rc = re.duplicate();

				re.moveToBookmark(r.getBookmark());
				rc.setEndPoint('EndToStart', re);
				
				return rc.text.length;
			}
	
			return 0;
		}
	}


	/**
	 * $m.de
	 *
	 */
	,de :
	{
		 name : "magic_debugger"
	
		 // $m.de.construct()
		,construct : function()
		{
			if($m.vd.is_mobile_touch === true)
			{
				return;
			}

			if(this.new_document === undefined)
			{
				var window_options = "toolbar=no,location=no,resizable=yes,scrollbars=yes,menubar=no,width=600,height=700"
					,new_debug_window = window.open("", "debug_win", window_options);
	
				if(new_debug_window === undefined || new_debug_window === null)
				{
					setTimeout(function()
					{
						alert("Please allow pop-up windows if you'd like to use the Magic Debugger.");
					}, 10);
	
					$m.config.global_debug = false;
					return false;	
				}
	
				this.new_document = new_debug_window.document;
				this.new_document.write('<!DOCTYPE html><html><head><title>Magic Debugger</title><link href="' + $m.config.basedir + 'stylesheets/magic_debugger.' + $m.debugger_css_version + '.css" rel="stylesheet"></head><body><h1>Magic Debugger &raquo; ' + $m.dt.get_date_now() + ' ' + $m.dt.get_time_now() + '</h1><p id="clear_debugger"><input type="button" value="clear" onclick="window.opener.$m.de.clear_debugger();"></p><div id="debug_box"></div></body></html>');
				this.new_document.close();
			}
	
			if($m.vd.is_safari === true)
			{
				new_debug_window.blur();
			}
	
			this.debug_box_id = this.new_document.getElementById("debug_box");
		}
	
		,add_item : function(in_line)
		{
			if($m.config.global_debug === false)
			{
				return false;
			}
		
			in_line = in_line.replace(new RegExp('<', 'gi'), '&lt;');
			in_line = in_line.replace(new RegExp('>', 'gi'), '&gt;');
			in_line = in_line.replace(new RegExp('\n', 'gi'), '<br>');
			
			var debug_time = ((new Date().getTime() - $m.timer) / 1000) + "";
		
			if(debug_time.length == 3)
			{
				debug_time += '00';
			}
			else if(debug_time.length == 4)
			{
				debug_time += '0';
			}

			if($m.vd.is_mobile_touch === true)
			{
				console.log(debug_time + " | " + in_line);
			}
			else
			{
				if($m.is.alive(this.debug_box_id) === true)
				{
					this.debug_box_id.innerHTML = "<p>" + debug_time + " | " + in_line + "</p>" + arguments.callee.trace() + this.debug_box_id.innerHTML;
				}
				else
				{
					$m.de.throw_browser_error("Magic Debugger not available. " + debug_time + " | " + in_line);
				}
			}
			
			
		}

		,clear_debugger : function()
		{
			this.debug_box_id.innerHTML = " ";
			return false;
		}
		
		// $m.de.throw_browser_error(IN_ERROR)
		,throw_browser_error : function(in_error)
		{
			//var final_msg = 'MJS: ' + in_error;
			//setTimeout("throw new Error(" + final_msg + ")", 0);
			//setTimeout("throw new Error(" + final_msg + ")", 0);
			
			setTimeout("throw new Error('MJS: " + in_error + "')", 0);
		}
	
		,get_wand : function()
		{
			var good_wand = "Debugging 'wand' ~~";

			for(var i in $m.wand)
			{
				if($m.h[i] !== undefined)
				{
					good_wand += "$m.wand." + i + "=" + $m.wand[i] + "; ";
				}
			}
		
			this.add_item(good_wand);
		}
		
		,get_tricks : function()
		{
			var good_trick = "Debugging 'tricks' ~~";

			for(var i in $m.trick)
			{
				if($m.h[i] !== undefined)
				{
					good_trick += "$m.trick." + i + "=" + $m.trick[i] + "; ";
				}
			}
		
			this.add_item(good_trick);
		}

		,get_this : function(in_this_name, in_this)
		{
			this.add_item("Debugging This '" + in_this_name + "' ~~");
		
			for(var k in in_this)
			{
				this.add_item("k = " + k + " ~~> " + in_this[k]);
			}
		}
	
		,get_array : function(in_array_name, in_array)
		{
			this.add_item("Debugging Array '" + in_array_name + "' ~~");
			
			if($m.is.array((in_array)))
			{
				if(in_array.length == 0)
				{
					this.add_item(in_array_name + " is empty");
					return;
				}
	
				for(var i=0, ia_len=in_array.length; i < ia_len; i++)
				{
					this.add_item(in_array_name + "[" + i + "] = " + in_array[i]);
				}
			}
			else
			{
				this.add_item("Oops! '" + in_array_name + "' isn't an array!");
			}
		}
		
		// $m.de.get_object("IN_OBJECT_NAME", IN_OBJECT)
		,get_object : function(in_object_name, in_object)
		{
			this.add_item("Debugging Object '" + in_object_name + "' ~~");
			
			for(var property in in_object)
			{
				this.add_item("Property='" + property + "'; Type='" + typeof(in_object[property]) + "'; Value='" + in_object[property] + "' ~~~~~ ");
			}
		}
		
		// $m.de.get_type("IN_ITEM_NAME", IN_ITEM)
		,get_type : function(in_item_name, in_item)
		{
			this.add_item("typeof (" + in_item_name + ") == " + typeof in_item);
		}
	
		// $m.de.throw_error(IN_MSG, IN_URL, IN_LINE)
		,throw_error : function(in_msg, in_url, in_line)
		{
			$m.de.add_item("~~ JavaScript Error: " + in_msg + " ~~ Line: " + in_line + " ~~ URL: " + in_url);
			return true;
		}
		
		// $m.de.throw_fatal(IN_MSG)
		,throw_fatal : function(in_msg)
		{
			$m.de.add_item(in_msg);
			$m.de.throw_browser_error(in_msg);
		}
	}
	
	
	/**
	 * $m.style
	 *
	 */
	,style :
	{
		// $m.style.get(IN_ID, IN_STYLE);
		get : function(in_id, in_style) // Adapted from: http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element/
		{
			if($m.is.alive(in_id) === false)
			{
				return false;
			}
			
			var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id
				,style_value = "";

			if(document.defaultView && document.defaultView.getComputedStyle)
			{
				try
				{
					style_value = document.defaultView.getComputedStyle(id, null).getPropertyValue(in_style);
				}
				catch(e)
				{
					$m.de.throw_fatal("$m.style.get(`" + in_id + "`, `" + in_style + "`) --- failed because " + e);
					return false;
				}
				
			}
			else if(id.currentStyle)
			{
				in_style = in_style.replace(/\-(\w)/g, function(str_match, p1)
				{
					return p1.toUpperCase();
				});

				style_value = id.currentStyle[in_style];
			}

			return style_value;
		}


		// $m.style.set(IN_ID, { "backgroundColor" : "red" });
		,set : function(in_id, in_styles)
		{
			// TOOD: if style is empty, then remove it
		
			if($m.is.alive(in_id) === false)
			{
				return false;
			}
			
			var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id
				,final_style = "";
			
			for(var i in in_styles)
			{
				if($m.is.alive(id.style) === false)
				{
					id.style = {};
				}

				try
				{
					final_style = ($m.vd.is_firefox === true && i == "float") ? "cssFloat" : i;
					
					//$m.de.add_item("......... final_style = " + final_style);

					id.style[final_style] = in_styles[i];
					
					//$m.de.add_item("id.style[" + final_style + "] = " + id.style[i]);
					//$m.de.add_item("in_styles[" + i + "] = " + in_styles[i]);
				}
				catch(e)
				{
					$m.de.throw_fatal("$m.style.set(`" + in_id + "`, `" + i + "=" + in_styles[i] + "`) --- failed because " + e);
				}
			}
		}
	}


	/**
	 * $m.dt
	 *
	 */
	,dt :
	{
		 current_year : false
		,current_month : false
		,current_date : false

		,current_hour : false
		,current_minute : false
		,current_second : false
		,current_milliseconds : false

		,am_pm : false
		,timezone : false
		,timezone_dst : false

		// $m.dt.localize()
		,localize : function()
		{
			$m.dt.month_names = [$m.lang.core.months.long_name.jan, $m.lang.core.months.long_name.feb, $m.lang.core.months.long_name.mar, $m.lang.core.months.long_name.apr, $m.lang.core.months.long_name.may, $m.lang.core.months.long_name.jun, $m.lang.core.months.long_name.jul, $m.lang.core.months.long_name.aug, $m.lang.core.months.long_name.sep, $m.lang.core.months.long_name.oct, $m.lang.core.months.long_name.nov, $m.lang.core.months.long_name.dec];
			$m.dt.month_names_short = [$m.lang.core.months.short_name.jan, $m.lang.core.months.short_name.feb, $m.lang.core.months.short_name.mar, $m.lang.core.months.short_name.apr, $m.lang.core.months.short_name.may, $m.lang.core.months.short_name.jun, $m.lang.core.months.short_name.jul, $m.lang.core.months.short_name.aug, $m.lang.core.months.short_name.sep, $m.lang.core.months.short_name.oct, $m.lang.core.months.short_name.nov, $m.lang.core.months.short_name.dec];
			$m.dt.month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			$m.dt.weekdays = [$m.lang.core.weekdays.short_name.sun, $m.lang.core.weekdays.short_name.mon, $m.lang.core.weekdays.short_name.tue, $m.lang.core.weekdays.short_name.wed, $m.lang.core.weekdays.short_name.thu, $m.lang.core.weekdays.short_name.fri, $m.lang.core.weekdays.short_name.sat, "","","","",""];
		}

		// $m.dt.get_date_now()
		,get_date_now : function()
		{
			this.obj_date = new Date();
			this.current_year = this.obj_date.getFullYear();
			this.current_month = this.obj_date.getMonth();
			this.current_month++;
	
			if(this.current_month < 10)
			{
				this.current_month = "0" + this.current_month;
			}
		
			this.current_date = this.obj_date.getDate();
			if(this.current_date < 10)
			{
				this.current_date = "0" + this.current_date;
			}
			
			return this.current_year + "-" + this.current_month + "-" + this.current_date;
		}
	
		// $m.dt.get_time_now()
		,get_time_now : function()
		{
			this.obj_date = new Date();
			this.current_hour = this.obj_date.getHours();
			this.am_pm = (this.current_hour < 12) ? "am" : "pm";
			
			if(this.current_hour == 0)
			{
				this.current_hour = 12;
			}
	
			if(this.current_hour > 12)
			{
				this.current_hour = this.current_hour - 12;
			}
			
			this.current_minute = this.obj_date.getMinutes();
			this.current_minute = this.current_minute + '';
	
			if(this.current_minute.length == 1)
			{
				this.current_minute = "0" + this.current_minute;
			}
			
			this.current_second = this.obj_date.getSeconds();
			this.current_second = this.current_second + '';
	
			if(this.current_second.length == 1)
			{
				this.current_second = "0" + this.current_second;
			}
			
			this.current_milliseconds = this.obj_date.getMilliseconds();
			this.current_milliseconds = this.current_second + '';
	
			if(this.current_milliseconds.length == 1)
			{
				this.current_milliseconds = "0" + this.current_milliseconds;
			}
			
			return this.current_hour + ':' + this.current_minute + ':' + this.current_second + this.am_pm;
		}
		
		// $m.dt.calc_timezone()
		,calc_timezone : function() // Adapted from: http://www.onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/
		{
			var right_now = new Date()
				,jan1 = new Date(right_now.getFullYear(), 0, 1, 0, 0, 0, 0)  // jan 1st
				,june1 = new Date(right_now.getFullYear(), 6, 1, 0, 0, 0, 0) // june 1st
				,temp = jan1.toGMTString()
				,jan2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1));
			
			temp = june1.toGMTString();
			
			var june2 = new Date(temp.substring(0, temp.lastIndexOf(" ") - 1))
				,std_time_offset = (jan1 - jan2) / (1000 * 60 * 60)
				,daylight_time_offset = (june1 - june2) / (1000 * 60 * 60);
	
			if(std_time_offset == daylight_time_offset)
			{
				this.timezone_dst = "0"; // daylight savings time is NOT observed
			}
			else
			{
				if((std_time_offset - daylight_time_offset) >= 0) // positive is southern, negative is northern hemisphere
				{
					std_time_offset = daylight_time_offset;
				}
		
				this.timezone_dst = "1"; // daylight savings time is observed
			}
	
			this.timezone = std_time_offset;
			
			if($m.config.send_timezone_to !== false)
			{
				$m.insert_link.script($m.config.send_timezone_to + "?tz=" + this.timezone);
			}
		}
		
		// $m.dt.convert(IN_VAL)
		,convert : function(in_val) // Adapted from: http://www.onlineaspect.com/2007/06/08/auto-detect-a-time-zone-with-javascript/
		{
			var hours = parseInt(in_val);
			in_val -= parseInt(in_val);
			in_val *= 60;
			
			var mins = parseInt(in_val);
			in_val -= parseInt(in_val);
			in_val *= 60;
			
			var secs = parseInt(in_val)
				,display_hours = hours;
			
			if(hours == 0) // handle GMT case (00:00)
			{
				display_hours = "00";
			}
			else if(hours > 0) // add a plus sign and perhaps an extra 0
			{
				display_hours = (hours < 10) ? "+0"+hours : "+"+hours;
			}
			else // add an extra 0 if needed
			{
				display_hours = (hours > -10) ? "-0" + Math.abs(hours) : hours;
			}
			
			mins = (mins < 10) ? "0" + mins : mins;
			return display_hours + ":" + mins;
		}
		
	}


	/**
	 * $m.element
	 *
	 */
	,element :
	{
		//$m.element.bind(id, "click", this.exec);
		bind : function(in_id, in_handler, in_callback)
		{
			var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id
				,handler = "on" + in_handler
				,old_function = id[handler];
			
			if(typeof id[handler] == "function")
			{
				id[handler] = function(e)
				{
					old_function(e);
					in_callback(e);
				}
			}
			else
			{
				id[handler] = in_callback;
			}
		}

		//$m.element.attach(id, "click", this.exec);
		,attach : function(in_id, in_handler, in_callback)
		{
			var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id;

			if(document.addEventListener)
			{
				id.addEventListener(in_handler, in_callback, true);
			}
			else if(document.attachEvent)
			{
				id.attachEvent("on" + in_handler, in_callback);
			}
			else
			{
				return false;
			}
		}

		//$m.element.detach(id, "click", this.exec);
		,detach : function(in_id, in_handler, in_callback)
		{
			var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id;

			if(document.removeEventListener)
			{
				id.removeEventListener(in_handler, in_callback, true);
			}
			else if(document.detachEvent)
			{
				id.detachEvent("on" + in_handler, in_callback);
			}
			else
			{
				return false;
			}
		}
	}


	/**
	 * $m.elements
	 *
	 */
	,elements :
	{
		 listeners : []

		,bind : function(in_tags, in_data_att, in_handler, in_callback)
		{
			var handler = "on" + in_handler
				,tag_id = ""
				,tmp_id = ""
				,tmp_att = ""
				,split_atts = "";

			if(in_tags.length === undefined)
			{
				var do_tags = [];
				do_tags[0] = in_tags;
			}
			else
			{
				if($m.is.alive(in_tags.tagName) === true && in_tags.tagName.toLowerCase() == "select")
				{
					var do_tags = [];
					do_tags[0] = in_tags;
				}
				else
				{
					var do_tags = in_tags;
				}
			}
			
			for(var i=0, t_len=do_tags.length; i < t_len; i++)
			{
				if($m.attr.has_value(do_tags[i], $m.data_att, in_data_att) === true)
				{
					tag_id = $m.attr.get(do_tags[i], "id");
					tmp_att = $m.attr.get(do_tags[i], $m.data_att);
					split_atts = tmp_att.split("|");

					for(var j=0, sa_len=split_atts.length; j < sa_len; j++)
					{
						if(split_atts[j] == in_data_att)
						{
							break;
						}
					}

					if($m.is.array(this.listeners[tag_id]) !== true)
					{
						this.listeners[tag_id] = [];
					}

					if($m.is.array(this.listeners[tag_id][handler]) !== true)
					{
						this.listeners[tag_id][handler] = [];
					}

					do_tags[i][handler] = $m.exec[handler];
					this.listeners[tag_id][handler][j] = in_callback;

					if($m.attr.has_value(do_tags[i], $m.data_att, "return_false") === true)
					{
						$m.attr.set(tag_id, { "data-mjf_return_value" : "false" });
					}
				}
			}
		}
	}


	/**
	 * $m.ev
	 *
	 */
	,ev :
	{
		// $m.ev.all(IN_STRING)
		all : function(in_string)
		{
			//$m.de.add_item("$m.ev.all() in_string = " + in_string);
		
			return eval(in_string);
		}


		// $m.ev.script(IN_STRING)
		,script : function(in_string)
		{
			var script_only = ""
				,script_tag = /<script\s?(.|\n)*?>(.|\n)*?<\/script>/gi
				,found_script = in_string.match(script_tag);
			
			if(found_script)
			{
				in_string = in_string.replace(script_tag, "");
	
				for(var i=0, len=found_script.length; i < len; i++)
				{
					script_only += $m.tags.strip.from_cont(found_script[i]);
				}
				
				$m.ev.all(script_only);
			}
			
			return in_string;
		}
	}


	/**
	 * $m.event
	 *
	 */
	,event :
	{
		// $m.event.get(IN_EVENT)
		get : function(in_event)
		{
			if($m.is.alive(in_event) === false)
			{
				var in_event = window.event;
			}
			
			var return_event = ($m.is.alive(in_event.originalEvent) === true) ? in_event.originalEvent : in_event;
			
			return in_event;
		}

		// $m.event.get_target(IN_EVENT)
		,get_target : function(in_event)
		{
			if($m.is.alive(in_event) === false)
			{
				return false;
			}
			
			return in_event.target || in_event.srcElement;
		}
	}



	/**
	 * $m.exec
	 *
	 */
	,exec :
	{
		// $m.exec.go()
		go : function(in_id, in_handler, in_event)
		{
			for(var k in $m.elements.listeners[in_id][in_handler])
			{
				/*
				if($m.config.global_debug !== false)
				{
					$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Executing >>> $m.exec.go(" + in_id + ", " + in_handler + ")");
					$m.de.add_item("$m.elements.listeners[in_id][in_handler].length = " + $m.elements.listeners[in_id][in_handler].length);
					$m.de.add_item(k + ":\n" + $m.elements.listeners[in_id][in_handler][k]);
				}
				*/
			
				if($m.elements.listeners[in_id][in_handler][k](in_id, in_event) === false)
				{
					return false;
				}
			}

			return $m.returnd.get(in_id) === false ? false : true;
		}

		,onabort : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onabort", e);
		}

		,onblur : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onblur", e);
		}

		,onclick : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onclick", e);
		}

		,onchange : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onchange", e);
		}
		
		,ondblclick : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "ondblclick", e);
		}
		
		,onfocus : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onfocus", e);
		}
		
		,onkeydown : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onkeydown", e);
		}
		
		,onkeypress : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onkeypress", e);
		}
		
		,onkeyup : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onkeyup", e);
		}
		
		,onload : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onload", e);
		}
		
		,onmousemove : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onmousemove", e);
		}
		
		,onmousedown : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onmousedown", e);
		}
		
		,onmouseup : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onmouseup", e);
		}
		
		,onmouseover : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onmouseover", e);
		}
		
		,onmouseout : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onmouseout", e);
		}
		
		,onreset : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onreset", e);
		}
		
		,onresize : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onresize", e);
		}
		
		,onselect : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onselect", e);
		}
		
		,onsubmit : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onsubmit", e);
		}
		
		,onunload : function(e)
		{
			e = e || window.event;
			return $m.exec.go($m.attr.get(this, "id"), "onunload", e);
		}
	}

	/**
	 * Checks if the Magic is ready for the DOM, sets up the Magic Debugger if needed, sets a <body> ID, and inits the DOM children - $m.execute()
	 *
	 */
	,execute : function()
	{
		if($m.ready === true)
		{
			return;
		}

		$m.ready = true;
		
		if($m.config.global_debug !== false)
		{
			$m.de.construct();
		}
		
		if($m.is.alive($m.config.geo) === true && $m.config.geo.use !== false)
		{
			$m.geo.construct();
		}

		$m.set_body_id();
		$m.storage.construct();
		$m.init_children(false);

		if($m.config.global_debug === "high")
		{
			$m.de.add_item("$m.vd.ua = " + $m.vd.ua);
		}

		$m.de.add_item("~ MJS initialized in " + (new Date().getTime() - $m.timer) / 1000 + " seconds");
	}


	/**
	 * Find base url for Magic JS
	 *
	 */
	,find_baseurl : function()
	{
		var script_tags = $m.tags.get("document", "script")
			,script_src = ""
			,pattern = /magic.(\d{1,2}\.\d{1,2}\.\d{1,2}|src).js$/;

		for(var i=0, len=script_tags.length; i < len; i++)
		{
			if($m.vd.is_msie7_or_lower === true)
			{
				script_src = script_tags[i].getAttribute("src", 4);

				if($m.is.alive(script_src) === true && script_tags[i].src.match(pattern))
				{
					script_src = script_src.replace("http(s)?://" + window.location.hostname, "");
					$m.config.basedir = script_src.replace(pattern, "");
					break;
				}
			}
			else
			{
				if($m.is.alive(script_tags[i].src) === true && script_tags[i].src.match(pattern))
				{
					$m.config.basedir = script_tags[i].src.replace("http(s)?://" + window.location.hostname, "").replace(pattern, "");
					break;
				}
			}
		}
	}


	/**
	 * $m.fix_msie
	 *
	 */
	,fix_msie : function() // http://www.sixteensmallstones.org/ie-javascript-bugs-overriding-internet-explorers-documentgetelementbyid-to-be-w3c-compliant-exposes-an-additional-bug-in-getattributes
	{
		if($m.vd.is_msie7_or_lower)
		{
			document.nativeGetElementById = document.getElementById;
			document.getElementById = function(id)
			{
				var elem = document.nativeGetElementById(id);

				if(elem)
				{
					// make sure that it is a valid match on id
					if(elem.attributes["id"].value == id)
					{
						return elem;
					}
					else
					{
						// otherwise find the correct element
						for(var i=1;i<document.all[id].length;i++)
						{
							if(document.all[id][i].attributes["id"].value == id)
							{
								return document.all[id][i];
							}
						}
					}
				}

				return null;
			}
		}
	}


	/**
	 * $m.geo
	 * http://diveintohtml5.info/geolocation.html
	 * https://developer.mozilla.org/en-US/docs/Using_geolocation
	 */
	,geo :
	{
		 name : "geo"
		,has : false
		,watch_id : false
	
		,defaults : {
			 keep_watching : false
			,max_age : 300
			,timeout : 15
		}

		,error_codes : {
			 0 : "Unknown error"
			,1 : "Permission denied"
			,2 : "Position unavailable"
			,3 : "Timed out"
		}
	
		,request : {
			 callback_success : false
			,element_id : false
			,error : false
			,found_location : false
			,keep_watching : false
			,max_age : false
			,timeout : false
			,update_id : false
		}
	
		,pos : {}
	
		,construct : function()
		{
			if($m.config.geo.debug === true)
			{
				$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Executing >>> $m.geo.construct()");
			}
		
			if("geolocation" in navigator)
			{
				$m.geo.has = true;
				$m.geo.get_pos();
			}
			else
			{
				$m.de.add_item("navigator.geolocation doesn't exist in this browser.");
			}
		}
	
		// $m.geo.init_settings()
		,init_settings : function(in_id)
		{
			if($m.config.geo.debug === true)
			{
				$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Executing >>> $m.geo.init_settings()");
			}
		
			var callback_success = $m.attr.get(in_id, "data-mjf_geo_call_on_success")
				,max_age = $m.attr.get(in_id, "data-data-mjf_geo_max_age")
				,timeout = $m.attr.get(in_id, "data-data-mjf_geo_timeout")

				,settings = {
					 callback_success : (callback_success === null) ? "$m.geo.simple_content_update()" : callback_success
					,keep_watching : ($m.attr.get(in_id, "data-data-mjf_geo_keep_watching") == "true") ? true : false
					,max_age : parseInt(($m.is.alive(max_age) === true) ? max_age : $m.geo.defaults.max_age) * 1000
					,timeout : parseInt(($m.is.alive(timeout) === true) ? timeout : $m.geo.defaults.timeout) * 1000
					,update_id : $m.attr.get(in_id, "data-mjf_geo_update_id")
				};
	
			return settings;
		}
	
		// $m.geo.send_request()
		,send_request : function(in_set, in_id)
		{
			if($m.config.geo.debug === true)
			{
				$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Executing >>> $m.geo.send_request()");
			}
			
			$m.geo.request.element_id = in_id;

			if($m.geo.has === true)
			{
				$m.css_class.add($m.geo.request.element_id, "geo_visual");
				$m.css_class.add($m.geo.request.update_id, "geo_visual_content");
				
				$m.geo.request.callback_success = in_set.callback_success;
				$m.geo.request.keep_watching = in_set.keep_watching;
				$m.geo.request.max_age = in_set.max_age;
				$m.geo.request.timeout = in_set.timeout;
				$m.geo.request.update_id = in_set.update_id;

				$m.geo.get_pos();
			}
			else
			{
				return false;
			}
		}
	
		// $m.geo.get_pos()
		,get_pos : function()
		{
			if($m.config.geo.debug === true)
			{
				$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Executing >>> $m.geo.get_pos()");
			}

			$m.geo.watch_id = navigator.geolocation.watchPosition(
				function(position)
				{
					$m.geo.get_watch(position);
				}
				,function(error)
				{
					$m.geo.get_error(error);
				}
				,{
					 maximumAge : $m.geo.request.max_age
					,timeout : $m.geo.request.timeout
				}
			);
			
			if($m.config.geo.debug === true)
			{
				$m.de.add_item("$m.geo.watch_id = " + $m.geo.watch_id);
			}
		}

		// $m.geo.get_watch()
		,get_watch : function(in_pos)
		{
			if($m.config.geo.debug === true)
			{
				$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Executing >>> $m.geo.get_watch()");
			}
			
			$m.geo.clear_watch();
		
			if($m.config.geo.visual === true)
			{
				$m.css_class.remove($m.geo.request.element_id, "geo_visual");
				$m.css_class.remove($m.geo.request.update_id, "geo_visual_content");
			}
			
			if($m.is.alive(in_pos) === true)
			{
				$m.geo.request.found_location = true;
			
				$m.geo.pos.timestamp = ($m.is.alive(in_pos.timestamp) === true) ? in_pos.timestamp : false;
				$m.geo.pos.coords = {};
				
				if($m.is.alive(in_pos.coords) === true)
				{
					$m.geo.pos.coords.latitude = ($m.is.alive(in_pos.coords.latitude) === true) ? in_pos.coords.latitude : false;
					$m.geo.pos.coords.longitude = ($m.is.alive(in_pos.coords.longitude) === true) ? in_pos.coords.longitude : false;
					$m.geo.pos.coords.accuracy = ($m.is.alive(in_pos.coords.accuracy) === true) ? in_pos.coords.accuracy : false;
					$m.geo.pos.coords.altitude = ($m.is.alive(in_pos.coords.altitude) === true) ? in_pos.coords.altitude : false;
					$m.geo.pos.coords.altitudeAccuracy = ($m.is.alive(in_pos.coords.altitudeAccuracy) === true) ? in_pos.coords.altitudeAccuracy : false;
					$m.geo.pos.coords.heading = ($m.is.alive(in_pos.coords.heading) === true && isNaN(in_pos.coords.heading) === false) ? in_pos.coords.heading : false;
					$m.geo.pos.coords.speed = ($m.is.alive(in_pos.coords.speed) === true && isNaN(in_pos.coords.speed) === false) ? in_pos.coords.speed : false;
				}
				else
				{
					$m.geo.pos.coords.latitude = false;
					$m.geo.pos.coords.longitude = false;
					$m.geo.pos.coords.accuracy = false;
					$m.geo.pos.coords.altitude = false;
					$m.geo.pos.coords.altitudeAccuracy = false;
					$m.geo.pos.coords.heading = false;
					$m.geo.pos.coords.speed = false;
				}
				
				if($m.config.geo.debug === true)
				{
					var coordinates_debug = " coordinates:\n";
			
					for(var property in $m.geo.pos.coords)
					{
						coordinates_debug += property + " = '" + $m.geo.pos.coords[property] + "' \n";
					}
					
					$m.de.add_item("$m.geo.get_watch() --- " + coordinates_debug);
				}

				$m.ev.all($m.geo.request.callback_success);
			}
			else
			{
				$m.geo.request.found_location = false;
				$m.geo.get_error(2);
			}
			
			if($m.config.geo.debug === true)
			{
				$m.de.add_item("$m.geo.request.found_location = " + $m.geo.request.found_location);
			}
		}
	
		// $m.geo.get_error()
		,get_error : function(in_err)
		{
			if($m.geo.request.found_location === false)
			{
				if($m.config.geo.debug === true)
				{
					$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Executing >>> $m.geo.get_error()");
				}
			
				$m.geo.clear_watch();
			
				if($m.config.geo.visual === true)
				{
					$m.css_class.remove($m.geo.request.element_id, "geo_visual");
					$m.css_class.remove($m.geo.request.update_id, "geo_visual_content");
				}
	
				if($m.is.good_id($m.geo.request.update_id))
				{
					var error_response = $m.error_wrapper.open + "Error getting location: " + $m.geo.error_codes[in_err.code] + "." + $m.error_wrapper.close;
					$m.tag.html($m.geo.request.update_id, error_response, "prepend");
				}
				else
				{
					$m.de.throw_browser_error("$m.geo.get_error() $m.geo.request.update_id `" + $m.geo.request.update_id + "` does not exist.");
				}
				
				$m.geo.request.error = true;
			}
		}

		// $m.geo.simple_content_update()
		,simple_content_update : function()
		{
			// http://javascript.internet.com/math-related/latitude-longitude-converter.html
		
			if($m.config.geo.debug === true)
			{
				$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Executing >>> $m.geo.simple_content_update()");
			}

			var update_id = $m.is.good_id($m.geo.request.update_id);
		
			if($m.is.alive(update_id) === true)
			{
				var update_html  = "<table class=\"general_table\">"
				update_html += "<tr><td class=\"align_right\">Timestamp</td><td>" + ($m.is.alive($m.geo.pos.timestamp) ? $m.geo.pos.timestamp : '&mdash;') + "</td></tr>";
				update_html += "<tr><td class=\"align_right\">Latitude</td><td>" + ($m.is.alive($m.geo.pos.coords.latitude) ? $m.geo.pos.coords.latitude : '&mdash;') + "</td></tr>";
				update_html += "<tr><td class=\"align_right\">Longitude</td><td>" + ($m.is.alive($m.geo.pos.coords.longitude) ? $m.geo.pos.coords.longitude : '&mdash;') + "</td></tr>";
				update_html += "<tr><td class=\"align_right\">Accuracy</td><td>" + ($m.is.alive($m.geo.pos.coords.accuracy) ? $m.geo.pos.coords.accuracy + " meters" : '&mdash;') + "</td></tr>";
				update_html += "<tr><td class=\"align_right\">Altitude</td><td>" + ($m.is.alive($m.geo.pos.coords.altitude) ? $m.geo.pos.coords.altitude + " meters" : '&mdash;') + "</td></tr>";
				update_html += "<tr><td class=\"align_right\">Altitude Accuracy</td><td>" + ($m.is.alive($m.geo.pos.coords.altitudeAccuracy) ? $m.geo.pos.coords.altitudeAccuracy + " meters" : '&mdash;') + "</td></tr>";
				update_html += "<tr><td class=\"align_right\">Heading</td><td>" + ($m.is.alive($m.geo.pos.coords.heading) ? $m.geo.pos.coords.heading + ' degrees' : '&mdash;') + "</td></tr>";
				update_html += "<tr><td class=\"align_right\">Speed</td><td>" + ($m.is.alive($m.geo.pos.coords.speed) ? $m.geo.pos.coords.speed + ' meters per second' : '&mdash;') + "</td></tr>";
				update_html += "<table>"
			
				$m.tag.html(update_id, update_html, "replace");
			}
			else
			{
				$m.de.throw_browser_error("$m.geo.simple_content_update() $m.geo.request.update_id `" + $m.geo.request.update_id + "` does not exist.");
			}
		}
		
		
		// $m.geo.clear_watch()
		,clear_watch : function()
		{
			if($m.config.geo.debug === true)
			{
				$m.de.add_item("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Executing >> $m.geo.clear_watch(" + $m.geo.watch_id + ")");
				$m.de.add_item("$m.geo.request.keep_watching = " + $m.geo.request.keep_watching);
			}

			if($m.geo.request.keep_watching === false)
			{
				navigator.geolocation.clearWatch($m.geo.watch_id);
			}
		}
		
	}


	/**
	 * $m.get_flash_object
	 *
	 */
	,get_flash_object : function(in_flash_name)
	{
		return ($m.vd.is_msie === true) ? window[in_flash_name] : document[in_flash_name];
	}


	// $m.get_form_fields(IN_FORM, IN_FIELD_TYPES);
	,get_form_fields : function(in_form, in_field_types)
	{
		return $m.attr.get_fields_with(in_form, in_field_types);
	}


	/**
	 * $m.get_keycode
	 *
	 */
	,get_keycode : function(in_event)
	{
		var keycode = "";
	
		if(!in_event)
		{
			var in_event = window.event;
		}
	
		if(in_event.keyCode)
		{
			keycode = in_event.keyCode;
		}
		else if(in_event.which)
		{
			keycode = in_event.which;
		}
		else
		{
			keycode = false;
		}
		
		return keycode;
	}


	/**
	 * $m.id
	 *
	 */
	,id : function(in_id)
	{
		if($m.is.object(in_id) === true)
		{
			return in_id;
		}
		else if($m.is.alive(in_id) === false)
		{
			return false;
		}
		else if(document.getElementById(in_id) === undefined || document.getElementById(in_id) === null)
		{
			return false;
		}
		else
		{
			return document.getElementById(in_id);
		}
	}


	/**
	 * Initials all DOM children - $m.init_children()
	 *
	 * @param {boolean} is_ajax_init Whether or not this is being called on an AJAX return
	 */
	,init_children : function(is_ajax_init)
	{
		var new_error;
        
		if(is_ajax_init === true)
		{
			$m.ajax_init = true;
		}

		$m.document = document;
		$m.tags.a = $m.tags.get("document", "a");
		$m.tags.all = $m.tags.get("document", "*");
		$m.tags.img = $m.tags.get("document", "img");
		$m.tags.form = $m.tags.get("document", "form");

		if($m.config.global_debug === "high")
		{
			$m.de.add_item("$m.init_children() -- starting wand init");
		}

		for(var w in $m.wand)
		{
			if(this.h[w] === undefined)
			{
				new_error = "$m.wand \"" + w + "\" is not initialized correctly";
				$m.de.throw_browser_error(new_error);
				continue;
			}

			this.h[w].construct($m.wand[w]);
			
			if($m.config.global_debug === "high")
			{
				$m.de.add_item("Executed >> $m.h." + w + ".construct(" + $m.wand[w] + ")");
			}
		}

		if($m.config.global_debug === "high")
		{
			$m.de.add_item("$m.init_children() -- starting trick init");
		}

		for(var t in $m.trick)
		{
			if($m.t[t] === undefined)
			{
				new_error = "trick \"" + t + "\" is not initialized correctly!";
				$m.de.throw_browser_error(new_error);
				continue;
			}
			
			$m.t[t].construct($m.trick[t]);

			for(var r in $m.trick[t])
			{
				if(r == "config" || r == "toJSON")
				{
					continue;
				}

				if($m.t[t][r] === undefined)
				{
					new_error = "$m.trick \"" + t + "." + r +"\" is not initialized correctly";
					$m.de.throw_browser_error(new_error);
					continue;
				}

				$m.t[t][r].construct($m.trick[t][r]);
				
				if($m.config.global_debug === "high")
				{
					$m.de.add_item("Executed >> $m.t[" + t + "][" + r + "].construct($m.trick[" + t + "][" + r + "])");
				}
			}
		}
		
		if($m.config.global_debug === "high")
		{
			$m.de.add_item("$m.init_children() -- finished trick init");
		}

		if($m.config.global_debug && $m.ajax_init)
		{
			$m.de.add_item("~ MJS re-initialized in " + (new Date().getTime() - $m.timer_ajax) / 1000 + " seconds");
		}
		
		$m.ajax_init = false;
	}


	/**
	 * $m.init_xml
	 *
	 */
	,init_xml : function()
	{
		var xhttp = false;
		
		try
		{
			xhttp = new ActiveXObject('Msxml2.XMLHTTP');
		}
		catch(e)
		{
			try
			{
				xhttp = new ActiveXObject('Microsoft.XMLHTTP');
			}
			catch(e)
			{
				xhttp = new XMLHttpRequest();
			}
		}
		
		return xhttp;
	}


	/**
	 * $m.insert_link
	 *
	 */
	,insert_link :
	{
		// $m.insert_link.stylesheet(IN_FILE)
		stylesheet : function(in_file)
		{
			$m.head_tag.appendChild($m.tag.init("link",
			{
				 "rel" : "stylesheet"
				,"type" : "text/css"
				,"href" : in_file
			}));
		}
	
		// $m.insert_link.script(IN_FILE, IN_CALLBACK)
		,script : function(in_file, in_callback)
		{
			// can we delete src attribute?
			
			var attributes = {
				 "charset" : "UTF-8"
				,"type" : "text/javascript"
			}
			
			if($m.is.alive(in_file) === true)
			{
				attributes.src = in_file;
			}

			var new_script = $m.tag.init("script", attributes);

			if($m.is.alive(in_callback) === true)
			{
				if(new_script.addEventListener)
				{
					new_script.addEventListener('load', function()
					{
						in_callback();
					}, false);
				}
				else
				{
					new_script.onreadystatechange = function()
					{
						if(new_script.readyState in { loaded: 1, complete: 1 })
						{
							new_script.onreadystatechange = null;
							in_callback();
						}
					};
				}
			}

			$m.head_tag.appendChild(new_script);
		}
	}


	/**
	 * $m.is
	 *
	 */
	,is :
	{
		// $m.is.alive(IN_VAR)
		alive : function(in_var)
		{
			if(in_var === undefined || in_var === null || in_var === false)
			{
				return false;
			}
			else
			{
				if($m.is.object(in_var) === true)
				{
					return true;
				}
				else if($m.is.array(in_var) === true)
				{
					if(in_var <= 0)
					{
						return false;
					}
				}
				else if(in_var === "")
				{
					return false;
				}
				else
				{
					return true;
				}
			}
		}

		// $m.is.array(IN_VAR)
		,array : function(in_var)
		{
			return typeof in_var == "object" && (in_var instanceof Array);
		}
			// $m.is.in_array(IN_ARRAY, IN_ITEM)
			,in_array : function(in_array, in_item)
			{
				if($m.is.object(in_item) === true)
				{
					for(var x=0, i_len=in_item.length; x < i_len; x++)
					{
						if($m.is.string(in_item[x]) === true)
						{
							for(var y=0, ia_len=in_array.length; y < ia_len; y++)
							{
								if($m.is.string(in_array[y]) === true && in_item[x] == in_array[y])
								{
									return true;
								}
							}
						}
					}
				}
				else
				{
					for(var i=0, ia_len=in_array.length; i < ia_len; i++)
			        {
			            if(in_array[i] == in_item)
						{
			            	return i;
			            }
			        }
				}
			
				return false;
			}

		// $m.is.good_id(IN_VAR)
		,good_id : function(in_id)
		{
			if($m.is.alive(in_id) === false)
			{
				return false;
			}

			var id = ($m.is.object(in_id) === true) ? in_id : $m.id(in_id);

			if($m.is.alive(id) === false)
			{
				return false;
			}

			return id;
		}

		// $m.is.func(IN_VAR)
		,func : function(in_var)
		{
			return (typeof in_var == 'function');
		}

		// $m.is.number(IN_VAR)
		,number : function(in_var)
		{
			return (typeof in_var == 'number');
		}

		// $m.is.object(IN_VAR)
		,object : function(in_var)
		{
			return typeof in_var == "object";
		}

		// $m.is.string(IN_VAR)
		,string : function(in_var)
		{
			return (typeof in_var == 'string');
		}
		
		// $m.is.good_string(IN_VAR)
		,good_string : function(in_var)
		{
			if(typeof in_var == 'string' && in_var != "")
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}


	/**
	 * $m.keycode
	 *
	 */
	,keycode :
	{
		// $m.keycode.get(IN_EVENT)
		get : function(in_event)
		{
			var keycode = "";
		
			if(!in_event)
			{
				var in_event = window.event;
			}
		
			if(in_event.keyCode)
			{
				keycode = in_event.keyCode;
			}
			else if(in_event.which)
			{
				keycode = in_event.which;
			}
			else
			{
				keycode = false;
			}
			
			return keycode;
		}

		// $m.keycode.is_worthy(IN_KEYCODE)
		,is_worthy : function(in_keycode)
		{
			//$m.de.add_item("in_keycode = " + in_keycode);
			
			/*
				
				224 // command

				112 - 129 // function keys
				
				91 // windows
		
				37 - 40 // arrow keys
				36 // home
				35 // end
				34 // page down
				33 // page up
				
				27 // escape
				20 // caps lock
				18 // alt / option
				17 // ctrl
				16 // shift
				13 // return / enter
				
				9 // tab, prob ok

			*/

			if( (in_keycode == 8 || in_keycode == 16 || in_keycode == 46 || in_keycode == 188) // backspace, shift, delete and misc special characters
				|| (in_keycode >= 48 && in_keycode <= 90) // keys A-Z and 0-9
				|| (in_keycode >= 96 && in_keycode <= 107) // numpad keys 0-9 and misc special characters
				|| (in_keycode >= 109 && in_keycode <= 111) // misc special characters
				|| (in_keycode >= 190 && in_keycode <= 192) // misc special characters
				|| (in_keycode >= 219 && in_keycode <= 222) // misc special characters
			)
			{
				return true;
			}
			else
			{
				return false;
			}
		}
	}


	/**
	 * $m.query_string
	 *
	 */
	,query_string :
	{
		// $m.query_string.create(IN_OBJECT)
		create : function(in_object)
		{
			if($m.is.alive(in_object) === false)
			{
				$m.de.throw_browser_error("$m.query_string.create() === in_object `' + in_object + '` does not exist.");
				return false;
			}

			var the_object = ($m.is.string(in_object) === true || $m.is.array(in_object) !== false) ? $m.id(in_object) : in_object;
			
			if($m.tag.get_name(the_object) == "form")
			{
				var query_string = ""
					,input_fields = $m.tags.get(the_object, "input");
			
				for(var i=0, if_len=input_fields.length; i < if_len; i++)
				{
					if(input_fields[i].type == "radio" && input_fields[i].checked === true)
					{
						query_string += "&" + $m.attr.get(input_fields[i], "name") + "=" + encodeURIComponent(input_fields[i].value);
						continue;
					}
					else if(input_fields[i].type == "checkbox" && input_fields[i].checked === true)
					{
						query_string += "&" + $m.attr.get(input_fields[i], "name") + "=" + encodeURIComponent(input_fields[i].value);
						continue;
					}
					else if((input_fields[i].type == "radio" || input_fields[i].type == "checkbox") && input_fields[i].checked !== true)
					{
						continue;
					}
					else
					{
						query_string += "&" + $m.attr.get(input_fields[i], "name") + "=" + encodeURIComponent(input_fields[i].value);
					}
				}
				
				var textarea_fields = $m.tags.get(the_object, "textarea");
		
				for(var i=0, tf_len=textarea_fields.length; i < tf_len; i++)
				{
					if($m.is.alive(textarea_fields[i].value) === false)
					{
						continue;
					}
		
					query_string += "&" + $m.attr.get(textarea_fields[i], "name") + "=" + encodeURIComponent(textarea_fields[i].value);
				}
		
				var select_fields = $m.tags.get(the_object, "select");
		
				for(var i=0, sf_len=select_fields.length; i < sf_len; i++)
				{
					for(var j=0, sf2_len=select_fields[i].length; j < sf2_len; j++)
					{
						if(select_fields[i][j].selected === true)
						{
							query_string += "&" + $m.attr.get(select_fields[i], "name") + "=" + encodeURIComponent(select_fields[i][j].value);
						}
					}
				}
				
				return query_string;
			}
			else
			{
				var query_string = [];

				for(var key in in_object)
				{
					if(in_object.hasOwnProperty(key))
					{
						query_string.push(encodeURIComponent(key) + '=' + encodeURIComponent(in_object[key]));
					}
				}

				return query_string.join('&');
			}
		}


		// $m.query_string.parse(IN_STRING)
		,parse : function(in_string)
		{
			//$m.de.add_item("in_string = " + in_string);
		
			if($m.is.string(in_string) === false)
			{
				$m.de.throw_browser_error("$m.query_string.parse() === in_string argument does not exist.");
				return false;
			}
		
			var pairs = in_string.substring(in_string.indexOf('?') + 1).split('&')
				,pair = []
				,request = {};
			
			for (var i = 0; i < pairs.length; i++)
			{
				pair = pairs[i].split('=');

				request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
			}

			return request;
		}
	}


	/**
	 * $m.media
	 *
	 */
	,media :
	{
		supports :
		{
			// $m.media.supports.h264()
			h264 : function()
			{
				if(!$m.media.supports.video())
				{
					return false;
				}
			
				var v = document.createElement("video");
				return v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
			}

			// $m.media.supports.theora()
			,theora : function()
			{
				if(!$m.media.supports.video())
				{
					return false;
				}
			
				var v = document.createElement("video");
				return v.canPlayType('video/ogg; codecs="theora, vorbis"');
			}
			
			// $m.media.supports.vorbis()
			,vorbis : function()
			{
				if(!$m.media.supports.video())
				{
					return false;
				}
			
				var v = document.createElement("video");
				return v.canPlayType('video/webm; codecs="vp8, vorbis"');
			}

			// $m.media.supports.flash()
			,flash : function()
			{
				return ((typeof navigator.plugins != "undefined" && typeof navigator.plugins["Shockwave Flash"] == "object") || (window.ActiveXObject && (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) != false));
			}

			// $m.media.supports.video()
			,video : function()
			{
				return !!document.createElement('video').canPlayType;
			}
		}
	}


	/**
	 * $m.mouse_btn
	 *
	 */
	,mouse_btn :
	{
		get : function(in_event)
		{
			var mousebutton = "";
	
			if($m.is.alive(in_event) === false)
			{
				var in_event = window.event;
			}
		
			if($m.is.alive(in_event.button) === true)
			{
		    	mousebutton = in_event.button;
		    }
			else if($m.is.alive(in_event.which) === true)
			{
		    	mousebutton = in_event.which;
		    }
			else
			{
				mousebutton = false;
			}
			
			return mousebutton;
		}
	}


	/**
	 * $m.position
	 *
	 */
	,position :
	{
		// $m.position.is_scrolled_into_view(IN_ID)
		is_scrolled_into_view : function(in_id)
		{
			/*
			$m.vd.get_view_port();
		
			var view_bottom = $m.vd.scrolled_top + $m.vd.total_page_height;
			var ele_bottom = final_top + $m.t.magic_calendar.final_height;
			
			return ((ele_bottom <= view_bottom) && (final_top >= $m.vd.scrolled_top));
			*/
		}
	
		// $m.position.get_x(IN_ID)
		,get_x : function(in_id)
		{
			var id = $m.id(in_id)
				,pos_x = id.offsetLeft
				,par_e = id.offsetParent;
		
		    while(par_e != null)
		    {
		        pos_x += par_e.offsetLeft;
		        par_e = par_e.offsetParent;
		    }
		
		    return pos_x;
		}
			// $m.position.get_x2(IN_ID)
			// NOT USED
			,get_x2 : function(in_id)
			{
				var id = $m.id(in_id)
					,pos_x = 0;

				do
				{
					pos_x += id.offsetLeft;
				} while (id = id.offsetParent);
				
				return pos_x;
			}

		// $m.position.get_y(IN_ID)
		,get_y : function(in_id)
		{
			var id = $m.id(in_id)
				,pos_y = id.offsetTop
				,par_e = id.offsetParent;
		
		    while(par_e != null)
		    {
		        pos_y += par_e.offsetTop;
		        par_e = par_e.offsetParent;
		    }
		
		    return pos_y;
		}
			// $m.position.get_y2(IN_ID)
			// NOT USED
			,get_y2 : function(in_id)
			{
				var id = $m.id(in_id)
					,pos_y = 0;

				do
				{
					pos_y += id.offsetTop;
				} while (id = id.offsetParent);

				return pos_y;
			}

		// $m.position.get_xy(IN_ID)
		,get_xy : function(in_id)
		{
			var id = $m.id(in_id)
				,pos_x = id.offsetLeft
				,pos_y = id.offsetTop
				,par_e = id.offsetParent;

		    while(par_e != null)
		    {
		    	pos_x += par_e.offsetLeft;
		        pos_y += par_e.offsetTop;
		        par_e = par_e.offsetParent;
		    }
		
			return [pos_x, pos_y];
		}
			// $m.position.get_xy2(IN_ID)
			// NOT USED
			,get_xy2 : function(in_id)
			{
				var id = $m.id(in_id)
					,pos_x = pos_y = 0;

				do
				{
					pos_x += id.offsetLeft; pos_y += id.offsetTop;
				} while (id = id.offsetParent);

				return [pos_x, pos_y];
			}
	}


	/**
	 * $m.returnd
	 *
	 */
	,returnd :
	{
		// $m.returnd.set(IN_ID, IN_BOOL)
		set : function(in_id, in_bool)
		{
			$m.attr.set(in_id, { "data-mjf_return_value" : in_bool });
		}
	
		// $m.returnd.get(IN_ID)
		,get : function(in_id)
		{
			var current_return = $m.attr.get(in_id, "data-mjf_return_value")
				,new_return = (current_return === "false") ? false : true;

			return new_return;
		}
	}


	/**
	 * Checks if the <body> tag has an element and if not, add one - $m.check_for_body_id()
	 *
	 */
	,set_body_id : function()
	{
		$m.body_tag = document.getElementsByTagName("body")[0];
		var body_id = $m.attr.get($m.body_tag, "id");
		(body_id === null) ? $m.attr.set($m.body_tag, { "id" : $m.body_id }) : $m.body_id = body_id;
	}


	/**
	 * 
	 *
	 */
	,selection :
	{
		// $m.selection.get(IN_DOCUMENT)
		get : function(in_document)
		{
			var selection = ($m.is.alive(in_document) === true) ? in_document.getSelection() : window.getSelection();

			return selection;
		}
		
		 // $m.selection.replace(IN_HTML, IN_DOCUMENT)
		,replace : function(in_html, in_document)
		{
			if($m.is.alive(in_document) === true)
			{
				var selection = in_document.getSelection()
					,cur_doc = in_document;
			}
			else
			{
				var selection = window.getSelection()
					,cur_doc = document;
			}
			
			var range = ""
				,node = "";

			if(selection.getRangeAt && selection.rangeCount)
			{
				var range = selection.getRangeAt(0);
				range.deleteContents();
	
				if(range.createContextualFragment)
				{
					node = range.createContextualFragment(in_html);
				}
				else
				{
					var div = cur_doc.createElement("div")
						,child;
	
					div.innerHTML = in_html;
					node = cur_doc.createDocumentFragment();
	
					while((child = div.firstChild))
					{
						node.appendChild(child);
					}
				}
	
				range.insertNode(node);
			}
			else if(cur_doc.selection && cur_doc.selection.type != "Control")
			{
				try
				{
					cur_doc.body.focus();
					range = cur_doc.selection.createRange();
					range.pasteHTML(in_html);
				}
				catch(e)
				{
					$m.de.throw_browser_error("$m.selection.replace() --- cannot pasteHTML()");
					return false;
				}
			}
		}
	}


	/**
	 * $m.shortcut - Adapted from: http://www.openjs.com/scripts/events/keyboard_shortcuts/
	 *
	 */
	,shortcut :
	{
		 shift_nums : { "`":"~", "1":"!", "2":"@", "3":"#", "4":"$", "5":"%", "6":"^", "7":"&", "8":"*", "9":"(", "0":")", "-":"_", "=":"+", ";":":", "'":"\"", ",":"<", ".":">", "/":"?", "\\":"|" }
		,special_keys : { 'esc':27, 'escape':27, 'tab':9, 'space':32, 'return':13, 'enter':13, 'backspace':8, 'scrolllock':145, 'scroll_lock':145, 'scroll':145, 'capslock':20, 'caps_lock':20, 'caps':20, 'numlock':144, 'num_lock':144, 'num':144, 'pause':19, 'break':19, 'insert':45, 'home':36, 'delete':46, 'end':35, 'pageup':33, 'page_up':33, 'pu':33, 'pagedown':34, 'page_down':34, 'pd':34, 'left':37, 'up':38, 'right':39, 'down':40, 'f1':112, 'f2':113, 'f3':114, 'f4':115, 'f5':116, 'f6':117, 'f7':118, 'f8':119, 'f9':120, 'f10':121, 'f11':122, 'f12':123 }
		,default_opt : {
			 'type' : 'keydown'
			,'propagate' : false
			,'target' : document
			,'keycode' : false
		}
	
		// $m.shortcut.bind(KEYBOARD_SHORTCUT, CALLBACK, OPTIONS)
		,bind : function(in_shct_combo, in_callback, in_opt)
		{
			if($m.vd.is_mobile_touch === true)
			{
				return;
			}
	
			//if($m.is.alive(in_shct_combo) === false || $m.is.alive(in_callback) === false)
			//	return false;
			
			if(in_shct_combo === false)
			{
				return;
			}
	
			in_shct_combo = in_shct_combo.toLowerCase();
	
			if($m.is.alive(in_opt) === true)
			{
				for(var dfo in $m.shortcut.default_opt)
				{
					if($m.is.alive(in_opt[dfo]) === false)
					{
						in_opt[dfo] = $m.shortcut.default_opt[dfo];
					}
				}			
			}
			else
			{
				in_opt = $m.shortcut.default_opt;
			}
			
			var opt = in_opt
				,ele = ($m.is.alive(opt.target) === true) ? $m.id(opt.target) : opt.target;
	
			var exec = function(e)
			{
				$m.shortcut.modifiers = { shift : { wanted:false, pressed:false }, ctrl : { wanted:false, pressed:false }, alt : { wanted:false, pressed:false }, meta : { wanted:false, pressed:false } };
			
				e = e || window.event;
		
				var element;
		
				if(e.target)
				{
					element = e.target;
				}
				else if(e.srcElement)
				{
					element = e.srcElement;
				}
		
				if(element.nodeType == 3)
				{
					element = element.parentNode;
				}
		
				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA')
				{
					return;
				}
		
				var code = $m.get_keycode(e)
					,character = String.fromCharCode(code).toLowerCase();
		
				if(code == 188)
				{
					character = ",";
				}
		
				if(code == 190)
				{
					character = ".";
				}
		
				var keys = in_shct_combo.split("+")
					,kp = 0; // Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
		
				if(e.ctrlKey)
				{
					$m.shortcut.modifiers.ctrl.pressed = true;
				}
		
				if(e.shiftKey)
				{
					$m.shortcut.modifiers.shift.pressed = true;
				}
		
				if(e.altKey)
				{
					$m.shortcut.modifiers.alt.pressed = true;
				}
		
				if(e.metaKey)
				{
					$m.shortcut.modifiers.meta.pressed = true;
				}
		
				for(var i=0; k = keys[i], i < keys.length; i++) // Modifiers
				{
					if(k == 'ctrl' || k == 'control')
					{
						$m.shortcut.modifiers.ctrl.wanted = true;
						kp++;
					}
					else if(k == 'shift')
					{
						$m.shortcut.modifiers.shift.wanted = true;
						kp++;
					}
					else if(k == 'alt')
					{
						$m.shortcut.modifiers.alt.wanted = true;
						kp++;
					}
					else if(k == 'cmd' || k == 'command')
					{
						$m.shortcut.modifiers.meta.wanted = true;
						kp++;
					}
					else if(k.length > 1) // If it is a special key
					{ 
						if($m.shortcut.special_keys[k] == code)
						{
							kp++;
						}
					}
					else if(opt['keycode'])
					{
						if(opt['keycode'] == code)
						{
							kp++;
						}
					}
					else // The special keys did not match
					{
						if(character == k)
						{
							kp++;
						}
						else
						{
							if($m.shortcut.shift_nums[character] && e.shiftKey)
							{
								character = $m.shortcut.shift_nums[character]; 
		
								if(character == k)
								{
									kp++;
								}
							}
						}
					}
				}
				
				if(kp == keys.length
					&& $m.shortcut.modifiers.ctrl.pressed == $m.shortcut.modifiers.ctrl.wanted
					&& $m.shortcut.modifiers.shift.pressed == $m.shortcut.modifiers.shift.wanted
					&& $m.shortcut.modifiers.alt.pressed == $m.shortcut.modifiers.alt.wanted
					&& $m.shortcut.modifiers.meta.pressed == $m.shortcut.modifiers.meta.wanted)
				{
					if($m.is.string(in_callback) === true)
					{
						$m.ev.all(in_callback);
					}
					else
					{
						in_callback(e);
					}
	
					if(opt['propagate'] === false)
					{
						$m.stop_bubble(e);
						return false;
					}
				}
			}
	
			$m.element.attach(ele, opt['type'], exec);
		}
	}


	/**
	 * $m.smooth_scroll
	 *
	 */
	,smooth_scroll : // Adapted from http://www.kryogenix.org/code/browser/smoothscroll/
	{
		 steps : 25
		,interval : false
		,pos_x : false
		,pos_y : false
		,size : 0
		,start_cur_y_pos : 0
		,now_cur_y_pos : 0
		,is_above : false
		,is_above_now : false

		// $m.smooth_scroll.construct(IN_ID, IN_MINUS_PADDING_TOP, IN_MINUS_PADDING_LEFT)
		,construct : function(in_id, in_minus_padding_top, in_minus_padding_left)
		{
			var id = $m.id(in_id)
				,minus_padding_top = ($m.is.alive(in_minus_padding_top) === true) ? in_minus_padding_top : 0
				,minus_padding_left = ($m.is.alive(in_minus_padding_left) === true) ? in_minus_padding_left : 0;

			clearInterval($m.smooth_scroll.interval);
			$m.smooth_scroll.size = 0;

			$m.vd.get_view_port();

			var cur_y_pos = $m.vd.scrolled_top,
				pos = $m.position.get_xy(in_id);

			$m.smooth_scroll.pos_x = pos[0] - minus_padding_left;
			$m.smooth_scroll.pos_y = pos[1] - minus_padding_top;

			if($m.vd.is_kindle === true)
			{
				window.scrollTo($m.smooth_scroll.pos_x, $m.smooth_scroll.pos_y);
			}
			
			$m.smooth_scroll.size = parseInt(($m.smooth_scroll.pos_y - cur_y_pos) / $m.smooth_scroll.steps);
			$m.smooth_scroll.interval = setInterval(function()
			{
				$m.smooth_scroll.exec();
			}, 10);
		}

		,exec : function()
		{
			$m.vd.get_view_port();
			$m.smooth_scroll.start_cur_y_pos = $m.vd.scrolled_top;
			$m.smooth_scroll.is_above = ($m.smooth_scroll.start_cur_y_pos < $m.smooth_scroll.pos_y);
			window.scrollTo($m.smooth_scroll.pos_x, $m.smooth_scroll.start_cur_y_pos + $m.smooth_scroll.size);

			$m.vd.get_view_port();
			$m.smooth_scroll.now_cur_y_pos = $m.vd.scrolled_top;
			$m.smooth_scroll.is_above_now = ($m.smooth_scroll.now_cur_y_pos < $m.smooth_scroll.pos_y);

			if(($m.smooth_scroll.is_above != $m.smooth_scroll.is_above_now) || ($m.smooth_scroll.start_cur_y_pos == $m.smooth_scroll.now_cur_y_pos))
			{
				clearInterval($m.smooth_scroll.interval);
				setTimeout(function()
				{
					window.scrollTo($m.smooth_scroll.pos_x, $m.smooth_scroll.pos_y);
				}, 500);
			}
		}
	}


	/**
	 * $m.smooth_scroll_overflow
	 *
	 */
	,smooth_scroll_overflow : 
	{
		 steps : 25
		,interval : false
		,scroll_id : false
		,way : false
		,pos_x : false
		,pos_y : false
		,size : 0
		,start_cur_y_pos : 0
		,now_cur_y_pos : 0
		,is_above : false
		,is_above_now : false

		// $m.smooth_scroll_overflow.construct(IN_ID, IN_WAY)
		,construct : function(in_id, in_way)
		{
			var id = $m.id(in_id);
			
			clearInterval($m.smooth_scroll_overflow.interval);

			$m.smooth_scroll_overflow.scroll_id = id;

			if($m.vd.is_kindle === true)
			{
				$m.smooth_scroll_overflow.scroll_id.scrollTop = (in_way == 'down') ? $m.smooth_scroll_overflow.scroll_id.scrollHeight : 0;
			}

			$m.smooth_scroll_overflow.size = 0;
			$m.smooth_scroll_overflow.pos_y = (in_way == 'down') ? $m.smooth_scroll_overflow.scroll_id.scrollHeight : 0;
			
			$m.smooth_scroll_overflow.size = parseInt(($m.smooth_scroll_overflow.pos_y - $m.smooth_scroll_overflow.scroll_id.scrollTop) / $m.smooth_scroll_overflow.steps);
			$m.smooth_scroll_overflow.interval = setInterval(function(){ $m.smooth_scroll_overflow.exec(); }, 10);
		}

		,exec : function()
		{
			$m.smooth_scroll_overflow.start_cur_y_pos = $m.smooth_scroll_overflow.scroll_id.scrollTop;
			$m.smooth_scroll_overflow.is_above = ($m.smooth_scroll_overflow.start_cur_y_pos < $m.smooth_scroll_overflow.pos_y);
			$m.smooth_scroll_overflow.scroll_id.scrollTop = $m.smooth_scroll_overflow.start_cur_y_pos + $m.smooth_scroll_overflow.size;
			$m.smooth_scroll_overflow.now_cur_y_pos = $m.smooth_scroll_overflow.scroll_id.scrollTop;
			$m.smooth_scroll_overflow.is_above_now = ($m.smooth_scroll_overflow.now_cur_y_pos < $m.smooth_scroll_overflow.pos_y);

			if(($m.smooth_scroll_overflow.is_above != $m.smooth_scroll_overflow.is_above_now) || ($m.smooth_scroll_overflow.start_cur_y_pos == $m.smooth_scroll_overflow.now_cur_y_pos))
			{
				clearInterval($m.smooth_scroll_overflow.interval);
			}
		}
	}


	/**
	 * $m.stop_bubble
	 *
	 */
	,stop_bubble : function(in_event)
	{
		if($m.is.object(in_event) === false)
		{
			var in_event = window.event;
		}
		
		if($m.is.alive(in_event) === false)
		{
			$m.de.add_item("$m.stop_bubble() --- returning false. 'in_event' is dead.");
			return false;
		}

		in_event.cancelBubble = true;
		in_event.returnValue = false;

		if(in_event.stopPropagation)
		{
			in_event.stopPropagation();
			in_event.preventDefault();
		}
	}


	/**
	 * $m.storage
	 *
	 */

	/* --- TODO ---
		- get all records
		- IndexedDB
		- Web SQL

	*/

	,storage :
	{
		 name : "storage"
		,db_magic : "magic_js."
		,db_wand : "wand."

		// $m.storage.construct()
		,construct : function()
		{
			// http://caniuse.com/#feat=indexeddb
			if($m.is.alive(window.webkitIndexedDB) === true)
			{
				$m.storage.indexed_db.available = true;
				$m.storage.indexed_db.init(window.webkitIndexedDB);
			}
			
			if($m.is.alive(window.mozIndexedDB) === true)
			{
				$m.storage.indexed_db.available = true;
				$m.storage.indexed_db.init(window.mozIndexedDB);
			}
			
			if($m.is.alive(window.msIndexedDB) === true)
			{
				$m.storage.indexed_db.available = true;
				$m.storage.indexed_db.init(window.msIndexedDB);
			}

			if($m.is.alive(window.indexedDB) === true)
			{
				$m.storage.indexed_db.available = true;
				$m.storage.indexed_db.init(window.indexedDB);
			}


			// http://caniuse.com/#feat=namevalue-storage
			if($m.is.alive(window.localStorage) === true)
			{
				$m.storage.local.available = true;
			}
			
			
			// http://en.wikipedia.org/wiki/HTTP_cookie
			if($m.vd.cookies_enabled === true)
			{
				$m.storage.cookies.available = true;
			}
	
			return;
		}
	
	
		// $m.storage.compare(IN_COLUMN, IN_OPERATOR, IN_VALUE)
		,compare : function(in_record, in_operator, in_value)
		{
			switch(in_operator)
			{
				case "=":
					if(in_record == in_value)
					{
						return true;
					}
	
					break;
			
				case "!=":
					if(in_record != in_value)
					{
						return true;
					}
	
					break;
				
				case "%":
					if(in_record.match(in_value))
					{
						return true;
					}
	
					break;
				
				case ">":
					if(in_record > in_value)
					{
						return true;
					}
	
					break;
				
				case ">=":
					if(in_record >= in_value)
					{
						return true;
					}
	
					break;
				
				case "<":
					if(in_record < in_value)
					{
						return true;
					}
	
					break;
				
				case "<=":
					if(in_record <= in_value)
					{
						return true;
					}
	
					break;
			}
		
			return false;
		}


		,create :
		{
			// $m.storage.create.data_record(IN_ID, IN_COLUMN, IN_VALUE)
			data_record : function(in_id, in_column, in_value)
			{
				var record_id = $m.storage.create.full_page_id(in_id)
					,data_record = {};

				data_record[record_id] = {};
				data_record[record_id][in_column] = in_value;

				return data_record;
			}
			
			// $m.storage.create.full_page_id(IN_ID)
			,full_page_id : function(in_id)
			{
				return $m.ut.friendly_url(window.location) + "|" + in_id;
			}
		}

	
		// $m.storage.debug(IN_TABLE)
		,debug : function(in_table)
		{
			if($m.is.alive(in_table) === true)
			{
				if($m.is.alive($m.storage.local.available) === true)
				{
					$m.storage.local.debug(in_table);
				}
				else if($m.is.alive($m.storage.cookies.available) === true)
				{
					$m.storage.cookies.debug(in_table);
				}
			}
			else
			{
				$m.de.throw_browser_error("Magic Storage: Missing TABLE NAME argument for $m.storage.debug()");
				return false;
			}	
		}
	
	
		// $m.storage.drop(IN_TABLE)
		,drop : function(in_table)
		{
			if($m.is.alive(in_table) === true)
			{
				if($m.is.alive($m.storage.local.available) === true)
				{
					$m.storage.local.drop(in_table);
				}
				else if($m.is.alive($m.storage.cookies.available) === true)
				{
					$m.storage.cookies.drop(in_table);
				}
			}
			else
			{
				$m.de.throw_browser_error("Magic Storage: Missing TABLE NAME argument for $m.storage.drop()");
				return false;
			}
		}
	
	
		,get :
		{
			// $m.storage.get.page_tiny_id(IN_STRING)
			page_tiny_id : function(in_string)
			{
				return in_string.replace(RegExp($m.ut.friendly_url(window.location) + "\\|", 'gm'), "");
			}
			
			// $m.storage.get.page_code(IN_STRING)
			,page_code : function(in_string)
			{
				var split_string = in_string.split("|");
				
				if($m.is.alive(split_string[0]) === true)
				{
					return split_string[0];
				}
				else
				{
					return false;
				}
			}

			// $m.storage.get.records(IN_TABLE, IN_COLUMN, IN_OPERATOR, IN_VALUE)
			,records : function(in_table, in_column, in_operator, in_value)
			{
				if($m.is.alive(in_table) === false)
				{
					$m.de.throw_browser_error("Magic Storage: Missing TABLE NAME argument for $m.storage.get.records()");
					return false;
				}
				
				if($m.is.alive(in_column) === false)
				{
					$m.de.throw_browser_error("Magic Storage: Missing COLUMN argument for $m.storage.get.records()");
					return false;
				}
			
				if($m.is.alive(in_operator) === false)
				{
					$m.de.throw_browser_error("Magic Storage: Missing OPERATOR argument for $m.storage.get.records()");
					return false;
				}
				
				if($m.is.alive(in_value) === false)
				{
					$m.de.throw_browser_error("Magic Storage: Missing VALUE argument for $m.storage.get.records()");
					return false;
				}
		
				var record_set = [];
		
				if($m.is.alive($m.storage.local.available) === true)
				{
					record_set = $m.storage.local.get(in_table);
				}
				else if($m.is.alive($m.storage.cookies.available) === true)
				{
					record_set = $m.storage.cookies.get(in_table);
				}
		
				var unpacked_records = $m.try_json_unpack(record_set);
			
				if(unpacked_records === false)
				{
					$m.de.throw_browser_error("Magic Storage: Records cannot be unpacked during $m.storage.get.records()");
					return false;
				}
		
				for(var i in unpacked_records)
				{
					for(var j in unpacked_records[i])
					{
						if(j == in_column)
						{
							found_record = $m.storage.compare(unpacked_records[i][j], in_operator, in_value);
						
							if(found_record === true)
							{
								record_set.push(unpacked_records[i]);
							}
						}
					}
				}
		
				if(record_set.length == 0)
				{
					record_set = null;
				}
		
				return record_set;
			}


			// $m.storage.get.table(IN_TABLE)
			,table : function(in_table)
			{
				var record_set = [];
		
				if($m.is.alive($m.storage.local.available) === true)
				{
					record_set = $m.storage.local.get(in_table);
				}
				else if($m.is.alive($m.storage.cookies.available) === true)
				{
					record_set = $m.storage.cookies.get(in_table);
				}
		
				var unpacked_records = $m.try_json_unpack(record_set);
			
				if(unpacked_records === false)
				{
					$m.de.throw_browser_error("Magic Storage: Records cannot be unpacked during $m.storage.get.records()");
					return false;
				}
				
				return unpacked_records;
			}
		}


		// $m.storage.remove(IN_TABLE, IN_ID)
		,remove : function(in_table, in_id)
		{
			if($m.is.alive(in_table) === false)
			{
				$m.de.throw_browser_error("Magic Storage: Missing TABLE NAME argument for $m.storage.remove()");
				return false;
			}
			
			if($m.is.alive(in_id) === false)
			{
				$m.de.throw_browser_error("Magic Storage: Missing ID argument for $m.storage.remove()");
				return false;
			}
			
			var full_id = $m.storage.create.full_page_id(in_id)
				,table_data = false
				,pack_these_records = false;
	
	
			// Fetch any existing records
	
			if($m.is.alive($m.storage.local.available) === true)
			{
				table_data = $m.storage.local.get(in_table);
			}
			else if($m.is.alive($m.storage.cookies.available) === true)
			{
				table_data = $m.storage.cookies.get(in_table);
			}
			
			
			// Update any existing records
			
			if($m.is.alive(table_data) === true)
			{
				var unpacked_records = $m.try_json_unpack(table_data)
					,found_record = false;
				
				if(unpacked_records === false)
				{
					$m.de.throw_browser_error("Magic Storage: Records cannot be unpacked during $m.storage.remove()");
					return false;
				}
	
				for(var i in unpacked_records)
				{
					if(i == full_id)
					{
						delete unpacked_records[i];
					}
				}

				pack_these_records = unpacked_records;


				// Repack and save
			
				var packed_records_latest = $m.try_json_pack(pack_these_records);
			
				if(packed_records_latest === false)
				{
					$m.de.throw_browser_error("Magic Storage: Records cannot be packed during $m.storage.remove()");
					return false;
				}
				else
				{
					if($m.is.alive($m.storage.local.available) === true)
					{
						$m.storage.local.set(in_table, packed_records_latest);
					}
					else if($m.is.alive($m.storage.cookies.available) === true)
					{
						$m.storage.cookies.set(in_table, packed_records_latest);
					}
				}
			}
		}


	
		// $m.storage.set(IN_TABLE, IN_RECORDS)
		,set : function(in_table, in_records)
		{
			if($m.is.alive(in_table) === false)
			{
				$m.de.throw_browser_error("Magic Storage: Missing TABLE NAME argument for $m.storage.set()");
				return false;
			}
			
			if($m.is.alive(in_records) === false)
			{
				$m.de.throw_browser_error("Magic Storage: Missing RECORDS argument for $m.storage.set()");
				return false;
			}
	
			var table_data = false
				,pack_these_records = false;
	
	
			// Fetch any existing records
	
			if($m.is.alive($m.storage.local.available) === true)
			{
				table_data = $m.storage.local.get(in_table);
			}
			else if($m.is.alive($m.storage.cookies.available) === true)
			{
				table_data = $m.storage.cookies.get(in_table);
			}
	
			
			// Update any existing records
	
			if($m.is.alive(table_data) === true)
			{
				var unpacked_records = $m.try_json_unpack(table_data)
					,found_record = false;
				
				if(unpacked_records === false)
				{
					$m.de.throw_browser_error("Magic Storage: Records cannot be unpacked during $m.storage.set()");
					return false;
				}
	
				for(var i in unpacked_records)
				{
					for(var j in in_records)
					{
						if(i == j)
						{
							unpacked_records[i] = in_records[j];
							found_record = true;
						}
					}
	
					if(found_record === false)
					{
						unpacked_records[j] = in_records[j];
					}
					else
					{
						found_record = false;
					}
				}

				pack_these_records = unpacked_records;
			}
			else
			{
				pack_these_records = in_records;
			}
	
	
			// Repack and save
			
			var packed_records_latest = $m.try_json_pack(pack_these_records);
		
			if(packed_records_latest === false)
			{
				$m.de.throw_browser_error("Magic Storage: Records cannot be packed during $m.storage.set()");
				return false;
			}
			else
			{
				if($m.is.alive($m.storage.local.available) === true)
				{
					$m.storage.local.set(in_table, packed_records_latest);
				}
				else if($m.is.alive($m.storage.cookies.available) === true)
				{
					$m.storage.cookies.set(in_table, packed_records_latest);
				}
			}
		}
	
	
		// $m.storage.truncate(IN_TABLE)
		,truncate : function(in_table)
		{
			if($m.is.alive(in_table) === true)
			{
				if($m.is.alive($m.storage.local.available) === true)
				{
					$m.storage.local.truncate(in_table);
				}
				else if($m.is.alive($m.storage.cookies.available) === true)
				{
					$m.storage.cookies.truncate(in_table);
				}
			}
			else
			{
				$m.de.throw_browser_error("Magic Storage: Missing TABLE NAME argument for $m.storage.truncate()");
				return false;
			}
		}



		//////// STORAGE DRIVERS ////////

		// $m.storage.indexed_db
		,indexed_db :
		{
			 available : false
			,driver : false
			 
	
			// BUILD --- $m.storage.indexed_db.debug(IN_TABLE)
			,debug : function(in_table)
			{
				
			}
	
	
			// $m.storage.indexed_db.drop(IN_TABLE)
			,drop : function(in_table)
			{
				window.localStorage.removeItem($m.storage.db_magic + in_table);
			}
			
			
			// $m.storage.indexed_db.get(IN_TABLE)
			,get : function(in_table)
			{
				var table_name = $m.storage.db_magic + in_table
					,table_data = window.localStorage.getItem(table_name);
			
				if($m.is.alive(table_data) === true)
				{
					return table_data;
				}
				else
				{
					return null;
				}
			}


			// $m.storage.indexed_db.init(IN_DRIVER)
			,init : function(in_driver)
			{
				$m.storage.indexed_db.driver = in_driver;
			}
	
	
			// $m.storage.indexed_db.set(IN_TABLE, IN_RECORDS)
			,set : function(in_table, in_records)
			{
				window.localStorage.setItem($m.storage.db_magic + in_table, in_records);
			}
	
	
			// $m.storage.indexed_db.truncate(IN_TABLE)
			,truncate : function(in_table)
			{
				window.localStorage.setItem($m.storage.db_magic + in_table, "");
			}
		}



		// $m.storage.local
		,local :
		{
			 available : false
			 
	
			// BUILD --- $m.storage.local.debug(IN_TABLE)
			,debug : function(in_table)
			{
				
			}
	
	
			// $m.storage.local.drop(IN_TABLE)
			,drop : function(in_table)
			{
				window.localStorage.removeItem($m.storage.db_magic + in_table);
			}
			
			
			// $m.storage.local.get(IN_TABLE)
			,get : function(in_table)
			{
				var table_name = $m.storage.db_magic + in_table
					,table_data = window.localStorage.getItem(table_name);
			
				if($m.is.alive(table_data) === true)
				{
					return table_data;
				}
				else
				{
					return null;
				}
			}
	
	
			// $m.storage.local.set(IN_TABLE, IN_RECORDS)
			,set : function(in_table, in_records)
			{
				window.localStorage.setItem($m.storage.db_magic + in_table, in_records);
			}
	
	
			// $m.storage.local.truncate(IN_TABLE)
			,truncate : function(in_table)
			{
				window.localStorage.setItem($m.storage.db_magic + in_table, "");
			}
		}


		// $m.storage.cookies
		,cookies :
		{
			 available : false
			 
	
			// BUILD --- $m.storage.cookies.debug(IN_TABLE)
			,debug : function(in_table)
			{
				
			}
	
	
			// $m.storage.cookies.drop(IN_TABLE)
			,drop : function(in_table)
			{
				$m.storage.cookies.freeze($m.storage.db_magic + in_table, "", "", -1);
			}
	
	
			// $m.storage.cookies.freeze(IN_TABLE, IN_VALUE, IN_PATH, IN_EXPIRES)
			,freeze : function(in_table, in_value, in_path, in_expires)
			{
				if($m.is.alive(in_value) === false)
				{
					in_value = "";
				}
	
				var new_cookie = escape(in_table) + "=" + escape(in_value);
	
				new_cookie += ";path=";
				new_cookie += ($m.is.alive(in_path) === true) ? in_path : "/";
	
				if($m.is.alive(in_expires) === true)
				{
					var expire_date = new Date();
					expire_date.setTime(expire_date.getTime() + (in_expires * 86400000));
					new_cookie += ";expires=" + expire_date.toGMTString();
				}
	
				document.cookie = new_cookie;
	
				return true;
			}
	
			
			// $m.storage.cookies.get(IN_TABLE)
			,get : function(in_table)
			{
				var table_data = $m.storage.cookies.thaw($m.storage.db_magic + in_table);
			
				if($m.is.alive(table_data) === true)
				{
					return table_data;
				}
				else
				{
					return null;
				}
			}
	
	
			// $m.storage.cookies.set(IN_TABLE, IN_RECORDS)
			,set : function(in_table, in_records)
			{
				$m.storage.cookies.freeze($m.storage.db_magic + in_table, in_records);
			}
	
	
			// $m.storage.cookies.thaw(IN_TABLE)
			,thaw : function(in_table)
			{
				var cookie_item = document.cookie.split("; ")
					,cookie_parts = ""
					,table_name = escape(in_table);
	
				for(var i=0, len=cookie_item.length; i < len; i++)
				{
					cookie_parts = cookie_item[i].split("=");
	
					if(cookie_parts[0] == table_name)
					{
						return unescape(cookie_parts[1]);
					}
				}
				
				return false;
			}
	
	
			// $m.storage.cookies.truncate(IN_TABLE)
			,truncate : function(in_table)
			{
				$m.storage.cookies.freeze($m.storage.db_magic + in_table, "", "", 30);
			}
		}
	}
	

	/**
	 * $m.tag
	 *
	 */
	,tag :
	{
		// $m.tag.get_body(IN_PARENT)
		get_body : function(in_parent)
		{
			var parent = (in_parent == "document") ? document : $m.id(in_parent);

			if($m.is.alive(parent) === false)
			{
				parent = document;
			}
			
			var body_tag = parent.getElementsByTagName("body");
			
			if($m.is.alive(body_tag[0]) === true)
			{
				return body_tag[0];
			}
			else
			{
				return false;
			}
		}
	
		// $m.tag.get_head(IN_PARENT)
		,get_head : function(in_parent)
		{
			var parent = (in_parent == "document") ? document : $m.id(in_parent);

			if($m.is.alive(parent) === false)
			{
				parent = document;
			}
			
			var head_tag = parent.getElementsByTagName("head");
			
			if($m.is.alive(head_tag[0]) === true)
			{
				return head_tag[0];
			}
			else
			{
				return false;
			}
		}
		
		// $m.tag.get_name(IN_ID)
		,get_name : function(in_id)
		{
			var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id;

			if($m.is.alive(id) === false || $m.is.alive(id.nodeName) === false)
			{
				return false;
			}

			return id.nodeName.toLowerCase();
		}
		
		
		// $m.tag.get_iframe_doc(IN_ID)
		,get_iframe_doc : function(in_id)
		{
			if($m.is.alive(in_id) === false)
			{
				$m.de.throw_browser_error("Missing IN_ID argument for $m.tag.get_iframe_doc()");
				return false;
			}
		
			var iframe_id = $m.id(in_id)
				,iframe_doc = false;
	
			try
			{
				if(iframe_id.contentWindow && iframe_id.contentWindow.document)
				{
					iframe_doc = iframe_id.contentWindow.document;
				}
				else if(iframe_id.contentDocument && iframe_id.contentDocument.document)
				{
					iframe_doc = iframe_id.contentDocument.document;
				}
			}
			catch(e) {}
	
			if($m.is.alive(iframe_doc) === true)
			{
				return iframe_doc;
			}
			else
			{
				var new_error = "$m.tag.get_iframe_doc(\"" + in_id + "\") is NOT part of the DOM";
				$m.de.throw_browser_error(new_error);
			
				return false;
			}
		}


		// $m.tag.get_prev_sibling(IN_ID)
		,get_prev_sibling : function(in_id)
		{
			var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id;

			if($m.is.alive(id) === false || $m.is.alive(id.previousSibling) === false)
			{
				return false;
			}

			do id = id.previousSibling;
			while(id && id.nodeType != 1);
			return id;
		}


		// $m.tag.get_next_sibling(IN_ID)
		,get_next_sibling : function(in_id)
		{
			var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id;

			if($m.is.alive(id) === false || $m.is.alive(id.nextSibling) === false)
			{
				return false;
			}

			do id = id.nextSibling;
			while(id && id.nodeType != 1);
			return id;
		}


		// $m.tag.init(TAG_TYPE, ATTRIBUTES)
		,init : function(in_type, in_atts, in_document)
		{
			if($m.is.alive(in_type) === false)
			{
				return false;
			}
			
			if($m.is.alive(in_document) === false)
			{
				in_document = document;
			}

			var new_tag = in_document.createElement(in_type);
			
			if($m.is.alive(in_atts) === true)
			{
				$m.attr.set(new_tag, in_atts);
			}

			return new_tag;
		}

		// $m.tag.create(IN_PARENT, IN_TYPE, IN_ATTS, IN_HTML, IN_WHERE, IN_DOCUMENT)
		,create : function(in_parent, in_type, in_atts, in_html, in_where, in_document)
		{
			if($m.is.alive(in_type) === false)
			{
				return false;
			}
			
			if($m.is.alive(in_document) === false)
			{
				in_document = document;
			}
			
			var new_tag = in_document.createElement(in_type);

			$m.attr.set(new_tag, in_atts);

			if($m.is.object(in_parent) === false)
			{
				in_parent = $m.id(in_parent);
			}
			
			if($m.is.alive(in_where) === true)
			{
				if(in_where === "first")
				{
					in_parent.insertBefore(new_tag, in_parent.firstChild);
				}
				
				if(in_where === "last")
				{
					in_parent.appendChild(new_tag);
				}
			}
			else
			{
				try
				{
					in_parent.appendChild(new_tag);
				}
				catch(e)
				{
					$m.de.throw_browser_error("Unable to appendChild in $m.tag.create() --- failed because " + e);
					return false;
				}
			}
			
			if($m.is.alive(in_html) === true)
			{
				new_tag.innerHTML = in_html
			}

			return new_tag;
		}

		// $m.tag.insert_after(IN_CURRENT_ELE, IN_NEW_ELE)
		,insert_after : function(in_current_ele, in_new_ele)
		{
			if($m.is.alive(in_current_ele) === false || $m.is.alive(in_new_ele) === false)
			{
				return false;
			}
			
			if($m.is.alive(in_current_ele.parentNode) === true)
			{
				if(in_current_ele.nextSibling)
				{
					in_current_ele.parentNode.insertBefore(in_new_ele, in_current_ele.nextSibling);
				}
				else
				{
					in_current_ele.parentNode.appendChild(in_new_ele);
				}
			}
			else
			{
				$m.de.add_item("$m.tag.insert_after() parentNode does not exist");
			}
		}
		
		
		// $m.tag.insert_before(IN_CURRENT_ELE, IN_NEW_ELE)
		,insert_before : function(in_current_ele, in_new_ele)
		{
			if($m.is.alive(in_current_ele) === false || $m.is.alive(in_new_ele) === false)
			{
				return false;
			}
			
			if($m.is.alive(in_current_ele.parentNode) === true)
			{
				if(in_current_ele.previousSibling)
				{
					in_current_ele.parentNode.insertBefore(in_new_ele, in_current_ele);
				}
				else
				{
					in_current_ele.parentNode.appendChild(in_new_ele);
				}
			}
			else
			{
				$m.de.add_item("$m.tag.insert_before() " + in_current_ele + ".parentNode does not exist");
			}
		}

		
		// $m.tag.clone(TAG_ID, DEEP_CLONE)
		,clone : function(in_id, in_deep)
		{
			if($m.is.alive(in_id) === false)
			{
				return false;
			}

			var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id
				,deep = ($m.is.alive(in_deep) === false) ? false : true;

			return id.cloneNode(deep);
		}

		// $m.tag.replace(IN_OLD, IN_NEW)
		,replace : function(in_old, in_new)
		{
			if($m.is.alive(in_old) === false)
			{
				$m.de.throw_browser_error("Missing `in_old` argument for $m.tag.replace()");
				return false;
			}
			
			if($m.is.alive(in_new) === false)
			{
				$m.de.throw_browser_error("Missing `in_new` argument for $m.tag.replace()");
				return false;
			}
			
			var old_element = ($m.is.string(in_old) === true) ? $m.id(in_old) : in_old;
			

			if($m.is.alive(old_element.parentNode) === false)
			{
				$m.de.throw_browser_error("`old_element.parentNode does not exist for $m.tag.replace()");
				return false;
			}
			
			try
			{
				var new_element = old_element.parentNode.replaceChild(in_new, old_element);
				return new_element;
			}
			catch(e)
			{
				$m.de.throw_browser_error("Unable to replace nodes in $m.tag.replace() --- failed because " + e);
				return false;
			}
		}


		// $m.tag.remove(TAG_ID)
		,remove : function(in_id)
		{
			if($m.is.alive(in_id) === false)
			{
				return false;
			}

			var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id
				,returnd_val = false;
			
			try
			{
				returnd_val = id.parentNode.removeChild(id);
			}
			catch(e)
			{
				returnd_val = false;
			}

			return returnd_val;
		}


		// $m.tag.remove_children(TAG_ID)
		,remove_children : function(in_id)
		{
			if($m.is.alive(in_id) === false)
			{
				return false;
			}

			var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id
				,removed_kids = [];

			while(id.hasChildNodes())
			{
				removed_kids.push(id.removeChild(id.lastChild));
			}

			return removed_kids;
		}


		// $m.tag.html(IN_ID, IN_CONTENT, IN_HOW, IN_ENCODED)
		,html : function(in_id, in_content, in_how, in_encoded)
		{
			if($m.is.alive(in_id) === false)
			{
				$m.de.throw_fatal("$m.tag.html(`" + in_id + "`) --- failed because the argument does not exist");
				return false;
			}

			if($m.is.alive(in_how) === false)
			{
				in_how = "replace";
			}
			
			if($m.is.alive(in_encoded) === false)
			{
				in_encoded = false;
			}
			
			if(in_encoded !== false)
			{
				in_content = decodeURIComponent(in_content);
			}

			var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id;
			
			if(id.value !== undefined && $m.tag.get_name(id) != "li")
			{
				if(in_how == "append")
				{
					id.value += in_content;
				}
				else if(in_how == "prepend")
				{
					id.value = in_content + id.value;
				}
				else
				{
					id.value = in_content;
				}
			}
			else
			{
				var fragment = document.createDocumentFragment()
					,frag_div = fragment.appendChild(document.createElement("div"))
					,final_cont = "";

				if($m.is.object(in_content) === true)
				{
					var tmp_objects = [];

					for(var i=0, len=in_content.length; i < len; i++)
					{
						tmp_objects.push(in_content[i]);
					}
					
					for(var i=0, len=tmp_objects.length; i < len; i++)
					{
						frag_div.appendChild(tmp_objects[i]);
					}
				}
				else
				{
					frag_div.innerHTML = in_content;
				}

				if($m.is.alive(frag_div.childNodes) === true)
				{
					if(in_how == "replace")
					{
						$m.tag.remove_children(id);
					}
					
					if(in_how == "prepend")
					{
						var first_original_child = id.firstChild;
					}

					for(var i=0, len=frag_div.childNodes.length; i < len; i++)
					{
						if(in_how == "prepend")
						{
							id.insertBefore(frag_div.childNodes[i].cloneNode(true), first_original_child);
						}
						else
						{
							id.appendChild(frag_div.childNodes[i].cloneNode(true));
						}
					}
				}

				$m.tag.remove(fragment);
			}
		}
	}


	/**
	 * $m.tags
	 *
	 */
	,tags :
	{
		// $m.tags.get(IN_PARENT, IN_TAG)
		get : function(in_parent, in_tag)
		{
			var parent = (in_parent == "document") ? document : $m.id(in_parent);

			if($m.is.alive(parent) === false)
			{
				parent = document;
			}
	
			return parent.getElementsByTagName(in_tag.toUpperCase());
		}

		// $m.tags.strip
		,strip:
		{
			// $m.tags.strip.from_cont(IN_CONT)
			from_cont : function(in_cont)
			{
				return in_cont.replace(/<\/?[^>]+(>|$)/g, "");
			}

			// $m.tags.strip.from_id(IN_ID)
			,from_id : function(in_id)
			{
				return $m.id(in_id).innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
			}
		}

		// $m.tags.remove
		,remove :
		{
			// $m.tags.remove.these
			these : []
			
			// $m.tags.remove.exec()
			,exec : function()
			{
				var removed_count = 0
					did_work = false;
			
				for(var i=0, len = $m.tags.remove.these.length; i < len; i++)
				{
					did_work = ($m.is.alive($m.tags.remove.these[i]) === true) ? $m.tag.remove($m.tags.remove.these[i]) : false;

					if(did_work !== false)
					{
						removed_count++;
					}
				}
				
				return removed_count;
			}
		
			// $m.tags.remove.empty
			,empty :
			{
				// $m.tags.remove.empty.has_good_children
				has_good_children : false
				
				// $m.tags.remove.empty.construct(TAG_ID)
				,construct : function(in_id)
				{
					if($m.is.alive(in_id) === false)
					{
						return false;
					}
		
					var id = ($m.is.string(in_id) === true) ? $m.id(in_id) : in_id
						removed_cnt = 0;
					
					$m.tags.remove.empty.populate(id);
					removed_cnt = $m.tags.remove.exec();
					$m.tags.remove.these = [];
					
					return removed_cnt;
				}
			
				// $m.tags.remove.empty.populate(IN_ELE)
				,populate : function(in_ele)
				{
					//$m.de.add_item("++++++++++++++++++++++++++ remove_empty_exe(" + in_ele + ") +++++++++++++");
			
					var children = in_ele.childNodes
						,len = in_ele.childNodes.length;
					
					//$m.de.add_item("len " + in_ele + " = " + len);
					
					for(var i=0; i < len; i++)
					{
						$m.tags.remove.empty.has_good_children = false;
					
						var child = children[i];
					
						//$m.de.add_item("++++++++++++ '" + in_ele.id + "' child[" + i + "] = " + child);
						//$m.de.add_item("++++++ child[" + i + "].nodeName = " + child.nodeName + " (id: '" + child.id + "') ");
			
						if(child.hasChildNodes())
						{
							//$m.de.add_item(child.id + " -  has child nodes");
							$m.tags.remove.empty.populate(child);
						}
						else
						{
							//$m.de.add_item(child.id + " - no child nodes");
						}

						if($m.is.alive(child.nodeName) === true && $m.is.in_array($m.html_singletons, child.nodeName.toLowerCase()) === false)
						{
							//$m.de.add_item(child.id + " - not singleton");
						
							if(child.textContent == "" || child.innerText == "")
							{
								if($m.tags.remove.empty.has_good_children === false)
								{
									//$m.de.add_item(child + " should be removed");
									$m.tags.remove.these.push(child);
								}
								else
								{
									$m.tags.remove.empty.has_good_children = true;
									//$m.de.add_item(in_ele.id + " has good children and " + child + " should NOT be removed");
								}
							}
							else
							{
								//$m.de.add_item(child + " - should NOT be removed");
							}
						}
						else
						{
							$m.tags.remove.empty.has_good_children = true;
							//$m.de.add_item(child.id + " - singleton");
						}
					}
				}
			}
		}
	}


	/**
	 * $m.track
	 *
	 */
	,track :
	{
		/**
		 * $m.track.ga(IN_PARAMS)
		 *
		 * @param {object} in_params Various options for how Google Analytics records the entry
		 */
		ga : function(in_params)
		{
			if($m.is.alive(in_params) === false)
			{
				return false;
			}

			if(typeof pageTracker == "object" && typeof pageTracker._trackPageview == "function")
			{
				pageTracker._trackEvent(in_params.category, in_params.action, in_params.label);
			}
			else if(typeof _gaq == "object")
			{
				_gaq.push(['_trackEvent', in_params.category, in_params.action, in_params.label])
			}

			setTimeout(function()
			{
				return;
			}, 100);
		}
	}


	/**
	 * $m.trim
	 *
	 */
	,trim : function(in_string)
	{
		return in_string.replace(/^\s+|\s+$/g, "");
	}


	/**
	 * $m.try_json_pack
	 *
	 */
	,try_json_pack : function(in_string)
	{
		try
		{
			return JSON.stringify(in_string);
		}
		catch(e)
		{
			return false;
		}
	}
	
	
	/**
	 * $m.try_json_unpack
	 *
	 */
	,try_json_unpack : function(in_string)
	{
		try
		{
			return JSON.parse(in_string);
		}
		catch(e)
		{
			return false;
		}
	}


	/**
	 * $m.ut
	 *
	 */
	,ut :
	{
		// $m.ut.add_commas(IN_STRING) - http://www.mredkj.com/javascript/nfbasic.html
		add_commas : function(in_string)
		{
			if($m.is.alive(in_string) === false)
			{
				return false;
			}
			
			in_string = in_string.replace(/,/g, '') + '';
			
			var x = in_string.split('.')
				,x1 = x[0]
				,x2 = x.length > 1 ? '.' + x[1] : ''
				,rgx = /(\d+)(\d{3})/;
			
			while(rgx.test(x1))
			{
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}

			return x1 + x2;
		}

		// $m.ut.array_unique(IN_ARRAY)
		,array_unique : function(in_array)
		{
			if($m.is.alive(in_array) === false)
			{
				return false;
			}
		
			var r = [];

			o:for(var i=0, ia_len=in_array.length; i < ia_len; i++)
			{
				for(var x=0, y=r.length; x < y; x++)
				{
					if(r[x] == in_array[i])
					{
						continue o;
					}
				}
				
				r[r.length] = in_array[i];
			}
			
			return r;
		}


		// $m.ut.friendly_url(IN_STRING)
		,friendly_url : function(in_string)
		{
			if($m.is.alive(in_string) === false)
			{
				return false;
			}
			
			// Make sure it's a string
			var stringed_string = in_string.toString(in_string)
				,tmp_val = "";

			// Make it lowercase and trim both ends
			tmp_val = $m.trim(stringed_string.toLowerCase());
			
			// Strip common entities like curly quotes
			var common_entities = [8216, 8217, 8220, 8221]
				,replace_entities = "";
			
			for(var i=0, len=common_entities.length; i < len; i++)
			{
				replace_entities = new RegExp(String.fromCharCode(common_entities[i]), 'gm');
				tmp_val = tmp_val.replace(replace_entities, "");
			}
			
			// Remove single quotes so we don't go from How's Your Day to how_s_your_day
			tmp_val = tmp_val.replace(/'+/g, "");
	
			// Replace any non-alphanumeric character with an underscore
			tmp_val = tmp_val.replace(/[^\w]+/g, "_");
	
			// Strip underscores on the ends
			tmp_val = tmp_val.replace(/^_+|_+$/g, "");
		
			return tmp_val;
		}


		// $m.ut.obj_merge(OB_1, OB_2)
		,obj_merge : function(ob_1, ob_2)
		{
			if($m.is.alive(ob_1) === false || $m.is.alive(ob_2) === false)
			{
				return false;
			}
	
			for (var p in ob_2)
			{
				try
				{
					ob_2[p].constructor == Object ? ob_1[p] = $m.ut.obj_merge(ob_1[p], ob_2[p]) : ob_1[p] = ob_2[p];
				}
				catch(e)
				{
					ob_1[p] = ob_2[p];
				}
			}
		
			return ob_1;
		}
	
		// $m.ut.set_prop_to_val(IN_OBJECT, IN_PROPERTY_NAME, IN_VALUE)
		,set_prop_to_val : function(in_object, in_property_name, in_value)
		{
			if($m.is.alive(in_object) === false || $m.is.alive(in_property_name) === false || $m.is.alive(in_value) === false)
			{
				return false;
			}
	
			in_object[in_property_name] = in_value;
		}
	
		// $m.ut.dash_space_to_underscore(IN_STRING)
		,dash_space_to_underscore : function(in_string)
		{
			if($m.is.alive(in_string) === false)
			{
				return false;
			}
	
			return in_string.replace(/[\-\s]/g, '_');
		}
	
		// $m.ut.dash_underscore_to_space(IN_STRING)
		,dash_underscore_to_space : function(in_string)
		{
			if($m.is.alive(in_string) === false)
			{
				return false;
			}
	
			return in_string.replace(/[\-_\s]/g, ' ');
		}
		
		// $m.ut.dash_underscore_space_to_slash(IN_STRING)
		,dash_underscore_space_to_slash : function(in_string)
		{
			if($m.is.alive(in_string) === false)
			{
				return false;
			}
	
			return in_string.replace(/[\-_\s]/g, '\/');
		}
	
		// $m.ut.initial_uppercase(IN_STRING)
		,initial_uppercase : function(in_string)
		{
			if($m.is.alive(in_string) === false)
			{
				return false;
			}
	
			return in_string.replace(/([A-Za-z]+)/g, function(m, l)
			{
				return l.substr(0,1).toUpperCase() + l.toLowerCase().substr(1,l.length);
			});
		}
		
		// $m.ut.uppercase_first(IN_STRING)
		,uppercase_first : function(in_string)
		{
			if($m.is.alive(in_string) === false)
			{
				return false;
			}
	
			in_string.toLowerCase();
			return in_string.substr(0, 1).toUpperCase() + in_string.substr(1);
		}
	
		// $m.ut.decode_entities(IN_DATA)
		,decode_entities : function(in_data)
		{
			if($m.is.alive(in_data) === false)
			{
				return "";
			}
		
			var tmp_div = document.createElement("div");
			tmp_div.innerHTML = in_data;
		
			if(tmp_div.firstChild === null || tmp_div.firstChild.nodeValue === null)
			{
				return "";
			}
			else
			{
				return tmp_div.firstChild.nodeValue;
			}
		}
		
		// $m.ut.rand_num(IN_LENGTH)
		,rand_num : function(in_length)
		{
			if($m.is.alive(in_length) === false)
			{
				in_length = 10;
			}
	
			var rand_dig = ""
				,rand_str = "";
		
			for(var i=0; i < in_length; i++)
			{
				rand_dig = Math.floor(Math.random() * 10);
				rand_str += rand_dig + "";
			}
		
			return rand_str;
		}
	}


	/**
	 * $m.vd
	 *
	 */
	,vd :
	{
		 name : "visitor_data"
		,browser : false
			,version : "?"
			,version_major : "?"
		,screen_height : false
		,screen_width : false
		,screen_depth : false
		,visible_page_height : false
		,visible_page_width : false
		,scrolled_left : false
		,scrolled_top : false
		,total_page_height : false
		,total_page_width : false
		,cookies_enabled : false
		
		// $m.vd.ua
		,ua : navigator.userAgent
		,is_mobile_touch : false

		,is_online : true

	
		//// Operating Systems
		
		// Windows
		,match_windows : "Windows"
		,is_windows : false
		
		// Macintosh
		,match_macintosh : "Macintosh"
		,is_macintosh : false
		
		// Linux
		,match_linux : "Linux"
		,is_linux : false
	
		// iPhone
		,match_iphone : "iPhone"
		,is_iphone : false
		
		// iPad
		,match_ipad : "iPad"
		,is_ipad : false
		
		// Android
		,match_android : "Android"
		,is_android : false
		
		// webOS
		,match_webos : "webOS"
		,is_webos : false
		
		// Blackberry
		,match_blackberry : "BlackBerry"
		,is_blackberry : false
	
		// Maemo
		,match_maemo : "Tablet browser"
		,is_maemo : false
		
		// Kindle
		,match_kindle : "Kindle"
		,is_kindle : false
	
		// Nintendo Wii
		,match_wii : "Nintendo Wii"
		,is_wii : false
	
		//// Web Browsers

		// MSIE
		,match_trident : "Trident"
		,is_trident : false
	
		// MSIE
		,match_msie : "MSIE"
		,is_msie : false
		,is_msie6_or_lower : false
			,match_msie6 : "MSIE 6"
			,is_msie6 : false
			,is_msie6_or_lower : false
				,match_msie7 : "MSIE 7"
				,is_msie7 : false
				,is_msie7_or_lower : false
					,match_msie8 : "MSIE 8"
					,is_msie8 : false
					,is_msie8_or_lower : false
						,match_msie9 : "MSIE 9"
						,is_msie9_or_lower : false
						,is_msie9 : false

		// Mozilla Gecko
		,match_gecko : "Gecko"
		,is_gecko : false
	
			// Mozilla Firefox
			,match_firefox : "Firefox"
			,is_firefox : false
			
			,match_firefox2 : "Firefox/2"
			,is_firefox2 : false
		
			,match_firefox3 : "Firefox/3"
			,is_firefox3 : false
	
			,match_firefox3_5 : "Firefox/3.5"
			,is_firefox3_5 : false
			
			,match_firefox3_6 : "Firefox/3.6"
			,is_firefox3_6 : false
			
			,match_firefox4 : "Firefox/4"
			,is_firefox4 : false
	
		// Webkit
		,match_webkit : "AppleWebKit"
		,is_webkit : false
		
			// Apple Safari
			,match_safari : "Safari"
			,is_safari : false
			
				// Mobile Safari
				,match_mobile_safari : "Mobile Safari"
				,is_mobile_touch_safari : false
			
			// Google Chrome
			,match_chrome : "Chrome"
			,is_chrome : false
	
			// Palm Pre Browser
			,match_pre : "Pre/1.0"
			,is_pre : false
	
		// Opera
		,match_opera : "Opera"
		,is_opera : false
	

		,construct : function()
		{
			var version_offset = "";
			
			this.is_online = (navigator.onLine && navigator.onLine === true) ? true : false;

			//// Operating Systems
			
			// Windows
			if(this.ua.match(this.match_windows))
			{
				this.is_windows = true;
			}
	
			// Macintosh
			if(this.ua.match(this.match_macintosh))
			{
				this.is_macintosh = true;
			}
			
			// Linux
			if(this.ua.match(this.match_linux))
			{
				this.is_linux = true;
			}
	
			// iPhone
			if(this.ua.match(this.match_iphone))
			{
				this.is_iphone = true;
				this.is_mobile_touch = true;
			}
			
			// iPad
			if(this.ua.match(this.match_ipad))
			{
				this.is_ipad = true;
				this.is_mobile_touch = true;
			}
				
			// Android
			if(this.ua.match(this.match_android))
			{
				this.is_android = true;
				this.is_mobile_touch = true;
			}
			
			// webOS
			if(this.ua.match(this.match_webos))
			{
				this.is_webos = true;
				this.is_mobile_touch = true;
			}
			
			// BlackBerry
			if(this.ua.match(this.match_blackberry))
			{
				this.is_blackberry = true;
				this.is_mobile_touch = true;
				this.browser = this.match_blackberry;
			}
	
			// Maemo
			if(this.ua.match(this.match_maemo))
			{
				this.is_maemo = true;
				this.is_mobile_touch = true;
				this.browser = this.match_maemo;
			}
	
			// Kindle
			if(this.ua.match(this.match_kindle))
			{
				this.is_kindle = true;
				this.is_mobile_touch = true;
				this.browser = this.match_kindle;
			}
			
			// Nintendo Wii
			if(this.ua.match(this.match_wii))
			{
				this.is_wii = true;
				this.is_mobile_touch = true;
				this.browser = this.match_wii;
			}
	
			//// Web Browsers
	
			// Opera
			if((version_offset = this.ua.indexOf("Opera")) != -1)
			{
				this.is_opera = true;
				this.browser = this.match_opera;
				this.version = parseFloat(this.ua.substring(version_offset + 6));
				this.version_major = parseInt('' + this.version);
			}

			// Tridents
			if(this.ua.match(this.match_trident))
			{
				this.is_trident = true;
			}
	
			// Geckos
			if(this.ua.match(this.match_gecko))
			{
				this.is_gecko = true;
				this.browser = this.match_gecko;
	
				if(this.ua.match(this.match_firefox))
				{
					this.is_firefox = true;
					this.browser = this.match_firefox;
				}
	
				if(this.ua.match(this.match_firefox2))
				{
					this.is_firefox2 = true;
					this.browser = this.match_firefox2;
				}
	
				if(this.ua.match(this.match_firefox3))
				{
					this.is_firefox3 = true;
					this.browser = this.match_firefox3;
				}
				
				if(this.ua.match(this.match_firefox3_5))
				{
					this.is_firefox3 = false;
					this.is_firefox3_5 = true;
					this.browser = this.match_firefox3_5;
				}
				
				if(this.ua.match(this.match_firefox3_6))
				{
					this.is_firefox3 = false;
					this.is_firefox3_5 = false;
					this.is_firefox3_6 = true;
					this.browser = this.match_firefox3_6;
				}
				if(this.ua.match(this.match_firefox4))
				{
					this.is_firefox4 = true;
					this.browser = this.match_firefox4;
				}
	
			}
	
			// WebKits
			if(this.ua.match(this.match_webkit))
			{
				this.is_gecko = false;
				this.is_webkit = true;
				this.browser = this.match_webkit;
	
				if(this.ua.match(this.match_safari))
				{
					this.is_safari = true;
					this.browser = this.match_safari;
				}
	
				if(this.ua.match(this.match_mobile_safari))
				{
					this.is_safari = false;
					this.is_mobile_touch = true;
					this.browser = this.match_mobile_safari;
				}
	
				if(this.ua.match(this.match_chrome))
				{
					this.is_safari = false;
					this.is_chrome = true;
					this.browser = this.match_chrome;
				}
	
				if(this.ua.match(this.match_pre))
				{
					this.is_safari = false;
					this.is_pre = true;
					this.is_mobile_touch = true;
					this.browser = this.match_pre;
				}
			}
	
			// Tridents
			if((version_offset = this.ua.indexOf("MSIE")) != -1)
			{
				this.is_msie = true;
				this.is_msie6_or_lower = false;
				this.is_msie7_or_lower = false;
				this.is_msie8_or_lower = false;
				this.is_msie9_or_lower = false;
				this.browser = this.match_msie;
	
				this.version = parseFloat(this.ua.substring(version_offset + 5));
				this.version_major = parseInt('' + this.version);
				
				if(this.ua.match(this.match_msie6))
				{
					this.is_msie9_or_lower = true;
					this.is_msie8_or_lower = true;
					this.is_msie7_or_lower = true;
					this.is_msie6 = true;
					this.browser = this.match_msie6;
				}
				
				if(this.ua.match(this.match_msie7))
				{
					this.is_msie9_or_lower = true;
					this.is_msie8_or_lower = true;
					this.is_msie7 = true;
					this.is_msie7_or_lower = true;
					this.browser = this.match_msie7;
				}
	
				if(this.ua.match(this.match_msie8))
				{
					this.is_msie9_or_lower = true;
					this.is_msie8 = true;
					this.is_msie8_or_lower = true;
					this.browser = this.match_msie8;
				}
				
				if(this.ua.match(this.match_msie9))
				{
					this.is_msie9 = true;
					this.is_msie9_or_lower = true;
					this.browser = this.match_msie8;
				}
	
				$m.fix_msie();
			}
			
			if("ontouchstart" in document.documentElement)
			{
				this.is_mobile_touch = true;
			}
	
			this.screen_height = screen.height;
			this.screen_width = screen.width;
			this.screen_depth = screen.colorDepth;
			this.cookies_enabled = navigator.cookieEnabled;
		}
	
		// $m.vd.get_view_port()
		,get_view_port : function()
		{
			// http://www.jr.pl/www.quirksmode.org/viewport/compatibility.html
			
			// The height of the page that we can actually see
			$m.vd.visible_page_height = (document.documentElement && document.documentElement.clientHeight) || window.innerHeight || self.innerHeight || document.body.clientHeight;
			
			// The width of the page that we can actually see
			$m.vd.visible_page_width = (document.documentElement && document.documentElement.clientWidth) || window.innerWidth || self.innerWidth || document.body.clientWidth;
			
			// How far we have scrolled the page from the left
			$m.vd.scrolled_left = (document.documentElement && document.documentElement.scrollLeft) || window.pageXOffset || self.pageXOffset || document.body.scrollLeft;
			
			// How far we have scrolled the page from the top
			$m.vd.scrolled_top = (document.documentElement && document.documentElement.scrollTop) || window.pageYOffset || self.pageYOffset || document.body.scrollTop;
			
			// The height of the whole page
			$m.vd.total_page_height = (document.documentElement && document.documentElement.scrollHeight) ? document.documentElement.scrollHeight : (document.body.scrollHeight > document.body.offsetHeight) ? document.body.scrollHeight : document.body.offsetHeight;
			
			// The width of the whole page
			$m.vd.total_page_width = (document.documentElement && document.documentElement.scrollWidth) ? document.documentElement.scrollWidth : (document.body.scrollWidth > document.body.offsetWidth) ? document.body.scrollWidth : document.body.offsetWidth;
		}
	}


	/**
	 * When the DOM is ready, call $m.execute() - $m.when_ready()
	 *
	 */
	,when_ready : function()
	{
		if(document.addEventListener)
		{
			document.addEventListener("DOMContentLoaded", $m.execute, false);
		}

		$m.win.bind("load", function() { $m.execute(); });
	}


	/**
	 * $m.win
	 *
	 */
	,win :
	{
		// $m.win.bind(EVENT, FUNCTION_REFERENCE);
		bind : function(in_handler, in_function) // Adapted from: http://simonwillison.net/2004/May/26/addLoadEvent/
		{
			var handler = "on" + in_handler
				,old_function = window[handler];
			
			if(typeof window[handler] == "function")
			{
				window[handler] = function(e)
				{
					old_function(e);
					in_function(e);
				}
			}
			else
			{
				window[handler] = in_function;
			}
		}
	}

}


// http://helephant.com/2007/05/12/diy-javascript-stack-trace/

Function.prototype.trace = function()
{
	var stack = []
		,trace = '<ul>'
		,current = this
		,timer = "";

	while(current)
	{
		timer = ((new Date().getTime() - $m.timer) / 1000) + ""

		if(timer.length == 3)
		{
			timer += '00';
		}
		else if(timer.length == 4)
		{
			timer += '0';
		}
		
		stack.push(timer + " | " + current.signature());

		current = current.caller;
	}
	
	stack.shift();

	for(var i=0, len=stack.length; i < len; i++)
	{
		trace += "<li>" + stack[i] + "</li>";
	}

	trace += "</ul>";

	return trace;
}

Function.prototype.signature = function()
{
	var signature =
	{
		 name: this.getName()
		,params: []
		,toString: function()
		{
			var params = this.params.length > 0 ? "'" + this.params.join("', '") + "'" : "";
			return this.name + "(" + params + ")";
		}
	};

	if(this.arguments)
	{
		for(var x=0, len=this.arguments.length; x < len; x++)
		{
			signature.params.push(this.arguments[x]);
		}
	}

	return signature;
}

Function.prototype.getName = function()
{
	if(this.name)
	{
		return this.name;
	}

	var definition = this.toString().split("\n")[0]
		,exp = /^function ([^\s(]+).+/;

	if(exp.test(definition))
	{
		return definition.split("\n")[0].replace(exp, "$1") || "anonymous";
	}

	return "anonymous";
}


$m.when_ready();
