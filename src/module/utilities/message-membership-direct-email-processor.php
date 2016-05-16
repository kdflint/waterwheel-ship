<?php

require_once("../core/domain/Util.php");
require_once(Util::getFileDomainPath() . "/MessageMembershipDirectEmail.php");

$message = new MessageMembershipDirectEmail("northbridge.test@yahoo.com", "Ms. Collins", "2", "ffff");

if (isset($message)) {
	//$message->send();
} else { 
	echo("Message object is null.");
}

echo($message->toHTMLString());

?>