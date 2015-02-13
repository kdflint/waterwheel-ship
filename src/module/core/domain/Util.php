<?php

require_once(dirname(__FILE__) . "/../../../config/env_config.php");
require_once(PHP_ROOT . "Validate.php");
require_once(PHP_ROOT . "Log.php");

final class Util {
	
	/*************** PATH UTILITIES ***************/
	
	private static $core_path = "/module/core";
	private static $apply_path = "/module/apply";
	private static $domain_path = "/domain";	
	
	// TODO - put getters on all env_config constants

	public static function getHttpApplyPath() {
		return "http://" . ENV_HOST . APP_NAME . self::$apply_path;
	}
	
	public static function getHttpCorePath() {
		return "http://" . ENV_HOST . APP_NAME . self::$core_path;
	}
	
	public static function getHttpDomainPath() {
		return self::getHttpCorePath() . self::$domain_path;
	}
	
	public static function getFileApplyPath() {
		return WEB_ROOT . self::$apply_path;
	}
	
	public static function getFileCorePath() {
		return WEB_ROOT . self::$core_path;
	}
	
	public static function getFileDomainPath() {
		return self::getFileCorePath() . self::$domain_path;
	}
	
	

	/*************** GENERAL UTILITIES ***************/
		
	public static function newUuid() { 
    $s = strtolower(md5(uniqid(rand(),true))); 
    $guidText = 
        substr($s,0,8) . '-' . 
        substr($s,8,4) . '-' . 
        substr($s,12,4). '-' . 
        substr($s,16,4). '-' . 
        substr($s,20); 
    return $guidText;
	}

	public static function isCleanCharacterSet($in) {
		if (isset($in) && strlen($in) > 0) {
			if (preg_match("/[<>%*&=\/\\!]/", $in)) {
				return false;
			}
		}
	return true;
	}
	
	
	/*************** DATABASE UTILITIES ***************/

	private static function connect() {	
		
		$db_host = DB_HOST; 
		$db_user = DB_USER;  
		$db_pass = DB_PASSWORD; 
		$db = DB_NAME;
		
		$con = pg_connect("host=$db_host dbname=$db user=$db_user password=$db_pass")
    or trigger_error("Could not connect to the database server\n", E_USER_ERROR);   
    return $con;
	}
	
	private static function disconnect($con) {
		pg_close($con);
	}

	public static function psExecute($query, $input) {
		$result = $prepare = FALSE;
		$con = self::connect();
		$prepare = pg_prepare($con, "ps", $query);
		if (!$prepare) {
				trigger_error("Cannot prepare statement: $query\n", E_USER_ERROR);	
		}
		$result = pg_execute($con, "ps", $input);
		self::disconnect($con);
		if (!$result) {
			trigger_error("Cannot execute query: $query\n", E_USER_ERROR);
		}
		return $result;
	}
	
}

?>
