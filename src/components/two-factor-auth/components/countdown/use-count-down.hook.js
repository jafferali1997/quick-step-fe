'use client';

import { useEffect, useState } from 'react';

export default function useCountDown({ minutes, stopTimerHandler, isRunTimer }) {
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(true);

  useEffect(() => {
    setRunTimer(isRunTimer);
  }, [isRunTimer]);

  useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(60 * minutes);
      timerId = setInterval(() => {
        setCountDown((_countDown) => _countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
      stopTimerHandler(true);
    }

    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runTimer]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      console.log('expired');
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  const togglerTimer = () => setRunTimer((t) => !t);

  const seconds = String(countDown % 60).padStart(2, 0);
  const remainingMinutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  return { seconds, remainingMinutes };
}
