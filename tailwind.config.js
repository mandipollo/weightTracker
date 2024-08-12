// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				astronaut: "url('./src/assets/spaceman-riding-horse-outer-space.jpg')",
			},
		},
	},
	plugins: [],
};
