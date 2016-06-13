<?php
/**
 * The Header template for the WSJONBOARDING
 *
 * Displays all of the <head> section and everything up till <div id="main">
 *
 * @package WSJONBOARDING
 */

$mainID = get_page_by_title( 'Home', OBJECT, 'main_page' )->ID;//get_page_by_title( 'Main' )->ID;

?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 9]>
<html class="ie ie9" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) & !(IE 8) & !(IE 9)]><!-->
<html <?php language_attributes(); ?> class="animate">
<!--<![endif]-->
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width">

  <meta name="breakpoint" content="phone" media="(max-width: 479px)">
  <meta name="breakpoint" content="small-tablet" media="(min-width: 480px) and (max-width: 639px)">
  <meta name="breakpoint" content="tablet" media="(min-width: 640px) and (max-width: 959px)">
  <meta name="breakpoint" content="desktop" media="(min-width: 960px)">

  <meta name="page.site" content="Engagement Portal">
  <meta name="page.content.type" content="Marketing">
  <meta name="page.section" content="Customer Resources">
  <meta name="page.region" content="na,us">

  <title><?php wp_title();?></title>
  <link rel="profile" href="#">
  <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
  
  <link rel="stylesheet" href="http://fonts.wsj.net/HCo_Whitney/font_HCo_Whitney.css">
  <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/style.css" type="text/css">
  
  <!--[if lt IE 9]>
  <script src="<?php echo get_template_directory_uri(); ?>/scripts/html5.js"></script>
  <![endif]-->

  <?php wp_head(); ?>

  <!-- Maxymiser script start -->
  <script type="text/javascript" src="//service.maxymiser.net/cdn/dowjones/js/mmcore.js"> </script>
  <!-- Maxymiser script end -->

  <!-- HOK CONTAINER FOR TESTING - DO NOT REMOVE - TEST RUNNING -->
  <script type="text/javascript" src="http://dc4d4996bc86498d8959-7dc0216bc6cc2f4ed239035dfc17235b.r83.cf3.rackcdn.com/tags/wsj/hoktop.js"></script>
  
