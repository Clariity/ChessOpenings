const italianOptions = [
  {
    label: 'Italian Game: Classical Variation, Giuco Pianissimo, d6',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'f8', to: 'c5', flags: 'n', piece: 'b', san: 'Bc5' },
      { color: 'w', from: 'c2', to: 'c3', flags: 'n', piece: 'p', san: 'c3' },
      { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' },
      { color: 'w', from: 'd2', to: 'd3', flags: 'n', piece: 'p', san: 'd3' },
      { color: 'b', from: 'd7', to: 'd6', flags: 'n', piece: 'p', san: 'd6' },
      { color: 'w', from: 'e1', to: 'g1', flags: 'k', piece: 'k', san: 'O-O' }
    ]
  },
  {
    label: 'Italian Game: Classical Variation, Giuco Pianissimo, a6',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'f8', to: 'c5', flags: 'n', piece: 'b', san: 'Bc5' },
      { color: 'w', from: 'c2', to: 'c3', flags: 'n', piece: 'p', san: 'c3' },
      { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' },
      { color: 'w', from: 'd2', to: 'd3', flags: 'n', piece: 'p', san: 'd3' },
      { color: 'b', from: 'a7', to: 'a6', flags: 'n', piece: 'p', san: 'a6' },
      { color: 'w', from: 'c4', to: 'b3', flags: 'n', piece: 'b', san: 'Bb3' },
      { color: 'b', from: 'c5', to: 'a7', flags: 'n', piece: 'b', san: 'Ba7' },
      { color: 'w', from: 'e1', to: 'g1', flags: 'k', piece: 'k', san: 'O-O' }
    ]
  },
  {
    label: 'Italian Game: Classical Variation, Greco Gambit, Traditional Line',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'f8', to: 'c5', flags: 'n', piece: 'b', san: 'Bc5' },
      { color: 'w', from: 'c2', to: 'c3', flags: 'n', piece: 'p', san: 'c3' },
      { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' },
      { color: 'w', from: 'd2', to: 'd4', flags: 'b', piece: 'p', san: 'd4' },
      { color: 'b', from: 'e5', to: 'd4', flags: 'c', piece: 'p', captured: 'p', san: 'exd4' },
      { color: 'w', from: 'c3', to: 'd4', flags: 'c', piece: 'p', captured: 'p', san: 'cxd4' },
      { color: 'b', from: 'c5', to: 'b4', flags: 'n', piece: 'b', san: 'Bb4+' },
      { color: 'w', from: 'c1', to: 'd2', flags: 'n', piece: 'b', san: 'Bd2' },
      { color: 'b', from: 'b4', to: 'd2', flags: 'c', piece: 'b', captured: 'b', san: 'Bxd2+' },
      { color: 'w', from: 'b1', to: 'd2', flags: 'c', piece: 'n', captured: 'b', san: 'Nbxd2' },
      { color: 'b', from: 'd7', to: 'd5', flags: 'b', piece: 'p', san: 'd5' },
      { color: 'w', from: 'e4', to: 'd5', flags: 'c', piece: 'p', captured: 'p', san: 'exd5' },
      { color: 'b', from: 'f6', to: 'd5', flags: 'c', piece: 'n', captured: 'p', san: 'Nxd5' }
    ]
  },
  {
    label: 'Italian Game: Classical Variation, Greco Gambit',
    description: '',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'f8', to: 'c5', flags: 'n', piece: 'b', san: 'Bc5' },
      { color: 'w', from: 'c2', to: 'c3', flags: 'n', piece: 'p', san: 'c3' },
      { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' },
      { color: 'w', from: 'd2', to: 'd4', flags: 'b', piece: 'p', san: 'd4' },
      { color: 'b', from: 'e5', to: 'd4', flags: 'c', piece: 'p', captured: 'p', san: 'exd4' },
      { color: 'w', from: 'e4', to: 'e5', flags: 'n', piece: 'p', san: 'e5' },
      { color: 'b', from: 'd7', to: 'd5', flags: 'b', piece: 'p', san: 'd5' },
      { color: 'w', from: 'c4', to: 'b5', flags: 'n', piece: 'b', san: 'Bb5' },
      { color: 'b', from: 'f6', to: 'e4', flags: 'n', piece: 'n', san: 'Ne4' },
      { color: 'w', from: 'c3', to: 'd4', flags: 'c', piece: 'p', captured: 'p', san: 'cxd4' }
    ]
  },
  {
    label: "Italian Game: Bird's Attack",
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'f8', to: 'c5', flags: 'n', piece: 'b', san: 'Bc5' },
      { color: 'w', from: 'c2', to: 'c3', flags: 'n', piece: 'p', san: 'c3' },
      { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' },
      { color: 'w', from: 'b2', to: 'b4', flags: 'b', piece: 'p', san: 'b4' },
      { color: 'b', from: 'c5', to: 'b6', flags: 'n', piece: 'b', san: 'Bb6' },
      { color: 'w', from: 'd2', to: 'd3', flags: 'n', piece: 'p', san: 'd3' },
      { color: 'b', from: 'd7', to: 'd6', flags: 'n', piece: 'p', san: 'd6' },
      { color: 'w', from: 'a2', to: 'a4', flags: 'b', piece: 'p', san: 'a4' }
    ]
  },
  {
    label: 'Italian Game: Giuoco Piano',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'f8', to: 'c5', flags: 'n', piece: 'b', san: 'Bc5' },
      { color: 'w', from: 'e1', to: 'g1', flags: 'k', piece: 'k', san: 'O-O' },
      { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' },
      { color: 'w', from: 'd2', to: 'd3', flags: 'n', piece: 'p', san: 'd3' },
      { color: 'b', from: 'd7', to: 'd6', flags: 'n', piece: 'p', san: 'd6' },
      { color: 'w', from: 'c2', to: 'c3', flags: 'n', piece: 'p', san: 'c3' }
    ]
  },
  {
    label: 'Italian Game: Deutz Gambit',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'f8', to: 'c5', flags: 'n', piece: 'b', san: 'Bc5' },
      { color: 'w', from: 'e1', to: 'g1', flags: 'k', piece: 'k', san: 'O-O' },
      { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' },
      { color: 'w', from: 'd2', to: 'd4', flags: 'b', piece: 'p', san: 'd4' },
      { color: 'b', from: 'c5', to: 'd4', flags: 'c', piece: 'b', captured: 'p', san: 'Bxd4' },
      { color: 'w', from: 'f3', to: 'd4', flags: 'c', piece: 'n', captured: 'b', san: 'Nxd4' },
      { color: 'b', from: 'c6', to: 'd4', flags: 'c', piece: 'n', captured: 'n', san: 'Nxd4' }
    ]
  },
  {
    label: 'Italian Game: Two Knights Defense, Max Lange Attack',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'f8', to: 'c5', flags: 'n', piece: 'b', san: 'Bc5' },
      { color: 'w', from: 'e1', to: 'g1', flags: 'k', piece: 'k', san: 'O-O' },
      { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' },
      { color: 'w', from: 'd2', to: 'd4', flags: 'b', piece: 'p', san: 'd4' },
      { color: 'b', from: 'e5', to: 'd4', flags: 'c', piece: 'p', captured: 'p', san: 'exd4' },
      { color: 'w', from: 'e4', to: 'e5', flags: 'n', piece: 'p', san: 'e5' },
      { color: 'b', from: 'd7', to: 'd5', flags: 'b', piece: 'p', san: 'd5' },
      { color: 'w', from: 'e5', to: 'f6', flags: 'c', piece: 'p', captured: 'n', san: 'exf6' },
      { color: 'b', from: 'd5', to: 'c4', flags: 'c', piece: 'p', captured: 'b', san: 'dxc4' }
    ]
  },
  {
    label: 'Italian Game: Giuoco Pianissimo, Normal',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'f8', to: 'c5', flags: 'n', piece: 'b', san: 'Bc5' },
      { color: 'w', from: 'd2', to: 'd3', flags: 'n', piece: 'p', san: 'd3' },
      { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' },
      { color: 'w', from: 'e1', to: 'g1', flags: 'k', piece: 'k', san: 'O-O' },
      { color: 'b', from: 'd7', to: 'd6', flags: 'n', piece: 'p', san: 'd6' },
      { color: 'w', from: 'c2', to: 'c3', flags: 'n', piece: 'p', san: 'c3' }
    ]
  },
  {
    label: "Italian Game: Two Knights Defense, Modern Bishop's Opening",
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' },
      { color: 'w', from: 'd2', to: 'd3', flags: 'n', piece: 'p', san: 'd3' },
      { color: 'b', from: 'f8', to: 'e7', flags: 'n', piece: 'b', san: 'Be7' },
      { color: 'w', from: 'e1', to: 'g1', flags: 'k', piece: 'k', san: 'O-O' },
      { color: 'b', from: 'e8', to: 'g8', flags: 'k', piece: 'k', san: 'O-O' },
      { color: 'w', from: 'f1', to: 'e1', flags: 'n', piece: 'r', san: 'Re1' },
      { color: 'b', from: 'd7', to: 'd6', flags: 'n', piece: 'p', san: 'd6' }
    ]
  },
  {
    label: 'Italian Game: Two Knights Defense, Polerio Defense, Bishop Check Line',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' },
      { color: 'w', from: 'f3', to: 'g5', flags: 'n', piece: 'n', san: 'Ng5' },
      { color: 'b', from: 'd7', to: 'd5', flags: 'b', piece: 'p', san: 'd5' },
      { color: 'w', from: 'e4', to: 'd5', flags: 'c', piece: 'p', captured: 'p', san: 'exd5' },
      { color: 'b', from: 'c6', to: 'a5', flags: 'n', piece: 'n', san: 'Na5' },
      { color: 'w', from: 'c4', to: 'b5', flags: 'n', piece: 'b', san: 'Bb5+' },
      { color: 'b', from: 'c7', to: 'c6', flags: 'n', piece: 'p', san: 'c6' },
      { color: 'w', from: 'd5', to: 'c6', flags: 'c', piece: 'p', captured: 'p', san: 'dxc6' },
      { color: 'b', from: 'b7', to: 'c6', flags: 'c', piece: 'p', captured: 'p', san: 'bxc6' }
    ]
  },
  {
    label: 'Italian Game: Two Knights Defense, Traxler Counterattack, Knight Sacrifice Line',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'g8', to: 'f6', flags: 'n', piece: 'n', san: 'Nf6' },
      { color: 'w', from: 'f3', to: 'g5', flags: 'n', piece: 'n', san: 'Ng5' },
      { color: 'b', from: 'f8', to: 'c5', flags: 'n', piece: 'b', san: 'Bc5' },
      { color: 'w', from: 'g5', to: 'f7', flags: 'c', piece: 'n', captured: 'p', san: 'Nxf7' },
      { color: 'b', from: 'c5', to: 'f2', flags: 'c', piece: 'b', captured: 'p', san: 'Bxf2+' },
      { color: 'w', from: 'e1', to: 'f1', flags: 'n', piece: 'k', san: 'Kf1' },
      { color: 'b', from: 'd8', to: 'e7', flags: 'n', piece: 'q', san: 'Qe7' },
      { color: 'w', from: 'f7', to: 'h8', flags: 'c', piece: 'n', captured: 'r', san: 'Nxh8' },
      { color: 'b', from: 'd7', to: 'd5', flags: 'b', piece: 'p', san: 'd5' },
      { color: 'w', from: 'e4', to: 'd5', flags: 'c', piece: 'p', captured: 'p', san: 'exd5' },
      { color: 'b', from: 'c6', to: 'd4', flags: 'n', piece: 'n', san: 'Nd4' }
    ]
  },
  {
    label: 'Italian Game: Evans Gambit, Pierce Defense',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'f8', to: 'c5', flags: 'n', piece: 'b', san: 'Bc5' },
      { color: 'w', from: 'b2', to: 'b4', flags: 'b', piece: 'p', san: 'b4' },
      { color: 'b', from: 'c5', to: 'b4', flags: 'c', piece: 'b', captured: 'p', san: 'Bxb4' },
      { color: 'w', from: 'c2', to: 'c3', flags: 'n', piece: 'p', san: 'c3' },
      { color: 'b', from: 'b4', to: 'a5', flags: 'n', piece: 'b', san: 'Ba5' },
      { color: 'w', from: 'd2', to: 'd4', flags: 'b', piece: 'p', san: 'd4' },
      { color: 'b', from: 'e5', to: 'd4', flags: 'c', piece: 'p', captured: 'p', san: 'exd4' },
      { color: 'w', from: 'd1', to: 'b3', flags: 'n', piece: 'q', san: 'Qb3' }
    ]
  },
  {
    label: 'Italian Game: Evans Gambit, Tartakower Attack',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'f8', to: 'c5', flags: 'n', piece: 'b', san: 'Bc5' },
      { color: 'w', from: 'b2', to: 'b4', flags: 'b', piece: 'p', san: 'b4' },
      { color: 'b', from: 'c5', to: 'b4', flags: 'c', piece: 'b', captured: 'p', san: 'Bxb4' },
      { color: 'w', from: 'c2', to: 'c3', flags: 'n', piece: 'p', san: 'c3' },
      { color: 'b', from: 'b4', to: 'a5', flags: 'n', piece: 'b', san: 'Ba5' },
      { color: 'w', from: 'd2', to: 'd4', flags: 'b', piece: 'p', san: 'd4' },
      { color: 'b', from: 'd7', to: 'd6', flags: 'n', piece: 'p', san: 'd6' },
      { color: 'w', from: 'd1', to: 'b3', flags: 'n', piece: 'q', san: 'Qb3' },
      { color: 'b', from: 'd8', to: 'd7', flags: 'n', piece: 'q', san: 'Qd7' },
      { color: 'w', from: 'd4', to: 'e5', flags: 'c', piece: 'p', captured: 'p', san: 'dxe5' },
      { color: 'b', from: 'a5', to: 'b6', flags: 'n', piece: 'b', san: 'Bb6' }
    ]
  },
  {
    label: 'Italian Game: Evans Gambit, Anderssen Variation, Cordel Line',
    value: [
      { color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' },
      { color: 'b', from: 'e7', to: 'e5', flags: 'b', piece: 'p', san: 'e5' },
      { color: 'w', from: 'g1', to: 'f3', flags: 'n', piece: 'n', san: 'Nf3' },
      { color: 'b', from: 'b8', to: 'c6', flags: 'n', piece: 'n', san: 'Nc6' },
      { color: 'w', from: 'f1', to: 'c4', flags: 'n', piece: 'b', san: 'Bc4' },
      { color: 'b', from: 'f8', to: 'c5', flags: 'n', piece: 'b', san: 'Bc5' },
      { color: 'w', from: 'b2', to: 'b4', flags: 'b', piece: 'p', san: 'b4' },
      { color: 'b', from: 'c5', to: 'b4', flags: 'c', piece: 'b', captured: 'p', san: 'Bxb4' },
      { color: 'w', from: 'c2', to: 'c3', flags: 'n', piece: 'p', san: 'c3' },
      { color: 'b', from: 'b4', to: 'e7', flags: 'n', piece: 'b', san: 'Be7' },
      { color: 'w', from: 'd2', to: 'd4', flags: 'b', piece: 'p', san: 'd4' },
      { color: 'b', from: 'c6', to: 'a5', flags: 'n', piece: 'n', san: 'Na5' }
    ]
  }
];

