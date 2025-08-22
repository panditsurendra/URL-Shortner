import React from 'react';
import { Trash2, LoaderCircle } from 'lucide-react';

// The component now correctly accepts isLoading as a prop
const Dashboard = ({ history, deleteHistoryItem, isLoading }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="p-4 font-semibold">Original URL</th>
                <th className="p-4 font-semibold">Short Link</th>
                <th className="p-4 font-semibold">Clicks</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                // If loading, show a spinner row
                <tr>
                  <td colSpan="5" className="text-center p-8">
                    <div className="flex justify-center items-center gap-2 text-gray-400">
                      <LoaderCircle className="animate-spin" />
                      <span>Loading your links...</span>
                    </div>
                  </td>
                </tr>
              ) : history && history.length > 0 ? (
                // If not loading and history has items, show the data
                history.map((item) => (
                  <tr key={item._id || item.id} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
                    <td className="p-4 truncate max-w-xs">
                      <a href={item.originalUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-indigo-400">{item.originalUrl}</a>
                    </td>
                    <td className="p-4 font-mono text-green-400">
                      <a href={`${baseUrl}/url/${item.shortUrlId}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {`${baseUrl.replace('http://', '').replace('https://', '')}/url/${item.shortUrlId}`}
                      </a>
                    </td>
                    <td className="p-4">{item.clicks}</td>
                    <td className="p-4 text-gray-400">{formatDate(item.date)}</td>
                    <td className="p-4">
                      <button onClick={() => deleteHistoryItem(item._id || item.id)} className="text-red-400 hover:text-red-500 transition-colors">
                          <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                // If not loading and history is empty, show an empty message
                <tr>
                  <td colSpan="5" className="text-center p-8 text-gray-400">
                    Your history is empty. Shorten a URL to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;





