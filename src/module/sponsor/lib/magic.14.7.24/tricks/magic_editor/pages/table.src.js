/***************************************************************************
- File: table.js
- Version: 13.1.11
- java -jar compiler2.jar --js table.src.js --js_output_file table.VERSION.js
***************************************************************************/

var $me_table = {
	 tbl_html : false
	,tbl_border : false
	,td_border : false


	,construct : function()
	{
		this.tbl_preview = document.getElementById("tbl_preview");
		
		this.tbl_rows = document.getElementById("tbl_rows");
		this.tbl_cols = document.getElementById("tbl_cols");
		this.tbl_padding = document.getElementById("tbl_padding");
		
		this.tbl_width = document.getElementById("tbl_width");
		this.tbl_width_in_per = document.getElementById("tbl_width_in_per");
		this.tbl_width_in_pix = document.getElementById("tbl_width_in_pix");

		this.tbl_bo_color = document.getElementById("tbl_bo_color");
		this.tbl_bo_color_val = this.tbl_bo_color[this.tbl_bo_color.selectedIndex].value;
		
		this.tbl_border_size = document.getElementById("tbl_border_size");
		this.tbl_border_size = this.tbl_border_size[this.tbl_border_size.selectedIndex].value;

		this.cur_table = parent.$m.t.magic_editor.cur_table;
		
		
		if(this.cur_table_inspected === true)
		
		this.cur_table_inspected = false;

		if(parent.$m.is.alive(this.cur_table) === true)
		{
			this.inspect();
		}
	}


	,inspect : function()
	{
		var table_tr = $me_table.cur_table.getElementsByTagName("TR")
			,table_tr_td = false
			,td_count = 0
			,cols_value = 0;
		
		if(parent.$m.is.alive(table_tr) === true)
		{
			$me_table.tbl_rows.value = table_tr.length;
			$me_table.tbl_rows.disabled = true;

			for(var i=0; i < table_tr.length; i++)
			{
				table_tr_td = table_tr[i].getElementsByTagName("TD");
				
				if(table_tr_td.length > td_count)
				{
					td_count = table_tr_td.length;
				}
			}

			$me_table.tbl_cols.value = td_count;
			$me_table.tbl_cols.disabled = true;
		}
		
		var cell_padding = $me_table.cur_table.getAttribute("cellpadding");
		
		if(parent.$m.is.alive(cell_padding) === true)
		{
			$me_table.tbl_padding.value = cell_padding;
		}
		
		var tbl_width = $me_table.cur_table.getAttribute("width");
		
		if(parent.$m.is.alive(tbl_width) === true)
		{
			$me_table.tbl_width.value = parseInt(tbl_width);
			
			if(tbl_width.match('%'))
			{
				$me_table.tbl_width_in_per.checked = true;
			}
			else
			{
				$me_table.tbl_width_in_pix.checked = true;
			}
		}
		
		$me_table.cur_table_inspected = true;
	}


	,init : function()
	{
		var kids = document.getElementsByTagName("INPUT");
		for(var i=0; i < kids.length; i++)
		{
			if(kids[i].className == "button_table_border_size")
			{
				kids[i].onclick = $me_table.btn_click_size;
			}

			if(kids[i].type == "text" || kids[i].type == "radio" || kids[i].type == "checkbox")
			{
				kids[i].onclick = $me_table.update_preview;
				kids[i].onchange = $me_table.update_preview;
				kids[i].onkeyup = $me_table.update_preview;
			}
		}
	}


	,btn_click_size : function()
	{
		document.getElementById("tbl_border_size").value = parseInt(this.value);
		/*
		parent.$m.de.add_item("a $me_table.tbl_border_size = " + $me_table.tbl_border_size);
		$me_table.tbl_border_size = parseInt(this.value);
		parent.$m.de.add_item("b $me_table.tbl_border_size = " + $me_table.tbl_border_size);
		*/
		$me_table.update_preview();
	}


	,update_preview : function()
	{
		$me_table.construct();

		$me_table.tbl_border = ' border="' + $me_table.tbl_border_size + '"';
		$me_table.td_border = ' style="border: ' + $me_table.tbl_border_size + 'px solid ' + $me_table.tbl_bo_color_val + '"';

		$me_table.tbl_html  = '<table' + $me_table.tbl_border;
		$me_table.tbl_html += ' cellpadding="' + $me_table.tbl_padding.value + '" ';

		$me_table.tbl_html += 'style="width: ' + $me_table.tbl_width.value;

		if($me_table.tbl_width_in_per.checked == true)
		{
			$me_table.tbl_html += '%;';
		}
		else if($me_table.tbl_width_in_pix.checked == true)
		{
			$me_table.tbl_html += 'px;';
		}
		
		$me_table.tbl_html += ' border-collapse: collapse;';

		$me_table.tbl_html += ' border-color: ' + $me_table.tbl_bo_color_val + ';';

		$me_table.tbl_html += '">'
	
		for(var i=0; i < $me_table.tbl_rows.value; i++)
		{
			$me_table.tbl_html += '\n<tr>';
			
			for(var j=0; j < $me_table.tbl_cols.value; j++)
			{
				$me_table.tbl_html += '<td' + $me_table.td_border + '>' + i + ':' + j + '</td>';
			}
			
			$me_table.tbl_html += '</tr>';
		}			
		
		$me_table.tbl_html += '\n</table>';

		$me_table.tbl_preview.innerHTML = $me_table.tbl_html;
	}


	,insert : function()
	{
		$me_table.update_preview();
		parent.$m.t.magic_editor.inject_html($me_table.tbl_html, "block");
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}


	,cancel : function()
	{
		parent.$m.t.darkroom.hide('mjf_darkroom_iframe_div.link');
	}
}

window.onload = function()
{
	$me_table.construct();
	$me_table.init();
	$me_table.update_preview();
}