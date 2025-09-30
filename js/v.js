function showV(){
  const content = document.getElementById('content');
  content.innerHTML = ''; // clear previous content

  // ======= MAP CONTAINER =======
  const mapDiv = document.createElement('div');
  mapDiv.style.position = 'relative';
  mapDiv.style.width = '90vw';
  mapDiv.style.maxWidth = '660px'; // sesuaikan dengan map image size jika mau
  mapDiv.style.aspectRatio = '1 / 1';
  mapDiv.style.border = '1px solid #888';
  mapDiv.style.display = 'grid';
  const gridCount = 70; // ubah grid
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
  tooltip.style.whiteSpace = 'pre'; // multi-line
  document.body.appendChild(tooltip);

  // ======= CREATE CELLS =======
  for(let y=0; y<gridCount; y++){
    for(let x=0; x<gridCount; x++){
      const coord = `${x+1}-${y+1}`;
      const cell = document.createElement('div');
      cell.style.border = '1px solid #444';
      cell.style.width = '100%';
      cell.style.height = '100%';
      cell.dataset.coord = coord;

      // assign color & tooltip
      if(specialCells[coord]){
        cell.style.background = specialCells[coord].color;
        cell.dataset.tooltip = specialCells[coord].tooltip;
      } else {
        cell.dataset.tooltip = `cell (${x+1}, ${y+1})`;
        cell.style.background = 'transparent';
      }

      cell.style.cursor = 'pointer';

      // ======= HOVER TOOLTIP =======
      const showTooltip = e => {
        tooltip.innerText = cell.dataset.tooltip;
        tooltip.style.display = 'block';
        let left = e.clientX + 10;
        let top = e.clientY + 10;
        if(left + tooltip.offsetWidth > window.innerWidth) left = e.clientX - tooltip.offsetWidth - 10;
        if(top + tooltip.offsetHeight > window.innerHeight) top = e.clientY - tooltip.offsetHeight - 10;
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        if(!specialCells[coord]) cell.style.background = '#222';
      };

      cell.addEventListener('mouseover', showTooltip);
      cell.addEventListener('mousemove', showTooltip);
      cell.addEventListener('mouseout', ()=>{
        tooltip.style.display = 'none';
        cell.style.background = specialCells[coord]?.color || 'transparent';
      });

      // ======= CLICK OPEN LINK =======
      cell.addEventListener('click', ()=>{
        if(specialCells[coord]?.link){
          window.open(specialCells[coord].link, '_blank');
        }
      });

      mapDiv.appendChild(cell);
    }
  }
}