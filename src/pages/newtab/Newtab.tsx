import React, { useState } from 'react';
import flashlogo from '@assets/img/flashlogo.svg';
import '@pages/newtab/Newtab.css';

export default function Newtab(): JSX.Element {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState<Array<{ question: string; answer: string }>>([]);

  const handleSubmit = () => {
    if (question && answer) {
      setFlashcards([...flashcards, { question, answer }]);
      setQuestion('');
      setAnswer('');
      setIsFlipped(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="border-b border-gradient-to-r from-[#418579] to-[#7e87ab] p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={flashlogo} alt="FlashFocus Logo" className="w-8 h-8" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#74ebd5] to-[#ACB6E5] text-transparent bg-clip-text">FlashFocus</span>
          </div>
          <div className="space-x-4">
            <a href="#" className="text-gray-200 text-md hover:text-white transition duration-300">Home</a>
            <a href="#" className="text-gray-200 text-md hover:text-white transition duration-300">My Flashcards</a>
            <a href="#" className="text-gray-200 text-md hover:text-white transition duration-300">Settings</a>
          </div>
        </div>
      </nav>
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#74ebd5] to-[#ACB6E5] text-transparent bg-clip-text">
          Create Your Custom Flashcards
        </h1>
        <div className="flex justify-center mb-8">
          <div className={`w-96 h-64 perspective-1000 ${isFlipped ? 'flip' : ''}`}>
            <div className="relative w-full h-full transition-transform duration-700 transform-style-3d">
              <div className="absolute w-full h-full backface-hidden bg-gray-800 rounded-xl p-6 flex flex-col justify-between">
                <label htmlFor="question" className="text-sm font-medium text-[#74ebd5] mb-2">
                  Question
                </label>
                <textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="flex-grow p-3 bg-gray-700 border border-[#57b0a0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#74ebd5] text-white resize-none"
                  placeholder="Enter your question"
                />
                <button
                  onClick={() => setIsFlipped(true)}
                  className="mt-4 bg-gradient-to-r from-[#74ebd5] to-[#ACB6E5] text-gray-900 py-2 rounded-md hover:from-[#57b0a0] hover:to-[#7e87ab] transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
                >
                  Flip to Answer
                </button>
              </div>
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-800 rounded-xl p-6 flex flex-col justify-between">
                <label htmlFor="answer" className="text-sm font-medium text-[#74ebd5] mb-2">
                  Answer
                </label>
                <textarea
                  id="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="flex-grow p-3 bg-gray-700 border border-[#57b0a0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#74ebd5] text-white resize-none"
                  placeholder="Enter the answer"
                />
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setIsFlipped(false)}
                    className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
                  >
                    Back to Question
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-[#74ebd5] to-[#ACB6E5] text-gray-900 py-2 px-4 rounded-md hover:from-[#57b0a0] hover:to-[#7e87ab] transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
                  >
                    Add Flashcard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flashcards.map((flashcard, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-md shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-[#74ebd5]">{flashcard.question}</h3>
              <p className="text-gray-300">{flashcard.answer}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}