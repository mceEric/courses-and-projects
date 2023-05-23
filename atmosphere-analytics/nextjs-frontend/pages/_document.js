import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link>
        <meta name="theme-color" content="#6D28D9" />
        <link rel="shortcut icon" href="/icons/icon-192x192.png" />
      </Head>
      <body>
        <Main /> <NextScript />
      </body>
    </Html>
  );
}
