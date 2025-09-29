function showPage(page) {
  const content = document.getElementById("content");

  if (page === "home") {
    content.innerHTML = `
      <h1>Welcome</h1>
      <p>Ini laman utama untuk projek GAILNIREUS.</p>
    `;
  } else if (page === "about") {
    content.innerHTML = `
      <h1>About</h1>
      <p>GAILNIREUS ialah website ringkas dengan tema gelap (black & grey).</p>
    `;
  } else if (page === "e") {
    showPageE();
  } else if (page === "x") {
    showPageX();
  } else if (page === "v") {
    showPageV();
  } else if (page === "w") {
    showPageW();
  } else if (page === "z") {
    showPageZ();
  }
}

// Load default page
showPage('home');
