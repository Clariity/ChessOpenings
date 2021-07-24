import Link from 'next/link';

import SEO from '../components/SEO';

export default function Help() {
  return (
    <div className="flex-column" style={{ maxWidth: '1044px' }}>
      <SEO
        description="ChessOpenings Help and Contact. Frequently asked questions and social links for ChessOpenings.co.uk"
        title="help"
        path="/help"
      />
      <h1 className="page-title">Help and Contact</h1>

      <h1>Contact</h1>
      <div className="help-social">
        <p>
          Want to contact ChessOpenings for any reason at all? Suggestions, Feedback, Say Hello? Click the Twitter logo
          to message our Twitter account or Tweet us and we will get back to you. You can follow us too for any updates.
        </p>
        <a
          className="flex-column flex-align flex-justify help-social-link"
          href="https://twitter.com/messages/compose?recipient_id=1403741572395638792"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="twitter" src="/media/images/twitter.png" alt="Twitter" />
          @ChessOpeningsUK
        </a>
      </div>
      <div className="help-social">
        <p>
          Want to be kept even more up to date? Discuss features and openings with the admin? See all the new
          submissions as they come in? Or just have a chat? Join the Discord Server by clicking the Discord logo and get
          involved with the community.
        </p>
        <a
          className="flex-column flex-align flex-justify help-social-link"
          href="https://discord.gg/xKYtamwV8p"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="twitter" src="/media/images/discord.png" alt="Discord" />
          ChessOpenings Discord Server
        </a>
      </div>

      <h1>FAQ</h1>
      <h2>
        <i>&quot;I know an opening that isn&apos;t on here yet, where can I add it?&quot;</i>
      </h2>
      <p>
        That&apos;s awesome. We would love for you to add them to the site. You can add them by submitting an opening or
        trap using the Contribute page{' '}
        <Link href="/contribute">
          <a className="link">here.</a>
        </Link>
      </p>

      <h2>
        <i>&quot;How do I use this site to learn openings?&quot;</i>
      </h2>
      <p style={{ textAlign: 'justify' }}>
        On the{' '}
        <Link href="/learn">
          <a className="link">Learn page</a>
        </Link>
        , you will be presented with a dropdown box where you can select the opening you would like to learn. You can
        also search for a specific opening using this dropdown box in case you have a specific one in mind. (Note: This
        is a work in progress so all openings are not currently added, we are working on it with helpful contributions
        from the community).
      </p>
      <p style={{ textAlign: 'justify' }}>
        Once you have selected an opening and a colour you wish to play with, you will then be shown the board moves to
        make in that opening variation. The PGN notation and a description will also be listed. Practise making the
        moves and learn what moves to make at each point in the opening. Once you are ready to test yourself, you can
        test out your knowledge using the{' '}
        <Link href="/train">
          <a className="link">Train page</a>
        </Link>{' '}
        which won&apos;t show the moves you need to make, so you&apos;ll have to see how well you remember them.
      </p>

      <h2>
        <i>&quot;How do I use this site to train openings?&quot;</i>
      </h2>
      <p style={{ textAlign: 'justify' }}>
        On the{' '}
        <Link href="/train">
          <a className="link">Train page</a>
        </Link>
        , you will be presented with a dropdown box where you can select the as many openings as you would like to
        train. You can also select all openings of a certain type (i.e. all Italian openings). You can also search for a
        specific opening using this dropdown box in case you have a specific one in mind. (Note: This is a work in
        progress so all openings are not currently added, we are working on it with helpful contributions from the
        community).
      </p>
      <p style={{ textAlign: 'justify' }}>
        Once you have selected the openings you would like to train and colour you wish to play with, you can either
        click play (to test them in the order selected) or shuffle (to randomise the order in which you are tested).
        Once started, you will then attempt to play each opening to completion. Once you complete or fail each opening,
        it will move on to the next one highlighted.
      </p>
      <p style={{ textAlign: 'justify' }}>
        Once all openings have been attempted or the quit button has been clicked, a summary will be shown; listing the
        openings you got correct as well as the openings that you failed. Beside each opening that was failed will be a
        link to go to the{' '}
        <Link href="/learn">
          <a className="link">learn page</a>
        </Link>{' '}
        for that opening. At the bottom of the list you will have the option to retry all the openings again, retry just
        the openings you failed, or alternatively at the top you can select a whole new selection of openings to train
        again.
      </p>

      <h2>
        <i>&quot;What are traps and how can I use this site to learn them?&quot;</i>
      </h2>
      <p style={{ textAlign: 'justify' }}>
        Traps are tricks you can play on your opponent to win material or outright win the game. They rely on your
        opponent making a mistake or being tricked by you into capturing a piece that seems free but ends up costing
        them dearly. Alternatively they can be tricks to trap an opponents piece where it cannot escape and will
        eventually be won. You can find these on the{' '}
        <Link href="/traps">
          <a className="link">Traps page</a>
        </Link>{' '}
        and they are learnt in the same way as openings are on the{' '}
        <Link href="/learn">
          <a className="link">Learn page</a>
        </Link>
      </p>

      <h2>
        <i>&quot;Is there a way to share openings with a link?&quot;</i>
      </h2>
      <p style={{ textAlign: 'justify' }}>
        Yes there is! When on the{' '}
        <Link href="/learn">
          <a className="link">Learn page</a>
        </Link>{' '}
        for an opening, there will be a share link button that you can press. This will copy a link to your clipboard
        which you can then send to anyone you&apos;d like, or you can post it in a tweet or even a blog post.
      </p>

      <h2>
        <i>&quot;Can I download the PGNs of the openings for use with other analysis software?&quot;</i>
      </h2>
      <p style={{ textAlign: 'justify' }}>
        Yes you can! When on the{' '}
        <Link href="/learn">
          <a className="link">Learn page</a>
        </Link>{' '}
        for an opening, there will be an &apos;Export to PGN&apos; button that you can press. This will copy the PGN of
        that opening to your clipboard which you can then paste into any tool that accepts a PGN
      </p>

      <h2>
        <i>&quot;Why the UK domain and branding?&quot;</i>
      </h2>
      <p style={{ textAlign: 'justify' }}>
        ChessOpenings.com was unfortunately taken, but we&apos;d love to see users from everywhere around the world.
      </p>

      <h2>
        <i>&quot;What other features are planned to come to the site?&quot;</i>
      </h2>
      <p style={{ textAlign: 'justify' }}>
        There is a{' '}
        <a
          className="link"
          href="https://github.com/Clariity/ChessOpenings/projects/1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github projects board
        </a>{' '}
        that shows the current backlog of ideas, bugs and features for ChessOpenings:{' '}
      </p>

      <h2>
        <i>&quot;Where can I play chess games against an opponent?&quot;</i>
      </h2>
      <p style={{ textAlign: 'justify' }}>
        There are lots of great sites out there that provide great platforms to play chess against human and AI
        opponents. Give some of these a try:
        <ul>
          <li>
            <a className="link" href="https://chess.com" target="_blank" rel="noopener noreferrer">
              Chess.com
            </a>
          </li>
          <li>
            <a className="link" href="https://lichess.org/" target="_blank" rel="noopener noreferrer">
              lichess.org
            </a>
          </li>
          <li>
            <a className="link" href="https://chess24.com/en" target="_blank" rel="noopener noreferrer">
              chess24
            </a>
          </li>
        </ul>
      </p>

      <h2>
        <i>&quot;What information does this site store?&quot;</i>
      </h2>
      <p>
        The site stores the following information in local storage:
        <ul>
          <li>User theme selection</li>
          <li>Moves when submitting an opening contribution</li>
          <li>If the storage popup has been dismissed</li>
        </ul>
      </p>
      <p>
        The site also uses Google Analytics to collect anonymous usage data (pretty much so I can see how many people
        are using the site and what pages are used)
      </p>

      <h2>
        <i>&quot;Who made this site?&quot;</i>
      </h2>
      <a className="link pad-20-b" href="https://ryangregory.dev/about" target="_blank" rel="noopener noreferrer">
        This handsome fella
      </a>
    </div>
  );
}
