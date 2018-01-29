<?php

require_once(dirname(__FILE__) . "/../../../config/env_config.php");
require_once(PHP_ROOT . "Validate.php");
require_once(PHP_ROOT . "Log.php");

final class Util {
	
	
	/*************** PATH UTILITIES ***************/
	
	private static $core_path = "/module/core";
	private static $mobile_path = "/module/mobile";
	private static $apply_path = "/module/apply";
	private static $volunteer_path = "/module/volunteer";
	private static $sponsor_path = "/module/sponsor";
	private static $about_path = "/module/about";
	private static $domain_path = "/domain";
	private static $download_path = "/download";	
	
	// TODO - put getters on all env_config constants

	public static function getHttpApplyPath() {
		return "http://" . ENV_HOST . APP_NAME . self::$apply_path;
	}
	
	public static function getHttpVolunteerPath() {
		return "http://" . ENV_HOST . APP_NAME . self::$volunteer_path;
	}
	
	public static function getHttpSponsorPath() {
		return "http://" . ENV_HOST . APP_NAME . self::$sponsor_path;
	}
	
	public static function getHttpAboutPath() {
		return "http://" . ENV_HOST . APP_NAME . self::$about_path;
	}
	
	public static function getHttpCorePath() {
		return "http://" . ENV_HOST . APP_NAME . self::$core_path;
	}
	
	public static function getHttpMobilePath() {
		return "http://" . ENV_HOST . APP_NAME . self::$mobile_path;
	}		
	
	public static function getHttpDomainPath() {
		return self::getHttpCorePath() . self::$domain_path;
	}
	
	public static function getHttpDownloadPath() {
		return self::getHttpCorePath() . self::$download_path;
	}
	
	public static function getFileApplyPath() {
		return WEB_ROOT . self::$apply_path;
	}
	
	public static function getFileVolunteerPath() {
		return WEB_ROOT . self::$volunteer_path;
	}
	
	public static function getFileSponsorPath() {
		return WEB_ROOT . self::$sponsor_path;
	}
	
	public static function getAboutSponsorPath() {
		return WEB_ROOT . self::$about_path;
	}
	
	public static function getFileCorePath() {
		return WEB_ROOT . self::$core_path;
	}
	
	public static function getFileDomainPath() {
		return self::getFileCorePath() . self::$domain_path;
	}
	
	public static function getStaticDownloadPath() {
		return self::getHttpDownloadPath();
	}
	
	public static function getDemoUrl() {
		return DEMO_URL;
	}
	
	public static function getGrantApplicationUrl() {
		return GRANT_APP_URL;
	}
	
	public static function getMemberRegrUrl($marketerId = '1') {
		return MEMBER_REGR_URL . $marketerId;
	}
	
	public static function isAllowedMarketerId($id) {
		return true;
	}
	
	public static function getEnvName() {
		return ENV_NAME;
	}
	
	public static function getTwitterHandle() {
		return TWITTER_HANDLE;
	}
	
	public static function getBlogId() {
		return BLOG_ID;
	}
	
	

	/*************** GENERAL UTILITIES ***************/
		
	//http://detectmobilebrowsers.com/, WHICH POINTS TO: //https://gist.github.com/anyulled/5880349
	public static function isMobileUserAgent($useragent) {		
		if(preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4)))						
		{
			return true;
		}
		return false;
	}

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

	public static function validateEmail($in) {
		if (filter_var($in, FILTER_VALIDATE_EMAIL)) {
			return true;
		}
		return false;
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
	

	/*************** TEMPORARY ***************/
	
	public static function sendEmail($email, $subject, $message, $from, $reply) {
		
 	$headers = "From: " . $from  . "\r\n" . "Reply-To: " . $reply . "\r\n" . "Bcc: support@nexus.northbridgetech.org"; 	
	mail($email, $subject, $message, $headers);
		
	}
	

	/*************** GENERAL SHARED ***************/
	
	public static function getMessageQueueInsert() {
		return "insert into message_queue (message_type_id_fk, to_addr, salutation_name, status_id_fk, create_dttm) values ($1, $2, $3, '10', now())";
	}
}

?>
