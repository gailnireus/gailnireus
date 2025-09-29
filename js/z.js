function showPageZ() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>Custom Terrain Map</h2>
    <canvas id="terrainCanvas" width="500" height="500"></canvas>
    <p>Gunakan arrow keys untuk gerakkan kotak hijau (player).</p>
  `;

  const canvas = document.getElementById("terrainCanvas");
  const ctx = canvas.getContext("2d");

  const TILE_SIZE = 40;
  const ROWS = 12;
  const COLS = 12;

  const terrainMap = [
    [2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,1,0,0,0,1,0,0,0,0,2],
    [2,0,0,0,2,2,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,1,0,0,0,0,0,1,0,2],
    [2,0,0,0,0,2,2,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,1,0,0,0,1,0,0,2],
    [2,0,0,0,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,0,0,0,0,2],
    [2,2,2,2,2,2,2,2,2,2,2,2],
  ];

  let player = { x: 1, y: 1 };

  function drawMap() {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const tile = terrainMap[r][c];
        if (tile === 0) ctx.fillStyle = "#654321";      // tanah
        else if (tile === 1) ctx.fillStyle = "#0077ff"; // air
        else if (tile === 2) ctx.fillStyle = "#888";    // gunung
        ctx.fillRect(c*TILE_SIZE, r*TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }

    // Draw player
    ctx.fillStyle = "#0f0";
    ctx.fillRect(player.x*TILE_SIZE, player.y*TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  function canMove(x, y) {
    if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return false;
    return terrainMap[y][x] === 0;
  }

  window.addEventListener("keydown", function(e) {
    let newX = player.x;
    let newY = player.y;
    if (e.key === "ArrowUp") newY--;
    else if (e.key === "ArrowDown") newY++;
    else if (e.key === "ArrowLeft") newX--;
    else if (e.key === "ArrowRight") newX++;

    if (canMove(newX, newY)) {
      player.x = newX;
      player.y = newY;
      drawMap();
    }
  });

  drawMap();
}
