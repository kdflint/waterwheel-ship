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
	} catch(Exception $e) { logErrorAndReturn($e, $testMode, null); }
			
	$application->apply();
	$application->notify();
} else { 
	
	logErrorAndReturn("Volunteer object is null.", $testMode, null);
}

logNormalAndReturn($testMode, $application);

function logErrorAndReturn($error, $test, $app) {
	if ($test) {
		echo $error->getMessage();
	} else {
		header("location:" . Util::getHttpCorePath() . "/index.php?view=apply");
	}
	exit(0);
}

function logNormalAndReturn($test, $app) {
	if ($test) {
		header("location:" . Util::getHttpApplyPath() . "/tester.php?view=apply&success=true");
	} else {
		header("location:" . Util::getHttpCorePath() . "/index.php?view=apply&success=true");
	}
	exit(0);
}	

?>