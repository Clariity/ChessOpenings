export const getServerSideProps = async ({ res }) => {
  res.setHeader('location', '/train');
  res.statusCode = 302;
  res.end();

  return { props: {} };
};

export default function Index() {}
