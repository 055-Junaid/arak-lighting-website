export interface GalleryImage {
  src: string;
  w: number;
  h: number;
}

/**
 * Site photography, one entry per project slug, generated from the source
 * folders in `Project Photos/`. The first image in each list is the cover
 * used on the project cards. EXIF rotation is baked into the files when they
 * are generated, so these dimensions are what every renderer actually sees.
 */
export const PROJECT_GALLERIES: Record<string, GalleryImage[]> = {
  "solitaire-mall": [
    /* Cover for the project cards on the home and projects pages. A wider
       frame of the same dusk facade, replacing 03.jpg at the head of this
       list. New name rather than the old one rewritten: public/_headers marks
       this folder immutable, so anyone holding a cached 03.jpg would never be
       sent this picture. 03.jpg itself stays on disk — services-data.ts uses
       it as the Facade Lighting photograph. */
    { src: "/projects/solitaire-mall/03-wide.jpg", w: 1537, h: 1023 },
    { src: "/projects/solitaire-mall/01.jpg", w: 2560, h: 1707 },
    { src: "/projects/solitaire-mall/04.jpg", w: 2560, h: 1707 },
    { src: "/projects/solitaire-mall/05.jpg", w: 2560, h: 1920 },
    { src: "/projects/solitaire-mall/06.jpg", w: 2560, h: 1707 },
    { src: "/projects/solitaire-mall/07.jpg", w: 2560, h: 1707 },
    { src: "/projects/solitaire-mall/08.jpg", w: 2560, h: 1707 },
    { src: "/projects/solitaire-mall/09.jpg", w: 2560, h: 1707 },
    { src: "/projects/solitaire-mall/10.jpg", w: 2560, h: 1707 },
    { src: "/projects/solitaire-mall/11.jpg", w: 2560, h: 1707 },
    { src: "/projects/solitaire-mall/15.jpg", w: 2560, h: 1707 },
    { src: "/projects/solitaire-mall/16.jpg", w: 2560, h: 1707 },
    { src: "/projects/solitaire-mall/17.jpg", w: 2560, h: 1707 },
    /* Aerial of the lit facade at dusk. Also the Facade Lighting card on
       the home page, which used to carry its own crop of this view at
       /home/facade-solitaire-aerial.jpg — one file now serves both. */
    { src: "/projects/solitaire-mall/18-aerial-dusk.jpg", w: 1448, h: 1086 },
  ],
  "ritz-carlton": [
    { src: "/projects/ritz-carlton/01.jpg", w: 2400, h: 1135 },
    { src: "/projects/ritz-carlton/02.jpg", w: 2400, h: 1135 },
    { src: "/projects/ritz-carlton/03.jpg", w: 2400, h: 1135 },
    { src: "/projects/ritz-carlton/04.jpg", w: 2400, h: 1135 },
    { src: "/projects/ritz-carlton/05.jpg", w: 2400, h: 1135 },
  ],
  "four-points": [
    { src: "/projects/four-points/01.jpg", w: 1428, h: 1071 },
    /* The same photograph as the old 02.jpg, turned a quarter anticlockwise
       so the hotel stands up. New name rather than the old one rewritten:
       public/_headers marks this folder immutable, so anyone holding a
       cached 02.jpg would never be sent the corrected one. */
    { src: "/projects/four-points/02-upright.jpg", w: 1600, h: 900 },
  ],
  "riyadh-air": [
    { src: "/projects/riyadh-air/01.jpg", w: 1600, h: 1066 },
    { src: "/projects/riyadh-air/02.jpg", w: 2400, h: 1800 },
    { src: "/projects/riyadh-air/03.jpg", w: 2400, h: 1800 },
    { src: "/projects/riyadh-air/04.jpg", w: 2400, h: 1800 },
    { src: "/projects/riyadh-air/05.jpg", w: 2400, h: 1600 },
  ],
  "ladun-center": [
    { src: "/projects/ladun-center/01.jpg", w: 952, h: 1082 },
    { src: "/projects/ladun-center/02.jpg", w: 768, h: 1024 },
    { src: "/projects/ladun-center/03.jpg", w: 768, h: 1024 },
    { src: "/projects/ladun-center/04.jpg", w: 768, h: 1024 },
    { src: "/projects/ladun-center/05.jpg", w: 768, h: 1024 },
  ],
  "milling-mc2": [
    { src: "/projects/milling-mc2/01.jpg", w: 798, h: 443 },
    { src: "/projects/milling-mc2/02.jpg", w: 1037, h: 1280 },
    { src: "/projects/milling-mc2/03.jpg", w: 1200, h: 1600 },
    { src: "/projects/milling-mc2/04.jpg", w: 1200, h: 1600 },
    { src: "/projects/milling-mc2/05.jpg", w: 1200, h: 1600 },
    { src: "/projects/milling-mc2/06.jpg", w: 1200, h: 1600 },
    { src: "/projects/milling-mc2/07.jpg", w: 1252, h: 1280 },
    { src: "/projects/milling-mc2/08.jpg", w: 1200, h: 1600 },
    { src: "/projects/milling-mc2/09.jpg", w: 1138, h: 1280 },
  ],
  "seder-hq": [
    { src: "/projects/seder-hq/01.jpg", w: 1280, h: 591 },
    { src: "/projects/seder-hq/02.jpg", w: 1280, h: 591 },
    { src: "/projects/seder-hq/03.jpg", w: 1280, h: 591 },
    { src: "/projects/seder-hq/04.jpg", w: 1280, h: 591 },
    { src: "/projects/seder-hq/05.jpg", w: 1280, h: 591 },
    { src: "/projects/seder-hq/06.jpg", w: 591, h: 1280 },
  ],
  "athletic-showroom": [
    { src: "/projects/athletic-showroom/01.jpg", w: 1800, h: 2400 },
    { src: "/projects/athletic-showroom/02.jpg", w: 1800, h: 2400 },
    { src: "/projects/athletic-showroom/03.jpg", w: 1800, h: 2400 },
    { src: "/projects/athletic-showroom/04.jpg", w: 1800, h: 2400 },
    { src: "/projects/athletic-showroom/05.jpg", w: 1800, h: 2400 },
    { src: "/projects/athletic-showroom/06.jpg", w: 1800, h: 2400 },
    { src: "/projects/athletic-showroom/07.jpg", w: 1800, h: 2400 },
    { src: "/projects/athletic-showroom/08.jpg", w: 1800, h: 2400 },
    { src: "/projects/athletic-showroom/09.jpg", w: 1800, h: 2400 },
  ],
  "delfino": [
    { src: "/projects/delfino/01.jpg", w: 2400, h: 1109 },
    { src: "/projects/delfino/02.jpg", w: 2400, h: 1109 },
    { src: "/projects/delfino/03.jpg", w: 2400, h: 1109 },
    { src: "/projects/delfino/04.jpg", w: 2400, h: 1109 },
    { src: "/projects/delfino/05.jpg", w: 1848, h: 4000 },
  ],
};
