// js/e-sc.js
const specialCells = {
  // ===== Personal =====
  '6-2': { color:'#000', tooltip:'gail mansion\nowned: gail\npersonal property' },

  // ===== Residential =====
  '2-3': { color:'#cff', tooltip:'gail condominium\nowned: gailnireus nation', type:'residential', population:true },
  '6-3': { color:'#ffc', tooltip:'gail apartment\nowned: gailnireus nation', type:'residential', population:true },
  '6-1': { color:'#ccf', tooltip:'gail penthouse\nowned: gailnireus nation', type:'residential', population:true },

  // ===== Government =====
  '2-5': { color:'#884', tooltip:'gailnireus town hall\nowned: gailnireus nation\nnation property', type:'government', population:true },
  '4-6': { color:'#33c', tooltip:'nireus police station\nowned: gailnireus nation\nnation property', type:'government', population:true },
  '4-2': { color:'#800', tooltip:'nireus fire fighter\nowned: gailnireus nation', type:'government', population:true },

  // ===== Knowledge =====
  '2-6': { color:'#cc0', tooltip:'gailnireus university\nowned: gailnireus nation', type:'knowledge', population:true },

  // ===== Commercial =====
  '3-6': { color:'#f90', tooltip:'gailnireus restaurant\nowned: gailnireus nation', type:'commercial', population:true },
  '4-4': { color:'#fa0', tooltip:'gailnireus mall\nowned: gailnireus nation', type:'commercial', population:true },

  // ===== Infrastructure =====
  '5-2': { color:'#66f', tooltip:'gail power plant\nowned: gailnireus nation', type:'infrastructure', population:true },
  '2-2': { color:'#088', tooltip:'gn train station\nowned: gailnireus nation', type:'infrastructure', population:true },

  // ===== Leisure =====
  '6-6': { color:'#484', tooltip:'nireus city park\nowned: gailnireus nation', type:'leisure', population:true },
  '3-4': { color:'#2f2', tooltip:'gailnireus stadium\nowned: gailnireus nation', type:'leisure', population:true },

  // ===== Culture =====
  '3-2': { color:'#808', tooltip:'nireus museum\nowned: gailnireus nation', type:'culture', population:true },
  '5-4': { color:'#606', tooltip:'gail theater\nowned: gailnireus nation', type:'culture', population:true },

  // ===== Industrial =====
  '2-4': { color:'#622', tooltip:'gn shipping port\nowned: gailnireus nation', type:'industrial', population:true },

  // ===== Special Miscellaneous =====
  '6-4': { color:'#777', tooltip:'nireus lab\nowned: gailnireus nation', population:true, type:'special' },
  '5-6': { color:'#88f', tooltip:'gailnireus zone 3\nowned: gail', population:true, type:'special'}

  };