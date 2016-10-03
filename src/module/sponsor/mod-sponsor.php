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
	<div class="" style="font-size:130%;margin-bottom:10px;">	
		<p style="margin:10px 10px 10px 30px;font-size:110%;"><span style="float:right;padding:5px;"><span class="fa fa-file-pdf-o fa-2x"></span> <a class="mod-about-anchor" href="<?php echo Util::getStaticDownloadPath(); ?>/Member_Benefit_Summary.pdf" target="_blank">Complete Details</a></span><b>Three membership levels,<br/>structured by individual or team.*</b></p>
	</div>
	<table class="pure-table" style="font-size:98%;">
		<thead><tr>
			<td style="width:56px;">Level</td>
			<td style="">Great For</td>
			<td>Annual Dues</td>
			<td style="background:#f68620;border-radius:10px;width:83px;"><a class="benefits-grid" href="javascript:void(0)" onclick="toggleMemberDetails('package-details-nexus');"><div style="height:100%;width:100%;"><span class="fa fa-external-link-square fa-lg" style="float:right;"></span>Nexus<br/>Web&nbsp;Meet</div></a></td>
			<td style="background:#dae0bc;border-radius:10px;width:85px;"><a class="benefits-grid" href="javascript:void(0)" onclick="toggleMemberDetails('package-details-training');"><div style="height:100%;width:100%;"><span class="fa fa-external-link-square fa-lg" style="float:right;"></span>Training<br/>Package</div></a></td>
			<td style="background:#a6c3ce;border-radius:10px;width:72px;"><a class="benefits-grid" href="javascript:void(0)" onclick="toggleMemberDetails('package-details-caucus');"><div style="height:100%;width:100%;"><span class="fa fa-external-link-square fa-lg" style="float:right;"></span>Caucus<br/>Tracks</div></a></td>
		</tr></thead>
		<tbody>
			<tr><td><b>Community</b></td><td>Individuals</td><td>$0</td><td>-</td><td>Introduction</td><td>Track 2</td></tr>
			<tr><td><b>Activist</b></td><td>Volunteer teams, smaller&nbsp;committees or task forces</td><td>$120<br/>USD</td><td>Standard Feature Set</td><td>Standard Package</td><td>Track 1</td></tr>
			<tr><td><b>Director</b></td><td>Boards, larger committees, community groups</td><td>$200<br/>USD</td><td>Extended Feature Set</td><td>Extended Package</td><td>Tracks&nbsp;1&nbsp;&amp;&nbsp;2</td></tr>
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
			<tr><td colspan="3">Nexus Web Meet<a class="benefits-grid" href="<?php echo Util::getStaticDownloadPath(); ?>/Member_Benefit_NexusWM.pdf" target="_blank"><span class="fa fa-file-pdf-o fa-2x" style="float:right;"></span></a></td></tr>
			<tr><td>&nbsp;</td><td>Activist</td><td>Director</td></tr></thead>
			<tbody>
				<tr><td>Minutes</td><td>Unlim.</td><td>Unlim.</td></tr>
				<tr><td>Admins/Seats</td><td>3/6</td><td>10/20</td></tr>
				<tr><td>All-way video</td><td><img src="<?php echo($checkmark); ?>" /></td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Desktop share</td><td><img src="<?php echo($checkmark); ?>" /></td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Polling</td><td><img src="<?php echo($checkmark); ?>" /></td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Recording</td><td>&nbsp;</td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Skype audio</td><td>&nbsp;</td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				
				<tr><td>Much more...</td><td colspan="2" style="font-size:110%;"><span class="fa fa-file-pdf-o fa-lg"></span> <a class="mod-about-anchor" href="<?php echo Util::getStaticDownloadPath(); ?>/Member_Benefit_Summary.pdf" target="_blank">Complete List</a></td></tr>
			<tbody>
		</table>
	</div>

	<div id="package-details-training" style="display:none;">
		<table id="training-details-table" class="pure-table details-table">
			<thead>
			<tr><td colspan="3">Training Packages<a class="benefits-grid" href="<?php echo Util::getStaticDownloadPath(); ?>/Member_Benefit_Training.pdf" target="_blank"><span class="fa fa-file-pdf-o fa-2x" style="float:right;"></span></a></td></tr>
			<tr><td>Course</td><td>Activist</td><td>Director</td></tr></thead>
			<tbody>
				<tr><td>Intro. to Virtual Collaboration</td><td><img src="<?php echo($checkmark); ?>" /></td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Leading Meetings with Nexus</td><td><img src="<?php echo($checkmark); ?>" /></td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Adv. Virtual Collaboration</td><td>&nbsp;</td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Leading Webinars with Nexus</td><td>&nbsp;</td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
			<tbody>
		</table>
	</div>

	<div id="package-details-caucus" style="display:none;">
		<table id="caucus-details-table" class="pure-table details-table">
			<thead>
			<tr><td colspan="3">Caucus Tracks<a class="benefits-grid" href="<?php echo Util::getStaticDownloadPath(); ?>/Member_Benefit_Caucus.pdf" target="_blank"><span class="fa fa-file-pdf-o fa-2x" style="float:right;"></span></a></td></tr>
			<tr><td>&nbsp;</td><td>Activist</td><td>Director</td></tr></thead>
			<tbody>
				<tr><td>Track 1: Focused&nbsp;on improving&nbsp;the member owned Nexus software</td><td><img src="<?php echo($checkmark); ?>" /></td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Track 2: Focused on innovating new community solutions</td><td>&nbsp;</td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
			<tbody>
		</table>
	</div>
</div>
