'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const pricingRef = useRef(null);

  useEffect(() => {
    const pricingCards = pricingRef.current.children;

    gsap.fromTo(
      pricingCards,
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: pricingRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      }
    );
  }, []);

  const pricingData = [
    {
      plan: 'Free',
      price: '$0',
      features: ['5 videos per day', 'Limited access to phrases', 'Basic progress tracking'],
      cta: 'Start for free',
    },
    {
      plan: 'Pro',
      price: '$12/mo',
      features: [
        'Unlimited videos',
        'Full access to phrases',
        'Advanced progress tracking',
        'Priority support',
      ],
      cta: 'Go Pro',
    },
    {
      plan: 'Team',
      price: 'Contact us',
      features: [
        'Everything in Pro',
        'Team management',
        'Custom branding',
        'Dedicated account manager',
      ],
      cta: 'Contact sales',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold">Choose your plan</h2>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3" ref={pricingRef}>
          {pricingData.map((pricing, i) => (
            <div key={i} className="rounded-2xl bg-gray-800 p-8">
              <p className="text-2xl font-bold">{pricing.plan}</p>
              <p className="mt-2 text-4xl font-bold">{pricing.price}</p>
              <ul className="mt-8 space-y-4">
                {pricing.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg
                      className="h-6 w-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-8 w-full rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition-transform duration-300 hover:scale-105">
                {pricing.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
