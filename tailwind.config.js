// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				astronaut: "url('./src/assets/spaceman-riding-horse-outer-space.jpg')",
			},
			colors: {
				darkPrimary: "#000408",
				darkSecondary: "#161B22",
				darkSurface: "#0D1117",
				darkBorder: "#30363E",
				darkText: "#E6EDF3",
				lightPrimary: "#F2F2F2",
				primaryBlue: "#006FC9",
				primaryGreen: "#508D69",
			},
		},
	},
	plugins: [],
};
