import '../styles/globals.css';
import Sidebar from '../components/Sidebar';

function MyApp({ Component, pageProps }) {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
