'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  title: string;
  description: string;
  icon: string;
}

export default function FeatureCards() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardsRef.current) {
      const cards = cardsRef.current.children;

      gsap.fromTo(
        cards,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      );
    }
  }, []);

  const cardData: CardData[] = [
    {
      title: 'Bite-sized videos',
      description: 'Learn in 2-5 minute videos that fit into your busy schedule.',
      icon: '🎬',
    },
    {
      title: 'Real-world phrases',
      description: 'Learn phrases youll actually use in conversation.',
      icon: '🗣️',
    },
    {
      title: 'Smart repetition',
      description: 'Our algorithm ensures you never forget what youve learned.',
      icon: '🧠',
    },
    {
      title: 'Fun & engaging',
      description: 'Learning a language has never been more enjoyable.',
      icon: '🎉',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4" ref={cardsRef}>
        {cardData.map((card, i) => (
          <div key={i} className="rounded-2xl bg-gray-800 p-8">
            <div className="text-4xl">{card.icon}</div>
            <h3 className="mt-4 text-2xl font-bold">{card.title}</h3>
            <p className="mt-2 text-gray-400">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
