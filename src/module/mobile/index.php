<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN">
<?php 
require_once("../core/domain/Util.php");
$coreHttpPath = Util::getHttpCorePath();
$applyHttpPath = Util::getHttpApplyPath();;

//http://detectmobilebrowsers.com/
$useragent=$_SERVER['HTTP_USER_AGENT'];
// if user agent does not match a mobile pattern, go to desktop site
if(!preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($useragent,0,4)))
	header('Location: http://northbridgetech.org');
?>

<html>

	<head>
		<meta http-equiv="Content-type" content="text/html;charset=UTF-8">	
		<meta id="meta" name="viewport" content="width=device-width; initial-scale=1.0" />	
		<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Oswald:400,300|Open+Sans|Oxygen|Swanky+and+Moo+Moo">	
		<link rel="stylesheet" type="text/css" href="<?php echo Util:: getHttpCorePath(); ?>/style/font-awesome-4.2.0/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="<?php echo $coreHttpPath; ?>/style/pure-min.css" />
		<link rel="stylesheet" type="text/css" href="<?php echo $coreHttpPath; ?>/style/style.css" />
		<link rel="stylesheet" type="text/css" href="<?php echo $applyHttpPath; ?>/mod-apply.css" />
		<style>
			body { 
				font: bold 12px/20px Oxygen, Arial, sans-serif;
				text-align: center; 
				background-color: #638f90;
				color:#484848;
				background: transparent;
				margin: 0px;
			}
			
			.container {
				position: relative;
				background-color: #ffffff;
				margin: 0px auto;
				text-align: left;
			}
			
			.table {
				width:90%;
				display:
				block;max-width:620px;
			}
	</style>	

	<script language="javascript" type="text/javascript" src="<?php echo $applyHttpPath; ?>/mod-apply.js"></script>	
	<script language="javascript" type="text/javascript" src="<?php echo $coreHttpPath; ?>/lib/script.js"></script>	
		
	<!-- register email-info lightbox close event -->
	<script>
		$(document).mouseup(function (event){
    	var clickedElement = event.target;
    	if(clickedElement.id.substring(0,10) !== "info-email") {
				hideInfoEmailField();
			}
		});
	</script>
	
	<script>
		// override the scripts in mod-apply.js
		
		function showInfoEmailField() {
			document.getElementById("info-email").style.display='block';
		}
		
		function hideInfoEmailField() {
			document.getElementById("info-email").style.display='none';
			var input = document.getElementById("info-email-input");
			var control = document.getElementById("info-email-button");
			var closer = document.getElementById("info-email-close-box");
			input.innerHTML = "<input type='email' name='email_1' placeholder='Recipient Email' maxlength='100' style='width:100%;margin-top:10px;' required >";
			control.innerHTML = "<span class='fa fa-play' style='margin-right:4px;' ></span>Send";
  		closer.style.display = "block";
  		control.onclick = function() {infoEmailValidateAndSubmit();};
		}

		function showInfoSuccessMessage(email_address) {
			var input = document.getElementById("info-email-input");
			var control = document.getElementById("info-email-button");
			var closer = document.getElementById("info-email-close-box");
  		input.innerHTML = "<span style='width:100%;margin-top:5px;'>Got it! Your information packet will be delivered in a few minutes to " + email_address + ".</span>";
  		control.innerHTML = "<span class='fa fa-close' style='margin-right:4px;' ></span>Close";
  		closer.style.display = "none";
  		control.onclick = function() {hideInfoEmailField();};
		}
</script>
	
	</head>
	
	<body>
		<div class="container" style="width:95%">
			<img src="<?php echo Util:: getHttpCorePath(); ?>/images/NB_horizontal_rgb.png" width="300" height="82" style="padding:20px 10px 10px 8px;"/>
			<div style="position:absolute;top:130px;width:45px;padding-left:8px;">		
				<a href="https://twitter.com/<?php echo Util::getTwitterHandle(); ?>" target="_blank"><span class="fa fa-twitter fa-3x" style="color:#dae0bc;"></a><br/>
				<a href="//plus.google.com/u/0/101145194341428988499?prsrc=3" rel="publisher" target="_blank" style="text-decoration:none;"><span class="fa fa-google-plus-square fa-3x" style="color:#dae0bc;"></a><br/>
				<a href="https://www.linkedin.com/company/2232384" target="_blank"><span class="fa fa-linkedin fa-3x" style="color:#dae0bc;"></a><br/>
				<a href="https://www.facebook.com/northbridgenfp#" target="_blank"><span class="fa fa-facebook-square fa-3x" style="color:#dae0bc;"></a><br/>
				<a href="https://github.com/NorthBridge/playbook/wiki/1.How-We-Do" target="_blank"><span class="fa fa-github fa-3x" style="color:#dae0bc;"></a>
			</div>
			<div style="position:absolute;top:130px;left:50px;">	
				<p >Is your team changing the world? You may be eligible for a global web conference room.</p>	
				<p >No games. No gimmicks. Just your mission.</p>
				<p style="margin:10px;" ><a class="pure-button button-link" style="width:190px;" href="javascript:void(0)" onclick="showInfoEmailField();">Order Your Information Packet</a></p>
				<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank"> 
					<input type="hidden" name="cmd" value="_s-xclick"> <input type="hidden" name="notify_url" value="http://northbridgetech.org/paypalIpnListener.php"> <input type="hidden" name="hosted_button_id" value="CR3GPPFSE7ARW">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
					<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" style="float:left;margin-left:20px;"> 
					<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"> 
				</form> 
				<a href="<?php echo $coreHttpPath; ?>/index.php?context=desktop" style="color:#d27b4b;margin-left:40px;">Desktop Site</a>
				
				<div id="info-email" class="white_content" style="min-height:156px;display:none;border-radius:8px;position:absolute;top:2px;left:0px;width:90%;">
					<form id="info-email-form" action="<?php echo Util::getHttpApplyPath(); ?>/mod-info-processor.php" method="POST">
						<p>We will send a packet of information to your email address. Your address used respectfully. We will not spam you.</p>
						<span id="info-email-input"><input type="email" name="email_1" placeholder="Recipient Email" maxlength="100" style="width:100%;margin-top:10px;" required ></span>					
							<a id="info-email-close-box" class="pure-button button-link" onclick="hideInfoEmailField();" style="width:46px;border-radius:4px;float:left;"><span class="fa fa-times" style="margin-right:4px;" ></span> Close</a>
							<a id="info-email-button" class="pure-button button-link" onclick="infoEmailValidateAndSubmit();" style="width:46px;border-radius:4px;float:right;"><span class="fa fa-play" style="margin-right:4px;" ></span>Send</a>						
					</form>
				</div>	
			</div>

			<div style="position:absolute;top:340px;">
				<a class="twitter-timeline" width="310" height="250" href="https://twitter.com/NorthbridgeNFP" data-widget-id="568601776015024128">Tweets by @NorthbridgeNFP</a>
				<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
			</div>
		
		</div>
	</body>
</html>

