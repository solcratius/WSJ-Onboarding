<?php
/**
 * homepage.php
 * Provides custom metabox support for edition inner page data entry
 * Only shows on 'homepage' post_type
 *
 **/
$data = array(
    'has_archive' => false,
    'public' => true,
    'show_ui' => true,
    'capability_type' => 'page',
    // 'exclude_from_search' => true,
    'hierarchical' => true,
    'supports' => array( 'title', 'editor', 'page-attributes' )
);

$partner_items = new Cuztom_Post_Type( 'Partnership', $data );

$page_id = $_GET['post'] ? $_GET['post'] : $_POST['post_ID'];
$my_post = get_post($page_id);

if ($my_post->post_parent != 0) 
{
  $partner_items->add_meta_box(
    'meta_feature',
    'Feature Items',
    array(
      'bundle', 
      array(
        array(
          'label' => 'Feature Title', 
          'name' => 'feature_title', 
          'type' => 'text'
        ),
        array(
          'label' => 'Feature URL', 
          'name' => 'feature_url', 
          'type' => 'text'
        ), 
        array(
          'label' => 'Feature Image',
          'name' => 'feature_img',
          'description' => '', 
          'type' => 'image'
        )
      )
    )
  );
}

add_action( 'init', 'add_category_taxonomy_to_partner' );

function add_category_taxonomy_to_partner() {
  register_taxonomy_for_object_type( 'category', 'partnership' );
}