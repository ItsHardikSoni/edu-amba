
import FloatingIcons from './floating-icons';

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 via-white to-orange-50 overflow-hidden">
      <FloatingIcons />
      <div className="relative z-10 text-center px-4">
        <div className="flex items-center justify-center mb-4">
          <div className="flex -space-x-2 mr-2">
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
          </div>
          <span className="text-sm font-semibold text-gray-500">Trusted by over 440k+ learners</span>
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
        
      </div>
      <div className="absolute bottom-40 right-10 md:right-20 lg:right-40">
        {/* <div className="relative bg-white p-4 rounded-full shadow-lg">
          <span className="text-2xl text-gray-700">Hola</span>
          <div className="absolute top-full right-1/2 transform translate-x-1/2 w-0 h-0 border-t-8 border-t-white border-l-8 border-l-transparent border-r-8 border-r-transparent"></div>
        </div> */}
      </div>
       <div className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
        <img src="https://i.ibb.co/L888Yp8/RDT-20240723-1801261372551493630283087-01-01.png" alt="Parrot" className="w-full h-full object-contain" />
      </div>
    </section>
  );
}
