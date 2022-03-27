import { useEffect, useState } from 'react';
import { analytics } from '../firebase';
import { CookieWarning } from '../components/utils/CookieWarning';
import { DataProvider } from '../context/data-context';
import { Footer } from '../components/footer/Footer';
import { Navbar } from '../components/navbar/Navbar';
import { SettingsProvider } from '../context/settings-context';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [showCookieWarning, setShowCookieWarning] = useState(false);

  useEffect(() => {
    const showWarning = window.localStorage.getItem('cookieWarning');
    setShowCookieWarning(showWarning === null);
    analytics();
  }, []);

  function handleCookieWarning() {
    window.localStorage.setItem('cookieWarning', false);
    setShowCookieWarning(false);
  }

  return (
    <DataProvider>
      <SettingsProvider>
        <div className="bg-primary text-fg-primary flex flex-col overflow-x-hidden">
          <Navbar />
          <div className="flex justify-center px-2 lg:min-h-[80vh]">
            <Component {...pageProps} />
          </div>
          <Footer />
          {showCookieWarning && <CookieWarning onConfirm={handleCookieWarning} />}
        </div>
      </SettingsProvider>
    </DataProvider>
  );
}

export default MyApp;
