/**
 * js/resources.js
 * Catholic Prayers, Rosary Mysteries Selector, Divine Mercy & Stations of Cross
 * SS Peter and Paul Catholic Church, Ugbolu
 */

let resourcesData = null;

document.addEventListener('DOMContentLoaded', async () => {
  await loadResources();
  initResourceTabs();
  initRosarySelector();
});

async function loadResources() {
  try {
    const res = await fetch('data/resources.json');
    if (!res.ok) throw new Error('Failed to load resources');
    resourcesData = await res.json();
    renderBasicPrayers();
    renderStations();
    renderLiturgicalSeasons();
  } catch (err) {
    console.error('Error loading resources:', err);
  }
}

function initResourceTabs() {
  const tabs = document.querySelectorAll('.res-tab-btn');
  const panels = document.querySelectorAll('.resource-tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.style.display = 'none');

      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.style.display = 'block';
    });
  });
}

function renderBasicPrayers() {
  const container = document.getElementById('prayersContainer');
  if (!container || !resourcesData) return;

  container.innerHTML = resourcesData.basicPrayers.map(p => `
    <article class="prayer-card card">
      <h3 style="font-size:1.2rem; color:var(--burgundy-900); margin-bottom:0.75rem;">${p.title}</h3>
      ${p.latin ? `<div class="prayer-latin">${p.latin}</div>` : ''}
      <div class="prayer-english">${p.english.replace(/\n/g, '<br>')}</div>
    </article>
  `).join('');
}

function initRosarySelector() {
  const mysteryBtns = document.querySelectorAll('.mystery-select-btn');
  const container = document.getElementById('mysteryDisplayContainer');

  if (!mysteryBtns.length || !container) return;

  function renderMysterySet(setName) {
    if (!resourcesData || !resourcesData.holyRosary) return;
    const mSet = resourcesData.holyRosary.mysteries.find(m => m.set.toLowerCase().includes(setName.toLowerCase()));
    if (!mSet) return;

    container.innerHTML = `
      <div style="background:var(--burgundy-900); color:#FFFDF8; padding:1.25rem 1.5rem; border-radius:var(--radius-sm); margin-bottom:1.5rem; border-left:5px solid var(--gold-500);">
        <h3 style="color:var(--gold-300); font-size:1.35rem; margin-bottom:0.25rem;">${mSet.set}</h3>
        <p style="font-size:0.875rem; color:var(--gold-200);"><strong>Traditionally Prayed On:</strong> ${mSet.days}</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:1rem;">
        ${mSet.items.map(item => `
          <div class="mystery-decade-card">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem; flex-wrap:wrap; gap:0.5rem;">
              <strong style="color:var(--burgundy-800); font-size:1.05rem;">${item.decade} Decade: ${item.title}</strong>
              <span class="badge badge-gold">Fruit: ${item.fruit}</span>
            </div>
            <p style="font-size:0.875rem; color:var(--text-muted);">
              <strong>📖 Scripture:</strong> ${item.scripture}
            </p>
          </div>
        `).join('')}
      </div>
    `;
  }

  mysteryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mysteryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMysterySet(btn.dataset.mystery);
    });
  });

  // Default to Joyful
  renderMysterySet('joyful');
}

function renderStations() {
  const container = document.getElementById('stationsContainer');
  if (!container || !resourcesData) return;

  container.innerHTML = resourcesData.stationsOfTheCross.map(s => `
    <div class="station-item-card">
      <div class="station-number-badge">${s.number}</div>
      <h4 style="font-size:1.1rem; color:var(--burgundy-900); margin-bottom:0.5rem;">${s.title}</h4>
      <p style="font-size:0.875rem; color:var(--text-muted); line-height:1.6;">${s.meditation}</p>
      <div style="margin-top:0.75rem; font-size:0.75rem; color:var(--gold-700); font-weight:700;">
        V. We adore Thee, O Christ, and we praise Thee. <br>
        R. Because by Thy holy cross, Thou hast redeemed the world.
      </div>
    </div>
  `).join('');
}

function renderLiturgicalSeasons() {
  const container = document.getElementById('seasonsContainer');
  if (!container || !resourcesData) return;

  container.innerHTML = resourcesData.liturgicalSeasons.map(s => `
    <div class="card" style="padding:1.5rem; margin-bottom:1.25rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem; flex-wrap:wrap; gap:0.5rem;">
        <h3 style="font-size:1.25rem; color:var(--burgundy-900);">${s.name}</h3>
        <span class="badge badge-gold">Colour: ${s.color}</span>
      </div>
      <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:0.5rem;">
        <strong>⏳ Duration:</strong> ${s.duration}
      </p>
      <p style="font-size:0.9rem; color:var(--text-main); line-height:1.6;">
        ${s.meaning}
      </p>
    </div>
  `).join('');
}
