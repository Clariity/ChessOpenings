import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import SEO from '../components/SEO';

export default function NotFound() {
  const learnCard = useRef();
  const trainCard = useRef();
  const trapsCard = useRef();
  const contributeCard = useRef();

  function handleCardTilt(e, ref) {
    // Get position of mouse cursor with respect to the element on mouseover
    const xVal = e.nativeEvent.layerX;
    const yVal = e.nativeEvent.layerY;

    // Calculate rotation values along the X and Y-axis. Multiplier set to 20
    const yRotation = 4 * ((xVal - ref.current.clientWidth / 2) / ref.current.clientWidth);
    const xRotation = -4 * ((yVal - ref.current.clientHeight / 2) / ref.current.clientHeight);

    /* Generate string for CSS transform property */
    const string = 'perspective(800px) scale(1.02) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';

    /* Apply the calculated transformation */
    ref.current.style.transform = string;
  }

  function handleMouseOut(ref) {
    ref.current.style.transform = 'perspective(800px) scale(1) rotateX(0) rotateY(0)';
  }

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
        <div
          className="home-card"
          ref={learnCard}
          onMouseMove={(e) => handleCardTilt(e, learnCard)}
          onMouseOut={() => handleMouseOut(learnCard)}
        >
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
        <div
          className="home-card"
          ref={trainCard}
          onMouseMove={(e) => handleCardTilt(e, trainCard)}
          onMouseOut={() => handleMouseOut(trainCard)}
        >
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
        <div
          className="home-card"
          ref={trapsCard}
          onMouseMove={(e) => handleCardTilt(e, trapsCard)}
          onMouseOut={() => handleMouseOut(trapsCard)}
        >
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
        <div
          className="home-card"
          ref={contributeCard}
          onMouseMove={(e) => handleCardTilt(e, contributeCard)}
          onMouseOut={() => handleMouseOut(contributeCard)}
        >
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
