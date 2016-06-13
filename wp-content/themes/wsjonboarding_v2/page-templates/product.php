<?php
/**
 * Template Name: Product
 *
 * @package WordPress
 * @subpackage WSJONBOARDING
 * @since WSJONBOARDING 1.0
 */

get_header(); ?>

<?php

	$id = get_the_ID();

	if ($id):
	
		$prodColor1 = get_field('color1', $id);
		$prodColor2 = get_field('color2', $id);
		$prodCTA_text = get_field('cta_text', $id);
		$prodCTA_url = get_field('cta_url', $id);
		$mobileUniqueBtn = get_field('mobile_unique_button', $id);
        $customCTAs = get_field('custom_ctas', $id);
		$prodMarquee = get_field('marquee_section', $id);
		$prodDetailCopy = get_field('detail_copy', $id);
		$prodFeature = array();
		$prodFeatureImg = array();

		for ($h = 1; $h < 4; $h ++):
			$tempName = 'feature' . $h . '_copy';
			$tempImgPath = 'feature' . $h . '_img';

			array_push($prodFeature, get_field($tempName));
			array_push($prodFeatureImg, get_field($tempImgPath));
		endfor;

    endif;
?>

<div class="marquee-container">
    <?php echo $prodMarquee; ?>
</div>
<div class="detail-container">
	<div class="prodContent-wrapper wrapper">
        <div class="detail-text">
        	<p><?php echo $prodDetailCopy; ?></p>
        </div>
        <div class="feature-container">
	        <div class="featureBox">
	        <?php for ($i = 0; $i < 3; $i ++): ?>
	        	<a href="#" class="item">
	        		<div class="img"><img src="<?php echo $prodFeatureImg[$i]; ?>" /></div>
	        		<div class="text"><?php echo $prodFeature[$i]; ?></div>
	        	</a>
	        <?php endfor; ?>
	        </div>
        </div>
        <div class="clearBoth"> </div>
    </div>
</div>
<div class="bottom-nav">
    <div class="button-wrapper">
		<div class="btn-wrapper">
        <?php if( $customCTAs && $customCTAs != "" && !$mobileUniqueBtn ): ?>

        	<div class="customBtn-wrapper"><?php echo $customCTAs; ?></div>

        <?php endif; ?>

		<?php if( $prodCTA_text ): ?>

			<a href="<?php echo $prodCTA_url; ?>" class="strip-cta" style="background-color:<?php echo $prodColor2; ?>;" onmouseover = "this.style.backgroundColor = '<?php echo $prodColor1; ?>'" onmouseout = "this.style.backgroundColor = '<?php echo $prodColor2; ?>'" target="_new">
				<div class="cta-text"><?php echo $prodCTA_text; ?></div>
				<div class="white-arrow"> </div>
			</a>

		<?php endif; ?>
			<div class="clearBoth"></div>
		</div>
    </div>
</div>

<?php get_footer(); ?>

