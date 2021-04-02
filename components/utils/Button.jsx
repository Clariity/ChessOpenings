export default function Button({ customStyles, disabled = false, onClick, icon, text }) {
  return (
    <button
      className={`button-component ${disabled && 'disabled'}`}
      disabled={disabled}
      onClick={onClick}
      style={customStyles}
    >
      {icon && <span className="material-icons pad-5-r">{icon}</span>}
      {text}
    </button>
  );
}
