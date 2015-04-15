<?php 
require_once("../core/domain/Util.php");
?>

<p class="mod-about-leaderText">Northbridge leaders are made of special stuff. This organization was founded from the start to put front and center the concerns of those who are traditionally marginalized. You don't find this every day of the week, and goodness like this does not come into being without real life leaders who are able to envision and then forge new paths into the future. </p>

<div class="pure-menu pure-menu-open" style="border-width:0px;width:150px;">
	<ul>
		<li><a href="#" onclick="switchLeaderView(0);" style="width:100px;margin-bottom:5px;text-align:left;">Board of Directors</a></li>
		<li><a href="#" onclick="switchLeaderView(1);" style="width:100px;margin-bottom:5px;text-align:left;">Executive Staff</a></li>
	</ul>
</div>

<div class="leaders">
	<div id="leaderIndex0" class="mod-leader-frame mod-about-normalText" style="visibility:visible;opacity:1;">
		<p class="mod-about-leaderText"><a class="mod-about-anchor" href="https://www.linkedin.com/in/brittanyvanputten" target="_blank" onmouseover="focusLeaderPic('bvp');" onmouseout="unfocusLeaderPic('bvp');">Brittany VanPutten</a>, <b>President</b>, UX Designer, SpringCM; DePaul Univ</p>
		<p class="mod-about-leaderText"><a class="mod-about-anchor" href="https://www.linkedin.com/in/zgilyana" target="_blank" onmouseover="focusLeaderPic('zg');" onmouseout="unfocusLeaderPic('zg');">Zaia Gilyana</a>, <b>Secretary</b>, Development Manager, US Bancorp; DeVry Univ</p>
		<p class="mod-about-leaderText"><a class="mod-about-anchor" href="https://www.linkedin.com/in/aleximmerman" target="_blank" onmouseover="focusLeaderPic('ai');" onmouseout="unfocusLeaderPic('ai');">Alex Immerman</a>, <b>Treasurer</b>, Associate, Blue Ridge Partners; Univ of Chicago</p>
		<p class="mod-about-leaderText"><a class="mod-about-anchor" href="https://www.linkedin.com/in/kathyflint" target="_blank" onmouseover="focusLeaderPic('kf');" onmouseout="unfocusLeaderPic('kf');">Kathy D. Flint</a>, Founder, CEO, Northbridge Tech. Alliance; Univ of Chicago</p>
		<p class="mod-about-leaderText"><a class="mod-about-anchor" href="https://www.linkedin.com/in/sivakuppuswamy" target="_blank" onmouseover="focusLeaderPic('sk');" onmouseout="unfocusLeaderPic('sk');">Shiva Kuppuswamy</a>, Management Cnslt, McKinsey and Co.; Univ of Chicago</p>
		<p class="mod-about-leaderText"><a class="mod-about-anchor" href="https://www.linkedin.com/pub/dan-terrasi/0/a93/15b" target="_blank" onmouseover="focusLeaderPic('dt');" onmouseout="unfocusLeaderPic('dt');">Dan Terrasi</a>, Business Information Officer, US Bancorp; Hofstra Univ</p>
			<table class="pure-table" style="margin-left:50px;">
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
		<p class="mod-about-leaderText"><a class="mod-about-anchor" href="https://www.youtube.com/playlist?list=PL8w0M4fNcdiBjWC5yamhB4g61ytByQ_wT" target="_blank" style="margin-left:5px;font-weight:bold;"><span class="fa fa-video-camera fa-2x" style="margin-right:20px;"></span></a>Kathy Flint</p>
		<p class="mod-about-normalText">In 2011 Kathy founded Northbridge Technology Alliance in order to realize her vision for bringing technological innovation into the service of social progress. In 2013 she shifted her professional focus from the corporate sector to the nonprofit sector in order to lead Northbridge to its full potential.</p>
		<p class="mod-about-normalText">Prior to founding Northbridge, Kathy served in a variety of Fortune 500 corporate software engineering and leadership roles. Most recently she was positioned with U.S. Bancorp as Development Manager for Internet and Electronic Payments, where she led enterprise-scale software engineering, architecture, and security efforts supporting $5 billion in electronic financial transactions annually. </p>
		<p class="mod-about-normalText">When not coding, leading volunteers, speaking, or fundraising for Northbridge, Kathy enjoys playing the cello and figuring out how to be the mother of two brilliant teenagers in Evanston, Illinois. </p>
		<p class="mod-about-normalText">M.S. with honors, University of Chicago </p>
	</div>
</div>

	