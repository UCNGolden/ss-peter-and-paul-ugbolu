# SS Peter and Paul Catholic Church, Ugbolu
### Catholic Diocese of Issele-Uku, Delta State, Nigeria

A modern, responsive, reverent digital parish portal for **SS Peter and Paul Catholic Church, Ugbolu**, located in Delta State, Nigeria, under the episcopal care of the **Catholic Diocese of Issele-Uku** (Most Rev. Dr. Michael Odogwu Elue).

> **Important Demonstration Notice:**  
> This website is a demonstration project structured as a parish communication portal. Sample weekly bulletins, schedules, announcements, clergy profiles, and contact details are clearly labeled demonstration data designed to be easily replaced with verified parish information.

---

## 🏛️ Church Identity & Diocesan Affiliation

- **Parish Name:** SS Peter and Paul Catholic Church, Ugbolu
- **Denomination:** Roman Catholic Church
- **Diocese:** Catholic Diocese of Issele-Uku
- **Bishop:** Most Rev. Dr. Michael Odogwu Elue
- **Deanery:** Asaba Deanery
- **Location:** Along Ugbolu-Illah Road, Ugbolu, Oshimili North LGA, Delta State, Nigeria
- **Patron Saints:** Saints Peter and Paul, Apostles (Feast Day: June 29)
- **Parish Motto:** *Tu Es Petrus • Gratia et Veritas* (You Are Peter • Grace and Truth)
- **Liturgical Colour Scheme:** Catholic-inspired liturgical burgundy (`#6B1D2F`), gold (`#D4AF37`), warm cream (`#FDFBF7`), and white tones.

---

## 📖 Key Pages & Features

1. **Home (`index.html`):**
   - Welcoming hero with diocesan affiliation, parish theme, and Matthew 16:18 scriptural banner.
   - Quick Mass schedules strip (Sunday dawn, high mass, youth mass, daily Masses, confession, adoration).
   - Welcome message and parish pastoral invitation.
   - Preview of the latest digital weekly bulletin.
   - Upcoming liturgical feasts and celebrations highlights.
   - Latest parish notices, wedding banns preview, and quick navigation cards.

2. **About Our Parish (`about.html`):**
   - Parish history, founding roots in Ugbolu community, and spiritual growth.
   - Mission, Vision, and Core Pillars of Faith.
   - Diocesan affiliation with the Catholic Diocese of Issele-Uku and Bishop Michael Elue.
   - Clergy profiles (Rev. Fr. Emmanuel Okonkwo - Parish Priest, Rev. Fr. Augustine Nwabuokei - Assistant Priest).
   - Pastoral staff and Parish Pastoral Council (PPC) leadership.
   - Theological significance of patron saints Peter and Paul.

3. **Weekly Parish Bulletin (`bulletin.html`):**
   - Dedicated digital bulletin viewer with 4 sample weekly bulletins (33rd Sunday in Ordinary Time, Christ the King, 1st Sunday of Advent, 2nd Sunday of Advent).
   - Liturgical Sunday details, lectionary readings, priest's reflection, Mass intentions, notices, society updates, and reminders.
   - Search archive by date, reading, or keyword.
   - Issue selector dropdown and archive list.
   - **Print-Ready Leaflet Layout:** Optimized `@media print` stylesheet for standard A4/letter double-sided bulletin printing.
   - One-click text bulletin download (`.txt`).

4. **Church Calendar (`calendar.html`):**
   - Interactive Catholic liturgical calendar.
   - Toggle between **Monthly Calendar Grid** and **Agenda / List View**.
   - Catholic liturgical seasons (Ordinary Time, Advent, Christmas, Lent, Easter).
   - Filter by category: Solemnities & Feasts, Holy Masses & Adoration, Sacraments, Parish Gatherings.
   - Month navigation (Previous, Next, Today).
   - Accessible `<dialog>` event modal with celebration details and **Add to Calendar (.ics)** export.

5. **Mass & Sacraments (`masses-sacraments.html`):**
   - Comprehensive Mass timetables (Sunday Masses, Daily Masses, Saturdays, Holy Days of Obligation, Confessions, Adoration).
   - The Seven Sacraments: Baptism, Confirmation, Holy Eucharist, Reconciliation, Anointing of the Sick, Holy Matrimony, and Holy Orders.
   - Biblical references, sacramental meanings, canonical requirements, and interactive enquiry modals.

6. **Parish Ministries & Societies (`ministries.html`):**
   - Detailed cards for Catholic Men Organisation (CMO), Catholic Women Organisation (CWO), Catholic Youth Organisation of Nigeria (CYON), Altar Servers Guild (St. Tarcisius), Legion of Mary, St. Cecilia Parish Choir, Lectors Ministry, Society of St. Vincent de Paul (SSVP), and Parish Pastoral Council (PPC).
   - Meeting schedules, locations, patron saints, mottos, and "Join Ministry" interactive modal.

7. **Announcements & News (`announcements.html`):**
   - Filterable notices: Wedding Banns, Liturgical Feasts, Sacraments, Diocesan News, Condolences & Funerals, Charity Outreach, and Building Projects.
   - Real-time search filter and priority badges.

