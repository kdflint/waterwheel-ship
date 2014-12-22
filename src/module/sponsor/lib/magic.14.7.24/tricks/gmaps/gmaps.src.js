/***************************************************************************
- File: gmaps.js
- Version: 14.7.16
- java -jar compiler2.jar --js gmaps.src.js --js_output_file gmaps.VERSION.js

http://universimmedia.pagesperso-orange.fr/geo/loc.htm

https://developers.google.com/maps/documentation/javascript/tutorial

***************************************************************************/

$m.trick.gmaps = {};

$m.t.gmaps =
{
	 name : "gmaps"
	,data_att : "gmaps"
	,data_att_config : "data-mjf_gmaps"
	,google_maps_js_link : "https://maps.googleapis.com/maps/api/js?v=3.exp&callback=$m.t.gmaps.init"
	,all_maps : {}
	,info_window : false


	/**
	 * Main constructor for trick -- $m.t.gmaps.construct(in_params)
	 * 
	 */
	,construct : function(in_params)
	{
		if($m.is.alive(in_params) === false)
		{
			$m.de.throw_browser_error("Gmaps: $m.trick.gmaps.config not declared!");
			return false;
		}

		var good_maps = $m.attr.get_tags_with($m.tags.all, $m.data_att, $m.t.gmaps.data_att)
			,gmap_id = ""
			,gmap_json = ""
			,gmap_config = ""
			,json_ajax = ""
			,found_json = false;

		for(var i=0, len=good_maps.length; i < len; i++)
		{
			gmap_id = $m.attr.get(good_maps[i], "id");
			gmap_config_string = $m.attr.get(good_maps[i], $m.t.gmaps.data_att_config);
			gmap_json = $m.try_json_unpack(gmap_config_string);

			if(gmap_json === false)
			{
				$m.de.throw_browser_error("Gmaps: Config cannot be unpacked during $m.t.gmaps.init()");
				continue;
			}

			$m.t.gmaps.all_maps[gmap_id] = {};

			if($m.is.alive(gmap_json.config.json_file) === true)
			{
				json_ajax = new $m.ajax();
				json_ajax.init(gmap_id);
				json_ajax.config.url = gmap_json.config.json_file;
				json_ajax.config.callback = "handle_json"
				json_ajax.exec();

				found_json = true;
			}

			if($m.is.alive(gmap_json.config.json_var) === true)
			{
				var internal_json = window[gmap_json.config.json_var];

				if($m.is.object(internal_json) === true)
				{
					$m.t.gmaps.all_maps[gmap_id].json = internal_json;
				}
				else
				{
					$m.de.throw_browser_error("Gmaps: JSON var is not formatted correctly");
				}

				found_json = true;
			}

			if(found_json === true)
			{
				$m.t.gmaps.all_maps[gmap_id].config = gmap_json.config;
			}
			else
			{
				$m.de.throw_browser_error("Gmaps: JSON file or var cannot be found during $m.t.gmaps.construct()");
			}
		}

		this.config = in_params.config;

		if($m.is.alive(this.config.api_key) === true)
		{
			this.google_maps_js_link += "&key=" + this.config.api_key;
		}

		$m.insert_link.script(this.google_maps_js_link);
	}


	/**
	 *  -- $m.t.gmaps.init()
	 * 
	 */
	,init : function()
	{
		var gmap_id = ""
			,gmap_config = ""
			,google_map = ""
			,lat = ""
			,lon = ""
			,html = "";

		for(var i in $m.t.gmaps.all_maps)
		{
			gmap_id = i;
			this_gmap = $m.t.gmaps.all_maps[i];

			$m.t.gmaps.all_maps[i].google_map = new google.maps.Map($m.id(gmap_id),
			{
				 zoom : this_gmap.config.zoom
				,center : new google.maps.LatLng(this_gmap.config.start_lat, this_gmap.config.start_lon)
			});

			if($m.is.alive(this_gmap.json) === true)
			{
				for(var j in this_gmap.json.markers)
				{
					$m.t.gmaps.markers.create(gmap_id, this_gmap.json.markers[j], this_gmap.json.format_function);
				}
			}
		}
	}


	/**
	 *  -- $m.t.gmaps.markers
	 * 
	 */
	,markers : 
	{
		// $m.t.gmaps.markers.create(in_gmap, in_json, in_format_function);
		create : function(in_gmap, in_json, in_format_function)
		{
			var marker_lat_lon = new google.maps.LatLng(in_json.Latitude, in_json.Longitude)
				,marker_options = {
					 position : marker_lat_lon
					,map : $m.t.gmaps.all_maps[in_gmap].google_map
					,title : in_json.Name
				}
				,info_html = window[in_format_function](in_json);

			if($m.t.gmaps.all_maps[in_gmap].config.animate)
			{
				marker_options.animation = google.maps.Animation.DROP;
			}

			var marker = new google.maps.Marker(marker_options)
				,info_window = new google.maps.InfoWindow({ content : info_html });

			google.maps.event.addListener(marker, 'click', function()
			{
				if($m.t.gmaps.info_window)
				{
					$m.t.gmaps.info_window.close();
				}

				info_window.open($m.t.gmaps.all_maps[in_gmap].google_map, marker);

				$m.t.gmaps.info_window = info_window;
			});

			marker.setMap($m.t.gmaps.all_maps[in_gmap].google_map);

			$m.t.gmaps.all_maps[in_gmap].marker = marker;
			$m.t.gmaps.all_maps[in_gmap].info_window = info_window;
		}
	}


	/**
	 *  -- $m.t.gmaps.handle_json(in_id, in_response_text)
	 * 
	 */
	,handle_json : function(in_id, in_response_text)
	{
		var external_json = $m.try_json_unpack(in_response_text);

		if(external_json === false)
		{
			$m.de.throw_browser_error("Gmaps: JSON file cannot be unpacked during $m.t.gmaps.handle_json()");
		}
		else
		{
			$m.t.gmaps.all_maps[in_id].json = external_json;
		}
	}
}


function handle_json(in_ajax)
{
	$m.t.gmaps.handle_json(in_ajax.config.element_id, in_ajax.request.response_text);
}

