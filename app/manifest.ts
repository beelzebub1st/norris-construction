import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Norris Construction",
    short_name: "Norris",
    description:
      "Luxury custom homes and residential remodeling across Miami and South Florida.",
    start_url: "/",
    display: "standalone",
    background_color: "#070707",
    theme_color: "#E06820",
    icons: [
      {
        src: "/images/logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
