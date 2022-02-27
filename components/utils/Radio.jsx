export function Radio({ groupName, id, label, onChange, defaultChecked }) {
  return (
    <div className="mb-2 text-primary">
      <input type="radio" id={id} name={groupName} defaultChecked={defaultChecked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
