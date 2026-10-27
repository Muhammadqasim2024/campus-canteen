import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log("1. main.jsx is executing!");

const rootElement = document.getElementById('root');
console.log("2. Root element found:", rootElement);

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("3. React render called successfully!");
} else {
  console.error("CRITICAL: #root element not found in HTML!");
}