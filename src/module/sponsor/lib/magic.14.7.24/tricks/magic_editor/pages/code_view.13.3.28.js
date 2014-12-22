/***************************************************************************
- File: code_view.js
- Version: 13.3.28
***************************************************************************/

var $me_code_view={construct:function(){var a=parent.$m.t.magic_editor.cur_ed;cur_ed_cnt=parseInt(a);this.code_view_wrap_id=document.getElementById("code_view_wrap");this.code_view_html_id=document.getElementById("code_view_html");this.current_iframe="magic_"+a;this.current_iframe_id=parent.$m.id(this.current_iframe);this.current_textarea_id=parent.$m.id(parent.$m.t.magic_editor.all[cur_ed_cnt]);this.code_view_html_id.value=parent.$m.t.magic_editor.clean(parent.$m.tag.get_iframe_doc(this.current_iframe).body.innerHTML);
a=parent.$m.storage.get.table("magic_editor");if(parent.$m.is.alive(a)===!0&&parent.$m.is.alive(a.code_view)===!0&&parent.$m.is.alive(a.code_view.word_wrap)===!0&&a.code_view.word_wrap==="on")$me_code_view.code_view_wrap_id.checked=!0,parent.$m.attr.set($me_code_view.code_view_html_id,{wrap:"on"})},toggle_wrap:function(){var a="off",b={};$me_code_view.code_view_wrap_id.checked===!0?(parent.$m.attr.set($me_code_view.code_view_html_id,{wrap:"on"}),a="on"):parent.$m.attr.set($me_code_view.code_view_html_id,
{wrap:"off"});$me_code_view.code_view_html_id.focus();b.code_view={word_wrap:a};parent.$m.storage.set("magic_editor",b)},update:function(){parent.$m.tag.get_iframe_doc($me_code_view.current_iframe).body.innerHTML=$me_code_view.code_view_html_id.value;parent.$m.t.darkroom.hide("mjf_darkroom_iframe_div.link")},clean:function(){$me_code_view.code_view_html_id.value=parent.$m.t.magic_editor.clean($me_code_view.code_view_html_id.value)},cancel:function(){parent.$m.t.darkroom.hide("mjf_darkroom_iframe_div.link")}};
window.onload=function(){$me_code_view.construct()};
