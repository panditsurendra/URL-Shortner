// import React from 'react';
// import { Link, Settings } from 'lucide-react';

// const ShortenForm = ({ longUrl, setLongUrl, customAlias, setCustomAlias, handleShorten }) => {
//   return (
//     <form onSubmit={handleShorten}>
//       <div className="relative mb-4">
//         <Link className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//         <input
//           type="url"
//           placeholder="Enter Long URL Here"
//           value={longUrl}
//           onChange={(e) => setLongUrl(e.target.value)}
//           className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           required
//         />
//       </div>

//       <div className="grid md:grid-cols-2 gap-4 mb-6">
//         <div>
//           <label className="text-sm font-medium text-gray-300 mb-2 block">Custom Alias (Optional)</label>
//           <div className="relative">
//             <Settings className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="text"
//               placeholder="e.g., my-awesome-link"
//               value={customAlias}
//               onChange={(e) => setCustomAlias(e.target.value)}
//               className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>
//         </div>
//         <div className="flex items-end">
//             <button type="submit" className="w-full bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
//                 Shorten URL
//             </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default ShortenForm;











// import React, { useState } from 'react';
// import {  Link as LinkIcon,  Settings,  Sparkles, LoaderCircle } from 'lucide-react';

// // --- ShortenForm Component with Gemini Feature ---
// const ShortenForm = ({ onNewUrl }) => {
//     const [longUrl, setLongUrl] = useState('');
//     const [customAlias, setCustomAlias] = useState('');
//     const [aliasSuggestions, setAliasSuggestions] = useState([]);
//     const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
//     const [error, setError] = useState('');

//     const handleSuggestAliases = async () => {
//         if (!longUrl || !longUrl.startsWith('http')) {
//             setError('Please enter a valid URL first.');
//             return;
//         }
//         setError('');
//         setIsLoadingSuggestions(true);
//         setAliasSuggestions([]);

//         const prompt = `Based on the following URL, suggest three short, relevant, and brand-safe custom aliases for a URL shortener. The aliases should be one word, lowercase, and use hyphens if needed. Return the suggestions as a JSON object with a key "aliases" containing an array of strings. URL: ${longUrl}`;

//         const payload = {
//           contents: [{ role: "user", parts: [{ text: prompt }] }],
//           generationConfig: {
//               responseMimeType: "application/json",
//               responseSchema: {
//                   type: "OBJECT",
//                   properties: {
//                       "aliases": {
//                           "type": "ARRAY",
//                           "items": { "type": "STRING" }
//                       }
//                   }
//               }
//           }
//         };

//         try {
//             const apiKey = ""; // API key will be handled by the environment
//             const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(payload)
//             });

//             if (!response.ok) {
//                 throw new Error(`API request failed with status ${response.status}`);
//             }

//             const result = await response.json();
//             const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
            
//             if (text) {
//                 const parsedJson = JSON.parse(text);
//                 setAliasSuggestions(parsedJson.aliases || []);
//             } else {
//                  throw new Error("Could not parse suggestions from API response.");
//             }

//         } catch (err) {
//             console.error("Gemini API error:", err);
//             setError("Couldn't generate suggestions. Please try again.");
//         } finally {
//             setIsLoadingSuggestions(false);
//         }
//     };

//     const handleShortenSubmit = (e) => {
//         e.preventDefault();
//         // Mocking the API call to the backend to shorten the URL
//         console.log("Shortening:", { longUrl, customAlias });
//         const newShortLink = `short.ly/${customAlias || Math.random().toString(36).substring(2, 7)}`;
//         onNewUrl({ originalUrl: longUrl, shortLink: newShortLink });
//         setLongUrl('');
//         setCustomAlias('');
//         setAliasSuggestions([]);
//     };

//     return (
//         <form onSubmit={handleShortenSubmit}>
//             <div className="relative mb-4">
//                 <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                     type="url"
//                     placeholder="Enter Long URL Here"
//                     value={longUrl}
//                     onChange={(e) => setLongUrl(e.target.value)}
//                     className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     required
//                 />
//             </div>

