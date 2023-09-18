let fields = [
    null, 
    null, 
    null, 
    null, 
    'circle', 
    null, 
    null, 
    'cross', 
    null
];

function init() {
  render();
}
// Funktion zum Rendern der Tic-Tac-Toe-Tabelle
function render() {
  const contentDiv = document.getElementById('content');

  //Generiere HTML content
  let tableHTML = '<table>';
  for (let i = 0; i < 3; i++) {
    tableHTML += '<tr>';
    for (let j = 0; j < 3; j++) {
        const index = i * 3 + j; // Index im Feld-Array berechnen
        let symbol = '';
        if (fields[index] === 'circle') { // Überprüfe den aktuellen Zustand des Feldes und füge das entsprechende Symbol hinzu
            symbol = "O";
        } else if (fields[index] === 'cross') {
            symbol = 'X';
        }
        tableHTML += `<td>${symbol}</td>`; // Wenn das Feld leer ist, füge einen leeren String hinzu und füge einen Event-Listener hinzu
    }
    tableHTML += '</tr>';
  }
  tableHTML += '</table>';

  // Füge die generierte Tabelle in den Container ein
  contentDiv.innerHTML = tableHTML;
}
