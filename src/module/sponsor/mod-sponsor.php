<?php 

require_once("../core/domain/Util.php");

$checkmark = "images/dT6okxEbc.resized2.png";

?>

<div class="mod-sponsor-contentLeft">
		<?php if (false) {
			echo "<div id='fade' class='black_overlay'></div>"; 
			echo "<div id='light_userprofile' class='white_content' style='border:thin solid #486c7a;'>";
			include("mod-closed.php");
			echo "</div>";
		} ?>
	<div class="" style="font-size:130%;margin-bottom:15px;">	
		<p style="margin:10px 10px 10px 30px;font-size:110%;"><span style="float:right;padding:5px;"><span class="fa fa-file-pdf-o fa-2x"></span> <a class="mod-about-anchor" href="<?php echo Util::getStaticDownloadPath(); ?>/Northbridge_nexus.pdf" target="_blank">Complete Details</a></span><b>Two membership levels,<br/>structured by team.*</b></p>
	</div>
	<table class="pure-table">
		<thead><tr><td>Level</td><td>Great For</td><td>Annual Dues</td><td style="background:#f68620;border-radius:10px;"><a href="javascript:void(0)" onclick="toggleMemberDetails('package-details-nexus');" style="text-decoration:none;"><div style="height:100%;width:100%;">Nexus Web Meet</div></a></td><td style="background:#dae0bc;border-radius:10px;">Training Package</td><td style="background:#a6c3ce;border-radius:10px;">Caucus Tracks</td></tr></thead>
		<tbody>
			<tr><td><b>Activist</b></td><td>Volunteer teams, leadership teams, smaller committees or task forces</td><td>$120 USD</td><td>Standard Feature Set</td><td>Standard Package</td><td>Track 1</td></tr>
			<tr><td><b>Director</b></td><td>Boards of Directors, larger committees, community organizing groups</td><td>$200 USD</td><td>Extended Feature Set</td><td>Extended Package</td><td>Tracks&nbsp;1&nbsp;&&nbsp;2</td></tr>
		</tbody>
	</table>
	<div class="" style="font-size:120%;margin-top:5px;margin-left:20px;">	
		<b>* Organizational membership available 2017.</b>
	</div>
</div>
<div class="mod-sponsor-contentRight">
	<?php if (false) {
			echo "<div id='fade' class='black_overlay'></div>"; 
		} ?>

	<div id="package-details-nexus" style="display:block;">
		<table id="nexus-details-table" class="pure-table details-table">
			<thead>
			<tr><td colspan="3">Nexus Web Meet Highlights</td></tr>
			<tr><td>&nbsp;</td><td>Activist</td><td>Director</td></tr></thead>
			<tbody>
				<tr><td>Market value</td><td>$720</td><td>$1420</td></tr>
				<tr><td>Minutes</td><td>Unltd.</td><td>Unltd.</td></tr>
				<tr><td>Seats</td><td>6</td><td>18</td></tr>
				<tr><td>All-way video</td><td><img src="<?php echo($checkmark); ?>" /></td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Recording</td><td>&nbsp;</td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Skype integrated</td><td>&nbsp;</td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td colspan="3" style="font-size:110%;"><span class="fa fa-file-pdf-o fa-lg"></span> <a class="mod-about-anchor" href="<?php echo Util::getStaticDownloadPath(); ?>/Northbridge_nexus.pdf" target="_blank">Complete feature list</a></td></tr>
			<tbody>
		</table>
	</div>

	<div id="package-details-training" style="display:none;">
		<table id="training-details-table" class="pure-table details-table">
			<thead>
			<tr><td colspan="3">Training Courses</td></tr>
			<tr><td>&nbsp;</td><td>Activist</td><td>Director</td></tr></thead>
			<tbody>
				<tr><td>Intro. to Virtual Collaboration</td><td><img src="<?php echo($checkmark); ?>" /></td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Leading a Meeting with Nexus</td><td><img src="<?php echo($checkmark); ?>" /></td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Advanced Virtual Collaboration</td><td>&nbsp;</td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Leading a Webinar with Nexus</td><td>&nbsp;</td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
			<tbody>
		</table>
	</div>

	<div id="caucus-details-training" style="display:none;">
		<table id="caucus-details-table" class="pure-table details-table">
			<thead>
			<tr><td colspan="3">Caucus Tracks</td></tr>
			<tr><td>&nbsp;</td><td>Activist</td><td>Director</td></tr></thead>
			<tbody>
				<tr><td>Track 1: Focused on improving the member-owned Nexus software suite.</td><td><img src="<?php echo($checkmark); ?>" /></td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Track 2: Focused on innovating new solutions for your community.</td><td>&nbsp;</td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
			<tbody>
		</table>
	</div>
</div>
