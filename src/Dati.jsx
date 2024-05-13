import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './App.css';
import Navbar from './Nav';
import DarkModeToggle from './DarkModeToggle';

const Dati = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        document.body.className = darkMode ? 'dark' : '';
    }, [darkMode]);

    // Parse URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    const fields = [
        { voce: 'Età', dato: searchParams.get('eta') || '18+' },
        { voce: 'Sesso', dato: searchParams.get('sesso') || 'Maschio' },
        { voce: 'Altezza da terra', dato: searchParams.get('altezza') || '50 cm' },
        { voce: 'Dislocazione verticale', dato: searchParams.get('dislocazione') || '30 cm' },
        { voce: 'Distanza orizzontale', dato: searchParams.get('distanza') || '40 cm' },
        { voce: 'Angolo di asimmetria', dato: searchParams.get('angolo') || '60°' },
        { voce: 'Giudizio della presa', dato: searchParams.get('presa') || 'Buono' },
        { voce: 'Frequenza dei gesti', dato: searchParams.get('frequenza') || '0.20' },
        { voce: 'Durata', dato: searchParams.get('durata') || 'CONTINUO (1 ora)' },
        { voce: 'Peso sollevato', dato: searchParams.get('peso') || '15 kg' },
        { voce: 'Indice di esposizione', dato: searchParams.get('indice') || '0.1' }
    ];

    const tableData = [
        ["Età", searchParams.get("eta") || "N/A"],
        ["Sesso", searchParams.get("sesso") || "N/A"],
        ["Altezza (cm)", searchParams.get("altezza") || "N/A"],
        ["Dislocazione (cm)", searchParams.get("dislocazione") || "N/A"],
        ["Distanza (cm)", searchParams.get("distanza") || "N/A"],
        ["Angolo (gradi)", searchParams.get("angolo") || "N/A"],
        ["Presa", searchParams.get("presa") || "N/A"],
        ["Frequenza (atti al minuto)", searchParams.get("frequenza") || "N/A"],
        ["Durata", searchParams.get("durata") || "N/A"],
        ["Peso (kg)", searchParams.get("peso") || "N/A"],
        ["Indice di Esposizione", searchParams.get("indice") || "N/A"]
    ];

    const isDarkMode = document.body.classList.contains('dark');

    // Function to export PDF with conditional styling based on dark mode
    const exportPDF = () => {
        const doc = new jsPDF();

        // Timestamp for the footer
        const now = new Date();
        const timestamp = now.toISOString().replace('T', ' ').slice(0, 19);

        // Header
        doc.setFontSize(18);
        doc.setTextColor(isDarkMode ? 210 : 10);
        doc.text("DOCUMENTO VALUTAZIONE RISCHI", 105, 22, { align: 'center' });

        // AutoTable with conditional styling
        doc.autoTable({
            startY: 30,
            head: [['voce', 'dato']],
            body: tableData,
            theme: 'grid',
            styles: {
                textColor: isDarkMode ? 210 : 10,
                lineColor: isDarkMode ? [153, 153, 153] : [0, 0, 0],
            },
            headStyles: {
                fillColor: isDarkMode ? [64, 64, 64] : [224, 224, 224],
            },
        });

        // Footer
        doc.setFontSize(10);
        doc.setTextColor(isDarkMode ? 210 : 10);
        doc.text(`Generatore Documento Valutazione Rischi DVR Montanelli v1.0 2024 - Generato il ${timestamp}`, 105, 285, { align: 'center' });

        doc.save('documento-valutazione-rischi.pdf');
    };



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
                <motion.div className="w-full mx-auto"
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
                                    <div className="font-semibold text-gray-600 dark:text-gray-400">{field.voce}:</div>
                                    <div className="text-gray-800 dark:text-white">{field.dato}</div>
                                </div>
                            ))}
                        </div>
                        <motion.button
                            className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => exportPDF()}
                        >
                            Export PDF
                        </motion.button>
                        
                    </div>
                </motion.div>
            </div>
        </>

    );
}

export default Dati;
