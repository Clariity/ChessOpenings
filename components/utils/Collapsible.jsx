export function Collapsible({ customStyles, children, id, open, text, onClick }) {
  return (
    <div id={id} className="collapsible-component">
      <div className="collapsible-header" onClick={onClick} style={customStyles}>
        {text}
      </div>
      <div className={`collapsible-body ${open ? 'open' : ''}`}>{children}</div>
    </div>
  );
}
