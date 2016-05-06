<?php

require_once("MessageInvitation.php");

$message = new MessageInvitation();

if (isset($message)) {
	$message->send();
} else { 
	echo("Message object is null.");
}

echo($message->toString());

?>