# Quartz v4

## Questo sito su macOS

Il progetto è in `~/quartz-domenicoserravalle.ch`. Le note e le immagini si modificano in
`~/Library/CloudStorage/SynologyDrive-BRAIN/domenicoserravalle.ch`.
La cartella `content` del progetto è un collegamento simbolico a quella cartella.

Dal progetto, per vedere il sito su <http://localhost:8080>:

```sh
npx quartz build --serve
```

Per pubblicare le modifiche su GitHub e avviare GitHub Pages:

```sh
npx quartz sync
```

Quartz copia i contenuti nel commit e poi ripristina il collegamento locale.
Su GitHub devono quindi esserci i file delle note, non il collegamento del Mac.
I nomi delle immagini nei riferimenti devono rispettare esattamente maiuscole e minuscole.

Se `content` manca, ricreare il collegamento dalla cartella del progetto:

```sh
ln -s "$HOME/Library/CloudStorage/SynologyDrive-BRAIN/domenicoserravalle.ch" content
```

Dopo una nuova installazione, eseguire anche `npm ci` (Node.js 22 o successivo).

> “[One] who works with the door open gets all kinds of interruptions, but [they] also occasionally gets clues as to what the world is and what might be important.” — Richard Hamming

Quartz is a set of tools that helps you publish your [digital garden](https://jzhao.xyz/posts/networked-thought) and notes as a website for free.

🔗 Read the documentation and get started: https://quartz.jzhao.xyz/

[Join the Discord Community](https://discord.gg/cRFFHYye7t)

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/jackyzha0">
    <img src="https://cdn.jsdelivr.net/gh/jackyzha0/jackyzha0/sponsorkit/sponsors.svg" />
  </a>
</p>
