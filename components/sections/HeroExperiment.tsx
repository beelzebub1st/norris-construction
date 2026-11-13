import { cookies } from "next/headers";
import { Hero } from "@/components/sections/Hero";
import { DEFAULT_HEADLINE, getHomepageData } from "@/lib/homepage-data";

export async function HeroExperiment() {
  const cookieStore = await cookies();
  const visitorId = cookieStore.get("nid")?.value ?? null;
  const { settings, headline } = await getHomepageData(visitorId);
  return <Hero headline={headline} phone={settings.phone} sms={settings.sms} />;
}

type HeroExperimentFallbackProps = {
  phone: string;
  sms: string;
};

export function HeroExperimentFallback({
  phone,
  sms,
}: HeroExperimentFallbackProps) {
  return <Hero headline={DEFAULT_HEADLINE} phone={phone} sms={sms} />;
}
