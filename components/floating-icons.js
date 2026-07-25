'use client';
import { useState, useEffect } from 'react';

const icons = [
  { icon: '🇲🇽', name: 'Mexico' },
  { icon: '🇪🇸', name: 'Spain' },
  { icon: '🇦🇷', name: 'Argentina' },
  { icon: '🇨🇴', name: 'Colombia' },
  { icon: '🇨🇱', name: 'Chile' },
  { icon: '🇵🇪', name: 'Peru' },
  { icon: '🇻🇪', name: 'Venezuela' },
  { icon: '🇪🇨', name: 'Ecuador' },
  { icon: '🇬🇹', name: 'Guatemala' },
  { icon: '🇨🇺', name: 'Cuba' },
];

export default function FloatingIcons() {
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    setStyles(
      icons.map(() => ({
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
        fontSize: `${Math.random() * 2 + 1.5}rem`,
        transform: `rotate(${Math.random() * 60 - 30}deg)`,
      }))
    );
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
      {icons.map((item, i) => (
        <div
          key={i}
          className="absolute p-2 bg-white rounded-xl shadow-lg transform-gpu transition-transform duration-500 hover:scale-110"
          style={styles[i]}
        >
          <span className="text-4xl">{item.icon}</span>
        </div>
      ))}
    </div>
  );
}
