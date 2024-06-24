import { useEffect, useState } from 'react';

const MAX_SCREEN_WIDTH = 768;

export const useReSideWindows = () => {
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowControls(window.innerWidth > MAX_SCREEN_WIDTH);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    showControls,
  };
};
