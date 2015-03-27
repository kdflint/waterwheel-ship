<?php 
require_once("../core/domain/Util.php");
?>

<p class="mod-about-leaderText">The Alliance is where the Northbridge magic happens. Everything we do as an organization supports a dynamic, working alliance between social leaders and technical leaders. Northbridge helps social leaders pool their expertise, together imagining technology solutions that could raise productivity for all of them. Then our organized and efficient skilled IT volunteer teams dig in and build solutions that advance our partners reach.</p>

<div class="pure-menu pure-menu-open" style="border-width:0px;width:150px;">
	<ul>
		<li><a href="#" onclick="switchAllianceView(0);" style="width:100px;margin-bottom:5px;text-align:left;">Partners</a></li>
		<li><a href="#" onclick="switchAllianceView(1);" style="width:100px;margin-bottom:5px;text-align:left;">Volunteers</a></li>
	</ul>
</div>

<div class="leaders">
	<div id="allianceIndex0" class="mod-leader-frame mod-about-normalText" style="visibility:visible;opacity:1;top:120px;">
	&nbsp;
	</div>

	<div id="allianceIndex1" class="mod-leader-frame" style="top:120px;"">
		<p class="mod-about-leaderText"><span style="float:right;padding:5px;"><span class="fa fa-cogs fa-2x"></span> <a class="mod-about-anchor" href="<?php echo Util::getHttpCorePath(); ?>/index.php?view=volunteer">Volunteer</a></span>Frankly, there is no such thing as a Northbidge volunteer who is not a leader. It really only seems right to name each and every one!</p>
		<p class="mod-about-leaderText">But since that's not possible in this space, and since our teams do enjoy a little friendly competition amongs themselves, we settle for naming a Team of the Month.</p>
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

	