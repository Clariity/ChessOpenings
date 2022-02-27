export function LoadingSpinner({ img, text }) {
  return (
    <div className="flex flex-col items-center my-auto">
      <div className="animate-spinner">{img}</div>
      <p className="text-center mt-4">{text}</p>
    </div>
  );
}
