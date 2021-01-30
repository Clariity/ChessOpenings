export default function LearnDisplay({ game }) {
  return (
    <>
      <h1>Move history:</h1>
      <div>
        {game?.history({ verbose: true }).map((moveText, i) => (
          <span key={i}>{moveText.to}</span>
        ))}
      </div>
    </>
  );
}
