import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css'
import flashlogo from '@assets/img/flashlogo.svg';
import confetti from 'canvas-confetti';

interface FlashcardData {
  question: string;
  answer: string;
}

const Flashcard: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [countdown, setCountdown] = useState(10);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [examDate, setExamDate] = useState<string>('');
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);
  const [showBreathingAnimation, setShowBreathingAnimation] = useState(false);
  const [showCorrectOptions, setShowCorrectOptions] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['flashcards', 'examDate'], (result) => {
      if (result.flashcards) {
        setFlashcards(result.flashcards);
      }
      if (result.examDate) {
        setExamDate(result.examDate);
      }
    });
  }, []);

  const currentCard = flashcards[currentCardIndex];

  const checkAnswer = async () => {
    const result = { "correct": userAnswer.toLowerCase() === currentCard.answer.toLowerCase() };
    setIsCorrect(result.correct);
    setIsFlipped(true);
    if (result.correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setShowCorrectOptions(true);
    } else {
      setShowContinuePrompt(true);
    }
  };

  const handleTryAgain = () => {
    setIsFlipped(false);
    setUserAnswer('');
    setShowContinuePrompt(false);
  };

  const handleContinue = () => {
    setIsFlipped(true);
    setShowBreathingAnimation(true); 
    startCountdown();
  };

  const handleNextQuestion = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
      setUserAnswer('');
      setShowCorrectOptions(false);
    } else {
      removeOverlay();
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
    }, 2000);
  };

  if (!currentCard) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 backdrop-blur-md">
      <div className={`bg-gray-900 p-8 rounded-3xl max-w-md w-full shadow-2xl perspective-1000 ${isFlipped ? 'flip' : ''} transform-style-3d overflow-hidden relative`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#57b0a0] to-[#7e87ab] opacity-20"></div>
        <div className="relative w-full h-[50vh] transition-transform duration-700 transform-style-3d">
          <div className="absolute w-full h-full backface-hidden bg-gray-900 rounded-2xl p-6 flex flex-col justify-between">
            <div className='flex flex-row items-center gap-4 mb-8'>
              <img src={flashlogo} alt="Project Logo" className="w-8 h-8" width={32} height={32} />
              <span className='text-xl font-bold text-[#74ebd5]'>Flash Focus</span>
            </div>
            <h2 className="text-xl font-bold mb-6 text-white">{currentCard.question}</h2>
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
            {!isCorrect && showContinuePrompt && !showBreathingAnimation ? (
              <>
                <h2 className="text-2xl font-bold mb-4 text-[#ACB6E5]">Bruh, are you sure you want to fail your exam?</h2>
                <p className="text-xl mb-6 text-gray-300">You have an exam on <span className="font-semibold text-[#ACB6E5]">{examDate}</span></p>
                <div className="flex justify-between">
                  <button
                    onClick={handleTryAgain}
                    className="w-[48%] bg-gradient-to-r from-[#74ebd5] to-[#ACB6E5] text-gray-900 py-3 rounded-xl hover:from-[#57b0a0] hover:to-[#7e87ab] transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleContinue}
                    className="w-[48%] bg-gradient-to-r from-[#ff6b6b] to-[#feca57] text-gray-900 py-3 rounded-xl hover:from-[#ff5252] hover:to-[#ff9ff3] transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
                  >
                    Continue
                  </button>
                </div>
              </>
            ) : showBreathingAnimation ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-4xl font-bold text-[#74ebd5] mb-8">
                  {countdown % 2 === 0 ? "Breathe in..." : "Breathe out..."}
                </div>
                <div className={`w-32 h-32 rounded-full bg-[#74ebd5] ${countdown % 2 === 0 ? 'animate-pulse' : 'animate-ping'}`}></div>
                <p className="text-xl mt-8 text-gray-300">Redirecting in <span className="font-semibold text-[#57b0a0]">{countdown}</span> seconds...</p>
              </div>
            ) : isCorrect && showCorrectOptions ? (
              <>
                <h2 className="text-4xl font-bold mb-6 text-[#57b0a0]">Correct!</h2>
                <p className="text-2xl mb-4 text-white">
                  Answer: <span className="font-semibold text-[#74ebd5]">{currentCard.answer}</span>
                </p>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleNextQuestion}
                    className="w-[48%] bg-gradient-to-r from-[#74ebd5] to-[#ACB6E5] text-gray-900 py-3 rounded-xl hover:from-[#57b0a0] hover:to-[#7e87ab] transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
                  >
                    Next Question
                  </button>
                  <button
                    onClick={removeOverlay}
                    className="w-[48%] bg-gradient-to-r from-[#ff6b6b] to-[#feca57] text-gray-900 py-3 rounded-xl hover:from-[#ff5252] hover:to-[#ff9ff3] transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
                  >
                    Continue to Site
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className={`text-4xl font-bold mb-6 ${isCorrect ? 'text-[#57b0a0]' : 'text-[#ACB6E5]'}`}>
                  {isCorrect ? "Correct!" : "You sure about that?..."}
                </h2>
                <p className="text-2xl mb-4 text-white">
                  Answer: <span className="font-semibold text-[#74ebd5]">{currentCard.answer}</span>
                </p>
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

function checkUrlAgainstBadUrls(url: string, badUrls: string[]): boolean {
  const cleanCurrentUrl = url.replace(/^https?:\/\/(www\.)?/, '').toLowerCase();
  return badUrls.some(badUrl => {
    const cleanBadUrl = badUrl.trim().replace(/^https?:\/\/(www\.)?/, '').toLowerCase();
    return cleanCurrentUrl.startsWith(cleanBadUrl);
  });
}

async function getLocalBadUrls(): Promise<string[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get(['badUrls'], (result) => {
      if (result.badUrls) {
        resolve(result.badUrls.split(',').map((url: string) => url.trim()));
      } else {
        resolve([]);
      }
    });
  });
}

async function checkAndInjectFlashcard() {
	try {
	  const currentUrl = window.location.href;
	  const badUrls = await getLocalBadUrls();
  
	  const isBadUrl = checkUrlAgainstBadUrls(currentUrl, badUrls);
  
	  if (isBadUrl) {
		chrome.storage.local.get(['flashcards'], (result) => {
		  if (result.flashcards && result.flashcards.length > 0) {
			injectFlashcard();
		  } else {
			console.log('No flashcards available');
		  }
		});
	  }
	} catch (error) {
	  console.error('Error in checkAndInjectFlashcard:', error);
	}
  }

// Run the check when the content script loads
checkAndInjectFlashcard();

// Listen for URL changes
window.addEventListener('popstate', checkAndInjectFlashcard);