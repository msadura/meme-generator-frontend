import Document, { Html, Head, Main, NextScript } from 'next/document';

class ExtendedDocument extends Document {
  render() {
    return (
      <Html data-theme="dark">
        <Head>
          <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
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
