/***************************************************************************
- File: help.js
- Version: 12.10.12
- java -jar compiler2.jar --js help.src.js --js_output_file help.VERSION.js
***************************************************************************/

var btns = parent.$m.t.magic_editor.btns
	,toolbars = parent.$m.t.magic_editor.types[parent.$m.t.magic_editor.config.type]
	,shcts = []
	,btns_html = "";