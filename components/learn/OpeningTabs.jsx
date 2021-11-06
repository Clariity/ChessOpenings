export default function OpeningTabs({ setTab, tab }) {
  return (
    <div className="opening-tab-group">
      <button className={`opening-tab ${tab === '' ? 'selected' : ''}`} onClick={() => setTab('')}>
        All
      </button>
      <button className={`opening-tab ${tab === 'e4' ? 'selected' : ''}`} onClick={() => setTab('e4')}>
        e4
      </button>
      <button className={`opening-tab ${tab === 'd4' ? 'selected' : ''}`} onClick={() => setTab('d4')}>
        d4
      </button>
      <button className={`opening-tab ${tab === 'other' ? 'selected' : ''}`} onClick={() => setTab('other')}>
        Other
      </button>
    </div>
  );
}
