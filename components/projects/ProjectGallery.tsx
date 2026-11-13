import Image from "next/image";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {images.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={`relative overflow-hidden bg-[var(--color-stone)]/10 ${
            index === 0 && images.length > 1 ? "sm:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={src}
            alt={
              index === 0
                ? `${title} project photo`
                : `${title} gallery image ${index + 1}`
            }
            fill
            className="object-cover"
            sizes={
              index === 0 && images.length > 1
                ? "100vw"
                : "(max-width: 768px) 100vw, 50vw"
            }
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
