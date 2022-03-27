import Link from 'next/link';

import { helpOutlined } from '../data/icons';
import { Header } from '../components/utils/Header';
import { HomeSocial } from '../components/home/HomeSocial';
import { SEO } from '../components/utils/SEO';
import { HomeCardSmallMax } from '../components/home/HomeCard';
import { ExternalLinkButton } from '../components/utils/Button';
import { PAYPAL_LINK } from '../data/consts';

export default function Help() {
  return (
    <div className="container flex flex-col">
      <SEO
        description="ChessOpenings Help and Contact. Frequently asked questions and social links for ChessOpenings.co.uk"
        title="help"
        path="/help"
      />
      <Header icon={helpOutlined} heading="Learn Chess Openings" />

      <div className="flex flex-wrap">
        <div className="flex flex-col w-full lg:w-1/2">
          <h2 className="text-4xl">Contact</h2>
          <p className="mt-4">
            The best place to get in contact with ChessOpenings is on the ChessOpenings Discord server.
            <ul className="list-disc list-inside">
              <li className="ml-4">Talk to the site admin</li>
              <li className="ml-4">Provide suggestions and discuss new features</li>
              <li className="ml-4">See all new submissions as they come in</li>
              <li className="ml-4">Chat with other ChessOpenings users</li>
            </ul>
          </p>
        </div>
        <HomeSocial />
      </div>

      <h2 className="text-4xl mt-8 mb-4">FAQ</h2>
      <div className="columns-lg break-inside-avoid">
        <HomeCardSmallMax>
          <Question>I know an opening that isn&apos;t on here yet, where can I add it?</Question>
          <p>
            That&apos;s awesome. We would love for you to add them to the site. You can add them by submitting an
            opening or trap using the{' '}
            <Link href="/contribute">
              <a className="text-theme hover:text-theme-hover">
                <b>Contribute page.</b>
              </a>
            </Link>
          </p>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>What does your site have that the Chessable free courses do not?</Question>
          <p className="mb-4 text-justify">
            So the core benefit of ChessOpenings is that you can very quickly find the exact variation you want to learn
            and be shown the moves (assuming it has been submitted to the site).
          </p>

          <p className="mb-4 text-justify">
            Then you can practise the openings almost like muscle memory, being shown what moves to make, repeating it,
            really learning what move to make in what position.
          </p>

          <p className="mb-4 text-justify">
            Then you can train that opening knowledge, making the moves without being told what moves to make, to test
            your memory and see if you can do it. So that eventually you can blitz out openings from muscle memory and
            realize quickly if an opponent makes a move that is not what is in the line, then there will likely be a
            chance that they have made an inaccuracy.
          </p>

          <p className="mb-4 text-justify">
            Then on top of that the site offers learning opening traps, stats to track how many openings you have learnt
            and to what level, and then everything that is yet to come as the site is just in its early stages.
          </p>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>How do I use this site to learn openings?</Question>
          <p className="mb-4 text-justify">
            On the{' '}
            <Link href="/learn">
              <a className="text-theme hover:text-theme-hover">
                <b>Learn page</b>
              </a>
            </Link>
            , you will be presented with a list of openings that you can select to learn. You can also search for a
            specific opening using the search bar at the top in case you have a specific one in mind, or filter the
            options by opening move. (Note: This is a work in progress so all openings are not currently added, we are
            working on it with helpful contributions from the community).
          </p>
          <p className="mb-4 text-justify">
            Once you have selected an opening, you will be shown a board and a list of all the opening variations for
            that opening. You can select to play as Black or as White and then you can select the opening variation to
            learn. You will then be shown the board moves to make in that opening variation. The PGN notation and a
            description will also be listed. Practise making the moves and learn what moves to make at each point in the
            opening. Once you are ready to test yourself, you can disable the move hints and then test out your
            knowledge using the{' '}
            <Link href="/train">
              <a className="text-theme hover:text-theme-hover">
                <b>Train page</b>
              </a>
            </Link>{' '}
            which won&apos;t show the moves you need to make, so you&apos;ll have to see how well you remember them.
          </p>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>How do I use this site to train openings?</Question>
          <p className="mb-4 text-justify">
            On the{' '}
            <Link href="/train">
              <a className="text-theme hover:text-theme-hover">
                <b>Train page</b>
              </a>
            </Link>
            , you will be presented with a dropdown box where you can select as many openings as you would like to
            train. You can also search for a specific opening using this dropdown box in case you have a specific one in
            mind. (Note: This is a work in progress so all openings are not currently added, we are working on it with
            helpful contributions from the community).
          </p>
          <p className="mb-4 text-justify">
            Once you have selected the openings you would like to train and colour you wish to play with, you can either
            click play (to test them in the order selected) or shuffle (to randomise the order in which you are tested).
            Once started, you will then attempt to play each opening to completion. Once you complete or fail each
            opening, it will move on to the next one highlighted.
          </p>
          <p className="mb-4 text-justify">
            Once all openings have been attempted or the quit button has been clicked, a summary will be shown; listing
            the openings you got correct as well as the openings that you failed. Beside each opening that was failed
            will be a link to go to the{' '}
            <Link href="/learn">
              <a className="text-theme hover:text-theme-hover">
                <b>Learn page</b>
              </a>
            </Link>{' '}
            for that opening. At the bottom of the list you will have the option to retry all the openings again, retry
            just the openings you failed, or alternatively at the top you can select a whole new selection of openings
            to train again.
          </p>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>What are traps and how can I use this site to learn them?</Question>
          <p className="mb-4 text-justify">
            Traps are tricks you can play on your opponent to win material or outright win the game. They rely on your
            opponent making a mistake or being tricked by you into capturing a piece that seems free but ends up costing
            them dearly. Alternatively they can be tricks to trap an opponents piece where it cannot escape and will
            eventually be won. You can find these on the{' '}
            <Link href="/traps">
              <a className="text-theme hover:text-theme-hover">
                <b>Traps page</b>
              </a>
            </Link>{' '}
            and they are learnt in the same way as openings are on the{' '}
            <Link href="/learn">
              <a className="text-theme hover:text-theme-hover">
                <b>Learn page.</b>
              </a>
            </Link>
          </p>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>Why do I have to register or sign in?</Question>
          <p className="mb-4 text-justify">
            An account is NOT required to use the site, only if you want to view your stats and other additional
            features that will continue to grow over time.
          </p>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>Did you think about making the site into an phone app?</Question>
          <p className="mb-4 text-justify">
            It is something I would love to do but I only have web development experience and not mobile development
            experience, something I can do in the future is make it into a Progressive Web App so that it acts like an
            app, but mobile apps are beyond my area of expertise currently. So if anyone has mobile app development
            expertise then please feel free to reach out.
          </p>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>Will you send out email updates as new openings are added?</Question>
          <p className="mb-4 text-justify">
            I am considering sending out a newsletter in the future once more features are added to the site.
          </p>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>Is there somewhere we can donate to support the project?</Question>
          <p className="mb-4 text-justify">Thank you for wanting to support the project, here is the donate link:</p>
          <div className="my-4">
            <ExternalLinkButton link={PAYPAL_LINK}>Donate</ExternalLinkButton>
          </div>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>
            When I click on an opening it takes me to a board setup to start, and at the top it says “select an opening
            to begin”, but I cannot move any pieces?
          </Question>
          <p className="mb-4 text-justify">
            My guess is that you are on mobile, if you scroll down, you will be presented with a list of opening options
            to chose from and then the opening will start.
          </p>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>Is there a way to share openings with a link?</Question>
          <p className="mb-4 text-justify">
            Yes there is! When on the{' '}
            <Link href="/learn">
              <a className="text-theme hover:text-theme-hover">
                <b>Learn page</b>
              </a>
            </Link>{' '}
            for an opening, there will be a share link button that you can press. This will copy a link to your
            clipboard which you can then send to anyone you&apos;d like, or you can post it in a tweet or even a blog
            post.
          </p>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>Can I download the PGNs of the openings for use with other analysis software?</Question>
          <p className="mb-4 text-justify">
            Yes you can! When on the{' '}
            <Link href="/learn">
              <a className="text-theme hover:text-theme-hover">
                <b>Learn page</b>
              </a>
            </Link>{' '}
            for an opening, there will be an &apos;Export to PGN&apos; button that you can press. This will copy the PGN
            of that opening to your clipboard which you can then paste into any tool that accepts a PGN.
          </p>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>Why the UK domain and branding?</Question>
          <p className="mb-4 text-justify">
            ChessOpenings.com was unfortunately taken, but we welcome users from everywhere around the world.
          </p>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>What other features are planned to come to the site?</Question>
          <p className="mb-4 text-justify">
            There is a{' '}
            <a
              className="text-theme hover:text-theme-hover"
              href="https://github.com/Clariity/ChessOpenings/projects/1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <b>Github projects board</b>
            </a>{' '}
            that shows the current backlog of ideas, bugs and features for ChessOpenings.
          </p>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>Where can I play chess games against an opponent?</Question>
          <p className="mb-4 text-justify">
            There are lots of great sites out there that provide great platforms to play chess against human and AI
            opponents. Give some of these a try:
            <ul className="list-disc list-inside">
              <li className="ml-4">
                <a
                  className="text-theme hover:text-theme-hover"
                  href="https://chess.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>Chess.com</b>
                </a>
              </li>
              <li className="ml-4">
                <a
                  className="text-theme hover:text-theme-hover"
                  href="https://lichess.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>lichess.org</b>
                </a>
              </li>
              <li className="ml-4">
                <a
                  className="text-theme hover:text-theme-hover"
                  href="https://chess24.com/en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b>chess24</b>
                </a>
              </li>
            </ul>
          </p>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>What information does this site store?</Question>
          <p className="mb-4 text-justify">
            The site stores the following information in local storage:
            <ul className="list-disc list-inside">
              <li className="ml-4">User settings such as whether animations are On or Off</li>
              <li className="ml-4">If the cookie warning has been dismissed</li>
            </ul>
          </p>

          <p className="mb-4 text-justify">
            The site stores the following cookie information:
            <ul className="list-disc list-inside">
              <li className="ml-4">Your authentication ID token used for performing actions on the site</li>
            </ul>
          </p>

          <p className="mb-4 text-justify">
            The site stores the following information in Firebase:
            <ul className="list-disc list-inside">
              <li className="ml-4">
                Your email address used to sign in (We do nothing with this email address outside of authentication)
              </li>
              <li className="ml-4">Your display picture</li>
              <li className="ml-4">Your user data (stats, achievements, display name, when you last logged in)</li>
            </ul>
          </p>
          <p className="mb-4 text-justify">
            Note: We do not have access to any passwords, those are all handled by Google Firebase authentication.
          </p>
          <p className="mb-4 text-justify">
            The site also uses Google Analytics to collect anonymous usage data so we can see what pages users are using
            and how many users visit the site and for how long.
          </p>
        </HomeCardSmallMax>

        <HomeCardSmallMax>
          <Question>Who made this site?</Question>
          <a
            className="text-theme hover:text-theme-hover mb-8"
            href="https://ryangregory.dev/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            <b>This handsome fella</b>
          </a>
        </HomeCardSmallMax>
      </div>
    </div>
  );
}

function Question({ children }) {
  return <h3 className="text-2xl mb-4">{children}</h3>;
}
