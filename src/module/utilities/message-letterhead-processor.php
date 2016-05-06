<?php

require_once("MessageLetterhead.php");

$message = new MessageLetterhead();

if (isset($message)) {
	$message->send();
} else { 
	echo("Message object is null.");
}

echo($message->toHTMLString());

?>