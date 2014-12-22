<?php sleep(2);

$random_id = md5(microtime()); ?>

<div class="margin_5 padding_5">

	<?php if(empty($_REQUEST['ajax_call'])) { ?>

		<h3><code>$_REQUEST['ajax_call']</code> not sent. Your call didn't work.</h3>
		
		<h4 class="margin_top_0">Request Parameters &ndash; <?php echo date("Y-M-d g:i:s a"); ?></h4>
	
		<ul>
			<?php foreach($_REQUEST as $r_key => $r_value) { ?>
				<li><?php echo $r_key; ?> = <?php echo $r_value; ?></li>
			<?php } ?>
		</ul>

	</div>

	<?php } else { ?>

		<p class="form_line_field">
			<input type="text" name="input_type_text" value="" class="input_fld input_text" id="input_type_text_<?php echo $random_id; ?>"><br>
			<?php echo $random_id; ?>
		</p>
	
	<?php } ?>

</div>