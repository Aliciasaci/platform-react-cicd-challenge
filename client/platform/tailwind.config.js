/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'rent-a-gf': "url('/src/assets/img/rent-a-girlfriend.jpg')",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

