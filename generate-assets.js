// generate-assets.js
// Creates all vector illustrations and high-fidelity SVG assets for SS Peter and Paul Catholic Church, Ugbolu

const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'images');
const iconDir = path.join(__dirname, 'assets', 'icons');

if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
if (!fs.existsSync(iconDir)) fs.mkdirSync(iconDir, { recursive: true });

// 1. Church Crest / Logo
const churchCrest = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF2A3" />
      <stop offset="60%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#997300" />
    </radialGradient>
    <linearGradient id="burgundyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8B1E3F" />
      <stop offset="50%" stop-color="#6B1D2F" />
      <stop offset="100%" stop-color="#4A0E1B" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Outer Ring with Catholic Gold Border -->
  <circle cx="250" cy="250" r="236" fill="url(#burgundyGrad)" stroke="url(#goldGlow)" stroke-width="9" filter="url(#shadow)" />
  <circle cx="250" cy="250" r="222" fill="none" stroke="#D4AF37" stroke-width="2" stroke-dasharray="4,4" />
  <circle cx="250" cy="250" r="215" fill="#581423" stroke="#ECC94B" stroke-width="2" />

  <!-- Circular Text Path -->
  <path id="textCircleTop" d="M 50,250 A 200,200 0 0,1 450,250" fill="none" />
  <path id="textCircleBottom" d="M 450,250 A 200,200 0 0,1 50,250" fill="none" />

  <text fill="#FFF4D0" font-family="'Cinzel', Georgia, serif" font-size="21" font-weight="700" letter-spacing="3.5">
    <textPath href="#textCircleTop" startOffset="50%" text-anchor="middle">
      SS PETER &amp; PAUL CATHOLIC CHURCH
    </textPath>
  </text>
  <text fill="#ECC94B" font-family="'Cinzel', Georgia, serif" font-size="18" font-weight="600" letter-spacing="3">
    <textPath href="#textCircleBottom" startOffset="50%" text-anchor="middle">
      UGBOLU • DIOCESE OF ISSELE-UKU
    </textPath>
  </text>

  <!-- Central Medallion -->
  <circle cx="250" cy="250" r="148" fill="#FDFBF7" stroke="url(#goldGlow)" stroke-width="6" filter="url(#shadow)" />
  <circle cx="250" cy="250" r="141" fill="#FAF6EE" stroke="#C59B27" stroke-width="1.5" />

  <!-- Rays of Holy Spirit -->
  <g stroke="#F3E5AB" stroke-width="1.5" opacity="0.8">
    <line x1="250" y1="120" x2="250" y2="380" />
    <line x1="120" y1="250" x2="380" y2="250" />
    <line x1="158" y1="158" x2="342" y2="342" />
    <line x1="158" y1="342" x2="342" y2="158" />
  </g>

  <!-- The Papal Keys of Saint Peter (Gold & Silver crossed) -->
  <!-- Gold Key (Heavenly authority) -->
  <g transform="rotate(45 250 245)">
    <!-- Key Head -->
    <circle cx="250" cy="165" r="22" fill="none" stroke="#D4AF37" stroke-width="6"/>
    <circle cx="250" cy="165" r="10" fill="none" stroke="#D4AF37" stroke-width="3"/>
    <path d="M 247,150 L 253,150 L 253,180 L 247,180 Z" fill="#D4AF37"/>
    <!-- Key Shaft -->
    <rect x="247" y="185" width="6" height="110" fill="#D4AF37" rx="2"/>
    <!-- Key Bit (Cross-shaped) -->
    <path d="M 253,275 L 273,275 L 273,285 L 263,285 L 263,293 L 253,293 Z" fill="#D4AF37"/>
    <circle cx="250" cy="245" r="4" fill="#997300"/>
  </g>

  <!-- Silver Key / Sword of St. Paul -->
  <g transform="rotate(-45 250 245)">
    <!-- Sword Blade for St. Paul -->
    <path d="M 250,140 L 254,150 L 254,280 L 250,295 L 246,280 L 246,150 Z" fill="#C0C0C0" stroke="#718096" stroke-width="1"/>
    <line x1="250" y1="145" x2="250" y2="280" stroke="#E2E8F0" stroke-width="1.5"/>
    <!-- Crossguard -->
    <rect x="230" y="278" width="40" height="7" rx="3" fill="#D4AF37" stroke="#997300" stroke-width="1"/>
    <!-- Grip & Pommel -->
    <rect x="247" y="285" width="6" height="24" fill="#6B1D2F" rx="1"/>
    <circle cx="250" cy="314" r="8" fill="#D4AF37" stroke="#997300" stroke-width="1.5"/>
  </g>

  <!-- Central Latin Cross of Christ with Radiant Gold -->
  <g filter="url(#shadow)">
    <!-- Vertical beam -->
    <rect x="244" y="145" width="12" height="180" rx="3" fill="url(#goldGlow)" stroke="#7A5A00" stroke-width="1.5"/>
    <!-- Horizontal beam -->
    <rect x="210" y="190" width="80" height="12" rx="3" fill="url(#goldGlow)" stroke="#7A5A00" stroke-width="1.5"/>
    <!-- Center Jewel -->
    <circle cx="250" cy="196" r="6" fill="#8B1E3F" stroke="#D4AF37" stroke-width="1.5"/>
  </g>

  <!-- Open Gospel Book at Base -->
  <g transform="translate(0, 45)">
    <path d="M 205,270 Q 250,260 250,270 Q 250,260 295,270 L 295,305 Q 250,295 250,305 Q 250,295 205,305 Z" fill="#FFFDF8" stroke="#D4AF37" stroke-width="3" filter="url(#shadow)"/>
    <line x1="250" y1="268" x2="250" y2="305" stroke="#997300" stroke-width="2"/>
    <!-- Alpha and Omega -->
    <text x="227" y="292" font-family="'Cinzel', Georgia, serif" font-size="18" font-weight="700" fill="#6B1D2F">Α</text>
    <text x="268" y="292" font-family="'Cinzel', Georgia, serif" font-size="18" font-weight="700" fill="#6B1D2F">Ω</text>
  </g>

  <!-- Latin Parish Motto Ribbon -->
  <g transform="translate(0, 410)">
    <path d="M 130,10 Q 250,-10 370,10 L 355,36 Q 250,18 145,36 Z" fill="#D4AF37" stroke="#997300" stroke-width="1.5" filter="url(#shadow)"/>
    <text x="250" y="27" font-family="'Cinzel', Georgia, serif" font-size="12" font-weight="700" fill="#4A0E1B" text-anchor="middle" letter-spacing="1.5">
      TU ES PETRUS • GRATIA ET VERITAS
    </text>
  </g>
