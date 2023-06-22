<?php
/**
 * Limesoda Shortcode handling
 *
 * @link https://limesoda.com
 * @since 1.0.0
 * @package Limesoda\\Astra_Child\\Shortcodes
 */

namespace Limesoda\Astra_Child\Shortcodes;

use const Limesoda\Astra_Child\THEME_DIR;

/**
 *  Autoload all shortcodes
 */
function autoload_shortcodes() {
	foreach (glob(THEME_DIR . 'shortcodes/*', GLOB_ONLYDIR) as $dir) {
		require_once trailingslashit($dir) . 'index.php';
	}
}

autoload_shortcodes();
