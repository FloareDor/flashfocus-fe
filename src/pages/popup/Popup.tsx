// @pages/popup/Popup.js
import React, { useEffect, useState } from 'react';

export default function Popup(): JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['accessToken'], function(result) {
      if (result.accessToken) {
        setIsSignedIn(true);

      }
    });

    const signInButton = document.getElementById('sign-in-with-google');
    if (signInButton) {
      signInButton.addEventListener('click', handleSignIn);
    }
    return () => {
      if (signInButton) {
        signInButton.removeEventListener('click', handleSignIn);
      }
    };
  }, []);

  const handleSignIn = () => {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }
      
      console.log('Token acquired:', token);
      
      chrome.storage.local.set({accessToken: token}, function() {
        console.log('Access token saved');
        setIsSignedIn(true);
        // Change the popup's URL to load the Onboard component


      });
    });
  };
  

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white px-[6.5%] py-[50%]">
      <h1 className="inline text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-[#74ebd5] to-[#ACB6E5] hover:from-[#66ead2] hover:to-[#8799e8]">FlashFocus</h1>
      <p className="text-md mb-8 text-gray-400">Consume less. Study more. One card at a time.</p>
     
      <div className="w-full max-w-xs">
        {!isSignedIn? (
          <button
            id='sign-in-with-google'
            className="w-full bg-white hover:bg-gray-100 text-black font-medium py-2 px-4 rounded flex items-center justify-center transition duration-150 ease-in-out"
          >
            <img src='/google.png' alt='google' className="w-6 h-6 mr-2"/>
            Sign in with Google
          </button>
        ) : (
          <p>You are signed in!</p>
        )}
      </div>
    </div>
  );
}
