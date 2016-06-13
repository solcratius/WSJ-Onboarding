<?php
/**
 * The template for displaying Comments.
 *
 * The area of the page that contains both current comments
 * and the comment form. 
 * 
 * @package WordPress
 * @subpackage wpcustom
*/

// require_once( dirname( __FILE__ ) .'/classThemeCustomize.php' );
// require_once( dirname( __FILE__ ) .'/wp_bootstrap_navwalker.php' );
require_once( dirname( __FILE__ ) .'/wp-cuztom/cuztom.php' );

//Autoload any metabox files found in /custom-metaboxes

$files = glob( dirname( __FILE__ ). '/custom-metaboxes/*php' );

if( !empty( $files ) )
{
    foreach( $files as $file )
    {
        if( file_exists( $file ) )
        {
            require_once( $file );   
        }
    }   
}