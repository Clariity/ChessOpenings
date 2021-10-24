export function Radio({ customStyles, groupName, id, label, onChange, defaultChecked }) {
  return (
    <div className="radio-container" style={customStyles}>
      <input type="radio" id={id} name={groupName} defaultChecked={defaultChecked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
