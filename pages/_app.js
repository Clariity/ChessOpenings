import Navbar from '../components/navbar/Navbar';
import { StateProvider } from '../components/Store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <div className="app">
        <Navbar />
        <div className="main">
          <Component {...pageProps} />
        </div>
      </div>
    </StateProvider>
  );
}

export default MyApp;
