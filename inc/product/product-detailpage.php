<?php
/**
 * LimeSoda Product Detail Page
 * Detail Page of CPT "products"
 *
 * @package IWGPlating
 * @author LimeSoda
 * @copyright Copyright (c) 2020, LimeSoda
 * @link https://limesoda.com/
 */

namespace Limesoda\Astra_Child\Product\Detailpage;

use const Limesoda\Astra_Child\THEME_URI;
use const Limesoda\Astra_Child\THEME_DIR;

/** Enqueue Product Detail Page Styles and Scripts */
function enqueue_product_assets() {
	if (!is_singular('products')) {
		return;
	}

	wp_enqueue_style(
		'product-detailpage-slider-styles',
		THEME_URI . 'assets/js/product-detailpage.css',
		[],
		filemtime(THEME_DIR . 'assets/js/product-detailpage.css'),
	);
	wp_enqueue_style(
		'product-detailpage-styles',
		THEME_URI . 'assets/css/product-detailpage.css',
		[],
		filemtime(THEME_DIR . 'assets/css/product-detailpage.css'),
	);
	$asset_file = include THEME_DIR . '/index.asset.php';
	wp_register_script(
		'product-detailpage-scripts',
		THEME_URI . 'assets/js/product-detailpage.js',
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);
	wp_enqueue_script(
		'product-detailpage-scripts'
	);
}
add_action('wp_enqueue_scripts', '\Limesoda\Astra_Child\Product\Detailpage\enqueue_product_assets');

/** Disable Default Post Title for Products Page */
function ls_disable_default_post_title() {
	$post_types = ['products'];

	if ( !in_array(get_post_type(), $post_types, true) ) {
		return;
	}

	add_filter('astra_the_title_enabled', '__return_false');
	add_filter('astra_featured_image_enabled', '__return_false');
}
add_action('wp', '\Limesoda\Astra_Child\Product\Detailpage\ls_disable_default_post_title');

/** Breadcrumbs */
add_action('astra_primary_content_top', function() {
	if (is_singular('products')) {
		echo do_shortcode('[astra_breadcrumb]');
	}
});

/**
 * Add "Produkte" to breadcrumb of product detail pages
 */
add_filter('astra_breadcrumb_trail_items', function($breadcrumbs) {
	if (is_singular('products')) {
		$breadcrumbs[1] = '<a href="' . get_site_url() . '/productfinder/">Produkte</a>';
		$breadcrumbs[2] = get_the_title();
	}
	return $breadcrumbs;
});


/** Create Product Detail Page */
add_action('astra_entry_content_before', function () {
	if (is_singular('products')) {
		$current_id = get_the_ID();
		$new = get_field('product_new');
		$sample_button = get_field('product_samplebutton');
		$description = get_field('product_description');
		$properties_and_benefits = get_field('properties_and_benefits');
		$area_of_application = get_field('area_of_application');
		$downloads = get_field('downloads');
		$product_cat = wp_get_post_terms($current_id, 'product-categories');
		$metals = wp_get_post_terms($current_id, 'metal_and_accessories');
		$colors = wp_get_post_terms($current_id, 'colors');
		?>
		<section class="ls-productdetail">
			<figure class="ls-productdetail__gallery">
				<?php get_template_part('inc/product/product', 'detailpage-slider'); ?>
			</figure>
			<div class="ls-productdetail__info">
				<div class="ls-productdetail__info__tags">
					<?php if ($product_cat && count($product_cat) > 0) :
						foreach ($product_cat as $cat) :
							$tax_color = get_field('tax_color', $cat);
							$bg_color = ($tax_color ? ' style="background-color: ' . $tax_color . ';"' : ' style="color: var(--color-font); border: 1px solid var(--color-font);"');
							?>
							<span class="ls-productdetail__info__tags__category"<?php echo $bg_color; ?>>
								<?php echo $cat->name; ?>
							</span>
						<?php endforeach;
					endif; ?>
					<?php if ($new) : ?>
						<span class="ls-productdetail__info__tags__new">
							<?php echo __('NEW', 'iwgplating'); ?>
						</span>
					<?php endif; ?>
				</div>
				<?php if ($metals || $colors) : ?>
					<div class="ls-productdetail__info__labels">
						<?php if ($metals && count($metals) > 0) :
							foreach ($metals as $metal) : ?>
								<span><?php echo $metal->name; ?></span>
							<?php endforeach;
						endif; ?>
					</div>
				<?php endif; ?>
				<h1 class="ls-productdetail__info__headline"><?php echo get_the_title(); ?></h1>
				<?php if ($description) : ?>
					<?php echo $description; ?>
				<?php endif; ?>
				<?php if ($sample_button) : ?>
				<a class="ls-productdetail__order_sample" id="add-to-sample-wishlist" href="<?php echo __('/en/order-sample', 'iwgplating'); ?>">
					<span class="ls-order-sample">
					<?php echo __('Order Sample', 'iwgplating'); ?>
					</span>
					<span class="ls-sample-added">
					<?php echo __('Sample added to Wishlist', 'iwgplating'); ?>
					</span>
				</a>
				<?php endif; ?>
				<?php if ($properties_and_benefits) : ?>
					<h2 class="ls-productdetail__info__h2"><?php echo __('Properties & Benefits', 'iwgplating'); ?></h2>
					<?php echo $properties_and_benefits; ?>
				<?php endif; ?>
				<?php if ($area_of_application) : ?>
					<h2 class="ls-productdetail__info__h2"><?php echo __('Area of Application', 'iwgplating'); ?></h2>
					<?php echo $area_of_application; ?>
				<?php endif; ?>
				<?php if ($downloads && count($downloads) > 0) : ?>
					<hr>
					<h3 class="ls-productdetail__info__h3"><?php echo __('Downloads', 'iwgplating'); ?></h3>
					<ul class="ls-productdetail__info__downloads">
						<?php foreach ($downloads as $download) : ?>
							<li class="ls-productdetail__info__downloads__item">
								<a href="<?php echo $download['file_upload']['url']; ?>" target="_blank">
									<?php echo $download['file_upload']['filename']; ?>
								</a>
							</li>
						<?php endforeach; ?>
					</ul>
				<?php endif; ?>
			</div>
		</section>
		<?php
	}
});

add_action('astra_primary_content_bottom', function() {
	if (is_singular('products')) {
		echo '<div class="ls-product-footer">';
		echo '<h3>' . __('Our Newest Products', 'iwgplating') . '</h3>';
		echo do_shortcode('[productslider/]') . '</div>';
	}
});
