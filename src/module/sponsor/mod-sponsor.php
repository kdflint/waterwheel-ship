<?php 

require_once("../core/domain/Util.php");

$checkmark = "images/dT6okxEbc.resized2.png";

?>

<div class="mod-sponsor-contentLeft" style="font-size:130%;">
		<?php if (false) {
			echo "<div id='fade' class='black_overlay'></div>"; 
			echo "<div id='light_userprofile' class='white_content' style='border:thin solid #486c7a;'>";
			include("mod-closed.php");
			echo "</div>";
		} ?>
	<p style="margin:10px 10px 10px 30px;font-size:130%;"><b>What? Technology, training and planning</b>

	<div style="font-size:100%;margin-left:30px;">
		<p>Technology partners working together to offer a three-part package</p>
		<div style="float:left;opacity:.3;">
			<img src="../core/images/logo-collage.png" id="smallLogo" width="180" height="220" style="margin-top:10px;margin-left:-20px;margin-right:20px;"/>
		</div>
		<table class="pure-table" style="font-size:100%;margin-top:20px;margin-right:30px;width:60%;" >
			<thead>
			<tr>
				<td style="background:#f68620;border-radius:10px;"><a class="benefits-grid" href="javascript:void(0)" onclick="toggleMemberDetails('package-details-nexus');"><div 	style="height:100%;width:100%;"><span class="fa fa-plus-circle fa-lg" style="float:right;"></span>&nbsp;<br/>1. Private web meeting room</div></a></td>
			</tr>
			<tr><td></td></tr>
			<tr>
				<td style="background:#dae0bc;border-radius:10px;"><a class="benefits-grid" href="javascript:void(0)" onclick="toggleMemberDetails('package-details-training');"><div 	style="height:100%;width:100%;"><span class="fa fa-plus-circle fa-lg" style="float:right;"></span>&nbsp;<br/>2. Vendor-neutral training</div></a></td>
			</tr>
			<tr><td></td></tr>
			<tr style="margin-top:10px;">
				<td style="background:#a6c3ce;border-radius:10px;"><a class="benefits-grid" href="javascript:void(0)" onclick="toggleMemberDetails('package-details-caucus');"><div 	style="height:100%;width:100%;"><span class="fa fa-plus-circle fa-lg" style="float:right;"></span>&nbsp;<br/>3. Strategic planning</div></a></td>
			</tr>
		</thead>
		</table>
	</div>

		
	<!--
		<tbody>
			<tr><td><b>Community</b></td><td>Individuals</td><td>$0</td><td>-</td><td>Introduction</td><td>Track 2</td></tr>
			<tr><td><b>Activist</b></td><td>Volunteer teams, smaller&nbsp;committees or task forces</td><td>$120<br/>USD</td><td>Standard Feature Set</td><td>Standard Package</td><td>Track 1</td></tr>
			<tr><td><b>Director</b></td><td>Boards, larger committees, community groups</td><td>$200<br/>USD</td><td>Extended Feature Set</td><td>Extended Package</td><td>Tracks&nbsp;1&nbsp;&amp;&nbsp;2</td></tr>
		</tbody>
	</table>
	-->
</div>
<div class="mod-sponsor-contentRight">
	<?php if (false) {
			echo "<div id='fade' class='black_overlay'></div>"; 
		} ?>

	<div id="package-details-nexus" style="display:block;">
		<p class="skyblue" style="font-size:120%;margin:10px;"><b>Nexus Web Meet</b></p>
		<table id="nexus-details-table" class="pure-table details-table">
				<tr><td>All-way video</td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Desktop share</td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Polling</td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Recording</td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Breakout Rooms</td><td><img src="<?php echo($checkmark); ?>" /></td></tr>
				<tr><td>Unlimited Minutes</td><td>50 Seats</td></tr>
				<tr>
					<td><a class="benefits-grid" href="<?php echo Util::getStaticDownloadPath(); ?>/Whitepaper_NexusWebMeet.pdf" target="_blank"><span class="fa fa-file-pdf-o fa-2x orange" style="margin-right:8px;"></span><span class="skyblue" style="font-size:130%;"><b>Read</b></span></a></td>
					<td><a class="benefits-grid" href="<?php echo Util::getDemoUrl(); ?>" target="_blank"><span class="fa fa-wrench fa-2x orange" style="margin-right:8px;"></span><span class="skyblue" style="font-size:130%;"><b>Try It</b></span></a></td>
				</tr>
		</table>
		<a class="pure-button button-submit button-link three skyblue" style="font-size:130%;left:10px;" href="<?php echo Util::getGrantApplicationUrl(); ?>" target="_blank"><span class="fa fa-paper-plane" style="font-size:110%;margin-right:10px;" ></span>Details & Apply</a>
	</div>

	<div id="package-details-training" style="display:none;margin:10px;">
		<!--<a class="benefits-grid" href="<?php echo Util::getStaticDownloadPath(); ?>/Member_Benefit_Training.pdf" target="_blank"><span class="fa fa-file-pdf-o fa-2x" style="float:right;"></span></a>-->
		<p class="skyblue" style="font-size:120%;"><b>What good is technology unless you can use it confidently?</b></p>
		<p style="font-size:110%;">Web-based meeting technology can be used in different ways for different purposes. Anyone who uses this medium effectively  has spent time learning about it.</p>
		<p style="font-size:110%;">That's why this grant removes knowledge barriers, awarding a "just-right" amount of vendor-neutral training.</p>
		<a class="pure-button button-submit button-link three skyblue" style="font-size:130%;left:10px;" href="<?php echo Util::getGrantApplicationUrl(); ?>" target="_blank"><span class="fa fa-paper-plane" style="font-size:110%;margin-right:10px;" ></span>Details & Apply</a>
	</div>

	<div id="package-details-caucus" style="display:none;margin:10px;">
		<!--<a class="benefits-grid" href="<?php echo Util::getStaticDownloadPath(); ?>/Member_Benefit_Caucus.pdf" target="_blank"><span class="fa fa-file-pdf-o fa-2x" style="float:right;"></span></a>-->
		<p class="skyblue" style="font-size:120%;"><b>Does the technology actually improve your outcomes?</b></p>
		<p style="font-size:110%;">This is a risk-free, time-efficient way to explore new tech ideas and possibilities.</p>
		<p style="font-size:110%;">Our grantees emerge with a straightforward, vendor-neutral road map for their own technology adoption and become eligible for the benefits of Northbridge Technology Alliance's highly selective membership program.</p>
		<p></p>
		<a class="pure-button button-submit button-link three skyblue" style="font-size:130%;left:10px;" href="<?php echo Util::getGrantApplicationUrl(); ?>" target="_blank"><span class="fa fa-paper-plane" style="font-size:110%;margin-right:10px;" ></span>Details & Apply</a>
	</div>
</div>
