import React, { useContext, useEffect, useRef, useState } from 'react';
import Chess from 'chess.js';
import { useRouter } from 'next/router';

import { start } from '../data/consts';
import { useSettings } from './settings-context';

export const ChessboardContext = React.createContext();

// GENERAL
// Add version in footer (Add footer), and autoincrement on commit with GitHub actions
// Update sitemap dynamically
// Serve icons from site instead of CDN? Serve consistent icons?

// LEARN
// TODO: toggle hints
// TODO: add lichess opening explorer

// CONTRIBUTE
// TODO: store display fen (checkbox to mark position as display for static boards, default to move 5)

// SETTINGS
// TODO: add playsounds option and only play sounds if turned on - fine grain sound options -> move sounds, sound on start/end
// TODO: separate pieces and board colour themes
// TODO: Shorten all sounds to smallest size to play better on lower end devices

// BUGS
// TODO: react-tooltip on disabled buttons, need to wrap in div and add tooltip there
// TODO: If you complete opening (openingComplete set) and go back, combined squares will no longer be set --> need to setOpeningComplete to false if go back into opening
// TODO: sounds need more delay as not working on mobile
// TODO: capture sound not always playing correctly

// hovering over piece as computer moves, causes option squares not to show
// - due to no moves being legal whilst waiting for CPU

// fix burger menu on non chrome
// use dev channel for localhost on discord
// if user email isn't verified then don't let them do user things until it is
// /verify page with button to send again
// forgotten password page
// /auth_action page to take in email actions
// note to check junk mail

// https://stackoverflow.com/a/57353532

export const useChessboard = () => useContext(ChessboardContext);

