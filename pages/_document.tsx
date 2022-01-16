import Document, { Html, Head, Main, NextScript } from 'next/document';

class ExtendedDocument extends Document {
  render() {
    return (
      <Html data-theme="dark">
        <Head>
          <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Rock+Salt:ital,wght@0,200;0,300;0,400;0,700;1,300;1,400&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,700;1,300;1,400&display=swap"
            rel="stylesheet"
          />
          <link rel="preload" href="/fonts/impact.ttf" as="font" crossOrigin="" />
        </Head>
        <body className="bit text-xs md:text-sm">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default ExtendedDocument;
