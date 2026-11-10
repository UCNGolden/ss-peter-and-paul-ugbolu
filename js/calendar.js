/**
 * js/calendar.js
 * Interactive Catholic Liturgical Calendar Engine & Event Modal
 * SS Peter and Paul Catholic Church, Ugbolu
 */

let calendarEvents = [];
let currentDate = new Date(2026, 10, 15); // Start at November 2026 for rich sample data
let currentView = 'grid'; // 'grid' | 'agenda'
let activeCategory = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  await loadCalendarEvents();
  initCalendarControls();
  renderCalendar();
});

async function loadCalendarEvents() {
  try {
    const res = await fetch('data/calendar.json');
    if (!res.ok) throw new Error('Failed to load calendar events');
    calendarEvents = await res.json();
  } catch (err) {
    console.error('Error loading calendar events:', err);
  }
}

function initCalendarControls() {
  const prevBtn = document.getElementById('prevMonthBtn');
  const nextBtn = document.getElementById('nextMonthBtn');
  const todayBtn = document.getElementById('todayBtn');
  const gridViewBtn = document.getElementById('gridViewBtn');
  const agendaViewBtn = document.getElementById('agendaViewBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
  }

  if (todayBtn) {
    todayBtn.addEventListener('click', () => {
      currentDate = new Date(2026, 10, 15);
      renderCalendar();
    });
  }

  if (gridViewBtn && agendaViewBtn) {
    gridViewBtn.addEventListener('click', () => {
      currentView = 'grid';
      gridViewBtn.classList.add('active');
      agendaViewBtn.classList.remove('active');
      renderCalendar();
    });

    agendaViewBtn.addEventListener('click', () => {
      currentView = 'agenda';
      agendaViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
      renderCalendar();
    });
  }

  // Category filter pills
  const filterPills = document.querySelectorAll('.calendar-filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.category || 'all';
      renderCalendar();
    });
  });

  // Modal Close Button
  const modalCloseBtn = document.getElementById('closeEventModalBtn');
  const eventModal = document.getElementById('eventModal');
  if (modalCloseBtn && eventModal) {
    modalCloseBtn.addEventListener('click', () => {
      eventModal.close();
    });
  }
}

function renderCalendar() {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const labelElem = document.getElementById('currentMonthLabel');
  if (labelElem) {
    labelElem.textContent = `${monthNames[month]} ${year}`;
  }

  // Filter events by active category
  let filteredEvents = calendarEvents;
  if (activeCategory !== 'all') {
    if (activeCategory === 'solemnities') {
      filteredEvents = calendarEvents.filter(e => e.category === 'solemnities' || e.category === 'feasts');
    } else {
      filteredEvents = calendarEvents.filter(e => e.category === activeCategory);
    }
  }

  const container = document.getElementById('calendarDisplayArea');
  if (!container) return;

  if (currentView === 'grid') {
    renderGridView(container, year, month, filteredEvents);
  } else {
    renderAgendaView(container, filteredEvents);
  }
}

