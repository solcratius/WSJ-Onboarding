<?php
/**
 * The Footer template for the WSJONBOARDING
 *
 * Displays all of the footer-content section to end tag of html.
 *
 * @package WSJONBOARDING
 */
	$mainID = get_page_by_title( 'Home', OBJECT, 'main_page' )->ID;
?>
		</div>
		<div class="service-content">
			<div class="customerservice-module">
				<h3>Questions or Feedback? Contact our Customer Service Team.</h3>
				<?php
					echo '<a class="greyBoxBtn" href="' . get_field('customer_service_link', $mainID) . '">CUSTOMER SERVICE</a>';
				?>
			</div>
		</div>
		<footer class="footer-content"<?php
		    $footerBgColor = get_field('footer_bg_color', $mainID);
		    if ($footerBgColor ):
		        echo ' style="background-color:' . $footerBgColor . ';"';
		    endif;
		?>>
			<p>&copy;Copyright <?php echo date("Y"); ?> <span class="nowrap"><a href="<?php echo esc_url( __( 'http://new.dowjones.com/', 'wsjapp' ) ); ?>" title="<?php esc_attr_e( 'Dow Jones Company', 'wsjapp' ); ?>">Dow Jones &amp; Company</a>, Inc.</span> <span class="nowrap">All Rights Reserved</span><br />
			<a class="greyBtn" href="http://www.wsj.com/policy/privacy-policy?mod=wsjapp">Privacy Policy</a> | <a class="greyBtn" href="http://www.wsj.com/policy/cookie-policy?mod=wsjapp">Cookie Policy</a></p>
			<?php do_action( 'wsj_credits' ); ?>
		</footer>
	</div>
	<script type="text/javascript">
	    (function(a,b,c,d) {
		    a='//tags.tiqcdn.com/utag/wsjdn/marketing-portal1/prod/utag.js';
		    b=document;
		    c='script';
		    d=b.createElement(c);
		    d.src=a;
		    d.type='text/java'+c;
		    d.async=true;
		    a=b.getElementsByTagName(c)[0];
		    a.parentNode.insertBefore(d,a);
	    })();
	</script>
	<div id="cx-scrim"> </div>

	<!-- HOK CONTAINER FOR TESTING - DO NOT REMOVE - TEST RUNNING -->
	<script type="text/javascript" src="http://dc4d4996bc86498d8959-7dc0216bc6cc2f4ed239035dfc17235b.r83.cf3.rackcdn.com/tags/wsj/hokbottom.js"></script>
	<?php wp_footer(); ?>
</body>
</html>