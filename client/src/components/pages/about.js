import React from "react";
import { Link as LinkIcon, BarChart3, QrCode, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";


const About = () => {
    const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-8">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-4">About Custom-Url</h1>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Custom-Url is a simple yet powerful URL shortener that helps you create 
          clean, shareable links in seconds. Whether you’re a student, professional, 
          or business, Custom-Url makes link management effortless.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-800/60 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <LinkIcon className="w-10 h-10 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Shorten & Customize</h3>
            <p className="text-gray-400">
              Create clean short links with custom aliases to make them memorable.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-800/60 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <BarChart3 className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Track Engagement</h3>
            <p className="text-gray-400">
              Gain insights into clicks and engagement with built-in analytics.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-800/60 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <QrCode className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">QR Code Sharing</h3>
            <p className="text-gray-400">
              Instantly generate QR codes for easy mobile sharing.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-gray-800/60 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <ShieldCheck className="w-10 h-10 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Dashboard</h3>
            <p className="text-gray-400">
              Manage your links with secure login and a private dashboard.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <button 
             onClick={() => navigate('/')} 
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-full font-medium transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
