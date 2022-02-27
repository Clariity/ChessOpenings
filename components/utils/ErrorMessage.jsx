import { errorOutlined } from '../../data/icons';
import { SVG } from './SVG';

export function ErrorMessage({ children, message, showIcon = true }) {
  return (
    <div className="flex justify-center items-center text-error p-2 my-2 rounded-md border-2">
      {showIcon && <SVG fill="error" icon={errorOutlined} marginRight={2} />}
      {children || message}
    </div>
  );
}
