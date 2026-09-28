/* Data Expert — ponašanje sajta: pojava na skrol, brojači, meni, magnetna dugmad,
   paralaks crteža, nagib kartica, prelaz između stranica, kombinator licenci,
   novosti na klik i forma (otvara mejl, jer je sajt statičan). */
(function () {
  const bezPokreta = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- prelaz: zavesa se podiže pri dolasku ---------- */
  const zavesa = document.createElement('div');
  zavesa.className = 'prelaz-strane';
  document.body.appendChild(zavesa);
  try {
    if (sessionStorage.getItem('de-prelaz')) {
      zavesa.classList.add('dolazi');
      sessionStorage.removeItem('de-prelaz');
    }
  } catch (e) {}
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a || bezPokreta || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const href = a.getAttribute('href') || '';
    if (!/^[a-z-]+\.html(#.*)?$/.test(href) || href.startsWith(location.pathname.split('/').pop() + '#')) return;
    e.preventDefault();
    try { sessionStorage.setItem('de-prelaz', '1'); } catch (err) {}
    zavesa.classList.remove('dolazi');
    zavesa.classList.add('ide');
    setTimeout(() => (location.href = href), 430);
  });
  addEventListener('pageshow', (e) => { if (e.persisted) zavesa.className = 'prelaz-strane'; });

  /* ---------- nav senka + traka napretka ---------- */
  const nav = document.querySelector('.nav');
  const napredak = document.querySelector('.napredak');
  const naSkrol = () => {
    const y = scrollY;
    nav && nav.classList.toggle('skrol', y > 10);
    if (napredak) {
      const h = document.documentElement.scrollHeight - innerHeight;
      napredak.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    }
  };
  addEventListener('scroll', naSkrol, { passive: true });
  naSkrol();

  /* ---------- meni na telefonu ---------- */
  const dugme = document.querySelector('.meni-dugme');
  const veze = document.querySelector('.nav-veze');
  if (dugme && veze) {
    dugme.addEventListener('click', () => {
      veze.style.top = nav.getBoundingClientRect().bottom + 'px';
      const otv = veze.classList.toggle('otvoren');
      dugme.setAttribute('aria-expanded', otv);
      document.body.style.overflow = otv ? 'hidden' : '';
    });
  }

  /* ---------- pojava na skrol ---------- */
  const posmatrac = new IntersectionObserver((stavke) => {
    stavke.forEach((s) => {
      if (!s.isIntersecting) return;
      s.target.classList.add('vidljiv');
      if (s.target.hasAttribute('data-broj')) broji(s.target);
      posmatrac.unobserve(s.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.pojava, .crta, .stiklice, [data-broj], .graf-omot').forEach((el) => posmatrac.observe(el));

  /* ---------- brojači (kao na starom sajtu) ---------- */
  function broji(el) {
    const do_ = +el.dataset.broj, trajanje = 2000, t0 = performance.now();
    const fmt = (n) => Math.round(n).toLocaleString('sr-RS');
    if (bezPokreta) { el.textContent = fmt(do_); return; }
    const korak = (t) => {
      const p = Math.min(1, (t - t0) / trajanje);
      el.textContent = fmt(do_ * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(korak);
    };
    requestAnimationFrame(korak);
  }

  /* ---------- dužine putanja za iscrtavanje ---------- */
  document.querySelectorAll('.crtaj').forEach((p) => {
    if (p.getTotalLength) p.style.setProperty('--duz', Math.ceil(p.getTotalLength()) + 1);
  });

  const fini = matchMedia('(hover: hover) and (pointer: fine)').matches && !bezPokreta;
  if (fini) {
    /* ---------- magnetna dugmad ---------- */
    document.querySelectorAll('.dugme').forEach((b) => {
      b.addEventListener('mousemove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      });
      b.addEventListener('mouseleave', () => (b.style.transform = ''));
    });

    /* ---------- nagib kartica + svetlo ispod miša ---------- */
    document.querySelectorAll('.kartica').forEach((c) => {
      c.addEventListener('mousemove', (e) => {
        const r = c.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        c.style.setProperty('--mx', px * 100 + '%');
        c.style.setProperty('--my', py * 100 + '%');
        c.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 7}deg) rotateY(${(px - 0.5) * 9}deg) translateY(-6px)`;
      });
      c.addEventListener('mouseleave', () => (c.style.transform = ''));
    });

    /* ---------- paralaks crteža prema mišu ---------- */
    const slojevi = document.querySelectorAll('[data-dubina]');
    if (slojevi.length) {
      addEventListener('mousemove', (e) => {
        const dx = e.clientX / innerWidth - 0.5, dy = e.clientY / innerHeight - 0.5;
        slojevi.forEach((s) => {
          const d = +s.dataset.dubina;
          s.style.transform = `translate(${dx * d}px, ${dy * d}px)`;
        });
      });
    }
  }

  /* ---------- novosti: otvori / zatvori ---------- */
  document.querySelectorAll('.otvori').forEach((b) => {
    b.addEventListener('click', () => {
      const c = b.closest('.clanak');
      const otv = c.classList.toggle('otvoren');
      b.querySelector('span').textContent = otv ? 'Zatvori' : 'Pročitaj ceo tekst';
    });
  });

  /* ---------- kombinator licenci (pravila sa starog sajta) ---------- */
  const komb = document.querySelector('.kombinator');
  if (komb) {
    const moze = {
      RE: ['SE', 'ME', 'MF', 'RT', 'WL'],
      RT: ['RE', 'SE', 'ME', 'MF'],
      MT: ['MF'],
      SE: ['RE', 'RT', 'WL'],
      ME: ['RE', 'RT', 'WL'],
      MF: ['RE', 'RT', 'MT', 'WL'],
      LX: ['WL'],
      LT: ['WL'],
      WL: ['LX', 'LT', 'RE', 'SE', 'ME', 'MF'],
    };
    const ime = { WL: 'Web Light' };
    const napomena = {
      LX: 'Preduzeće može da kupi samo jednu LX licencu (jedan istovremeni korisnik). Vodi najviše 3 preduzeća (baze).',
      LT: 'Samo jedna LT (jednokorisnička) ili jedna LT3 (mrežna, 1–3 korisnika). Vodi najviše 3 preduzeća (baze).',
      SE: 'SE, ME i MF se međusobno ne kombinuju. SE vodi najviše 3 preduzeća (baze).',
      ME: 'SE, ME i MF se međusobno ne kombinuju. Broj baza sa ME je neograničen.',
      MF: 'SE, ME i MF se međusobno ne kombinuju. Broj baza sa MF je neograničen.',
      RE: 'RE vodi najviše 3 preduzeća (baze).',
      RT: 'RT je licenca sa dodatnim funkcionalnostima — ide uz osnovnu.',
      MT: 'MT je licenca sa dodatnim funkcionalnostima — ide samo uz MF.',
      WL: 'PANTHEON Web Light ide uz LX, LT, RE, SE, ME i MF.',
    };
    const dug = komb.querySelectorAll('button');
    const odg = komb.querySelector('.kombinator-odgovor');
    dug.forEach((b) => b.addEventListener('click', () => {
      const l = b.dataset.lic;
      dug.forEach((d) => {
        d.classList.remove('izabran', 'moze', 'nemoze');
        if (d === b) d.classList.add('izabran');
        else d.classList.add(moze[l].includes(d.dataset.lic) ? 'moze' : 'nemoze');
      });
      const lista = moze[l].map((x) => '<span class="lic">' + (ime[x] || x) + '</span>').join(' ');
      odg.innerHTML = '<b>' + (ime[l] || l) + '</b> se kombinuje sa: ' + lista + '<br><small style="color:var(--tiho)">' + napomena[l] + '</small>';
    }));
  }

  /* ---------- forma: sastavi mejl ---------- */
  const forma = document.querySelector('.forma');
  if (forma) {
    forma.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(forma);
      const poruka = forma.querySelector('.forma-poruka');
      if (String(f.get('provera')).trim() !== '5') {
        poruka.style.color = 'var(--crvena)';
        poruka.textContent = 'Tri plus dva je pet :) Proverite odgovor.';
        return;
      }
      const tema = f.get('tema') || 'Upit sa sajta';
      const telo = [
        'Ime: ' + f.get('ime'),
        'Kompanija: ' + f.get('kompanija'),
        'Mejl: ' + f.get('mejl'),
        'Telefon: ' + f.get('telefon'),
        'Obaveštenja o ponudama: ' + (f.get('saglasnost') ? 'da' : 'ne'),
        '',
        f.get('poruka'),
      ].join('\n');
      location.href = 'mailto:info@dataexpert.rs?subject=' + encodeURIComponent(tema) + '&body=' + encodeURIComponent(telo);
      poruka.style.color = 'var(--tirk)';
      poruka.textContent = 'Otvaramo vaš program za mejl — samo pritisnite „Pošalji".';
    });
    const tema = new URLSearchParams(location.search).get('tema');
    if (tema) forma.querySelector('[name=tema]').value = tema;
  }
})();
