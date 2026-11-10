/**
 * js/bulletin.js
 * Digital Weekly Parish Bulletin Viewer, Selector, Search & Print Engine
 * SS Peter and Paul Catholic Church, Ugbolu
 */

let allBulletins = [];
let activeBulletin = null;

document.addEventListener('DOMContentLoaded', async () => {
  await loadBulletins();
  initBulletinControls();
});

async function loadBulletins() {
  try {
    const res = await fetch('data/bulletins.json');
    if (!res.ok) throw new Error('Failed to load bulletins data');
    allBulletins = await res.json();

    // Check if an issue ID was passed in URL query param ?issue=...
    const urlParams = new URLSearchParams(window.location.search);
    const queryIssue = urlParams.get('issue');

    if (queryIssue) {
      activeBulletin = allBulletins.find(b => b.id === queryIssue) || allBulletins[allBulletins.length - 1];
    } else {
      // Default to latest
      activeBulletin = allBulletins.find(b => b.isLatest) || allBulletins[allBulletins.length - 1];
    }

    populateSelector();
    renderArchiveList();
    renderBulletin(activeBulletin);
  } catch (err) {
    console.error('Error loading bulletins:', err);
    const container = document.getElementById('bulletinContainer');
    if (container) {
      container.innerHTML = `
        <div class="card" style="padding: 2.5rem; text-align: center;">
          <h3 style="color:var(--burgundy-800); margin-bottom:0.75rem;">Unable to load bulletin</h3>
          <p style="color:var(--text-muted);">Please check your connection or refresh the page.</p>
        </div>
      `;
    }
  }
}

function populateSelector() {
  const select = document.getElementById('bulletinSelect');
  if (!select) return;

  select.innerHTML = allBulletins.map(b => `
    <option value="${b.id}" ${b.id === activeBulletin.id ? 'selected' : ''}>
      ${b.liturgicalSunday} (${b.displayDate}) ${b.isLatest ? '— [LATEST ISSUE]' : ''}
    </option>
  `).join('');

  select.addEventListener('change', (e) => {
    const selected = allBulletins.find(b => b.id === e.target.value);
    if (selected) {
      activeBulletin = selected;
      renderBulletin(selected);
      // update URL state without page reload
      const newUrl = new URL(window.location);
      newUrl.searchParams.set('issue', selected.id);
      window.history.replaceState({}, '', newUrl);
    }
  });
}

function initBulletinControls() {
  const printBtn = document.getElementById('printBulletinBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const downloadBtn = document.getElementById('downloadBulletinBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      downloadBulletinText(activeBulletin);
    });
  }

  // Bulletin Search / Filter
  const searchInput = document.getElementById('bulletinSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterBulletins(e.target.value.toLowerCase().trim());
    });
  }
}

