L'esperimento didattico odierno è relativo all'utilizzo agentico degli LLM. Nell'articolo precedente ho spiegato il funzionamento tecnico del sito in cui scrivo. Uno degli utilizzi più opportuni di questi agenti sarebbe proprio quello di pubblicare più agevolmente gli articoli del sito stesso. La pubblicazione! E non la redazione dei contenuti: "[don't delegate understanding](https://stephango.com/understand)". [Openclaw](https://openclaw.ai/) d'altronde promette questo e molto di più. Lo metto subito alla prova.

Under the hood giro [ollama](https://ollama.com/) con [Gemma4](http://deepmind.google/models/gemma/gemma-4/) di Google. La mia GPU, una 4080, fa i turni extra, ma la resa è buona, quasi molto buona. Abilito la comunicazione via telegram e gli creo un bot. Affinché l'agente possa riutilizzare il processo indefinite volte, creo e valido una skill che lui stesso possa riutilizzare. In questo caso: beverage-review-flow. 

Flusso che consiste nel:
1. Bot riceve foto bevanda via telegram. Con nome bevanda, valutazione da 0 a 10 decimale e il testo della recensione, due o tre righe.
2. Salva la foto nella cartella "img" relativa come nome-bevanda.jpg. Crea un file Nome-bevanda.md nella cartella bevande e lo aggiorna con: valutazione, type: bevanda (mi serve il type per la mia gestione di obsidian), data corrente e testo della descrizione.
3. CD nel percorso in cui ospito il sito localmente sul mio pc, invoca una console powershell ed esegue il deploy con Quartz.

Il workflow viene triggherato dalle linee guida contenute in Agents.md di Openclaw. Sà che deve eseguirlo al matcharsi di certe condizioni.
Sì, al momento Openclaw ha accesso alla mia cartella User di Windows. Questo fatto non è grave fino a che non mi espongo su internet e non mi rendo soggetto a prompt injection, il più banale dei tentativi oggi giorno. 