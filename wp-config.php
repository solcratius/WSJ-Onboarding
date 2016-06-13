<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link https://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'WSJ-Onboarding');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '4K)|XJB:|/qRiIk{;0F!;qqkXG@-jUx eI7Jq8a_Rs-i|-s+xP_L$6q/c@=#PK/!');
define('SECURE_AUTH_KEY',  '|ByhL }VEG|9Kj!!V-Q88gO|#hf/H!?MeRx(yDl?fErW&-H/rW.R~osL:;-(5Skx');
define('LOGGED_IN_KEY',    'Bc`T9Jnk%M%f{Z:1dqT{:+u#-AFu]$?r{;d@#cWc$RO1S2 #AqEcJk=|8v&J2DC$');
define('NONCE_KEY',        'C.s8Poi!%qIxqv)k,UN80^q8J|3hxr{/{MO|:K5N#siio<x%me^JOFMsP+*$M?.K');
define('AUTH_SALT',        'gkPPxd=89[ivj;71*tWCmD`HmaaD5F#RvW/OQw:}/tYy-7>)lF->x*c>s!d/FW5^');
define('SECURE_AUTH_SALT', 'Z`WkXu3?ZV`*!T(p&c* Q@$dvnc7x(>HHpq}t}k^|]G-eLc{tH6>dwcIxp!Q;2nv');
define('LOGGED_IN_SALT',   '{H ].Sl#7?W08.aRF=BS8f0<W!g0]B&Xy>^S>y{+[|$DoG,;#kUV(}a9FPSJ2#a~');
define('NONCE_SALT',       '|0+-Sn_Gak2kHtK&vyTeH+0nGcG-^-yz |In7*)Z|k-r?]qx#:XUE5?4pKd-Hk|3');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
