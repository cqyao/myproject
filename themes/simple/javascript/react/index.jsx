// import React from "react";
// import ReactDOM from 'react-dom';
// import Component from "./components/Page.jsx";

// ReactDOM.render(
//   <Component/>,
//   document.getElementById('react-entry')
// );

// "use client"

import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Home from './components/Home.js';

const container = document.getElementById('react-entry');
const root = createRoot(container);

root.render(<Home />);
