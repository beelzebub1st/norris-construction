import { Suspense } from "react";
import { ChatWidget } from "@/components/ChatWidget";
import { BackToTop } from "@/components/conversion/BackToTop";
import { ContactPopup } from "@/components/conversion/ContactPopup";
import { ConversionProvider } from "@/components/conversion/ConversionProvider";
import { FloatingCta } from "@/components/conversion/FloatingCta";
import { QuoteQuiz } from "@/components/conversion/QuoteQuiz";
import { SocialProofToasts } from "@/components/conversion/SocialProofToasts";
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
    <ConversionProvider>
      <div className="noise-overlay" aria-hidden />
      <Header phone={settings.phone} sms={settings.sms} />
      <main className="pb-20 md:pb-0">{children}</main>
      <Footer
        phone={settings.phone}
        email={settings.email}
        address={settings.address}
        licenseText={settings.licenseText}
        insuranceText={settings.insuranceText}
      />
      <StickyCallBar phone={settings.phone} sms={settings.sms} />
      <FloatingCta />
      <BackToTop />
      <SocialProofToasts />
      <ContactPopup />
      <QuoteQuiz />
      <Suspense fallback={null}>
        <VisitorTracker />
      </Suspense>
      <ChatWidget enabled={settings.chatEnabled} html={settings.chatEmbedHtml} />
    </ConversionProvider>
  );
}
