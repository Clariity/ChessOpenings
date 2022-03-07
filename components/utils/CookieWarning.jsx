import { Button } from './Button';

export function CookieWarning({ onConfirm }) {
  return (
    <div className="flex justify-center fixed bottom-0 w-full p-4 bg-darkest z-10">
      <div className="container flex flex-col items-center">
        This site uses local storage and cookies to improve the user experience and provide some functionality. By
        continuing to use the site you agree that you are comfortable with this. Information about what is stored is
        listed on the help page.
        <div className="mt-4 mb-2 w-full max-w-xs">
          <Button fill onClick={onConfirm}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}
