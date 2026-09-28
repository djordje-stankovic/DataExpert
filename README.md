# Data Expert — novi sajt

Statičan sajt, bez biblioteka i bez build alata osim jednog malog Node skripta.

## Stranice

| Fajl | Šta je |
|---|---|
| `index.html` | početna: hero crtež, logoi klijenata, koristi, Vidik blok, brojači |
| `pantheon.html` | ERP, mreža odeljenja, računovođe, zašto Pantheon, eProces |
| `vidik.html` | Vidik kokpit, prodaje se preko Data Expert-a; linkovi vode na sajt Vidika |
| `cene.html` | cenovnik licenci (HTML tabela umesto slike), pravila, kombinator |
| `reference.html` | logoi, brojevi, integracije |
| `novosti.html` | tri članka sa starog sajta, razvijaju se na klik |
| `kontakt.html` | forma, kontakt kartice, mapa |

## Kad menjaš sadržaj

Menja se `_stranice/<ime>.html`, pa:

```bash
node napravi.js
```

Zaglavlje, meni i podnožje su u `napravi.js`, na jednom mestu. Ako se HTML u
korenu menja ručno, sledeće pokretanje generatora ga pregazi.

Adresa Vidika je u `napravi.js`; menja se i ovako:

```bash
VIDIK=https://vidik.rs/ node napravi.js
```

Pregled: `node pregled.js` → http://localhost:8091

## Fajlovi

- `css/stil.css`: paleta je u `:root` (crvena iz loga, ugalj, ljubičasta iz starog hero prelaza)
- `js/sajt.js`: pojava na skrol, brojači, meni, magnetna dugmad, paralaks, prelaz između stranica, kombinator, forma
- `img/`: logo i slike preuzete sa dataexpert.rs
- `_orig/`: HTML starog sajta, samo za poređenje, ne ide na server

## Otvoreno

- Forma nigde ne šalje, već otvara mejl klijent sa popunjenom porukom na info@dataexpert.rs. Za pravo slanje treba servis (Formspree, Netlify Forms) ili PHP na hostingu.
- Brojevi 2.000+ / 80.000+ / 26 godina su preuzeti iz brojača na starom sajtu.
- Cene licenci su prepisane sa slike iz jula 2024; treba proveriti da li važe.
