'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(sectionRef.current && imageRef.current && stepsRef.current) {
      const section = sectionRef.current;
      const image = imageRef.current;
      const steps = stepsRef.current.children;

      gsap.fromTo(
        image,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        steps,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      );
    }
  }, []);

  const stepsData = [
    {
      title: 'Watch a video',
      description: 'Our videos are short, engaging, and easy to follow.',
    },
    {
      title: 'Practice with flashcards',
      description: 'Reinforce what youve learned with our smart flashcards.',
    },
    {
      title: 'Track your progress',
      description: 'Stay motivated by tracking your progress and achievements.',
    },
  ];

  return (
    <section className="py-20" ref={sectionRef}>
      <div className="container mx-auto grid grid-cols-1 items-center gap-16 md:grid-cols-2">
        <div className="rounded-2xl bg-gray-800 p-8">
          <div className="h-[400px] w-full rounded-lg bg-gray-900" ref={imageRef} />
        </div>
        <div ref={stepsRef}>
          <h2 className="text-4xl font-bold">How it works</h2>
          <div className="mt-8 space-y-8">
            {stepsData.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-2xl font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
