import { trainFilled } from '../../data/icons';
import { TROPHY_COLOURS } from '../../data/consts';

export function ProgressCircle({ progress, showMastery, strokeWidth, text, width }) {
  const RADIUS = (width - strokeWidth) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const DASH = (progress * CIRCUMFERENCE) / 100;
  const DEFAULT_COLOUR = '#b58863';
  const TEXT_SIZE = width / 6;
  const TROPHY_INDEX = Math.floor(progress / 10);
  const TROPHY_NAME = Object.entries(TROPHY_COLOURS)[TROPHY_INDEX][0];
  const TROPHY = Object.entries(TROPHY_COLOURS)[TROPHY_INDEX][1];

  return (
    <svg height={width} width={width} viewBox={`0 0 ${width} ${width}`}>
      <circle fill="none" strokeWidth={strokeWidth} cx={width / 2} cy={width / 2} r={RADIUS} />
      <circle
        className="transition-all duration-1000"
        fill="none"
        stroke={showMastery ? TROPHY.colour : DEFAULT_COLOUR}
        strokeWidth={strokeWidth}
        cx={width / 2}
        cy={width / 2}
        r={RADIUS}
        transform={`rotate(-90 ${width / 2}  ${width / 2})`}
        strokeDasharray={[DASH, CIRCUMFERENCE - DASH]}
        strokeLinecap="round"
      />
      <svg
        fill={showMastery ? TROPHY.colour : DEFAULT_COLOUR}
        className="h-full mr-4"
        xmlns="http://www.w3.org/2000/svg"
        x={width / 2 - width / 6}
        y={width / 2 - width / 3}
        width={width / 3}
        height={width / 3}
        viewBox="0 0 24 24"
      >
        {trainFilled}
      </svg>
      <text fill={TROPHY.colour} fontSize={TEXT_SIZE} x={width / 2} y={width / 2 + width / 5} textAnchor="middle">
        {text}
      </text>
      {showMastery && (
        <text fill={TROPHY.colour} fontSize={TEXT_SIZE / 2} x={width / 2} y={width / 2 + width / 3} textAnchor="middle">
          {TROPHY_NAME}
        </text>
      )}
    </svg>
  );
}
