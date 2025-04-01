
import { useState, useCallback } from 'react';

// Extended auth hook for points system
export const useAuthExtended = () => {
  const [userPoints, setUserPoints] = useState<number>(0);

  const updateUserPoints = useCallback((pointsToAdd: number) => {
    setUserPoints(currentPoints => {
      const newPoints = currentPoints + pointsToAdd;
      // Save to localStorage for persistence
      localStorage.setItem('userPoints', newPoints.toString());
      return newPoints;
    });
  }, []);

  const initializePoints = useCallback(() => {
    const savedPoints = localStorage.getItem('userPoints');
    if (savedPoints) {
      setUserPoints(parseInt(savedPoints, 10));
    }
  }, []);

  return {
    userPoints,
    updateUserPoints,
    initializePoints
  };
};

export default useAuthExtended;
