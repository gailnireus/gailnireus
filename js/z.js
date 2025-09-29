function showPageZ() {
  const content = document.getElementById("content");
  content.innerHTML = `
    <h2>GAILNIREUS Map</h2>
    <div style="position:relative; display:inline-block; margin:20px auto;">
      <img src="images/gailnireusmapV7.jpg" usemap="#mymap" 
           style="width:660px; height:376px; border:1px solid #333; display:block;">

      <!-- Tooltip -->
      <div id="tooltip" style="
          position:absolute;
          background:#222;
          color:#fff;
          padding:5px 10px;
          border-radius:5px;
          font-size:0.9em;
          pointer-events:none;
          display:none;
          z-index:1000;
      "></div>
    </div>

    <map name="mymap">
      <!-- Contoh area clickable -->
      <area shape="rect" coords="50,50,150,100" href="#"
            onmousemove="showTooltip(event,'Kawasan Tanah Utama')" 
            onmouseout="hideTooltip()" alt="Tanah Utama">

      <area shape="circle" coords="300,200,40" href="#"
            onmousemove="showTooltip(event,'Sungai')" 
            onmouseout="hideTooltip()" alt="Sungai">

      <area shape="poly" coords="500,50,550,80,540,130,490,110" href="#"
            onmousemove="showTooltip(event,'Gunung')" 
            onmouseout="hideTooltip()" alt="Gunung">

      <area shape="rect" coords="100,250,200,300" href="#"
            onmousemove="showTooltip(event,'Hutan')" 
            onmouseout="hideTooltip()" alt="Hutan">

      <area shape="circle" coords="400,100,30" href="#"
            onmousemove="showTooltip(event,'Desa')" 
            onmouseout="hideTooltip()" alt="Desa">
    </map>
  `;

  // Tooltip logic
  const tooltip = document.getElementById("tooltip");

  window.showTooltip = function(e, text){
    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = (e.clientX - rect.left + 15) + "px";
    tooltip.style.top = (e.clientY - rect.top + 15) + "px";
    tooltip.innerHTML = text;
    tooltip.style.display = "block";
  }

  window.hideTooltip = function(){
    tooltip.style.display = "none";
  }
}