</svg>`;

// 2. Favicon
const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#6B1D2F" />
  <circle cx="32" cy="32" r="28" fill="none" stroke="#D4AF37" stroke-width="2" />
  <!-- Crossed Keys & Sword symbol -->
  <path d="M 22,18 L 42,46 M 42,18 L 22,46" stroke="#ECC94B" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Gold Cross -->
  <rect x="29" y="12" width="6" height="40" rx="1" fill="#FFF4D0" stroke="#D4AF37" stroke-width="1"/>
  <rect x="18" y="22" width="28" height="6" rx="1" fill="#FFF4D0" stroke="#D4AF37" stroke-width="1"/>
</svg>`;

// 3. Hero Visual Asset (Hero Stained Glass & Cathedral Elegance)
const heroStainedGlass = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1A0B16" />
      <stop offset="40%" stop-color="#3D1221" />
      <stop offset="80%" stop-color="#581628" />
      <stop offset="100%" stop-color="#22060F" />
    </linearGradient>
    <radialGradient id="roseGlow" cx="50%" cy="32%" r="45%">
      <stop offset="0%" stop-color="#FFEFA8" stop-opacity="0.9" />
      <stop offset="25%" stop-color="#ECC94B" stop-opacity="0.6" />
      <stop offset="60%" stop-color="#80182A" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#1A0B16" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="goldBeam" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF2A3" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
    </linearGradient>
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background Architecture -->
  <rect width="1600" height="900" fill="url(#skyGrad)"/>

  <!-- Light Beam Cones -->
  <polygon points="800,280 400,900 1200,900" fill="url(#goldBeam)" opacity="0.35"/>
  <polygon points="800,280 200,900 1400,900" fill="url(#goldBeam)" opacity="0.18"/>

  <!-- Rose Window Radial Glow -->
  <circle cx="800" cy="290" r="380" fill="url(#roseGlow)"/>

  <!-- Gothic Arch Tracery Background -->
  <!-- Left Columns & Arches -->
  <g stroke="#D4AF37" stroke-width="2" opacity="0.3" fill="none">
    <path d="M 0,0 L 400,350 L 400,900" />
    <path d="M 0,150 L 300,420 L 300,900" />
    <path d="M 1600,0 L 1200,350 L 1200,900" />
    <path d="M 1600,150 L 1300,420 L 1300,900" />
  </g>

  <!-- Great Central Stained Glass Rose Window -->
  <g transform="translate(800, 290)" filter="url(#softGlow)">
    <!-- Outer Stone Framework -->
    <circle cx="0" cy="0" r="185" fill="none" stroke="#251016" stroke-width="16" />
    <circle cx="0" cy="0" r="176" fill="none" stroke="#D4AF37" stroke-width="4" />
    <circle cx="0" cy="0" r="145" fill="none" stroke="#ECC94B" stroke-width="2" stroke-dasharray="8,6" />

    <!-- 12 Petals of the Apostles -->
    <g>
      <circle cx="0" cy="-115" r="30" fill="#80182A" stroke="#ECC94B" stroke-width="2.5" opacity="0.85"/>
      <circle cx="58" cy="-100" r="30" fill="#2B4C7E" stroke="#ECC94B" stroke-width="2.5" opacity="0.85"/>
      <circle cx="100" cy="-58" r="30" fill="#C59B27" stroke="#ECC94B" stroke-width="2.5" opacity="0.85"/>
      <circle cx="115" cy="0" r="30" fill="#80182A" stroke="#ECC94B" stroke-width="2.5" opacity="0.85"/>
      <circle cx="100" cy="58" r="30" fill="#2B4C7E" stroke="#ECC94B" stroke-width="2.5" opacity="0.85"/>
      <circle cx="58" cy="100" r="30" fill="#C59B27" stroke="#ECC94B" stroke-width="2.5" opacity="0.85"/>
      <circle cx="0" cy="115" r="30" fill="#80182A" stroke="#ECC94B" stroke-width="2.5" opacity="0.85"/>
      <circle cx="-58" cy="100" r="30" fill="#2B4C7E" stroke="#ECC94B" stroke-width="2.5" opacity="0.85"/>
      <circle cx="-100" cy="58" r="30" fill="#C59B27" stroke="#ECC94B" stroke-width="2.5" opacity="0.85"/>
      <circle cx="-115" cy="0" r="30" fill="#80182A" stroke="#ECC94B" stroke-width="2.5" opacity="0.85"/>
      <circle cx="-100" cy="-58" r="30" fill="#2B4C7E" stroke="#ECC94B" stroke-width="2.5" opacity="0.85"/>
      <circle cx="-58" cy="-100" r="30" fill="#C59B27" stroke="#ECC94B" stroke-width="2.5" opacity="0.85"/>
    </g>

    <!-- Inner Rose Circle -->
    <circle cx="0" cy="0" r="70" fill="#6B1D2F" stroke="#D4AF37" stroke-width="4" />
    <circle cx="0" cy="0" r="48" fill="#FAF6EE" stroke="#D4AF37" stroke-width="3" />

    <!-- Glorified Chi-Rho and Cross in Rose Center -->
    <g stroke="#997300" stroke-width="3" fill="#D4AF37">
      <line x1="0" y1="-30" x2="0" y2="30" />
      <line x1="-20" y1="-12" x2="20" y2="-12" />
      <!-- Chi Rho Loop -->
      <path d="M 0,-30 C 14,-30 14,-8 0,-8" fill="none" stroke="#997300" stroke-width="3"/>
    </g>
  </g>

  <!-- Grand Altar and Crucifix Silhouette -->
  <!-- Altar Steps -->
  <polygon points="520,780 1080,780 1140,820 460,820" fill="#3A151F" stroke="#D4AF37" stroke-width="1.5"/>
  <polygon points="460,820 1140,820 1200,860 400,860" fill="#2E0E17" stroke="#D4AF37" stroke-width="1.5"/>
  <polygon points="400,860 1200,860 1260,900 340,900" fill="#20080F" stroke="#D4AF37" stroke-width="2"/>

  <!-- Altar Mensa Table -->
  <rect x="560" y="730" width="480" height="50" rx="4" fill="#FAF6EE" stroke="#D4AF37" stroke-width="3" filter="url(#softGlow)"/>
  <rect x="580" y="745" width="440" height="20" fill="none" stroke="#6B1D2F" stroke-width="2" stroke-dasharray="12,6"/>

  <!-- Altar Candles (6 High Mass Candles) -->
  <g fill="#FFEFA8" filter="url(#softGlow)">
    <!-- Left candles -->
    <rect x="590" y="695" width="8" height="35" rx="1" fill="#FFFFFF"/>
    <ellipse cx="594" cy="690" rx="4" ry="8" fill="#ECC94B"/>
    <rect x="630" y="695" width="8" height="35" rx="1" fill="#FFFFFF"/>
    <ellipse cx="634" cy="690" rx="4" ry="8" fill="#ECC94B"/>
    <rect x="670" y="695" width="8" height="35" rx="1" fill="#FFFFFF"/>
    <ellipse cx="674" cy="690" rx="4" ry="8" fill="#ECC94B"/>
    <!-- Right candles -->
    <rect x="920" y="695" width="8" height="35" rx="1" fill="#FFFFFF"/>
    <ellipse cx="924" cy="690" rx="4" ry="8" fill="#ECC94B"/>
    <rect x="960" y="695" width="8" height="35" rx="1" fill="#FFFFFF"/>
    <ellipse cx="964" cy="690" rx="4" ry="8" fill="#ECC94B"/>
    <rect x="1000" y="695" width="8" height="35" rx="1" fill="#FFFFFF"/>
    <ellipse cx="1004" cy="690" rx="4" ry="8" fill="#ECC94B"/>
  </g>

  <!-- Golden Tabernacle in center of altar -->
  <g transform="translate(800, 715)">
    <rect x="-35" y="-55" width="70" height="70" rx="6" fill="#D4AF37" stroke="#7A5A00" stroke-width="3" filter="url(#softGlow)"/>
    <path d="M -35,-55 Q 0,-85 35,-55 Z" fill="#ECC94B" stroke="#7A5A00" stroke-width="2"/>
    <circle cx="0" cy="-20" r="14" fill="#6B1D2F" stroke="#FFF2A3" stroke-width="2"/>
    <line x1="0" y1="-28" x2="0" y2="-12" stroke="#ECC94B" stroke-width="2"/>
    <line x1="-8" y1="-20" x2="8" y2="-20" stroke="#ECC94B" stroke-width="2"/>
    <!-- Sanctuary Lamp glowing red -->
    <ellipse cx="55" cy="-35" rx="8" ry="12" fill="#E53E3E" filter="url(#softGlow)"/>
    <ellipse cx="55" cy="-35" rx="4" ry="6" fill="#FFF5F5"/>
  </g>

  <!-- Altar Crucifix -->
  <g transform="translate(800, 560)">
    <rect x="-5" y="-70" width="10" height="130" rx="2" fill="#D4AF37" stroke="#7A5A00" stroke-width="2"/>
    <rect x="-35" y="-45" width="70" height="10" rx="2" fill="#D4AF37" stroke="#7A5A00" stroke-width="2"/>
    <circle cx="0" cy="-40" r="7" fill="#80182A"/>
  </g>

  <!-- Front Sanctuary Arch Accentuate Silhouette -->
  <path d="M 0,0 L 0,900 L 250,900 L 250,550 Q 800,180 1350,550 L 1350,900 L 1600,900 L 1600,0 Z" fill="#15050C" opacity="0.6"/>
