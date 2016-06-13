<?php
  require_once( dirname( __FILE__ ) . '/inc/load.php' );
  // function inc_load() {
  //   require_once( dirname( __FILE__ ) . '/inc/load.php' );
  // }

  // $uri = $_SERVER['REQUEST_URI'];

  // add_action('admin_head-index.php', 'inc_load');
  // echo "<script type='text/javascript'>alert('$uri');</script>";

  function wsjonboarding_scripts()
  {
    // Register the script like this for a theme:
    wp_enqueue_script( 'jquery', get_template_directory_uri() . '/scripts/vendor/jquery-1.10.1.min.js' );
    wp_enqueue_script( 'jqueryEase', get_template_directory_uri() . '/scripts/vendor/jquery.easing.1.3.js' );

    wp_enqueue_script( 'metaQuery', get_template_directory_uri() . '/scripts/vendor/metaquery.min-min.js' );
    wp_enqueue_script( 'modernizer', get_template_directory_uri() . '/scripts/vendor/modernizr-2.8.3.min.js' );

    wp_enqueue_script( 'slick', get_template_directory_uri() . '/scripts/vendor/slick.min.js' );
    wp_enqueue_script( 'wsjonboarding-script', get_template_directory_uri() . '/scripts/ONBOARDING.script.min.js' );
    // wp_enqueue_script( 'wsjonboarding-script', get_template_directory_uri() . '/scripts/ONBOARDING.script.js' );
  }

  add_action( 'wp_enqueue_scripts', 'wsjonboarding_scripts' );


  function custom_remove_cpt_slug( $post_link, $post, $leavename ) {
    if ( 'main_page' != $post->post_type || 'publish' != $post->post_status ) {
      return $post_link;
    }

    $post_link = str_replace( '/' . $post->post_type . '/', '/', $post_link );

    return $post_link;
  }

  add_filter( 'post_type_link', 'custom_remove_cpt_slug', 10, 3 );


  function custom_parse_request_tricksy( $query ) {
    // Only noop the main query
    if ( ! $query->is_main_query() )  return;

    // Only noop our very specific rewrite rule match
    if ( 2 != count( $query->query ) || ! isset( $query->query['page'] ) ) {
      return;
    }

    // 'name' will be set if post permalinks are just post_name, otherwise the page rule will match
    if ( ! empty( $query->query['name'] ) ) {
      $query->set( 'post_type', array( 'post', 'page', 'main_page' ) );
    }
  }

  add_action( 'pre_get_posts', 'custom_parse_request_tricksy' );


  function remove_admin_menu_items() {
    $remove_menu_items = array(__('Comments'),__('Dashboard'));//,__('Pages'),__('Posts'));
    global $menu;
    end ($menu);
    while (prev($menu)){
      $item = explode(' ',$menu[key($menu)][0]);
      if(in_array($item[0] != NULL?$item[0]:"" , $remove_menu_items)){
      unset($menu[key($menu)]);}
    }
  }

  add_action('admin_menu', 'remove_admin_menu_items');


  function my_login_logo() { ?>
    <style type="text/css">
        body.login div#login h1 a {
            background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/images/login-logo.png);
            background-size: 320px;
            width: 320px;
            height: 268px;
        }
    </style>
  <?php }

  add_action( 'login_enqueue_scripts', 'my_login_logo' );


  function run_custom_wp_admin_code() {
    // echo "<script type='text/javascript'>alert('acf-tab-wrap');</script>";
    wp_enqueue_script( 'custom_wp_admin_js', get_template_directory_uri() . '/scripts/admin.js', false, '1.0.0' );
  }
  
  add_action( 'admin_enqueue_scripts', 'run_custom_wp_admin_code' );

?>