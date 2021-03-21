const londonSystemTraps = [
  {
    label: 'London System: Bishop Trap',
    description: "A quick and dirty trick to trap White's dark squared Bishop",
    colour: 'black',
    value: [
      { color: 'w', from: 'd2', to: 'd4', flags: 'b', piece: 'p', san: 'd4' },
      { color: 'b', from: 'd7', to: 'd5', flags: 'b', piece: 'p', san: 'd5' },
      { color: 'w', from: 'c1', to: 'f4', flags: 'n', piece: 'b', san: 'Bf4' },
      { color: 'b', from: 'h7', to: 'h5', flags: 'b', piece: 'p', san: 'h5' },
      { color: 'w', from: 'e2', to: 'e3', flags: 'n', piece: 'p', san: 'e3' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'd4', to: 'e5', flags: 'c', piece: 'p', captured: 'p', san: 'dxe5' },
      { color: 'b', from: 'g7', to: 'g5', flags: 'b', piece: 'p', san: 'g5' },
      { color: 'w', from: 'f4', to: 'g3', flags: 'n', piece: 'b', san: 'Bg3' },
      { color: 'b', from: 'h5', to: 'h4', flags: 'n', piece: 'p', san: 'h4' }
    ]
  }
];

const englundGambitTraps = [
  {
    label: 'Englund Gambit: Discovered Queen',
    description: 'What seems to be a free Knight to White can lead to White losing their Queen',
    colour: 'black',
    value: [
      { color: 'w', from: 'd2', to: 'd4', flags: 'b', piece: 'p', san: 'd4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'd4', to: 'e5', flags: 'c', piece: 'p', captured: 'p', san: 'dxe5' },
      { color: 'b', from: 'f8', to: 'c5', flags: 'n', piece: 'b', san: 'Bc5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'd7', to: 'd6', flags: 'n', piece: 'p', san: 'd6' },
      { color: 'w', from: 'e5', to: 'd6', flags: 'c', piece: 'p', captured: 'p', san: 'exd6' },
      { color: 'b', from: 'g8', to: 'e7', flags: 'n', piece: 'n', san: 'Ne7' },
      { color: 'w', from: 'd6', to: 'e7', flags: 'c', piece: 'p', captured: 'n', san: 'dxe7' },
      { color: 'b', from: 'c5', to: 'f2', flags: 'c', piece: 'b', captured: 'p', san: 'Bxf2+' },
      { color: 'w', from: 'e1', to: 'f2', flags: 'c', piece: 'k', captured: 'b', san: 'Kxf2' },
      { color: 'b', from: 'd8', to: 'd1', flags: 'c', piece: 'q', captured: 'q', san: 'Qxd1' }
    ]
  }
];

const waywardQueenTraps = [
  {
    label: 'Wayward Queen: Free Rook',
    description: "A very fast Rook capture by White if Black doesn't know how to defend against it.",
    colour: 'white',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'd1', to: 'h5', flags: 'n', piece: 'q', san: 'Qh5' },
      { color: 'b', from: 'g7', to: 'g6', flags: 'n', piece: 'p', san: 'g6' },
      { color: 'w', from: 'h5', to: 'e5', flags: 'c', piece: 'q', captured: 'p', san: 'Qxe5+' },
      { color: 'b', from: 'f8', to: 'e7', flags: 'n', piece: 'b', san: 'Be7' },
      { color: 'w', from: 'e5', to: 'h8', flags: 'c', piece: 'q', captured: 'r', san: 'Qxh8' }
    ]
  },
  {
    label: 'Wayward Queen: Defense - Queen Trap',
    description: 'A solid defense to the Wayward Queen that can lead to a forked Queen if White slips up.',
    colour: 'black',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'd1', to: 'h5', flags: 'n', piece: 'q', san: 'Qh5' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'g7', to: 'g6', flags: 'n', piece: 'p', san: 'g6' },
      { color: 'w', from: 'h5', to: 'f3', flags: 'n', piece: 'q', san: 'Qf3' },
      { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' },
      { color: 'w', from: 'g2', to: 'g4', flags: 'b', piece: 'p', san: 'g4' },
      { color: 'b', from: 'c6', to: 'd4', flags: 'n', piece: 'n', san: 'Nd4' },
      { color: 'w', from: 'f3', to: 'e3', flags: 'n', piece: 'q', san: 'Qe3' },
      { color: 'b', from: 'd4', to: 'c2', flags: 'c', piece: 'n', captured: 'p', san: 'Nxc2+' },
      { color: 'w', from: 'e1', to: 'f1', flags: 'n', piece: 'k', san: 'Kf1' },
      { color: 'b', from: 'c2', to: 'e3', flags: 'c', piece: 'n', captured: 'q', san: 'Nxe3+' }
    ]
  }
];

const scholarsMateTraps = [
  {
    label: "Scholar's Mate",
    description: 'A very fast checkmate by White to teach Black about the weakness of f7.',
    colour: 'white',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'd1', to: 'h5', flags: 'n', piece: 'q', san: 'Qh5' },
      { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' },
      { color: 'w', from: 'h5', to: 'f7', flags: 'c', piece: 'q', captured: 'p', san: 'Qxf7#' }
    ]
  },
  {
    label: "Scholar's Mate: Fool's Mate",
    description: 'A checkmate in 2 moves by Black. White really has to not know what they are doing for this to occur.',
    colour: 'black',
    value: [
      { color: 'w', from: 'f2', to: 'f3', flags: 'n', piece: 'p', san: 'f3' },
      { color: 'b', from: 'e7', to: 'e6', flags: 'n', piece: 'p', san: 'e6' },
      { color: 'w', from: 'g2', to: 'g4', flags: 'b', piece: 'p', san: 'g4' },
      { color: 'b', from: 'd8', to: 'h4', flags: 'n', piece: 'q', san: 'Qh4#' }
    ]
  }
];

export default [
  {
    label: 'Scholars Mate',
    options: scholarsMateTraps
  },
  {
    label: 'Wayward Queen',
    options: waywardQueenTraps
  },
  {
    label: 'Englund Gambit',
    options: englundGambitTraps
  },
  {
    label: 'London System',
    options: londonSystemTraps
  }
];

// fried liver
