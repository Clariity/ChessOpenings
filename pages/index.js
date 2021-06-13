import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import SEO from '../components/SEO';

export default function Index() {
  const learnCard = useRef();
  const trainCard = useRef();
  const trapsCard = useRef();
  const contributeCard = useRef();

  function handleCardTilt(e, ref) {
    // Get position of mouse cursor with respect to the element on mouseover
    const xVal = e.nativeEvent.layerX;
    const yVal = e.nativeEvent.layerY;

    // Calculate rotation values along the X and Y-axis. Multiplier set to 20
    const yRotation = 2 * ((xVal - ref.current.clientWidth / 2) / ref.current.clientWidth);
    const xRotation = -2 * ((yVal - ref.current.clientHeight / 2) / ref.current.clientHeight);

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
      <SEO description="Learn and Train Chess Openings for free" title="home" path="/" />
      <div className="flex-row">
        <Image
          priority={true}
          className="navbar-logo-image"
          src="/media/images/logo.png"
          alt="Chess Openings Logo"
          width={60}
          height={60}
        />
        <h1 className="page-title">Page under construction - ChessOpenings.co.uk</h1>
      </div>
      <div style={{ textAlign: 'justify' }}>
        <p>
          As an open source project, ChessOpenings.co.uk relies on community contributions to add great content to the
          site. If you know an opening/variation that has not been added yet, you can submit it below and it will be
          reviewed to be added to the site.
        </p>
        <p>
          Want to contribute to the site itself?{' '}
          <a
            className="link"
            href="https://github.com/Clariity/ChessOpenings"
            target="_blank"
            rel="noopener noreferrer"
          >
            Make a Pull Request on the GitHub Repo.
          </a>
        </p>
      </div>

      <Link href="/learn">
        <div
          className="home-card"
          ref={learnCard}
          onMouseMove={(e) => handleCardTilt(e, learnCard)}
          onMouseOut={() => handleMouseOut(learnCard)}
        >
          <Image
            priority={true}
            className="home-card-image"
            src="/media/images/learn.png"
            alt="Learn Chess Board"
            width={650}
            height={420}
          />
          <div className="home-card-content">
            <div className="home-card-content-title">
              <i className="las la-graduation-cap home-card-icon" />
              <h1 style={{ paddingLeft: '10px' }}>Learn</h1>
            </div>
          </div>
        </div>
      </Link>

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
        </div>
        <Image
          priority={true}
          className="home-card-image"
          src="/media/images/train.png"
          alt="Learn Chess Board"
          width={650}
          height={420}
        />
      </div>

      <div
        className="home-card"
        ref={trapsCard}
        onMouseMove={(e) => handleCardTilt(e, trapsCard)}
        onMouseOut={() => handleMouseOut(trapsCard)}
      >
        <Image
          priority={true}
          className="home-card-image"
          src="/media/images/traps.png"
          alt="Learn Chess Board"
          width={650}
          height={420}
        />
        <div className="home-card-content">
          <div className="home-card-content-title">
            <i className="las la-compress-arrows-alt home-card-icon" />
            <h1 style={{ paddingLeft: '10px' }}>Traps</h1>
          </div>
        </div>
      </div>

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
        </div>
        <Image
          priority={true}
          className="home-card-image"
          src="/media/images/contribute.png"
          alt="Learn Chess Board"
          width={650}
          height={420}
        />
      </div>
    </div>
  );
}
