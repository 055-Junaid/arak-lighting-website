/**
 * The quality every photograph on the site is optimised at.
 *
 * Next's default is 75. These are WebP transforms — the source JPEGs are only
 * ever an input, never what a visitor downloads — and on this site's
 * photography the step from 75 to 60 is not visible at the sizes the images
 * are actually drawn: measured over the whole English site at phone widths,
 * it takes the photographs from 11.63MB to 9.55MB, about 18% off, and the
 * site as a whole from 13.4MB to 11.3MB.
 *
 * Below 60 it does start to show. At 45 the smooth wall-wash gradients and
 * the dark falloff — which is to say the product, on a lighting company's
 * site — begin to band and block up, for another 12 points of saving. So 60
 * is where this sits: the last setting that costs nothing visible.
 *
 * Any value used here has to be listed in `images.qualities` in
 * next.config.ts, or Next silently serves 75 instead.
 */
export const PHOTO_QUALITY = 60;
