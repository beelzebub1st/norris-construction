import { SafeImage } from "@/components/ui/SafeImage";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={`relative overflow-hidden rounded-2xl border border-[var(--color-stone)]/15 bg-[var(--color-stone)]/10 ${
            index === 0
              ? "aspect-[21/10] sm:col-span-2 lg:col-span-3"
              : "aspect-[4/3]"
          }`}
        >
          <SafeImage
            src={src}
            alt={
              index === 0
                ? `${title} project photo`
                : `${title} gallery image ${index + 1}`
            }
            fill
            className="object-cover"
            sizes={
              index === 0 ? "100vw" : "(max-width: 768px) 100vw, 33vw"
            }
            priority={index === 0}
            fallbackSrc="/images/projects/kitchen.jpg"
          />
        </div>
      ))}
    </div>
  );
}
