import { useState, useLayoutEffect } from 'react';
import debounce from 'lodash/debounce';

function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  function handleResize() {
    setSize([window.innerWidth, window.innerHeight]);
  }

  useLayoutEffect(() => {
    // So it doesnt get called every pixel changed
    const debouncedResize = debounce(handleResize, 100);

    window.addEventListener('resize', debouncedResize);

    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  return size;
}

export default useWindowSize;
