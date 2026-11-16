import { describe, expect, it } from "vitest";
import { maphosaGalleries } from "@/lib/site-data";

describe("Maphosa portfolio galleries", () => {
  const galleriesByCategory = new Map(
    maphosaGalleries.map((gallery) => [gallery.category, gallery]),
  );

  it("groups every Maphosa image into its assigned category", () => {
    const wardrobes = [49, 55, 56, 34, 31, 28, 27, 25, 19, 14, 17, 18];
    const tvStands = [5, 33, 39, 48, 51];
    const kitchenImages = Array.from({ length: 56 }, (_, index) => index + 1).filter(
      (number) => number !== 16 && !wardrobes.includes(number) && !tvStands.includes(number),
    );

    expect(
      galleriesByCategory
        .get("Kitchens")
        ?.media.filter((media) => media.kind === "image")
        .map((media) => media.filename),
    ).toEqual(kitchenImages.map((number) => `img${number}.jpg`));
    expect(galleriesByCategory.get("Wardrobes")?.media.map((media) => media.filename)).toEqual(
      wardrobes.map((number) => `img${number}.jpg`),
    );
    expect(
      galleriesByCategory
        .get("TV Stands & Media Walls")
        ?.media.filter((media) => media.kind === "image")
        .map((media) => media.filename),
    ).toEqual(tvStands.map((number) => `img${number}.jpg`));
    expect(maphosaGalleries.flatMap((gallery) => gallery.media)).toHaveLength(57);
  });

  it("includes the videos in their assigned galleries", () => {
    expect(
      galleriesByCategory.get("Kitchens")?.media.filter((media) => media.kind === "video"),
    ).toMatchObject([{ filename: "vid2.mp4", kind: "video" }]);
    expect(
      galleriesByCategory
        .get("TV Stands & Media Walls")
        ?.media.filter((media) => media.kind === "video"),
    ).toMatchObject([{ filename: "vid3.mp4", kind: "video" }]);
  });
});
