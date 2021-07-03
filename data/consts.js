export const start = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const pieces = ['wP', 'wN', 'wB', 'wR', 'wQ', 'wK', 'bP', 'bN', 'bB', 'bR', 'bQ', 'bK'];

// https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces
export const chessPieces = (theme) => {
  const returnPieces = {};
  pieces.map((p) => {
    returnPieces[p] = ({ squareWidth }) => (
      <img style={{ width: squareWidth, height: squareWidth }} src={`/media/themes/${theme}/${p}.png`} alt={p} />
    );
    return null;
  });
  return returnPieces;
};

export const colourChoices = [
  { label: 'Play as White', value: 'white' },
  { label: 'Play as Black', value: 'black' }
];

export const themeChoices = [
  {
    label: 'Lichess',
    value: 'lichess',
    darkSquareStyle: { backgroundColor: '#B58863' },
    lightSquareStyle: { backgroundColor: '#F0D9B5' }
  },
  {
    label: 'Chess.com',
    value: 'chesscom',
    darkSquareStyle: { backgroundColor: '#779952' },
    lightSquareStyle: { backgroundColor: '#edeed1' }
  }
];

export const moveMethodChoices = [
  {
    label: 'Click',
    value: 'click'
  },
  {
    label: 'Drag and Drop',
    value: 'drag'
  }
];

export const animationChoices = [
  {
    label: 'On',
    value: true
  },
  {
    label: 'Off',
    value: false
  }
];

export const contributeTypeChoices = [
  {
    label: 'Opening',
    value: 'Opening'
  },
  {
    label: 'Trap',
    value: 'Trap'
  },
  {
    label: 'Opening Alteration',
    value: 'Opening Alteration'
  },
  {
    label: 'Trap Alteration',
    value: 'Trap Alteration'
  }
];

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};
const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  lineHeight: '1',
  minWidth: 1,
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center'
};

export const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    <span>{data.label}</span>
    <span style={groupBadgeStyles}>{data.options.length}</span>
  </div>
);

export const openingChoices = [
  {
    label: 'English Opening',
    value: 'English Opening'
  },
  {
    label: 'Italian Game',
    value: 'Italian Game'
  },
  {
    label: 'Ruy Lopez',
    value: 'Ruy Lopez'
  },
  {
    label: 'Englund Gambit',
    value: 'Englund Gambit'
  },
  {
    label: "Queen's Indian Defense",
    value: "Queen's Indian Defense"
  },
  {
    label: "King's Indian Defense",
    value: "King's Indian Defense"
  },
  {
    label: "Queen's Pawn Game",
    value: "Queen's Pawn Game"
  },
  {
    label: 'Budapest Gambit',
    value: 'Budapest Gambit'
  },
  {
    label: 'Benoni Defense',
    value: 'Benoni Defense'
  },
  {
    label: 'Dutch Defense',
    value: 'Dutch Defense'
  },
  {
    label: 'Scandinavian Defense',
    value: 'Scandinavian Defense'
  },
  {
    label: "Alekhine's Defense",
    value: "Alekhine's Defense"
  },
  {
    label: 'Pirc Defense',
    value: 'Pirc Defense'
  },
  {
    label: 'Caro-Kann',
    value: 'Caro-Kann'
  },
  {
    label: 'Sicilian Defense',
    value: 'Sicilian Defense'
  },
  {
    label: 'French Defense',
    value: 'French Defense'
  },
  {
    label: 'Danish Gambit',
    value: 'Danish Gambit'
  },
  {
    label: 'Vienna Game',
    value: 'Vienna Game'
  },
  {
    label: "King's Gambit Accepted",
    value: "King's Gambit Accepted"
  },
  {
    label: "King's Gambit Declined",
    value: "King's Gambit Declined"
  },
  {
    label: "Queen's Gambit Accepted",
    value: "Queen's Gambit Accepted"
  },
  {
    label: "Queen's Gambit Declined",
    value: "Queen's Gambit Declined"
  },
  {
    label: 'Center Game',
    value: 'Center Game'
  },
  {
    label: 'Philidor Defense',
    value: 'Philidor Defense'
  },
  {
    label: 'Russian Defense',
    value: 'Russian Defense'
  },
  {
    label: 'Scotch Game',
    value: 'Scotch Game'
  },
  {
    label: 'Three Knights Game',
    value: 'Three Knights Game'
  },
  {
    label: 'Four Knights Game',
    value: 'Four Knights Game'
  },
  {
    label: 'Evans Gambit',
    value: 'Evans Gambit'
  },
  {
    label: 'Neo-Grünfeld Defense',
    value: 'Neo-Grünfeld Defense'
  },
  {
    label: 'Grünfeld Defense',
    value: 'Grünfeld Defense'
  },
  {
    label: 'Catalan',
    value: 'Catalan'
  },
  {
    label: 'Nimzo-Indian',
    value: 'Nimzo-Indian'
  }
];