</svg>`;

// 4. Saints Peter & Paul Illustration Banner
const saintsPeterPaulSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bgSaints" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3D101C" />
      <stop offset="50%" stop-color="#581628" />
      <stop offset="100%" stop-color="#1E070D" />
    </linearGradient>
    <radialGradient id="haloGold" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF2A3" />
      <stop offset="60%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#8C6B00" />
    </radialGradient>
    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="0.45"/>
    </filter>
  </defs>

  <rect width="1000" height="600" fill="url(#bgSaints)"/>

  <!-- Arch Frame -->
  <rect x="25" y="25" width="950" height="550" rx="20" fill="none" stroke="#D4AF37" stroke-width="3" stroke-dasharray="16,8"/>
  <rect x="40" y="40" width="920" height="520" rx="14" fill="#2A0B14" stroke="#ECC94B" stroke-width="1.5" opacity="0.7"/>

  <!-- Left Saint: Saint Peter (The Rock) -->
  <g transform="translate(280, 240)">
    <!-- Golden Halo -->
    <circle cx="0" cy="-60" r="85" fill="none" stroke="url(#haloGold)" stroke-width="8" filter="url(#cardShadow)"/>
    <circle cx="0" cy="-60" r="72" fill="#FAF6EE" opacity="0.15"/>
    
    <!-- Robe & Mantle -->
    <path d="M -70,220 C -60,60 -50,-10 0,-10 C 50,-10 60,60 70,220 Z" fill="#80182A" stroke="#ECC94B" stroke-width="2"/>
    <path d="M -40,30 L 40,220 L -60,220 Z" fill="#C59B27" opacity="0.85"/>
    
    <!-- Beard & Head Profile Silhouette -->
    <circle cx="0" cy="-60" r="38" fill="#FCEFD2"/>
    <!-- Grey curly hair & beard of St. Peter -->
    <path d="M -30,-80 Q 0,-110 30,-80 Q 40,-50 35,-30 Q 0,0 -35,-30 Z" fill="#D3D5D7" opacity="0.9"/>
    <circle cx="0" cy="-60" r="30" fill="#ECCBB0"/>

    <!-- The Keys to the Kingdom held in right hand -->
    <g transform="translate(45, 80) rotate(-25)">
      <circle cx="0" cy="-25" r="14" fill="none" stroke="#ECC94B" stroke-width="4"/>
      <line x1="0" y1="-11" x2="0" y2="45" stroke="#ECC94B" stroke-width="5" stroke-linecap="round"/>
      <path d="M 0,25 L 12,25 L 12,33 L 5,33 L 5,40 L 0,40 Z" fill="#ECC94B"/>
    </g>

    <!-- Scroll in left hand -->
    <rect x="-60" y="80" width="18" height="55" rx="4" fill="#FFFDF8" stroke="#D4AF37" stroke-width="2"/>

    <!-- Saint Title -->
    <text x="0" y="270" font-family="'Cinzel', Georgia, serif" font-size="22" font-weight="700" fill="#FFF2A3" text-anchor="middle">
      SANCTUS PETRUS
    </text>
    <text x="0" y="295" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#E2E8F0" text-anchor="middle">
      The Rock • Keeper of the Keys
    </text>
  </g>

  <!-- Center divider: Cross & Olive Branch -->
  <g transform="translate(500, 260)">
    <line x1="0" y1="-160" x2="0" y2="240" stroke="#D4AF37" stroke-width="2" stroke-dasharray="6,6"/>
    <!-- Central Monogram -->
    <circle cx="0" cy="40" r="36" fill="#6B1D2F" stroke="#ECC94B" stroke-width="3" filter="url(#cardShadow)"/>
    <text x="0" y="47" font-family="'Cinzel', Georgia, serif" font-size="22" font-weight="700" fill="#FFF2A3" text-anchor="middle">
      &amp;
    </text>
  </g>

  <!-- Right Saint: Saint Paul (Apostle to the Gentiles) -->
  <g transform="translate(720, 240)">
    <!-- Golden Halo -->
    <circle cx="0" cy="-60" r="85" fill="none" stroke="url(#haloGold)" stroke-width="8" filter="url(#cardShadow)"/>
    <circle cx="0" cy="-60" r="72" fill="#FAF6EE" opacity="0.15"/>

    <!-- Robe & Mantle -->
    <path d="M -70,220 C -60,60 -50,-10 0,-10 C 50,-10 60,60 70,220 Z" fill="#243E36" stroke="#ECC94B" stroke-width="2"/>
    <path d="M 40,30 L -40,220 L 60,220 Z" fill="#80182A" opacity="0.85"/>

    <!-- Head & Dark Beard of St. Paul -->
    <circle cx="0" cy="-60" r="38" fill="#FCEFD2"/>
    <path d="M -28,-75 Q 0,-105 28,-75 Q 35,-40 30,-20 Q 0,10 -30,-20 Z" fill="#4A3B32" opacity="0.9"/>
    <circle cx="0" cy="-60" r="30" fill="#ECCBB0"/>

    <!-- The Sword of the Spirit (Word of God) -->
    <g transform="translate(-45, 70) rotate(15)">
      <line x1="0" y1="-45" x2="0" y2="75" stroke="#E2E8F0" stroke-width="4" stroke-linecap="round"/>
      <rect x="-16" y="25" width="32" height="6" rx="2" fill="#D4AF37"/>
      <rect x="-3" y="31" width="6" height="20" fill="#718096"/>
      <circle cx="0" cy="54" r="5" fill="#D4AF37"/>
    </g>

    <!-- Epistles / Sacred Book in hand -->
    <rect x="25" y="65" width="35" height="50" rx="3" fill="#80182A" stroke="#D4AF37" stroke-width="2"/>
    <line x1="32" y1="75" x2="52" y2="75" stroke="#ECC94B" stroke-width="2"/>
    <line x1="32" y1="85" x2="52" y2="85" stroke="#ECC94B" stroke-width="2"/>
    <line x1="32" y1="95" x2="48" y2="95" stroke="#ECC94B" stroke-width="2"/>

    <!-- Saint Title -->
    <text x="0" y="270" font-family="'Cinzel', Georgia, serif" font-size="22" font-weight="700" fill="#FFF2A3" text-anchor="middle">
      SANCTUS PAULUS
    </text>
    <text x="0" y="295" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#E2E8F0" text-anchor="middle">
      Apostle to the Gentiles • Sword of Truth
    </text>
  </g>
</svg>`;

