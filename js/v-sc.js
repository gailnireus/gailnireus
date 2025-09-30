// js/v-sc.js
const specialCells = {
  // ===== Personal =====
  '22-7': { color:'#000', tooltip:'gail penthouse\nowned: gail nireus\nprice: 220700.00e\npersonal property' },
  '3-11': { color:'#000', tooltip:'gail mansion\nowned: gail nireus\nprice: 31100.00e\npersonal property' },

  // ===== Residential =====
  '49-31': { color:'#fff', tooltip:'elre house (medium)\nowned: gailnireus nation\nprice: 10000.00e', type:'residential', population:true },
  '63-18': { color:'#fff', tooltip:'eln apartment\nowned: gailnireus nation\nprice: 80000.00e', type:'residential', population:true },
  '12-33': { color:'#ccc', tooltip:'greenview estate\nowned: gailnireus nation\nprice: 55000.00e', type:'residential', population:true },
  '45-29': { color:'#aaa', tooltip:'sunny apartments\nowned: gailnireus nation\nprice: 65000.00e', type:'residential', population:true },

  // ===== Government =====
  '25-52': { color:'#808', tooltip:'gailnireus town hall\nowned: gailnireus nation\nprice: 22222.00e\nnation property', type:'government', population:true },
  '30-15': { color:'#888', tooltip:'central police station\nowned: gailnireus nation\nnation property', type:'government', population:true },

  // ===== Knowledge =====
  '14-40': { color:'#66f', tooltip:'gailnireus university\nowned: gailnireus nation', type:'knowledge', population:true },
  '50-20': { color:'#88f', tooltip:'science research center\nowned: gailnireus nation', type:'knowledge', population:true },

  // ===== Commercial =====
  '40-55': { color:'#f90', tooltip:'market plaza\nowned: gailnireus nation\nprice: 120000.00e', type:'commercial', population:true },
  '55-45': { color:'#fa0', tooltip:'shopping district\nowned: gailnireus nation', type:'commercial', population:true },

  // ===== Infrastructure =====
  '10-10': { color:'#333', tooltip:'power plant\nowned: gailnireus nation', type:'infrastructure', population:true },
  '22-22': { color:'#555', tooltip:'main train station\nowned: gailnireus nation', type:'infrastructure', population:true },

  // ===== Leisure =====
  '18-65': { color:'#0f0', tooltip:'city park\nowned: gailnireus nation', type:'leisure', population:true },
  '28-30': { color:'#2f2', tooltip:'stadium\nowned: gailnireus nation', type:'leisure', population:true },

  // ===== Culture =====
  '33-20': { color:'#808', tooltip:'museum\nowned: gailnireus nation', type:'culture', population:true },
  '44-12': { color:'#606', tooltip:'theater\nowned: gailnireus nation', type:'culture', population:true },

  // ===== Industrial =====
  '50-50': { color:'#422', tooltip:'steel factory\nowned: gailnireus nation', type:'industrial', population:true },
  '60-25': { color:'#622', tooltip:'shipping port\nowned: gailnireus nation', type:'industrial', population:true },

  // ===== Special Miscellaneous =====
  '5-5':   { color:'#f0f', tooltip:'space research lab\nowned: gailnireus nation', type:'special', population:true },
  '66-66': { color:'#f06', tooltip:'experimental facility\nowned: gailnireus nation', type:'special', population:true },
  '55-55': { color:'#fff', tooltip:'gailnireus zone 3\nowned: gail\nprice: 372950.73e', population:true, type:'special'},

  // ===== Example link to game (no ads) =====
  '33-33': { color:'#66f', tooltip:'gailnireus studio', link:'game/gailnireusstudioV3.7.html' }
};

// ===== HELPER FUNCTION: ADD ROAD =====
function addRoadLine(x1, y1, x2, y2){
  const dx = x2 - x1;
  const dy = y2 - y1;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  for(let i=0; i<=steps; i++){
    const x = x1 + Math.round(i * dx / steps);
    const y = y1 + Math.round(i * dy / steps);
    const key = `${x}-${y}`;
    if(!specialCells[key]){ 
      specialCells[key] = { color:'#555', tooltip:'road' }; 
    }
  }
}

// ===== EXAMPLE ROAD =====
addRoadLine(10,10,10,50); // vertical road
addRoadLine(10,50,50,50); // horizontal road
