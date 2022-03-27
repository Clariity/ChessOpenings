/* eslint-disable no-undef */
/* eslint-disable no-var */

function setColorsByTheme(defaultDarkTheme, defaultLightTheme) {
  var mql = window.matchMedia('(prefers-color-scheme: dark)');
  var prefersDarkFromMQ = mql.matches;
  var persistedPreference = localStorage.getItem('theme');
  var root = document.body;
  var colorMode = '';
  var hasUsedToggle = typeof persistedPreference === 'string';

  if (hasUsedToggle) {
    colorMode = JSON.parse(persistedPreference);
  } else {
    colorMode = prefersDarkFromMQ ? defaultDarkTheme : defaultLightTheme;
    localStorage.setItem('theme', JSON.stringify(colorMode));
  }

  root.classList.add(colorMode);
}

export function ThemeScript({ defaultDarkTheme, defaultLightTheme, themeStorageKey }) {
  const themeScript = `(${setColorsByTheme})(
        '${defaultDarkTheme}',
        '${defaultLightTheme}',
        '${themeStorageKey}',
      )`;
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
