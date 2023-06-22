<?php
/**
 * LimeSoda Product Detail Page Slider
 * Slider for Detail Page of CPT "products"
 *
 * @package IWGPlating
 * @author LimeSoda
 * @copyright Copyright (c) 2020, LimeSoda
 * @link https://limesoda.com/
 */

$current_id = get_the_ID();
$gallery = get_field('gallery', $current_id);

if ( $gallery && count($gallery) > 0 ) { ?>
	<div class="ls-productdetail__gallery__slider swiper">
		<div class="swiper-wrapper">
			<?php foreach ( $gallery as $image ) : ?>
				<div class="swiper-slide">
					<img src="<?php echo $image['sizes']['large']; ?>" alt="<?php echo $image['alt']; ?>">
				</div>
			<?php endforeach; ?>
		</div>
	</div>
	<div thumbsSlider class="ls-productdetail__gallery__thumbs swiper">
		<div class="swiper-wrapper">
			<?php foreach ( $gallery as $image ) : ?>
				<div class="swiper-slide">
					<img src="<?php echo $image['sizes']['slider_thumbnail']; ?>" alt="<?php echo $image['alt']; ?>">
				</div>
			<?php endforeach; ?>
		</div>
	</div>
<?php }
