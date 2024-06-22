// src/pages/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import '@pages/popup/index.css';
import '@assets/styles/tailwind.css';
import Popup from '@pages/popup/Popup';
import Onboard from './Onboard';

async function getIsSignedIn() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['accessToken'], function(result) {
      resolve(!!result.accessToken);
    });
  });
}

async function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Popup root element");
  
  const isSignedIn = await getIsSignedIn();
  const root = createRoot(rootContainer);
  if (isSignedIn) {
    root.render(<Onboard />);
  } else {
    root.render(<Popup />);
  }
}

init();
