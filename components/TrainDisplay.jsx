export default function TrainDisplay({ openingsCompleted, opening, openingsFailed, selectedOpenings, started }) {
  function getIcon(label) {
    if (openingsCompleted.includes(label)) return <i className="material-icons pad-5-r">done</i>;
    if (openingsFailed.includes(label)) return <i className="material-icons pad-5-r">clear</i>;
    return <i className="material-icons pad-5-r">horizontal_rule</i>;
  }

  return (
    <>
      {started &&
        selectedOpenings.map((o, i) => (
          <div
            className={`
            panel-scroll-display-opening
            ${openingsCompleted.includes(o.label) && 'completed'} 
            ${openingsFailed.includes(o.label) && 'failed'}
          `}
            key={o.label}
          >
            {getIcon(o.label)}
            {o.label}
          </div>
        ))}
    </>
  );
}
