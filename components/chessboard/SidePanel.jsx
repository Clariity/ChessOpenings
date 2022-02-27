import { BoardControls } from './BoardControls';

export function SidePanel({ children, showBoardControls = true, title }) {
  return (
    <div className="flex flex-col bg-darker w-full xl:w-4/12 xl:h-full max-h-screen max-w-[80vh] min-h-[50vh]">
      <div className="hidden xl:block bg-darkest text-center">
        <h1 className="text-2xl py-4">{title}</h1>
      </div>
      <div
        id="panel-scroll-display"
        className="flex flex-col order-2 xl:order-1 grow p-2 md:p-4 overflow-y-auto max-h-[80vh] mb-auto"
      >
        {children}
      </div>
      {showBoardControls && <BoardControls resetDisabled={false} />}
      <div className="order-2 xl:hidden bg-darkest text-center">
        <h1 className="text-2xl py-4">{title}</h1>
      </div>
    </div>
  );
}
