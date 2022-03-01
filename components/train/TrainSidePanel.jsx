import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useChessboard } from '../../context/board-context';
import { useData } from '../../context/data-context';
import { SidePanel } from '../chessboard/SidePanel';
import { TrainButtons } from './TrainButtons';
import { TrainDisplay } from './TrainDisplay';
import { TrainSelectOptions } from './TrainSelectOptions';

export function TrainSidePanel() {
  const { opening, openingComplete, openingError, playSound, reset, setOpening, setOpeningComplete, setOpeningError } =
    useChessboard();
  const { openingGroups, loadingError } = useData();
  const {
    pathname,
    query: { openingLink }
  } = useRouter();

  const [selectedOpenings, setSelectedOpenings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openingsCompleted, setOpeningsCompleted] = useState([]);
  const [openingsFailed, setOpeningsFailed] = useState([]);
  const [canRetry, setCanRetry] = useState(false);
  const [canRetryFailed, setCanRetryFailed] = useState(false);

  const handleTrainStart = useCallback(() => {
    setOpeningsCompleted([]);
    setOpeningsFailed([]);
    setOpening(selectedOpenings[0]);
    reset(true);
  }, [reset, selectedOpenings, setOpening]);

  // Scroll panel into view when openings loaded
  useEffect(() => {
    if (openingGroups) {
      document.getElementById('panel-title')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [openingGroups, pathname]);

  // Scroll chessboard into view when train is started
  useEffect(() => {
    if (opening) {
      document.getElementById('board').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [opening]);

  // Act on opening complete
  useEffect(() => {
    if (openingComplete) {
      // update completed openings
      const newCompleted = [...openingsCompleted];
      newCompleted.push({ ...opening });
      setOpeningsCompleted(newCompleted);

      // setup next opening
      setOpeningComplete(false);
      setCurrentIndex((oldIndex) => oldIndex + 1);
    }
  }, [opening, openingComplete, openingsCompleted, setOpeningComplete]);

  // Act on opening error
  useEffect(() => {
    if (openingError) {
      // immediately set to false so effect doesn't run again
      setOpeningError(false);
      // wait so error squares can show
      setTimeout(() => {
        // update failed openings
        const newFailed = [...openingsFailed];
        newFailed.push({ ...opening });
        setOpeningsFailed(newFailed);

        // setup next opening
        setCurrentIndex((oldIndex) => oldIndex + 1);
      }, 500);
    }
  }, [opening, openingError, openingsFailed, setOpeningError]);

  // Get next opening when index changes
  useEffect(() => {
    if (currentIndex > 0) {
      const o = selectedOpenings[currentIndex];
      if (o) {
        setOpening(o);
        reset();
      } else {
        setTimeout(() => {
          handleTrainStop();
        }, 500);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, selectedOpenings, setOpening]);

  // Set opening on load with URL param
  useEffect(() => {
    if (openingGroups && openingLink && !opening) {
      const o = openingGroups.flatMap((o) => o.options).filter((o) => o.label === openingLink)[0];
      setOpening(o);
    }
  }, [opening, openingLink, openingGroups, setOpening]);

  // retry failed openings only after selected openings have been set to be the failed openings
  useEffect(() => {
    if (canRetryFailed) {
      handleTrainStart();
      setCanRetryFailed(false);
    }
  }, [canRetryFailed, handleTrainStart, selectedOpenings]);

  function handleTrainStop() {
    setOpening();
    setCanRetry(openingsCompleted.length + openingsFailed.length > 0);
    setCurrentIndex(0);
    playSound('end');
  }

  function handleRetryFailed() {
    setSelectedOpenings([...openingsFailed]);
    setCanRetryFailed(true);
  }

  function handleTrainShuffle() {
    const shuffledOpenings = selectedOpenings.sort(() => (Math.random() < 0.5 ? 1 : -1));
    setSelectedOpenings([...shuffledOpenings]);
    handleTrainStart();
  }

  if (loadingError) {
    return <div>Error</div>;
  }

  return (
    <SidePanel showBoardControls={false} title="Train Openings">
      {!opening && (
        <>
          <TrainSelectOptions
            selectedOpenings={selectedOpenings}
            setCanRetry={setCanRetry}
            setSelectedOpenings={setSelectedOpenings}
          />
        </>
      )}
      <TrainDisplay
        selectedOpenings={selectedOpenings}
        opening={opening}
        openingsCompleted={openingsCompleted}
        openingsFailed={openingsFailed}
      />
      <TrainButtons
        canRetry={canRetry}
        handleRetryFailed={handleRetryFailed}
        handleTrainShuffle={handleTrainShuffle}
        handleTrainStart={handleTrainStart}
        handleTrainStop={handleTrainStop}
        openingsFailed={openingsFailed}
        selectedOpenings={selectedOpenings}
      />
    </SidePanel>
  );
}
