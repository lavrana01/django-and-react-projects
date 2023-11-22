import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import Routers from './Routes'




const rootElement = document.getElementById('root'); // Replace 'root' with your element ID

const root = createRoot(rootElement);
root.render(<Routers />);