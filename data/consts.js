export const start = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
export const pieces = ['wP', 'wN', 'wB', 'wR', 'wQ', 'wK', 'bP', 'bN', 'bB', 'bR', 'bQ', 'bK'];

export const OPENING_GRADES = { Beginner: 0, Novice: 3, Intermediate: 5, Advanced: 10, Expert: 20, Master: 40 };
// export const OPENING_GRADES = { Beginner: 0, Novice: 0, Intermediate: 0, Advanced: 0, Expert: 0, Master: 0 };

export const TROPHY_COLOURS = {
  WOOD: { colour: '#B58863', shiny: false },
  IRON: { colour: '#A19D94', shiny: false },
  BRONZE: { colour: '#B08D57', shiny: false },
  SILVER: { colour: '#C0C0C0', shiny: false },
  GOLD: { colour: '#D4AF37', shiny: false },
  PLATINUM: { colour: '#E5E4E2', shiny: true },
  RUBY: { colour: '#D11058', shiny: true },
  EMERALD: { colour: '#50C878', shiny: true },
  SAPPHIRE: { colour: '#0F52BA', shiny: true },
  DIAMOND: { colour: '#B9F2FF', shiny: true },
  MASTER: { colour: '#FFFFFF', shiny: true }
};

export const DISCORD_LINK = 'https://discord.gg/xKYtamwV8p';
export const TWITTER_LINK = 'https://twitter.com/chessopeningsuk';
export const PAYPAL_LINK = 'https://paypal.me/chessopenings?locale.x=en_GB';
export const RYAN_TWITTER_LINK = 'https://twitter.com/ryangregorydev';
export const RYAN_LINKEDIN_LINK = 'https://www.linkedin.com/in/%E2%96%AA%EF%B8%8Fryan-gregory-232003189/';

// https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces
export const chessPieces = (theme) => {
  const returnPieces = {};
  if (theme === undefined || theme === 'default') return returnPieces;
  return returnPieces;
  // pieces.map((p) => {
  //   returnPieces[p] = ({ squareWidth }) => (
  //     <img style={{ width: squareWidth, height: squareWidth }} src={`/media/themes/${theme}/${p}.png`} alt={p} />
  //   );
  //   return null;
  // });
  // return returnPieces;
};

export const colourChoices = [
  { label: 'Play as White', value: 'white' },
  { label: 'Play as Black', value: 'black' }
];

