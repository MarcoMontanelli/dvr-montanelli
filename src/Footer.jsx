import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white p-4 transition-colors duration-200 ease-in-out dark:bg-slate-950">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <a href="index.html" className="flex items-center">
          <img src="../src/assets/dvrLogo.webp" alt="Dvr Montanelli Logo" className="h-8 sm:h-12 mr-2 rounded-full" />
          <span className="text-sm sm:text-base font-medium">Dvr Montanelli</span>
        </a>
        <div className="text-sm sm:text-base text-right">
          <p>2024 Dvr Montanelli</p>
          <p>5ia Progetto GEP.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
