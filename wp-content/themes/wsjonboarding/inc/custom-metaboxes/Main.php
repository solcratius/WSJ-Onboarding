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
    // 'rewrite' => array( 'slug' => 'main' ),
    'capability_type' => 'page',
    // 'exclude_from_search' => true,
    'hierarchical' => true,
    'supports' => array( 'title', 'editor', 'page-attributes' )
);

$main_items = new Cuztom_Post_Type( 'Main Page', $data );

$page_id = $_GET['post'] ? $_GET['post'] : $_POST['post_ID'];
// $main_post = get_page_by_title( 'Home', OBJECT, 'main_page' )->ID;
$my_post = get_post($page_id);

if ($my_post->post_parent != 0) 
{
  $main_items->add_meta_box(
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

add_action( 'init', 'add_category_taxonomy_to_main' );

function add_category_taxonomy_to_main() {
  register_taxonomy_for_object_type( 'category', 'main_page' );
}