// Helper function to create gallery item SVG
function makeGallerySvg(title, subtitle, colorScheme, iconType) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="gBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${colorScheme[0]}" />
      <stop offset="100%" stop-color="${colorScheme[1]}" />
    </linearGradient>
    <radialGradient id="gGlow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#FFF2A3" stop-opacity="0.4" />
      <stop offset="100%" stop-color="${colorScheme[0]}" stop-opacity="0" />
    </radialGradient>
  </defs>

  <rect width="800" height="600" fill="url(#gBg)" />
  <circle cx="400" cy="260" r="280" fill="url(#gGlow)" />

  <!-- Geometric Architectural Arches & Window Tracery -->
  <g stroke="#D4AF37" stroke-width="2" fill="none" opacity="0.3">
    <path d="M 100,600 L 100,300 Q 400,50 700,300 L 700,600" />
    <path d="M 180,600 L 180,340 Q 400,140 620,340 L 620,600" />
    <circle cx="400" cy="240" r="120" stroke-dasharray="6,6"/>
    <circle cx="400" cy="240" r="80" />
  </g>

  <!-- Center Sacred Emblem depending on type -->
  <g transform="translate(400, 240)">
    <circle cx="0" cy="0" r="75" fill="#FAF6EE" stroke="#D4AF37" stroke-width="4" />
    <!-- Sacred Cross inside badge -->
    <rect x="-6" y="-45" width="12" height="90" rx="3" fill="#6B1D2F"/>
    <rect x="-32" y="-22" width="64" height="12" rx="3" fill="#6B1D2F"/>
    <circle cx="0" cy="-16" r="6" fill="#D4AF37"/>
  </g>

  <!-- Title Banner Card at Bottom -->
  <rect x="50" y="440" width="700" height="110" rx="12" fill="#15050C" stroke="#D4AF37" stroke-width="1.5" opacity="0.9"/>
  <text x="400" y="482" font-family="'Cinzel', Georgia, serif" font-size="24" font-weight="700" fill="#FFF2A3" text-anchor="middle">
    ${title}
  </text>
  <text x="400" y="515" font-family="'Plus Jakarta Sans', sans-serif" font-size="15" fill="#E2E8F0" text-anchor="middle">
    ${subtitle}
  </text>
  <text x="400" y="535" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#ECC94B" text-anchor="middle" font-weight="600">
    SS Peter and Paul Catholic Church, Ugbolu • Diocese of Issele-Uku
  </text>
