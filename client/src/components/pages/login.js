import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Link as LinkIcon } from 'lucide-react';
import { login } from '../../apicalls'; // Your API function
import AuthContext from '../Context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const ctx = useContext(AuthContext); // Use context if needed

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await login(formData);
      console.log('Login response:', response);

      if (response.success) {
        localStorage.setItem('token', response.token);
        ctx.setIsAuthenticated(true); 
        navigate('/'); // Redirect to home
      } else {
        // Show the backend message in UI
        setError(response.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError(
        err.response?.data?.msg || 'Invalid credentials. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white font-bold text-3xl mb-2"
          >
            <LinkIcon className="text-indigo-400" size={32} />
            <span>Shortify</span>
          </Link>
          <p className="text-gray-400">
            Welcome back! Please log in to your account.
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="text-gray-400" size={20} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label
                  className="block text-gray-300 text-sm font-bold"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-indigo-400 hover:text-indigo-300"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={onChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Show error message in UI */}
            {error && (
              <p className="bg-red-500/20 text-red-300 text-sm p-3 rounded-lg mb-4 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>
          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-bold text-indigo-400 hover:text-indigo-300"
            >
              Sign Up
            </Link>
          </p>
          <br />
          <p className="text-center text-gray-400 text-sm mt-6">
            Note: Forgot Password has not been implemented
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;





