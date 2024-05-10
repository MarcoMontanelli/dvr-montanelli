import React, { useState, useEffect } from 'react';
import DarkModeToggle from './DarkModeToggle';  // Assuming the toggle component is in the same project directory
import ToggleSwitch from './ToggleSwitch';
const Navbar = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.toggle('dark', darkMode);
    }, [darkMode]);

    return (
        <nav className={`bg-blue-500 text-white p-4 transition-colors duration-200 ease-in-out ${darkMode ? 'bg-slate-950' : ''}`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src="..\src\assets\dvrLogo.webp" alt="logo" className="mr-3 h-6 sm:h-9 rounded-full" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Dvr Montanelli</span>
                </div>
                <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
        </nav>
    );
};

export default Navbar;
