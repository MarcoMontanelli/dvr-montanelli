import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import Navbar from './Nav';
import Footer from './Footer';

const Formt = () => {
    const [darkMode, setDarkMode] = useState(false);
    const formRef = useRef(null);  // Use refs for direct form access

    const costanti = [[30, 20], [20, 15]];
    const altezze = [0.78, 0.85, 0.93, 1.00, 0.93, 0.85, 0.78, 0.00];
    const dislocazioni = [1.00, 0.97, 0.93, 0.91, 0.88, 0.87, 0.85, 0.00];
    const distanze = [1.00, 0.83, 0.63, 0.50, 0.45, 0.42, 0.00];
    const angoli = [1.00, 0.90, 0.81, 0.71, 0.62, 0.57, 0.00];
    const prese = [1.00, 0.90];
    const frequenze = [
        [1.00, 0.94, 0.84, 0.75, 0.52, 0.37, 0.00],
        [0.95, 0.88, 0.72, 0.50, 0.30, 0.21, 0.00],
        [0.85, 0.75, 0.45, 0.27, 0.15, 0.00, 0.00]
    ];

    const calcola = (event) => {
        event.preventDefault();  // Prevent default form submission behavior
        const form = formRef.current;

        // Accessing values directly from the form elements
        const eta = parseInt(form.elements['eta'].value);
        const sesso = parseInt(form.elements['sesso'].value);
        const altezzaIndex = form.elements['altezza'].selectedIndex;
        const dislocazioneIndex = form.elements['dislocazione'].selectedIndex;
        const distanzaIndex = form.elements['distanza'].selectedIndex;
        const angoloIndex = form.elements['angolo'].selectedIndex;
        const presaIndex = parseInt(form.elements['presa'].value);
        const frequenzaIndex = form.elements['frequenza'].selectedIndex;
        const durata = parseInt(form.elements['durata'].value);
        const peso = parseFloat(form.elements['peso'].value);

        // Get the labels/text for each selected option
        const etaText = form.querySelector('input[name="eta"]:checked + span').textContent;
        const sessoText = form.querySelector('input[name="sesso"]:checked + span').textContent;
        const altezzaText = form.elements['altezza'].options[altezzaIndex].text;
        const dislocazioneText = form.elements['dislocazione'].options[dislocazioneIndex].text;
        const distanzaText = form.elements['distanza'].options[distanzaIndex].text;
        const angoloText = form.elements['angolo'].options[angoloIndex].text;
        const presaText = form.querySelector('input[name="presa"]:checked + span').textContent;
        const frequenzaText = form.elements['frequenza'].options[frequenzaIndex].text;
        const durataText = form.querySelector('input[name="durata"]:checked + span').textContent;

        // Calculation
        const costante = (eta > 18) ? costanti[0][sesso] : costanti[1][sesso];
        const altezza = altezze[altezzaIndex];
        const dislocazione = dislocazioni[dislocazioneIndex];
        const distanza = distanze[distanzaIndex];
        const angolo = angoli[angoloIndex];
        const presa = prese[presaIndex];
        const relazione = frequenze[durata][frequenzaIndex];

        const limite = costante * altezza * dislocazione * distanza * angolo * presa * relazione;
        const indiceEsposizione = peso / limite;

        // Building URL query parameters
        const queryParams = new URLSearchParams({
            eta: etaText, sesso: sessoText, altezza: altezzaText, dislocazione: dislocazioneText,
            distanza: distanzaText, angolo: angoloText, presa: presaText, frequenza: frequenzaText,
            durata: durataText, peso, indice_esposizione: indiceEsposizione.toFixed(2)
        }).toString();

        // Redirecting to another page with parameters
        window.location.href = `dati.html?${queryParams}`;
    };



    useEffect(() => {
        document.body.className = darkMode ? 'dark' : '';
    }, [darkMode]);


    const isDarkMode = document.body.classList.contains('dark');

    // Function to export PDF with conditional styling based on dark mode
    const hoverEffect = {
        hover: { scale: 1.05 }
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
                    CALCOLA L'INDICE VALUTAZIONE RISCHIO
                </motion.h1>
                <motion.div
                    className="w-full  mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8   border border-gray-300 dark:border-gray-700"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-300">
                        Generatore del documento di valutazione rischi
                    </h1>
                    <form ref={formRef} onSubmit={calcola} id="calcolaForm" action="dati.html" method="GET">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 dark:text-white">
                            <div className="flex flex-col">
                                <label className="font-medium text-gray-700 dark:text-gray-300">Età</label>
                                <div className="flex items-center space-x-4">
                                    <label htmlFor="eta1" className="flex items-center">
                                        <input type="radio" name="eta" id="eta1" value="0" defaultChecked className="text-blue-600 form-radio" />
                                        <span className="ml-2">18</span>
                                    </label>
                                    <label htmlFor="eta2" className="flex items-center">
                                        <input type="radio" name="eta" id="eta2" value="1" className="text-blue-600 form-radio" />
                                        <span className="ml-2">15-18</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="font-medium text-gray-700 dark:text-gray-300">Sesso</label>
                                <div className="flex items-center space-x-4">
                                    <label htmlFor="sesso1" className="flex items-center">
                                        <input type="radio" name="sesso" id="sesso1" value="0" defaultChecked className="text-blue-600 form-radio" />
                                        <span className="ml-2">Maschio</span>
                                    </label>
                                    <label htmlFor="sesso2" className="flex items-center">
                                        <input type="radio" name="sesso" id="sesso2" value="1" className="text-blue-600 form-radio" />
                                        <span className="ml-2">Femmina</span>
                                    </label>
                                </div>
                            </div>
                            {/* Continue with other fields in similar fashion */}
                            <div className="flex flex-col">
                                <label htmlFor="altezza" className="font-medium text-gray-700 dark:text-gray-300">Altezza da terra delle mani all'inizio del sollevamento (cm)</label>
                                <select name="altezza" id="altezza" className="mt-1 block w-full max-w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 overflow-hidden">
                                    <option value="0">0</option>
                                    <option value="1">25</option>
                                    <option value="2">50</option>
                                    <option value="3">75</option>
                                    <option value="4">100</option>
                                    <option value="5">125</option>
                                    <option value="6">150</option>
                                    <option value="7">175</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="dislocazione" className="font-medium text-gray-700 dark:text-gray-300">Dislocazione verticale del peso fra inizio e fine del sollevamento (cm)</label>
                                <select name="dislocazione" id="dislocazione" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700">
                                    <option value="0">25</option>
                                    <option value="1">30</option>
                                    <option value="2">40</option>
                                    <option value="3">50</option>
                                    <option value="4">70</option>
                                    <option value="5">100</option>
                                    <option value="6">170</option>
                                    <option value="7">175</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="distanza" className="font-medium text-gray-700 dark:text-gray-300">Distanza orizzontale tra le mani e il punto di mezzo delle caviglie (cm)</label>
                                <select name="distanza" id="distanza" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700">
                                    <option value="0">25</option>
                                    <option value="1">30</option>
                                    <option value="2">40</option>
                                    <option value="3">50</option>
                                    <option value="4">55</option>
                                    <option value="5">60</option>
                                    <option value="6">63</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="angolo" className="font-medium text-gray-700 dark:text-gray-300">Angolo di asimmetria del peso (in gradi)</label>
                                <select name="angolo" id="angolo" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700">
                                    <option value="0">0</option>
                                    <option value="1">30</option>
                                    <option value="2">60</option>
                                    <option value="3">90</option>
                                    <option value="4">120</option>
                                    <option value="5">135</option>
                                    <option value="6">135</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium text-gray-700 dark:text-gray-300">Giudizio della presa sul carico</label>
                                <div className="flex items-center space-x-4">
                                    <label htmlFor="presa1" className="flex items-center">
                                        <input type="radio" name="presa" id="presa1" value="0" defaultChecked className="text-blue-600 form-radio" />
                                        <span className="ml-2">Buono</span>
                                    </label>
                                    <label htmlFor="presa2" className="flex items-center">
                                        <input type="radio" name="presa" id="presa2" value="1" className="text-blue-600 form-radio" />
                                        <span className="ml-2">Scarso</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="frequenza" className="font-medium text-gray-700 dark:text-gray-300">Frequenza dei gesti (N. atti al minuto)</label>
                                <select name="frequenza" id="frequenza" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700">
                                    <option value="0">0.20</option>
                                    <option value="1">1</option>
                                    <option value="2">4</option>
                                    <option value="3">6</option>
                                    <option value="4">9</option>
                                    <option value="5">12</option>
                                    <option value="6">15</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium text-gray-700 dark:text-gray-300">Durata</label>
                                <div className="flex items-center space-x-4">
                                    <label htmlFor="durata1" className="flex items-center">
                                        <input type="radio" name="durata" id="durata1" value="0" defaultChecked className="text-blue-600 form-radio" />
                                        <span className="ml-2">CONTINUO (1 ora)</span>
                                    </label>
                                    <label htmlFor="durata2" className="flex items-center">
                                        <input type="radio" name="durata" id="durata2" value="1" className="text-blue-600 form-radio" />
                                        <span className="ml-2">CONTINUO (1-2 ore)</span>
                                    </label>
                                    <label htmlFor="durata3" className="flex items-center">
                                        <input type="radio" name="durata" id="durata3" value="2" className="text-blue-600 form-radio" />
                                        <span className="ml-2">CONTINUO (2-8 ore)</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="peso" className="font-medium text-gray-700 dark:text-gray-300">Peso effettivamente sollevato (kg)</label>
                                <input type="number" name="peso" id="peso" min="0" defaultValue="0" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700" />
                            </div>
                        </div>

                        <motion.button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                            variants={hoverEffect}
                            whileHover="hover"
                            type="submit"
                        >
                            Calcola
                        </motion.button>
                    </form>
                </motion.div>
                
            </div>
            <Footer />
        </>

    );
}

export default Formt;
