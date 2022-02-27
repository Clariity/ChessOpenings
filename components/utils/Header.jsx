import { useWindowSize } from '../../functions/hooks';
import { SVG } from './SVG';

export function Header({ icon, heading }) {
  const { windowSize } = useWindowSize();

  let size = 32;
  if (windowSize >= 768) {
    size = 64;
  }

  return (
    <h1 className="flex items-center text-xl xs:text-2xl sm:text-4xl lg:text-6xl my-8">
      <SVG icon={icon} size={size} marginRight={4} />
      {heading}
    </h1>
  );
}
