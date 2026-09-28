/* Generator stranica: zaglavlje i podnožje su ovde, na jednom mestu.
   Sadržaj svake stranice je u _stranice/<ime>.html; prva linija je
   <!-- {"naslov": "...", "opis": "..."} -->.
   Pokretanje:  node napravi.js
   Adresa Vidika se menja promenljivom:  VIDIK=https://... node napravi.js */
const fs = require('fs');
const path = require('path');

const VIDIK = (process.env.VIDIK || 'https://djordje-stankovic.github.io/vidik/').replace(/\/?$/, '/');

const meni = [
  ['index.html', 'Početna'],
  ['pantheon.html', 'Pantheon'],
  ['vidik.html', 'Vidik'],
  ['cene.html', 'Cene'],
  ['reference.html', 'Reference'],
  ['novosti.html', 'Novosti'],
];

const ikona = {
  mapa: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  tel: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
  mejl: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
};

function zaglavlje(ime, meta) {
  const veze = meni.map(([h, t]) => {
    const tu = h === ime ? ' class="tu"' : '';
    if (h === 'vidik.html') return `<a href="${h}"${tu.replace('class="', 'class="vidik-veza ') || ' class="vidik-veza"'}>${t} <span class="novo">NOVO</span></a>`;
    return `<a href="${h}"${tu}>${t}</a>`;
  }).join('\n      ');
  return `<!doctype html>
<html lang="sr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${meta.naslov}</title>
<meta name="description" content="${meta.opis}">
<meta property="og:title" content="${meta.naslov}">
<meta property="og:description" content="${meta.opis}">
<meta property="og:image" content="img/logo.png">
<meta name="theme-color" content="#e2232b">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&family=Fraunces:opsz,wght@9..144,700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/stil.css">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect x='3' y='5' width='22' height='22' rx='2' fill='white' stroke='%23e2232b' stroke-width='3'/><path d='M8 16l5 5L29 4' fill='none' stroke='%23e2232b' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'/></svg>">
</head>
<body>
<div class="napredak"></div>

<div class="traka-gore">
  <div class="omot">
    <a class="adresa" href="kontakt.html#mapa">${ikona.mapa} Bate Brkića 10A/58, Novi Sad</a>
    <a href="tel:+381213833344">${ikona.tel} +381 21 38 333 44</a>
    <a href="mailto:info@dataexpert.rs">${ikona.mejl} info@dataexpert.rs</a>
  </div>
</div>

<header class="nav">
  <div class="omot nav-red">
    <a class="znak" href="index.html" aria-label="Data Expert — početna"><img src="img/logo.png" alt="Data Expert — Posvećeni znanju, posvećeni korisnicima" width="410" height="90"></a>
    <button class="meni-dugme" aria-label="Meni" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="nav-veze">
      ${veze}
      <a href="kontakt.html"${ime === 'kontakt.html' ? ' class="tu dugme dugme-glavni dugme-mali"' : ' class="dugme dugme-glavni dugme-mali"'}>Kontakt</a>
    </nav>
  </div>
</header>

<main>
`;
}

const podnozje = `
</main>

<footer class="podnozje">
  <svg class="velika-stiklica" viewBox="0 0 200 180"><rect x="6" y="30" width="140" height="140" fill="none" stroke="#fff" stroke-width="12"/><path d="M40 95l40 40L194 10" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <div class="omot">
    <div class="podnozje-mreza">
      <div>
        <a class="logo-belo" href="index.html"><img src="img/logo.png" alt="Data Expert"></a>
        <p>Implementacija knjigovodstvenog programa Pantheon. Posvećeni znanju, posvećeni korisnicima.</p>
      </div>
      <div>
        <h4>Stranice</h4>
        ${meni.map(([h, t]) => `<a href="${h}">${t}</a>`).join('\n        ')}
        <a href="kontakt.html">Kontakt</a>
      </div>
      <div>
        <h4>Kontakt</h4>
        <a href="kontakt.html#mapa">Bate Brkića 10A/58<br>Novi Sad</a>
        <a href="tel:+381213833344">+381 21 38 333 44</a>
        <a href="mailto:info@dataexpert.rs">info@dataexpert.rs</a>
      </div>
      <div>
        <h4>Iz naše ponude</h4>
        <a class="podnozje-vidik" href="${VIDIK}" target="_blank" rel="noopener">
          <svg width="40" height="40" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#c0522c"/><g fill="white"><rect x="7" y="18" width="4" height="7" rx="1"/><rect x="14" y="13" width="4" height="12" rx="1"/><rect x="21" y="8" width="4" height="17" rx="1"/></g></svg>
          <span><b style="color:#fff" class="vidik-ime">Vid<i>ik</i></b><small>Upravljački kokpit nad PANTHEON-om ↗</small></span>
        </a>
      </div>
    </div>
    <div class="podnozje-dno">
      <span>© ${new Date().getFullYear()} Data Expert. Sva prava zadržana.</span>
      <span>PANTHEON je zaštićeni znak kompanije Datalab.</span>
    </div>
  </div>
</footer>

<script src="js/sajt.js"></script>
</body>
</html>
`;

const dir = path.join(__dirname, '_stranice');
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.html'))) {
  const sirovo = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = sirovo.match(/^<!--\s*(\{[\s\S]*?\})\s*-->\s*/);
  if (!m) throw new Error(f + ': nema meta linije');
  const meta = JSON.parse(m[1]);
  const telo = sirovo.slice(m[0].length).replaceAll('{{VIDIK}}', VIDIK);
  fs.writeFileSync(path.join(__dirname, f), zaglavlje(f, meta) + telo + podnozje);
  console.log('napravljeno:', f);
}
