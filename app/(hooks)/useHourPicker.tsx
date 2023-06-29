import React, { useState, useRef, useEffect } from 'react';
import { flexCenter, scrollBar } from '@/app/(hooks)/mixin';
import { ArrowDownCircleIcon } from '@heroicons/react/24/solid';

const selectClassName = `px-2 ${scrollBar} outline-none rounded-lg appearance-none`;
const optionClassName = ` hover:bg-sky-200 rounded-lg`;

export function useHourPicker( hour?: string) {

  const [selectedHour, setSelectedHour] = useState<string>(hour ? hour : '00:00');
  const [focusedSelect, setFocusedSelect] = useState<string>('');
  const hours = Array.from({ length: 24 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));
  const minutes = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));

  const hoursSelectRef = useRef<HTMLSelectElement>(null);
  const minutesSelectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        hoursSelectRef.current &&
        !hoursSelectRef.current.contains(event.target as Node) &&
        minutesSelectRef.current &&
        !minutesSelectRef.current.contains(event.target as Node)
      ) {
        setFocusedSelect('');
      }
    }

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleHoursClick(hour: string) {
    setSelectedHour((prev) => hour + prev.slice(2));
    setFocusedSelect('');
  }

  function handleMinutesClick(minute: string) {
    setSelectedHour((prev) => prev.slice(0, 3) + minute);
    setFocusedSelect('');
  }

  const visualHourPicker = (
    <main className={`${flexCenter} gap-1 bg-white rounded-lg text-start`}>
      <div className={`${flexCenter} max-h-4`}>
        <select
          ref={hoursSelectRef}
          onClick={() => setFocusedSelect('hours')}
          className={selectClassName}
          size={focusedSelect === 'hours' ? 5 : 1}
          defaultValue={selectedHour.slice(0, 2)}
        >
          {hours.map((hour) => (
            <option
              key={hour}
              onClick={(e) => {
                e.stopPropagation();
                handleHoursClick(hour);
              }}
              className={optionClassName}
            >
              {hour}
            </option>
          ))}
        </select>
      </div>
      <span className='text-center text-xl'> : </span>
      <div className={`${flexCenter} max-h-4`}>
        <select
          ref={minutesSelectRef}
          onClick={() => setFocusedSelect('minutes')}
          className={`${selectClassName}`}
          size={focusedSelect === 'minutes' ? 5 : 1}
          defaultValue={selectedHour.slice(3)}
        >
          {minutes.map((minute) => (
            <option
              key={minute}
              onClick={(e) => {
                e.stopPropagation();
                handleMinutesClick(minute);
              }}
              className={optionClassName}
            >
              {minute}
            </option>
          ))}
        </select>
      </div>
    </main>
  );

  return {
    visualHourPicker,
    selectedHour,
  };
}