</svg>`;
}

// 5. Clergy Illustration SVGs
function makeClergySvg(name, title, ordination) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="100%" height="100%">
  <defs>
    <linearGradient id="cBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4A1020" />
      <stop offset="100%" stop-color="#1E070D" />
    </linearGradient>
  </defs>

  <rect width="400" height="500" rx="16" fill="url(#cBg)"/>
  <circle cx="200" cy="180" r="140" fill="#FAF6EE" opacity="0.08"/>

  <!-- Clerical Roman Cassock and Collar -->
  <g transform="translate(200, 260)">
    <!-- Shoulders & Cassock -->
    <path d="M -130,240 L -90,70 L -40,30 L 40,30 L 90,70 L 130,240 Z" fill="#18181B" stroke="#D4AF37" stroke-width="1.5"/>
    
    <!-- Cassock Center Seam & Buttons -->
    <line x1="0" y1="30" x2="0" y2="240" stroke="#27272A" stroke-width="3"/>
    <circle cx="0" cy="55" r="3.5" fill="#3F3F46"/>
    <circle cx="0" cy="80" r="3.5" fill="#3F3F46"/>
    <circle cx="0" cy="105" r="3.5" fill="#3F3F46"/>
    <circle cx="0" cy="130" r="3.5" fill="#3F3F46"/>
    <circle cx="0" cy="155" r="3.5" fill="#3F3F46"/>
    <circle cx="0" cy="180" r="3.5" fill="#3F3F46"/>

    <!-- Roman Clerical Collar -->
    <rect x="-35" y="15" width="70" height="18" fill="#18181B" rx="3"/>
    <rect x="-12" y="15" width="24" height="18" fill="#FFFFFF"/>

    <!-- Pectoral Cross or Liturgical Stole Accent -->
    <path d="M -30,30 L -30,190 L -12,190 L -12,30 Z" fill="#6B1D2F" stroke="#D4AF37" stroke-width="1"/>
    <path d="M 12,30 L 12,190 L 30,190 L 30,30 Z" fill="#6B1D2F" stroke="#D4AF37" stroke-width="1"/>
    <line x1="-30" y1="185" x2="-12" y2="185" stroke="#D4AF37" stroke-width="2"/>
    <line x1="12" y1="185" x2="30" y2="185" stroke="#D4AF37" stroke-width="2"/>

    <!-- Head & Face Outline -->
    <circle cx="0" cy="-60" r="50" fill="#ECCBB0"/>
    <path d="M -45,-75 Q 0,-115 45,-75 Q 50,-40 45,-20 Q 0,0 -45,-20 Z" fill="#271B16"/>
    <circle cx="0" cy="-60" r="42" fill="#E2B797"/>
    <!-- Dignified Smile / Eyes -->
    <circle cx="-16" cy="-62" r="3.5" fill="#271B16"/>
    <circle cx="16" cy="-62" r="3.5" fill="#271B16"/>
    <path d="M -12,-42 Q 0,-34 12,-42" stroke="#8D5B4C" stroke-width="2" fill="none"/>
  </g>

  <!-- Name & Title Tag -->
  <rect x="20" y="415" width="360" height="65" rx="8" fill="#110408" stroke="#D4AF37" stroke-width="1"/>
  <text x="200" y="442" font-family="'Cinzel', Georgia, serif" font-size="16" font-weight="700" fill="#FFF2A3" text-anchor="middle">
    ${name}
  </text>
  <text x="200" y="462" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#CBD5E1" text-anchor="middle">
    ${title} • Ordained ${ordination} (Demo)
  </text>
</svg>`;
}

