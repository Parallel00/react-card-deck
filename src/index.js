import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import "./index.css";


const rt = ReactDOM.createRoot(document.getElementById('root'));
rt.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);