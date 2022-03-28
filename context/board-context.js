import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Chess from 'chess.js';
import { useRouter } from 'next/router';

import { defaultOpeningStats, start } from '../data/consts';
import { useData } from './data-context';
import { useSettings } from './settings-context';

export const ChessboardContext = createContext();

/**
 * LONG TERM BIG
 * - add lichess opening explorer
 * - auto increment version on merge with GitHub actions
 * - update sitemap dynamically (pre commit hook to run a sitemap script?)
 * - change fetch requests to use a useFetch wrapper
 * - loadingError component, utilise loading error and show it where needed
 * - store own custom openings/traps/mistakes to practise (public/private) --> call it repertoires
 * - navbar overhaul with all the added content (Learn section, show links to top 3 openings i.e Learn The Italian Game)
 * - help page overhaul - add 'what is this' question mark to things to reference to help page, or just use tooltips (click for more?)
 * - admin overhaul (admin ban profile - needs to be on own admin section of the site (which all needs a complete overhaul, needs section to easily edit openings etc too rather than having to find it in firebase, section to view and edit users/their stats)))
 * - users can upload own themes/pieces
 * - users can change background on their profile/the site
 * - mistakes
 * - copy and update submissions to allow easy move change and small alternate lines
 * - create submissions from existing line
 * - Verified accounts in case of famous usernames
 * - UserData changing needs to be moved to backend for security
 * - only get openings/traps when we need them (get less data at once instead of front loading)
 * - Lighthouse optimizations
 *
 * LONG TERM SMALL
 * - fine grain sound options -> move sounds, sound on start/end
 * - fine grain piece moving options
 * - shorten all sounds to smallest size to play better on lower end devices
 * - use dev channel for localhost on discord
 * - change favicon to new icon colour
 * - on contribute page, clearly define differences between traps and mistakes etc
 * - placeholder for when images are loading in -> next/image blur on load etc
 * - show password option when signing in/registering
 * - bug reporting channel on discord + revamp
 * - board display size setting (s, m, l - as its quite big by default)
 * - change components to named imports
 * - moving to sign in page needs to give a redirect link to go right back
 * - separate pieces and board colour themes
 * - admin submissions need to fetch updated values on change, currently a copy is passed
 * - hold down arrows to move faster
 * - send new users discord notification
 * - clicking sign in button should remember where you were when you clicked it and use it as redirect
 * - users page (searching other users by name or uid etc)
 * - follow/unfollow user - say its just for easily finding users so you don't have to search for them, view their contributions/repertoires
 * - on each opening in learn, show completion percentage towards next achievement as percentage of bar filled
 * - if user email isn't verified then don't let them do user things until it is (changing name and profile)
 * - save a training set of openings, so you don't have to select them all again when you come back tomorrow
 * */

/**
 * GENERAL
 * - user agreement
 * - privacy policy (remember to update cookie warning)
 *
 * LEARN
 * - need to make it clearer that you need to click on an opening variation for it to start
 *
 * USER
 * - report profile for bad image/name,
 * - disallow uploading bad image
 * - uploading photo needs server side checks
 * - Need to warn users they are not logged in so they don't waste stats playing when they forgot they were logged out (dismissable, and lay over the top, like a lil corner notification)
 * - Need a loadingUserData flag from userData so we know if we don't have userData or if we are simply waiting for it to be downloaded (replace all userData?.x)
 * - Pay attention to stats being for Openings OR Variations
 * - updating display name needs to update all submissions for that user
 *
 * SETTINGS
 * - display move options
 *
 * BUGS
 * - if you complete opening (openingComplete set) and go back, combined squares will no longer be set --> need to setOpeningComplete to false if go back into opening
 * - hovering over piece as computer moves, causes option squares not to show (due to no moves being legal whilst waiting for CPU)
 * - Piece moving sound isn't playing on Firefox
 * - Using arrows on submissions page when focused on input should't progress moves
 * - MUST enforce that opening name + variation for both openings and traps is unique
 * - update opening images as they are the wrong positions
 * - sort white colours css
 * - moving along Train openings too fast will bug out
 * - user can keep "completing" learn by going back 1 move and hitting resume
 * - removing cookies after signing out/deleting account
 */

export const useChessboard = () => useContext(ChessboardContext);

