const italianOptions = [
  {
    id: 'igm',
    label: 'Italian Game - Mainline (Needs Updating)',
    value: [
      {
        color: 'w',
        from: 'e2',
        to: 'e4',
        flags: 'b',
        piece: 'p',
        san: 'e4'
      },
      {
        color: 'b',
        from: 'e7',
        to: 'e5',
        flags: 'b',
        piece: 'p',
        san: 'e5'
      },
      {
        color: 'w',
        from: 'g1',
        to: 'f3',
        flags: 'n',
        piece: 'n',
        san: 'Nf3'
      },
      {
        color: 'b',
        from: 'b8',
        to: 'c6',
        flags: 'n',
        piece: 'n',
        san: 'Nc6'
      },
      {
        color: 'w',
        from: 'f1',
        to: 'c4',
        flags: 'n',
        piece: 'b',
        san: 'Bc4'
      },
      {
        color: 'b',
        from: 'f8',
        to: 'c5',
        flags: 'n',
        piece: 'b',
        san: 'Bc5'
      },
      {
        color: 'w',
        from: 'd2',
        to: 'd3',
        flags: 'n',
        piece: 'p',
        san: 'd3'
      },
      {
        color: 'b',
        from: 'd7',
        to: 'd6',
        flags: 'n',
        piece: 'p',
        san: 'd6'
      },
      {
        color: 'w',
        from: 'e1',
        to: 'g1',
        flags: 'k',
        piece: 'k',
        san: 'O-O'
      },
      {
        color: 'b',
        from: 'g8',
        to: 'f6',
        flags: 'n',
        piece: 'n',
        san: 'Nf6'
      },
      {
        color: 'w',
        from: 'c1',
        to: 'g5',
        flags: 'n',
        piece: 'b',
        san: 'Bg5'
      }
    ]
  },
  {
    id: 'igr',
    label: 'Italian Game - Random',
    value: [
      {
        color: 'w',
        from: 'e2',
        to: 'e4',
        flags: 'b',
        piece: 'p',
        san: 'e4'
      },
      {
        color: 'b',
        from: 'e7',
        to: 'e5',
        flags: 'b',
        piece: 'p',
        san: 'e5'
      },
      {
        color: 'w',
        from: 'g1',
        to: 'f3',
        flags: 'n',
        piece: 'n',
        san: 'Nf3'
      },
      {
        color: 'b',
        from: 'b8',
        to: 'c6',
        flags: 'n',
        piece: 'n',
        san: 'Nc6'
      },
      {
        color: 'w',
        from: 'f1',
        to: 'c4',
        flags: 'n',
        piece: 'b',
        san: 'Bc4'
      },
      {
        color: 'b',
        from: 'f8',
        to: 'c5',
        flags: 'n',
        piece: 'b',
        san: 'Bc5'
      },
      {
        color: 'w',
        from: 'd2',
        to: 'd3',
        flags: 'n',
        piece: 'p',
        san: 'd3'
      },
      {
        color: 'b',
        from: 'd7',
        to: 'd6',
        flags: 'n',
        piece: 'p',
        san: 'd6'
      },
      {
        color: 'w',
        from: 'e1',
        to: 'g1',
        flags: 'k',
        piece: 'k',
        san: 'O-O'
      },
      {
        color: 'b',
        from: 'g8',
        to: 'f6',
        flags: 'n',
        piece: 'n',
        san: 'Nf6'
      },
      {
        color: 'w',
        from: 'c1',
        to: 'f4',
        flags: 'n',
        piece: 'b',
        san: 'Bf4'
      }
    ]
  }
];

