import { clear } from '../../data/icons';
import { SVG } from './SVG';

export function Modal({ title, onClose, children }) {
  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 z-30 flex justify-center items-center">
        <div className="w-full max-w-4xl mx-4">
          <div className="flex items-center bg-darkest text-center rounded-t-md">
            <div className="w-14 flex items-center" />
            <h1 className="w-full my-4 text-xl lg:text-2xl">{title}</h1>
            <div className="w-14 flex items-center">
              <button onClick={onClose}>
                <SVG icon={clear} dimOnHover />
              </button>
            </div>
          </div>
          <div className="max-h-[70vh] p-4 bg-dark overflow-y-auto break-words rounded-b-md">{children}</div>
        </div>
      </div>
      <div className="w-full h-full fixed top-0 left-0 bg-darkest opacity-80 z-20" onClick={onClose} />
    </>
  );
}
