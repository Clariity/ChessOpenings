import { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

import { playArrow, replayArrow, shuffle } from '../../data/icons';
import { useChessboard } from '../../context/board-context';
import { Button } from '../utils/Button';
import { SVG } from '../utils/SVG';

export function TrainButtons({
  canRetry,
  handleRetryFailed,
  handleTrainShuffle,
  handleTrainStart,
  handleTrainStop,
  openingsFailed,
  selectedOpenings
}) {
  const { opening } = useChessboard();

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [canRetry, opening]);

  return (
    <div className="flex">
      <ReactTooltip id="panel-buttons" place="top" effect="solid" backgroundColor="black" />
      {opening ? (
        <div className="w-full mx-2">
          <Button fill onClick={handleTrainStop}>
            Quit
          </Button>
        </div>
      ) : canRetry ? (
        <TrainRetryButtons
          handleRetryFailed={handleRetryFailed}
          handleTrainStart={handleTrainStart}
          openingsFailed={openingsFailed}
        />
      ) : (
        <TrainStartButtons
          handleTrainShuffle={handleTrainShuffle}
          handleTrainStart={handleTrainStart}
          selectedOpenings={selectedOpenings}
        />
      )}
    </div>
  );
}

function TrainStartButtons({ handleTrainShuffle, handleTrainStart, selectedOpenings }) {
  const startDisabled = selectedOpenings.length === 0;

  return (
    <>
      <div className="w-full mx-2" data-tip="Shuffle & Start" data-for="panel-buttons">
        <Button disabled={startDisabled} fill onClick={handleTrainShuffle}>
          <SVG icon={shuffle} size={24} />
        </Button>
      </div>
      <div className="w-full mx-2" data-tip="Start" data-for="panel-buttons">
        <Button data-tip="Start" data-for="panel-buttons" disabled={startDisabled} fill onClick={handleTrainStart}>
          <SVG icon={playArrow} size={24} />
        </Button>
      </div>
    </>
  );
}

function TrainRetryButtons({ handleRetryFailed, handleTrainStart, openingsFailed }) {
  return (
    <>
      <div className="w-full mx-2" data-tip="Retry Failed" data-for="panel-buttons">
        <Button disabled={openingsFailed.length === 0} fill onClick={handleRetryFailed}>
          <SVG icon={replayArrow} size={24} />
          Failed
        </Button>
      </div>

      <div className="w-full mx-2" data-tip="Retry All" data-for="panel-buttons">
        <Button fill onClick={handleTrainStart}>
          <SVG icon={replayArrow} size={24} />
          All
        </Button>
      </div>
    </>
  );
}
