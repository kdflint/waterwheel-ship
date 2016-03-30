<?php 
require_once("../core/domain/Util.php");
?>
<div>
	<div id="24lb_thread" class="lb24 lb_<?php echo(Util::getBlogId()); ?>" style="height:500px;overflow:auto;font-weight:normal;font-size:110%;"></div>
	<script type="text/javascript">
		(function() {
			var lb24 = document.createElement('script'); lb24.type = 'text/javascript'; lb24.id = '24lbScript'; lb24.async = true; lb24.charset="utf-8";
			lb24.src = '//v.24liveblog.com/embed/24.js?id=<?php echo(Util::getBlogId()); ?>';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(lb24);
		})();
	</script>
</div>