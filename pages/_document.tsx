import { Html, Head, Main, NextScript } from "next/document";
import { useRouter } from "next/router";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;700&family=Cairo:wght@200;300;400;600&family=IBM+Plex+Sans+Arabic:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
