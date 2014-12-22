/***************************************************************************
- File: magic_charts.js
- Version: 12.11.21
- java -jar compiler2.jar --js magic_charts.src.js --js_output_file magic_charts.VERSION.js
***************************************************************************/

/*
	References
	- https://developer.mozilla.org/en/Drawing_Graphics_with_Canvas
*/

$m.trick.magic_charts = {};

$m.t.magic_charts =
{
	 name : "magic_charts"
	,wand : false
	
	,svg_code_intro : '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" style="height:100%;width:100%;"'

	,colors : [ // $m.t.magic_charts.colors[]
		 "#007ABD"
		,"#38A818"
		,"#EE3C0D"
		,"#E9ED00"
		,"#00C1E0"
		,"#47E256"
		,"#FF803E"
		,"#FFF043"
		,"#4AFBB4"
		,"#9FD6FF"
		,"#C0C0C0"
	]

	/**
	 * Main constructor for trick -- $m.t.magic_charts.construct()
	 * 
	 */
	,construct : function(in_wand)
	{
		$m.t.magic_charts.themes.current = {};
		
		/*
		$m.win.bind("resize", function()
		{
			setTimeout(function()
			{
				$m.t.magic_charts.render.construct($m.trick.magic_charts.render);
			}, 500);
		});
		*/
		
		return;
	}


	// $m.t.magic_charts.render
	,render :
	{
		// $m.t.magic_charts.render.construct(IN_WAND)
		construct : function(in_wand)
		{
			if($m.is.alive(in_wand) === false)
			{
				$m.de.throw_browser_error("Magic Charts: Missing `wand` argument for $m.t.magic_charts.render.construct()");
				return false;
			}	

			var tmp_chart = false
				,tmp_type = false;
		
			for(var i=0, len=in_wand.length; i < len; i++)
			{
				for(var j in in_wand[i])
				{
					if(j == "chart")
					{
						tmp_chart = in_wand[i][j];
					}
					
					if(j == "type")
					{
						tmp_type = in_wand[i][j];
					}
				}
				
				if($m.is.alive($m.t.magic_charts[tmp_type]) === true && $m.is.alive($m.t.magic_charts[tmp_type][tmp_chart]) === true)
				{
					$m.t.magic_charts[tmp_type][tmp_chart](in_wand[i]);
				}
				else if($m.is.alive($m.t.magic_charts[tmp_type]) === false)
				{
					new_error = "Magic Charts: type `" + tmp_type + "` is not supported";
					$m.de.throw_browser_error(new_error);
				}
				else if($m.is.alive($m.t.magic_charts[tmp_type][tmp_chart]) === false)
				{
					new_error = "Magic Charts: chart `" + tmp_chart + "` is not supported";
					$m.de.throw_browser_error(new_error);
				}

				tmp_chart = false;
				tmp_type = false;
			}
		}
	}







	// $m.t.magic_charts.svg
	,svg :
	{
		// $m.t.magic_charts.svg.column(IN_PARAMS)
		column : function(in_params)
		{
			if($m.is.alive(in_params) === false)
			{
				$m.de.throw_browser_error("Magic Charts: Missing `params` argument for $m.t.magic_charts.svg.column()");
				return false;
			}
	
			var config = {}
				,svg_parent = in_params.parent_id + "_svg_parent"
				,svg_id = in_params.parent_id + "_svg_column"
				
				,chart_height_style = in_params.dimensions.height
				,chart_height = parseInt(in_params.dimensions.height) - 40
				
				,chart_width_style = in_params.dimensions.width
				,chart_width = 0
				
				,data = in_params.data
				,data_sets = 0
				
				,min_value = 0
				,max_value = 0
				,current_value = 0
	
				,b = 0
				
				,total_lines = 0
				,column_height = 0
	
				,start_x = 50
				,start_y = 20
				
				,x_start = 0
				,y_start = 0
	
				,final_width = 0
				
				,animate_cols_grow = ""
				,animate_cols_opaque = ""
				
				,name = ""
				,value = ""
				,height = ""
				,column_color = ""
				,text_color = ""
	
				,final_code = $m.t.magic_charts.svg_code_intro + ' id="' + svg_id + '">';

			if($m.is.good_id(svg_parent) === false)
			{
				$m.tag.create(in_params.parent_id, "div",
				{
					 "style" : "height:" + chart_height_style + ";width:" + chart_width_style + ";"
					,"id" : svg_parent
				});
			}
			
			svg_parent_id = $m.id(svg_parent);
			
			chart_width = svg_parent_id.offsetWidth - 60;
	
			config = $m.t.magic_charts.set_config(in_params);
	
	
			// Count the datasets and determine min_value/max_value
			for(var i in data)
			{
				for(var j in data[i])
				{
					if(j == "value")
					{
						current_value = parseInt(data[i][j]);
						
						if(current_value > max_value)
						{
							max_value = current_value;
						}
						
						if(current_value < min_value)
						{
							min_value = current_value;
						}
					}
	
					data_sets++;
				}
			}
	
			if($m.is.alive(config.y_axis.min_value) === true)
			{
				min_value = config.y_axis.min_value;
			}
			
			if($m.is.alive(config.y_axis.max_value) === true)
			{
				max_value = config.y_axis.max_value;
			}
			
			console.log("min_value = " + min_value);
			console.log("max_value = " + max_value);
			
	
	
	
			// Set scaling
			var scaling_factor = chart_height / (max_value - min_value);
	
	
	
	
			// Draw the x-axis bars and the y-axis increments
			var total_lines = Math.ceil((max_value - min_value) / config.y_axis.increments)
				,spacing = parseInt(chart_height / total_lines)
				,bar_xaxis_y_pos = start_y
				,xaxis_marker_value = max_value
				
				,zero_baseline = 0;
	
	
	
			for(var i=0; i <= total_lines; i++)
			{
				// Draw the x-axis bars
				final_code += $m.t.magic_charts.svg.draw("rect",
				{
					 "x" : start_x
					,"y" : bar_xaxis_y_pos
					,"width" : chart_width
					,"height" : 0.5
					,"fill" : config.x_axis.bars_color
				});
	
				// Draw the increments
				final_code += $m.t.magic_charts.svg.draw("text",
				{
					 "x" : start_x - 5
					,"y" : bar_xaxis_y_pos + 4
					,"fill" : config.text.color
					,"font-family" : config.text.family
					,"font-size" : config.text.size
					,"font-weight" : config.text.weight
					,"text-anchor" : "end"
				}, xaxis_marker_value);
				
				if(i == total_lines)
				{
					bar_xaxis_y_pos = chart_height + start_y;
				}
				else
				{
					bar_xaxis_y_pos += spacing;
				}
				
				xaxis_marker_value -= config.y_axis.increments;
				
				if(xaxis_marker_value == 0)
				{
					zero_baseline = bar_xaxis_y_pos;
				}
				
				//console.log("bar_xaxis_y_pos = " + bar_xaxis_y_pos);
				//console.log("zero_baseline = " + zero_baseline);
				
			}
			
			
			
	
	
			// Draw the y-axis title
			final_code += $m.t.magic_charts.svg.draw("text",
			{
				 "x" : 2
				,"y" : chart_height / 2
				,"fill" : config.text.color
				,"font-family" : config.text.family
				,"font-size" : config.text.size + 5
				,"font-weight" : config.text.weight
				,"transform" : "rotate(-90, 20, " + chart_height / 2 + ")"
				,"text-anchor" : "middle"
				
			}, config.y_axis.title);
	




			// Draw the data
			for(var i in data)
			{
				name = (config.x_axis.show_names === true) ? i : ""
				value = 0;
				column_color = config.columns.color;
				text_color = config.text.color;
	
				for(var j in data[i])
				{
					if(j == "value")
					{
						value = data[i][j];
					}
					
					if(j == "color")
					{
						text_color = data[i][j];
					}
					
					if(j == "fill")
					{
						column_color = data[i][j];
					}
				}
	
				
	
				if(config.columns.width == "auto")
				{
					x_start = (start_x + config.columns.margin)  + (b * (chart_width / data_sets));
					final_width = parseInt(chart_width / data_sets - config.columns.margin);
				}
				else
				{
					x_start = (start_x + config.columns.margin) + (b * (config.columns.width + config.columns.margin));
					final_width = config.columns.width;
				}
	
				
				
				if(value > 0)
				{
					console.log("value is positive");

					column_height = value * scaling_factor;
					y_start = chart_height - column_height + start_y;
				}
				else
				{
					console.log("value is negative");
					
					column_height = Math.abs(value) * scaling_factor;
					y_start = chart_height + start_y;
					
				}
				
				
				
	
				if($m.is.alive(config.animations.use) === true)
				{
					animate_cols_grow = $m.t.magic_charts.svg.get_animation("width", 0, final_width, config.animations.duration);
					animate_cols_opaque  = $m.t.magic_charts.svg.get_animation("opacity", 1, 0.7, "0.1s", "mouseover");
					animate_cols_opaque += $m.t.magic_charts.svg.get_animation("opacity", 0.7, 1, "0.1s", "mouseout");
				}
	
	
				// Draw the columns
				final_code += $m.t.magic_charts.svg.draw("rect",
				{
					 "x" : x_start
					,"y" : y_start
					,"width" : final_width
					,"height" : column_height
					,"fill" : column_color
				}, animate_cols_grow + animate_cols_opaque);
	
	
				// Draw the value
				final_code += $m.t.magic_charts.svg.draw("text",
				{
					 "x" : x_start + (final_width / 2)
					,"y" : y_start - 4
					,"fill" : text_color
					,"font-family" : config.text.family
					,"font-size" : config.text.size
					,"font-weight" : config.text.weight
					,"text-anchor" : "middle"
				}, value);
	
	
				// Draw the name
				final_code += $m.t.magic_charts.svg.draw("text",
				{
					 "x" : x_start + (final_width / 2)
					,"y" : chart_height + 32
					,"fill" : text_color
					,"font-family" : config.text.family
					,"font-size" : config.text.size
					,"font-weight" : config.text.weight
					,"text-anchor" : "middle"
					
				}, name);
	
	
				b++;
			}
			
			svg_parent_id.innerHTML = final_code + "</svg>";
		}
	
	
	
	
	
		// $m.t.magic_charts.svg.draw(IN_SHAPE, IN_ATTRIBUTES, IN_HTML)
		,draw : function(in_shape, in_attributes, in_html)
		{
			if($m.is.alive(in_shape) === false)
			{
				$m.de.throw_browser_error("Magic Charts: Missing `shape` argument for $m.t.magic_charts.svg.draw()");
				return false;
			}
			
			if($m.is.alive(in_attributes) === false)
			{
				$m.de.throw_browser_error("Magic Charts: Missing `attributes` argument for $m.t.magic_charts.svg.draw()");
				return false;
			}
			
			var new_shape = "<" + in_shape + $m.t.magic_charts.svg.set_attributes(in_attributes);
			new_shape += ($m.is.alive(in_html) === true) ? ">" + in_html + "</" + in_shape + ">" : " />";
	
			return new_shape;
		}
	
	
		// $m.t.magic_charts.svg.set_attributes(IN_ATTRIBUTES)
		,set_attributes : function(in_attributes)
		{
			if($m.is.alive(in_attributes) === false)
			{
				$m.de.throw_browser_error("Magic Charts: Missing `attributes` argument for $m.t.magic_charts.svg.set_attributes()");
				return false;
			}
	
			var attributes_string = "";
		
			for(var i in in_attributes)
			{
				attributes_string += ' ' + i + '="' + in_attributes[i] + '"';
			}
			
			return attributes_string;
		}
	
	
		// $m.t.magic_charts.svg.get_animation(IN_ATTRIBUTE, IN_FROM, IN_TO, IN_DURATION)
		,get_animation : function(in_attribute, in_from, in_to, in_duration, in_begin, in_end)
		{
			if($m.is.alive(in_attribute) === false)
			{
				$m.de.throw_browser_error("Magic Charts: Missing `attribute` argument for $m.t.magic_charts.svg.get_animation()");
				return false;
			}
			
			if($m.is.alive(in_from) === false)
			{
				in_from = "0";
			}
			
			if($m.is.alive(in_to) === false)
			{
				in_to = "100%";
			}
			
			if($m.is.alive(in_duration) === false)
			{
				in_duration = "0.5s";
			}
	
			var animation_string = '<animate attributeName="' + in_attribute + '" from="' + in_from + '" to="' + in_to + '" dur="' + in_duration + '"';
		
			if($m.is.alive(in_begin) === true)
			{
				animation_string += ' begin="' + in_begin + '"';
			}
			
			if($m.is.alive(in_end) === true)
			{
				animation_string += ' end="' + in_end + '"';
			}
			
			if($m.vd.is_webkit === true)
			{
				animation_string += ' keyTimes="0.0; 0.7" calcMode="spline" keySplines=".5 0 .5 1"';
			}
			
			return animation_string + '" fill="freeze" />';
		}

	}




	// $m.t.magic_charts.canvas
	,canvas :
	{
		/**
		 * Vertical bar chart -- $m.t.magic_charts.canvas.column
		 * Adapted from http://www.multicians.org/thvv/vbar.html
		 *
		 */
		column : function(in_params)
		{
			if($m.is.alive(in_params) === false)
			{
				$m.de.throw_browser_error("Magic Charts: Missing `params` argument for $m.t.magic_charts.canvas.column()");
				return false;
			}

			

			
			/*
			if($m.is.alive(in_params) === false || $m.is.alive(in_params.data) === false)
			{
				return false;
			}
	
			var canvas_id = $m.id(in_params.canvas_id);
	
			if($m.is.alive(canvas_id) === false && !canvas_id.getContext)
			{
				return false;
			}

			if($m.is.alive(in_params.background_color) === false)
			{
				in_params.background_color = "#fff";
			}
			
			if($m.is.alive(in_params.bar_color) === false)
			{
				in_params.bar_color = "maroon";
			}
			
			if($m.is.alive(in_params.bar_margin) === false)
			{
				in_params.bar_margin = 5;
			}
			
			if($m.is.alive(in_params.bar_width) === false)
			{
				in_params.bar_width = 50;
			}
			
			if($m.is.alive(in_params.text_color) === false)
			{
				in_params.text_color = "#262626";
			}
			

			// Init settings for x-axis

			if(in_params.x_axis_data_lines === false)
			{
				in_params.x_axis_data_lines = false;
			}
			else if($m.is.alive(in_params.x_axis_data_lines) === false)
			{
				in_params.x_axis_data_lines = true;
			}
			else if(in_params.x_axis_data_lines === true)
			{
				in_params.x_axis_data_lines = true;
			}

			if($m.is.alive(in_params.x_axis_color) === false)
			{
				in_params.x_axis_color = "#c0c0c0";
			}
			
			if($m.is.alive(in_params.x_axis_width) === false)
			{
				in_params.x_axis_width = 2.0;
			}
			
			if(in_params.x_axis_width === "none")
			{
				in_params.x_axis_width = 0.000001;
			}

			if(in_params.x_show_names === false)
			{
				in_params.x_show_names = false;
			}
			else if($m.is.alive(in_params.x_show_names) === false)
			{
				in_params.x_show_names = true;
			}
			else if(in_params.x_show_names === true)
			{
				in_params.x_show_names = true;
			}
			
			in_params.x_show_values = ($m.is.alive(in_params.x_show_values) === false) ? false : true;


			// Init settings for y-axis

			if($m.is.alive(in_params.y_axis_color) === false)
			{
				in_params.y_axis_color = "#c0c0c0";
			}
			
			if($m.is.alive(in_params.y_axis_width) === false)
			{
				in_params.y_axis_width = 2.0;
			}

			if(in_params.y_axis_width === "none")
			{
				in_params.y_axis_width = 0.000001;
			}
			
			if(in_params.y_show_increments === false)
			{
				in_params.y_show_increments = false;
			}
			else if($m.is.alive(in_params.y_show_increments) === false)
			{
				in_params.y_show_increments = true;
			}
			else if(in_params.y_show_increments === true)
			{
				in_params.y_show_increments = true;
			}
			
			if($m.is.alive(in_params.y_increments) === false)
			{
				in_params.y_increments = 50;
			}
			*/


			var config = {}
				,canvas_parent = in_params.parent_id + "_canvas_parent"
				,canvas_id = in_params.parent_id + "_canvas_column"
				
				,chart_height_style = in_params.dimensions.height
				,chart_height = parseInt(in_params.dimensions.height) - 40
			
				,chart_width_style = in_params.dimensions.width
				,chart_width = 0;


			config = $m.t.magic_charts.set_config(in_params);

			if($m.is.good_id(canvas_parent) === false)
			{
				var parent_id = $m.tag.create(in_params.parent_id, "div",
				{
					 "style" : "height:" + chart_height_style + ";width:" + chart_width_style + ";border:1px solid red;"
					,"id" : canvas_parent
				});

			
				if($m.is.good_id(canvas_id) === false)
				{
					$m.tag.create(canvas_parent, "canvas",
					{
						 "style" : "height:100%;width:100%;border:1px solid blue;"
						,"id" : canvas_id
					});
				}
			}

			var canvas_element_id = $m.id(canvas_id)
				,ctx = canvas_element_id.getContext("2d")
				,data = in_params.data
				,data_sets = 0
				
				,max_value = 0
				,current_value = 0



				;

			/*
			var canvas_id = $m.id(config.canvas_id)
			 	,ctx = canvas_id.getContext("2d")
				,data = config.data
				,chart_height = (canvas_id.height - 20)
				,y_increments = config.y_increments
				,start_x = (config.y_show_increments === true) ? 35 : -1
				,start_y = 380
				,bar_width = config.bar_width
				,max_value = 0
				,marker_value = 0
				,j = 0
				,values = ""
				,name = ""
				,height = "";
			*/
			
			
			// Count the datasets and determine max_value
			for(var i in data)
			{
				for(var j in data[i])
				{
					if(j == "value")
					{
						current_value = parseInt(data[i][j]);
						
						if(current_value > max_value)
						{
							max_value = current_value;
						}
					}
	
					data_sets++;
				}
			}
	
			if($m.is.alive(config.y_axis.max_value) === true)
			{
				max_value = config.y_axis.max_value;
			}

			
			
			// Set scaling
			var scaling_factor = chart_height / max_value;
			
			


			/*
			ctx.fillStyle = config.background_color;
			ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);


			// Get max value
			for(var i=0, len=data.length; i < len; i++)
			{
				values = data[i].split(":");
	
				if(parseInt(values[1]) > parseInt(max_value))
				{
					max_value = values[1];
				}
			}
			*/


			
			
			
			
			
			/*
			// Init the x-axis
			ctx.strokeStyle = config.x_axis_color;
			ctx.lineWidth = config.x_axis_width ;
			

			// Add data markers to the y-axis
			ctx.textAlign = "right";
			ctx.fillStyle = config.text_color;

			var number_markers = Math.ceil(max_value / y_increments);
			for(var i=0; i < number_markers; i++)
			{
				if(config.y_show_increments === true)
				{
					ctx.fillText(marker_value, (start_x - 5), (chart_height - marker_value + 3), 50);
				}
				
				if(config.x_axis_data_lines === true)
				{
					$m.t.magic_charts.draw.line(ctx, start_x, (chart_height - marker_value), ctx.canvas.width, (chart_height - marker_value));
				}

				marker_value += y_increments;
			}

			// Draw the data
			for(var i=0, len=data.length; i < len; i++)
			{
				j = j + config.bar_margin;
				values = data[i].split(":");
				
				name = "";

				if(config.x_show_names === true)
				{
					name += values[0];
				}
				
				if(config.x_show_names === true && config.x_show_values === true)
				{
					name += ": ";
				}
				
				if(config.x_show_values === true)
				{
					name += values[1];
				}
				
				height = parseInt(values[1]);

				ctx.fillStyle = ($m.is.alive(values[2]) === true) ? values[2] : config.bar_color;

				$m.t.magic_charts.draw.rect(ctx, start_x + (i * bar_width) + j, (chart_height - height), bar_width, height, true);

				ctx.textAlign = "left";
				ctx.fillStyle = config.text_color;
				ctx.fillText(name, start_x + (i * bar_width) + j + 1, chart_height + 14, 200);
			}	


			// Draw the y-axis
			ctx.strokeStyle = config.y_axis_color;
			ctx.lineWidth = config.y_axis_width ;
			$m.t.magic_charts.draw.line(ctx, start_x, start_y, start_x, 0);
			*/

		}






	
		/**
		 * Pie chart -- $m.t.magic_charts.pie
		 * Adapted from http://www.multicians.org/thvv/pie.html
		 *
		 */
		,pie :
		{
			 name : "pie"
			,data_att : "pie"
	
			/**
			 * Pie chart constructor -- $m.t.magic_charts.canvas.pie.construct(in_wand)
			 * 
			 * @param {array} parameters
			 */
			,construct : function(in_wand)
			{
				for(var i=0, len=in_wand.length; i < len; i++)
				{
					$m.t.magic_charts.canvas.pie.draw(in_wand[i]);
				}
			}
	
			/**
			 * Draws a pie chart -- $m.t.magic_charts.canvas.pie.draw(in_params)
			 * 
			 * @param {object} parameters
			 */
			,draw : function(in_params)
			{
				if($m.is.alive(in_params) === false || $m.is.alive(in_params.data) === false)
				{
					return false;
				}
		
				var canvas_id = $m.id(in_params.canvas_id);
		
				if($m.is.alive(canvas_id) === false && !canvas_id.getContext)
				{
					return false;
				}
	
				if($m.is.alive(in_params.text_color) === false)
				{
					in_params.text_color = "#000";
				}
				
				if($m.is.alive(in_params.text_style) === false)
				{
					in_params.text_style = "bold 13px sans-serif";
				}
	
				var canvas_id = $m.id(in_params.canvas_id)
				 	,ctx = canvas_id.getContext("2d")
					,data = in_params.data
					,radius = (Math.min(canvas_id.width, canvas_id.height) / 2) * .9
					,centered = { x : canvas_id.width / 2, y : canvas_id.height / 2 }
					,current = 0
					,cur_val = 0
					,value = 0
					,total = 0
					,pie_data = []
					,pie_titles = []
					,pie_colors = []
					,j = 15;
	
				canvas_id.width = canvas_id.width + 150;
	
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
				ctx.font = in_params.text_style;
				ctx.strokeStyle = "#fff";
				ctx.lineWidth = 2;
	
				for(var i=0, len=data.length; i < len; i++)
				{
					values = data[i].split(":");
					value = parseFloat(values[1]);
					total += value;
	
					pie_data[pie_data.length] = value;
					pie_colors[pie_colors.length] = ($m.is.alive(values[2]) === true) ? values[2] : $m.t.magic_charts.colors[i];
					pie_titles[pie_titles.length] = values[0];
				}
	
				for(var i=0, len=pie_data.length; i < len; i++)
				{
					cur_val = pie_data[i] / total;
	
					ctx.beginPath();
					ctx.moveTo(centered.x, centered.y);
					ctx.arc(
						 centered.x
						,centered.y
						,radius
						,Math.PI * (- 0.65 + 2 * current) // -0.5 sets the start to be top
						,Math.PI * (- 0.65 + 2 * (current + cur_val))
						,false
					);
	
					ctx.lineTo(centered.x, centered.y);
					ctx.closePath();
					ctx.stroke();
	
					ctx.fillStyle = pie_colors[i];
					ctx.fill();
	
					current += cur_val;
	
					ctx.fillText("•", canvas_id.height + 10, j * 2);
					ctx.fillStyle = in_params.text_color;
					ctx.fillText(Math.floor(100 * cur_val) + "%" + " " + pie_titles[i], canvas_id.height + 22, j * 2);
					
					j += 10;
				}
			}
		}
	
	
		/**
		 * Line graph -- $m.t.magic_charts.line_graph
		 * Adapted from http://www.worldwidewhat.net/2011/06/draw-a-line-graph-using-html5-canvas/
		 *
		 */
		,line_graph :
		{
			 name : "line_graph"
			,data_att : "line_graph"
			,x_padding : 30
			,y_padding : 30
	
			/**
			 * Line graph constructor -- $m.t.magic_charts.canvas.line_graph.construct(in_wand)
			 * 
			 * @param {array} parameters
			 */
			,construct : function(in_wand)
			{
				for(var i=0, len=in_wand.length; i < len; i++)
				{
					$m.t.magic_charts.canvas.line_graph.draw(in_wand[i]);
				}
			}
	
	
			/**
			 * DOES SOMETHING -- $m.t.magic_charts.canvas.line_graph.get_x_pixel(in_val, in_width)
			 * 
			 * @param {int} in_val
			 * @param {int} in_width
			 */
			,get_x_pixel : function(in_val, in_width)
			{
				return ((in_width - $m.t.magic_charts.canvas.line_graph.x_padding) / $m.t.magic_charts.canvas.line_graph.draw.chart_data_len) * in_val + ($m.t.magic_charts.canvas.line_graph.x_padding * 1.5);
			}
	
	
			/**
			 * DOES SOMETHING -- $m.t.magic_charts.canvas.line_graph.get_y_pixel(in_val, in_height)
			 * 
			 * @param {int} in_val
			 * @param {int} in_height
			 */
			,get_y_pixel : function(in_val, in_height)
			{
				var max_y = $m.t.magic_charts.canvas.line_graph.get_max_y();
				return in_height - (((in_height - $m.t.magic_charts.canvas.line_graph.y_padding) / max_y) * in_val) - $m.t.magic_charts.canvas.line_graph.y_padding;
			}
	
	
			/**
			 * DOES SOMETHING -- $m.t.magic_charts.canvas.line_graph.get_max_y()
			 * 
			 * 
			 */
			,get_max_y : function()
			{
				var max = 0;
	
				for(var i=0; i < $m.t.magic_charts.canvas.line_graph.draw.chart_data_len; i ++)
				{
					if($m.t.magic_charts.canvas.line_graph.draw.chart_data[i] > max)
					{
						max = $m.t.magic_charts.canvas.line_graph.draw.chart_data[i];
					}
				}
	
				max += 10 - max % 10;
				
				return max;
			}
	
	
			/**
			 * Draws a line graph chart -- $m.t.magic_charts.canvas.line_graph.draw(in_params)
			 * 
			 * @param {object} parameters
			 */
			,draw : function(in_params)
			{
				if($m.is.alive(in_params) === false || $m.is.alive(in_params.data) === false)
				{
					return false;
				}
		
				var canvas_id = $m.id(in_params.canvas_id);
		
				if($m.is.alive(canvas_id) === false && !canvas_id.getContext)
				{
					return false;
				}
	
				if($m.is.alive(in_params.dot_color) === false)
				{
					in_params.dot_color = "#333";
				}
				
				if($m.is.alive(in_params.line_color) === false)
				{
					in_params.line_color = "#f00";
				}
				
				if($m.is.alive(in_params.text_color) === false)
				{
					in_params.text_color = "#333";
				}
	
				if($m.is.alive(in_params.text_style) === false)
				{
					in_params.text_style = "normal 12px sans-serif";
				}
				
				if($m.is.alive(in_params.y_increments) === false)
				{
					in_params.y_increments = 10;
				}
	
				var canvas_id = $m.id(in_params.canvas_id)
				 	,ctx = canvas_id.getContext("2d")
					,data = in_params.data
					,data_len = data.length
					,y_increments = in_params.y_increments
					,values = [];
	
				$m.t.magic_charts.canvas.line_graph.draw.chart_data = [];
				$m.t.magic_charts.canvas.line_graph.draw.chart_data_len = data.length;
	
				ctx.fillStyle = "#fff";
				ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
				ctx.lineWidth = 2;
				ctx.strokeStyle = "#333"; // axis colors
				ctx.font = in_params.text_style;
				ctx.textAlign = "center";
				
				// Draw the axises
				ctx.beginPath();
				ctx.moveTo($m.t.magic_charts.canvas.line_graph.x_padding, 0);
				ctx.lineTo($m.t.magic_charts.canvas.line_graph.x_padding, canvas_id.height - $m.t.magic_charts.canvas.line_graph.y_padding);
				ctx.lineTo(canvas_id.width, canvas_id.height - $m.t.magic_charts.canvas.line_graph.y_padding);
				ctx.stroke();
	
				ctx.fillStyle = in_params.text_color;
	
				// Split the data and draw the X values
				for(var i=0; i < $m.t.magic_charts.canvas.line_graph.draw.chart_data_len; i++)
				{
					values = data[i].split(":");
					$m.t.magic_charts.canvas.line_graph.draw.chart_data.push(parseInt(values[1]));
					ctx.fillText(values[0], $m.t.magic_charts.canvas.line_graph.get_x_pixel(i, canvas_id.width), canvas_id.height - $m.t.magic_charts.canvas.line_graph.y_padding + 20);
				}
	
				ctx.fillStyle = in_params.text_color;
	
				// Draw the Y value texts
				ctx.textAlign = "right"
				ctx.textBaseline = "middle";
	
				var max_y = $m.t.magic_charts.canvas.line_graph.get_max_y();
	
				for(var i = 0; i < max_y; i += y_increments)
				{
					ctx.fillText(i, $m.t.magic_charts.canvas.line_graph.x_padding - 10, $m.t.magic_charts.canvas.line_graph.get_y_pixel(i, canvas_id.height));
				}
				
				ctx.strokeStyle = in_params.line_color;
				
				// Draw the line graph
				ctx.beginPath();
				ctx.moveTo($m.t.magic_charts.canvas.line_graph.get_x_pixel(0, canvas_id.width), $m.t.magic_charts.canvas.line_graph.get_y_pixel($m.t.magic_charts.canvas.line_graph.draw.chart_data[0], canvas_id.height));
				
				for(var i = 1; i < $m.t.magic_charts.canvas.line_graph.draw.chart_data_len; i ++)
				{
					ctx.lineTo($m.t.magic_charts.canvas.line_graph.get_x_pixel(i, canvas_id.width), $m.t.magic_charts.canvas.line_graph.get_y_pixel($m.t.magic_charts.canvas.line_graph.draw.chart_data[i], canvas_id.height));
				}
				
				ctx.stroke();
	
				// Draw the dots
				ctx.fillStyle = in_params.dot_color;
				
				for(var i = 0; i < $m.t.magic_charts.canvas.line_graph.draw.chart_data_len; i ++)
				{  
					ctx.beginPath();
					ctx.arc($m.t.magic_charts.canvas.line_graph.get_x_pixel(i, canvas_id.width), $m.t.magic_charts.canvas.line_graph.get_y_pixel($m.t.magic_charts.canvas.line_graph.draw.chart_data[i], canvas_id.height), 4, 0, Math.PI * 2, true);
					ctx.fill();
				}
	
			}
		}
	
	
		,draw : 
		{
			/**
			 * Draws a line on a canvas ctx from the start point to the end point  -- $m.t.magic_charts.draw.line(in_ctx, in_start_x, in_start_y, in_end_x, in_end_y)
			 *
			 * @param {object} in_ctx
			 * @param {int} in_start_x
			 * @param {int} in_start_y
			 * @param {int} in_end_x
			 * @param {int} in_end_y
			 */
			line : function(in_ctx, in_start_x, in_start_y, in_end_x, in_end_y)
			{
				in_ctx.beginPath();
				in_ctx.moveTo(in_start_x, in_start_y);
				in_ctx.lineTo(in_end_x, in_end_y);
				in_ctx.closePath();
				in_ctx.stroke();
			}
	
	
			/**
			 * Draws a rectangle on a canvas ctx using the dimensions specified  -- $m.t.magic_charts.draw.rect(in_ctx, in_x, in_y, in_w, in_h, in_fill)
			 *
			 * @param {object} in_ctx
			 * @param {int} in_x
			 * @param {int} in_y
			 * @param {int} in_w
			 * @param {int} in_h
			 * @param {bool} in_fill
			 */
			,rect : function(in_ctx, in_x, in_y, in_w, in_h, in_fill)
			{
				in_ctx.beginPath();
				in_ctx.rect(in_x, in_y, in_w, in_h);
				in_ctx.closePath();
				//in_ctx.stroke();
	
				if(in_fill)
				{
					in_ctx.fill();
				}
			}
		}



	}






	// $m.t.magic_charts.set_config(IN_PARAMS)
	,set_config : function(in_params)
	{
		// Init settings for theme
		if($m.is.alive(in_params.theme) === true && $m.is.alive($m.t.magic_charts.themes[in_params.theme]) === true)
		{
			$m.t.magic_charts.themes.current = $m.t.magic_charts.themes[in_params.theme];
		}
		else
		{
			$m.t.magic_charts.themes.current = $m.t.magic_charts.themes.basic;
		}


		// Init settings for animations
		if($m.is.alive(in_params.animations) === true)
		{
			if($m.is.alive(in_params.animations.use) === false)
			{
				in_params.animations.use = true;
			}
			
			if($m.is.alive(in_params.animations.duration) === false)
			{
				in_params.animations.duration = "0.25s";
			}
		}
		else
		{
			in_params.animations = {};
			in_params.animations.use = true;
			in_params.animations.duration = "0.25s";
		}


		// Init settings for columns
		if($m.is.alive(in_params.columns) === true)
		{
			if($m.is.alive(in_params.columns.color) === false)
			{
				in_params.columns.color = $m.t.magic_charts.themes.current.columns.color;
			}
			
			if($m.is.alive(in_params.columns.margin) === false)
			{
				in_params.columns.margin = $m.t.magic_charts.themes.current.columns.margin;
			}
			
			if($m.is.alive(in_params.columns.width) === false)
			{
				in_params.columns.width = $m.t.magic_charts.themes.current.columns.width;
			}
		}
		else
		{
			in_params.columns = {};
			in_params.columns.color = $m.t.magic_charts.themes.current.columns.color;
			in_params.columns.margin = $m.t.magic_charts.themes.current.columns.margin;
			in_params.columns.width = $m.t.magic_charts.themes.current.columns.width;
		}


		// Init settings for text
		if($m.is.alive(in_params.text) === true)
		{
			if($m.is.alive(in_params.text.color) === false)
			{
				in_params.text.color = $m.t.magic_charts.themes.current.text.color;
			}
			
			if($m.is.alive(in_params.text.family) === false)
			{
				in_params.text.family = $m.t.magic_charts.themes.current.text.family;
			}
			
			if($m.is.alive(in_params.text.size) === false)
			{
				in_params.text.size = $m.t.magic_charts.themes.current.text.size;
			}
			
			if($m.is.alive(in_params.text.size) === false)
			{
				in_params.text.weight = $m.t.magic_charts.themes.current.text.weight;
			}
		}
		else
		{
			in_params.text = {};
			in_params.text.color = $m.t.magic_charts.themes.current.text.color;
			in_params.text.family = $m.t.magic_charts.themes.current.text.family;
			in_params.text.size = $m.t.magic_charts.themes.current.text.size;
			in_params.text.weight = $m.t.magic_charts.themes.current.text.weight;
		}


		// Init settings for x-axis
		if($m.is.alive(in_params.x_axis) === true)
		{
			if($m.is.alive(in_params.x_axis.bars_color) === false)
			{
				in_params.x_axis.bars_color = "#c0c0c0";
			}
		
			if(in_params.x_axis.show_names === false)
			{
				in_params.x_axis.show_names = false;
			}
			else if($m.is.alive(in_params.x_axis.show_names) === false)
			{
				in_params.x_axis.show_names = true;
			}
			else if(in_params.x_axis.show_names === true)
			{
				in_params.x_axis.show_names = true;
			}
			
			if(in_params.x_axis.show_values === false)
			{
				in_params.x_axis.show_values = false;
			}
			else if($m.is.alive(in_params.x_axis.show_values) === false)
			{
				in_params.x_axis.show_values = true;
			}
			else if(in_params.x_axis.show_values === true)
			{
				in_params.x_axis.show_values = true;
			}
		}
		else
		{
			in_params.x_axis = {};
			in_params.x_axis.bars_color = "#c0c0c0";
			in_params.x_axis.show_names = true;
			in_params.x_axis.show_values = true;
		}


		// Init settings for y-axis
		if($m.is.alive(in_params.y_axis) === true)
		{
			if($m.is.alive(in_params.y_axis.title) === false)
			{
				in_params.y_axis.title = "";
			}

			if($m.is.alive(in_params.y_axis.increments) === false)
			{
				in_params.y_axis.increments = 10;
			}
		}
		else
		{
			in_params.y_axis = {};
			in_params.y_axis.title = "";
			in_params.y_axis.increments = 10;
		}
		
		
		return in_params;
	}
}


















