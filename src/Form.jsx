import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';
import Navbar from './Nav';

function Form() {
  const [darkMode, setDarkMode] = useState(false);
  const [formValues, setFormValues] = useState({
    eta: ">18",
    sesso: "Maschio",
    altezza: "0",
    dislocazione: "25",
    distanza: "25",
    angolo: "0",
    presa: "Buono",
    frequenza: "0.20",
    durata: "CONTINUO (1 ora)",
    peso: ""
  });

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  

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
  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const [values, setValues] = useState({
    eta: { ">18": true, "15-18": false },
    sesso: { "Maschio": true, "Femmina": false },
    presa: { "Buono": true, "Scarso": false },
    durata: { "CONTINUO (1 ora)": true, "CONTINUO (1-2 ore)": false, "CONTINUO (2-8 ore)": false },
    altezza: "0",
    dislocazione: "25",
    distanza: "25",
    angolo: "0",
    frequenza: "0.20",

  });

  const handleToggleChange = (group, selectedValue) => {
    setValues(prevValues => ({
      ...prevValues,
      [group]: {
        ...Object.keys(prevValues[group]).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {}),
        [selectedValue]: true
      }
    }));
  };

  const handleSelectChange = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value });
  };

  const handleChangePeso = (e) => {
    const input = e.target.value;
    if (input === "" || (/^\d{1,2}$/.test(input))) {
      const newPeso = parseInt(input, 10);
      setValues(prev => ({ ...prev, peso: isNaN(newPeso) ? "" : newPeso }));
    } else if (input.length > 2) {
      alert("non puoi inserire un numero con più di due cifre!")
      e.target.value = values.peso;  // This resets the input to the last valid value
    }
    else if (input.value == 99) {
      alert("non puoi inserire un numero così alto!")
      e.target.value = values.peso;  // This resets the input to the last valid value
    }
  };

  const validateForm = () => {
    console.log("ok");
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("All data is valid, calculating...");
      const etaIndex = values.eta === ">18" ? 0 : 1; // Assuming values.eta directly holds the selected value
      const sessoIndex = values.sesso === "Maschio" ? 0 : 1;
      const costante = costanti[etaIndex][sessoIndex];
      const altezzaIndex = parseInt(values.altezza);
      const dislocazioneIndex = parseInt(values.dislocazione);
      const distanzaIndex = parseInt(values.distanza);
      const angoloIndex = parseInt(values.angolo);
      const presaIndex = values.presa === "Buono" ? 0 : 1;
      const frequenzaValue = parseFloat(values.frequenza);
      const durataIndex = values.durata === "CONTINUO (1 ora)" ? 0 : values.durata === "CONTINUO (1-2 ore)" ? 1 : 2;
  
      const altezza = altezze[altezzaIndex];
      const dislocazione = dislocazioni[dislocazioneIndex];
      const distanza = distanze[distanzaIndex];
      const angolo = angoli[angoloIndex];
      const presa = prese[presaIndex];
      const relazione = frequenze[durataIndex][Math.floor(frequenzaValue * 10)]; // Make sure frequency is calculated correctly
  
      const peso = parseInt(values.peso, 10);
      if (isNaN(peso)) {
        alert("Invalid weight");
        return;
      }
  
      const limite = costante * altezza * dislocazione * distanza * angolo * presa * relazione;
      const indiceEsposizione = peso / limite;
  
      console.log("Indice di Esposizione:", indiceEsposizione.toFixed(2));
  
      const queryParams = new URLSearchParams({
        eta: etaIndex,
        sesso: sessoIndex,
        altezza,
        dislocazione,
        distanza,
        angolo,
        presa: presa ? 'Buono' : 'Scarso',
        frequenza: frequenzaValue,
        durata: durataIndex,
        peso,
        indice_esposizione: isNaN(indiceEsposizione) ? 'Error in calculation' : indiceEsposizione.toFixed(2)
      }).toString();
  
      window.location.href = `dati.html?${queryParams}`;
    } else {
      alert("Please make sure all fields are filled correctly and that weight is greater than zero.");
    }
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
    <Navbar />
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 p-4">
      <motion.h1
        className="text-xl md:text-4xl font-extrabold text-center mb-4 text-gray-800 dark:text-gray-300"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Generatore del documento di valutazione rischi
      </motion.h1>
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
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
            <div className="mb-2 font-bold text-gray-600 dark:text-gray-300">Età</div>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value=">18"
                  checked={values.eta === ">18"}
                  onChange={() => handleRadioChange("eta", ">18")}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2"> 18 </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="15-18"
                  checked={values.eta === "15-18"}
                  onChange={() => handleRadioChange("eta", "15-18")}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2"> 15-18 </span>
              </label>
            </div>
          </div>
          <hr className="dark:border-gray-500 border-gray-400"></hr>
          <div>
            <div className="mb-2 font-bold text-gray-600 dark:text-gray-300">Sesso</div>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="Maschio"
                  checked={values.sesso === "Maschio"}
                  onChange={() => handleRadioChange("sesso", "Maschio")}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2"> Maschio </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="Femmina"
                  checked={values.sesso === "Femmina"}
                  onChange={() => handleRadioChange("sesso", "Femmina")}
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2"> Femmina </span>
              </label>
            </div>
          </div>
          <hr className="dark:border-gray-500 border-gray-400"></hr>
          <div>
            <label htmlFor="altezza" className="block text-gray-700 dark:text-gray-200 mb-2">Altezza da terra delle mani all'inizio del sollevamento (cm)</label>
            <select
              id="altezza"
              value={values.altezza}
              onChange={(e) => handleSelectChange('altezza', e)}
              className="form-select w-full text-gray-600 dark:text-white mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">Seleziona...</option>
              <option value="0">0</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
              <option value="125">125</option>
              <option value="150">150</option>
              <option value=">175">175</option>
            </select>
          </div>
          <hr className="dark:border-gray-500 border-gray-400"></hr>
            <div>
              <div className="mb-2 font-bold text-gray-600 dark:text-gray-300">Dislocazione verticale del peso fra inizio e fine del sollevamento (cm)</div>
              <select
                id="dislocazione"
                value={values.dislocazione}
                onChange={(e) => handleSelectChange('dislocazione', e)}
                className="form-select w-full text-gray-600 dark:text-white mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Seleziona...</option>
                <option value="25">25</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="70">70</option>
                <option value="100">100</option>
                <option value="170">170</option>
                <option value=">175">175</option>
              </select>
            </div>
            <hr className="dark:border-gray-500 border-gray-400"></hr>
            <div>
              <div className="mb-2 font-bold text-gray-600 dark:text-gray-300">Distanza orizzontale tra le mani e il punto di mezzo delle caviglie (cm)</div>
              <select
                id="distanza"
                value={values.distanza}
                onChange={(e) => handleSelectChange('distanza', e)}
                className="form-select w-full text-gray-600 dark:text-white mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Seleziona...</option>
                <option value="25">25</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="55">55</option>
                <option value="60">60</option>
                <option value=">63">63</option>
              </select>
            </div>
            <hr className="dark:border-gray-500 border-gray-400"></hr>
            <div>
              <div className="mb-2 font-bold text-gray-600 dark:text-gray-300">Angolo di asimmetria del peso (in gradi)</div>
              <select
                id="angolo"
                value={values.angolo}
                onChange={(e) => handleSelectChange('angolo', e)}
                className="form-select w-full text-gray-600 dark:text-white mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Seleziona...</option>
                <option value="0">0</option>
                <option value="30">30</option>
                <option value="60">60</option>
                <option value="90">90</option>
                <option value="120">120</option>
                <option value="135">135</option>
                <option value=">135">135</option>
              </select>
            </div>
            <hr className="dark:border-gray-500 border-gray-400"></hr>
            <div>
              <div className="mb-2 font-bold text-gray-600 dark:text-gray-300">Giudizio della presa sul carico</div>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="Buono"
                    checked={values.presa === "Buono"}
                    onChange={() => handleRadioChange("presa", "Buono")}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2"> Buono </span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="Scarso"
                    checked={values.presa === "Scarso"}
                    onChange={() => handleRadioChange("presa", "Scarso")}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2"> Scarso </span>
                </label>
              </div>
            </div>
            <hr className="dark:border-gray-500 border-gray-400"></hr>
            <div>
              <label htmlFor="frequenza" className="block text-gray-700 dark:text-gray-200 mb-2">Frequenza dei gesti (N. atti al minuto)</label>
              <select
                id="frequenza"
                value={values.frequenza}
                onChange={(e) => handleSelectChange('frequenza', e)}
                className="form-select w-full text-gray-600 dark:text-white mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">Seleziona...</option>
                <option value="0.20">0.20</option>
                <option value="1">1</option>
                <option value="4">4</option>
                <option value="6">6</option>
                <option value="9">9</option>
                <option value="12">12</option>
                <option value=">15">15</option>
              </select>
            </div>
            <hr className="dark:border-gray-500 border-gray-400"></hr>
            <div>
              <div className="mb-2 font-bold text-gray-600 dark:text-gray-300">Durata</div>
              <div className="flex gap-2 flex-wrap items-center justify-between">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="CONTINUO (1 ora)"
                    checked={values.durata === "CONTINUO (1 ora)"}
                    onChange={() => handleRadioChange("durata", "CONTINUO (1 ora)")}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2"> CONTINUO (1 ora) </span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="CONTINUO (1-2 ore)"
                    checked={values.durata === "CONTINUO (1-2 ore)"}
                    onChange={() => handleRadioChange("durata", "CONTINUO (1-2 ore)")}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2"> CONTINUO (1-2 ore) </span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="CONTINUO (2-8 ore)"
                    checked={values.durata === "CONTINUO (2-8 ore)"}
                    onChange={() => handleRadioChange("durata", "CONTINUO (2-8 ore)")}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2"> CONTINUO (2-8 ore) </span>
                </label>
              </div>
            </div>
            <hr className="dark:border-gray-500 border-gray-400"></hr>
            <div className="flex justify-between items-center mb-4">
              <label htmlFor="peso" className="block text-gray-700 dark:text-gray-200">Peso effettivamente sollevato (kg)</label>
              <input
                type="number"
                value={values.peso}
                onChange={(e) => setValues({ ...values, peso: e.target.value })}
                max="99"
                min="0"
                className="form-input text-gray-600 dark:text-white mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
          <motion.button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            variants={hoverEffect}
            whileHover="hover"
            onClick={handleSubmit}
          >
            Calcola
          </motion.button>
          
        </motion.div>
      </div>
    </div>
  );
  
}

export default Form;