const queensGambitOptions = [
  {
    id: 'qga',
    label: "Queen's Gambit - Accepted",
    value: [
      {
        color: 'w',
        from: 'd2',
        to: 'd4',
        flags: 'b',
        piece: 'p',
        san: 'd4'
      },
      {
        color: 'b',
        from: 'd7',
        to: 'd5',
        flags: 'b',
        piece: 'p',
        san: 'e5'
      },
      {
        color: 'w',
        from: 'c2',
        to: 'c4',
        flags: 'b',
        piece: 'p',
        san: 'c4'
      },
      {
        color: 'b',
        from: 'd5',
        to: 'c4',
        flags: 'c',
        piece: 'p',
        captured: 'p',
        san: 'dxc4'
      }
    ]
  }
];

const testOptions = [
  {
    id: 't1',
    label: 'Test 1',
    value: [
      {
        color: 'w',
        from: 'd2',
        to: 'd4',
        flags: 'b',
        piece: 'p',
        san: 'd4'
      },
      {
        color: 'b',
        from: 'd7',
        to: 'd5',
        flags: 'b',
        piece: 'p',
        san: 'e5'
      },
      {
        color: 'w',
        from: 'c2',
        to: 'c4',
        flags: 'b',
        piece: 'p',
        san: 'c4'
      },
      {
        color: 'b',
        from: 'd5',
        to: 'c4',
        flags: 'c',
        piece: 'p',
        captured: 'p',
        san: 'dxc4'
      }
    ]
  },
  {
    id: 't2',
    label: 'Test 2',
    value: [
      {
        color: 'w',
        from: 'd2',
        to: 'd4',
        flags: 'b',
        piece: 'p',
        san: 'd4'
      },
      {
        color: 'b',
        from: 'd7',
        to: 'd5',
        flags: 'b',
        piece: 'p',
        san: 'e5'
      },
      {
        color: 'w',
        from: 'c2',
        to: 'c4',
        flags: 'b',
        piece: 'p',
        san: 'c4'
      },
      {
        color: 'b',
        from: 'd5',
        to: 'c4',
        flags: 'c',
        piece: 'p',
        captured: 'p',
        san: 'dxc4'
      }
    ]
  },
  {
    id: 't3',
    label: 'Test 3',
    value: [
      {
        color: 'w',
        from: 'd2',
        to: 'd4',
        flags: 'b',
        piece: 'p',
        san: 'd4'
      },
      {
        color: 'b',
        from: 'd7',
        to: 'd5',
        flags: 'b',
        piece: 'p',
        san: 'e5'
      },
      {
        color: 'w',
        from: 'c2',
        to: 'c4',
        flags: 'b',
        piece: 'p',
        san: 'c4'
      },
      {
        color: 'b',
        from: 'd5',
        to: 'c4',
        flags: 'c',
        piece: 'p',
        captured: 'p',
        san: 'dxc4'
      }
    ]
  },
  {
    id: 't4',
    label: 'Test 4',
    value: [
      {
        color: 'w',
        from: 'd2',
        to: 'd4',
        flags: 'b',
        piece: 'p',
        san: 'd4'
      },
      {
        color: 'b',
        from: 'd7',
        to: 'd5',
        flags: 'b',
        piece: 'p',
        san: 'e5'
      },
      {
        color: 'w',
        from: 'c2',
        to: 'c4',
        flags: 'b',
        piece: 'p',
        san: 'c4'
      },
      {
        color: 'b',
        from: 'd5',
        to: 'c4',
        flags: 'c',
        piece: 'p',
        captured: 'p',
        san: 'dxc4'
      }
    ]
  },
  {
    id: 't5',
    label: 'Test 5',
    value: [
      {
        color: 'w',
        from: 'd2',
        to: 'd4',
        flags: 'b',
        piece: 'p',
        san: 'd4'
      },
      {
        color: 'b',
        from: 'd7',
        to: 'd5',
        flags: 'b',
        piece: 'p',
        san: 'e5'
      },
      {
        color: 'w',
        from: 'c2',
        to: 'c4',
        flags: 'b',
        piece: 'p',
        san: 'c4'
      },
      {
        color: 'b',
        from: 'd5',
        to: 'c4',
        flags: 'c',
        piece: 'p',
        captured: 'p',
        san: 'dxc4'
      }
    ]
  },
  {
    id: 't6',
    label: 'Test 6',
    value: [
      {
        color: 'w',
        from: 'd2',
        to: 'd4',
        flags: 'b',
        piece: 'p',
        san: 'd4'
      },
      {
        color: 'b',
        from: 'd7',
        to: 'd5',
        flags: 'b',
        piece: 'p',
        san: 'e5'
      },
      {
        color: 'w',
        from: 'c2',
        to: 'c4',
        flags: 'b',
        piece: 'p',
        san: 'c4'
      },
      {
        color: 'b',
        from: 'd5',
        to: 'c4',
        flags: 'c',
        piece: 'p',
        captured: 'p',
        san: 'dxc4'
      }
    ]
  },
  {
    id: 't7',
    label: 'Test 7',
    value: [
      {
        color: 'w',
        from: 'd2',
        to: 'd4',
        flags: 'b',
        piece: 'p',
        san: 'd4'
      },
      {
        color: 'b',
        from: 'd7',
        to: 'd5',
        flags: 'b',
        piece: 'p',
        san: 'e5'
      },
      {
        color: 'w',
        from: 'c2',
        to: 'c4',
        flags: 'b',
        piece: 'p',
        san: 'c4'
      },
      {
        color: 'b',
        from: 'd5',
        to: 'c4',
        flags: 'c',
        piece: 'p',
        captured: 'p',
        san: 'dxc4'
      }
    ]
  },
  {
    id: 't8',
    label: 'Test 8',
    value: [
      {
        color: 'w',
        from: 'd2',
        to: 'd4',
        flags: 'b',
        piece: 'p',
        san: 'd4'
      },
      {
        color: 'b',
        from: 'd7',
        to: 'd5',
        flags: 'b',
        piece: 'p',
        san: 'e5'
      },
      {
        color: 'w',
        from: 'c2',
        to: 'c4',
        flags: 'b',
        piece: 'p',
        san: 'c4'
      },
      {
        color: 'b',
        from: 'd5',
        to: 'c4',
        flags: 'c',
        piece: 'p',
        captured: 'p',
        san: 'dxc4'
      }
    ]
  },
  {
    id: 't9',
    label: 'Test 9',
    value: [
      {
        color: 'w',
        from: 'd2',
        to: 'd4',
        flags: 'b',
        piece: 'p',
        san: 'd4'
      },
      {
        color: 'b',
        from: 'd7',
        to: 'd5',
        flags: 'b',
        piece: 'p',
        san: 'e5'
      },
      {
        color: 'w',
        from: 'c2',
        to: 'c4',
        flags: 'b',
        piece: 'p',
        san: 'c4'
      },
      {
        color: 'b',
        from: 'd5',
        to: 'c4',
        flags: 'c',
        piece: 'p',
        captured: 'p',
        san: 'dxc4'
      }
    ]
  },
  {
    id: 't10',
    label: 'Test 10',
    value: [
      {
        color: 'w',
        from: 'd2',
        to: 'd4',
        flags: 'b',
        piece: 'p',
        san: 'd4'
      },
      {
        color: 'b',
        from: 'd7',
        to: 'd5',
        flags: 'b',
        piece: 'p',
        san: 'e5'
      },
      {
        color: 'w',
        from: 'c2',
        to: 'c4',
        flags: 'b',
        piece: 'p',
        san: 'c4'
      },
      {
        color: 'b',
        from: 'd5',
        to: 'c4',
        flags: 'c',
        piece: 'p',
        captured: 'p',
        san: 'dxc4'
      }
    ]
  }
];

export default [
  {
    label: 'Italian Game',
    options: italianOptions
  },
  {
    label: "Queen's Gambit",
    options: queensGambitOptions
  },
  {
    label: 'Tests',
    options: testOptions
  }
];
