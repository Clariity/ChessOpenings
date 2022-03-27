export function PGN({ opening, history }) {
  return opening.value.map(
    (move, i) =>
      i % 2 === 0 && (
        <div
          key={i}
          className={`flex px-2 py-1 rounded-md text-lg ${
            (history.length - 1 === i || history.length === i) && 'bg-tertiary'
          }`}
        >{`${i / 2 + 1}. ${move.san}, ${opening.value[i + 1] ? opening.value[i + 1].san : ''}`}</div>
      )
  );
}
