import React from 'react';
import dynamic from 'next/dynamic';

import Chess from 'chess.js';
import Panel from './Panel';

import { start } from '../data/consts';
import { useChessboardSize } from '../functions/hooks';
import ChessBoardHeader from './ChessBoardHeader';

const Board = dynamic(import('chessboardjsx'), { ssr: false });

// Things to note: Pawn Captures that are undone are buggy, can't really be helped - try new pieces?

// get softer piece moving sound
// much better take sound needed (much better all sounds needed maybe)

// need to replace black Rook pieces as they glitch out

// https://react-select.com/components -> custom option example, on hover show tooltip that contains final opening layout, add final fen into data structure so it can read that
// add default colour to each opening so we can switch to that on opening change - have option in settings to set auto switch on or off

// on mobile select menu closes after each selection
// on mobile its a bit slow to drop a piece
// make a PWA

// Start Button & Start Random button (or tick box?)
// Move SEO out of component and to individual pages (including index) so error is removed
// Contact/Suggest Opening fix page with links to message me on twitter or make a PR
// Prettify debug mode
// Add spell check vscode extensions
// Suggestions and upcoming work/openings page
// Add more moves to current openings i.e Italian Game: Deutz Gambit
// Show captured pieces on left of chessboard, vertically
// Retry All, Retry Failed, Retry One

