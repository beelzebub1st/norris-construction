import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactPageView } from "@/components/contact/ContactPageView";
import {
  breadcrumbJsonLd,
  localBusinessJsonLd,
} from "@/lib/seo/json-ld-data";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = buildPageMetadata({
  title: "Request a Bid",
  description:
    "Request a commercial construction bid for renovations, tenant improvements, white boxing, or facility upgrades. We reply within one business day.",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <JsonLd data={localBusinessJsonLd(settings)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactPageView
        phone={settings.phone}
        sms={settings.sms}
        email={settings.email}
        address={settings.address}
        licenseText={settings.licenseText}
        insuranceText={settings.insuranceText}
      />
    </>
  );
}
