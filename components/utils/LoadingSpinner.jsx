export function LoadingSpinner({ customStyles, img, text }) {
  return (
    <div className="loading-spinner-component" style={customStyles}>
      <div className="loading-spinner">{img}</div>
      <b className="loading-spinner-text">{text}</b>
    </div>
  );
}
