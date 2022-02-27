import { useRouter } from 'next/router';

export function ChessboardHeader({ opening }) {
  const { pathname } = useRouter();

  return (
    <p id="board" className="text-center text-xs md:text-lg w-full pb-2">
      {opening
        ? opening.label
        : pathname.includes('/train')
        ? 'Select Opening to Train and Press Start to Begin'
        : 'Select Opening to Begin'}
    </p>
  );
}
