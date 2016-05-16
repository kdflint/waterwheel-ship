#!/usr/bin/php

<?php

require_once("domain/Util.php");
require_once("domain/MessageMembershipDirectEmail.php");

$conf = array('append' => true, 'mode' => 0644, 'timeFormat' => '%X %x');
$logger = Log::singleton("file", "direct_email_message_log", "", $conf, PEAR_LOG_INFO);
$sendQueueLengthMax = "1";
$queueEmpty = FALSE;

$logger->log("Direct email process started", PEAR_LOG_INFO);

while (!$queueEmpty) {

	$query="select p.id as id, p.crumb_id as crumb, p.cemail as email, p.cname as name, p.internal_code as code from prospects p where is_clear = 't' and is_sent = 'f' order by create_dttm asc limit $1";
	$cursor = Util::psExecute($query, array($sendQueueLengthMax));
	$counter = 0;
	
	while ($row = pg_fetch_array($cursor)) {
		$message = new MessageMembershipDirectEmail($row['email'], $row['name'], $row['code'], dechex($row['crumb']));
		$logger->log("Message dump " . $message->toString(), PEAR_LOG_DEBUG);
		$message->send();
		$counter++;
		$query = "update prospects set send_dttm = now(), is_sent = 't' where id = $1";
		Util::psExecute($query, array($row['id']));
		$logger->log("Message id " . $row['id'] . " status updated to Sent", PEAR_LOG_INFO);
	}

	$logger->log($counter . " messages processed", PEAR_LOG_INFO);
	
	$queueEmpty = TRUE;
}

//$logger->log("Message process ended", PEAR_LOG_INFO);	

exit(0);

?>