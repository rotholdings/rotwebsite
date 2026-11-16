import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ZoomIn } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  maphosaGalleries,
  projectCategories,
  type PortfolioGalleryMedia,
  type ProjectCategory,
} from "@/lib/site-data";

type GalleryItem = PortfolioGalleryMedia & {
  category: ProjectCategory;
  poster: string;
};

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Projects | ROT HOLDINGS" },
      {
        name: "description",
        content:
          "Explore kitchens, wardrobes and TV stands through project photography and video from Maphosa.",
      },
      { property: "og:title", content: "Projects | ROT HOLDINGS" },
      {
        property: "og:description",
        content: "Project photography and videos, thoughtfully grouped by cabinetry type.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);
  const visibleGalleries =
    filter === "All"
      ? maphosaGalleries
      : maphosaGalleries.filter((gallery) => gallery.category === filter);
  const visibleMedia = visibleGalleries.flatMap((gallery) =>
    gallery.media.map((media) => ({
      ...media,
      category: gallery.category,
      poster: gallery.coverImage,
    })),
  );
  const visibleVideos = visibleGalleries.flatMap((gallery) =>
    gallery.media
      .filter((media) => media.kind === "video")
      .map((media) => ({
        ...media,
        category: gallery.category,
        poster: gallery.coverImage,
      })),
  );
  const activeIndex = visibleMedia.findIndex((media) => media.filename === activeMedia?.filename);

  const moveMedia = (direction: number) => {
    if (activeIndex < 0) return;
    const nextIndex = (activeIndex + direction + visibleMedia.length) % visibleMedia.length;
    const nextMedia = visibleMedia[nextIndex];
    if (nextMedia) setActiveMedia(nextMedia);
  };

  const totalPhotos = maphosaGalleries.reduce(
    (total, gallery) => total + gallery.media.filter((media) => media.kind === "image").length,
    0,
  );
  const totalVideos = maphosaGalleries.reduce(
    (total, gallery) => total + gallery.media.filter((media) => media.kind === "video").length,
    0,
  );

  return (
    <>
      <PageHero
        eyebrow="Project gallery"
        title="Made to fit. Built to last."
        intro="Explore kitchens, wardrobes and TV stands through project photography and video from our Maphosa collection."
      />

      <section className="py-12 sm:py-16">
        <div className="container-page">
          <Reveal className="flex flex-col gap-6 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-3">Browse by craft</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter project media">
                {projectCategories.map((category) => {
                  const count =
                    category === "All"
                      ? totalPhotos + totalVideos
                      : (maphosaGalleries.find((gallery) => gallery.category === category)?.media
                          .length ?? 0);

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setFilter(category);
                        setActiveMedia(null);
                      }}
                      aria-pressed={filter === category}
                      className={`inline-flex items-center gap-2 border px-4 py-2.5 text-[0.63rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
                        filter === category
                          ? "border-navy bg-navy text-white"
                          : "border-border text-muted-foreground hover:border-navy hover:text-navy"
                      }`}
                    >
                      {category}
                      <span className="tabular-nums opacity-65">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {totalPhotos} photos <span className="mx-1">·</span> {totalVideos} videos
            </p>
          </Reveal>

          {visibleVideos.length > 0 && (
            <section className="mt-10 sm:mt-14" aria-labelledby="featured-videos-heading">
              <Reveal className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow mb-3">Moving image</p>
                  <h2 id="featured-videos-heading" className="display-title text-3xl sm:text-4xl">
                    From the workshop to the room.
                  </h2>
                </div>
              </Reveal>
              <div className="grid gap-5 lg:grid-cols-2">
                {visibleVideos.map((video, index) => (
                  <Reveal key={video.filename} delay={index * 0.06} effect="clip">
                    <figure className="bg-stone">
                      <video
                        src={video.src}
                        poster={video.poster}
                        controls
                        playsInline
                        preload="none"
                        aria-label={`${video.category} project video`}
                        className="aspect-video w-full bg-navy object-contain"
                      />
                      <figcaption className="flex items-center justify-between gap-4 px-4 py-3">
                        <span className="eyebrow">{video.category}</span>
                        <span className="text-xs text-muted-foreground">{video.label}</span>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20">
            {visibleGalleries.map((gallery) => {
              const photoCount = gallery.media.filter((media) => media.kind === "image").length;
              const videoCount = gallery.media.length - photoCount;

              return (
                <section key={gallery.slug} aria-labelledby={`${gallery.slug}-heading`}>
                  <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="eyebrow">{gallery.category}</p>
                      <h2
                        id={`${gallery.slug}-heading`}
                        className="display-title mt-2 text-3xl sm:text-4xl"
                      >
                        {gallery.title}
                      </h2>
                    </div>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {photoCount} photos{videoCount > 0 ? ` · ${videoCount} videos` : ""}
                    </span>
                  </Reveal>

                  <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 xl:columns-4">
                    {gallery.media
                      .filter((media) => media.kind === "image")
                      .map((media, index) => {
                        const item: GalleryItem = {
                          ...media,
                          category: gallery.category,
                          poster: gallery.coverImage,
                        };
                        const label = `${gallery.category} ${media.kind}: ${media.label}`;

                        return (
                          <Reveal
                            key={media.filename}
                            className="mb-3 break-inside-avoid sm:mb-4"
                            delay={(index % 4) * 0.035}
                            effect="clip"
                          >
                            <button
                              type="button"
                              onClick={() => setActiveMedia(item)}
                              aria-label={`Open ${label}`}
                              className="group relative block w-full overflow-hidden bg-stone text-left"
                            >
                              <img
                                src={media.src}
                                alt={label}
                                loading="lazy"
                                decoding="async"
                                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.035]"
                              />
                              <span className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/20 group-focus-visible:bg-navy/20" />
                              <span className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center bg-white text-navy transition-colors group-hover:bg-burgundy group-hover:text-white">
                                <ZoomIn size={17} />
                              </span>
                              <span className="absolute bottom-3 left-3 bg-navy/75 px-2.5 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white">
                                {media.label}
                              </span>
                            </button>
                          </Reveal>
                        );
                      })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <Dialog
        open={activeMedia !== null}
        onOpenChange={(open) => {
          if (!open) setActiveMedia(null);
        }}
      >
        <DialogContent className="max-w-[min(96vw,1400px)] gap-0 border-0 bg-navy p-0 text-white sm:rounded-none">
          {activeMedia && (
            <>
              <div className="relative flex min-h-[50svh] items-center justify-center bg-navy p-3 sm:p-8">
                {activeMedia.kind === "image" ? (
                  <img
                    src={activeMedia.src}
                    alt={`${activeMedia.category} project — ${activeMedia.label}`}
                    className="max-h-[76svh] w-full object-contain"
                  />
                ) : (
                  <video
                    key={activeMedia.filename}
                    src={activeMedia.src}
                    poster={activeMedia.poster}
                    controls
                    playsInline
                    preload="metadata"
                    className="max-h-[76svh] w-full object-contain"
                  />
                )}
                <button
                  type="button"
                  onClick={() => moveMedia(-1)}
                  className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/60 bg-navy/75 text-white transition-colors hover:bg-white hover:text-navy sm:left-6"
                  aria-label="Previous photo or video"
                >
                  <ArrowLeft size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => moveMedia(1)}
                  className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/60 bg-navy/75 text-white transition-colors hover:bg-white hover:text-navy sm:right-6"
                  aria-label="Next photo or video"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
              <div className="flex flex-wrap items-end justify-between gap-4 px-5 py-5 sm:px-8">
                <div>
                  <DialogDescription className="eyebrow text-white/60">
                    {activeMedia.category} · {activeMedia.kind}
                  </DialogDescription>
                  <DialogTitle className="display-title mt-2 text-xl text-white sm:text-2xl">
                    {activeMedia.label}
                  </DialogTitle>
                </div>
                <span className="text-xs tabular-nums text-white/65">
                  {activeIndex + 1} / {visibleMedia.length}
                </span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <CtaBand
        title="Your space could be next."
        text="Start with a conversation about the room, the possibilities and what matters most to you."
      />
    </>
  );
}
