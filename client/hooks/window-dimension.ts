import { useEffect, useState } from 'react';
// from https://dev.to/adrien/creating-a-custom-react-hook-to-get-the-window-s-dimensions-in-next-js-135k
type WindowDimentions = {
  width: number | undefined;
  height: number | undefined;
};

const useWindowDimensions = (): WindowDimentions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowDimensions;
};

export default useWindowDimensions;
