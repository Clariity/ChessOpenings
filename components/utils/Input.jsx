export default function Input({
  id,
  customStyles,
  disabled = false,
  onChange,
  value,
  placeholder,
  label,
  maxLength = 255
}) {
  return (
    <>
      {label && (
        <label className="margin-10-t margin-5-b" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`input-component ${disabled && 'disabled'}`}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={customStyles}
        type="text"
        maxLength={maxLength}
      />
    </>
  );
}
