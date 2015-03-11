<?php 
require_once("../core/domain/Util.php");
?>

<p class="mod-about-leaderText">Northbridge leaders are made of special stuff. This organization is created by our leaders from the start to put front and center the concerns of those who are traditionally marginalized. You don't find this every day of the week, and goodness like this does not come into being without real life leaders who are able to envision and then forge new paths into the future. </p>

<div class="pure-menu pure-menu-open" style="border-width:0px;">
	<ul>
		<li><a href="#" onclick="switchLeaderView(0);" style="width:100px;margin-bottom:5px;text-align:left;">Board of Directors</a></li>
		<li><a href="#" onclick="switchLeaderView(1);" style="width:100px;margin-bottom:5px;text-align:left;">Executive Staff</a></li>
		<li><a href="#" onclick="switchLeaderView(2);" style="width:100px;margin-bottom:5px;text-align:left;">Volunteer Leaders</a></li>
	</ul>
</div>

<div class="leaders">
	<div id="leaderIndex0" class="mod-leader-frame mod-about-normalText">
		<p><a class="mod-about-anchor" href="https://www.linkedin.com/in/brittanyvanputten" target="_blank" onmouseover="focusLeaderPic('bvp');" onmouseout="unfocusLeaderPic('bvp');">Brittany VanPutten</a>, <b>President</b>, UX Designer, SpringCM; DePaul Univ</p>
		<p><a class="mod-about-anchor" href="https://www.linkedin.com/in/zgilyana" target="_blank" onmouseover="focusLeaderPic('zg');" onmouseout="unfocusLeaderPic('zg');">Zaia Gilyana</a>, <b>Secretary</b>, Development Manager, US Bancorp; DeVry Univ</p>
		<p><a class="mod-about-anchor" href="https://www.linkedin.com/in/aleximmerman" target="_blank" onmouseover="focusLeaderPic('ai');" onmouseout="unfocusLeaderPic('ai');">Alex Immerman</a>, <b>Treasurer</b>, Associate, Blue Ridge Partners; Univ of Chicago</p>
		<p><a class="mod-about-anchor" href="https://www.linkedin.com/in/kathyflint" target="_blank" onmouseover="focusLeaderPic('kf');" onmouseout="unfocusLeaderPic('kf');">Kathy D. Flint</a>, Founder, CEO, Northbridge Tech. Alliance; Univ of Chicago</p>
		<p><a class="mod-about-anchor" href="https://www.linkedin.com/in/sivakuppuswamy" target="_blank" onmouseover="focusLeaderPic('sk');" onmouseout="unfocusLeaderPic('sk');">Shiva Kuppuswamy</a>, Management Cnslt, McKinsey and Co.; Univ of Chicago</p>
		<p><a class="mod-about-anchor" href="https://www.linkedin.com/pub/dan-terrasi/0/a93/15b" target="_blank" onmouseover="focusLeaderPic('dt');" onmouseout="unfocusLeaderPic('dt');">Dan Terrasi</a>, Business Information Officer, US Bancorp; Hofstra Univ</p>
			<table class="pure-table" style="margin-left:20px;">
				<tr>
					<td><a href="https://www.linkedin.com/in/brittanyvanputten" target="_blank"><img src="<?php echo Util::getHttpCorePath(); ?>/images/leader_bvp.jpg" id="bvp" width="100" height="100" style="opacity:.5;border-radius:10px;"/></a></td>
					<td><a href="https://www.linkedin.com/in/zgilyana" target="_blank"><img src="<?php echo Util::getHttpCorePath(); ?>/images/leader_zg.jpg" id="zg" width="100" height="100" style="opacity:.5;border-radius:10px;"/></a></td>
					<td><a href="https://www.linkedin.com/in/aleximmerman" target="_blank"><img src="<?php echo Util::getHttpCorePath(); ?>/images/leader_ai.jpg" id="ai" width="100" height="100" style="opacity:.5;border-radius:10px;"/></a></td></tr>
				<tr>
					<td><a href="https://www.linkedin.com/in/kathyflint" target="_blank"><img src="<?php echo Util::getHttpCorePath(); ?>/images/leader_kf.jpg" id="kf" width="100" height="100" style="opacity:.5;border-radius:10px;"/></a></td>
					<td><a href="https://www.linkedin.com/in/sivakuppuswamy" target="_blank"><img src="<?php echo Util::getHttpCorePath(); ?>/images/leader_sk.jpg" id="sk" width="100" height="100" style="opacity:.5;border-radius:10px;"/></a></td>
					<td><a href="https://www.linkedin.com/pub/dan-terrasi/0/a93/15b" target="_blank"><img src="<?php echo Util::getHttpCorePath(); ?>/images/leader_dt.jpg" id="dt" width="100" height="100" style="opacity:.5;border-radius:10px;"/></a></td>
				</tr>
			</table>
	</div>

	<div id="leaderIndex1" class="mod-leader-frame">
		<p style="font-weight:bold;">Chief Executive Officer<span style="float:right;padding:10px;"><img src="<?php echo Util::getHttpCorePath(); ?>/images/leader_kf.jpg" id="kf" width="100" height="100" style="border-radius:10px;"/></span></p>
		<p class="mod-about-leaderText">Kathy Flint (M.S. with honors, University of Chicago) is the founder and CEO of Northbridge Technology Alliance</p>
		<p class="mod-about-normalText">In 2013 Kathy shifted her professional focus from the corporate sector to the nonprofit sector in order to advance the level of technology resources that are available to social change-makers. Prior to the founding of Northbridge, Kathy served in a variety of corporate software leadership roles. Most recently she was positioned with U.S. Bancorp as Development Manager for Internet and Electronic Payments, where she led enterprise-scale software engineering efforts supporting $5 billion in electronic transactions annually. </p>
	</div>
	<div id="leaderIndex2" class="mod-leader-frame" style="visibility:visible;opacity:1;">
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

	