// 6. Sacrament Vector Badges
function makeSacramentBadge(name, classification, symbolPath) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="100%" height="100%">
  <defs>
    <radialGradient id="sGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF5CC" />
      <stop offset="70%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#8C6500" />
    </radialGradient>
  </defs>
  <rect width="300" height="300" rx="20" fill="#FAF6EE" stroke="#D4AF37" stroke-width="3"/>
  <circle cx="150" cy="130" r="80" fill="#6B1D2F" stroke="url(#sGrad)" stroke-width="5"/>
  
  <!-- Central Emblem Symbol -->
  <g transform="translate(150, 130)">
    ${symbolPath}
  </g>

  <text x="150" y="240" font-family="'Cinzel', Georgia, serif" font-size="16" font-weight="700" fill="#6B1D2F" text-anchor="middle">
    ${name}
  </text>
  <text x="150" y="262" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" fill="#718096" text-anchor="middle">
    ${classification}
  </text>
</svg>`;
}

// Writing Core Assets
fs.writeFileSync(path.join(imgDir, 'church-crest.svg'), churchCrest);
fs.writeFileSync(path.join(imgDir, 'hero-stained-glass.svg'), heroStainedGlass);
fs.writeFileSync(path.join(imgDir, 'saints-peter-paul.svg'), saintsPeterPaulSvg);
fs.writeFileSync(path.join(__dirname, 'favicon.svg'), faviconSvg);

// Writing Clergy Portraits
fs.writeFileSync(path.join(imgDir, 'fr-emmanuel.svg'), makeClergySvg('Rev. Fr. Emmanuel Okonkwo', 'Parish Priest', '2012'));
fs.writeFileSync(path.join(imgDir, 'fr-augustine.svg'), makeClergySvg('Rev. Fr. Augustine Nwabuokei', 'Assistant Priest & Youth Chaplain', '2020'));
fs.writeFileSync(path.join(imgDir, 'bishop-elue.svg'), makeClergySvg('Most Rev. Dr. Michael O. Elue', 'Catholic Bishop of Issele-Uku', '1984'));

// Writing 12 Gallery Items
const galleryItems = [
  ['gallery-sanctuary.svg', 'Sanctuary & Altar', 'Marble Altar, Tabernacle & Sacred Chancel', ['#6B1D2F', '#260B12']],
  ['gallery-exterior.svg', 'Parish Church Façade', 'Ugbolu-Illah Road Parish Grounds', ['#1E3A8A', '#0F172A']],
  ['gallery-mass-elevation.svg', 'Holy Sacrifice of the Mass', 'Consecration & Elevation of the Sacred Host', ['#701A75', '#3B0764']],
  ['gallery-procession.svg', 'Christ the King Procession', 'Solemn Monstrance Procession in Ugbolu', ['#854D0E', '#422006']],
  ['gallery-choir.svg', 'St. Cecilia Parish Choir', 'Four-part Polyphony & Liturgical Worship', ['#14532D', '#052E16']],
  ['gallery-servers.svg', 'Altar Servers Guild', 'Serving the Sacred Mysteries at the Altar', ['#1E293B', '#0F172A']],
  ['gallery-feast-day.svg', 'Feast of Saints Peter & Paul', 'June 29th Parish Patronal Solemnity', ['#991B1B', '#450A0A']],
  ['gallery-cwo.svg', 'Catholic Women Organisation', 'August Thanksgiving & Family Welfare Outreach', ['#581C87', '#3B0764']],
  ['gallery-youth.svg', 'Catholic Youth Organisation', 'CYON Fellowship, Bible Study & Youth Rally', ['#065F46', '#022C22']],
  ['gallery-adoration.svg', 'Perpetual Adoration Chapel', 'Silent Contemplation of the Blessed Sacrament', ['#7C2D12', '#431407']],
  ['gallery-baptism.svg', 'Sacrament of Holy Baptism', 'Rebirth in Water and the Holy Spirit', ['#075985', '#082F49']],
  ['gallery-outreach.svg', 'Charity & Welfare Apostolate', 'St. Vincent de Paul Community Assistance', ['#3F3F46', '#18181B']]
];

galleryItems.forEach(([filename, title, subtitle, colors]) => {
  fs.writeFileSync(path.join(imgDir, filename), makeGallerySvg(title, subtitle, colors));
});

// Writing 7 Sacrament Badges
const chaliceSymbol = `
  <path d="M -22,-30 L 22,-30 L 16,0 C 14,14 6,22 0,25 C -6,22 -14,14 -16,0 Z" fill="#D4AF37" stroke="#7A5A00" stroke-width="2"/>
  <rect x="-4" y="25" width="8" height="25" fill="#D4AF37"/>
  <ellipse cx="0" cy="50" rx="20" ry="6" fill="#ECC94B" stroke="#7A5A00" stroke-width="1.5"/>
  <circle cx="0" cy="-40" r="16" fill="#FFFFFF" stroke="#D4AF37" stroke-width="2"/>
  <rect x="-2" y="-48" width="4" height="16" fill="#D4AF37"/>
  <rect x="-8" y="-42" width="16" height="4" fill="#D4AF37"/>
