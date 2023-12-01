'use client';

import { useEffect, useRef, useState } from 'react';

export default function useProductGroup() {
  const [threeDot, setThreeDot] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setThreeDot(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  const handleThreeMenu = () => {
    setThreeDot(!threeDot);
  };

  return { threeDot, ref, handleThreeMenu };
}
