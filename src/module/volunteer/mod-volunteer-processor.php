<?php

//error_reporting(E_ALL);
//ini_set( 'display_errors','1'); 

require_once("../../config/env_config.php");

define("DOMAIN_ROOT", "http://" . $env_host . "/waterwheel/module/core/domain");

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

// All POST data is validated by the domain object.

if (isset($volunteer)) {
	
	try {
		$volunteer->setFname($_POST['fname']); 
		$volunteer->setLname($_POST['lname']);
		$volunteer->setEmail($_POST['email_1']);
		$volunteer->setMotives($_POST['motives']);
		$volunteer->setSkills($_POST['skills']);
		$volunteer->setMotiveComment($_POST['otherMotive']);
		$volunteer->setSkillComment($_POST['otherSkill']);
		$volunteer->setAboutComment($_POST['otherInfo']);		
	} catch(Exception $e) { logErrorAndReturn($e, $testMode, $env_host); }
		
	$volunteer->activate();
	$volunteer->notify();
} else { 
	
	logErrorAndReturn("Volunteer object is null.", $testMode, $env_host);
}

logNormalAndReturn($testMode, $volunteer, $env_host);

function logErrorAndReturn($error, $test, $host) {
	if ($test) {
		echo $error->getMessage();
	} else {
		header("location:http://" . $host . "/waterwheel/module/volunteer/tester.php");
	}
	exit(0);
}

function logNormalAndReturn($test, $vol, $host) {
	if ($test) {
		echo "No error";
	} else {
		header("location:http://" . $host . "/waterwheel/module/volunteer/tester.php");
	}
	exit(0);
}	



?>