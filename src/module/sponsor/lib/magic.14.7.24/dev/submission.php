<div class="bg_yellow_lite padding_5">

	<h2>~ submission.php</h2>

	<?php if(empty($_REQUEST['ajax_call'])) { ?>

		<h3>$_REQUEST['ajax_call']</code> not sent. Your call didn't work.</h3>
		
		<h4 class="margin_top_0">Request Parameters &ndash; <?php echo date("Y-M-d g:i:s a"); ?></h4>
	
		<ul>
			<?php foreach($_REQUEST as $r_key => $r_value) { ?>
				<li><?php echo $r_key; ?> = <?php echo $r_value; ?></li>
			<?php } ?>
		</ul>

	</div>

	<?php } else { ?>

		<h4 class="margin_top_0">Request Parameters &ndash; <?php echo date("Y-M-d g:i:s a"); ?></h4>
		<ul>
			<?php foreach($_REQUEST as $r_key => $r_value) { ?>
				<li><?php echo $r_key; ?> = <?php echo $r_value; ?></li>
			<?php } ?>
		</ul>
		
		<p>Returned JavaScript works &ndash; <a href="http://www.google.com" data-mjf="confirm_click" title="Would you like to visit Google?" id="confirm_clicker_<?php echo date("g.i.s"); ?>">Confirm Click</a></p>
	
		<script type="text/javascript">
			$m.wand.confirm_click = true;
		</script>
	
	<?php } ?>

</div>