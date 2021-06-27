import { useEffect, useState } from 'react';

import CookieWarning from '../components/utils/CookieWarning';
import Navbar from '../components/navbar/Navbar';
import { StateProvider } from '../components/Store';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [showCookieWarning, setShowCookieWarning] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const showWarning = window.localStorage.getItem('cookieWarning');
      console.log(showWarning);
      setShowCookieWarning(showWarning === null);
    }
  }, []);

  function handleCookieWarning() {
    window.localStorage.setItem('cookieWarning', false);
    setShowCookieWarning(false);
  }

  return (
    <StateProvider>
      <div className="app">
        <Navbar />
        <div className="main">
          <Component {...pageProps} />
        </div>
        {showCookieWarning && (
          <CookieWarning
            onConfirm={handleCookieWarning}
            text="This site uses local storage to improve the user experience and provide some functionality. By continuing to use the site you agree that you are comfortable with this. Information about what is stored is listed on the help page."
            buttonText="Got it"
            customButtonStyles={{ maxWidth: '300px', marginTop: '10px' }}
          />
        )}
      </div>
    </StateProvider>
  );
}

export default MyApp;
