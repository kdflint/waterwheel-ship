<!DOCTYPE html>
<html>
<head>
	<title>Magic Imagery: Tricks: Magic JavaScript</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

	<link href="../../stylesheets/defaults.css" rel="stylesheet" media="all">
	<link href="../../stylesheets/docs.css" rel="stylesheet" media="all">

	<link href="../../stylesheets/magic.src.css" rel="stylesheet">
	<script type="text/javascript" src="../../magic.src.js" charset="UTF-8"></script>
	<script type="text/javascript">
		$m.construct({
			 lang : "en_us"
			,create_html5 : true
			,global_debug : false
			,animations : { use : true }
			,ajax : { debug : true, visual : true, timeout : 15 }
			,geo : { use : false, debug : true, visual : true }
			,send_timezone_to : false
		});
	</script>
	<script type="text/javascript" src="../../wand.src.js" charset="UTF-8"></script>
	<link href="../darkroom/darkroom.src.css" rel="stylesheet">
	<script type="text/javascript" src="../darkroom/darkroom.src.js" charset="UTF-8"></script>
	<link href="magic_imagery.src.css" rel="stylesheet">
	<script type="text/javascript" src="magic_imagery.src.js" charset="UTF-8"></script>
	<script type="text/javascript" src="../../_versions.js" charset="UTF-8"></script>
</head>
<body>
	

	<h1 class="align_center margin_bottom_5"><a href="../../docs/"><img src="../../images/icons/icon_magic.png" alt="Magic Icon" class="valign_middle" id="logo_mjs"></a> Magic Imagery (<script type="text/javascript">document.write($m.versions.tricks.magic_imagery);</script>): Magic JavaScript</h1>

<!--	
	<p id="mjs_quick_jump"><a href="#" data-mjf="darkroom|return_false" data-mjf_dr_type="iframe" data-mjf_dr_iframe_src="../../docs/_quick_jump.html" data-mjf_dr_iframe_dim="fill" id="mjs_quick_jump_link">Quick Jump &crarr;</a></p>
	
	<h2 class="align_center bg_yellow_lite margin_bottom_20 padding_10">Easy image galleries</h2>

	<fieldset>

		<legend><a href="#" data-mjf="lightswitch|return_false" data-mjf_lswitch_id="initial_setup_cont" id="initial_setup">Initial Setup</a></legend>
		
		<div class="display_block" id="initial_setup_cont">
		
			<p class="form_line_content">
				Add <code>&lt;link href="/PATH/TO/magic/tricks/magic_imagery/magic_imagery.<script type="text/javascript">document.write($m.versions.tricks.css.magic_imagery);</script>.css" rel="stylesheet"&gt;</code><br>
				<code>&lt;script type="text/javascript" src="/PATH/TO/magic/tricks/magic_imagery/magic_imagery.<script type="text/javascript">document.write($m.versions.tricks.magic_imagery);</script>.js" charset="UTF-8"&gt;&lt;/script&gt;</code><br><br>
				below your <code>&lt;script type="text/javascript" src="/PATH/TO/magic/wand.<script type="text/javascript">document.write($m.versions.wand);</script>.js" charset="UTF-8"&gt;&lt;/script&gt;</code>
			</p>
	
			<p class="form_line_content">Add <code>&lt;script type="text/javascript"&gt;$m.trick.magic_imagery = true;&lt;/script&gt;</code> inside your <code>&lt;body&gt;</code> tag.</p>

			<p class="form_line_content">Use the examples below as a guide for building your own!</p>
			
		</div>
	
	</fieldset>
