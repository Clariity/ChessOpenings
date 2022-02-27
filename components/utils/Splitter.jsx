export function Splitter({ text }) {
  return (
    <div className="flex justify-center items-center">
      <div className="h-1 m-4 w-full bg-theme rounded-md" />
      {text && <p className="absolute bg-dark px-4">{text}</p>}
    </div>
  );
}
