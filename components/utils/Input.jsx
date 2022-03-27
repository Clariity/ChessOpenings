export function Input({
  disabled = false,
  id,
  label,
  maxLength = 255,
  onChange,
  placeholder,
  type = 'text',
  value,
  ...props
}) {
  return (
    <div className="mb-4 flex flex-col">
      {label && (
        <label className="mb-2" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`rounded-md indent-2 min-h-[50px] text-black`}
        disabled={disabled}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        {...props}
      />
    </div>
  );
}
