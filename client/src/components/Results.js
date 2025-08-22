import React from 'react';
import { Copy, QrCode } from 'lucide-react';

const Results = (props) => {
  const { shortUrl, showQr, copyToClipboard } = props;
  // console.log("Results component props:", props);
  // console.log("Short URL:", shortUrl); 
  // console.log("Show QR Code:", showQr); // undefined
  // console.log("Copy to Clipboard function:", copyToClipboard); // // undefined
  if (!shortUrl && !showQr) {
    return null; // Don't render anything if there's no result
  }

  return (
    <div className="mt-8 pt-6 border-t border-gray-700">
      <h2 className="text-2xl font-bold mb-4">Your Shortened Link</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gray-700/50 border border-gray-600 rounded-lg p-4 flex items-center justify-between">
          <span className="text-lg text-green-400 font-mono truncate mr-4">
              <a href={shortUrl}>{shortUrl}</a> 
            </span>
          <button onClick={() => copyToClipboard(shortUrl)} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2 shrink-0">
            <Copy size={16} />
            Copy
          </button>
        </div>
        <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center">
          {showQr && shortUrl ? (
            <>
              <div className="bg-white p-2 rounded-md">
                 <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(shortUrl)}`} alt="QR Code" />
              </div>
              <p className="text-xs text-gray-400 mt-2">Scan QR Code</p>
            </>
          ) : (
             <div className="w-[136px] h-[136px] bg-gray-600 rounded-md flex items-center justify-center">
                 <QrCode className="text-gray-400" size={40}/>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
