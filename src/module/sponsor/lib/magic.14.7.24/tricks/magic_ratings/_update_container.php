<?php

$count = (empty($_REQUEST['magic_rating'])) ? 0 : $_REQUEST['magic_rating'];
$found_it = false;

for($i=1; $i < 6; $i++)
{
	$img_src = ($found_it === true) ? 'off' : 'on';
	
	if($i == $count)
	{
		$found_it = true;
	} ?>
	
	<img src="bg_rating_<?php echo $img_src; ?>.png" alt="" width="17" height="17" class="valign_middle">
	
<?php } ?>

(2)