export const themeChoices = [
  {
    label: 'Default',
    value: 'default',
    darkSquareStyle: { backgroundColor: '#B58863' },
    lightSquareStyle: { backgroundColor: '#F0D9B5' }
  }
  // {
  //   label: 'Chess.com',
  //   value: 'chesscom',
  //   darkSquareStyle: { backgroundColor: '#779952' },
  //   lightSquareStyle: { backgroundColor: '#edeed1' }
  // }
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
    value: 'English Opening',
    fen: 'rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq c3 0 1'
  },
  {
    label: 'Italian Game',
    value: 'Italian Game',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3'
  },
  {
    label: 'Ruy Lopez',
    value: 'Ruy Lopez',
    fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3'
  },
  {
    label: 'Englund Gambit',
    value: 'Englund Gambit',
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq e6 0 2'
  },
  {
    label: "Queen's Indian Defense",
    value: "Queen's Indian Defense",
    fen: 'rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4'
  },
  {
    label: "King's Indian Defense",
    value: "King's Indian Defense",
    fen: 'rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3'
  },
  {
    label: 'Budapest Gambit',
    value: 'Budapest Gambit',
    fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/2PP4/8/PP2PPPP/RNBQKBNR w KQkq e6 0 3'
  },
  {
    label: 'Benoni Defense',
    value: 'Benoni Defense',
    fen: 'rnbqkb1r/pp1ppppp/5n2/2pP4/2P5/8/PP2PPPP/RNBQKBNR b KQkq - 0 3'
  },
  {
    label: 'Dutch Defense',
    value: 'Dutch Defense',
    fen: 'rnbqkbnr/ppppp1pp/8/5p2/3P4/8/PPP1PPPP/RNBQKBNR w KQkq f6 0 2'
  },
  {
    label: 'Scandinavian Defense',
    value: 'Scandinavian Defense',
    fen: 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2'
  },
  {
    label: "Alekhine's Defense",
    value: "Alekhine's Defense",
    fen: 'rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2'
  },
  {
    label: 'Pirc Defense',
    value: 'Pirc Defense',
    fen: 'rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4'
  },
  {
    label: 'Caro-Kann',
    value: 'Caro-Kann',
    fen: 'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3'
  },
  {
    label: 'Sicilian Defense',
    value: 'Sicilian Defense',
    fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2'
  },
  {
    label: 'French Defense',
    value: 'French Defense',
    fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3'
  },
  {
    label: 'Danish Gambit',
    value: 'Danish Gambit',
    fen: 'rnbqkbnr/pppp1ppp/8/8/3pP3/2P5/PP3PPP/RNBQKBNR b KQkq - 0 3'
  },
  {
    label: 'Vienna Game',
    value: 'Vienna Game',
    fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2'
  },
  {
    label: "King's Gambit Accepted",
    value: "King's Gambit Accepted",
    fen: 'rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3'
  },
  {
    label: "King's Gambit Declined",
    value: "King's Gambit Declined",
    fen: 'rnbqk1nr/pppp1ppp/8/2b1p3/4PP2/8/PPPP2PP/RNBQKBNR w KQkq - 1 3'
  },
  {
    label: "Queen's Gambit Accepted",
    value: "Queen's Gambit Accepted",
    fen: 'rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3'
  },
  {
    label: "Queen's Gambit Declined",
    value: "Queen's Gambit Declined",
    fen: 'rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3'
  },
  {
    label: 'Center Game',
    value: 'Center Game',
    fen: 'rnbqkbnr/pppp1ppp/8/8/3pP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3'
  },
  {
    label: 'Philidor Defense',
    value: 'Philidor Defense',
    fen: 'rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3'
  },
  {
    label: 'Russian Defense',
    value: 'Russian Defense',
    fen: 'rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3'
  },
  {
    label: 'Scotch Game',
    value: 'Scotch Game',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3'
  },
  {
    label: 'Three Knights Game',
    value: 'Three Knights Game',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R b KQkq - 3 3'
  },
  {
    label: 'Four Knights Game',
    value: 'Four Knights Game',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4'
  },
  {
    label: 'Evans Gambit',
    value: 'Evans Gambit',
    fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R b KQkq b3 0 4'
  },
  {
    label: 'Neo-Grünfeld Defense',
    value: 'Neo-Grünfeld Defense',
    fen: 'rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/6P1/PP2PP1P/RNBQKBNR w KQkq d6 0 4'
  },
  {
    label: 'Grünfeld Defense',
    value: 'Grünfeld Defense',
    fen: 'rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq d6 0 4'
  },
  {
    label: 'Catalan',
    value: 'Catalan',
    fen: 'rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/6P1/PP2PPBP/RNBQK1NR b KQkq - 1 4'
  },
  {
    label: 'Nimzo-Indian',
    value: 'Nimzo-Indian',
    fen: 'rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4'
  },
  {
    label: 'London System',
    value: 'London System',
    fen: 'rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 3 3'
  },
  {
    label: 'Ponziani Opening',
    value: 'Ponziani Opening',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2P2N2/PP1P1PPP/RNBQKB1R b KQkq - 0 3'
  },
  {
    label: 'The Bongcloud',
    value: 'The Bongcloud',
    fen: 'rnbq1bnr/ppppkppp/8/4p3/4P3/8/PPPPKPPP/RNBQ1BNR w - - 2 3'
  },
  {
    label: 'Van Geet Opening',
    value: 'Van Geet Opening',
    fen: 'rnbqkbnr/pppppppp/8/8/8/2N5/PPPPPPPP/R1BQKBNR b KQkq - 1 1'
  }
];

export const defaultOpeningStats = {
  whiteLearns: 0,
  blackLearns: 0,
  whiteAttempts: 0,
  whiteSuccesses: 0,
  blackAttempts: 0,
  blackSuccesses: 0
};