export const ChessboardProvider = ({ children }) => {
  const chessboardRef = useRef();
  const { pathname } = useRouter();
  const { updateUserData, user, userData } = useData();
  const { animationsOn, soundsOn } = useSettings();

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
  const [showHints, setShowHints] = useState(true);

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
    setMoveSounds({
      move: soundsOn?.value ? new Audio(`/media/themes/default/move.mp3`) : { play: () => null },
      capture: soundsOn?.value ? new Audio(`/media/themes/default/capture.mp3`) : { play: () => null },
      check: soundsOn?.value ? new Audio(`/media/themes/default/check.mp3`) : { play: () => null },
      castle: soundsOn?.value ? new Audio(`/media/themes/default/castle.mp3`) : { play: () => null },
      error: soundsOn?.value ? new Audio(`/media/themes/default/error.mp3`) : { play: () => null },
      start: soundsOn?.value ? new Audio(`/media/themes/default/start.mp3`) : { play: () => null },
      end: soundsOn?.value ? new Audio(`/media/themes/default/end.mp3`) : { play: () => null }
    });
  }, [soundsOn]);

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
              ? 'radial-gradient(circle, rgba(255, 255, 0, .8) 85%, transparent 85%)'
              : 'radial-gradient(circle, rgba(255, 255, 0, .8) 25%, transparent 25%)',
          borderRadius: '50%'
        };
      }
    });

    // only highlight combined squares if opening is not complete
    if (!openingComplete && showHints) {
      setCombinedSquares(newCombinedSquares);
    }
  }, [optionSquares, moveSquares, openingComplete, game, moveFrom, showHints]);

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
        [opening.value[0].from]: { backgroundColor: 'rgba(255, 255, 0, 0.8)' },
        [opening.value[0].to]: { backgroundColor: 'rgba(255, 255, 0, 0.8)' }
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
        [nextMove?.from]: { backgroundColor: 'rgba(255, 255, 0, 0.8)' },
        [nextMove?.to]: { backgroundColor: 'rgba(255, 255, 0, 0.8)' }
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

  // handle opening completion stats
  function handleOpeningComplete() {
    setOpeningComplete(true);
    if (userData) {
      const currentOpeningStats = userData.stats?.openings?.[opening.label];
      const updateFields = pathname.includes('/train')
        ? {
            [`${userColor}Attempts`]: currentOpeningStats?.[`${userColor}Attempts`] + 1 || 1,
            [`${userColor}Successes`]: currentOpeningStats?.[`${userColor}Successes`] + 1 || 1
          }
        : {
            [`${userColor}Learns`]: currentOpeningStats?.[`${userColor}Learns`] + 1 || 1
          };

      let newOpeningStats = {};
      if (currentOpeningStats) {
        newOpeningStats = {
          ...currentOpeningStats,
          ...updateFields
        };
      } else {
        newOpeningStats = {
          ...defaultOpeningStats,
          ...updateFields
        };
      }

      updateUserData(
        {
          ...userData,
          stats: {
            ...userData.stats,
            openings: {
              ...userData.stats.openings,
              [opening.label]: newOpeningStats
            }
          }
        },
        user
      );
    }
  }

  // handle opening failure stats
  function handleOpeningFailure() {
    setOpeningError(true);
    if (userData && pathname.includes('/train')) {
      const currentOpeningStats = userData.stats?.openings?.[opening.label];
      const updateFields = {
        [`${userColor}Attempts`]: currentOpeningStats?.[`${userColor}Attempts`] + 1 || 1
      };

      let newOpeningStats = {};
      if (currentOpeningStats) {
        newOpeningStats = {
          ...currentOpeningStats,
          ...updateFields
        };
      } else {
        newOpeningStats = {
          ...defaultOpeningStats,
          ...updateFields
        };
      }

      updateUserData(
        {
          ...userData,
          stats: {
            ...userData.stats,
            openings: {
              ...userData.stats.openings,
              [opening.label]: newOpeningStats
            }
          }
        },
        user
      );
    }
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
        [sourceSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.8)' },
        [targetSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.8)' }
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
      [sourceSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.8)' },
      [targetSquare]: { backgroundColor: 'rgba(255, 255, 0, 0.8)' }
    });

    // if there are more moves in the opening, continue
    if (opening.value[historyLength] !== undefined) {
      makeComputerMove(opening.value[historyLength].from, opening.value[historyLength].to);
    } else {
      // opening completed
      handleOpeningComplete();
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

    // inform side panel of opening error and update stats
    handleOpeningFailure();

    // set square styles
    setOptionSquares({});
    // set error squares
    setMoveSquares({
      [sourceSquare]: { backgroundColor: 'rgba(255, 0, 0, 0.8)' },
      [targetSquare]: { backgroundColor: 'rgba(255, 0, 0, 0.8)' }
    });
    // after 1 second, show the prior move made
    if (pathname.includes('/learn') || pathname.includes('/traps')) {
      setTimeout(() => {
        setMoveSquares({
          [opening.value[historyLength - 1].from]: { backgroundColor: 'rgba(255, 255, 0, 0.8)' },
          [opening.value[historyLength - 1].to]: { backgroundColor: 'rgba(255, 255, 0, 0.8)' }
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
          [from]: { backgroundColor: 'rgba(255, 255, 0, 0.8)' },
          [to]: { backgroundColor: 'rgba(255, 255, 0, 0.8)' }
        });

        // identify if opening complete
        if (opening.value[game.history().length] === undefined) {
          handleOpeningComplete();
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
            [nextMove?.from]: { backgroundColor: 'rgba(255, 255, 0, 0.8)' },
            [nextMove?.to]: { backgroundColor: 'rgba(255, 255, 0, 0.8)' }
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
    const colour = 'rgba(0, 0, 255, 0.8)';
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
    //   background: 'rgba(255, 255, 0, 0.8)'
    // };
    setOptionSquares(newSquares);
  }

  function loadGame(fen) {
    game.load(fen);
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
        showHints,
        setShowHints,

        squareStyles: {
          ...(showHints && moveSquares),
          ...optionSquares,
          ...rightClickedSquares,
          ...combinedSquares
        },
        setCombinedSquares,
        setMoveSquares,
        setOptionSquares,
        setRightClickedSquares,

        loadGame,
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
