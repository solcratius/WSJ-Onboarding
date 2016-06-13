<!-- <?php
/**
 * The template for single entries
 *
 * 
 * @package WSJONBOARDING
*/
	get_header('main');
	$mainID = get_page_by_title( 'Home', OBJECT, 'main_page' )->ID;

	$myPostType = get_post_type($mainID);

	$args = array(
		'child_of'     => $mainID,
		'post_type'      => $myPostType,
		'post_status' => 'publish',
		'posts_per_page' => -1,
		'caller_get_posts'=> 1,
		'hierarchical'   => 0,
		'sort_column'    => 'menu_order',
		'sort_order'     => 'asc'
	);

	$product_object = get_pages( $args ); //get_field('product_select', $mainID);

	if ($product_object):
		$prodID = array();
		$prodColor1 = array();
		$prodColor2 = array();
		$prodCTA_text = array();
		$prodCTA_url = array();
		$mobileUniqueBtn = array();
		$customCTAs = array();
		$prodMarquee = array();
		$prodDetailCopy = array();

		$prodFeature = array();
		$prodFeatureLink = array();
		$prodFeatureImg = array();
		$prodFeatureAmount = array();

		$totalProd = 0;

		foreach($product_object as $post):
			setup_postdata($post);

			if (get_field('switch_on', $post -> ID))
			{
				array_push($prodID, $post -> ID);
				array_push($prodColor1, get_field('color1', $post -> ID));
				array_push($prodColor2, get_field('color2', $post -> ID));
				array_push($prodCTA_text, get_field('cta_text', $post -> ID));
				array_push($prodCTA_url, get_field('cta_url', $post -> ID));
				array_push($mobileUniqueBtn, get_field('mobile_unique_button', $post -> ID));
				array_push($customCTAs, get_field('custom_ctas', $post -> ID));
				array_push($prodMarquee, get_field('marquee_section', $post -> ID));
				array_push($prodDetailCopy, get_field('detail_copy', $post -> ID));

				$totalProd += 1;
			}
		  
		endforeach;

		wp_reset_postdata();
	endif;
?>

<div class="marquee-container">
	<?php for ($i = 0; $i < $totalProd; $i ++):
		echo $prodMarquee[$i];
	endfor; ?>
</div>
<div id="detailAnchor" class="detail-container">
	<?php for ($j = 0; $j < $totalProd; $j ++): ?>
		<div class="prodContent-wrapper wrapper">
			<div class="detail-text">
				<p><?php echo $prodDetailCopy[$j]; ?></p>
			</div>
			<div class="feature-container">
		    <div class="featureBox">
          <?php
			$pre = '_meta_';

			$options = array(
			    $pre . 'feature' => array()
			);

			foreach( $options as $o => $e )
			{
			    $value = get_post_meta( $prodID[$j], $o, true );
			    if( $value != '' && $value != '0' )
			    {
			        //Make a more logical array key name so it's easier to use
			        $options[str_replace( $pre, '', $o)] = $value;
			        //Kill the current key so we don't reloop endelessly
			        unset( $options[$o] );
			    }
			}

            $tempFeature = array();
			$tempFeatureLink = array();
			$tempFeatureImg = array();
			$tempFeatureAmount = 0;

            foreach( $options['feature'] as $h => $feature )
            {
            	array_push($tempFeature, $feature['_feature_title']);
            	if (!$feature['_feature_url']) array_push($tempFeatureLink, get_field('cta_url', $prodID[$j]));
				else array_push($tempFeatureLink, $feature['_feature_url']);

				$img = wp_get_attachment_image_src( $feature['_feature_img'], 'full' )[0];
				if (!$img) $img = get_template_directory_uri() . '/images/feature-box.png';

				array_push($tempFeatureImg, $img);

				$tempFeatureAmount += 1;
            }

			array_push($prodFeature, $tempFeature);
			array_push($prodFeatureLink, $tempFeatureLink);
			array_push($prodFeatureImg, $tempFeatureImg);
			array_push($prodFeatureAmount, $tempFeatureAmount);

          ?>

	        <?php for ($k = 0; $k < $prodFeatureAmount[$j]; $k ++): ?>
	        	<a href="<?php echo $prodFeatureLink[$j][$k]; ?>" class="item" target="_new">
	        		<div class="img"><img src="<?php echo $prodFeatureImg[$j][$k]; ?>" /></div>
	        		<div class="text"><?php echo $prodFeature[$j][$k]; ?></div>
	        	</a>
	        <?php endfor; ?>

		    </div>
      </div>
      <div class="clearBoth"> </div>
    </div>
  <?php endfor; ?>
</div>
<div class="bottom-nav">
  <div class="button-wrapper">
  	<?php for ($m = 0; $m < $totalProd; $m ++): ?>
		<div class="btn-wrapper">
    <?php 
      $partnerLogo = get_field('partner_logo', $mainID);

      if ($partnerLogo && get_field('partner_logo_on_footer', $mainID)):
        echo '<div class="partner-logo"><img src="' . $partnerLogo . '" /></div>';
      else:

        if( $customCTAs[$m] && $customCTAs[$m] != "" ): ?>

        	<div class="customBtn-wrapper"><?php echo $customCTAs[$m]; ?></div>

        <?php endif; ?>

    		<?php if( $prodCTA_text[$m] ): ?>

    			<a href="<?php echo $prodCTA_url[$m]; ?>" class="strip-cta" style="background-color:<?php echo $prodColor2[$m]; ?>;" onmouseover = "this.style.backgroundColor = '<?php echo $prodColor1[$m]; ?>'" onmouseout = "this.style.backgroundColor = '<?php echo $prodColor2[$m]; ?>'" target="_new">
    				<div class="cta-text"><?php echo $prodCTA_text[$m]; ?></div>
    				<div class="white-arrow"> </div>
    			</a>

    		<?php endif; ?>
  			<div class="clearBoth"></div>
      <?php endif; ?>

		</div>
    <?php endfor; ?>
  </div>
</div>

<?php get_footer('main'); ?> -->