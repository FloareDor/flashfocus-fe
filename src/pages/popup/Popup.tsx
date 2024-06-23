import React, { useEffect, useState } from 'react';

export default function Popup(): JSX.Element {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    chrome.storage.local.get(['jwtToken'], function(result) {
      if (result.jwtToken) {
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
    chrome.identity.getAuthToken({interactive: true}, async function(token) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        setError('Failed to get Google token. Please try again.');
        return;
      }

      console.log('Token acquired:', token);

      try {
        const response = await fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken: token }),
        });

        if (response.status === 200) {
          const jwtToken = response.headers.get('Authorization')?.split('Bearer ')[1];
          if (jwtToken) {
            await chrome.storage.local.set({ jwtToken: jwtToken });
            console.log('JWT token saved:', jwtToken);
            setIsSignedIn(true);
            setError(null);
            // Change the popup's URL to load the Onboard component
          } else {
            throw new Error('JWT token not found in response');
          }
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        setError('Login failed. Please try again.');
      }
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white px-[6.5%] py-[50%]">
      <h1 className="inline text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-[#74ebd5] to-[#ACB6E5] hover:from-[#66ead2] hover:to-[#8799e8]">FlashFocus</h1>
      <p className="text-md mb-8 text-gray-400">Consume less. Study more. One card at a time.</p>
     
      <div className="w-full max-w-xs">
        {!isSignedIn ? (
          <>
            <button
              id='sign-in-with-google'
              className="w-full bg-white hover:bg-gray-100 text-black font-medium py-2 px-4 rounded flex items-center justify-center transition duration-150 ease-in-out"
            >
              <img src='/google.png' alt='google' className="w-6 h-6 mr-2"/>
              Sign in with Google
            </button>
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          </>
        ) : (
          <p>You are signed in!</p>
        )}
      </div>
    </div>
  );
}