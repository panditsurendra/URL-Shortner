// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


// tailwind.config.js
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add 'Space Grotesk' as a custom font
        sans: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        // Add the floating animation
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        // Define the keyframes for the floating animation
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
    },
  },
  plugins: [],
}