/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "custom-gray": {
                    100: "#f0f0f0",
                    200: "#cfcfcf",
                    800: "#333",
                    900: "#555",
                },
            },
            spacing: {
                2.5: "10px",
                5: "20px",
            },
            borderRadius: {
                md: "5px",
            },
            fontSize: {
                base: "16px",
            },
            transitionProperty: {
                all: "background-color, color, transform",
            },
            transitionDuration: {
                300: "300ms",
            },
            transitionTimingFunction: {
                "in-out": "ease-in-out",
            },
            fontFamily: {
                sans: ["Open Sans", "sans-serif"],
            },
        },
    },
    plugins: [],
};
