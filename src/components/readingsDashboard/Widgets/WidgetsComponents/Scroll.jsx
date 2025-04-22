import { React, useRef, useEffect } from 'react';

import { arrowIcon } from 'src/assets';

const Scroll = ({ children }) => {
  const scrollSpeed = 3;

  const scrollRef = useRef(null);
  const scrollDirection = useRef(null);
  const animationRef = useRef(null);

  const smoothScroll = () => {
    if (scrollRef.current && scrollDirection.current) {
      scrollRef.current.scrollLeft += scrollDirection.current === 'right' ? scrollSpeed : -scrollSpeed;
      animationRef.current = requestAnimationFrame(smoothScroll);
    }
  };

  const startScroll = (direction) => {
    scrollDirection.current = direction;
    animationRef.current = requestAnimationFrame(smoothScroll);
  };

  const stopScroll = () => {
    scrollDirection.current = null;
    cancelAnimationFrame(animationRef.current);
  };

  useEffect(
    () => () => cancelAnimationFrame(animationRef.current), // Cleanup on unmount
    [],
  );

  return (
    <div className="relative flex h-[78%] w-full">
      <img
        src={arrowIcon}
        alt="left graph scroll"
        className="mr-1 hidden h-[56px] w-[28px] self-center rounded-lg hover:bg-graydetails sm:flex"
        onMouseEnter={() => startScroll('left')}
        onMouseLeave={stopScroll}
      />

      <div
        ref={scrollRef}
        className="flex overflow-auto scroll-smooth whitespace-nowrap sm:hide-scrollbar"
        style={{ maxWidth: '100%' }}
      >
        {children}
      </div>

      <img
        src={arrowIcon}
        alt="right graph scroll"
        className="ml-1 hidden h-[56px] w-[28px] rotate-180 self-center rounded-lg hover:bg-graydetails sm:flex"
        onMouseEnter={() => startScroll('right')}
        onMouseLeave={stopScroll}
      />
    </div>
  );
};

export default Scroll;
