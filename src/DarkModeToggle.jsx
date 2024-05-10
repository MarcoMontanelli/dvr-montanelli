import React from 'react';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <label className="inline-flex relative items-center cursor-pointer">
      {/* Hidden checkbox input that controls the toggle */}
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={darkMode} 
        onChange={() => setDarkMode(!darkMode)} 
        id="dark-mode-toggle"
      />
      {/* Custom styled toggle switch */}
      <div className="w-11 h-6 bg-gray-300 rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:bg-blue-600 dark:bg-gray-700 transition-colors duration-200 ease-in-out">
        <div className="dot absolute left-1 top-0.5 bg-white w-5 h-5 rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></div>
      </div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Mode</span>
    </label>
  );
};

export default DarkModeToggle;