`;

const baptismFontSymbol = `
  <path d="M -30,-10 Q 0,-30 30,-10 L 25,20 Q 0,35 -25,20 Z" fill="#38BDF8" stroke="#0284C7" stroke-width="2"/>
  <path d="M -15,20 L -6,45 L 6,45 L 15,20 Z" fill="#D4AF37"/>
  <ellipse cx="0" cy="45" rx="22" ry="5" fill="#D4AF37"/>
  <path d="M 0,-40 Q 8,-25 0,-15 Q -8,-25 0,-40 Z" fill="#38BDF8"/>
  <path d="M 0,-30 L 0,-15" stroke="#FFFFFF" stroke-width="2"/>
`;

const doveSymbol = `
  <circle cx="0" cy="-35" r="7" fill="#FFFFFF"/>
  <path d="M -35,-25 Q 0,-15 35,-25 Q 20,5 0,25 Q -20,5 -35,-25 Z" fill="#FFFFFF" stroke="#D4AF37" stroke-width="1.5"/>
  <line x1="0" y1="20" x2="0" y2="45" stroke="#ECC94B" stroke-width="3" stroke-linecap="round"/>
  <line x1="-12" y1="22" x2="-25" y2="40" stroke="#ECC94B" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="12" y1="22" x2="25" y2="40" stroke="#ECC94B" stroke-width="2.5" stroke-linecap="round"/>
