// script.js
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("pixelGrid");
  const gridSize = 1000000; // virtual 1000x1000 grid
  const visibleGridSize = 20; // number of cells visible in each direction

  const claimBtn = document.getElementById("claimPixelBtn");
  const heroSection = document.getElementById("hero");
  const mapSection = document.getElementById("mapSection");

  claimBtn.addEventListener("click", () => {
    heroSection.classList.add("hidden");
    mapSection.classList.remove("hidden");
    initGrid();
  });

  function initGrid() {
    const container = document.getElementById("pixelGridContainer");
    const cellSize = 20;
    const cellMargin = 2;
    const totalCellSize = cellSize + cellMargin * 2;

    const numCols = Math.floor(container.clientWidth / totalCellSize);
    const numRows = Math.floor(container.clientHeight / totalCellSize);

    grid.style.gridTemplateColumns = `repeat(${numCols}, ${cellSize}px)`;
    grid.style.gridTemplateRows = `repeat(${numRows}, ${cellSize}px)`;
    grid.innerHTML = "";

    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        const pixel = document.createElement("div");
        pixel.className = "pixel";
        pixel.dataset.coord = `(${x}, ${y})`;
        grid.appendChild(pixel);
      }
    }
  }

  window.addEventListener("resize", () => {
    if (!heroSection.classList.contains("hidden")) return;
    initGrid();
  });
});

