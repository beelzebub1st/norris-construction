import { Suspense } from "react";
import { ChatWidget } from "@/components/ChatWidget";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyCallBar } from "@/components/layout/StickyCallBar";
import { VisitorTracker } from "@/components/VisitorTracker";
import { getSiteSettings } from "@/lib/site-settings";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header phone={settings.phone} sms={settings.sms} />
      <main className="pb-16 md:pb-0">{children}</main>
      <Footer
        phone={settings.phone}
        email={settings.email}
        address={settings.address}
        licenseText={settings.licenseText}
        insuranceText={settings.insuranceText}
      />
      <StickyCallBar phone={settings.phone} sms={settings.sms} />
      <Suspense fallback={null}>
        <VisitorTracker />
      </Suspense>
      <ChatWidget enabled={settings.chatEnabled} html={settings.chatEmbedHtml} />
    </>
  );
}
