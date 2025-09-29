// js/z.js
function showPageZ() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>GAILNIREUS Map</h2>
    <div style="position:relative; display:inline-block; margin:20px auto;">
      <img id="gailMap" src="images/gailnireusmapV7.jpg" usemap="#mymap" 
           style="width:660px; height:376px; border:1px solid #333; display:block;">

      <!-- Overlay untuk highlight -->
      <canvas id="highlightCanvas" width="660" height="376" 
              style="position:absolute; top:0; left:0; pointer-events:none;"></canvas>
    </div>

    <!-- Modal Box -->
    <div id="modal" style="
        display:none;
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        background:#111;
        color:#fff;
        padding:20px;
        border-radius:10px;
        border:1px solid #888;
        z-index:10000;
        width:300px;
        box-shadow:0 0 15px #000;
    ">
      <h3 id="modalTitle"></h3>
      <p id="modalContent"></p>
      <button onclick="closeModal()" style="
          background:#222;
          color:#fff;
          border:none;
          padding:5px 10px;
          cursor:pointer;
          margin-top:10px;
          border-radius:5px;
      ">Close</button>
    </div>

    <map name="mymap">
      <area shape="rect" coords="50,50,150,100" href="#" alt="Tanah Utama">
      <area shape="circle" coords="300,200,40" href="#" alt="Sungai">
      <area shape="poly" coords="500,50,550,80,540,130,490,110" href="#" alt="Gunung">
      <area shape="rect" coords="100,250,200,300" href="#" alt="Hutan">
      <area shape="circle" coords="400,100,30" href="#" alt="Desa">
    </map>
  `;

  // Data area map
  const areasData = [
    {name:"Tanah Utama", coords:[50,50,150,100], shape:"rect", info:"Kawasan tanah luas untuk pembangunan."},
    {name:"Sungai", coords:[300,200,40], shape:"circle", info:"Sungai mengalir, bisa dijadikan sumber air."},
    {name:"Gunung", coords:[500,50,550,80,540,130,490,110], shape:"poly", info:"Gunung tinggi, susah dilewati."},
    {name:"Hutan", coords:[100,250,200,300], shape:"rect", info:"Hutan lebat, bisa dijadikan sumber kayu."},
    {name:"Desa", coords:[400,100,30], shape:"circle", info:"Desa kecil dengan penduduk ramah."},
  ];

  const mapImage = document.getElementById("gailMap");
  const highlightCanvas = document.getElementById("highlightCanvas");
  const ctx = highlightCanvas.getContext("2d");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");

  function drawHighlight(area){
    ctx.clearRect(0,0,highlightCanvas.width,highlightCanvas.height);
    ctx.fillStyle = "rgba(243,156,18,0.4)"; // semi-transparent orange
    ctx.strokeStyle = "rgba(243,156,18,0.8)";
    ctx.lineWidth = 2;

    if(area.shape === "rect"){
      const [x1,y1,x2,y2] = area.coords;
      ctx.fillRect(x1,y1,x2-x1,y2-y1);
      ctx.strokeRect(x1,y1,x2-x1,y2-y1);
    } else if(area.shape === "circle"){
      const [cx,cy,r] = area.coords;
      ctx.beginPath();
      ctx.arc(cx,cy,r,0,Math.PI*2);
      ctx.fill();
      ctx.stroke();
    } else if(area.shape === "poly"){
      ctx.beginPath();
      ctx.moveTo(area.coords[0],area.coords[1]);
      for(let i=2;i<area.coords.length;i+=2){
        ctx.lineTo(area.coords[i],area.coords[i+1]);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }

  function clearHighlight(){
    ctx.clearRect(0,0,highlightCanvas.width,highlightCanvas.height);
  }

  function isInsideArea(x,y,area){
    if(area.shape==="rect"){
      const [x1,y1,x2,y2] = area.coords;
      return x>=x1 && x<=x2 && y>=y1 && y<=y2;
    } else if(area.shape==="circle"){
      const [cx,cy,r] = area.coords;
      return Math.sqrt((x-cx)**2+(y-cy)**2)<=r;
    } else if(area.shape==="poly"){
      // Ray-casting algorithm untuk polygon
      let inside=false;
      for(let i=0,j=area.coords.length/2-1;i<area.coords.length/2;j=i++){
        const xi=area.coords[2*i], yi=area.coords[2*i+1];
        const xj=area.coords[2*j], yj=area.coords[2*j+1];
        if((yi>y)!=(yj>y) && x<(xj-xi)*(y-yi)/(yj-yi)+xi){
          inside=!inside;
        }
      }
      return inside;
    }
    return false;
  }

  function getMousePos(e){
    const rect = mapImage.getBoundingClientRect();
    return {x:e.clientX - rect.left, y:e.clientY - rect.top};
  }

  mapImage.addEventListener("mousemove", function(e){
    const pos = getMousePos(e);
    let hovered = false;
    for(let area of areasData){
      if(isInsideArea(pos.x,pos.y,area)){
        drawHighlight(area);
        hovered = true;
        break;
      }
    }
    if(!hovered) clearHighlight();
  });

  mapImage.addEventListener("mouseout", clearHighlight);

  mapImage.addEventListener("click", function(e){
    const pos = getMousePos(e);
    for(let area of areasData){
      if(isInsideArea(pos.x,pos.y,area)){
        modalTitle.textContent = area.name;
        modalContent.textContent = area.info;
        modal.style.display = "block";
        break;
      }
    }
  });

  window.closeModal = function(){
    modal.style.display = "none";
  }
}
