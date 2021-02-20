import Sidebar from '../components/Sidebar';
import '../styles/globals.css';
import { StateProvider } from '../components/Store';

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <div className="app">
        <Sidebar />
        <div className="main">
          <Component {...pageProps} />
        </div>
      </div>
    </StateProvider>
  );
}

export default MyApp;
