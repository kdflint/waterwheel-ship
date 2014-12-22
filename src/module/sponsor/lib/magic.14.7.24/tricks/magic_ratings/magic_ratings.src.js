/***************************************************************************
- File: magic_ratings.js
- Version: 13.4.22
- java -jar compiler2.jar --js magic_ratings.src.js --js_output_file magic_ratings.VERSION.js
***************************************************************************/

$m.trick.magic_ratings = {};

$m.t.magic_ratings =
{
	 name : "magic_ratings"

	/**
	 * Main constructor for trick -- $m.t.magic_ratings.construct()
	 * 
	 */
	,construct : function(in_wand)
	{
		return;
	}


	/**
	 *  -- $m.t.magic_ratings.links
	 * 
	 */
	,links :
	{
		 name : "links"
		,data_att : "magic_rating_links"
		,data_att_state : "data-mjf_magic_ratings_state"
		,data_att_parent : "data-mjf_magic_ratings_parent"
		,data_att_value : "data-mjf_magic_ratings_value"
		,data_att_click : "magic_ratings_links_click"
		,groups : []


		// $m.t.magic_ratings.links.construct()
		,construct : function(in_var)
		{
			this.groups = [];
		
			var rating_containers = $m.attr.get_tags_with($m.tags.all, $m.data_att, this.data_att)
				,current_container = ""
				,group_anchors = []
				,all_anchors = []
				,current_css = ""
				,has_parent = false;

			for(var i=0, len=rating_containers.length; i < len; i++)
			{
				current_container = $m.attr.get(rating_containers[i], "id");

				if($m.is.array(this.groups[current_container]) === false)
				{
					this.groups[current_container] = [];
				}

				group_anchors = $m.tags.get(rating_containers[i], "a");

				for(var j=0, alen=group_anchors.length; j < alen; j++)
				{
					all_anchors.push(group_anchors[j]);
				
					current_css = ($m.attr.get(group_anchors[j], this.data_att_state) == "on") ? "on" : "off";
					
					if($m.is.alive($m.attr.get(group_anchors[j], this.data_att_parent)) === false)
					{
						$m.attr.set(group_anchors[j], {
							 "data-mjf_magic_ratings_parent" : current_container
							,"class" : "magic_rating_link magic_rating_link_" + current_css
						});
					}
					
					this.groups[current_container].push($m.attr.get(group_anchors[j], "id"));
				}
			}

			$m.elements.bind(all_anchors, this.data_att_click, "mouseover", this.over);
			$m.elements.bind(all_anchors, this.data_att_click, "mouseout", this.out);
			$m.elements.bind(all_anchors, this.data_att_click, "click", this.click);
		}


		// $m.t.magic_ratings.links.over(IN_ID)
		,over : function(in_id)
		{
			var parent = $m.attr.get(in_id, $m.t.magic_ratings.links.data_att_parent)
				,group = $m.t.magic_ratings.links.groups[parent]
				,found_current = false;

			for(var i=0, len=group.length; i < len; i++)
			{
				if(group[i] == in_id)
				{
					found_current = true;
				}

				if(found_current === true)
				{
					$m.css_class.add(group[i], "magic_rating_link_off_tmp");
				}
				else
				{
					$m.css_class.add(group[i], "magic_rating_link_hover");
				}
			}
		}


		// $m.t.magic_ratings.links.out(IN_ID)
		,out : function(in_id)
		{
			var parent = $m.attr.get(in_id, $m.t.magic_ratings.links.data_att_parent)
				,group = $m.t.magic_ratings.links.groups[parent];

			for(var i=0, len=group.length; i < len; i++)
			{
				$m.css_class.remove(group[i], "magic_rating_link_off_tmp");
				$m.css_class.remove(group[i], "magic_rating_link_hover");
			}
		}


		// $m.t.magic_ratings.links.click(IN_ID)
		,click : function(in_id)
		{
			var current_value = $m.attr.get(in_id, $m.t.magic_ratings.links.data_att_value)
				,new_query = "magic_rating=" + encodeURIComponent(current_value)
				,parent = $m.attr.get(in_id, $m.t.magic_ratings.links.data_att_parent)
				,ajax_query = $m.attr.get(parent, "data-mjf_ajax_query")
				,group = $m.t.magic_ratings.links.groups[parent]
				,found_current = false;

			if($m.is.alive(ajax_query) === true)
			{
				ajax_query = ajax_query + "&" + new_query;
			}
			else
			{
				ajax_query = new_query;
			}

			$m.attr.set(parent, { "data-mjf_ajax_query" : ajax_query });

			for(var i=0, len=group.length; i < len; i++)
			{
				if(group[i] == in_id)
				{
					$m.css_class.replace(group[i], "magic_rating_link_off", "magic_rating_link_on");
					found_current = true;
					continue;
				}

				if(found_current === true)
				{
					$m.css_class.replace(group[i], "magic_rating_link_on", "magic_rating_link_off");
				}
				else
				{
					$m.css_class.replace(group[i], "magic_rating_link_off", "magic_rating_link_on");
				}
			}
			
			var ajax_rate = new $m.ajax();
			ajax_rate.init(parent);
			ajax_rate.exec();

			return false;
		}
	}


}
