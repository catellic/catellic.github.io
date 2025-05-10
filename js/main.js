const hero = document.getElementById('hero'),
      claimBtn = document.getElementById('claimPixelBtn'),
      mapWrapper = document.getElementById('mapWrapper'),
      liveActivity = document.getElementById('liveActivity'),
      grid = document.getElementById('pixelGrid'),
      container = document.getElementById('pixelGridContainer'),
      topTitle = document.getElementById('topTitle');

let isPanning = false, isDragging = false;
let startX = 0, startY = 0, offsetX = 0, offsetY = 0, scale = 1;

claimBtn.addEventListener('click', () => {
  hero.classList.add('hidden');
  mapWrapper.classList.remove('hidden');
  liveActivity.classList.remove('hidden');
  topTitle.classList.remove('hidden');
  setTimeout(() => {
    renderGrid();
    updateTransform();
  }, 0);
});

function renderGrid() {
  const size = 20, cols = 100, rows = 100;
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = `repeat(${cols},${size}px)`;
  grid.style.gridTemplateRows = `repeat(${rows},${size}px)`;
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    const c = document.createElement('div');
    c.className = 'cell';
    c.dataset.coords = `(${x},${y})`;
    c.addEventListener('click', e => { if (isDragging) return; showTooltip(c); });
    grid.appendChild(c);
  }
}

function updateTransform() {
  grid.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
}

function showTooltip(cell) {
  document.querySelectorAll('.tooltip-large').forEach(t => t.remove());
  const rect = cell.getBoundingClientRect();
  const tip = document.createElement('div');
  tip.className = 'tooltip-large';
  tip.textContent = `Pixel ${cell.dataset.coords}`;
  tip.style.left = `${rect.left + rect.width / 2}px`;
  tip.style.top = `${rect.top - 30}px`;
  document.body.appendChild(tip);
  setTimeout(() => tip.remove(), 2000);
}

container.addEventListener('mousedown', e => {
  isPanning = true; isDragging = false;
  startX = e.clientX; startY = e.clientY;
});

window.addEventListener('mouseup', () => {
  if (isDragging) snapBack();
  isPanning = false;
});

window.addEventListener('mousemove', e => {
  if (!isPanning) return;
  const dx = e.clientX - startX, dy = e.clientY - startY;
  if (Math.hypot(dx, dy) > 5) isDragging = true;
  offsetX += dx;
  offsetY += dy;
  startX = e.clientX;
  startY = e.clientY;
  updateTransform();
});

function snapBack() {
  const cb = container.getBoundingClientRect();
  const gw = grid.offsetWidth * scale;
  const gh = grid.offsetHeight * scale;
  offsetX = Math.min(0, Math.max(cb.width - gw, offsetX));
  offsetY = Math.min(0, Math.max(cb.height - gh, offsetY));
  grid.style.transition = 'transform .3s ease-out';
  updateTransform();
  setTimeout(() => grid.style.transition = '', 300);
}

container.addEventListener('wheel', e => {
  e.preventDefault();
  const minScale = Math.max(container.clientWidth / grid.offsetWidth, container.clientHeight / grid.offsetHeight, 1);
  scale += e.deltaY > 0 ? -0.1 : 0.1;
  scale = Math.min(3, Math.max(minScale, scale));
  updateTransform();
}, { passive: false });

window.addEventListener('resize', () => {
  if (!hero.classList.contains('hidden')) return;
  renderGrid();
  updateTransform();
});
