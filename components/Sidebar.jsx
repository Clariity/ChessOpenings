import Image from 'next/image';
import Link from 'next/link';

export default function SideBar() {
  return (
    <div className="sidebar">
      <Link href="/train">
        <div className="pad-5 hover">
          <Image
            src="/media/images/logoSmall.png"
            alt="logo small"
            width={150}
            height={100}
          />
        </div>
      </Link>

      <Link href="/train">
        <div className="pad-10 flex-row sidebar-link">
          <Image
            src="/media/images/train.png"
            alt="learn"
            width={25}
            height={25}
          />
          <div className="pad-10-l">Train</div>
        </div>
      </Link>

      <Link href="/learn">
        <div className="pad-10 flex-row sidebar-link">
          <Image
            src="/media/images/learn.png"
            alt="learn"
            width={25}
            height={25}
          />
          <div className="pad-10-l">Learn</div>
        </div>
      </Link>
    </div>
  );
}
