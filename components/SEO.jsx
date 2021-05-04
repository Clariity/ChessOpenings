import Head from 'next/head';

export default function SEO({ description, title, image, path }) {
  const url = path ? 'https://chessopenings.co.uk' + path : 'https://chessopenings.co.uk';
  const defaultDescription = 'Practise and Learn Chess Openings for Free.';
  const defaultImageURL = 'https://chessopenings.co.uk/media/images/seo.png';

  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImageURL;

  return (
    <Head>
      <title> {title} • ChessOpenings</title>

      <meta name="title" content={`${title} • ChessOpenings.co.uk`} />
      <meta name="description" content={metaDescription} />

      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={`${title} • ChessOpenings.co.uk`} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="ChessOpenings.co.uk" />
      <meta name="twitter:title" content={`${title} • ChessOpenings.co.uk`} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />

      <meta name="apple-mobile-web-app-title" content="ChessOpenings.co.uk" />
      <meta name="application-name" content="ChessOpenings.co.uk" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="ChessOpenings.co.uk" />
      <meta charSet="utf-8" />

      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://maxst.icons8.com" />
      <link
        rel="stylesheet"
        href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
      ></link>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400&display=swap" rel="stylesheet" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest"></link>
    </Head>
  );
}
