/***************************************************************************
- File: search.js
- Version: 13.3.28
- java -jar compiler2.jar --js search.src.js --js_output_file search.VERSION.js
***************************************************************************/

var $me_search = {
	 cur_selection : ""
	,ed_body : false
	,wrap_start : '<span class="magic_editor_search_results">'
	,wrap_stop : '</span>'

	,construct : function()
	{
		if(parent.$m.is.alive(parent.$m.t.magic_editor.selection.txt) === false)
			parent.$m.t.magic_editor.selection.txt = "";

		this.cur_selection = parent.$m.t.magic_editor.selection.txt;
		this.ed_body = parent.$m.tag.get_iframe_doc("magic_" + parent.$m.t.magic_editor.cur_ed).body;

		this.search_box = document.getElementById('search_box');
		this.search_box.value = parent.$m.t.magic_editor.selection.txt;

		this.replace_box = document.getElementById('replace_box');
		this.match_case = document.getElementById('match_case');
	}


	,search : function()
	{
		$me_search.remove();
		$search_options = ($me_search.match_case.checked === true) ? 'g' : 'gi';
		$me_search.ed_body.innerHTML = $me_search.ed_body.innerHTML.replace(new RegExp($me_search.search_box.value, $search_options), $me_search.wrap_start + $me_search.search_box.value + $me_search.wrap_stop);
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}


	,replace : function()
	{
		$me_search.remove();
		$search_options = ($me_search.match_case.checked === true) ? 'g' : 'gi';
		$me_search.ed_body.innerHTML = $me_search.ed_body.innerHTML.replace(new RegExp($me_search.search_box.value, $search_options), $me_search.replace_box.value);
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}


	,clear : function()
	{
		$me_search.remove();
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}


	,remove : function()
	{
		$me_search.ed_body.innerHTML = $me_search.ed_body.innerHTML.replace(new RegExp('<span class="?magic_editor_search_results"?>(.*?)<\/span>', 'gi'), '$1');
	}

}

window.onload = function()
{
	$me_search.construct();
}