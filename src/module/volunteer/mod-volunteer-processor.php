<?php

require_once("../core/domain/Util.php");

$volunteer;
$testMode = FALSE;

if (isset($_POST['testMode']) && !strcmp($_POST['testMode'], "true")) {
	require_once("TestVolunteer.php");
	$volunteer = new TestVolunteer();
	$testMode = TRUE;
} else {
	require_once(Util::getFileDomainPath() . "/Volunteer.php");
	$volunteer = new Volunteer();
}

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
	} catch(Exception $e) { logErrorAndReturn($e, $testMode, $volunteer); }
		
	$volunteer->activate();
	$volunteer->notify();
} else { 
	
	logErrorAndReturn(new Exception("Volunteer object is null."), $testMode, null);
}

logNormalAndReturn($testMode, $volunteer);

function logErrorAndReturn($error, $test, $vol) {
	if ($test) {
		echo $error->getMessage();
	} else {
		header("location:" . Util::getHttpCorePath() . "/index.php?view=volunteer");
	}
	exit(0);
}

function logNormalAndReturn($test, $vol) {
	if ($test) {
		header("location:" . Util::getHttpVolunteerPath() . "/tester.php?view=volunteer&success=true");
	} else {
		header("location:" . Util::getHttpCorePath() . "/index.php?view=volunteer&success=true");
	}
	exit(0);
}	


?>