export default function Modal({ title, onClose, children }) {
  return (
    <>
      <div id="modal" className="modal-component">
        <div id="modal-header" className="modal-header">
          <div className="modal-header-box" />
          <h1 className="panel-title-text modal-title">{title}</h1>
          <div className="modal-header-box">
            <button className="material-icons panel-board-control-button" onClick={onClose}>
              clear
            </button>
          </div>
        </div>
        <div className="modal-content">{children}</div>
      </div>
      <div className="modal-background" onClick={onClose} />
    </>
  );
}
