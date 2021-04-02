export default function MenuButton({ menuOpen, setMenuOpen }) {
  return (
    <button
      className={`hamburger hamburger--collapse ${menuOpen && 'is-active'}`}
      type="button"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </button>
  );
}