8. **Catholic Resources (`resources.html`):**
   - Basic Catholic prayers with Latin and English translations.
   - The Holy Rosary: Joyful, Luminous, Sorrowful, and Glorious mysteries with scriptural readings and spiritual fruits.
   - Chaplet of the Divine Mercy step-by-step recitation guide.
   - Stations of the Cross (14 traditional stations with prayers).
   - Examination of Conscience for Confession (Ten Commandments).
   - Liturgical seasons and vestment colours explained.

9. **Photo Gallery (`gallery.html`):**
   - Responsive photo gallery featuring 12 high-resolution SVG visual assets depicting church architecture, Holy Mass elevation, Eucharistic procession, choir, altar servers, CWO thanksgiving, youth fellowships, and perpetual adoration.
   - Accessible lightbox viewer modal with previous/next controls and keyboard arrow navigation.

10. **Contact & Visit Us (`contact.html`):**
    - Physical address on Ugbolu-Illah Road, Ugbolu, Delta State.
    - Telephone and email placeholders.
    - WhatsApp pastoral enquiry button (`wa.me`).
    - Styled vector map guide and directions from Asaba.
    - Validated contact and enquiry form with reference number generator and WhatsApp referral.
    - Visitor etiquette and Mass expectation guidelines.

---

## 🛠️ Technical Implementation

- **Pure Modern Web Standards:** Semantic HTML5, CSS3 with custom properties, vanilla ES6+ JavaScript.
- **Zero Build Friction:** No complex bundling or Node server required to serve the site. Runs immediately in any browser and deploys seamlessly directly to branch-based GitHub Pages.
- **Modern Web Guidance Adherence:**
  - Native `<dialog>` elements for modals with `dialog:modal { overscroll-behavior: contain; }` and `dialog::backdrop { overflow: hidden; overscroll-behavior: contain; }`.
  - Accessible light dismiss detection and keyboard `Esc` handling.
  - Native drawer with focus containment and inert background.
- **Data-Driven Architecture:** All sample bulletins, calendar events, announcements, ministries, sacraments, and prayers are managed in clean JSON files inside the `data/` directory.

---

## 📁 Project Structure

```
ss-peter-and-paul-ugbolu/
├── index.html                   # Home Page
├── about.html                   # About Parish, History, Clergy, Patron Saints
├── bulletin.html                # Weekly Parish Bulletin (Viewer, Archive, Print)
├── calendar.html                # Liturgical Calendar (Month & Agenda Views)
├── masses-sacraments.html       # Mass Schedules & The Seven Sacraments
├── ministries.html              # Parish Societies (CMO, CWO, CYON, etc.)
├── announcements.html           # Parish Notices & Wedding Banns
├── resources.html               # Catholic Prayers, Rosary, Divine Mercy
├── gallery.html                 # Photo Gallery & Lightbox Viewer
├── contact.html                 # Contact, Visit Us, Map, Enquiry Form
├── favicon.svg                  # Vector Favicon (Keys & Sword)
├── css/
│   ├── style.css                # Base styles, typography, header, footer, drawer
│   ├── components.css           # Cards, buttons, badges, modals, forms
│   ├── pages.css                # Page-specific layouts (calendar, bulletin sheet)
│   └── print.css                # Print-optimized stylesheet for parish leaflet
├── js/
│   ├── app.js                   # Navigation drawer, toast, dialog dismiss
│   ├── bulletin.js              # Bulletin viewer, issue switcher, print & download
│   ├── calendar.js              # Interactive month/agenda calendar engine
│   ├── announcements.js         # Notices search and category filtering
│   ├── gallery.js               # Gallery rendering & lightbox viewer
│   ├── resources.js             # Prayers, Rosary mystery selector, tabs
│   └── contact.js               # Validated contact form & WhatsApp link generator
├── data/
│   ├── bulletins.json           # 4 complete weekly sample bulletins
│   ├── calendar.json            # Liturgical events and feast days
│   ├── announcements.json       # Parish announcements and wedding banns
│   ├── ministries.json          # Parish societies details
│   ├── sacraments.json          # 7 Sacraments guide and requirements
│   ├── clergy.json              # Clergy and pastoral council data
│   └── resources.json           # Prayers, Rosary mysteries, Divine Mercy
└── assets/
    └── images/                  # High-resolution vector illustrations & badges
```

---

## 🔄 How Parish Administrators Can Update Content

1. **Adding a New Bulletin:**
   Open `data/bulletins.json` and add a new JSON object at the end of the array with the week's date, lectionary readings, priest's reflection, and intentions. Set `"isLatest": true` on the new issue and `"isLatest": false` on the previous issue.

2. **Adding an Event to the Calendar:**
   Open `data/calendar.json` and add an event object with `"date": "YYYY-MM-DD"`, `"title"`, `"time"`, `"location"`, and `"liturgicalColor"`.

3. **Publishing Announcements or Wedding Banns:**
   Open `data/announcements.json` and add an entry under the appropriate category (`"banns"`, `"liturgical"`, `"sacramental"`, `"general"`, etc.).

4. **Updating Official Parish Contacts:**
   Open `contact.html` and `data/clergy.json` to replace the placeholder phone numbers, emails, and office hours with verified parish contact numbers.
