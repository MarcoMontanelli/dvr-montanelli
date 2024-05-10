import React from 'react';

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
    return (
        <label className="inline-flex relative items-center cursor-pointer">
            <input 
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                id="dark-mode-toggle"
            />
            <div className="
                w-11 h-6
                bg-gray-300 dark:bg-gray-700
                rounded-full
                peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800
                peer-checked:bg-blue-600 dark:peer-checked:bg-blue-700
                transition-colors duration-300
                after:content-[''] after:absolute after:top-0.5 after:left-[2px]
                after:bg-white after:border-gray-300 dark:after:border-gray-600
                after:rounded-full after:h-5 after:w-5
                after:transition-all after:translate-x-0 peer-checked:after:translate-x-5
            ">
            </div>
            <span className="ml-3 text-sm font-medium text-gray-100 dark:text-gray-300">Dark Mode</span>
        </label>
    );
};

export default DarkModeToggle;
