import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ThemeScript } from '../scripts/theme-script';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <ThemeScript defaultDarkTheme="dark" defaultLightTheme="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
