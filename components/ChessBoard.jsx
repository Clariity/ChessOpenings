import React from 'react';
import dynamic from 'next/dynamic';

import Chess from 'chess.js';
import { useChessboardSize } from '../functions/hooks';
import Panel from './Panel';

const Board = dynamic(import('chessboardjsx'), { ssr: false });

// Things to note: Pawn Captures that are undone are buggy, can't really be helped
// Clicking forward too fast will break it

export default function ChessBoard() {
  const chessboardSize = useChessboardSize();
  const start = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

  const [game, setGame] = React.useState();
  const [variation, setVariation] = React.useState();

  const [redoStack, setRedoStack] = React.useState([]);
  const [undoMade, setUndoMade] = React.useState(false);

  const [moveSounds, setMoveSounds] = React.useState([]);
  const [userColor, setUserColor] = React.useState('white');
  const [boardOrientation, setBoardOrientation] = React.useState(userColor);

  const [clickedSquare, setClickedSquare] = React.useState({});
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
    if (game?.fen() === start && userColor === 'black') {
      setTimeout(() => {
        makeComputerMove(
          variation.value[game.history().length].from,
          variation.value[game.history().length].to
        );
      }, 500);
      return;
    }

    // if move is undone and its CPU turn next, make CPU move
    if (
      undoMade &&
      game?.history({ verbose: true })[game.history().length - 1]?.color ===
        userColor[0] &&
      variation.value[game.history().length] !== undefined
    ) {
      makeComputerMove(
        variation.value[game.history().length].from,
        variation.value[game.history().length].to
      );
      redoStack.pop();
    }

    setUndoMade(false);
    setClickedSquare({});
  }, [game, undoMade, userColor]);

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
    setClickedSquare({});
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

    if (
      redoStack.length > 0 &&
      variation.value[game.history().length - 1] !== undefined &&
      redoStack[redoStack.length - 1].color !== userColor[0]
    ) {
      const move = redoStack.pop();
      setTimeout(() => {
        makeComputerMove(move.from, move.to);
      }, 300);
    }
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
    }, 300);
  }

  function onDrop({ sourceSquare, targetSquare }) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q'
    });
    if (move === null) return;

    const historyLength = game.history().length;

    // if still in opening
    if (variation.value[game.history().length - 1] !== undefined) {
      if (
        sourceSquare !== variation.value[historyLength - 1].from ||
        targetSquare !== variation.value[historyLength - 1].to
      ) {
        safeGameMutate((game) => {
          game.undo();
        });
        moveSounds[3].play();
        setRightClickedSquares({});
        setOptionSquares({});
        setMoveSquares({
          [sourceSquare]: { backgroundColor: 'rgba(255, 0, 0, 0.4)' },
          [targetSquare]: { backgroundColor: 'rgba(255, 0, 0, 0.4)' }
        });
        return;
      }
    }

    playSound();
    setRedoStack([]);
    setRightClickedSquares({});
    setMoveSquares({
      [sourceSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
      [targetSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
    });

    // used for creating moves, later incorporate into some debug mode so can be switched to automatically
    // console.log(JSON.stringify(game.history({ verbose: true })));

    if (variation.value[historyLength] !== undefined) {
      // removed the +1 from here index, check back later
      makeComputerMove(
        variation.value[historyLength].from,
        variation.value[historyLength].to
      );
    }
  }

  function onSquareClick(square) {
    setRightClickedSquares({});
    setClickedSquare({
      [square]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
    });
  }

  function onSquareRightClick(square) {
    const colour = 'rgba(0, 0, 255, 0.4)';
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] &&
        rightClickedSquares[square].backgroundColor === colour
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
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
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

  function onMouseOutSquare() {
    setOptionSquares({});
  }

  return (
    <div className="chessboard-container">
      <div className="chessboard">
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
            ...clickedSquare,
            ...rightClickedSquares,
            ...moveSquares,
            ...optionSquares
          }}
          onDrop={onDrop}
          onSquareClick={onSquareClick}
          onSquareRightClick={onSquareRightClick}
          onMouseOverSquare={onMouseOverSquare}
          onMouseOutSquare={onMouseOutSquare}
          width={chessboardSize - 20}
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
        start={start}
        reset={reset}
        boardOrientation={boardOrientation}
        setBoardOrientation={setBoardOrientation}
        redoStack={redoStack}
        userColor={userColor}
        setUserColor={setUserColor}
        variation={variation}
        setVariation={setVariation}
        game={game}
        goBack={goBack}
        goForward={goForward}
      />
    </div>
  );
}