//             <div className="grid md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                     <label className="text-sm font-medium text-gray-300 mb-2 block">Custom Alias (Optional)</label>
//                     <div className="relative">
//                         <Settings className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//                         <input
//                             type="text"
//                             placeholder="e.g., my-awesome-link"
//                             value={customAlias}
//                             onChange={(e) => setCustomAlias(e.target.value)}
//                             className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                         />
//                     </div>
//                 </div>
//                 <div className="flex items-end">
//                     <button 
//                         type="button" 
//                         onClick={handleSuggestAliases} 
//                         disabled={isLoadingSuggestions}
//                         className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-wait"
//                     >
//                         {isLoadingSuggestions ? (
//                             <LoaderCircle className="animate-spin" size={20} />
//                         ) : (
//                             <Sparkles className="text-yellow-300" size={20} />
//                         )}
//                         ✨ Suggest Aliases
//                     </button>
//                 </div>
//             </div>
            
//             {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

//             {aliasSuggestions.length > 0 && (
//                 <div className="mb-4 p-3 bg-indigo-900/30 rounded-lg">
//                     <p className="text-sm font-medium text-indigo-300 mb-2">Suggestions:</p>
//                     <div className="flex flex-wrap gap-2">
//                         {aliasSuggestions.map((alias, index) => (
//                             <button
//                                 key={index}
//                                 type="button"
//                                 onClick={() => setCustomAlias(alias)}
//                                 className="bg-indigo-500 text-white text-sm py-1 px-3 rounded-full hover:bg-indigo-400 transition-colors"
//                             >
//                                 {alias}
//                             </button>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             <button type="submit" className="w-full bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
//                 Shorten URL
//             </button>
//         </form>
//     );
// };


// export default ShortenForm;





































import React, { useState } from 'react';
import { Link as LinkIcon, Settings, Sparkles, LoaderCircle } from 'lucide-react';
// Import your Gemini API function if you have it in a separate file
// import { shortenUrl } from '../apicalls';

const ShortenForm = ({ onShorten }) => {
  // State for the form inputs now lives inside this component
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  
  // State for the Gemini AI feature
  const [aliasSuggestions, setAliasSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [error, setError] = useState('');

  // This is the Gemini API call from the previous step
  const handleSuggestAliases = async () => {
    if (!longUrl || !longUrl.startsWith('http')) {
      setError('Please enter a valid URL first.');
      return;
    }
    setError('');
    setIsLoadingSuggestions(true);
    setAliasSuggestions([]);

    const prompt = `Based on the following URL, suggest three short, relevant, and brand-safe custom aliases for a URL shortener. The aliases should be one word, lowercase, and use hyphens if needed. Return the suggestions as a JSON object with a key "aliases" containing an array of strings. URL: ${longUrl}`;
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: { "aliases": { "type": "ARRAY", "items": { "type": "STRING" } } }
        }
      }
    };

    try {
      const apiKey = ""; // Handled by environment
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
      
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        setAliasSuggestions(JSON.parse(text).aliases || []);
      } else {
        throw new Error("Could not parse suggestions from API response.");
      }
    } catch (err) {
      console.error("Gemini API error:", err);
      setError("Couldn't generate suggestions. Please try again.");
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!longUrl) {
      setError('Please provide a URL to shorten.');
      return;
    }
    // Call the onShorten function passed down from the Home component
    onShorten(longUrl, customAlias);

    // Clear the form for the next use
    setLongUrl('');
    setCustomAlias('');
    setAliasSuggestions([]);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative mb-4">
        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="url"
          placeholder="Enter Long URL Here"
          value={longUrl}
          // This now correctly calls the state setter defined inside this component
          onChange={(e) => setLongUrl(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">Custom Alias (Optional)</label>
          <div className="relative">
            <Settings className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="e.g., my-awesome-link"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex items-end">
          <button 
            type="button" 
            onClick={handleSuggestAliases} 
            disabled={isLoadingSuggestions}
            className="w-full flex items-center justify-center gap-2 bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50 disabled:cursor-wait"
          >
            {isLoadingSuggestions ? <LoaderCircle className="animate-spin" size={20} /> : <Sparkles className="text-yellow-300" size={20} />}
            Suggest Aliases
          </button>
        </div>
      </div>
      
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {aliasSuggestions.length > 0 && (
        <div className="mb-4 p-3 bg-indigo-900/30 rounded-lg">
          <p className="text-sm font-medium text-indigo-300 mb-2">AI Suggestions:</p>
          <div className="flex flex-wrap gap-2">
            {aliasSuggestions.map((alias, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCustomAlias(alias)}
                className="bg-indigo-500 text-white text-sm py-1 px-3 rounded-full hover:bg-indigo-400 transition-colors"
              >
                {alias}
              </button>
            ))}
          </div>
        </div>
      )}

      <button type="submit" className="w-full bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
        Shorten URL
      </button>
    </form>
  );
};

export default ShortenForm;
