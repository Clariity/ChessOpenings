import Link from 'next/link';

export function Button({ children, disabled, error, fill, onClick }) {
  return (
    <button
      className={`flex justify-center items-center text-sm md:text-xl rounded-md px-2 py-2 hover:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed ${
        error ? 'bg-error' : 'bg-theme'
      } ${fill ? 'w-full' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function WarningButton(props) {
  return <Button error {...props} />;
}

export function LinkButton(props) {
  return (
    <Link href={props.link}>
      <a className={props.fill ? 'w-full' : ''}>
        <Button {...props} />
      </a>
    </Link>
  );
}

export function ExternalLinkButton(props) {
  return (
    <a href={props.link} target="_blank" rel="noopener noreferrer">
      <Button {...props} />
    </a>
  );
}
