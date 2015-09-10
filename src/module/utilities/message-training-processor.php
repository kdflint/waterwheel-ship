<?php

require_once("MessageTraining.php");

$message = new MessageTraining();

if (isset($message)) {
	$message->send();
} else { 
	echo("Message object is null.");
}

echo($message->toString());

?>