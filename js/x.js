function showX() {
  const content = document.getElementById('content');
  content.innerHTML = ''; // clear previous content

  // Container untuk teks
  const container = document.createElement('div');
  container.style.padding = '10px';
  container.style.maxWidth = '90vw';
  container.style.overflowY = 'auto';
  container.style.fontSize = '12px'; // small font
  container.style.lineHeight = '1.4';
  container.style.color = '#ccc';
  container.style.background = '#000';
  container.style.boxSizing = 'border-box';
  container.style.wordWrap = 'break-word';

  // ======= Content =======
  container.innerHTML = `
    <h3 style="margin-top:0;color:#fff;">How to Play</h3>
    <p>Welcome to Gailnireus! Explore the map, click on highlighted cells to unlock buildings or special locations. Some cells may lead to mini-games or exclusive content.</p>

    <h3 style="color:#fff;">Tutorial</h3>
    <p>Use the map grid to navigate. Hover on special cells to see tooltips with info. Click on cells with a link to open game or event in a new tab.</p>

    <h3 style="color:#fff;">How to Buy / Premium Content</h3>
    <p>Some cells are locked or offer exclusive experiences. Players can pay to unlock special locations or gain access to premium content. Unlocking these cells will allow you to interact with special items, buildings, or mini-games.</p>

    <h3 style="color:#fff;">About</h3>
    <p>Gailnireus is a text-based exploration game with a city map grid. The game is designed to be lightweight, mobile-friendly, and fully responsive.</p>
  `;

  // Tambahkan ke content
  content.appendChild(container);
}