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

$edu_items = new Cuztom_Post_Type( 'Education', $data );

$page_id = $_GET['post'] ? $_GET['post'] : $_POST['post_ID'];
$my_post = get_post($page_id);

if ($my_post->post_parent != 0) 
{
  $edu_items->add_meta_box(
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

add_action( 'init', 'add_category_taxonomy_to_edu' );

function add_category_taxonomy_to_edu() {
  register_taxonomy_for_object_type( 'category', 'education' );
}