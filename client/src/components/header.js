

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   LogIn,
//   LogOut,
//   UserPlus,
//   Link as LinkIcon,
//   BarChart,
//   FileText,
//   Info
// } from 'lucide-react';

// /**
//  * The application header, which adapts based on user authentication status.
//  * @param {object} props
//  * @param {boolean} props.isAuthenticated - Whether the user is currently logged in.
//  * @param {function} props.onLogout - The function to call when the logout button is clicked.
//  */
// const Header = ({ isAuthenticated, onLogout }) => {
//   const navigate = useNavigate();

//   return (
//     <header className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl mb-8 border border-gray-700 sticky top-4 z-10">
//       <nav className="flex items-center justify-between">
//         {/* Left Side: Brand and Navigation Links */}
//         <div className="flex items-center gap-8">
//           <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
//             <LinkIcon className="text-indigo-400" />
//             <span>Shortify</span>
//           </Link>
          
//           {/* Main navigation links from the first code block */}
//           <div className="hidden md:flex items-center gap-6 text-gray-300">
//             {/* Dashboard link is only shown if the user is authenticated */}
//             {isAuthenticated && (
//               <Link to="/dashboard" className="hover:text-white transition-colors flex items-center gap-2">
//                 <BarChart size={18} />
//                 Dashboard
//               </Link>
//             )}
//             <Link to="/api-docs" className="hover:text-white transition-colors flex items-center gap-2">
//               <FileText size={18} />
//               API
//             </Link>
//             <Link to="/about" className="hover:text-white transition-colors flex items-center gap-2">
//               <Info size={18} />
//               About
//             </Link>
//           </div>
//         </div>

//         {/* Right Side: Authentication Buttons */}
//         <div className="flex items-center gap-4">
//           {isAuthenticated ? (
//             // If user is logged in, show a Logout button
//             <button
//               onClick={onLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
//             >
//               <LogOut size={18} />
//               <span>Logout</span>
//             </button>
//           ) : (
//             // If user is not logged in, show Login and Sign Up buttons
//             <>
//               <button
//                 onClick={() => navigate('/login')}
//                 className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
//               >
//                 <LogIn size={18} />
//                 <span className="hidden sm:inline">Login</span>
//               </button>
//               <button
//                 onClick={() => navigate('/signup')}
//                 className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
//               >
//                 <UserPlus size={18} />
//                 <span className="hidden sm:inline">Sign Up</span>
//               </button>
//             </>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;













import React, { useState, useEffect, useRef } from 'react'; // ✨ Import useState, useEffect, useRef
import { Link, useNavigate } from 'react-router-dom';
import {
  LogIn,
  LogOut,
  UserPlus,
  Link as LinkIcon,
  BarChart,
  FileText,
  Info,
  User, // ✨ Import User icon for profile
} from 'lucide-react';

/**
 * The application header, which adapts based on user authentication status.
 * @param {object} props
 * @param {boolean} props.isAuthenticated - Whether the user is currently logged in.
 * @param {function} props.onLogout - The function to call when the logout button is clicked.
 */
const Header = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  
  // ✨ State to manage the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // ✨ Ref to detect clicks outside the dropdown
  const dropdownRef = useRef(null);

  // ✨ Effect to handle clicks outside the dropdown menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when the dropdown is open
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    setIsDropdownOpen(false); // Close dropdown on logout
    onLogout();
  };

  return (
    <header className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl mb-8 border border-gray-700 sticky top-4 z-10">
      <nav className="flex items-center justify-between">
        {/* Left Side: Brand and Navigation Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <LinkIcon className="text-indigo-400" />
            <span>Shortify</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-gray-300">
            {isAuthenticated && (
              <Link to="/dashboard" className="hover:text-white transition-colors flex items-center gap-2">
                <BarChart size={18} />
                Dashboard
              </Link>
            )}
            <Link to="/api-docs" className="hover:text-white transition-colors flex items-center gap-2">
              <FileText size={18} />
              API
            </Link>
            <Link to="/about" className="hover:text-white transition-colors flex items-center gap-2">
              <Info size={18} />
              About
            </Link>
          </div>
        </div>

        {/* Right Side: Authentication Buttons */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            // ✨ MODIFIED: Profile Dropdown for authenticated users
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
              >
                <User size={20} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl py-1 z-20">
                  <Link
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <User size={16} />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <BarChart size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            // If user is not logged in, show Login and Sign Up buttons
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <LogIn size={18} />
                <span className="hidden sm:inline">Login</span>
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
              >
                <UserPlus size={18} />
                <span className="hidden sm:inline">Sign Up</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;