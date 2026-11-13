"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const FALLBACK = "/images/hero.jpg";

type SafeImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: string | null | undefined;
  fallbackSrc?: string;
};

export function SafeImage({
  src,
  fallbackSrc = FALLBACK,
  alt,
  ...props
}: SafeImageProps) {
  const initial = typeof src === "string" && src.trim() ? src : fallbackSrc;
  const [current, setCurrent] = useState(initial);

  return (
    <Image
      {...props}
      src={current}
      alt={alt}
      onError={() => {
        if (current !== fallbackSrc) setCurrent(fallbackSrc);
      }}
    />
  );
}