`;

const keysStoleSymbol = `
  <path d="M -22,-35 L -10,35 L -2,35 L -14,-35 Z" fill="#6B1D2F" stroke="#D4AF37" stroke-width="1"/>
  <path d="M 22,-35 L 10,35 L 2,35 L 14,-35 Z" fill="#6B1D2F" stroke="#D4AF37" stroke-width="1"/>
  <circle cx="0" cy="0" r="14" fill="none" stroke="#ECC94B" stroke-width="3"/>
  <line x1="0" y1="14" x2="0" y2="40" stroke="#ECC94B" stroke-width="3"/>
  <rect x="0" y="28" width="8" height="5" fill="#ECC94B"/>
`;

const oilVesselSymbol = `
  <path d="M -16,-20 L 16,-20 L 22,25 Q 0,40 -22,25 Z" fill="#D4AF37" stroke="#7A5A00" stroke-width="2"/>
  <rect x="-8" y="-30" width="16" height="10" fill="#ECC94B" stroke="#7A5A00" stroke-width="1"/>
  <circle cx="0" cy="-34" r="5" fill="#D4AF37"/>
  <text x="0" y="14" font-family="'Cinzel', Georgia, serif" font-size="20" font-weight="700" fill="#6B1D2F" text-anchor="middle">OI</text>
`;

const ringsCrossSymbol = `
  <circle cx="-14" cy="5" r="22" fill="none" stroke="#D4AF37" stroke-width="5"/>
  <circle cx="14" cy="5" r="22" fill="none" stroke="#ECC94B" stroke-width="5"/>
  <rect x="-4" y="-45" width="8" height="35" rx="2" fill="#6B1D2F"/>
  <rect x="-16" y="-35" width="32" height="8" rx="2" fill="#6B1D2F"/>
`;

const handsChaliceSymbol = `
  <path d="M -25,25 C -25,-10 0,-15 0,-15 C 0,-15 25,-10 25,25 Z" fill="#FAF6EE" stroke="#D4AF37" stroke-width="2"/>
  <rect x="-5" y="-45" width="10" height="40" rx="2" fill="#D4AF37"/>
  <rect x="-18" y="-35" width="36" height="8" rx="2" fill="#D4AF37"/>
`;

fs.writeFileSync(path.join(imgDir, 'sacrament-baptism.svg'), makeSacramentBadge('Holy Baptism', 'Initiation', baptismFontSymbol));
fs.writeFileSync(path.join(imgDir, 'sacrament-eucharist.svg'), makeSacramentBadge('Holy Eucharist', 'Initiation', chaliceSymbol));
fs.writeFileSync(path.join(imgDir, 'sacrament-confirmation.svg'), makeSacramentBadge('Confirmation', 'Initiation', doveSymbol));
fs.writeFileSync(path.join(imgDir, 'sacrament-reconciliation.svg'), makeSacramentBadge('Reconciliation', 'Healing', keysStoleSymbol));
fs.writeFileSync(path.join(imgDir, 'sacrament-anointing.svg'), makeSacramentBadge('Anointing of Sick', 'Healing', oilVesselSymbol));
fs.writeFileSync(path.join(imgDir, 'sacrament-matrimony.svg'), makeSacramentBadge('Holy Matrimony', 'Service of Communion', ringsCrossSymbol));
fs.writeFileSync(path.join(imgDir, 'sacrament-holy-orders.svg'), makeSacramentBadge('Holy Orders', 'Service of Communion', handsChaliceSymbol));

console.log('Successfully generated all high-resolution SVG assets and liturgical imagery!');
