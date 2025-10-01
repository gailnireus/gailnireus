// ===== POPULATION TYPES =====
const popTypes = {
  residential:    { min:50,  max:500, growth:3, decline:1, color:'#4CAF50' },
  government:     { min:20,  max:100, growth:1, decline:1, color:'#2196F3' },
  knowledge:      { min:30,  max:150, growth:2, decline:1, color:'#9C27B0' },
  commercial:     { min:20,  max:300, growth:3, decline:2, color:'#FF9800' },
  infrastructure: { min:10,  max:80,  growth:1, decline:1, color:'#795548' },
  leisure:        { min:10,  max:200, growth:2, decline:3, color:'#00BCD4' },
  culture:        { min:20,  max:120, growth:1, decline:1, color:'#E91E63' },
  industrial:     { min:50,  max:400, growth:4, decline:3, color:'#607D8B' },
  special:        { min:0,   max:999, growth:5, decline:5, color:'#FFD700' }
};

let populations = {};
let mapData = {}; // semua cell info (building, road, kosong)

// ====== FUNCTION TAMBAH ROAD ======
function addRoad(x1, y1, x2, y2){
  const dx = x2 - x1;
  const dy = y2 - y1;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));

  for(let i=0; i<=steps; i++){
    const x = x1 + Math.round(i * dx / steps);
    const y = y1 + Math.round(i * dy / steps);
    const key = `${x}-${y}`;

    if(!mapData[key] || !mapData[key].isBuilding){ // jangan tindih bangunan
      mapData[key] = { tooltip:'road', isRoad:true };
    }
  }
}

// ====== FUNCTION TAMBAH BANGUNAN ======
function addBuilding(x, y, tooltip, type){
  const key = `${x}-${y}`;
  mapData[key] = { tooltip, type, isBuilding:true };

  if(type && popTypes[type]){
    const rule = popTypes[type];
    populations[key] = {
      type,
      value: Math.floor(Math.random() * (rule.max - rule.min) + rule.min)
    };
  }
}

// ====== DEVELOPER BUILDINGS (PERMANENT) ======
addBuilding(22, 7, 'gail penthouse\nowned: gail nireus\nprice: 220700.00e\npersonal property', 'residential');
addBuilding(3, 11, 'gail mansion\nowned: gail nireus\nprice: 31100.00e\npersonal property', 'residential');

// ====== DEVELOPER ROADS (PERMANENT) ======
addRoad(10, 8, 24, 10);
addRoad(11, 9, 8, 12);
addRoad(2, 12, 8, 12);

// ====== INIT MAP ======
const mapDiv = document.getElementById('map');
const tooltip = document.getElementById('tooltip');
const gridCount = 70;

// generate map grid
for(let y=0; y<gridCount; y++){
  for(let x=0; x<gridCount; x++){
    const coord = `${x+1}-${y+1}`;
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.coord = coord;

    if(mapData[coord]){
      if(mapData[coord].type){ // building
        cell.style.background = popTypes[mapData[coord].type].color;
      } else if(mapData[coord].isRoad){ // road gradient
        cell.style.background = 'linear-gradient(135deg, #444, #777)';
      }
      cell.dataset.tooltip = mapData[coord].tooltip || '';
    } else {
      // kosong gradient
      cell.style.background = 'linear-gradient(135deg, #f9f9f9, #ddd)';
      cell.dataset.tooltip = `cell (${x+1}, ${y+1})`;
    }

    if(populations[coord]){
      cell.dataset.tooltip += `\npopulation: ${populations[coord].value}`;
    }

    // tooltip
    cell.addEventListener('mouseover', ()=>{
      tooltip.innerText = cell.dataset.tooltip;
      tooltip.style.display='block';
    });
    cell.addEventListener('mousemove', e=>{
      let left = e.clientX + 10;
      let top = e.clientY + 10;
      if(left + tooltip.offsetWidth > window.innerWidth) left = e.clientX - tooltip.offsetWidth -10;
      if(top + tooltip.offsetHeight > window.innerHeight) top = e.clientY - tooltip.offsetHeight -10;
      tooltip.style.left = left+'px';
      tooltip.style.top = top+'px';
    });
    cell.addEventListener('mouseout', ()=>{ tooltip.style.display='none'; });

    mapDiv.appendChild(cell);
  }
}

// ====== POPULATION UPDATE ======
setInterval(()=>{
  for(const coord in populations){
    const p = populations[coord];
    const rule = popTypes[p.type];
    const change = Math.random() < 0.5 ? rule.growth : -rule.decline;
    p.value = Math.max(rule.min, Math.min(rule.max, p.value + change));

    const cell = mapDiv.querySelector(`div[data-coord="${coord}"]`);
    if(cell){
      cell.dataset.tooltip = mapData[coord].tooltip + `\npopulation: ${p.value}`;
      cell.style.background = popTypes[p.type].color;
    }
  }
},5000);