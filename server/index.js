const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectToMongoDB = require('./connectDB');
const URL = require('./models/url'); // Need the model for redirection

// --- App Configuration ---
const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false})); // for form data parsing

// --- Database Connection ---
connectToMongoDB(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB Connection error:", err));

// --- Define Routes ---
app.use('/user', require('./routes/user'));
app.use('/url', require('./routes/urls'));

// --- Redirection Route ---
app.get('/url/:shortId', async (req, res) => {
  try {
    const url = await URL.findOneAndUpdate(
        { shortUrlId: req.params.shortId },
        { $inc: { clicks: 1 } },
        { new: true }
    );
    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).json({ error: 'No URL found.' });
    }
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
  
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});


// // Import necessary packages
// const express = require('express');
// const mongoose = require('mongoose');
// const shortid = require('shortid');
// const validUrl = require('valid-url');
// const cors = require('cors');
// require('dotenv').config(); // To use environment variables from .env file

// // --- App Configuration ---
// const app = express();
// const PORT = process.env.PORT || 5000;

// // --- Middleware ---
// app.use(cors()); // Enable Cross-Origin Resource Sharing
// app.use(express.json()); // To parse JSON bodies from requests

// // --- Database Connection ---
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }) 
// .then(() => console.log('MongoDB connected successfully.'))
// .catch(err => console.error('MongoDB connection error:', err));


// // --- API Routes  ---

// /**
//  * @route   POST /api/shorten
//  * @desc    Create a short URL
//  */
// app.post('/api/shorten', async (req, res) => {
//   const { longUrl, customAlias } = req.body;
//   const baseUrl = process.env.BASE_URL || `http://localhost:${PORT}`;

//   // 1. Validate the long URL
//   if (!validUrl.isUri(longUrl)) {
//     return res.status(400).json({ error: 'Invalid URL provided.' });
//   }

//   try {
//     let urlId = customAlias;

//     // 2. If a custom alias is provided, check if it's already in use
//     if (customAlias) {
//       const existingUrl = await Url.findOne({ shortUrlId: customAlias });
//       if (existingUrl) {
//         return res.status(400).json({ error: 'Alias is already in use. Please choose another.' });
//       }
//     } else {
//       // 3. If no alias, generate a unique short ID
//       urlId = shortid.generate();
//     }

//     // 4. Check if the long URL is already in our database (without a custom alias)
//     // This prevents creating duplicate entries for the same long URL.
//     if (!customAlias) {
//         let existingUrl = await Url.findOne({ originalUrl: longUrl });
//         if (existingUrl) {
//             return res.status(200).json({
//                 shortUrl: `${baseUrl}/${existingUrl.shortUrlId}`,
//                 originalUrl: existingUrl.originalUrl,
//                 qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${baseUrl}/${existingUrl.shortUrlId}`
//             });
//         }
//     }


//     // 5. Create a new URL document and save it to the database
//     const newUrl = new Url({
//       originalUrl: longUrl,
//       shortUrlId: urlId,
//     });

//     await newUrl.save();
    
//     // 6. Respond with the new short URL information
//     res.status(201).json({
//         shortUrl: `${baseUrl}/${newUrl.shortUrlId}`,
//         originalUrl: newUrl.originalUrl,
//         qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${baseUrl}/${newUrl.shortUrlId}`
//     });

//   } catch (err) {
//     console.error('Server error:', err);
//     res.status(500).json({ error: 'Server error. Please try again later.' });
//   }
// });

// /**
//  * @route   GET /:shortId
//  * @desc    Redirect to the original long URL
//  */
// app.get('/:shortId', async (req, res) => {
//   try {
//     const url = await Url.findOne({ shortUrlId: req.params.shortId });

//     if (url) {
//       // Increment the click count
//       url.clicks++;
//       await url.save();

//       // Redirect to the original URL
//       return res.redirect(url.originalUrl);
//     } else {
//       // If the short ID is not found, send a 404 error
//       return res.status(404).json({ error: 'No URL found for this ID.' });
//     }
//   } catch (err) {
//     console.error('Server error:', err);
//     res.status(500).json({ error: 'Server error.' });
//   }
// });


// // --- Start the Server ---
// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT}`);
// });