-->


	<?php

	$mi_set_1 = array(
	
		array('full_size' => './examples/200x500.jpg'
			,'thumbnail' => './examples/150x150-t.jpg'
			,'description' => '<p class="margin_0">200x500.</p>'
		)
		
		,array('full_size' => './examples/200x800.jpg'
			,'thumbnail' => './examples/150x150-t.jpg'
			,'description' => '<p class="margin_0">200x800.</p>'
		)
		
		,array('full_size' => './examples/500x200.jpg'
			,'thumbnail' => './examples/150x150-t.jpg'
			,'description' => '<p class="margin_0">500x200.</p>'
		)
		
		,array('full_size' => './examples/800x200.jpg'
			,'thumbnail' => './examples/150x150-t.jpg'
			,'description' => '<p class="margin_0">800x200.</p>'
		)

	);

	/**/
	$mi_set_1 = array(
	
		array('full_size' => './examples/mi_set_1-000.jpg'
			,'thumbnail' => './examples/mi_set_1-000-t.jpg'
			,'description' => '<p class="margin_0">The white sun behind the clouds.</p>'
		)
		
		,array('full_size' => './examples/mi_set_1-001.jpg'
			,'thumbnail' => './examples/mi_set_1-001-t.jpg'
			,'description' => '<p class="margin_0">Puffy cloud on a navy sky.</p>'
		)
		
		,array('full_size' => './examples/mi_set_1-002.jpg'
			,'thumbnail' => './examples/mi_set_1-002-t.jpg'
			,'description' => '<p class="margin_0">A jet had just went by.</p>'
		)
		
		,array('full_size' => './examples/mi_set_1-003.jpg'
			,'thumbnail' => './examples/mi_set_1-003-t.jpg'
			,'description' => '<p class="margin_0">Wavy clouds in a gradient sky.</p>'
		)
		
		,array('full_size' => './examples/mi_set_1-004.jpg'
			,'thumbnail' => './examples/mi_set_1-004-t.jpg'
			,'description' => '<p class="margin_0">Billowy clouds and a few trees.</p>'
		)
		
		,array('full_size' => './examples/mi_set_1-005.jpg'
			,'thumbnail' => './examples/mi_set_1-005-t.jpg'
			,'description' => '<p class="margin_0">There was a storm brewing looking north.</p>'
		)
		
		,array('full_size' => './examples/mi_set_1-006.jpg'
			,'thumbnail' => './examples/mi_set_1-006-t.jpg'
			,'description' => '<p class="margin_0">There was a storm brewing looking south.</p>'
		)
	);
	/**/
	
	$mi_set_1_total = count($mi_set_1);


	$mi_set_2 = array(
	
		array('full_size' => './examples/mi_set_2-000.jpg'
			,'thumbnail' => './examples/mi_set_2-000-t.jpg'
			,'description' => '<p class="margin_0">The Fox River dam in St. Charles, Illinois.</p>'
		)
		
		,array('full_size' => './examples/mi_set_2-001.jpg'
			,'thumbnail' => './examples/mi_set_2-001-t.jpg'
			,'description' => '<p class="margin_0">Wasps building a nest.</p>'
		)
		
		,array('full_size' => './examples/mi_set_2-002.jpg'
			,'thumbnail' => './examples/mi_set_2-002-t.jpg'
			,'description' => '<p class="margin_0">Bumble bee collecting some pollen.</p>'
		)
		
		,array('full_size' => './examples/mi_set_2-003.jpg'
			,'thumbnail' => './examples/mi_set_2-003-t.jpg'
			,'description' => '<p class="margin_0">A wasp missing on of her wings.</p>'
		)
		
		,array('full_size' => './examples/mi_set_2-004.jpg'
			,'thumbnail' => './examples/mi_set_2-004-t.jpg'
			,'description' => '<p class="margin_0">Another bumble bee collecting some pollen.</p>'
		)
		
		,array('full_size' => './examples/mi_set_2-005.jpg'
			,'thumbnail' => './examples/mi_set_2-005-t.jpg'
			,'description' => '<p class="margin_0">A lightning bug on the window.</p>'
		)
		
		,array('full_size' => './examples/mi_set_2-006.jpg'
			,'thumbnail' => './examples/mi_set_2-006-t.jpg'
			,'description' => '<p class="margin_0">A wasp in the grass.</p>'
		)
	);
	
	$mi_set_2_total = count($mi_set_2);


	$mi_set_3 = array(
	
		array('full_size' => './examples/mi_set_3-000.jpg'
			,'thumbnail' => './examples/mi_set_3-000-t.jpg'
			,'description' => '<p class="margin_0">What was in my pocket.</p>'
		)
		
		,array('full_size' => './examples/mi_set_3-001.jpg'
			,'thumbnail' => './examples/mi_set_3-001-t.jpg'
			,'description' => '<p class="margin_0">What a sprocket.</p>'
		)
		
		,array('full_size' => './examples/mi_set_3-002.jpg'
			,'thumbnail' => './examples/mi_set_3-002-t.jpg'
			,'description' => '<p class="margin_0">A chainlink fence protects mankind from the dangerous flooding.</p>'
		)
		
		,array('full_size' => './examples/mi_set_3-003.jpg'
			,'thumbnail' => './examples/mi_set_3-003-t.jpg'
			,'description' => '<p class="margin_0">A fire engine headed back to the station.</p>'
		)
		
		,array('full_size' => './examples/mi_set_3-004.jpg'
			,'thumbnail' => './examples/mi_set_3-004-t.jpg'
			,'description' => '<p class="margin_0">A Fourth of July fireworks car.</p>'
		)
		
		,array('full_size' => './examples/mi_set_3-005.jpg'
			,'thumbnail' => './examples/mi_set_3-005-t.jpg'
			,'description' => '<p class="margin_0">Another of the Fourth of July fireworks car.</p>'
		)
		
		,array('full_size' => './examples/mi_set_3-006.jpg'
			,'thumbnail' => './examples/mi_set_3-006-t.jpg'
			,'description' => '<p class="margin_0">A cherry on the wooden deck.</p>'
		)
	);
	
	$mi_set_3_total = count($mi_set_3);


	$mi_set_4 = array(
	
		array('full_size' => './examples/mi_set_4-000.jpg'
			,'thumbnail' => './examples/mi_set_4-000-t.jpg'
			,'description' => '<p class="margin_0">Yellow flowers in a pot.</p>'
		)
		
		,array('full_size' => './examples/mi_set_4-001.jpg'
			,'thumbnail' => './examples/mi_set_4-001-t.jpg'
			,'description' => '<p class="margin_0">Wild pink flowers out in nature.</p>'
		)
		
		,array('full_size' => './examples/mi_set_4-002.jpg'
			,'thumbnail' => './examples/mi_set_4-002-t.jpg'
			,'description' => '<p class="margin_0">Up close with this flower.</p>'
		)
		
		,array('full_size' => './examples/mi_set_4-003.jpg'
			,'thumbnail' => './examples/mi_set_4-003-t.jpg'
			,'description' => '<p class="margin_0">Purple flowers in the restroom.</p>'
		)
		
		,array('full_size' => './examples/mi_set_4-004.jpg'
			,'thumbnail' => './examples/mi_set_4-004-t.jpg'
			,'description' => '<p class="margin_0">A couple of these flowers for your review.</p>'
		)
		
		,array('full_size' => './examples/mi_set_4-005.jpg'
			,'thumbnail' => './examples/mi_set_4-005-t.jpg'
			,'description' => '<p class="margin_0">Fuzzy white flowers.</p>'
		)
		
		,array('full_size' => './examples/mi_set_4-006.jpg'
			,'thumbnail' => './examples/mi_set_4-006-t.jpg'
			,'description' => '<p class="margin_0">Up close with this red flower.</p>'
		)
	);
	
	$mi_set_4_total = count($mi_set_4);
	
	?>


	<?php /**/ ?>
	<fieldset>

		<legend>Example 1 - full on the left, thumbs on the right</legend>
		
		<div class="magic_imagery_wrapper">
		
			<div data-mjf="magic_imagery" data-mjf_mi_height="600" class="magic_imagery_cont" id="mi_set_1">
			
				<div data-mjf_mi_pos="left" class="magic_imagery_full"></div>

				<div data-mjf_mi_pos="right" class="magic_imagery_thumbs">
					<?php for($i=0; $i < $mi_set_1_total; $i++) { ?>
						<p class="margin_5"><a href="<?php echo $mi_set_1[$i]['full_size']; ?>" data-mjf="magic_imagery_link|return_false" id="mi_set_1_link_<?php echo $i; ?>"><img src="<?php echo $mi_set_1[$i]['thumbnail']; ?>" alt=""></a></p>
						<div class="magic_imagery_desc" id="mi_set_1_link_<?php echo $i; ?>_cont"><?php echo $mi_set_1[$i]['description']; ?></div>
					<?php } ?>
				</div>
				
				<div class="clear_both"></div>
				
			</div>
		
		</div>

	</fieldset>
	<?php /**/ ?>

	<div class="padding_20"></div>

	<?php /** ?>
	<fieldset>

		<legend>Example 2 - full on the right, thumbs on the left</legend>
		
		<div class="magic_imagery_wrapper">
		
			<div data-mjf="magic_imagery" data-mjf_mi_height="500" class="magic_imagery_cont" id="mi_set_2">
			
				<div data-mjf_mi_pos="right" class="magic_imagery_full">
					<div class="magic_imagery_desc"><?php echo $mi_set_2[0]['description']; ?></div>
				</div>
			
				<div data-mjf_mi_pos="left" class="magic_imagery_thumbs">
					<?php for($i=0; $i < $mi_set_2_total; $i++) { ?>
						<p class="margin_5"><a href="<?php echo $mi_set_2[$i]['full_size']; ?>" data-mjf="magic_imagery_link|return_false" id="mi_set_2_link_<?php echo $i; ?>"><img src="<?php echo $mi_set_2[$i]['thumbnail']; ?>" alt=""></a></p>
						<div class="magic_imagery_desc" id="mi_set_2_link_<?php echo $i; ?>_cont"><?php echo $mi_set_2[$i]['description']; ?></div>
					<?php } ?>
				</div>
				
				<div class="clear_both"></div>
				
			</div>
		
		</div>

	</fieldset>
	<?php /**/ ?>

	<div class="padding_20"></div>

	<?php /** ?>
	<fieldset>

		<legend>Example 3 - full on the top, thumbs on the bottom</legend>
	
		<div class="magic_imagery_wrapper">
		
			<div data-mjf="magic_imagery" data-mjf_mi_height="700" class="magic_imagery_cont" id="mi_set_3">
			
				<div class="magic_imagery_full">
					<div class="magic_imagery_desc"><?php echo $mi_set_3[0]['description']; ?></div>
				</div>
			
				<div class="magic_imagery_thumbs">
					<?php for($i=0; $i < $mi_set_3_total; $i++) { ?>
						<div class="magic_imagery_box">
							<p class="margin_5"><a href="<?php echo $mi_set_3[$i]['full_size']; ?>" data-mjf="magic_imagery_link|return_false" id="mi_set_3_link_<?php echo $i; ?>"><img src="<?php echo $mi_set_3[$i]['thumbnail']; ?>" alt=""></a></p>
							<div class="magic_imagery_desc" id="mi_set_3_link_<?php echo $i; ?>_cont"><?php echo $mi_set_3[$i]['description']; ?></div>
						</div>
					<?php } ?>
				</div>

				<div class="clear_both"></div>
				
			</div>
		
		</div>

	</fieldset>
	<?php /**/ ?>

	<div class="padding_20"></div>

	<?php /** ?>
	<fieldset>

		<legend>Example 4 - full on the bottom, thumbs on the top</legend>
		
		<div class="magic_imagery_wrapper">
		
			<div data-mjf="magic_imagery" data-mjf_mi_height="500" class="magic_imagery_cont" id="mi_set_4">
			
				<div class="magic_imagery_thumbs">
					<?php for($i=0; $i < $mi_set_4_total; $i++) { ?>
						<div class="magic_imagery_box">
							<p class="margin_5"><a href="<?php echo $mi_set_4[$i]['full_size']; ?>" data-mjf="magic_imagery_link|return_false" id="mi_set_4_link_<?php echo $i; ?>"><img src="<?php echo $mi_set_4[$i]['thumbnail']; ?>" alt=""></a></p>
							<div class="magic_imagery_desc" id="mi_set_4_link_<?php echo $i; ?>_cont"><?php echo $mi_set_4[$i]['description']; ?></div>
						</div>
					<?php } ?>
				</div>
			
				<div class="magic_imagery_full">
					<div class="magic_imagery_desc"><?php echo $mi_set_4[0]['description']; ?></div>
				</div>

				<div class="clear_both"></div>
				
			</div>
		
		</div>

	</fieldset>
	<?php /**/ ?>


	<fieldset>

		<legend>Change Log</legend>

		<h3>&rarr; YY.MM.DD</h3>
		<ul>
			<li>Alpha release 1</li>
		</ul>
	
	</fieldset>
	
	<fieldset>

		<legend>To Do</legend>

		<ul>
			<li>Add option for <code>data-mjf_mi_nav="true(OR)false"</code> which adds or not the arrow nav in the full description.</li>
			<li>Add option for <code>data-mjf_mi_desc="true(OR)false"</code> which adds or not the full description.</li>
			<li>Add option for <code>data-mjf_mi_autorotate="true(OR)false"</code> which starts or not the auto-rotating of images.</li>
			<li>Add fullscreen support.</li>
			<li>Add keyboard shortcuts.</li>
			<li>Fix Android thumb sizing issue.</li>
			<li>Possibly add smooth scroll to navigation thumbs.</li>
			<li>Possibly add arrows for navigation thumbs.</li>
		</ul>

	</fieldset>


	<p class="align_center">&laquo; <a href="../../docs/">Back to the main documentation</a></p>

	<script type="text/javascript">
		$m.trick.darkroom = true;
		$m.trick.magic_imagery = true;
	</script>


</body>
</html>