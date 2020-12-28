import { useEffect } from 'react';

export const useDebounce = (callback, delay) => {
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        callback();
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [callback, delay], // Only re-call effect if value or delay changes
  );
};
