
// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from '../header';
// import ShortenForm from '../ShortenForm';
// import Results from '../Results';
// import Dashboard from '../Dashboard';
// import Notification from '../Notification';
// import { getUrls, shortenUrl } from '../../apicalls'; // Your API functions
// import AuthContext from '../Context/AuthContext'; // Import AuthContext if needed

// const Home = () => {
//   const [history, setHistory] = useState([]);
//   const [shortUrlResult, setShortUrlResult] = useState(null);
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(true);
//   const [showQr, setShowQr] = useState(false); // ✅ for QR display
//   const navigate = useNavigate();

//   let ctx = useContext(AuthContext); // Use context if needed
//   const isAuthenticated = ctx.isAuthenticated; // Check if user is authenticated
//   console.log("isAuthenticated in home :", isAuthenticated);

//   useEffect(() => {

//     const fetchUserUrls = async () => {
//       try {
//         const urlsArray = await getUrls();
//         if (Array.isArray(urlsArray)) {
//           setHistory(urlsArray);
//         } else {
//           console.error("API did not return an array for URLs:", urlsArray);
//           setHistory([]);
//         }
//       } catch (error) {
//         console.error("Failed to fetch URLs:", error);
//         setMessage("Could not load your links.");
//         setHistory([]);
//         if (error.response && error.response.status === 401) {
//           handleLogout();
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (isAuthenticated) {
//     fetchUserUrls();
//   } else {
//     // When user is logged out, clear the history
//     // setHistory([]); 
//   }

//   }, [isAuthenticated]);


//   const showTemporaryMessage = (msg) => {
//     setMessage(msg);
//     setTimeout(() => setMessage(''), 3000);
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text)
//       .then(() => showTemporaryMessage('Copied to clipboard!'))
//       .catch((err) => console.error('Failed to copy: ', err));
//   };

//   const handleShorten = async (originalUrl, customAlias) => {
//     if (!isAuthenticated) {
//       navigate('/login'); // Redirect to login page
//       return;             // Stop the function from continuing
//     }
//     try {
//       const newUrl = await shortenUrl({ originalUrl, customAlias });
//       // console.log("Shortened URL response:", newUrl);
//       // console.log("new url shortId:", newUrl.shortUrlId);

//       const fullShortUrl = `${process.env.REACT_APP_BASE_URL || 'http://localhost:5000'}/url/${newUrl.shortUrlId}`;
//       setShortUrlResult({ ...newUrl, fullShortUrl });
//       setHistory(prevHistory => [newUrl, ...prevHistory]);

//       setShowQr(true); // ✅ show QR after shortening
//       showTemporaryMessage("URL shortened successfully!");
//     } catch (error) {
//       console.error("Shortening failed:", error.response || error);
//       // console.log("error :", error.response); //// undefined
//       const errorMessage = error.response?.error || "An unknown error occurred.";
//       showTemporaryMessage(errorMessage);
//       // throw new Error(errorMessage);
//     }
//   };

//   const deleteHistoryItem = (id) => {
//     setHistory(history.filter(item => item._id !== id));
//     showTemporaryMessage("Entry deleted.");
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     ctx.setIsAuthenticated(false);
//     navigate('/');
//   };

//   return (
//     <div className="bg-gray-900 text-white min-h-screen font-sans p-4 md:p-8">
//       <Notification message={message} />
//       <div className="max-w-5xl mx-auto">
//         <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
//         <main>
//           <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 md:p-8 shadow-2xl">
//             <h1 className="text-3xl font-bold mb-2">Shorten a Long URL</h1>
//             <p className="text-gray-400 mb-6">Enter your long URL and get a shortened link instantly.</p>
//             <ShortenForm onShorten={handleShorten} />

//             {shortUrlResult && (
//               <Results 
//                 shortUrl={shortUrlResult.fullShortUrl}
//                 showQr={showQr} 
//                 copyToClipboard={copyToClipboard} 
//               />
//             )}
//           </div>

//           {isAuthenticated && <Dashboard 
//                                     history={history}
//                                     deleteHistoryItem={deleteHistoryItem}
//                                     isLoading={isLoading}
//                                   />
//           }
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Home;














import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import ShortenForm from '../ShortenForm';
import Results from '../Results';
import Dashboard from '../Dashboard';
import Notification from '../Notification';
import { getUrls, shortenUrl } from '../../apicalls'; // Your API functions
import AuthContext from '../Context/AuthContext'; // Import AuthContext

