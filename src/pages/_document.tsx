import Document, { Head, Html, Main, NextScript } from 'next/document';

export default  class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <style data-rel="preconnect" data-href="https://fonts.googleapis.com"></style>
          <style data-rel="preconnect" data-href="https://fonts.gstatic.com" data-crossorigin></style>
          <style data-href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap"></style>
          <link rel="shortcut icon" href="favicon.png" type="image/png"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}