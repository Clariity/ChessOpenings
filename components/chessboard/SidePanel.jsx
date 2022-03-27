import { BoardControls } from './BoardControls';

export function SidePanel({ children, showBoardControls = true, title }) {
  return (
    <div className="flex flex-col bg-secondary w-full xl:w-4/12 max-h-[80vh] max-w-[80vh] min-h-[50vh] shadow-md">
      <div className="hidden xl:block bg-tertiary text-center">
        <h1 className="text-2xl py-4">{title}</h1>
      </div>
      <div
        id="panel-scroll-display"
        className="flex flex-col order-2 xl:order-1 grow p-2 md:p-4 overflow-y-auto max-h-[80vh] mb-auto"
      >
        {children}
      </div>
      {showBoardControls && <BoardControls resetDisabled={false} />}
      <div className="order-2 xl:hidden bg-tertiary text-center">
        <h1 className="text-2xl py-4">{title}</h1>
      </div>
    </div>
  );
}
