# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



                                            <!-- NOTE -->                   

Open terminal => gitbash,powershell, ...etc enter the following commands accordingly to install the packages

<!-- React + Vite installation -->
npm create vite@latest
<!-- after installation  -->
npm install 
npm run dev


<!-- Tailwindcss installation  -->
npm install -D tailwindcss postcss autoprefixer
<!-- after installation -->
npx tailwindcss init -p


<!-- React icons installation -->
npm install react-icons --save


<!-- React router installation -->
npm i react-router
npm i react-router-dom


<!-- React animation installation -->
npm install animate.css --save


<!-- Install firebase for authentication and data storage -->
npm install firebase


<!-- install redux for state management -->
npm install react-redux
npm install @reduxjs/toolkit

<!-- run this command at last it will create a folder named dist it will be helpfull for netlify hoisting,
only required files will be moved to the folder and we can drag that folder and paste it on hoisting and it will take less duration to load it -->
npm run build