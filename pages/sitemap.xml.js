const Sitemap = () => {};

export const getServerSideProps = ({ res }) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://chessopenings.co.uk/</loc>
          <lastmod>2021-07-03T15:03:42+00:00</lastmod>
          <changefreq>monthly</changefreq>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>https://chessopenings.co.uk/learn</loc>
          <lastmod>2021-07-03T15:03:42+00:00</lastmod>
          <changefreq>monthly</changefreq>
        <priority>0.95</priority>
      </url>
      <url>
        <loc>https://chessopenings.co.uk/train</loc>
        <lastmod>2021-07-03T15:03:42+00:00</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.90</priority>
      </url>
      <url>
        <loc>https://chessopenings.co.uk/traps</loc>
        <lastmod>2021-07-03T15:03:42+00:00</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.85</priority>
      </url>
      <url>
        <loc>https://chessopenings.co.uk/contribute</loc>
          <lastmod>2021-07-03T15:03:42+00:00</lastmod>
          <changefreq>monthly</changefreq>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>https://chessopenings.co.uk/help</loc>
          <lastmod>2021-07-03T15:03:42+00:00</lastmod>
          <changefreq>monthly</changefreq>
        <priority>0.75</priority>
      </url>
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
};

export default Sitemap;
