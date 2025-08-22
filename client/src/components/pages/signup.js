
import React, { useState } from 'react';
import { User, Mail, Lock, Link as LinkIcon } from 'lucide-react';
import { signup } from '../../apicalls'; // Your actual API function
import { toast } from 'react-hot-toast';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { firstname, lastname, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await signup({ firstname, lastname, email, password });
      // Expected: { success: true, message: "...", token: "..." }
      console.log('Registration successful:', response);
      if (response.success) {
        
        toast.success(response.message || 'Account created successfully!');
        localStorage.setItem('token', response.token);
        window.location.href = '/'; // Redirect to homepage
      } else {
        setError(response.message || 'Registration failed.');
        toast.error(response.message || 'Registration failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
      toast.error(err.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-white font-bold text-3xl mb-2"
          >
            <LinkIcon className="text-indigo-400" size={32} />
            <span>Shortify</span>
          </a>
          <p className="text-gray-400">
            Create your account to start shortening URLs.
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="firstname">
                  First Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={firstname}
                    onChange={onChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="John"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="lastname">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={lastname}
                  onChange={onChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
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
                  value={email}
                  onChange={onChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="text-gray-400" size={20} />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="bg-red-500/20 text-red-300 text-sm p-3 rounded-lg mb-4">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className={`w-full bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <a
              href="/login"
              className="font-bold text-indigo-400 hover:text-indigo-300"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;








