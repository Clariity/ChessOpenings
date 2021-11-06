import { useState } from 'react';
import { OpeningGroup } from '../learn/OpeningGroup';
import OpeningTabs from '../learn/OpeningTabs';
import Search from '../utils/Search';

export default function OpeningsList({ groups, type }) {
  const [searchInput, setSearchInput] = useState('');
  const [tab, setTab] = useState('');

  const filteredOpeningGroups = groups
    ?.filter((g) => {
      const firstMove = g.options[0].value[0].san;
      return tab === '' || (tab === 'other' && firstMove !== 'e4' && firstMove !== 'd4') || tab === firstMove;
    })
    .filter((g) => {
      const searchWords = searchInput.split(' ');
      return searchWords.filter((w) => g.label.toLowerCase().includes(w.toLowerCase())).length > 0;
    });

  return (
    <>
      <OpeningTabs tab={tab} setTab={setTab} />
      <Search
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={`Search Chess Opening${type === 'learn' ? 's' : ' Traps'} by Name`}
        value={searchInput}
      />
      <div className="flex-row flex-wrap">
        {filteredOpeningGroups.length > 0 ? (
          filteredOpeningGroups.map((g) => <OpeningGroup key={g.label} group={g} type={type} />)
        ) : (
          <div className="pad-10-lr">No results</div>
        )}
      </div>
    </>
  );
}
