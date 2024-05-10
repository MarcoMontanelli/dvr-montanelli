import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import Navbar from './Nav';
import DarkModeToggle from './DarkModeToggle'; // Make sure this component is correctly imported

const Dati = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.body.className = darkMode ? 'dark' : '';
    }, [darkMode]);

    const fields = [
        { label: 'Età', value: '18+' },
        { label: 'Sesso', value: 'Maschio' },
        { label: 'Altezza da terra', value: '50 cm' },
        { label: 'Dislocazione verticale', value: '30 cm' },
        { label: 'Distanza orizzontale', value: '40 cm' },
        { label: 'Angolo di asimmetria', value: '60°' },
        { label: 'Giudizio della presa', value: 'Buono' },
        { label: 'Frequenza dei gesti', value: '0.20' },
        { label: 'Durata', value: 'CONTINUO (1 ora)' },
        { label: 'Peso sollevato', value: '15 kg' }
    ];

    // Animation for card entry
    const cardVariants = {
        hidden: { x: 300, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 10 } }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-200 dark:bg-gray-900 p-4">
            <motion.h1
                className="text-xl md:text-4xl font-extrabold text-center mb-4 text-gray-800 dark:text-gray-300"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                Preview dei dati risultanti
            </motion.h1>
            <motion.div className="max-w-4xl mx-auto"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h1 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-300">
                        Documento di Valutazione Rischi
                    </h1>
                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={index} className="grid grid-cols-2">
                                <div className="font-semibold text-gray-600 dark:text-gray-400">{field.label}:</div>
                                <div className="text-gray-800 dark:text-white">{field.value}</div>
                            </div>
                        ))}
                    </div>
                    <motion.button
                        className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => console.log("Exporting PDF...")}
                    >
                        Export PDF
                    </motion.button>
                    <motion.button
                        className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => console.log("Exporting PDF...")}
                    >
                       Visualizza Anteprima documento
                    </motion.button>
                </div>
            </motion.div>
        </div>
        </>
        
    );
}

export default Dati;
