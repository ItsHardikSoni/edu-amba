'use client';

import { lazy, useEffect, useRef } from 'react';

const LottiePlayer = ({ src, background, speed, style, ...props }) => {
  const ref = useRef(null);

  useEffect(() => {
    async function loadLottie() {
      if (typeof window !== 'undefined') {
        const { default: lottie } = await import('lottie-web');
        if (ref.current) {
          const animation = lottie.loadAnimation({
            container: ref.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: src,
          });
          return () => animation.destroy();
        }
      }
    }
    loadLottie();
  }, [src]);

  return <div style={style} ref={ref} {...props} />;
};

export default LottiePlayer;
