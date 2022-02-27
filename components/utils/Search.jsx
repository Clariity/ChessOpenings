import { search } from '../../data/icons';
import { SVG } from './SVG';

export function Search({ id, maxLength = 255, onChange, placeholder, value }) {
  return (
    <div className="my-4 relative">
      <span className="absolute p-2">
        <SVG icon={search} size={24} />
      </span>
      <input
        id={id}
        className=" bg-darker w-full pl-10 rounded-md leading-10"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="text"
        maxLength={maxLength}
      />
    </div>
  );
}
