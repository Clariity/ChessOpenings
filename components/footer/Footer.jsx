import Image from 'next/image';

import { ExternalLinkButton } from '../utils/Button';
import {
  FooterColumn,
  FooterCopyright,
  FooterDiscordLink,
  FooterHeading,
  FooterLink,
  FooterLinkedInLink,
  FooterRow,
  FooterSubHeading,
  FooterTwitterLink
} from './FooterComponents';
import { PAYPAL_LINK } from '../../data/consts';

export function Footer() {
  return (
    <div className="bg-darker p-4 flex justify-center">
      <div className="container">
        <div className="flex flex-wrap justify-between">
          <div className="my-4 w-full xl:w-2/5">
            <FooterHeading>Welcome to ChessOpenings.co.uk</FooterHeading>
            <p className="my-1 text-base font-light">
              This site and its contents are provided to you completely for free. If you enjoy and learn from it, please
              consider donating to support the site and keep it running.
            </p>
            <div className="my-4">
              <ExternalLinkButton link={PAYPAL_LINK}>Donate</ExternalLinkButton>
            </div>
          </div>

          <FooterColumn>
            <FooterHeading>Site Content</FooterHeading>
            <FooterLink link="/learn" text="Learn Openings" />
            <FooterLink link="/train" text="Train Openings" />
            <FooterLink link="/mistakes" text="Take Advantage of Opening Mistakes" />
            <FooterLink link="/traps" text="Learn Opening Traps" />
            <FooterLink link="/contribute" text="Contribute Openings to the Site" />
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>Site Information</FooterHeading>
            <FooterLink link="/about" text="About" />
            <FooterLink link="/credits" text="Credits" />
            <FooterLink link="/help" text="Help" />
            <FooterLink link="/privacy" text="Privacy Policy" />
            <FooterLink link="/user-agreement" text="User Agreement" />
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>Connect</FooterHeading>
            <FooterSubHeading>ChessOpenings.co.uk</FooterSubHeading>
            <FooterRow>
              <FooterDiscordLink />
              <FooterTwitterLink />
            </FooterRow>
            <FooterSubHeading>Ryan Gregory</FooterSubHeading>
            <FooterRow>
              <FooterTwitterLink isPersonal />
              <FooterLinkedInLink />
            </FooterRow>
          </FooterColumn>
        </div>

        <div className="mt-8 lg:my-4 flex flex-wrap justify-between items-center">
          <FooterCopyright />
          <div className="flex m-auto my-8 lg:m-0">
            <Image
              priority={true}
              className="rounded-md"
              src="/media/images/logo.png"
              alt="Chess Openings Logo"
              width={30}
              height={30}
            />
            <p className="pl-2">ChessOpenings.co.uk</p>
          </div>
        </div>
      </div>
    </div>
  );
}
