<?php
/**
 * LimeSoda child theme functions and definitions
 *
 * @link https://limesoda.com
 * @since 1.0.0
 * @package Limesoda\\Astra_Child
 */

namespace Limesoda\Astra_Child;

/**
 * Define Constants
 */
define(__NAMESPACE__ . '\THEME_DIR', trailingslashit(get_stylesheet_directory()));
define(__NAMESPACE__ . '\THEME_URI', trailingslashit(esc_url(get_stylesheet_directory_uri())));
define(__NAMESPACE__ . '\PARENT_THEME_URI', trailingslashit(esc_url(get_template_directory_uri())));

/**
 * Required WordPress enqueue statements for child theme
 * Registers Parent theme and main child theme assets
 */
function enqueue_scripts() {
	/** Deregister and register jquery to load in footer (enqueue happens per script dependency) */
	wp_deregister_script('jquery');
	wp_register_script('jquery', includes_url('/js/jquery/jquery.js'), false, null, true);

	wp_enqueue_style(
		'child-style',
		THEME_URI . 'style.css',
		['astra-theme-css'],
		filemtime(THEME_DIR . 'style.css'),
	);
	global $post;
	if (has_shortcode($post->post_content, 'facetwp')) {
		wp_enqueue_style(
			'productfinder-style',
			THEME_URI . 'assets/css/productfinder.css',
			[],
			filemtime(THEME_DIR . 'assets/css/productfinder.css'),
		);
	}

	$asset_file = include THEME_DIR . '/index.asset.php';
	wp_register_script(
		'custom-script',
		THEME_URI . 'index.js',
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
	wp_enqueue_script(
		'custom-script'
	);

	// Load css and js for homepage slider
	if (is_front_page()) {
		wp_enqueue_style(
			'slider-homepage-style',
			THEME_URI . 'assets/css/slider-homepage.css',
			[],
			filemtime(THEME_DIR . 'assets/css/slider-homepage.css'),
		);

		$asset_file = include THEME_DIR . 'assets/js/slider-homepage.asset.php';
		wp_register_script(
			'slider-homepage-script',
			THEME_URI . 'assets/js/slider-homepage.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
		wp_enqueue_script(
			'slider-homepage-script'
		);
	}

	$asset_file = include THEME_DIR . 'assets/js/sample-wishlist.asset.php';
	wp_register_script(
		'sample-wishlist-script',
		THEME_URI . 'assets/js/sample-wishlist.js',
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
	global $post;
	wp_localize_script(
		'sample-wishlist-script', 'wpVars', [
			'postID' => $post->ID,
		],
	);
	wp_enqueue_script(
		'sample-wishlist-script'
	);
}

add_action('wp_enqueue_scripts', '\Limesoda\Astra_Child\enqueue_scripts');

add_action('acf/input/admin_enqueue_scripts', function() {
	$asset_file = include THEME_DIR . 'assets/js/acf-color-picker.asset.php';
	wp_enqueue_script(
		'acf-color-picker',
		THEME_URI . 'assets/js/acf-color-picker.js',
		'acf-input',
		$asset_file['version'],
		true
	);
});

/**
 * Enqueue admin additional styles and scripts
 */
function enqueue_admin_scripts() {
	wp_enqueue_style(
		'admin-style',
		THEME_URI . 'admin.css',
		[],
		filemtime(THEME_DIR . 'admin.css'),
	);
}

add_action('admin_enqueue_scripts', '\Limesoda\Astra_Child\enqueue_admin_scripts');

/**
 * Disable Astra Google Fonts
 * use google webfonts helper to load them manually
 *
 * More Info: https://google-webfonts-helper.herokuapp.com/fonts
 */
add_filter('astra_google_fonts_selected', '__return_empty_array');

/**
 * Switch to font-display: swap
 */
add_filter('astra_fonts_display_property', function ($property) {
	$property = 'swap';
	return $property;
});

/**
 * Load translations for child theme php files (.mo files)
 * Add Thumbnail sizes
 */
add_action('after_setup_theme',
	function () {
		load_child_theme_textdomain('iwgplating', get_stylesheet_directory() . '/languages');
		add_theme_support('post-thumbnails');
		add_image_size('slider_thumbnail', 500, 300, ['center']);
		add_image_size('productfinder_thumbnail', 768, 924, ['center']);
	}
);

/*
 * Add Custom Image Sizes
 */
add_filter('image_size_names_choose', function ($sizes) {
	return array_merge( $sizes, [
		'slider_thumbnail' => 'slider_thumbnail',
		'productfinder_thumbnail' => 'productfinder_thumbnail',
	]);
});

/**
 * Add Class to uagb post carousel article
 */
add_filter('uagb_enable_post_class', '__return_true');

/**
 * Disable Counts on FacetWP fSelect facets, Dropdowns, Hierarchy Select facets, and Range List facets
 */
add_filter('facetwp_facet_dropdown_show_counts', '__return_false');

/**
 * Change Redakteur User Permission - Menu
 */
add_action('admin_menu', function() {
	global $pagenow;
	// gets the author role
	$role_object = get_role('editor');
	$role_object->add_cap('edit_theme_options');
	$role_object->add_cap('manage_options');
	if (current_user_can('editor')) {
		remove_submenu_page('themes.php', 'themes.php');
		remove_submenu_page('themes.php', 'widgets.php');
		remove_submenu_page('themes.php', 'customize.php');
		remove_submenu_page('themes.php', 'edit.php?post_type=astra-advanced-hook');
		remove_submenu_page('themes.php', 'customize.php?return=%2Fwp-admin%2Ftools.php');
		remove_submenu_page('themes.php', 'customize.php?return=%2Fwp-admin%2Ftools.php&#038;autofocus%5Bcontrol%5D=background_image');
	}
});

/**
 * Add translation for "Load more" string for FacetWP Pagination
 */
add_filter('facetwp_i18n', function($string) {
	if (isset(FWP()->facet->http_params['lang'])) {
		$lang = FWP()->facet->http_params['lang'];

		$translations = [];
		$translations['de']['Load more'] = 'Mehr laden';
		$translations['en']['Alle'] = 'All';
		$translations['en']['Neue Produkte'] = 'New Products';
		$translations['en']['Filter löschen'] = 'Delete Filters';

		if (isset($translations[ $lang ][ $string ])) {
			return $translations[ $lang ][ $string ];
		}
	}
	return $string;
});

add_filter('pll_rel_hreflang_attributes', function ($hreflangs) {
	$default = [
		'x-default' => reset($hreflangs), // Fetch the first language URL in the list as x-default
	];
	$hreflangs = $default + $hreflangs;
	return $hreflangs;
}, 10, 1 );

/**
 * Additional includes
 * Class files and additional procedural code
 */
require_once THEME_DIR . 'custom-post-types/ls-metalprices.php';
require_once THEME_DIR . 'custom-post-types/ls-products.php';
require_once THEME_DIR . 'custom-post-types/ls-jobs.php';
require_once THEME_DIR . 'blocks/class-gutenberg-blocks.php';
require_once THEME_DIR . 'shortcodes/index.php';
require_once THEME_DIR . 'api/metalprices.php';
require_once THEME_DIR . 'api/samples.php';
require_once THEME_DIR . 'inc/product/product-detailpage.php';
require_once THEME_DIR . 'inc/job/job-detailpage.php';
require_once THEME_DIR . 'inc/contact/contact-button.php';
require_once THEME_DIR . 'inc/cover/cover-slider.php';
require_once THEME_DIR . 'inc/news/news-acf.php';
require_once THEME_DIR . 'inc/news/news-detailpage.php';
require_once THEME_DIR . 'inc/admin/capabilities.php';
