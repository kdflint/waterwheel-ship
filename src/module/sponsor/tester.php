<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<html>
	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8">

		<?php
			include("../core/mod-core-meta.php");
			include("mod-sponsor-meta.php"); 
		?>		
		
		<style> .button-submit {width: 100px; bottom: 20px; left: 90px;}	</style>
		
		<!--
		*********************************************************************
		These bits of script alter the production DOM to allow for unit 
		validation testing.
		
		*********************************************************************
		-->
		
		<script language="javascript" type="text/javascript" >
			function stubForFrontValidation() {
				document.forms["sponsor-tester-form"].elements['frontSide'].checked = true;
				document.forms["sponsor-tester-form"].elements['serverSide'].checked = false;
				document.forms["sponsor-tester-form"].elements['allSide'].checked = false;
				document.forms["sponsor-form"].action = "processor-front-stub.php";
				document.forms["sponsor-form"].elements['testMode'].value = "";
				//document.getElementById("sponsorSubmitButton").innerHTML = "Validate Front";
				//document.getElementById("sponsorSubmitButton").setAttribute('onclick','sponsorValidateAndSubmit();');
			}
			
			function stubForServerValidation() {
				document.forms["sponsor-tester-form"].elements['frontSide'].checked = false;
				document.forms["sponsor-tester-form"].elements['serverSide'].checked = true;
				document.forms["sponsor-tester-form"].elements['allSide'].checked = false;
				document.forms["sponsor-form"].action = "mod-sponsor-processor.php";
				document.forms["sponsor-form"].elements['testMode'].value = "true";
				//document.getElementById("sponsorSubmitButton").innerHTML = "Validate Server";
				//document.getElementById("sponsorSubmitButton").setAttribute('onclick','skipValidationAndSubmit();');
			}
			
			function stubForRoundTrip() {
				document.forms["sponsor-tester-form"].elements['frontSide'].checked = false
				document.forms["sponsor-tester-form"].elements['serverSide'].checked = false;
				document.forms["sponsor-tester-form"].elements['allSide'].checked = true;
				document.forms["sponsor-form"].action = "mod-sponsor-processor.php";
				document.forms["sponsor-form"].elements['testMode'].value = "";
				//document.getElementById("sponsorSubmitButton").innerHTML = "Round Trip";
				//document.getElementById("sponsorSubmitButton").setAttribute('onclick','sponsorValidateAndSubmit();');
			}
			
			function skipValidationAndSubmit() {
				document.forms["sponsor-form"].submit();
			}
		</script>		
	</head>
	<body>
		<div class="container">
			<p>SELECT TEST MODE</p>
			<p>NOTE: To clear success message, remove parameters from request url in browser bar and reload</p>
			<form id="sponsor-tester-form" class="pure-form sponsor-form" action="" method="">
			<p><input type="radio" name="testRadio" id="frontSide" onClick="stubForFrontValidation();" checked /> Front side input validation (no server side validation, email, or data post)</p>
			<p><input type="radio" name="testRadio" id="serverSide" onClick="stubForServerValidation();" /> Server side input validation (no front validation, email, or data post)</p>
				<ul><li>This mode allows testing on post-submit alterations to the post data by using a browser plug-in like TamperData</li></ul>
			<p><input type="radio" name="testRadio" id="allSide" onClick="stubForRoundTrip();" /> Full functionality (all validations, email, and data post)</p>
		</form>
			<div class="allianceContent">
					<?php include("mod-sponsor.php"); ?>					
			</div>
		</div>

		<script>
				stubForFrontValidation();
		</script>
		
	</body>
</html>