export default function ChessBoard({ path, isDebug }) {
  const chessboardSize = useChessboardSize();

  const [game, setGame] = React.useState();
  const [opening, setOpening] = React.useState();
  const [openingComplete, setOpeningComplete] = React.useState(false);
  const [openingError, setOpeningError] = React.useState(false);

  const [redoStack, setRedoStack] = React.useState([]);
  const [undoMade, setUndoMade] = React.useState(false);
  const [navDisabled, setNavDisabled] = React.useState(false);

  const [moveSounds, setMoveSounds] = React.useState([]);
  const [userColor, setUserColor] = React.useState('white');
  const [boardOrientation, setBoardOrientation] = React.useState(userColor);

  const [rightClickedSquares, setRightClickedSquares] = React.useState({});
  const [moveSquares, setMoveSquares] = React.useState({});
  const [optionSquares, setOptionSquares] = React.useState({});

  // initialise
  React.useEffect(() => {
    setGame(new Chess());
    setMoveSounds([
      new Audio('/media/sounds/move1.mp3'),
      new Audio('/media/sounds/move2.mp3'),
      new Audio('/media/sounds/check.wav'),
      new Audio('/media/sounds/error.flac'),
      new Audio('/media/sounds/take.wav')
    ]);
  }, []);

  React.useEffect(() => {
    // if user is starting with black then CPU makes opening move
    if (game?.fen() === start && userColor === 'black' && opening !== undefined) {
      setTimeout(() => {
        makeComputerMove(opening.value[game.history().length].from, opening.value[game.history().length].to);
      }, 500);
      return;
    }

    // if move is undone and its CPU turn next, make CPU move
    if (
      undoMade &&
      game?.history({ verbose: true })[game.history().length - 1]?.color === userColor[0] &&
      opening.value[game.history().length] !== undefined
    ) {
      makeComputerMove(opening.value[game.history().length].from, opening.value[game.history().length].to);
      redoStack.pop();
    }

    setUndoMade(false);
  }, [game, undoMade, userColor, opening]);

  // safely update game in useState
  function safeGameMutate(modify) {
    setGame((game) => {
      const update = { ...game };
      modify(update);
      return update;
    });
  }

  // reset game state
  function reset() {
    safeGameMutate((game) => {
      game.reset();
    });
    setRedoStack([]);
    setRightClickedSquares({});
    setMoveSquares({});
    setOptionSquares({});
  }

  // play sound on moves
  function playSound() {
    if (game.in_checkmate()) {
      return;
    }
    if (game.in_check()) {
      moveSounds[2].play();
      return;
    }
    if (game.history({ verbose: true })[game.history().length - 1].captured) {
      moveSounds[1].play();
      setTimeout(() => {
        moveSounds[4].play();
      }, 10);
      return;
    }

    // check for castling and make unique castling sound (if color white and e1 to g1 or e1 to c1 ...)

    moveSounds[1].play();
  }

  function goBack() {
    const history = game.history({ verbose: true });
    const lastMoveIndex = history.length - 1;
    const targetMoveIndex = history.length - 2;
    const lastFrom = history[lastMoveIndex].from;
    const lastTo = history[lastMoveIndex].to;
    const lastColor = history[lastMoveIndex].color;
    const targetFrom = history[targetMoveIndex].from;
    const targetTo = history[targetMoveIndex].to;
    const targetColor = history[targetMoveIndex].color;

    redoStack.push({
      from: lastFrom,
      to: lastTo,
      color: lastColor
    });
    redoStack.push({
      from: targetFrom,
      to: targetTo,
      color: targetColor
    });

    setUndoMade(true);
    safeGameMutate((game) => {
      // go back twice to go back past CPU move
      game.undo();
      game.undo();
    });
    moveSounds[0].play();

    // colour move squares of move made prior to 2 moves ago
    const priorMoveIndex = history.length - 3;
    if (priorMoveIndex > -1) {
      const priorFrom = history[priorMoveIndex].from;
      const priorTo = history[priorMoveIndex].to;
      setMoveSquares({
        [priorFrom]: {
          backgroundColor: 'rgba(255, 255, 0, 0.4)'
        },
        [priorTo]: {
          backgroundColor: 'rgba(255, 255, 0, 0.4)'
        }
      });
    } else setMoveSquares({});
  }

  function goForward() {
    setNavDisabled(true);
    const redoMove = redoStack.pop();
    safeGameMutate((game) => {
      game.move(redoMove);
    });
    setTimeout(() => {
      playSound();
    }, 300);
    setMoveSquares({
      [redoMove.from]: {
        backgroundColor: 'rgba(255, 255, 0, 0.4)'
      },
      [redoMove.to]: {
        backgroundColor: 'rgba(255, 255, 0, 0.4)'
      }
    });

    // 2nd condition was previously: opening.value[game.history().length - 1]
    // have removed the -1 and all still seems to work and bug has disappeared:
    // Bug found: as white - italian, first move made, click back, then forward, and CPU won't make move when it should
    if (
      redoStack.length > 0 &&
      opening.value[game.history().length] !== undefined &&
      redoStack[redoStack.length - 1].color !== userColor[0]
    ) {
      const move = redoStack.pop();
      setTimeout(() => {
        makeComputerMove(move.from, move.to);
      }, 300);
    } else setNavDisabled(false);
  }

  function makeComputerMove(from, to) {
    safeGameMutate((game) => {
      game.move({ from, to });
    });
    setMoveSquares({
      [from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
      [to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
    });
    setTimeout(() => {
      playSound();
      setNavDisabled(false);
      if (opening.value[game.history().length] === undefined) setOpeningComplete(true);
    }, 300);
  }

  function onDrop({ sourceSquare, targetSquare }) {
    // no opening has been selected yet so prevent anything happening
    if (!opening) return;

    // make move if valid, otherwise do nothing and return
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    });
    if (move === null) return;

    const historyLength = game.history().length;

    // if still in opening and incorrect move made
    if (
      opening.value[game.history().length - 1] !== undefined &&
      (sourceSquare !== opening.value[historyLength - 1].from || targetSquare !== opening.value[historyLength - 1].to)
    ) {
      safeGameMutate((game) => {
        game.undo();
      });
      moveSounds[3].play();
      setRightClickedSquares({});
      setOptionSquares({});
      setOpeningError(true);
      setMoveSquares({
        [sourceSquare]: { backgroundColor: 'rgba(255, 0, 0, 0.4)' },
        [targetSquare]: { backgroundColor: 'rgba(255, 0, 0, 0.4)' }
      });
      return;
    }

    playSound();
    setRedoStack([]);
    setRightClickedSquares({});
    setMoveSquares({
      [sourceSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
      [targetSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
    });

    if (opening.value[historyLength] !== undefined) {
      // removed the +1 from here index, check back later
      makeComputerMove(opening.value[historyLength].from, opening.value[historyLength].to);
    } else setOpeningComplete(true);
  }

  // For recording moves
  function onDropDebug({ sourceSquare, targetSquare }) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    });
    if (move === null) return;
    playSound();
    setMoveSquares({
      [sourceSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
      [targetSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
    });
    console.log(JSON.stringify(game.history({ verbose: true })));
  }

  function onSquareClick() {
    setRightClickedSquares({});
  }

  function onSquareRightClick(square) {
    const colour = 'rgba(0, 0, 255, 0.4)';
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] && rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour }
    });
  }

  function onMouseOverSquare(square) {
    const moves = game.moves({
      square,
      verbose: true
    });
    if (moves.length === 0) return;

    const newSquares = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) && game.get(move.to).color !== game.get(square).color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%'
      };
      return move;
    });
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)'
    };
    setOptionSquares(newSquares);
  }

  // Only set squares to {} if not already set to {}
  function onMouseOutSquare() {
    if (Object.keys(optionSquares).length !== 0) setOptionSquares({});
  }

  return (
    <div className="chessboard-container">
      <div id="chessboard" className="chessboard">
        <ChessBoardHeader path={path} opening={opening} />
        <Board
          id="board"
          position={game ? game.fen() : start}
          orientation={boardOrientation}
          darkSquareStyle={{ backgroundColor: '#779952' }}
          lightSquareStyle={{ backgroundColor: '#edeed1' }}
          dropSquareStyle={{
            boxShadow: 'inset 0 0 1px 6px rgba(255,255,255,0.75)'
          }}
          squareStyles={{
            ...rightClickedSquares,
            ...moveSquares,
            ...optionSquares
          }}
          onDrop={isDebug ? onDropDebug : onDrop}
          onSquareClick={onSquareClick}
          onSquareRightClick={onSquareRightClick}
          onMouseOverSquare={onMouseOverSquare}
          onMouseOutSquare={onMouseOutSquare}
          width={chessboardSize}
          transitionDuration={300}
          pieces={{
            bQ: ({ squareWidth }) => (
              <img
                style={{ width: squareWidth, height: squareWidth }}
                src={
                  // https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Chess_qdt45.svg/1280px-Chess_qdt45.svg.png'
                }
                alt={'b Queen'}
              />
            )
          }}
        />
      </div>
      <Panel
        boardOrientation={boardOrientation}
        game={game}
        goBack={goBack}
        goForward={goForward}
        navDisabled={navDisabled}
        opening={opening}
        openingComplete={openingComplete}
        openingError={openingError}
        path={path}
        redoStack={redoStack}
        reset={reset}
        setBoardOrientation={setBoardOrientation}
        setOpening={setOpening}
        setOpeningComplete={setOpeningComplete}
        setOpeningError={setOpeningError}
        setUserColor={setUserColor}
        userColor={userColor}
      />
    </div>
  );
}
