import Button from './Button';

export default function CookieWarning({ customStyles, customButtonStyles, onConfirm, text, buttonText }) {
  return (
    <div className="cookie-warning-component flex flex-column" style={customStyles}>
      {text}
      <Button customStyles={customButtonStyles} onClick={onConfirm} text={buttonText} />
    </div>
  );
}
