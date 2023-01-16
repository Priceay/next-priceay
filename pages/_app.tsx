import "../styles/globals.css";
import "../styles/main.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import type { AppProps } from "next/app";
import Header from "@/components/Layout/Header";
import { DefaultSeo } from "next-seo";
import SEO from "next-seo.config";
import { useRouter } from "next/router";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <main className={router.locale === "ar" ? "font-Almarai" : "font-Cairo"}>
      <Script
        id="15"
        strategy={"lazyOnload"}
        src={"https://www.googletagmanager.com/gtag/js?id=G-33C36W7MN7"}
      />
      <Script strategy="lazyOnload" id="16">
        {`
            window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-33C36W7MN7');
  `}
      </Script>
      <DefaultSeo
        title={
          router.locale === "ar"
            ? `برايسي - Priceay | تسوق افضل اسعار العطور في المتاجر`
            : `Priceay | Shop for the best perfumes prices`
        }
        titleTemplate="%s | Shop for the best perfumes prices"
        canonical="https://www.priceay.com"
        openGraph={{
          type: "website",
          locale: "ar",
          title: "Priceay",
          url: "https://priceay.com",
          site_name: "Priceay",
          images: [
            {
              url: "/opengraph.png",
              width: 1200,
              height: 630,
              alt: "Priceay Logo ",
            },
          ],
        }}
      />

      <Header />

      <Component {...pageProps} />
    </main>
  );
}

export default MyApp;
