export function OpeningTabs({ setTab, tab }) {
  return (
    <div className="my-4 shadow-md">
      <OpeningTab label="All" setTab={setTab} tab={tab} value="" />
      <OpeningTab label="e4" setTab={setTab} tab={tab} value="e4" />
      <OpeningTab label="d4" setTab={setTab} tab={tab} value="d4" />
      <OpeningTab label="Other" setTab={setTab} tab={tab} value="other" />
    </div>
  );
}

function OpeningTab({ label, tab, setTab, value }) {
  return (
    <button
      className={`w-1/4 h-10 cursor-pointer first:rounded-tl-md first:rounded-bl-md last:rounded-tr-md last:rounded-br-md hover:bg-tertiary ${
        tab === value ? 'cursor-default bg-tertiary' : 'bg-secondary'
      }`}
      onClick={() => setTab(value)}
    >
      {label}
    </button>
  );
}
