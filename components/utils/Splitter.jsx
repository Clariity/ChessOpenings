export function Splitter({ customStyles, text }) {
  return (
    <div className="splitter-component">
      <div className="splitter-line" style={customStyles} />
      {text && <p className="splitter-text">{text}</p>}
    </div>
  );
}
