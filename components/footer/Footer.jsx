import { LinkButton } from '../utils/Button';
import { Logo } from '../utils/Logo';
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

export function Footer() {
  return (
    <div className="bg-secondary p-4 flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="container">
        <div className="flex flex-wrap justify-between">
          <div className="my-4 w-full xl:w-2/5">
            <FooterHeading>Welcome to ChessOpenings.co.uk</FooterHeading>
            <p className="my-1 text-base font-light">
              This site and its contents are provided to you completely for free. If you enjoy and learn from it, please
              consider donating to support the site and keep it running.
            </p>
            <div className="my-4">
              <LinkButton link="/support">Support The Site</LinkButton>
            </div>
          </div>

          <FooterColumn>
            <FooterHeading>Site Content</FooterHeading>
            <FooterLink link="/learn" text="Learn Openings" />
            <FooterLink link="/train" text="Train Openings" />
            {/* <FooterLink link="/mistakes" text="Take Advantage of Opening Mistakes" /> */}
            <FooterLink link="/traps" text="Learn Opening Traps" />
            <FooterLink link="/contribute" text="Contribute Openings to the Site" />
          </FooterColumn>

          <FooterColumn>
            <FooterHeading>Site Information</FooterHeading>
            {/* <FooterLink link="/about" text="About" /> */}
            <FooterLink link="/register" text="Create Account" />
            <FooterLink link="/help" text="Help" />
            {/* <FooterLink link="/privacy" text="Privacy Policy" /> */}
            {/* <FooterLink link="/user-agreement" text="User Agreement" /> */}
            <FooterLink link="/support" text="Support" />
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
            <div className="w-8">
              <Logo />
            </div>
            <p className="pl-2">ChessOpenings.co.uk</p>
          </div>
        </div>
      </div>
    </div>
  );
}
