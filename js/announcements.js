/**
 * js/announcements.js
 * Announcements and Parish News Filtering, Search and Details
 * SS Peter and Paul Catholic Church, Ugbolu
 */

let announcementsData = [];
let activeCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  await loadAnnouncements();
  initAnnouncementControls();
  renderAnnouncements();
});

async function loadAnnouncements() {
  try {
    const res = await fetch('data/announcements.json');
    if (!res.ok) throw new Error('Failed to load announcements');
    announcementsData = await res.json();
  } catch (err) {
    console.error('Error loading announcements:', err);
  }
}

function initAnnouncementControls() {
  const searchInput = document.getElementById('announcementSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderAnnouncements(e.target.value.toLowerCase().trim());
    });
  }

  const pills = document.querySelectorAll('.announcement-filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.category || 'all';
      renderAnnouncements();
    });
  });
}

function renderAnnouncements(searchTerm = '') {
  const container = document.getElementById('announcementsContainer');
  if (!container) return;

  let filtered = announcementsData;

  if (activeCategory !== 'all') {
    filtered = filtered.filter(a => a.category === activeCategory);
  }

  if (searchTerm) {
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(searchTerm) ||
      a.content.toLowerCase().includes(searchTerm) ||
      a.summary.toLowerCase().includes(searchTerm)
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="card" style="padding: 3rem; text-align: center; grid-column: 1 / -1;">
        <h4 style="color:var(--burgundy-800); margin-bottom:0.5rem;">No notices found</h4>
        <p style="color:var(--text-muted);">Try selecting another category or clearing your search query.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(ann => `
    <article class="card announcement-card ${ann.isUrgent ? 'urgent' : ''} ${ann.category === 'banns' ? 'banns' : ''}">
      <div class="card-body">
        <div class="announcement-header">
          <div>
            <span class="badge ${ann.isUrgent ? 'badge-red' : ann.category === 'banns' ? 'badge-gold' : 'badge-purple'}">
              ${ann.badge}
            </span>
          </div>
          <span class="announcement-date">📅 ${ann.date}</span>
        </div>

        <h3 class="announcement-title">${ann.title}</h3>
        <p class="announcement-content">${ann.content}</p>

        <div style="font-size:0.8rem; color:var(--gold-700); font-weight:700; margin-top:0.75rem; border-top:1px dashed var(--border-light); padding-top:0.5rem;">
          Inquiries: ${ann.contactPerson}
        </div>
      </div>
    </article>
  `).join('');
}
