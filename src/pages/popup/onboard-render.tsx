import React from 'react';
import { createRoot } from 'react-dom/client';
import '@pages/onboard/index.css';
import '@assets/styles/tailwind.css';
import Onboard from './Onboard';

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Popup root element");
  const root = createRoot(rootContainer);
  root.render(<Onboard />);
}

init();
