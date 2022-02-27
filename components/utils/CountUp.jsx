import { useEffect } from 'react';
import { useCountUp } from 'react-countup';

export function CountUp({ duration, label, value }) {
  const { reset, start } = useCountUp({ ref: `${label}-counter`, duration, end: value });

  useEffect(() => {
    reset();
    start();
  }, [value, reset, start]);

  return (
    <div className="flex flex-col items-center w-full">
      <h4 className="text-sm md:text-xl text-center mb-4">{label}</h4>
      <span id={`${label}-counter`} className="text-5xl" />
    </div>
  );
}
