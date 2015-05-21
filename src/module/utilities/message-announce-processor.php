<?php

require_once("MessageAnnounce.php");

$message = new MessageAnnounce();

if (isset($message)) {
	$message->send();
} else { 
	echo("Message object is null.");
}

echo($message->toString());

?>