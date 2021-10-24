import Link from 'next/link';
import Image from 'next/image';

import { SEO } from '../components/utils/SEO';

export default function NotFound() {
  return (
    <div className="flex-column" style={{ maxWidth: '1044px' }}>
      <SEO description="Page Not Found" title="404" path="/" />
      <div className="home-title">
        <Image
          priority={true}
          className="home-logo"
          src="/media/images/logo2.png"
          alt="Chess Openings Logo"
          width={80}
          height={80}
        />
        <h1 className="home-title-text">404</h1>
      </div>
      <h3 className="home-subtitle-text" style={{ textAlign: 'center' }}>
        Looks like the page you tried to access doesn&apos;t exist. Try one of the links below to get to where you want
        to go.
      </h3>

      <Link href="/learn">
        <div className="home-card">
          <img className="home-card-image flipped" src="/media/images/learn.png" alt="Learn Chess Board" />
          <div className="home-card-content">
            <div className="home-card-content-title">
              <i className="las la-graduation-cap home-card-icon" />
              <h3 className="home-card-header pad-10-l">Learn</h3>
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
              <h3 className="home-card-header pad-10-l">Train</h3>
            </div>
            <p>Test your Chess openings knowledge and train to remember the moves to make for different variations.</p>
            <p>
              Try to get as many correct as possible and if you forget any, a handy link will be provided to brush up on
              the forgotten moves.
            </p>
          </div>
          <img className="home-card-image" src="/media/images/train.png" alt="Train Chess Board" />
        </div>
      </Link>

      <Link href="/traps">
        <div className="home-card">
          <img className="home-card-image flipped" src="/media/images/traps.png" alt="Traps Chess Board" />
          <div className="home-card-content">
            <div className="home-card-content-title">
              <i className="las la-compress-arrows-alt home-card-icon" />
              <h3 className="home-card-header pad-10-l">Traps</h3>
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
              <h3 className="home-card-header pad-10-l">Contribute</h3>
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
          <img className="home-card-image" src="/media/images/contribute.png" alt="Contribute Form" />
        </div>
      </Link>
    </div>
  );
}
