# App del Comune — guida rapida

Questa è una **webapp installabile (PWA)**: gira in un normale sito web, ma il
cittadino può "installarla" sulla schermata home del telefono come una app
nativa, con icona propria e senza le barre del browser. Non richiede
pubblicazione su Play Store o App Store, quindi niente account sviluppatore
né tempi di revisione: basta pubblicarla su un sito web.

## File inclusi

| File | A cosa serve |
|---|---|
| `index.html` | Tutta l'app: struttura, stile e logica sono in un unico file |
| `manifest.json` | Dice al telefono nome, icona e colori dell'app quando viene installata |
| `sw.js` | Service worker: fa funzionare l'app anche offline/con connessione debole |
| `icon-192.png`, `icon-512.png` | Icone dell'app (design originale, nessun copyright) |

## 1. Come personalizzarla

Apri `index.html` con un editor di testo e cerca il blocco:

```js
const CONFIG = {
  nome: "Comune di Villanova",
  ...
};
const DATA = {
  eventi: [...],
  news: [...],
  contatti: [...],
  trasporti: [...]
};
```

- **`CONFIG`**: nome del Comune, slogan, indirizzo, telefono, email a cui
  arrivano le segnalazioni, PEC, eventuale avviso in evidenza in home.
- **`DATA`**: i contenuti veri — eventi, news, numeri utili, orari dei
  mezzi. Sono semplici elenchi: aggiungi, modifica o elimina le righe che
  vuoi, seguendo lo stesso formato di quelle di esempio.

Non serve alcun database o pannello di amministrazione: finché il Comune è
piccolo e i contenuti li aggiorni tu, modificare direttamente questi elenchi
è il modo più semplice. Se in futuro volete che più persone aggiornino i
contenuti senza toccare il codice, il passo successivo naturale è collegare
questi elenchi a un foglio Google o a un piccolo CMS: fammelo sapere quando
arrivate a quel punto e ti aiuto a impostarlo.

Per cambiare i colori, cerca il blocco `:root{...}` all'inizio del file: le
variabili come `--notte`, `--ocra`, `--paper` controllano la palette.

Per cambiare l'icona, sostituisci `icon-192.png` e `icon-512.png` con la
tua (stessi nomi file, stesse dimensioni in pixel).

## 2. Come funziona "Segnala un problema"

Non c'è un server dietro: quando il cittadino invia una segnalazione,
l'app apre il suo programma di posta con oggetto e testo già compilati,
pronti per essere spediti all'indirizzo email che imposti in
`CONFIG.emailSegnalazioni`. È una soluzione a costo zero che funziona da
subito. Se in futuro volete un vero sistema di ticket con tracciamento
dello stato, si può sostituire quella parte con una chiamata a un servizio
esterno (es. un modulo su un gestionale, o una piccola funzione server):
ne parliamo quando sarà il momento.

## 3. Come pubblicarla online

Serve solo un hosting per file statici. Alcune opzioni gratuite o quasi:

1. **GitHub Pages** — carichi i 5 file in un repository e attivi Pages.
2. **Netlify** o **Vercel** — trascini la cartella nel loro pannello, in
   pochi secondi è online con un indirizzo `https://`.
3. **Lo spazio web già in uso dal Comune** — se il Comune ha già un
   sito, spesso basta caricare questi file in una sotto-cartella (es.
   `www.comune-villanova.it/app/`) via FTP.

L'importante è che l'indirizzo finale usi **HTTPS**: è un requisito per far
funzionare l'installazione come PWA e il service worker offline.

## 4. Cose a cui pensare prima di andare online (enti pubblici italiani)

Questi punti non sono coperti dal codice e vanno gestiti a parte:

- **Accessibilità**: le pubbliche amministrazioni italiane hanno l'obbligo
  di pubblicare una "dichiarazione di accessibilità" e di rispettare i
  requisiti WCAG (Legge Stanca / normativa AgID). Il template è stato
  costruito con attenzione a contrasto colori, focus da tastiera e
  struttura semantica, ma vale la pena far verificare il sito finale con
  gli strumenti ufficiali AgID prima della pubblicazione.
- **Privacy/GDPR**: il modulo "Segnala" raccoglie dati personali
  facoltativi (nome, contatto). Se il Comune userà questo canale in modo
  strutturale, serve un'informativa privacy collegata, come per qualunque
  altro modulo comunale.
- **Coerenza con il sito istituzionale**: se il Comune ha già un sito in
  dominio `.gov.it` o simile, valutate se questa app debba vivere come
  sezione dello stesso dominio o come prodotto separato — cambia solo la
  configurazione DNS, non il codice.

## 5. Prossimi passi possibili

- Notifiche push per nuovi avvisi/eventi (richiede un piccolo servizio
  backend).
- Vetrina attività locali (come nell'app di Agropoli), se in futuro vuoi
  aggiungerla: è una sezione in più costruita allo stesso modo delle
  altre.
- Collegamento dei contenuti a un foglio condiviso, così altri uffici
  possono aggiornarli senza toccare il codice.

Buon lavoro con il progetto — se mandi il nome vero del Comune, i colori
dello stemma e i contenuti reali, ti preparo la versione personalizzata
pronta per andare online.
