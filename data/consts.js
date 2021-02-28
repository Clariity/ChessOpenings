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
