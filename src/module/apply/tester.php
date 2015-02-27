<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8">

		<?php
			include("../core/mod-core-meta.php");
			include("mod-apply-meta.php"); 
		?>		
		
		<style> .button-submit {width: 100px; bottom: 20px; left: 90px;}	</style>

		<!--
		*********************************************************************
		These bits of script alter the production DOM to allow for unit 
		validation testing.
		
		*********************************************************************
		-->
		
		<script>
			function stubForFrontValidation() {
				document.forms["apply-tester-form"].elements['frontSide'].checked = true;
				document.forms["apply-tester-form"].elements['serverSide'].checked = false;
				document.forms["apply-tester-form"].elements['allSide'].checked = false;
				document.forms["apply-form"].action = "processor-front-stub.php";
				document.forms["apply-form"].elements['testMode'].value = "";
				document.getElementById("applySubmitButton").innerHTML = "Validate Front";
				document.getElementById("applySubmitButton").setAttribute('onclick','applyValidateAndSubmit();');
			}
			
			function stubForServerValidation() {
				document.forms["apply-tester-form"].elements['frontSide'].checked = false;
				document.forms["apply-tester-form"].elements['serverSide'].checked = true;
				document.forms["apply-tester-form"].elements['allSide'].checked = false;
				document.forms["apply-form"].action = "mod-apply-processor.php";
				document.forms["apply-form"].elements['testMode'].value = "true";
				document.getElementById("applySubmitButton").innerHTML = "Validate Server";
				document.getElementById("applySubmitButton").setAttribute('onclick','skipValidationAndSubmit();');
			}
			
			function stubForRoundTrip() {
				document.forms["apply-tester-form"].elements['frontSide'].checked = false
				document.forms["apply-tester-form"].elements['serverSide'].checked = false;
				document.forms["apply-tester-form"].elements['allSide'].checked = true;
				document.forms["apply-form"].action = "mod-apply-processor.php";
				document.forms["apply-form"].elements['testMode'].value = "";
				document.getElementById("applySubmitButton").innerHTML = "Round Trip";
				document.getElementById("applySubmitButton").setAttribute('onclick','applyValidateAndSubmit();');
			}
			
			function skipValidationAndSubmit() {
				document.forms["apply-form"].submit();
			}
		</script>
		
	</head>
	<body>
		<div class="container">
			<p>SELECT TEST MODE</p>
			<p>NOTE: To clear success message, remove parameters from request url in browser bar and reload</p>
			<form id="apply-tester-form" class="pure-form apply-form" action="" method="">
			<p><input type="radio" name="testRadio" id="frontSide" onClick="stubForFrontValidation();" checked /> Front side input validation (no server side validation, email, or data post)</p>
			<p><input type="radio" name="testRadio" id="serverSide" onClick="stubForServerValidation();" /> Server side input validation (no front validation, email, or data post)</p>
				<ul><li>This mode allows testing on post-submit alterations to the post data by using a browser plug-in like TamperData</li></ul>
			<p><input type="radio" name="testRadio" id="allSide" onClick="stubForRoundTrip();" /> Full functionality (all validations, email, and data post)</p>
		</form>
			<div class="allianceContent">
					<?php include("mod-apply.php"); ?>					
			</div>
		</div>

		<script>
				stubForFrontValidation();
		</script>
		
	</body>
</html>

