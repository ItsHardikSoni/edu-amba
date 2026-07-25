import FloatingIcons from './floating-icons';
import LottieAnimation from './LottieAnimation';

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 via-white to-orange-50 overflow-hidden pt-30">
      <FloatingIcons />
      <div className="relative z-0 text-center px-4">
        <div className="flex items-center justify-center mb-4">
          <div className="flex -space-x-2 mr-2">
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          </div>
          <p className="text-sm text-gray-600">
            Join <span className="font-bold">2,000+</span> students
          </p>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Learn{' '}
          <span className="inline-block bg-orange-400 px-4 rounded-lg text-white">
            Spanish
          </span>
          <br />
          by scrolling smarter
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-md mx-auto">
          Parrot makes language learning feel like your favorite feed — quick
          videos, real phrases, and bite-sized practice every day.
        </p>
        {/* <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" className="text-lg">Get Started</Button>
          <Button size="lg" variant="outline" className="text-lg">
            Learn More
          </Button>
        </div> */}
      </div>
      <div className=" md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[400px]">
        <LottieAnimation />
      </div>
    </section>
  );
}