function renderGridView(container, year, month, events) {
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  let html = `
    <div class="calendar-grid-wrap">
      <div class="calendar-weekdays">
        <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
      </div>
      <div class="calendar-days-grid">
  `;

  // Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    html += `
      <div class="calendar-day-cell other-month">
        <div class="day-header"><span class="day-number">${d}</span></div>
      </div>
    `;
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEvents = events.filter(e => e.date === formattedDate);
    const isToday = (day === 15 && month === 10 && year === 2026);

    html += `
      <div class="calendar-day-cell ${isToday ? 'is-today' : ''}">
        <div class="day-header">
          <span class="day-number">${day}</span>
          ${isToday ? '<span class="badge badge-gold" style="font-size:0.6rem; padding:0.1rem 0.35rem;">TODAY</span>' : ''}
        </div>
        <div class="calendar-events-container">
          ${dayEvents.map(evt => {
            let pillColor = 'pill-green';
            if (evt.liturgicalColor.toLowerCase().includes('purple') || evt.liturgicalColor.toLowerCase().includes('violet')) pillColor = 'pill-purple';
            if (evt.liturgicalColor.toLowerCase().includes('white') || evt.liturgicalColor.toLowerCase().includes('gold')) pillColor = 'pill-white';
            if (evt.liturgicalColor.toLowerCase().includes('red')) pillColor = 'pill-red';

            return `
              <div class="cal-event-pill ${pillColor}" onclick="openEventModal('${evt.id}')" title="${evt.title} (${evt.time})">
                ${evt.title}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // Next month leading days to complete grid (6 rows = 42 cells)
  const totalCells = firstDayIndex + daysInMonth;
  const nextDays = (totalCells > 35) ? (42 - totalCells) : (35 - totalCells);
  for (let j = 1; j <= nextDays; j++) {
    html += `
      <div class="calendar-day-cell other-month">
        <div class="day-header"><span class="day-number">${j}</span></div>
      </div>
    `;
  }

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function renderAgendaView(container, events) {
  // Sort events chronologically
  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  if (sorted.length === 0) {
    container.innerHTML = `
      <div class="card" style="padding: 3rem; text-align: center;">
        <h4 style="color:var(--burgundy-800); margin-bottom:0.5rem;">No events found in this category</h4>
        <p style="color:var(--text-muted);">Please select a different category filter or view all events.</p>
      </div>
    `;
    return;
  }

  let html = `<div class="agenda-view-container">`;

  sorted.forEach(evt => {
    const d = new Date(evt.date);
    const dayNum = d.getDate();
    const monthShort = d.toLocaleString('en-US', { month: 'short' });
    const dayOfWeek = d.toLocaleString('en-US', { weekday: 'short' });

    let badgeClass = 'badge-green';
    if (evt.liturgicalColor.toLowerCase().includes('purple') || evt.liturgicalColor.toLowerCase().includes('violet')) badgeClass = 'badge-purple';
    if (evt.liturgicalColor.toLowerCase().includes('white') || evt.liturgicalColor.toLowerCase().includes('gold')) badgeClass = 'badge-gold';
    if (evt.liturgicalColor.toLowerCase().includes('red')) badgeClass = 'badge-red';

    html += `
      <div class="agenda-date-card">
        <div class="agenda-date-badge">
          <div class="agenda-date-month">${monthShort} • ${dayOfWeek}</div>
          <div class="agenda-date-num">${dayNum}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${d.getFullYear()}</div>
        </div>

        <div>
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.35rem; flex-wrap:wrap;">
            <span class="badge ${badgeClass}">${evt.liturgicalColor}</span>
            <span class="badge" style="background:#F1F5F9; color:#475569; border:1px solid #CBD5E1;">${evt.liturgicalSeason}</span>
            ${evt.isFeatured ? '<span class="badge badge-gold">Feast Celebration</span>' : ''}
          </div>
          <h3 style="font-size:1.2rem; color:var(--burgundy-900); margin-bottom:0.25rem;">${evt.title}</h3>
          <p style="font-size:0.875rem; color:var(--text-muted); margin-bottom:0.35rem;">
            <strong>⏰ Time:</strong> ${evt.time} &nbsp;|&nbsp; <strong>📍 Location:</strong> ${evt.location}
          </p>
          <p style="font-size:0.85rem; color:var(--text-main);">${evt.description}</p>
        </div>

        <div>
          <button class="btn btn-sm btn-burgundy" onclick="openEventModal('${evt.id}')">
            View Details
          </button>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

window.openEventModal = function(eventId) {
  const evt = calendarEvents.find(e => e.id === eventId);
  if (!evt) return;

  const modal = document.getElementById('eventModal');
  const titleElem = document.getElementById('eventModalTitle');
  const bodyElem = document.getElementById('eventModalBody');

  if (!modal || !titleElem || !bodyElem) return;

  titleElem.textContent = evt.title;
  bodyElem.innerHTML = `
    <div style="margin-bottom:1.25rem; display:flex; gap:0.5rem; flex-wrap:wrap;">
      <span class="badge badge-gold">${evt.liturgicalSeason}</span>
      <span class="badge badge-demo">Demo Liturgical Entry</span>
    </div>

    <div style="background:var(--cream-100); border:1px solid var(--border-light); border-radius:var(--radius-sm); padding:1.25rem; margin-bottom:1.5rem;">
      <div style="margin-bottom:0.75rem;"><strong>📅 Date:</strong> ${evt.date}</div>
      <div style="margin-bottom:0.75rem;"><strong>⏰ Time:</strong> ${evt.time}</div>
      <div style="margin-bottom:0.75rem;"><strong>📍 Location:</strong> ${evt.location}</div>
      <div style="margin-bottom:0.75rem;"><strong>🎨 Liturgical Vestment Colour:</strong> ${evt.liturgicalColor}</div>
      <div><strong>🏛️ Parish:</strong> SS Peter and Paul Catholic Church, Ugbolu</div>
    </div>

    <div style="margin-bottom:1.5rem;">
      <h4 style="font-size:1rem; color:var(--burgundy-800); margin-bottom:0.5rem;">Celebration Details</h4>
      <p style="font-size:0.925rem; line-height:1.6; color:var(--text-main);">${evt.description}</p>
    </div>

    <div style="display:flex; justify-content:flex-end; gap:0.75rem; margin-top:1.5rem; border-top:1px solid var(--border-light); padding-top:1.25rem;">
      <button class="btn btn-sm btn-outline-burgundy" onclick="document.getElementById('eventModal').close()">Close</button>
      <button class="btn btn-sm btn-gold" onclick="exportEventToICS('${evt.id}')">📅 Add to My Calendar (.ics)</button>
    </div>
  `;

  modal.showModal();
};

window.exportEventToICS = function(eventId) {
  const evt = calendarEvents.find(e => e.id === eventId);
  if (!evt) return;

  const dateParts = evt.date.split('-');
  const y = dateParts[0];
  const m = dateParts[1];
  const d = dateParts[2];
  const dtStart = `${y}${m}${d}T090000Z`;
  const dtEnd = `${y}${m}${d}T110000Z`;

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SS Peter and Paul Catholic Church Ugbolu//Parish Calendar//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${evt.title}
DESCRIPTION:${evt.description.replace(/\n/g, ' ')}
LOCATION:${evt.location}, SS Peter & Paul Catholic Church, Ugbolu, Delta State
DTSTART:${dtStart}
DTEND:${dtEnd}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${evt.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  if (window.showToast) window.showToast('Event calendar file generated (.ics)', 'success');
};