function renderBulletin(bulletin) {
  const container = document.getElementById('bulletinContainer');
  if (!container || !bulletin) return;

  // Determine liturgical color class
  let colorClass = 'liturgy-green';
  if (bulletin.liturgicalColor.toLowerCase().includes('violet') || bulletin.liturgicalColor.toLowerCase().includes('purple')) {
    colorClass = 'liturgy-purple';
  } else if (bulletin.liturgicalColor.toLowerCase().includes('white') || bulletin.liturgicalColor.toLowerCase().includes('gold')) {
    colorClass = 'liturgy-white';
  }

  const readings = bulletin.readings;
  const reflection = bulletin.pastoralReflection;

  container.innerHTML = `
    <article class="bulletin-sheet" id="printSheet">
      <!-- Demo Disclaimer Alert inside bulletin -->
      <div class="badge badge-demo" style="width: 100%; justify-content: center; margin-bottom: 1.5rem; padding: 0.5rem;">
        ★ DEMONSTRATION CONTENT: Sample parish weekly publication for SS Peter and Paul, Ugbolu ★
      </div>

      <!-- Masthead -->
      <header class="bulletin-masthead">
        <div class="bulletin-crest-wrap">
          <img src="assets/images/church-crest.svg" alt="SS Peter & Paul Catholic Church Crest" width="76" height="76">
        </div>
        <h1 class="bulletin-masthead-title">SS PETER AND PAUL CATHOLIC CHURCH</h1>
        <p class="bulletin-masthead-sub">CATHOLIC DIOCESE OF ISSELE-UKU, DELTA STATE, NIGERIA</p>
        <p class="bulletin-masthead-location">Ugbolu Parish Pastoral Centre • Founded in Faith, Rock of Truth</p>
        
        <div class="bulletin-info-bar">
          <span><strong>Issue:</strong> ${bulletin.issueNumber}</span>
          <span><strong>Date:</strong> ${bulletin.displayDate}</span>
          <span><strong>Liturgical Colour:</strong> <span class="badge ${colorClass.replace('liturgy-', 'badge-')}">${bulletin.liturgicalColor}</span></span>
        </div>
      </header>

      <!-- Liturgical Banner -->
      <div class="bulletin-liturgy-banner ${colorClass}">
        <div>
          <div class="liturgy-sunday-name">${bulletin.liturgicalSunday}</div>
          <div class="liturgy-theme">Theme: "${bulletin.liturgicalTheme}"</div>
        </div>
        <div>
          ${bulletin.isLatest ? '<span class="badge badge-gold" style="font-size:0.8rem;">Current Issue</span>' : ''}
        </div>
      </div>

      <!-- Dual Column Bulletin Layout -->
      <div class="bulletin-grid">
        <!-- LEFT COLUMN: Sacred Liturgy & Reflection -->
        <div class="bulletin-col-left">
          <!-- Liturgical Readings -->
          <section class="bulletin-section">
            <h2 class="bulletin-section-title">
              <span>Order of the Liturgy of the Word</span>
              <span style="font-size:0.8rem; color:var(--gold-700);">Lectionary</span>
            </h2>
            <div class="readings-card">
              <div class="reading-row">
                <div class="reading-tag">First Reading</div>
                <div class="reading-ref">${readings.firstReading.reference}</div>
                <div class="reading-summary">"${readings.firstReading.title}"</div>
              </div>
              <div class="reading-row">
                <div class="reading-tag">Responsorial Psalm</div>
                <div class="reading-ref">${readings.psalm.reference}</div>
                <div class="reading-summary"><strong>℟:</strong> ${readings.psalm.response}</div>
              </div>
              <div class="reading-row">
                <div class="reading-tag">Second Reading</div>
                <div class="reading-ref">${readings.secondReading.reference}</div>
                <div class="reading-summary">"${readings.secondReading.title}"</div>
              </div>
              <div class="reading-row">
                <div class="reading-tag">Gospel Acclamation</div>
                <div class="reading-summary">"${readings.gospelAcclamation.verse}"</div>
              </div>
              <div class="reading-row">
                <div class="reading-tag">The Holy Gospel</div>
                <div class="reading-ref">${readings.gospel.reference}</div>
                <div class="reading-summary">"${readings.gospel.title}"</div>
              </div>
            </div>
          </section>

          <!-- Pastoral Reflection -->
          <section class="bulletin-section">
            <h2 class="bulletin-section-title">
              <span>Pastoral Reflection</span>
              <span style="font-size:0.8rem; color:var(--burgundy-700);">Priest's Desk</span>
            </h2>
            <div class="pastoral-reflection-box">
              <h3 class="reflection-title">${reflection.title}</h3>
              <span class="reflection-author">${reflection.author} — ${reflection.role}</span>
              <div class="reflection-text">
                ${reflection.content.map(p => `<p>${p}</p>`).join('')}
              </div>
            </div>
          </section>

          <!-- Sacramental Notices -->
          <section class="bulletin-section">
            <h2 class="bulletin-section-title">
              <span>Sacramental Life</span>
            </h2>
            <div class="card" style="padding:1.25rem;">
              <ul style="padding-left:1.25rem; font-size:0.875rem; color:var(--text-muted); line-height:1.6;">
                ${bulletin.sacramentalNotices.map(n => `<li style="margin-bottom:0.5rem;">${n}</li>`).join('')}
              </ul>
            </div>
          </section>
        </div>

        <!-- RIGHT COLUMN: Schedules, Intentions, Announcements -->
        <div class="bulletin-col-right">
          <!-- Mass Schedule -->
          <section class="bulletin-section">
            <h2 class="bulletin-section-title">
              <span>Parish Mass Timetable</span>
            </h2>
            <div class="card" style="padding:1.25rem;">
              ${bulletin.massSchedules.map(s => `
                <div class="mass-item">
                  <div class="mass-time">${s.time}</div>
                  <div class="mass-desc">
                    <strong>${s.day}</strong> — ${s.type}
                  </div>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Mass Intentions for the Week -->
          <section class="bulletin-section">
            <h2 class="bulletin-section-title">
              <span>Weekly Mass Intentions</span>
              <span style="font-size:0.75rem; color:var(--gold-700);">Missa Pro Populo</span>
            </h2>
            <div class="card" style="padding:1.25rem;">
              ${bulletin.massIntentions.map(grp => `
                <div class="intentions-group">
                  <div class="intentions-mass-title">${grp.mass}</div>
                  <ul class="intentions-list">
                    ${grp.intentions.map(i => `<li>${i}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Announcements -->
          <section class="bulletin-section">
            <h2 class="bulletin-section-title">
              <span>Parish Notices & Announcements</span>
            </h2>
            <div style="display:flex; flex-direction:column; gap:1rem;">
              ${bulletin.announcements.map(ann => `
                <div class="announcement-card card" style="padding:1rem;">
                  <h4 style="font-size:0.95rem; color:var(--burgundy-900); margin-bottom:0.35rem;">${ann.title}</h4>
                  <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">${ann.body}</p>
                </div>
              `).join('')}
            </div>
          </section>

          <!-- Society Updates & Reminders -->
          <section class="bulletin-section">
            <h2 class="bulletin-section-title">
              <span>Society Updates & Reminders</span>
            </h2>
            <div class="card" style="padding:1.25rem;">
              ${bulletin.societyUpdates.map(s => `
                <div style="margin-bottom:0.85rem; padding-bottom:0.85rem; border-bottom:1px dashed var(--border-light);">
                  <strong style="color:var(--burgundy-800); font-size:0.875rem;">${s.society}:</strong>
                  <p style="font-size:0.825rem; color:var(--text-muted); margin-top:0.2rem;">${s.message}</p>
                </div>
              `).join('')}
              <div style="margin-top:0.75rem; background:var(--cream-100); padding:0.75rem; border-radius:var(--radius-sm);">
                <strong style="font-size:0.8rem; color:var(--burgundy-900); text-transform:uppercase;">Parish Reminders:</strong>
                <ul style="padding-left:1.25rem; font-size:0.8rem; color:var(--text-muted); margin-top:0.35rem;">
                  ${bulletin.reminders.map(r => `<li>${r}</li>`).join('')}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  `;
}

function renderArchiveList() {
  const archiveList = document.getElementById('bulletinArchiveList');
  if (!archiveList) return;

  archiveList.innerHTML = allBulletins.map(b => `
    <div class="card" style="padding:1.25rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
      <div>
        <span class="badge ${b.liturgicalColor.toLowerCase().includes('green') ? 'badge-green' : b.liturgicalColor.toLowerCase().includes('violet') ? 'badge-purple' : 'badge-gold'}" style="margin-bottom:0.35rem;">
          ${b.liturgicalSunday}
        </span>
        <h4 style="font-size:1.05rem; color:var(--burgundy-900); margin-bottom:0.25rem;">
          ${b.pastoralReflection.title}
        </h4>
        <p style="font-size:0.825rem; color:var(--text-muted);">
          Date: ${b.displayDate} • Issue: ${b.issueNumber}
        </p>
      </div>
      <div style="display:flex; gap:0.5rem;">
        <button class="btn btn-sm btn-burgundy" onclick="selectBulletinById('${b.id}')">
          View Bulletin
        </button>
      </div>
    </div>
  `).join('');
}

window.selectBulletinById = function(id) {
  const selected = allBulletins.find(b => b.id === id);
  if (selected) {
    activeBulletin = selected;
    renderBulletin(selected);
    const select = document.getElementById('bulletinSelect');
    if (select) select.value = id;
    
    // Smooth scroll to top of bulletin
    const elem = document.getElementById('bulletinContainer');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    
    // Update URL
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('issue', selected.id);
    window.history.replaceState({}, '', newUrl);
  }
};

function filterBulletins(term) {
  if (!term) {
    renderArchiveList();
    return;
  }
  const filtered = allBulletins.filter(b => 
    b.liturgicalSunday.toLowerCase().includes(term) ||
    b.pastoralReflection.title.toLowerCase().includes(term) ||
    b.pastoralReflection.content.some(c => c.toLowerCase().includes(term)) ||
    b.announcements.some(a => a.title.toLowerCase().includes(term) || a.body.toLowerCase().includes(term))
  );

  const archiveList = document.getElementById('bulletinArchiveList');
  if (archiveList) {
    if (filtered.length === 0) {
      archiveList.innerHTML = `<p style="padding:1.5rem; text-align:center; color:var(--text-muted);">No bulletin issues found matching "${term}".</p>`;
    } else {
      archiveList.innerHTML = filtered.map(b => `
        <div class="card" style="padding:1.25rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <span class="badge badge-gold" style="margin-bottom:0.35rem;">${b.liturgicalSunday}</span>
            <h4 style="font-size:1.05rem; color:var(--burgundy-900);">${b.pastoralReflection.title}</h4>
            <p style="font-size:0.825rem; color:var(--text-muted);">${b.displayDate}</p>
          </div>
          <button class="btn btn-sm btn-burgundy" onclick="selectBulletinById('${b.id}')">View</button>
        </div>
      `).join('');
    }
  }
}

function downloadBulletinText(bulletin) {
  if (!bulletin) return;
  const content = `
SS PETER AND PAUL CATHOLIC CHURCH, UGBOLU
CATHOLIC DIOCESE OF ISSELE-UKU, DELTA STATE, NIGERIA
======================================================
WEEKLY PARISH BULLETIN (DEMONSTRATION CONTENT)
Issue: ${bulletin.issueNumber}
Date: ${bulletin.displayDate}
Liturgical Sunday: ${bulletin.liturgicalSunday}
Liturgical Colour: ${bulletin.liturgicalColor}
Theme: ${bulletin.liturgicalTheme}

LITURGICAL READINGS:
- 1st Reading: ${bulletin.readings.firstReading.reference} ("${bulletin.readings.firstReading.title}")
- Psalm: ${bulletin.readings.psalm.reference} (R: ${bulletin.readings.psalm.response})
- 2nd Reading: ${bulletin.readings.secondReading.reference} ("${bulletin.readings.secondReading.title}")
- Gospel: ${bulletin.readings.gospel.reference} ("${bulletin.readings.gospel.title}")

PASTORAL REFLECTION:
"${bulletin.pastoralReflection.title}"
By ${bulletin.pastoralReflection.author} (${bulletin.pastoralReflection.role})
${bulletin.pastoralReflection.content.join('\n\n')}

MASS INTENTIONS:
${bulletin.massIntentions.map(m => `[${m.mass}]\n${m.intentions.map(i => ` - ${i}`).join('\n')}`).join('\n\n')}

ANNOUNCEMENTS:
${bulletin.announcements.map(a => `* ${a.title}\n  ${a.body}`).join('\n\n')}

SOCIETY UPDATES:
${bulletin.societyUpdates.map(s => `* ${s.society}: ${s.message}`).join('\n')}

======================================================
SS Peter and Paul Catholic Church, Ugbolu, Delta State
Catholic Diocese of Issele-Uku
  `.trim();

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Bulletin_${bulletin.date}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  if (window.showToast) window.showToast('Bulletin downloaded successfully', 'success');
}
