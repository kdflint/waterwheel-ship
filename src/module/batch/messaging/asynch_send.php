#!/usr/bin/php

<?php

require_once("domain/Util.php");
require_once("domain/Message.php");

$conf = array('append' => true, 'mode' => 0644, 'timeFormat' => '%X %x');
$logger = Log::singleton("file", "message_log", "", $conf, PEAR_LOG_DEBUG);
$sendQueueLengthMax = 10;
$queueEmpty = FALSE;

$logger->log("Message process started", PEAR_LOG_DEBUG);

while (!$queueEmpty) {

	$query = "select mq.id as id, mq.message_type_id_fk as type, mq.to_addr as to, mq.salutation_name as name from message_queue mq where status_id_fk = $1 limit $2";
	$cursor = Util::psExecute($query, array("10", $sendQueueLengthMax));
	$counter = 0;
	
	while ($row = pg_fetch_array($cursor)) {
		$message = new Message($row['type']);
		$message->setToAddr($row['to']);
		$message->setSalutationName($row['name']);
		$message->send();
		$counter++;
		$query = "update message_queue set status_id_fk = '11', update_dttm = now() where id = $1";
		Util::psExecute($query, array($row['id']));
		$logger->log("Message id " . $row['id'] . " status updated to Sent", PEAR_LOG_DEBUG);
	}

	$logger->log($counter . " messages processed", PEAR_LOG_INFO);
	
	if ($counter == 0) {
		$queueEmpty = TRUE;
		$logger->log("The message queue is empty", PEAR_LOG_DEBUG);
	}

}

$logger->log("Message process ended", PEAR_LOG_INFO);	

exit(0);

?>