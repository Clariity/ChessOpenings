export function Collapsible({ children, id, open, text, onClick }) {
  return (
    <div className="my-2">
      <div id={id} className="bg-tertiary cursor-pointer p-2 hover:bg-primary" onClick={onClick}>
        {text}
      </div>
      <div className={`overflow-hidden  ${open ? 'max-h-screen p-2' : 'max-h-0 '}`}>{children}</div>
    </div>
  );
}
