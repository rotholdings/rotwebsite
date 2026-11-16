import heroImg from "@/assets/hero.jpg";
import kitchenNoir from "@/assets/kitchen-noir.jpg";
import joineryStairs from "@/assets/joinery-stairs.jpg";

const maphosaImageUrls = new Map<number, string>();
for (const [path, url] of Object.entries(
  import.meta.glob<string>("../assets/Maphosa/img*.jpg", {
    eager: true,
    import: "default",
    query: "?url",
  }),
)) {
  const match = /img(\d+)\.jpg$/.exec(path);
  if (!match) throw new Error(`Unexpected Maphosa image asset path: ${path}`);
  maphosaImageUrls.set(Number(match[1]), url);
}

const maphosaVideoUrls = new Map<number, string>();
for (const [path, url] of Object.entries(
  import.meta.glob<string>("../assets/Maphosa/vid*.mp4", {
    eager: true,
    import: "default",
    query: "?url",
  }),
)) {
  const match = /vid(\d+)\.mp4$/.exec(path);
  if (!match) throw new Error(`Unexpected Maphosa video asset path: ${path}`);
  maphosaVideoUrls.set(Number(match[1]), url);
}

function getMaphosaImage(number: number): string {
  const url = maphosaImageUrls.get(number);
  if (!url) throw new Error(`Missing Maphosa image img${number}.jpg`);
  return url;
}

function getMaphosaVideo(number: number): string {
  const url = maphosaVideoUrls.get(number);
  if (!url) throw new Error(`Missing Maphosa video vid${number}.mp4`);
  return url;
}

export const heroImage = heroImg;
export const heroProjectImages = {
  kitchen: getMaphosaImage(1),
  noirKitchen: kitchenNoir,
  wardrobe: getMaphosaImage(49),
  tvStand: getMaphosaImage(5),
};

/* ------------------------------------------------------------------ */
/* Company details — edit these values to keep the site up to date.    */
/* ------------------------------------------------------------------ */

export const company = {
  name: "ROT HOLDINGS",
  tagline: "Design. Manufacture. Deliver.",
  phone: "+27 83 950 3019",
  phoneHref: "tel:+27839503019",
  whatsapp: "https://wa.me/27839503019",
  email: "mphosajohn@gmail.com",
  emailHref: "mailto:mphosajohn@gmail.com",
  location: "6376 Block S Mabopane, Gauteng 0180",
  founded: 2002,
};

export const serviceOptions = [
  "Custom Kitchens",
  "Built-in Wardrobes",
  "TV Stands & Media Walls",
  "Custom Joinery",
  "Other",
] as const;

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  includes: string[];
};

export const services: Service[] = [
  {
    slug: "kitchens",
    name: "Custom Kitchens",
    short: "Bespoke kitchens designed around the way you cook, gather and live.",
    description:
      "Each kitchen is developed around your room, routines and finish preferences. From a considered cabinet layout to the last handle, we coordinate the design, manufacture and installation as one considered project.",
    image: getMaphosaImage(1),
    includes: [
      "Custom-designed base and wall cabinetry",
      "Kitchen islands where the space allows",
      "Pantries and tailored storage solutions",
      "Internal shelving and drawer systems",
      "Quality boards and considered finish options",
      "Gelmar hardware, handles and accessories",
      "3D design and spatial planning",
      "Manufacturing and professional installation",
    ],
  },
  {
    slug: "wardrobes",
    name: "Built-in Wardrobes",
    short: "Floor-to-ceiling storage tailored to your wardrobe, not the other way around.",
    description:
      "Built-in and walk-in storage is planned around your room and the way you use it, with a considered balance of hanging, shelving and drawer space.",
    image: getMaphosaImage(49),
    includes: [
      "Custom wardrobe layouts",
      "Hanging sections, adjustable shelving and drawers",
      "Shoe and accessory storage",
      "Sliding or hinged door options",
      "Premium board and finish selections",
      "Gelmar hardware throughout",
      "Design, manufacturing and installation",
    ],
  },
  {
    slug: "tv-stands",
    name: "TV Stands & Media Walls",
    short: "Media walls and entertainment units that anchor the living room.",
    description:
      "Floating units, media walls and feature panelling are designed to bring the screen, storage and cable management together as part of the room.",
    image: getMaphosaImage(5),
    includes: [
      "Custom floating TV units",
      "Feature wall panelling and display cabinets",
      "Integrated shelving and concealed storage",
      "Optional lighting integration",
      "Premium finish options",
      "Gelmar hardware throughout",
      "Manufacturing and professional installation",
    ],
  },
  {
    slug: "custom-joinery",
    name: "Custom Joinery",
    short: "Staircases, bookshelves, office cabinetry — anything worth building well.",
    description:
      "From a home office to a one-off display piece, our custom joinery is developed to suit the setting, use and finish of each space.",
    image: joineryStairs,
    includes: [
      "Vanities and home-office cabinetry",
      "Bars, bookshelves and display units",
      "Bespoke furniture and commercial cabinetry",
      "Quality board, timber and finish options",
      "Gelmar hardware where required",
      "Design, manufacturing and installation",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Portfolio showcases                                                 */
/* ------------------------------------------------------------------ */

export type ProjectCategory = "Kitchens" | "Wardrobes" | "TV Stands & Media Walls";

export type PortfolioGalleryMedia = {
  filename: string;
  label: string;
  kind: "image" | "video";
  src: string;
};

export type PortfolioGallery = {
  slug: string;
  title: string;
  category: ProjectCategory;
  coverImage: string;
  media: PortfolioGalleryMedia[];
};

const wardrobeImageNumbers = [49, 55, 56, 34, 31, 28, 27, 25, 19, 14, 17, 18];
const tvStandImageNumbers = [5, 33, 39, 48, 51];
const kitchenImageNumbers = Array.from({ length: 56 }, (_, index) => index + 1).filter(
  (number) =>
    number !== 16 &&
    !wardrobeImageNumbers.includes(number) &&
    !tvStandImageNumbers.includes(number),
);

const makeImageMedia = (number: number): PortfolioGalleryMedia => ({
  filename: `img${number}.jpg`,
  label: `Image ${number}`,
  kind: "image",
  src: getMaphosaImage(number),
});

const makeVideoMedia = (number: number): PortfolioGalleryMedia => ({
  filename: `vid${number}.mp4`,
  label: `Video ${number}`,
  kind: "video",
  src: getMaphosaVideo(number),
});

export const maphosaGalleries: PortfolioGallery[] = [
  {
    slug: "maphosa-kitchens",
    title: "Maphosa Kitchens",
    category: "Kitchens",
    coverImage: getMaphosaImage(1),
    media: [makeVideoMedia(2), ...kitchenImageNumbers.map(makeImageMedia)],
  },
  {
    slug: "maphosa-wardrobes",
    title: "Maphosa Wardrobes",
    category: "Wardrobes",
    coverImage: getMaphosaImage(49),
    media: wardrobeImageNumbers.map(makeImageMedia),
  },
  {
    slug: "maphosa-tv-stands",
    title: "Maphosa TV Stands",
    category: "TV Stands & Media Walls",
    coverImage: getMaphosaImage(5),
    media: [...tvStandImageNumbers.map(makeImageMedia), makeVideoMedia(3)],
  },
];

export const featuredKitchenVideo = getMaphosaVideo(2);

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  "Kitchens",
  "Wardrobes",
  "TV Stands & Media Walls",
];

export const projectPricingStatement =
  "Every project is unique. Final pricing is determined following consultation, measurements, material selection and design requirements. Contact our team to arrange a project consultation and receive a tailored quotation.";
