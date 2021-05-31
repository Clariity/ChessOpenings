export default function Badge({ status, customStyles }) {
  return (
    <div className={`badge-component ${status}`} style={customStyles}>
      {status}
    </div>
  );
}
