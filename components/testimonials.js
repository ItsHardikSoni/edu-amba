'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const testimonials = testimonialsRef.current.children;

    gsap.fromTo(
      testimonials,
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
          trigger: testimonialsRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      }
    );
  }, []);

  const testimonialData = [
    {
      quote: 'Parrot has completely changed the way I learn languages. I can now learn on the go, whenever I have a spare moment.',
      author: 'John Doe',
      company: 'Google',
    },
    {
      quote: "I've tried countless language learning apps, but Parrot is the only one that has stuck. The bite-sized videos are perfect for my short attention span.",
      author: 'Jane Doe',
      company: 'Facebook',
    },
    {
      quote: 'I love how Parrot focuses on real-world phrases that I can actually use in conversation. Its helped me become more confident in my speaking abilities.',
      author: 'Peter Jones',
      company: 'Amazon',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold">What our users are saying</h2>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3" ref={testimonialsRef}>
          {testimonialData.map((testimonial, i) => (
            <div key={i} className="rounded-2xl bg-gray-800 p-8">
              <p className="text-lg">{testimonial.quote}</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-500" />
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-gray-400">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
