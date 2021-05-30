export default function Input({
  customStyles,
  disabled = false,
  id,
  label,
  maxLength = 255,
  onChange,
  placeholder,
  type = 'text',
  value
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
        type={type}
        maxLength={maxLength}
      />
    </>
  );
}
