import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const PreviewAndExport = () => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(Array.from(urlParams.entries())); 
    // Table data setup
    // Directly use URL parameters for table data setup
    const tableData = [
        ["Età", urlParams.get("eta") || "N/A"],
        ["Sesso", urlParams.get("sesso") || "N/A"],
        ["Altezza (cm)", urlParams.get("altezza") || "N/A"],
        ["Dislocazione (cm)", urlParams.get("dislocazione") || "N/A"],
        ["Distanza (cm)", urlParams.get("distanza") || "N/A"],
        ["Angolo (gradi)", urlParams.get("angolo") || "N/A"],
        ["Presa", urlParams.get("presa") || "N/A"],
        ["Frequenza (atti al minuto)", urlParams.get("frequenza") || "N/A"],
        ["Durata", urlParams.get("durata") || "N/A"],
        ["Peso (kg)", urlParams.get("peso") || "N/A"],
        ["Indice di Esposizione", urlParams.get("indice") || "N/A"]
    ];

    // Function to export PDF
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Label', 'Value']],
            body: tableData.map(item => [item[0], item[1]])
        });
        doc.save('documento-valutazione-rischi.pdf');
    };

    return (
        <div>
            <h1>Preview dei dati risultanti</h1>
            <table id="preview-table">
                <thead>
                    <tr>
                        <th>Label</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((item, index) => (
                        <tr key={index}>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={exportPDF}>Export to PDF</button>
        </div>
    );
};

export default PreviewAndExport;
