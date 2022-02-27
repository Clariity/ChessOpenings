import { ChessboardProvider } from '../../context/board-context';

export function ChessboardWrapper({ children }) {
  return (
    <div className="container flex flex-wrap justify-center my-4 xl:max-h-[80vh]">
      <ChessboardProvider>{children}</ChessboardProvider>
    </div>
  );
}
