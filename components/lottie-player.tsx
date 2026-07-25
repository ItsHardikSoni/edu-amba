'use client';

import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LottiePlayerProps {
  src: string;
  background?: string;
  speed?: number;
  style?: React.CSSProperties;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({ src, background, speed, style, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, [src]);

  return <div style={style} ref={ref} {...props} />;
};

export default LottiePlayer;
