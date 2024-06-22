import React, { useState, useEffect } from 'react';
import flashlogo from '@assets/img/flashlogo.svg';

export default function Onboard(): JSX.Element {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [existingPdfName, setExistingPdfName] = useState<string | null>(null);
  const [examDate, setExamDate] = useState<string>('');
  const [badUrls, setBadUrls] = useState<string>('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Load saved data when component mounts
    chrome.storage.local.get(['examDate', 'badUrls', 'pdfName'], (result) => {
      if (result.examDate) setExamDate(result.examDate);
      if (result.badUrls) setBadUrls(Array.isArray(result.badUrls) ? result.badUrls.join(', ') : result.badUrls);
      if (result.pdfName) setExistingPdfName(result.pdfName);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data: { [key: string]: any } = {
      examDate,
      badUrls: badUrls.split(',').map(url => url.trim()).filter(url => url !== ''),
    };
  
    if (pdfFile) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target && event.target.result) {
          data.pdfContent = event.target.result;
          data.pdfName = pdfFile.name;
          await saveDataLocally(data);
          setExistingPdfName(pdfFile.name);
        }
      };
      reader.readAsDataURL(pdfFile);
    } else {
      await saveDataLocally(data);
    }
  };

  const saveDataLocally = async (data: { [key: string]: any }) => {
    try {
      // Ensure badUrls is always an array before saving
      if (typeof data.badUrls === 'string') {
        data.badUrls = data.badUrls.split(',').map(url => url.trim()).filter(url => url !== '');
      }
      await chrome.storage.local.set(data);
      console.log('Data saved locally:', data);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save data:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await chrome.storage.local.remove(['accessToken']);
      console.log('Logged out successfully.');
      window.location.reload();
    } catch (error) {
      console.error('Failed to log out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };
 
  return (
    <div className="w-full min-h-screen bg-black text-white p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-black opacity-20"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-8 px-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#74ebd5] to-[#ACB6E5] text-transparent bg-clip-text">Set Up FlashFocus</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
          <div>
            <label htmlFor="pdf-upload" className="block text-sm font-medium mb-2 text-gray-300">
              Upload Notes PDF
            </label>
            {existingPdfName ? (
              <div className="flex items-center justify-between bg-zinc-900 border border-gray-700 rounded-md p-3">
                <span className="text-gray-300">{existingPdfName}</span>
                <button
                  type="button"
                  onClick={() => setExistingPdfName(null)}
                  className="text-red-400 hover:text-red-300 transition duration-300"
                >
                  Remove
                </button>
              </div>
            ) : (
              <input
                type="file"
                id="pdf-upload"
                accept=".pdf"
                onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 bg-zinc-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
            )}
          </div>
          <div>
            <label htmlFor="exam-date" className="block text-sm font-medium mb-2 text-gray-300">
              Exam Date
            </label>
            <input
              type="date"
              id="exam-date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
            />
          </div>
          <div>
            <label htmlFor="bad-urls" className="block text-sm font-medium mb-2 text-gray-300">
              Bad URLs (comma-separated)
            </label>
            <textarea
              id="bad-urls"
              value={badUrls}
              onChange={(e) => setBadUrls(e.target.value)}
              placeholder="e.g., instagram.com, facebook.com"
              className="w-full px-3 py-2 bg-zinc-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#57b0a0] to-[#7e87ab] text-white py-2 px-4 rounded-md hover:from-[#6eead4] hover:to-[#a2aee6] transition duration-300 ease-in-out transform hover:scale-105 font-semibold"
          >
            Save Settings
          </button>
        </form>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`mt-4 text-sm ${isLoggingOut ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} text-white py-2 px-4 rounded-md transition duration-300`}
        >
          {isLoggingOut ? 'Logging Out...' : 'Log Out'}
        </button>
      </div>
    </div>
  );
}