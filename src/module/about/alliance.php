<?php 
require_once("../core/domain/Util.php");
?>

<p class="mod-about-leaderText">
	<span style="float:right;padding:5px;">
<span class="fa fa-video-camera fa-1x"></span> <a class="mod-about-anchor" href="https://youtu.be/tk-QNJruZgM" target="_blank">Partner Perspective</a></br>
		<span class="fa fa-video-camera fa-1x"></span> <a class="mod-about-anchor" href="https://youtu.be/KrasyjOjglM" target="_blank">Volunteer Perspective</a>
	</span> The Alliance is where the Northbridge magic happens. Everything we do as an organization supports a dynamic, working alliance between social leaders and technical leaders. Northbridge helps social leaders pool their expertise, together imagining technology solutions that could raise productivity for all of them. Then our organized and efficient skilled IT volunteer teams dig in and build solutions that advance our partners reach.</p>

<div class="pure-menu pure-menu-open" style="border-width:0px;width:150px;">
	<ul>
		<li><a href="#" onclick="switchAllianceView(0);" style="width:100px;margin-bottom:5px;text-align:left;">Partners</a></li>
		<li><a href="#" onclick="switchAllianceView(1);" style="width:100px;margin-bottom:5px;text-align:left;">Volunteers</a></li>
	</ul>
</div>

<div class="leaders">
	<div id="allianceIndex0" class="mod-leader-frame mod-about-normalText" style="visibility:visible;opacity:1;top:120px;">
		<p class="mod-about-leaderText">These are just a few of the partners that Northbridge serves.</p>
		<img src="<?php echo Util::getHttpAboutPath(); ?>/images/cat.gif" width="223" height="100" style="padding-top:5px;padding-right:20px;"/>
		<img src="<?php echo Util::getHttpAboutPath(); ?>/images/fh.png" width="234" height="115" style="padding-top:5px;" />
		<img src="<?php echo Util::getHttpAboutPath(); ?>/images/cfcht.png" width="365" height="88" style="padding-top:5px;" />
		<img src="<?php echo Util::getHttpAboutPath(); ?>/images/cfhr.png" width="300" height="50" style="padding-top:0px;" />
		<img src="<?php echo Util::getHttpAboutPath(); ?>/images/edc.png" width="182" height="116" style="padding-top:5px;" />

	</div>

	<div id="allianceIndex1" class="mod-leader-frame" style="top:120px;"">
		<p class="mod-about-leaderText"><span style="float:right;padding:5px;"><span class="fa fa-cogs fa-2x"></span> <a class="mod-about-anchor" href="<?php echo Util::getHttpCorePath(); ?>/index.php?view=volunteer">Volunteer</a></span>Without our volunteers we've got nothing. With them we change the world. It really only seems right to name each and every one!</p>
		<p class="mod-about-leaderText">But since that's not possible in this space, and since our teams do enjoy a little friendly competition amongst themselves, we settle for naming a Team of the Month.</p>
		<p class="mod-about-header">Volunteer Team of the Month</p>
		<p class="mod-about-normalText">Team North Stars continues to break ground not only by developing features for the pilot deployment of Nexus but also for refining the Northbridge methods for volunteer engagement. The North Stars are</p>
		<ul>
			<li>Lou Patel, Coach</li>
			<li>Kathy Flint, Mentor</li>
			<li>Gretchen Saylor</li>
			<li>Elizabeth Eckhardt</li>
			<li>Will Alston</li>
			<li>Stephen Henry</li>
			<li>Jafar Abdelrahman</li>
		</ul>
	</div>

</div>

	