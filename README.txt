CALCOLATORE ORARIO SAM - PWA

Questa cartella contiene una Progressive Web App installabile su Android.

IMPORTANTE:
Una PWA non può essere installata correttamente aprendola come file locale (file://).
Deve essere pubblicata su un sito HTTPS, per esempio GitHub Pages, Netlify o Cloudflare Pages.

File:
- index.html
- manifest.webmanifest
- sw.js
- icon-192.png
- icon-512.png

Dopo la pubblicazione:
1. Apri l'indirizzo HTTPS in Chrome sul Motorola g86.
2. Menu ⋮
3. Tocca "Installa app" oppure "Aggiungi a schermata Home".
4. L'icona "Orario SAM" comparirà nella Home e l'app funzionerà anche offline dopo il primo caricamento.

AGGIORNAMENTO 30/10/2026 - VERSIONE 2
- Calcoli dei quarti, permessi e straordinari invariati rispetto al precedente index.html.
- Controlli cronologici estesi alle coppie con uscita non ancora compilata.
- Il report TXT separa marcature originali e allineamento simulato.
- Straordinario indicato come teorico, soggetto a verifica delle condizioni aziendali.
- Service Worker registrato da index.html, cache aggiornata e HTML acquisito da rete prima della cache.
- Dopo il commit di index.html e sw.js, ricaricare la pagina dal telefono online; in caso di
  versione precedente ancora visualizzata, chiudere e riaprire la PWA.

ATTENZIONE: la simulazione non sostituisce il cartellino ufficiale né il cedolino.
