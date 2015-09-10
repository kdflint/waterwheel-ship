<?php

require_once("MessageActivation.php");

$message = new MessageActivation();

if (isset($message)) {
	$message->send();
} else { 
	echo("Message object is null.");
}

echo($message->toString());

?>