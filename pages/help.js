import Link from 'next/link';

import SEO from '../components/SEO';

export default function Help() {
  return (
    <div className="flex-column" style={{ maxWidth: '1044px' }}>
      <SEO description="ChessOpenings Help and Contact" title="help" path="/help" />
      <h1 className="page-title">Help and Contact</h1>

      <Link href="/learn">
        <div className="home-card">
          <img className="home-card-image flipped" src="/media/images/learn.png" alt="Learn Chess Board" />
          <div className="home-card-content">
            <div className="home-card-content-title">
              <i className="las la-graduation-cap home-card-icon" />
              <h1 style={{ paddingLeft: '10px' }}>Learn</h1>
            </div>
            <p>Learn variations for Chess openings and be prepared for whatever your opponent may throw at you.</p>
            <p>Learn a completely new Chess opening today and try it out when you next play some games.</p>
          </div>
        </div>
      </Link>

      <Link href="/train">
        <div className="home-card">
          <div className="home-card-content">
            <div className="home-card-content-title">
              <i className="las la-dumbbell home-card-icon" />
              <h1 style={{ paddingLeft: '10px' }}>Train</h1>
            </div>
            <p>Test your Chess openings knowledge and train to remember the moves to make for different variations.</p>
            <p>
              Try to get as many correct as possible and if you forget any, a handy link will be provided to brush up on
              the forgotten moves.
            </p>
          </div>
          <img className="home-card-image" src="/media/images/train.png" alt="Learn Chess Board" />
        </div>
      </Link>

      <Link href="/traps">
        <div className="home-card">
          <img className="home-card-image flipped" src="/media/images/traps.png" alt="Learn Chess Board" />
          <div className="home-card-content">
            <div className="home-card-content-title">
              <i className="las la-compress-arrows-alt home-card-icon" />
              <h1 style={{ paddingLeft: '10px' }}>Traps</h1>
            </div>
            <p>
              Learn tricky opening traps that may catch your opponent off guard if they don&apos;t know how to correctly
              respond.
            </p>
            <p>Make sure you don&apos;t get caught out by them either.</p>
          </div>
        </div>
      </Link>

      <Link href="/contribute">
        <div className="home-card">
          <div className="home-card-content special">
            <div className="home-card-content-title">
              <i className="las la-plus home-card-icon" />
              <h1 style={{ paddingLeft: '10px' }}>Contribute</h1>
            </div>
            <p>
              Become a part of ChessOpenings history. Contribute your opening knowledge and help other ChessOpenings
              users to learn valuable openings.
            </p>
            <p>
              With a move recording tool and an easy to fill out form, it&apos;s very simple to submit your openings.
              Once reviewed by a site admin it will then be added to the list of openings if approved.
            </p>
          </div>
          <img className="home-card-image" src="/media/images/contribute.png" alt="Learn Chess Board" />
        </div>
      </Link>
    </div>
  );
}