const Home = () => {
  const [history, setHistory] = useState([]);
  const [shortUrlResult, setShortUrlResult] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showQr, setShowQr] = useState(false);
  const navigate = useNavigate();

  let ctx = useContext(AuthContext);
  const isAuthenticated = ctx.isAuthenticated;
  console.log("isAuthenticated in home :", isAuthenticated);

  useEffect(() => {
    const fetchUserUrls = async () => {
      // No changes needed in this useEffect
      try {
        const urlsArray = await getUrls();
        if (Array.isArray(urlsArray)) {
          setHistory(urlsArray);
        } else {
          console.error("API did not return an array for URLs:", urlsArray);
          setHistory([]);
        }
      } catch (error) {
        console.error("Failed to fetch URLs:", error);
        setMessage("Could not load your links.");
        setHistory([]);
        if (error.response && error.response.status === 401) {
          handleLogout();
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserUrls();
    } else {
      // For logged-out users, ensure history and loading states are reset
      setIsLoading(false);
      setHistory([]);
    }
  }, [isAuthenticated]);

  const showTemporaryMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => showTemporaryMessage('Copied to clipboard!'))
      .catch((err) => console.error('Failed to copy: ', err));
  };

  const handleShorten = async (originalUrl, customAlias) => {
    if (!isAuthenticated) {
      // This logic is good, it prompts users to log in to use the core feature
      showTemporaryMessage("Please log in or sign up to shorten URLs.");
      setTimeout(() => navigate('/login'), 1500);
      return;
    }
    try {
      const newUrl = await shortenUrl({ originalUrl, customAlias });
      const fullShortUrl = `${process.env.REACT_APP_BASE_URL || 'http://localhost:5000'}/url/${newUrl.shortUrlId}`;
      setShortUrlResult({ ...newUrl, fullShortUrl });
      setHistory(prevHistory => [newUrl, ...prevHistory]);
      setShowQr(true);
      showTemporaryMessage("URL shortened successfully!");
    } catch (error) {
      console.error("Shortening failed:", error.response || error);
      const errorMessage = error.response?.data?.error || "An unknown error occurred.";
      showTemporaryMessage(errorMessage);
    }
  };

  const deleteHistoryItem = (id) => {
    setHistory(history.filter(item => item._id !== id));
    showTemporaryMessage("Entry deleted.");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    ctx.setIsAuthenticated(false);
    navigate('/');
  };

  // ✨ NEW: A component for logged-out users' content
  const FeaturesCallToAction = () => (
    <div className="mt-12 bg-gray-800/50 border border-gray-700 rounded-xl p-6 md:p-8 shadow-2xl text-center">
      <h2 className="text-3xl font-bold text-white mb-4">Go Beyond Just Shortening</h2>
      <p className="text-gray-400 max-w-2xl mx-auto mb-8">
        Sign up for a free account to unlock powerful features. Manage your links, view click analytics, and create custom-branded URLs.
      </p>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 hover:border-indigo-500 transition-colors">
          <h3 className="text-xl font-semibold mb-2">🔗 Link History</h3>
          <p className="text-gray-400">Keep track of every link you've shortened. Never lose a link again.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 hover:border-indigo-500 transition-colors">
          <h3 className="text-xl font-semibold mb-2">📊 Click Analytics</h3>
          <p className="text-gray-400">See how many people are clicking your links and where they're from.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 hover:border-indigo-500 transition-colors">
          <h3 className="text-xl font-semibold mb-2">✏️ Custom Aliases</h3>
          <p className="text-gray-400">Create memorable and branded short links that truly stand out.</p>
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/signup')} 
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Sign Up for Free
      </button>
    </div>
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans p-4 md:p-8">
      <Notification message={message} />
      <div className="max-w-5xl mx-auto">
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <main>
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 md:p-8 shadow-2xl">
            <h1 className="text-3xl font-bold mb-2">Shorten a Long URL</h1>
            <p className="text-gray-400 mb-6">A simple, fast, and reliable URL shortener.</p>
            <ShortenForm onShorten={handleShorten} />

            {shortUrlResult && (
              <Results 
                shortUrl={shortUrlResult.fullShortUrl}
                showQr={showQr} 
                copyToClipboard={copyToClipboard} 
              />
            )}
          </div>

          {/* ✨ MODIFIED: Conditional rendering based on authentication state */}
          {isAuthenticated ? (
            <Dashboard 
              history={history}
              deleteHistoryItem={deleteHistoryItem}
              isLoading={isLoading}
            />
          ) : (
            <FeaturesCallToAction />
          )}

        </main>
      </div>
    </div>
  );
};

export default Home;
