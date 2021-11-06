export default function Search({ customStyles, id, maxLength = 255, onChange, placeholder, value }) {
  return (
    <div className="search-component">
      <span className="las la-search search-icon"></span>
      <input
        id={id}
        className="search-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={customStyles}
        type="text"
        maxLength={maxLength}
      />
    </div>
  );
}
