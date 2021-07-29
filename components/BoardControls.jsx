import { useEffect } from 'react';
import { useKeyPress } from '../functions/hooks';

export default function BoardControls({
  backDisabled,
  boardOrientation,
  forwardDisabled,
  goBack,
  goForward,
  reset,
  resetDisabled,
  setBoardOrientation
}) {
  const leftPress = useKeyPress('ArrowLeft');
  const rightPress = useKeyPress('ArrowRight');

  useEffect(() => {
    if (leftPress && !backDisabled) goBack();
    if (rightPress && !forwardDisabled) goForward();
  }, [leftPress, rightPress]);

  return (
    <div className="panel-board-controls flex-row">
      <div className="panel-board-control flex-column hover-dim">
        <button
          className="material-icons panel-board-control-button"
          onClick={() => setBoardOrientation(boardOrientation === 'white' ? 'black' : 'white')}
        >
          cached
        </button>
        Flip
      </div>
      <div className={`panel-board-control flex-column hover-dim ${resetDisabled && 'disabled'}`}>
        <button
          className={`material-icons panel-board-control-button ${resetDisabled && 'disabled'}`}
          disabled={resetDisabled}
          onClick={reset}
        >
          replay
        </button>
        Reset
      </div>
      <div className={`panel-board-control flex-column hover-dim ${backDisabled && 'disabled'}`}>
        <button
          className={`material-icons panel-board-control-button ${backDisabled && 'disabled'}`}
          disabled={backDisabled}
          onClick={goBack}
        >
          chevron_left
        </button>
        Back
      </div>
      <div className={`panel-board-control flex-column hover-dim ${forwardDisabled && 'disabled'}`}>
        <button
          className={`material-icons panel-board-control-button ${forwardDisabled && 'disabled'}`}
          disabled={forwardDisabled}
          onClick={goForward}
        >
          chevron_right
        </button>
        Forward
      </div>
    </div>
  );
}
