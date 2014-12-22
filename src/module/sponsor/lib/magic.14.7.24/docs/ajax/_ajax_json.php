<?php sleep(1);
$my_array = array();

$my_array[0]['update_id'] = 'ajax_json_1_cont';
$my_array[0]['update_html'] = '<em>First item\'s returned HTML</em><br><span class="helper_text">replaced current content</span><br>' . date("g:i:s a");

$my_array[1]['update_id'] = 'ajax_json_2_cont';
$my_array[1]['update_html'] = '<p><code>Second item\'s returned HTML</code><br><span class="helper_text">appended current content</span></p><p>' . date("g:i:s a") . '</p>';
$my_array[1]['update_method'] = 'append';

$my_array[2]['update_id'] = 'ajax_json_3_cont';
$my_array[2]['update_html'] = 'Third item\'s returned HTML<br><span class="helper_text">prepended current content</span><br>' . date("g:i:s a");
$my_array[2]['update_method'] = 'prepend';

$my_array[3]['update_id'] = 'ajax_json_4_cont';
$my_array[3]['update_html'] = date("g:i:s a");
$my_array[3]['update_callback'] = '$m.tag.html("ajax_json_4_cont_p", "I\'ve been updated at ' . date("g:i:s a") . ' -- woo-hoo!")';


$json_encoded = json_encode($my_array);
echo $json_encoded;