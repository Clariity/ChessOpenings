import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SideBar() {
  const { pathname } = useRouter();
  return (
    <div className="sidebar">
      <Link href="/train">
        <div className="pad-5 hover">
          <Image src="/media/images/logoSmall.png" alt="logo small" width={150} height={100} />
        </div>
      </Link>

      <Link href="/learn">
        <div className={`pad-10 flex-row sidebar-link ${pathname === '/learn' && 'sidebar-selected'}`}>
          <img src="/media/images/learn.png" alt="learn" width={30} height={30} />
          <div className="pad-10-l sidebar-label">Learn</div>
        </div>
      </Link>

      <Link href="/train">
        <div className={`pad-10 flex-row sidebar-link ${pathname === '/train' && 'sidebar-selected'}`}>
          <img src="/media/images/train.png" alt="learn" width={30} height={30} />
          <div className="pad-10-l sidebar-label">Train</div>
        </div>
      </Link>
    </div>
  );
}
