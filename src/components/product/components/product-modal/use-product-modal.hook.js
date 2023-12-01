'use client';

import { useEffect, useState } from 'react';

export default function useProductModal(data) {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue([...data]);
  }, [data]);

  const handleSetValue = (indexToChange, valueToSet) => {
    setValue([
      ...value.map((item, index) => {
        if (index === indexToChange) {
          return { ...item, value: valueToSet };
        }
        return item;
      })
    ]);
  };

  return { value, handleSetValue, setValue };
}
