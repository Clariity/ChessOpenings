import { useEffect, useState } from 'react';
import { getGradeData } from './helpers';
import { OPENING_GRADES } from '../data/consts';
import { useData } from '../context/data-context';

export function useChessboardSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [chessboardSize, setChessboardSize] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      const display = document.getElementById('board');
      setChessboardSize(display?.offsetWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return { chessboardSize };
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(undefined);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return { windowSize };
}

export function useStats({ stats }) {
  const { openingGroups } = useData();

  const openingStats = stats?.openings || {};
  const trainStats = Object.entries(openingStats)
    .reduce((acc, [opening, data]) => {
      if (data.blackAttempts > 0) {
        const { gradeAchievedIndex, distanceToNextGrade } = getGradeData(data.blackSuccesses);
        acc.push({
          opening,
          blackAttempts: data.blackAttempts,
          distanceToNextGrade,
          gradeAchievedIndex,
          blackSuccesses: data.blackSuccesses
        });
      }
      if (data.whiteAttempts > 0) {
        const { gradeAchievedIndex, distanceToNextGrade } = getGradeData(data.whiteSuccesses);
        acc.push({
          opening,
          whiteAttempts: data.whiteAttempts,
          gradeAchievedIndex,
          distanceToNextGrade,
          whiteSuccesses: data.whiteSuccesses
        });
      }
      return acc;
    }, [])
    .sort((a, b) => {
      if (a.distanceToNextGrade < b.distanceToNextGrade) return -1;
      if (a.distanceToNextGrade > b.distanceToNextGrade) return 1;
      // if hitting this point then they are equidistant and need 2nd comparison factor
      if (a.gradeAchievedIndex > b.gradeAchievedIndex) return -1;
      return 1;
    });

  const openingVariationsMastered =
    trainStats.filter((o) => o.gradeAchievedIndex === Object.keys(OPENING_GRADES).length - 1) || [];
  const noOfOpeningVariationsMastered = openingVariationsMastered.length;

  const openingsMastered =
    openingGroups?.filter(
      (o) => o.options.length === openingVariationsMastered.filter((m) => m.opening.split(':')[0] === o.label).length
    ) || [];
  const noOfOpeningsMastered = openingsMastered.length;

  const noOfVariationsAttempted = trainStats?.length || 0;
  const noOfVariationsPassed =
    trainStats?.filter((o) => (o.whiteSuccesses || 0) + (o.blackSuccesses || 0) > 0).length || 0;

  const noOfOpenings = openingGroups?.length || 1;
  const noOfVariations = openingGroups?.reduce((acc, current) => acc + current.options.length, 0) || 1;

  return {
    noOfOpenings,
    noOfOpeningsMastered,
    noOfOpeningVariationsMastered,
    noOfVariations,
    noOfVariationsAttempted,
    noOfVariationsPassed,
    trainStats
  };
}
