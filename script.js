let fields = [
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null, 
    null
];

let currentPlayer = 'circle'; // Um den aktuellen Spieler zu verfolgen, beginnt mit 'circle'


function init() {
  render();
}


// Funktion zum Rendern der Tic-Tac-Toe-Tabelle
function render() {
  const contentDiv = document.getElementById('content');

  // Generiere HTML content
  let tableHTML = '<table>';
  for (let i = 0; i < 3; i++) {
      tableHTML += '<tr>';
      for (let j = 0; j < 3; j++) {
          let index = i * 3 + j; // Index im Feld-Array berechnen
          let symbol = '';
          
          // Wenn das Feld leer ist, füge das <td> Element mit onclick-Handler hinzu
          if (!fields[index]) {
              tableHTML += `<td onclick="handleClick(${index})"></td>`;
          } else {
              // Wenn das Feld nicht leer ist, füge das entsprechende Symbol hinzu
              symbol = fields[index] === 'circle' ? generateCircleSVG() : generateXSVG();
              tableHTML += `<td>${symbol}</td>`;
          }
      }
      tableHTML += '</tr>';
  }
  tableHTML += '</table>';
  contentDiv.innerHTML = tableHTML; // Füge die generierte Tabelle in den Container ein
}



// Generiere ein SVG Kreis für das Spiel
function generateCircleSVG() {
  let fillColor = "#00B0EF"; // Definiere die Farbe des Kreises
  let width = 70; // Definiere die Breite und Höhe des Kreises
  let height = 70;
  // SVG-HTML-Code für den Kreis mit Füllungsanimation
  let svgCode = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${width / 2}" cy="${height / 2}" r="${width / 2 - 5}" fill="none" stroke="${fillColor}" stroke-width="10">
        <animate attributeName="r" from="0" to="${width / 2 - 5}" dur="2s" fill="freeze" />
      </circle>
    </svg>
  `; 
  return svgCode;
}


function generateXSVG() {
  let fillColor = "#FFC000"; // Definiere die Farbe des "X"
  let width = 70; // Definiere die Breite und Höhe des "X"
  let height = 70;
  // SVG-HTML-Code für das "X" mit Füllungsanimation
  const svgCode = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="10" x2="${width - 10}" y2="${height - 10}" stroke="${fillColor}" stroke-width="10">
        <animate attributeName="x2" from="0" to="${width - 10}" dur="2s" fill="freeze" />
      </line>
      <line x1="${width - 10}" y1="10" x2="10" y2="${height - 10}" stroke="${fillColor}" stroke-width="10">
        <animate attributeName="x2" from="${width}" to="10" dur="2s" fill="freeze" />
      </line>
    </svg>
  `;
  return svgCode;
}


// Funktion zum Überprüfen, ob das Spiel beendet ist
function isGameOver() {
  // Überprüfe alle möglichen Gewinnkombinationen
  const winCombination = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Reihen
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Reihen
    [0, 4, 8], [2, 4, 6]             // Diagonale Reihen
  ];

  for (let combination of winCombination) {
    let [a, b, c] = combination;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      // Das Spiel ist vorbei, und ein Spieler hat gewonnen
      drawWinningLine(combination);
      return true;
    }
  }

  // Überprüfe, ob alle Felder belegt sind (Unentschieden)
  if (fields.every((field) => field !== null)) {
    // Das Spiel ist unentschieden
    return true;
  }

  // Das Spiel ist noch nicht vorbei
  return false;
}

// Funktion zum Zeichnen der Gewinnlinie
function drawWinningLine(combination) {
  let [a, b, c] = combination;
  let winningCells = document.getElementsByTagName('td');
  winningCells[a].style.backgroundColor = 'white';
  winningCells[b].style.backgroundColor = 'white';
  winningCells[c].style.backgroundColor = 'white';
}

// Aktualisiere die handleClick-Funktion, um das Spielende zu überprüfen
function handleClick(index) {
  if (!fields[index]) {
    fields[index] = currentPlayer;
    let tdElement = document.getElementsByTagName('td')[index];
    let symbol = currentPlayer === 'circle' ? generateCircleSVG() : generateXSVG();
    tdElement.innerHTML = symbol;
    tdElement.onclick = null;
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    render();

    if (isGameOver()) {
      // Das Spiel ist vorbei, du kannst hier weitere Aktionen ausführen.
      // Zum Beispiel: Eine Nachricht anzeigen, das Spiel neustarten, usw.
    }
  }
}