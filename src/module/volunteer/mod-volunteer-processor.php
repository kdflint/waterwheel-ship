<?php

//error_reporting(E_ALL);
//ini_set( 'display_errors','1'); 

define("DOMAIN_ROOT", "http://localhost/waterwheel/module/core/domain");

$volunteer;
$testMode = FALSE;

if (isset($_POST['testMode']) && !strcmp($_POST['testMode'], "true")) {
	require_once("TestVolunteer.php");
	$volunteer = new TestVolunteer();
	$testMode = TRUE;
} else {
	require_once("Volunteer.php");
	$volunteer = new Volunteer();
}

// All POST data is validated here by the domain object.

if (isset($volunteer)) {
	
	try {
		$volunteer->setFname($_POST['fname']); 
		$volunteer->setLname($_POST['lname']);
		$volunteer->setEmail($_POST['email_1']);
		//echo $volunteer->setMotives($_POST['motives']);
		//echo $volunteer->setSkills($_POST['skills']);
		$volunteer->setMotiveComment($_POST['otherMotive']);
		$volunteer->setSkillComment($_POST['otherSkill']);
		$volunteer->setAboutComment($_POST['otherInfo']);		
	} catch(Exception $e) { logErrorAndReturn($e, $testMode); }
		
	$volunteer->activate();
} else { 
	
	logErrorAndReturn("Volunteer object is null.", $testMode);
}

logNormalAndReturn($testMode, $volunteer);

function logErrorAndReturn($error, $test) {
	if ($test) {
		echo $error->getMessage();
	} else {
		header("location:http://localhost/waterwheel/module/volunteer/tester.php");
	}
	exit(0);
}

function logNormalAndReturn($test, $vol) {
	if ($test) {
		echo "No error";
		//echo "state = " . $vol->toString();
	} else {
		header("location:http://localhost/waterwheel/module/volunteer/tester.php");
	}
	exit(0);
}	



?>