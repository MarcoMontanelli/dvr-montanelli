import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ToggleSwitch from './ToggleSwitch';
import FormSelect from './FormSelect';
import './App.css';
import DarkModeToggle from './DarkModeToggle';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const [values, setValues] = useState({
    eta: ">18",
    sesso: "Maschio",
    altezza: "0",
    dislocazione: "25",
    distanza: "25",
    angolo: "0",
    presa: "Buono",
    frequenza: "0.20",
    durata: "CONTINUO (1 ora)",
    peso: 0
  });

  const handleToggleChange = (field, value) => {
    setValues(prev => ({
      ...prev,
      [field]: prev[field] === value ? '' : value
    }));
  };

  const handleSelectChange = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value });
  };

  const cardVariants = {
    hidden: { x: '100vw', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const hoverEffect = {
    hover: { scale: 1.05 }
  };

  return (
    <div className="App">
      <div className="min-h-screen bg-gray-200 dark:bg-gray-900 p-4">
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <motion.h1 
          className="text-xl md:text-4xl font-extrabold text-center mb-4 text-gray-800 dark:text-gray-300"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Generatore del documento di valutazione rischi
        </motion.h1>
        <motion.div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
          className="text-xl font-extrabold text-center mb-1 text-gray-800 dark:text-gray-300"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Compila i campi: 
        </motion.h1>
          <div className="grid gap-4">
            <div>
              <div className="mb-2 font-bold  text-gray-600 dark:text-gray-300">Età</div>
              <div className="flex space-x-4">
                <ToggleSwitch label=">18" checked={values.eta === ">18"} onChange={() => handleToggleChange('eta', '>18')} id="eta1" />
                <ToggleSwitch label="15-18" checked={values.eta === "15-18"} onChange={() => handleToggleChange('eta', '15-18')} id="eta2" />
              </div>
            </div>
            <hr className="dark:border-gray-500 border-gray-400"></hr>
            <div>
              <div className="mb-2 font-bold  text-gray-600 dark:text-gray-300">Sesso</div>
              <div className="flex space-x-4">
                <ToggleSwitch label="Maschio" checked={values.sesso === "Maschio"} onChange={() => handleToggleChange('sesso', 'Maschio')} id="sessoM" />
                <ToggleSwitch label="Femmina" checked={values.sesso === "Femmina"} onChange={() => handleToggleChange('sesso', 'Femmina')} id="sessoF" />
              </div>
            </div>
            <hr className="dark:border-gray-500 border-gray-400"></hr>
            <FormSelect label="Altezza da terra delle mani all'inizio del sollevamento (cm)" options={[{ value: '0', label: '0' }, { value: '25', label: '25' }, { value: '50', label: '50' }]} id="altezza" value={values.altezza} onChange={handleSelectChange('altezza')} />
            <FormSelect label="Dislocazione verticale del peso fra inizio e fine del sollevamento (cm)" options={[{ value: '25', label: '25' }, { value: '30', label: '30' }, { value: '40', label: '40' }]} id="dislocazione" value={values.dislocazione} onChange={handleSelectChange('dislocazione')} />
            <FormSelect label="Distanza orizzontale tra le mani e il punto di mezzo delle caviglie (cm)" options={[{ value: '25', label: '25' }, { value: '30', label: '30' }, { value: '40', label: '40' }]} id="distanza" value={values.distanza} onChange={handleSelectChange('distanza')} />
            <FormSelect label="Angolo di asimmetria del peso (in gradi)" options={[{ value: '0', label: '0' }, { value: '30', label: '30' }, { value: '60', label: '60' }]} id="angolo" value={values.angolo} onChange={handleSelectChange('angolo')} />
            <hr className="dark:border-gray-500 border-gray-400"></hr>
            <div>
              <div className="mb-2 font-bold  text-gray-600 dark:text-gray-300">Giudizio della presa sul carico</div>
              <div className="flex space-x-4">
                <ToggleSwitch label="Buono" checked={values.presa === "Buono"} onChange={() => handleToggleChange('presa', 'Buono')} id="presaBuono" />
                <ToggleSwitch label="Scarso" checked={values.presa === "Scarso"} onChange={() => handleToggleChange('presa', 'Scarso')} id="presaScarso" />
              </div>
            </div>
            <hr className="dark:border-gray-500 border-gray-400"></hr>
            <FormSelect label="Frequenza dei gesti (N. atti al minuto)" options={[{ value: '0.20', label: '0.20' }, { value: '1', label: '1' }, { value: '2', label: '4' }]} id="frequenza" value={values.frequenza} onChange={handleSelectChange('frequenza')} />
            <div>
            <div className="mb-2 font-bold text-gray-600 dark:text-gray-300">Durata</div>
        <div className="flex gap-2 flex-wrap items-center justify-between">
            <ToggleSwitch
                label="CONTINUO (1 ora)"
                checked={values.durata === "CONTINUO (1 ora)"}
                onChange={() => handleToggleChange('durata', 'CONTINUO (1 ora)')}
                id="durata1"
            />
            <ToggleSwitch
                label="CONTINUO (1-2 ore)"
                checked={values.durata === "CONTINUO (1-2 ore)"}
                onChange={() => handleToggleChange('durata', 'CONTINUO (1-2 ore)')}
                id="durata2"
            />
            <ToggleSwitch
                label="CONTINUO (2-8 ore)"
                checked={values.durata === "CONTINUO (2-8 ore)"}
                onChange={() => handleToggleChange('durata', 'CONTINUO (2-8 ore)')}
                id="durata3"
            />
        </div>
            </div>
            <hr className="dark:border-gray-500 border-gray-400"></hr>
            <div className="flex justify-between items-center mb-4">
              <label htmlFor="peso" className="block text-gray-700 dark:text-gray-200">Peso effettivamente sollevato (kg)</label>
              <input type="number" id="peso" min="0" value={values.peso} onChange={(e) => handleChange('peso', e.target.value)} className="form-input text-gray-600 dark:text-white mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600" />
            </div>
            
          </div>
          <motion.button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            variants={hoverEffect}
            whileHover="hover"
            onClick={() => console.log("Calculating...")}
          >
            Calcola
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