export const ChessboardProvider = ({ children }) => {
  const chessboardRef = useRef();
  const { pathname } = useRouter();
  const { animationsOn, theme } = useSettings();

  // game logic
  const [game, setGame] = useState();
  const [moveSounds, setMoveSounds] = useState();
  const [redoStack, setRedoStack] = useState([]);
  const [userColor, setUserColor] = useState('white');
  const [currentTimeout, setCurrentTimeout] = useState(undefined);

  // opening logic
  const [opening, setOpening] = useState();
  const [openingComplete, setOpeningComplete] = useState(false);
  const [openingError, setOpeningError] = useState(false);

  // board logic
  const [boardOrientation, setBoardOrientation] = useState('white');
  const [moveFrom, setMoveFrom] = useState('');

  // square styles
  const [combinedSquares, setCombinedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});
  const [rightClickedSquares, setRightClickedSquares] = useState({});

  // initialise new game
  useEffect(() => {
    setGame(new Chess());
  }, []);

  // initialise new sounds on theme change
  useEffect(() => {
    if (theme?.value) {
      setMoveSounds({
        move: new Audio(`/media/themes/${theme.value}/move.mp3`),
        capture: new Audio(`/media/themes/${theme.value}/capture.mp3`),
        check: new Audio(`/media/themes/${theme.value}/check.mp3`),
        castle: new Audio(`/media/themes/${theme.value}/castle.mp3`),
        error: new Audio(`/media/themes/${theme.value}/error.mp3`),
        start: new Audio(`/media/themes/${theme.value}/start.mp3`),
        end: new Audio(`/media/themes/${theme.value}/end.mp3`)
      });
    }
  }, [theme]);

  // fill redo stack on submission pages
  useEffect(() => {
    if (opening && pathname.includes('/submissions')) {
      setBoardOrientation(opening.colour || 'white');
      setRedoStack([...opening.value].reverse());
    }
  }, [opening, pathname]);

  // set combined squares
  useEffect(() => {
    const newCombinedSquares = {};
    Object.keys(moveSquares).forEach((s) => {
      if (optionSquares[s]) {
        newCombinedSquares[s] = {
          background:
            game.get(s) && game.get(s).color !== game.get(moveFrom)?.color
              ? 'radial-gradient(circle, rgba(255, 255, 0, .5) 85%, transparent 85%)'
              : 'radial-gradient(circle, rgba(255, 255, 0, .5) 25%, transparent 25%)',
          borderRadius: '50%'
        };
      }
    });

    // only highlight combined squares if opening is not complete
    if (!openingComplete) {
      setCombinedSquares(newCombinedSquares);
    }
  }, [optionSquares, moveSquares, openingComplete, game, moveFrom]);

  // start opening
  useEffect(() => {
    // user starting with black, CPU makes opening move after 0.5s
    if (game?.fen() === start && userColor === 'black' && opening) {
      setTimeout(() => {
        makeComputerMove(opening.value[0].from, opening.value[0].to);
      }, 500);
      return;
    }

    // user starting with white, set initial move highlight
    if (
      game?.fen() === start &&
      userColor === 'white' &&
      opening &&
      (pathname.includes('/learn') || pathname.includes('/traps')) &&
      !openingError
    ) {
      setMoveSquares({
        [opening.value[0].from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
        [opening.value[0].to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game, openingError, userColor, opening, pathname]);

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  // reset game state
  function reset(withSound = false) {
    chessboardRef.current.clearPremoves();
    clearTimeout(currentTimeout);
    withSound && playSound('start');
    safeGameMutate((game) => {
      game.reset();
    });
    setRedoStack(pathname.includes('/submissions') ? [...opening.value].reverse() : []);
    setOpeningComplete(false);
    setCombinedSquares({});
    setMoveSquares({});
    setOptionSquares({});
    setRightClickedSquares({});
  }

  function resume() {
    chessboardRef.current.clearPremoves();
    setRedoStack([]);
    // if player made last move, and there is a move for CPU to make, make CPU move
    if (game?.history({ verbose: true })[game.history().length - 1]?.color === userColor[0]) {
      makeComputerMove(opening.value[game.history().length].from, opening.value[game.history().length].to);
    } else {
      const nextMove = opening.value[game.history().length];
      setMoveSquares({
        [nextMove?.from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
        [nextMove?.to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
      });
    }
  }

  // play sound on moves
  function playSound(sound, moveOverride) {
    const move = moveOverride || game.history({ verbose: true })[game.history().length - 1];
    if (sound === 'start') moveSounds.start.play();
    else if (sound === 'end') moveSounds.end.play();
    else if (game.in_checkmate()) moveSounds.end.play();
    else if (game.in_check()) moveSounds.check.play();
    else if (move?.captured) moveSounds.capture.play();
    else if (
      (move?.from === 'e1' && (move?.to === 'g1' || move?.to === 'c1')) ||
      (move?.from === 'e8' && (move?.to === 'g8' || move?.to === 'c8'))
    ) {
      moveSounds.castle.play();
    } else if (move) moveSounds.move.play();
  }

  // piece dropped on board by user
  function onPieceDrop(sourceSquare, targetSquare) {
    // clear any moveFrom squares that may be clicked
    setMoveFrom('');
    if (pathname !== '/contribute') {
      // no opening has been selected yet so prevent anything happening
      if (!opening) return false;
    }

    // attempt move
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen for example simplicity
    });
    setGame(gameCopy);

    // illegal move
    if (move === null) return false;

    if (pathname !== '/contribute') {
      // move was legal, perform opening logic
      return makeValidMove(sourceSquare, targetSquare);
    } else {
      playSound();
      setMoveSquares({
        [sourceSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
        [targetSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
      });
    }
    return true;
  }

  // move made was valid, attempt move in opening
  function makeValidMove(sourceSquare, targetSquare) {
    // reset right clicked squares
    setRightClickedSquares({});
    // reset option squares
    setOptionSquares({});
    // reset redo stack
    setRedoStack([]);

    const historyLength = game.history().length;

    // if opening still has moves && incorrect move made
    if (
      opening.value[historyLength - 1] !== undefined &&
      (sourceSquare !== opening.value[historyLength - 1].from || targetSquare !== opening.value[historyLength - 1].to)
    ) {
      handleOpeningError(sourceSquare, targetSquare, historyLength);
      return false;
    }

    // correct move made
    playSound();
    setMoveSquares({
      [sourceSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
      [targetSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
    });

    // if there are more moves in the opening, continue
    if (opening.value[historyLength] !== undefined) {
      makeComputerMove(opening.value[historyLength].from, opening.value[historyLength].to);
    } else {
      // opening completed
      setOpeningComplete(true);
      setCombinedSquares({});
      // play end sound to notify end of opening has been reached
      if (pathname !== '/train' && historyLength === opening.value.length) playSound('end');
    }
    return true;
  }

  // move made was valid but not in opening
  function handleOpeningError(sourceSquare, targetSquare, historyLength) {
    // undo move just made
    safeGameMutate((game) => {
      game.undo();
    });

    // play error sound
    moveSounds.error.play();

    // inform side panel of opening error
    setOpeningError(true);

    // set square styles
    setOptionSquares({});
    // set error squares
    setMoveSquares({
      [sourceSquare]: { backgroundColor: 'rgba(255, 0, 0, 0.4)' },
      [targetSquare]: { backgroundColor: 'rgba(255, 0, 0, 0.4)' }
    });
    // after 1 second, show the prior move made
    if (pathname.includes('/learn') || pathname.includes('/traps')) {
      setTimeout(() => {
        setMoveSquares({
          [opening.value[historyLength - 1].from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
          [opening.value[historyLength - 1].to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
        });
        // TODO: Check if this line affects Train, added to prevent combinedSquares after error move
        setOpeningError(false);
        // clear any premoves
        chessboardRef.current.clearPremoves();
      }, 1000);
    }
  }

  // make computer move in next move of opening
  function makeComputerMove(from, to) {
    const newTimeout = setTimeout(
      () => {
        // make move
        safeGameMutate((game) => {
          game.move({ from, to });
        });

        setTimeout(
          () => {
            playSound();
          },
          animationsOn.value ? 250 : 50 // setting a little shorter than animation duration for better effect
        );

        // show move made
        setMoveSquares({
          [from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
          [to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
        });

        // identify if opening complete
        if (opening.value[game.history().length] === undefined) {
          setOpeningComplete(true);
          if (pathname !== '/train') {
            setTimeout(
              () => {
                playSound('end');
              },
              animationsOn.value ? 250 : 50
            );
          }
          setCombinedSquares({});
          return;
        }

        // show next move to make
        if (pathname.includes('/learn') || pathname.includes('/traps')) {
          const nextMove = opening.value[game.history().length];
          setMoveSquares({
            [nextMove?.from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' },
            [nextMove?.to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }
          });
        }
      },
      animationsOn.value ? 350 : 100 // Needs to be longer than animation duration (currently set to 300)
    );
    setCurrentTimeout(newTimeout);
  }

  // piece clicked on board by user
  function onSquareClick(square) {
    // clear any right click squares
    setRightClickedSquares({});
    // no opening has been selected yet so prevent anything happening
    if (!opening) return;

    if (!moveFrom && game.get(square)) {
      setMoveFrom(square);
      getMoveOptions(square);
      return;
    }

    // attempt to make move
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: moveFrom,
      to: square,
      promotion: 'q' // always promote to a queen for example simplicity
    });
    setGame(gameCopy);

    if (pathname !== '/contribute' && move !== null) {
      // move was legal, perform opening logic
      makeValidMove(moveFrom, square);
    }
    setMoveFrom('');
    setOptionSquares({});
  }

  function onSquareRightClick(square) {
    // TODO: put all colours in consts.js
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
    if (pathname === '/contribute' || (opening && !moveFrom)) {
      getMoveOptions(square);
    }
  }

  function onMouseOutSquare() {
    if (pathname === '/contribute' || (opening && !moveFrom)) {
      // clear highlighted options if some exist
      if (Object.keys(optionSquares).length !== 0) setOptionSquares({});
    }
  }

  // highlight moves for piece in square
  function getMoveOptions(square) {
    // Don't immediately show options after opening error
    if (openingError) return;
    // get moves
    const moves = game.moves({
      square,
      verbose: true
    });

    // no moves found
    if (moves.length === 0) {
      setOptionSquares({});
      return;
    }

    // moves found, highlight them
    const newSquares = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) && game.get(move.to).color !== game.get(square).color
            ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)' // opponent piece
            : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)', // normal piece/square
        borderRadius: '50%'
      };
      return move;
    });

    // highlight current square
    // newSquares[square] = {
    //   background: 'rgba(255, 255, 0, 0.4)'
    // };
    setOptionSquares(newSquares);
  }

  return (
    <ChessboardContext.Provider
      value={{
        chessboardRef,
        game,
        moveSounds,
        setMoveSounds,
        redoStack,
        setRedoStack,
        userColor,
        setUserColor,

        opening,
        setOpening,
        openingComplete,
        setOpeningComplete,
        openingError,
        setOpeningError,

        boardOrientation,
        setBoardOrientation,
        moveFrom,
        setMoveFrom,

        squareStyles: {
          ...moveSquares,
          ...optionSquares,
          ...rightClickedSquares,
          ...combinedSquares
        },
        setCombinedSquares,
        setMoveSquares,
        setOptionSquares,
        setRightClickedSquares,

        onMouseOutSquare,
        onMouseOverSquare,
        onPieceDrop,
        onSquareClick,
        onSquareRightClick,
        playSound,
        reset,
        resume,
        safeGameMutate
      }}
    >
      {children}
    </ChessboardContext.Provider>
  );
};
