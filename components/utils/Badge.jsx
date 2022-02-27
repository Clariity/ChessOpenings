export function Badge({ status }) {
  function getBackground() {
    switch (status) {
      case 'CLOSED':
        return 'bg-error';
      case 'MERGED':
        return 'bg-success';
      default:
        return 'bg-theme';
    }
  }

  return <div className={`text-center rounded-md w-32 p-2 ${getBackground()}`}>{status}</div>;
}
