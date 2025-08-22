import axios from 'axios';

// Create an Axios instance with a pre-configured base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Your backend server URL
});

/**
 * Interceptor to add the JWT token to every request if it exists.
 * This runs before each request is sent.
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// 🔥 THIS IS THE KEY PART 🔥
// Set up a response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    // If the request was successful, just return the response
    return response;
  },
  (error) => {
    // Check if the error is a 401 Unauthorized
    if (error.response && error.response.status === 401) {
      console.log('Token expired or invalid. Logging out.');
      
      // 1. Remove the token from local storage
      localStorage.removeItem('token');
      
      // 2. You might want to clear user state in your state management library (Redux, Context, etc.)
      // store.dispatch(logout()); 
      
      // no need to do step-2 because  window.location.href = '/login'; will clear the state in the browser
      // and refresh the page. 

      
      // 3. Redirect to login page
      // Using window.location.href will force a full page reload, clearing all component state.
      window.location.href = '/login'; 
    }
    
    // For any other errors, just pass them along
    return Promise.reject(error);
  }
);


// --- API Functions ---

// == URL Routes ==

/**
 * Fetches all URLs for the logged-in user.
 * GET: /url
 */
export const getUrls = async () => {
    try {
        const response = await axiosInstance.get('/url');
        return response.data;
    } catch (error) {
        console.error("API Error fetching URLs:", error.response?.data || error.message);
        // Returning the error allows the component to handle it
        return Promise.reject(error.response?.data || error);
    }
};

/**
 * Creates a new shortened URL.
 * POST: /url/shorten
 */
export const shortenUrl = async (urlData) => {
    try {
        const response = await axiosInstance.post('/url/shorten', urlData);
        console.log("Shortened URL response:", response.data);
        return response.data;
    } catch (error) {
        console.error("API Error shortening URL:", error.response?.data || error.message);
        return Promise.reject(error.response?.data || error);
    }
};


// == User Routes ==

/**
 * Registers a new user.
 * POST: /user/signup
 */
export const signup = async (userData) => {
    try {
        const response = await axiosInstance.post('/user/signup', userData);
        return response.data;
    } catch (error) {
        console.error("API Error during signup:", error.response?.data || error.message);
        return Promise.reject(error.response?.data || error);
    }
};

/**
 * Logs in a user.
 * POST: /user/login
 */
export const login = async (credentials) => {
    try {
        const response = await axiosInstance.post('/user/login', credentials);
        return response.data;
    } catch (error) {
        console.error("API Error during login:", error.response?.data || error.message);
        return Promise.reject(error.response?.data || error);
    }
};

// Note: The redirection (GET /url/:shortId) is handled by the browser/backend directly.
// You don't need an Axios call for it. You would just navigate to `http://localhost:5000/yourShortId`.

export default axiosInstance;
