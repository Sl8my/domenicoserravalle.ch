---
created: 2026-08-06
modified: 2026-09-13
---
Nell'articolo precedente ho descritto [[La mia rete overkill domestica]]. Una cosa che non ho specificato è che il mio firewall Fortinet 60D è più che end-of-life: è proprio trapassato.

Dunque, a scopo puramente didattico (ovvio), mi chiedo se e come sia possibile entrare nel mio firewall e nella mia rete. Quesiti:
- Quali sono gli step?
- Quali sono le informazioni necessarie?
- Quali strumenti utilizzare?
- Come redigere un articolo tecnico?
- Come sfruttare una CVE?
### Procediamo.
1. Per motivi professionali il mio attuale daily OS è Windows. Procedo dunque con una VM e questa volta decido di provare [Parrot OS](https://parrotsec.org/). Scarico il file `.ova`, che, a differenza del `.iso`, contiene una VM già pronta e preconfigurata da importare in VirtualBox.
2. A questo punto è necessaria una premessa: un malintenzionato deve conoscere il mio indirizzo IP pubblico. Potrebbe ricavarlo dal dominio, se questo puntasse direttamente alla mia connessione, oppure incontrarlo durante una scansione automatizzata degli indirizzi esposti su Internet. Potrebbe trovarlo anche attraverso motori di ricerca come [Shodan](https://www.shodan.io/).
3. Una volta ottenuto l'indirizzo IP, possiamo usare Nmap per cercare eventuali porte aperte. L'opzione `-sV` abilita la service detection, mentre `-p-` estende la scansione a tutte le porte TCP. Il risultato richiede più tempo, ma è più completo.
```
nmap -sV -p- <IP>
```

![[Pasted image 20260817211559.png]]

4. A questo punto il dispositivo che cerchiamo è piuttosto evidente. Ricordo infatti di aver configurato quella porta per la mia connessione SSL-VPN: la porta predefinita sarebbe la 443, ma io l'avevo modificata in 10443.
5. Raggiungo la pagina di login del Fortinet all'indirizzo `https://IP:10443/remote/login?lang=en`. Resta da identificare la versione del firmware, così da verificare quali CVE ed eventuali exploit siano realmente applicabili. Dal certificato riesco almeno a ricavare il modello del firewall: 60D. A questo punto conosco indirizzo IP, porta, marca e modello del dispositivo.
```
nmap --script ssl-cert,http-title -p 10443 <IP>
```

![[Pasted image 20260817220049.png]]

6. Devo quindi capire quale versione del firmware gira sul firewall. La strada più ovvia, analizzare gli header della pagina di login, non restituisce informazioni utili: il campo che potrebbe identificare il server è deliberatamente mascherato (`Server: xxxxxxxx-xxxxx`). Qui mi blocco.
### Bloccato
Ho provato a dedurre la versione del firmware per esclusione. Ho usato [Nuclei](https://github.com/projectdiscovery/nuclei) per verificare esposizioni note e cURL per ispezionare direttamente richieste, risposte e header HTTP. Nessuno dei due strumenti mi ha però restituito un fingerprint abbastanza affidabile da associare il dispositivo a una specifica build di FortiOS. Senza questa informazione posso individuare vulnerabilità potenziali, ma non stabilire con sufficiente certezza se siano sfruttabili sul mio firewall.
### 3 days went by
La conclusione di questo esperimento è diversa da quello che mi aspettavo. Approfondendo le vulnerabilità della SSL-VPN di FortiOS, ho capito che il passaggio da una scansione a un exploit funzionante non è per nulla banale. Vulnerabilità come [CVE-2022-42475](https://www.fortiguard.com/psirt/FG-IR-22-398) sono di tipo heap-based buffer overflow: un attaccante invia al processo `sslvpnd` richieste appositamente costruite "specially crafted requests" che inducono il programma a scrivere più dati di quanti ne possa contenere il buffer allocato.

Si parla di memory corruption. La scrittura supera i confini del buffer (out-of-bounds write) e sovrascrive porzioni adiacenti dello heap. Se l'overflow è controllabile, l'attaccante può corrompere metadati, strutture dati o puntatori e tentare di deviare il flusso di esecuzione fino a ottenere l'esecuzione di codice arbitrario.

Trasformare questa possibilità teorica in un exploit sfruttabile richiede competenze avanzate che (ancora?) non possiedo. Servono pacchetti costruiti con precisione per quella combinazione di hardware e software: non è qualcosa che si ottiene lanciando uno scanner o scaricando un exploit pubblico e premendo Invio.

Dovremmo inoltre parlare del tema del [return on attack](https://share.google/ZlYDknt8U069AtJfl), l'economia dell'attacco. Sviluppare un exploit mirato può richiedere competenze, tempo e denaro; contro la mia rete domestica, non ha senso.
### Conclusione
Anticlimatica, rispetto a quello che mi aspettavo. Un dispositivo end-of-life "non è necessariamente una porta automaticamente spalancata, ma una porta che nessuno sta più riparando".

Questo esperimento non dimostra che il firewall sia sicuro o che attaccarlo sia sempre sconveniente. Dimostra soltanto che, con gli strumenti, le conoscenze e il tempo impiegati, non ho trovato una strada praticabile per comprometterlo.

[[migrazione a PFsense]] in corso...
