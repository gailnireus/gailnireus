// e.js

// ====== POPULATION RULES ======
const popTypes = {
  residential:    { min:50,  max:500, growth:3, decline:1 },
  government:     { min:20,  max:100, growth:1, decline:1 },
  knowledge:      { min:30,  max:150, growth:2, decline:1 },
  commercial:     { min:20,  max:300, growth:3, decline:2 },
  infrastructure: { min:10,  max:80,  growth:1, decline:1 },
  leisure:        { min:10,  max:200, growth:2, decline:3 },
  culture:        { min:20,  max:120, growth:1, decline:1 },
  industrial:     { min:50,  max:400, growth:4, decline:3 },
  special:        { min:0,   max:999, growth:5, decline:5 }
};

let populations = {}; // simpan data population untuk semua cell

// ====== SHOW MAP ======
function showE(){
  const content = document.getElementById('content');
  content.innerHTML = ''; // clear previous content

  // ======= MAP CONTAINER =======
  const mapDiv = document.createElement('div');
  mapDiv.style.position = 'relative';
  mapDiv.style.width = '90vw';
  mapDiv.style.maxWidth = '660px'; 
  mapDiv.style.aspectRatio = '1 / 1';
  mapDiv.style.display = 'grid';
  const gridCount = 7; 
  mapDiv.style.gridTemplateRows = `repeat(${gridCount}, 1fr)`;
  mapDiv.style.gridTemplateColumns = `repeat(${gridCount}, 1fr)`;
  mapDiv.style.background = '#fff';
  content.appendChild(mapDiv);

  // ======= TOOLTIP =======
  const tooltip = document.createElement('div');
  tooltip.style.position = 'fixed';
  tooltip.style.padding = '4px 8px';
  tooltip.style.background = '#111';
  tooltip.style.color = '#fff';
  tooltip.style.fontSize = '12px';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.border = '1px solid #888';
  tooltip.style.display = 'none';
  tooltip.style.zIndex = '1000';
  tooltip.style.whiteSpace = 'pre';
  document.body.appendChild(tooltip);

  // ======= INIT POPULATIONS =======
  populations = {};
  for(const coord in specialCells){
    if(specialCells[coord].population){
      const type = specialCells[coord].type || 'residential';
      const rule = popTypes[type];
      populations[coord] = {
        type,
        value: Math.floor(Math.random() * (rule.max - rule.min) + rule.min),
        trend: 0
      };
    }
  }

  // ======= CREATE CELLS =======
  for(let y=0; y<gridCount; y++){
    for(let x=0; x<gridCount; x++){
      const coord = `${x+1}-${y+1}`;
      const cell = document.createElement('div');
      cell.style.border = '1px solid #222';
      cell.style.width = '100%';
      cell.style.height = '100%';
      cell.dataset.coord = coord;

      // assign color & tooltip
      if(specialCells[coord]){
        cell.style.background = specialCells[coord].color || '#222';
        cell.dataset.tooltip = specialCells[coord].tooltip || '';
      } else {
        cell.dataset.tooltip = `cell (${x+1}, ${y+1})`;
        cell.style.background = 'transparent';
      }

      // initial population info in tooltip
      if(populations[coord]){
        const p = populations[coord];
        cell.dataset.tooltip += `\nType: ${p.type}\nPopulation: ${p.value}`;
      }

      cell.style.cursor = 'pointer';

      // ======= HOVER TOOLTIP =======
      const showTooltip = e => {
        let extra = '';
        if(populations[coord]){
          const p = populations[coord];
          extra = `\nType: ${p.type}\nPopulation: ${p.value} (${p.trend>=0?'+':''}${p.trend})`;
        }
        tooltip.innerText = (specialCells[coord]?.tooltip || cell.dataset.tooltip) + extra;
        tooltip.style.display = 'block';
        let left = e.clientX + 10;
        let top = e.clientY + 10;
        if(left + tooltip.offsetWidth > window.innerWidth) left = e.clientX - tooltip.offsetWidth - 10;
        if(top + tooltip.offsetHeight > window.innerHeight) top = e.clientY - tooltip.offsetHeight - 10;
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
      };

      cell.addEventListener('mouseover', showTooltip);
      cell.addEventListener('mousemove', showTooltip);
      cell.addEventListener('mouseout', ()=>{
        tooltip.style.display = 'none';
      });

      // ======= CLICK LINK + LOADING =======
      cell.addEventListener('click', ()=>{
        if(specialCells[coord]?.link){
          const overlay = document.createElement('div');
          overlay.style.position = 'fixed';
          overlay.style.top = 0;
          overlay.style.left = 0;
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.background = '#000';
          overlay.style.color = '#fff';
          overlay.style.display = 'flex';
          overlay.style.alignItems = 'center';
          overlay.style.justifyContent = 'center';
          overlay.style.fontSize = '2em';
          overlay.style.zIndex = '9999';
          overlay.innerText = 'Loading...';
          document.body.appendChild(overlay);

          setTimeout(()=>{
            window.open(specialCells[coord].link, '_blank');
            document.body.removeChild(overlay);
          }, 1500);
        }
      });

      mapDiv.appendChild(cell);
    }
  }

  // ======= AUTO POPULATION UPDATE =======
  setInterval(updatePopulation, 5000);
}

// ====== POPULATION UPDATE ======
function updatePopulation(){
  for(const coord in populations){
    const popData = populations[coord];
    const rule = popTypes[popData.type];
    let pop = popData.value;
    let change = 0;

    // normal fluctuation
    if(Math.random() < 0.7){
      change = Math.floor(Math.random() * rule.growth);
    } else {
      change = -Math.floor(Math.random() * rule.decline);
    }

    // random rare events
    if(Math.random() < 0.05) change = -Math.floor(Math.random() * (rule.growth * 5));
    if(Math.random() < 0.03) change = Math.floor(Math.random() * (rule.growth * 5));

    pop += change;
    if(pop < rule.min) pop = rule.min;
    if(pop > rule.max) pop = rule.max;

    popData.trend = change;
    popData.value = pop;

    // only update tooltip — no color change
    const cell = document.querySelector(`[data-coord="${coord}"]`);
    if(cell){
      cell.dataset.tooltip = (specialCells[coord]?.tooltip || '') +
        `\nType: ${popData.type}\nPopulation: ${popData.value} (${popData.trend>=0?'+':''}${popData.trend})`;
    }
  }
}