export function SVG({ dimOnHover, fill, icon, marginRight, size = 40 }) {
  function getFillType() {
    switch (fill) {
      case 'error':
        return 'fill-error';
      case 'success':
        return 'fill-success';
      case 'white':
        return 'fill-white';
      default:
        return 'fill-fg-primary';
    }
  }

  return (
    <svg
      className={`min-w-[24px] min-h-[24px] ${getFillType()} ${marginRight ? `mr-${marginRight}` : ''} ${
        dimOnHover ? ' hover:opacity-50' : ''
      }`}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      {icon}
    </svg>
  );
}
