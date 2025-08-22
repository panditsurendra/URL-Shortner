// import React from 'react'

// export const Notfound = () => {
//   return (
//     <div>
//         <h1 className="text-4xl font-bold text-center mt-20">404 - Page Not Found</h1>
//     </div>
//   )
// }


import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation
import frog from '../../assets/frog.png'; 

export const Notfound = () => {
  return (
    <div className="bg-[#0c0a1a] font-['Space_Grotesk'] min-h-screen flex flex-col justify-center items-center text-white overflow-hidden relative">
      {/* Starry Background */}
      <div className="absolute top-0 left-0 w-full h-full stars z-0"></div>

      <div className="container relative z-10 flex items-center justify-center flex-wrap gap-16 px-8">
        {/* Astronaut Image */}
        <div className="w-64">
          <img 
            src={frog} 
            alt="Floating frog" 
            className="animate-float" 
          />
        </div>

        {/* Text Content */}
        <div className="text-center md:text-left max-w-md">
          <h1 className="text-6xl md:text-7xl font-bold text-[#8a63d2] [text-shadow:_0_0_10px_#8a63d2]">
            404
          </h1>
          <p className="text-2xl md:text-3xl font-bold mt-2 mb-4">
            Houston, we have a problem.
          </p>
          <p className="text-lg text-gray-300 mb-8">
            It looks like you've drifted off the map. Let's get you back on course.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#8a63d2] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#724bb9] transition-transform duration-300 hover:scale-105"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
