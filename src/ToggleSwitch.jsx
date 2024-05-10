import React from 'react';

const ToggleSwitch = ({ label, name, checked, onChange }) => {
  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" name={name}/>
      <div className="
          w-11 h-6
          bg-gray-300 dark:bg-gray-700
          rounded-full
          peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800
          peer-checked:bg-blue-500 dark:peer-checked:bg-blue-700  // Change background to blue when active
          transition-colors duration-300  // Ensure the color change is smooth
          peer-checked:after:translate-x-full peer-checked:after:border-white
          after:content-[''] after:absolute after:top-0.5 after:left-[2px]
          after:bg-white after:border-gray-300 dark:after:border-gray-600
          after:rounded-full after:h-5 after:w-5
          after:transition-all
        ">
      </div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
    </label>
  );
};

export default ToggleSwitch;
