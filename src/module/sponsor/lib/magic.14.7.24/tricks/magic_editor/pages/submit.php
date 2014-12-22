<div class="notify_box return_information">

	<h3>submit.php</h3>
	
	<pre><?php foreach($_REQUEST as $r_key => $r_value) {
		echo '$_REQUEST[\'' . htmlspecialchars($r_key) . '\'] = ' . htmlspecialchars($r_value) . "\n";
	} ?></pre>
	
</div>