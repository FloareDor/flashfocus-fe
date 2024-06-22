import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css'
import flashlogo from '@assets/img/flashlogo.svg';
import confetti from 'canvas-confetti';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === "checkUrl") {
	  checkAndInjectFlashcard();
	}
  });

const Flashcard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [countdown, setCountdown] = useState(10);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = "What is the capital of France?";
  const answer = "Paris";
  const examDate = "June 15, 2024";

  const checkAnswer = async () => {
    const result = { "correct": userAnswer.toLowerCase() === answer.toLowerCase() };
    setIsCorrect(result.correct);
    setIsFlipped(true);
    if (result.correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(removeOverlay, 3000); // Remove overlay after 3 seconds on correct answer
    } else {
      startCountdown();
    }
  };

  const startCountdown = () => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          removeOverlay();
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 backdrop-blur-md">
      <div className={`bg-gray-900 p-8 rounded-3xl max-w-md w-full shadow-2xl perspective-1000 ${isFlipped ? 'flip' : ''} overflow-hidden relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#57b0a0] to-[#7e87ab] opacity-20"></div>
        <div className="relative w-full h-96 transition-transform duration-700 transform-style-3d">
          <div className="absolute w-full h-full backface-hidden bg-gray-900 rounded-2xl p-6 flex flex-col justify-between">
            <div className='flex flex-row items-center gap-4 mb-8'>
              <img src={flashlogo} alt="Project Logo" className="w-8 h-8" width={32} height={32} />
              <span className='text-xl font-bold text-[#74ebd5]'>Flash Focus</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 text-white">{question}</h2>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-4 bg-gray-800 border-2 border-[#57b0a0] rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-[#74ebd5] text-white placeholder-gray-400"
              placeholder="Your answer"
            />
            <button
              onClick={checkAnswer}
              className="w-full bg-gradient-to-r from-[#74ebd5] to-[#ACB6E5] text-gray-900 py-4 rounded-xl hover:from-[#57b0a0] hover:to-[#7e87ab] transition duration-300 ease-in-out transform hover:scale-105 font-semibold text-lg"
            >
              Submit
            </button>
          </div>
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-900 rounded-2xl p-6 flex flex-col justify-between">
            <div className='flex flex-row items-center gap-4 mb-8'>
              <img src={flashlogo} alt="Project Logo" className="w-8 h-8" width={32} height={32} />
              <span className='text-xl font-bold text-[#74ebd5]'>Flash Focus</span>
            </div>
            <h2 className={`text-4xl font-bold mb-6 ${isCorrect ? 'text-[#57b0a0]' : 'text-[#ACB6E5]'}`}>
              {isCorrect ? "Correct!" : "Whoops..."}
            </h2>
            <p className="text-2xl mb-4 text-white">
              Answer: <span className="font-semibold text-[#74ebd5]">{answer}</span>
            </p>
            {!isCorrect && (
              <>
                <p className="text-xl mb-4 text-gray-300">Exam Date: <span className="font-semibold text-[#ACB6E5]">{examDate}</span></p>
                <p className="text-xl text-gray-300">Redirecting in <span className="font-semibold text-[#57b0a0]">{countdown}</span> seconds...</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

let root: ReturnType<typeof createRoot> | null = null;

function injectFlashcard() {
  const overlayDiv = document.createElement('div');
  overlayDiv.id = 'flashcard-overlay';
  document.body.appendChild(overlayDiv);
  root = createRoot(overlayDiv);
  root.render(<Flashcard />);
}

function removeOverlay() {
  if (root) {
    root.unmount();
    root = null;
    const overlay = document.getElementById('flashcard-overlay');
    if (overlay) {
      overlay.remove();
    }
  }
}

function checkBadUrls(currentUrl: string, badUrls: string[]) {
  return badUrls.some(badUrl => {
    const cleanBadUrl = badUrl.replace(/^https?:\/\/(www\.)?/, '').toLowerCase();
	  const cleanCurrentUrl = currentUrl.replace(/^https?:\/\/(www\.)?/, '').toLowerCase();
	  console.log(cleanBadUrl);
	  console.log(cleanBadUrl);
	  console.log(cleanBadUrl);
    return cleanCurrentUrl.startsWith(cleanBadUrl);
  });
}

function checkAndInjectFlashcard() {
  chrome.storage.local.get(['badUrls'], (result) => {
    if (result.badUrls && Array.isArray(result.badUrls)) {
      const currentUrl = window.location.href;
      if (checkBadUrls(currentUrl, result.badUrls)) {
        injectFlashcard();
      }
    }
  });
}

// Run the check when the content script loads
checkAndInjectFlashcard();

// Listen for URL changes
window.addEventListener('popstate', checkAndInjectFlashcard);