</head>
<body id="top" <?php body_class(); ?>>
  <div id="top-strip">
    <a href="#" class="util-header desktopOnly">BACK TO TOP</a>
    <?php $utilBtn = get_field('util_button_text', $mainID);
      if ($utilBtn):
         echo '<a class="util-button" href="' . get_field('util_button_url', $mainID) . '">' . $utilBtn . '</a>';
      endif;
    ?>
  </div>
  <header id="header"<?php
    $bodyBgColor = get_field('body_bg_color', $mainID);
    if ($bodyBgColor ):
        echo ' style="background-color:' . $bodyBgColor . ';"';
    endif;
  ?>>
    <div class="masthead"<?php 
      $logoBgColor = get_field('logo_bg_color', $mainID);
      if ($logoBgColor ):
          echo ' style="background-color:' . $logoBgColor . ';"';
      endif;
    ?>>

      <h1><a href="<?php echo get_home_url(); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"<?php 
      $mainLogoL = get_field('main_logo_L', $mainID);
      $mainLogoM = get_field('main_logo_M', $mainID);
      $mainLogoS = get_field('main_logo_S', $mainID);
      if ($mainLogoL):
        echo ' class="custom"><img class="mainLogoL" src="' . $mainLogoL;
        echo '" /><img class="mainLogoM" src="' . $mainLogoM;
        echo '" /><img class="mainLogoS" src="' . $mainLogoS . '" />';
      else:
        echo '>THE WALL STREET JOURNAL';
      endif;
      ?></a></h1>
      <a id="back-to-top" class="anchor mobileOnly" href="#top">Back to top</a>
    </div>
    <nav class="navigation">
      <h2><?php echo get_field('site_header', $mainID); ?></h2>

      <?php
        
        $myPostType = get_post_type($mainID);

        // $args = array(
        //   'child_of'       => $mainID,
        //   'post_type'      => $myPostType,
        //   'hierarchical' => 0,
        //   'sort_column'    => 'menu_order',
        //   'sort_order'     => 'asc'
        // );
        
        $args = array(
          'child_of'        => $mainID,
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
          $prodURL = array();
          $prodName = array();
          $prodTitle = array();
          $prodIcon_alpha = array();
          $prodIcon_color = array();
          $prodColor1 = array();
          $prodColor2 = array();
          $prodInitCTA = array();
          $prodCTA_text = array();
          $prodCTA_url = array();
          $mobileUniqueBtn = array();
          $customCTAs = array();
          $prodIntroCopy = array();
          
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
              array_push($prodURL, get_permalink($post -> ID));
              array_push($prodName, get_the_title($post -> ID));
              array_push($prodTitle, get_field('product_title', $post -> ID));
              array_push($prodIcon_alpha, get_field('icon_alpha', $post -> ID));
              if (get_field('icon_color', $post -> ID)) array_push($prodIcon_color, get_field('icon_color', $post -> ID));
              else if (get_field('icon_default', $post -> ID)) array_push($prodIcon_color, get_field('icon_default', $post -> ID));
              array_push($prodColor1, get_field('color1', $post -> ID));
              array_push($prodColor2, get_field('color2', $post -> ID));
              array_push($prodInitCTA, get_field('init_cta', $post -> ID));
              array_push($prodCTA_text, get_field('cta_text', $post -> ID));
              array_push($prodCTA_url, get_field('cta_url', $post -> ID));
              array_push($mobileUniqueBtn, get_field('mobile_unique_button', $post -> ID));
              array_push($customCTAs, get_field('custom_ctas', $post -> ID));
              array_push($prodIntroCopy, get_field('intro_copy', $post -> ID));

              $totalProd += 1;
            }

          endforeach;
          
        wp_reset_postdata();

        endif;
      ?>
      <?php if ($totalProd > 0): ?>
        <div class="button-wrapper">
          <a href="#" class="prod-nav">
            <div class="arrow-left"> </div>
          </a>

        <?php for ($i = 0; $i < $totalProd; $i ++): ?>

          <a href="<?php echo $prodURL[$i]; ?>" class="prod-button" color1-data="<?php echo $prodColor1[$i]; ?>" color2-data="<?php echo $prodColor2[$i]; ?>">
            <div class="shad desktopOnly"></div>
            <div class="button-body">
              <div class="mobileOnly topBox" style="background-color:<?php echo $prodColor1[$i]; ?>;"><div class="white-close-icon"> </div></div>
              <div class="prod-icon">
                <div class="hOver" style="opacity:<?php echo $prodIcon_alpha[$i]; ?>;">
                  <img src="<?php echo $prodIcon_color[$i]; ?>" />
                  <span style="color:<?php echo $prodColor1[$i]; ?>;"><?php echo $prodTitle[$i]; ?></span>
                </div>
              </div>
              <div class="prod-stripe">
                <div class="bg-color" style="background-color:<?php echo $prodColor1[$i]; ?>;"> </div>
                <div class="init-text"><?php echo $prodInitCTA[$i]; ?></div>
                <div class="white-arrow"> </div>
              </div>
              <div class="mobileOnly content">
                <hr />
                <?php if( $customCTAs[$i] && $customCTAs[$i] != "" ): ?>

                    <div class="customBtn-wrapper"><?php echo $customCTAs[$i]; ?></div>

                <?php endif; ?>
                <?php if( $prodCTA_text[$i] && !$mobileUniqueBtn[$i] ): ?>

                    <button href="<?php echo $prodCTA_url[$i]; ?>" class="prod-cta" style="background-color:<?php echo $prodColor1[$i]; ?>;">
                      <div class="bg-color" style="background-color:<?php echo $prodColor2[$i]; ?>;"> </div>
                      <div class="btn-text"><?php echo $prodCTA_text[$i]; ?></div>
                      <div class="white-arrow"> </div>
                    </button>

                <?php endif; ?>
                <p class="prod-intro"><?php echo $prodIntroCopy[$i]; ?></p>

                <div class="feature-container">
                  <div class="featureBox">

                  <?php
                    $pre = '_meta_';

                    $options = array(
                        $pre . 'feature' => array()
                    );

                    foreach( $options as $o => $e )
                    {
                        $value = get_post_meta( $prodID[$i], $o, true );
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
                      if (!$feature['_feature_url']) array_push($tempFeatureLink, $prodCTA_url[$i]);
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

                  <?php for ($k = 0; $k < $prodFeatureAmount[$i]; $k ++): ?>
                    <button href="<?php echo $prodFeatureLink[$i][$k]; ?>" class="item" target="_new">
                      <div class="img"><img src="<?php echo $prodFeatureImg[$i][$k]; ?>" /></div>
                      <div class="text"><?php echo $prodFeature[$i][$k]; ?></div>
                    </button>
                  <?php endfor; ?>

                  </div>
                </div>

              </div>
            </div>
          </a>
        <?php endfor; ?>

          <a href="#" class="prod-nav">
            <div class="arrow-right"> </div>
          </a>
          <div class="clearBoth"></div>
        </div>
      <?php endif; ?>

      <div class="content-wrapper">
        <?php
          $partnerLogo = get_field('partner_logo', $mainID);
          if ($partnerLogo):
            echo '<div class="partner-logo"><img src="' . $partnerLogo . '" /></div><p class="landing-intro divided">';
          else:
            echo '<p class="landing-intro">';
          endif;
            
          echo get_field('intro_copy', $mainID); ?>
        </p>
        <div class="clearBoth"> </div>
        <?php for ($j = 0; $j < $totalProd; $j ++): ?>

          <div class="prod-content desktopOnly">
            <p><?php echo $prodIntroCopy[$j]; ?></p>
            <div class="button-wrapper">

            <?php if( $customCTAs[$j] && $customCTAs[$j] != "" ): ?>

              <div class="customBtn-wrapper"><?php echo $customCTAs[$j]; ?></div>

            <?php endif; ?>

            <?php if( $prodCTA_text[$j] ): ?>

              <a href="<?php echo $prodCTA_url[$j]; ?>" class="main-cta" target="_new">
                <div class="cta-shad"> </div>
                <div class="cta-body">
                  <div class="cta-bg" style="background-color:<?php echo $prodColor2[$j]; ?>;"> </div>
                  <div class="cta-text"><?php echo $prodCTA_text[$j]; ?></div>
                </div>
              </a>

            <?php endif; ?>

            </div>
          </div>

        <?php endfor; ?>
      </div>
      <div id="strip-nav" class="desktopOnly">
        <?php for ($k = 0; $k < $totalProd; $k ++):
          echo '<div class="button-wrapper"><div class="btn-wrapper">';
          if( $customCTAs[$k] && $customCTAs[$k] != "" ): ?>
              <div class="customBtn-wrapper"><?php echo $customCTAs[$k]; ?></div>
          <?php endif;

          if( $prodCTA_text[$k] ): ?>
              <a href="<?php echo $prodCTA_url[$k]; ?>" class="strip-cta" style="background-color:<?php echo $prodColor2[$k]; ?>;" onmouseover = "this.style.backgroundColor = '<?php echo $prodColor1[$k]; ?>'" onmouseout = "this.style.backgroundColor = '<?php echo $prodColor2[$k]; ?>'" target="_new">
                <div class="cta-text"><?php echo $prodCTA_text[$k]; ?></div>
                <div class="white-arrow"> </div>
              </a>
          <?php endif; ?>
              <div class="clearBoth"></div>
            </div>
          </div>
        <?php endfor; ?>
      </div>
    </nav>
    <a href="#" class="detail-btn desktopOnly"><span>LEARN MORE</span><div class="detail-arrow"></div></a>
  </header>

  <div id="main-wrapper">
    <div class="body-content desktopOnly">
