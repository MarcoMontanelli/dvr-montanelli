import React from 'react';

const FormSelect = ({ label, options, name }) => {
  return (
    <div className="flex justify-between items-center text-gray-600 dark:text-white ">
      <label htmlFor={name} className="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
      <select name={name} id={name} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600">
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
