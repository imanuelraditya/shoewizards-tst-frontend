/** @type {import('tailwindcss').Config} */

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        'node_modules/flowbite-react/lib/esm/**/*.js',
    ],
    theme: {
        extend: {
            fontFamily: {
                lato: ["Lato", "Helvetica", "sans-serif"],
                nunito: ["nunito", "sans-serif", "sans"],
            },
            colors: {
                "shoewizards-white": "#F6F1F1",
                "shoewizards-light-blue": "#AFD3E2",
                "shoewizards-medium-blue": "#19A7CE",
                "shoewizards-dark-blue": "#146C94",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
}