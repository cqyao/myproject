import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './components/Home.js';

const container = document.getElementById('react-entry');
const root = createRoot(container);

root.render();
