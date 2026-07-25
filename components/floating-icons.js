'use client';

const icons = [
  { icon: '🔤', name: 'English' },
  { icon: '🕉️', name: 'Hindi' },
  { icon: '🔢', name: 'Maths' },
  { icon: '🔬', name: 'Science' },
  { icon: '🇮🇳', name: 'India' },
  { icon: '📚', name: 'Books' },
  { icon: '🎨', name: 'Art' },
  { icon: '⚽', name: 'Sports' },
];
const iconStyles = [
  // Left side
  { top: '20%', left: '20%', transform: 'rotate(-15deg)', fontSize: '2.5rem' },
  { top: '40%', left: '10%', transform: 'rotate(10deg)', fontSize: '3rem' },
  { top: '55%', left: '25%', transform: 'rotate(15deg)', fontSize: '2.8rem' },
  { top: '70%', left: '15%', transform: 'rotate(-5deg)', fontSize: '3.2rem' },
  // Right side
  { top: '15%', left: '75%', transform: 'rotate(15deg)', fontSize: '2.7rem' },
  { top: '35%', left: '80%', transform: 'rotate(-10deg)', fontSize: '3.1rem' },
  { top: '55%', left: '70%', transform: 'rotate(5deg)', fontSize: '2.9rem' },
  { top: '75%', left: '85%', transform: 'rotate(-15deg)', fontSize: '3.3rem' },
];

export default function FloatingIcons() {
  
  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden hidden md:block">
      {icons.map((item, i) => (
        <div
          key={i}
          className="absolute p-2 bg-white rounded-xl shadow-lg transform-gpu transition-transform duration-500 hover:scale-110"
          style={iconStyles[i]}
        >
          <span style={{ fontSize: iconStyles[i].fontSize }}>{item.icon}</span>
        </div>
      ))}
    </div>
    );
  }    