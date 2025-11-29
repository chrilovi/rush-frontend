/** @type {import('tailwindcss').Config} */
const { colors } = require('./constants/colors');

module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: [
        "./App.tsx",
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./screens/**/*.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: colors.primary,
            },
            fontFamily: {
                'poppins-thin': ['Poppins-Thin'],
                'poppins-extralight': ['Poppins-ExtraLight'],
                'poppins-light': ['Poppins-Light'],
                'poppins': ['Poppins-Regular'],
                'poppins-medium': ['Poppins-Medium'],
                'poppins-semibold': ['Poppins-SemiBold'],
                'poppins-bold': ['Poppins-Bold'],
                'poppins-extrabold': ['Poppins-ExtraBold'],
                'poppins-black': ['Poppins-Black'],
            },
        }
    },
    plugins: [],
}