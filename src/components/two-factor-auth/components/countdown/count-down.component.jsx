'use client';

import PropTypes from 'prop-types';
import useCountDown from './use-count-down.hook';

export default function CountDown({ minutes = 2, stopTimerHandler, isRunTimer = true }) {
  const { seconds, remainingMinutes } = useCountDown({
    minutes,
    stopTimerHandler,
    isRunTimer
  });
  return (
    <p className='tw-text-[12px] tw-font-medium tw-leading-[18px] tw-text-[#46474F]'>
      Time left: {remainingMinutes}:{seconds}
      {/* <button type="button" onClick={togglerTimer}>
        {runTimer ? 'Stop' : 'Start'}
      </button> */}
    </p>
  );
}

CountDown.propTypes = {
  minutes: PropTypes.number,
  stopTimerHandler: PropTypes.func.isRequired,
  isRunTimer: PropTypes.bool.isRequired
};
