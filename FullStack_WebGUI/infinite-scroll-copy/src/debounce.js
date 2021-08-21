import React, { useState, useEffect } from 'react';

// Our hook
export default function useDebounce(data, milliseconds_time) {
  const [debouncer, setDebouncer] = useState(data);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncer(data);
      }, milliseconds_time);
      return () => {
        clearTimeout(handler);
      };
    },
    [data] 
  );

  return debouncer;
}