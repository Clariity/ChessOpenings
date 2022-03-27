import { contributeOutlined } from '../data/icons';
import { Header } from '../components/utils/Header';
import { HomeSocial } from '../components/home/HomeSocial';
import { SEO } from '../components/utils/SEO';
import { ExternalLinkButton } from '../components/utils/Button';
import { KOFI_LINK, PAYPAL_LINK } from '../data/consts';

export default function Support() {
  return (
    <div className="container flex flex-col">
      <SEO description="Support the site by donating to keep it running." title="support" path="/support" />
      <Header icon={contributeOutlined} heading="Support ChessOpenings" />

      <p className="mb-4">
        This site and its contents are provided to you completely for free and with no annoying advertisements. If you
        enjoy and learn from it, please consider donating to support the site and keep it running. Even if its just a
        coffee to keep the admin running.
      </p>

      <div className="flex">
        <div className="mr-4">
          <ExternalLinkButton link={PAYPAL_LINK}>
            <svg
              className="mr-2 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M22 9.761c0 .536-.065 1.084-.169 1.627-.847 4.419-3.746 5.946-7.449 5.946h-.572c-.453 0-.838.334-.908.789l-.803 5.09c-.071.453-.456.787-.908.787h-2.736c-.39 0-.688-.348-.628-.732l1.386-8.88.062-.056h2.155c5.235 0 8.509-2.618 9.473-7.568.812.814 1.097 1.876 1.097 2.997zm-14.216 4.252c.116-.826.459-1.177 1.385-1.179l2.26-.002c4.574 0 7.198-2.09 8.023-6.39.8-4.134-2.102-6.442-6.031-6.442h-7.344c-.517 0-.958.382-1.038.901-2.304 14.835-2.97 18.607-3.038 19.758-.021.362.269.672.635.672h3.989l1.159-7.318z" />
            </svg>
            Paypal
          </ExternalLinkButton>
        </div>

        <ExternalLinkButton link={KOFI_LINK}>
          <svg
            className="mr-2 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
          </svg>
          Ko-Fi
        </ExternalLinkButton>
      </div>

      <h2 className="flex items-center text-xl sm:text-2xl lg:text-4xl mt-8 mb-4">Not able to support right now?</h2>

      <p className="mb-4">
        No worries at all, you can still send messages of support and join the growing community of users on the
        ChessOpenings Discord server. There you can let us know what you like and what features you enjoy on the site so
        we can work on adding even more.
      </p>
      <p className="mb-4">
        Additionally you can tell your friends, make a post on social media / reddit, and help spread awareness of the
        site. That is the best way to help the site grow!
      </p>
      <div className="flex justify-center">
        <HomeSocial />
      </div>
    </div>
  );
}