const selectAllOptions = [
  {
    label: 'All Openings',
    value: 'All'
  },
  {
    label: 'All Italian Game',
    value: 'Italian Game:'
  }
];

export default [
  {
    label: 'Select All',
    options: selectAllOptions
  },
  {
    label: 'Caro-Kann',
    options: []
  },
  {
    label: 'Catalan',
    options: []
  },
  {
    label: 'English Opening',
    options: []
  },
  {
    label: 'Four Knights Game',
    options: []
  },
  {
    label: 'London System',
    options: []
  },
  {
    label: "Alekhine's Defence",
    options: []
  },
  {
    label: 'Benoni Defence',
    options: []
  },
  {
    label: 'Dutch Defence',
    options: []
  },
  {
    label: 'French Defence',
    options: []
  },
  {
    label: 'Grünfeld Defence',
    options: []
  },
  {
    label: 'Philidor Defense',
    options: []
  },
  {
    label: 'Pirc Defense',
    options: []
  },
  {
    label: 'Scandinavian Defense',
    options: []
  },
  {
    label: 'Sicillian Defense',
    options: []
  },
  {
    label: "King's Indian",
    options: []
  },
  {
    label: 'Nimzo-Indian',
    options: []
  },
  {
    label: "Queen's Indian",
    options: []
  },
  {
    label: 'Danish Gambit',
    options: []
  },
  {
    label: "Kings's Gambit Accepted",
    options: []
  },
  {
    label: "Kings's Gambit Declined",
    options: []
  },
  {
    label: "Queen's Gambit Accepted",
    options: []
  },
  {
    label: "Queen's Gambit Declined",
    options: []
  },
  {
    label: 'Ruy Lopez',
    options: []
  },
  {
    label: 'Center Game',
    options: []
  },
  {
    label: 'Italian Game',
    options: italianOptions
  },
  {
    label: "Queen's Pawn Game",
    options: []
  },
  {
    label: 'Russian Game',
    options: []
  },
  {
    label: 'Scotch Game',
    options: []
  },
  {
    label: 'Vienna Game',
    options: []
  }
];
