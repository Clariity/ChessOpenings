import Link from 'next/link';

import { helpOutlined } from '../data/icons';
import { Header } from '../components/utils/Header';
import { HomeSocial } from '../components/home/HomeSocial';
import { SEO } from '../components/utils/SEO';

export default function Help() {
  return (
    <div className="container flex flex-col">
      <SEO
        description="ChessOpenings Help and Contact. Frequently asked questions and social links for ChessOpenings.co.uk"
        title="help"
        path="/help"
      />
      <Header icon={helpOutlined} heading="Learn Chess Openings" />

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
      <HomeSocial />

      <h2 className="text-4xl mt-8">FAQ</h2>
      <Question>I know an opening that isn&apos;t on here yet, where can I add it?</Question>
      <p>
        That&apos;s awesome. We would love for you to add them to the site. You can add them by submitting an opening or
        trap using the{' '}
        <Link href="/contribute">
          <a className="text-theme hover:text-themehover">Contribute page.</a>
        </Link>
      </p>

      <Question>How do I use this site to learn openings?</Question>
      <p className="mb-4 text-justify">
        On the{' '}
        <Link href="/learn">
          <a className="text-theme hover:text-themehover">Learn page</a>
        </Link>
        , you will be presented with a list of openings that you can select to learn. You can also search for a specific
        opening using the search bar at the top in case you have a specific one in mind, or filter the options by
        opening move. (Note: This is a work in progress so all openings are not currently added, we are working on it
        with helpful contributions from the community).
      </p>
      <p className="mb-4 text-justify">
        Once you have selected an opening, you will be shown a board and a list of all the opening variations for that
        opening. You can select to play as Black or as White and then you can select the opening variation to learn. You
        will then be shown the board moves to make in that opening variation. The PGN notation and a description will
        also be listed. Practise making the moves and learn what moves to make at each point in the opening. Once you
        are ready to test yourself, you can disable the move hints and then test out your knowledge using the{' '}
        <Link href="/train">
          <a className="text-theme hover:text-themehover">Train page</a>
        </Link>{' '}
        which won&apos;t show the moves you need to make, so you&apos;ll have to see how well you remember them.
      </p>

      <Question>How do I use this site to train openings?</Question>
      <p className="mb-4 text-justify">
        On the{' '}
        <Link href="/train">
          <a className="text-theme hover:text-themehover">Train page</a>
        </Link>
        , you will be presented with a dropdown box where you can select as many openings as you would like to train.
        You can also search for a specific opening using this dropdown box in case you have a specific one in mind.
        (Note: This is a work in progress so all openings are not currently added, we are working on it with helpful
        contributions from the community).
      </p>
      <p className="mb-4 text-justify">
        Once you have selected the openings you would like to train and colour you wish to play with, you can either
        click play (to test them in the order selected) or shuffle (to randomise the order in which you are tested).
        Once started, you will then attempt to play each opening to completion. Once you complete or fail each opening,
        it will move on to the next one highlighted.
      </p>
      <p className="mb-4 text-justify">
        Once all openings have been attempted or the quit button has been clicked, a summary will be shown; listing the
        openings you got correct as well as the openings that you failed. Beside each opening that was failed will be a
        link to go to the{' '}
        <Link href="/learn">
          <a className="text-theme hover:text-themehover">Learn page</a>
        </Link>{' '}
        for that opening. At the bottom of the list you will have the option to retry all the openings again, retry just
        the openings you failed, or alternatively at the top you can select a whole new selection of openings to train
        again.
      </p>

      <Question>What are traps and how can I use this site to learn them?</Question>
      <p className="mb-4 text-justify">
        Traps are tricks you can play on your opponent to win material or outright win the game. They rely on your
        opponent making a mistake or being tricked by you into capturing a piece that seems free but ends up costing
        them dearly. Alternatively they can be tricks to trap an opponents piece where it cannot escape and will
        eventually be won. You can find these on the{' '}
        <Link href="/traps">
          <a className="text-theme hover:text-themehover">Traps page</a>
        </Link>{' '}
        and they are learnt in the same way as openings are on the{' '}
        <Link href="/learn">
          <a className="text-theme hover:text-themehover">Learn page.</a>
        </Link>
      </p>

      <Question>Is there a way to share openings with a link?</Question>
      <p className="mb-4 text-justify">
        Yes there is! When on the{' '}
        <Link href="/learn">
          <a className="text-theme hover:text-themehover">Learn page</a>
        </Link>{' '}
        for an opening, there will be a share link button that you can press. This will copy a link to your clipboard
        which you can then send to anyone you&apos;d like, or you can post it in a tweet or even a blog post.
      </p>

      <Question>Can I download the PGNs of the openings for use with other analysis software?</Question>
      <p className="mb-4 text-justify">
        Yes you can! When on the{' '}
        <Link href="/learn">
          <a className="text-theme hover:text-themehover">Learn page</a>
        </Link>{' '}
        for an opening, there will be an &apos;Export to PGN&apos; button that you can press. This will copy the PGN of
        that opening to your clipboard which you can then paste into any tool that accepts a PGN.
      </p>

      <Question>Why the UK domain and branding?</Question>
      <p className="mb-4 text-justify">
        ChessOpenings.com was unfortunately taken, but we welcome users from everywhere around the world.
      </p>

      <Question>What other features are planned to come to the site?</Question>
      <p className="mb-4 text-justify">
        There is a{' '}
        <a
          className="text-theme hover:text-themehover"
          href="https://github.com/Clariity/ChessOpenings/projects/1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github projects board
        </a>{' '}
        that shows the current backlog of ideas, bugs and features for ChessOpenings.
      </p>

      <Question>Where can I play chess games against an opponent?</Question>
      <p className="mb-4 text-justify">
        There are lots of great sites out there that provide great platforms to play chess against human and AI
        opponents. Give some of these a try:
        <ul className="list-disc list-inside">
          <li className="ml-4">
            <a
              className="text-theme hover:text-themehover"
              href="https://chess.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chess.com
            </a>
          </li>
          <li className="ml-4">
            <a
              className="text-theme hover:text-themehover"
              href="https://lichess.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              lichess.org
            </a>
          </li>
          <li className="ml-4">
            <a
              className="text-theme hover:text-themehover"
              href="https://chess24.com/en"
              target="_blank"
              rel="noopener noreferrer"
            >
              chess24
            </a>
          </li>
        </ul>
      </p>

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
        The site also uses Google Analytics to collect anonymous usage data so we can see what pages users are using and
        how many users visit the site and for how long.
      </p>

      <Question>Who made this site?</Question>
      <a
        className="text-theme hover:text-themehover mb-8"
        href="https://ryangregory.dev/about"
        target="_blank"
        rel="noopener noreferrer"
      >
        This handsome fella
      </a>
    </div>
  );
}

function Question({ children }) {
  return (
    <h3 className="text-xl mt-8 mb-4">
      <i>&quot;{children}&quot;</i>
    </h3>
  );
}
