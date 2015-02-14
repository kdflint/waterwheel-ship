<?php

require_once("../core/domain/Util.php");

$application;
$testMode = FALSE;
$env_host = ENV_HOST;

if (isset($_POST['testMode']) && !strcmp($_POST['testMode'], "true")) {
	require_once("TestApplication.php");
	$application = new TestApplication();
	$testMode = TRUE;
} else {
	require_once(Util::getFileDomainPath() . "/Application.php");
	$application = new Application();
}

// All POST data is validated by the domain object.

if (isset($application)) {
	
	try {
		$application->setOname($_POST['oname']); 
		$application->setEin($_POST['ein']);
		$application->setUrl($_POST['url']);
		$application->setBudget($_POST['budget']);
		$application->setTname($_POST['tname']);
		$application->setCname($_POST['cname']);
		$application->setEmail($_POST['email_1']);
		$application->setServices($_POST['services']);		
		$application->setServiceComment($_POST['otherService']);
		$application->setReach($_POST['reach']);		
		$application->setMission($_POST['mission']);	
	} catch(Exception $e) { logErrorAndReturn($e, $testMode); }
			
	$application->apply();
	$application->notify();
} else { 
	
	logErrorAndReturn("Volunteer object is null.", $testMode);
}

logNormalAndReturn($testMode, $application);

function logErrorAndReturn($error, $test) {
	if ($test) {
		echo $error->getMessage();
	} else {
		// TODO - log error
		echo $error->getMessage(); exit(0);
		header("location:" . Util::getHttpApplyPath() . "/tester.php");
	}
	exit(0);
}

function logNormalAndReturn($test) {
	if ($test) {
		echo "No error";
	} else {
		header("location:" . Util::getHttpApplyPath() . "/tester.php");
	}
	exit(0);
}	



?>