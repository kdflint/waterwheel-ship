<?php

require_once("../core/domain/Util.php");
require_once(Util::getFileDomainPath() . "/MessageMembershipDirectEmail.php");
require_once(Util::getFileDomainPath() . "/SojournersSponsoredEmail.php");

//$message = new MessageMembershipDirectEmail("northbridge.test@yahoo.com", "Ms. Collins", "2", "ffff");
$message = new SojournersSponsoredEmail("kathy.flint@hotmail.com");

if (isset($message)) {
	$message->send();
} else { 
	echo("Message object is null.");
}

echo($message->toHTMLString());

?>