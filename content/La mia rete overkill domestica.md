Overkill perché è nella pratica una rete aziendale. Perché in quanto informatico ho accesso ad hardware di questo livello, buon per me, e il motivo di fondo è sempre quello di impratichirmi sul tema. 
## Host
Ho un dominio il cui *vpn.sottodominio.ch* punta al mio ip pubblico di quel momento. Ho già fatto la tiritera del DDNS con [duckDNS,](https://www.duckdns.org/)ma ho scoperto essere più comodo speculare sul fatto che il mio ISP mi cambi poco frequentemente l'IP del mio router. Dunque ho un record di tipo A che punta al mio router. 
## Router
Ho un classico router Swisscom. Ho provato ad attivare il DDNS e impostare infomaniak, ma mi trovo meglio come spiegato precedentemente. Limito il suo DHCP da 0.3 a 0.14. Viene usat
## Firewall
Ho un firewall Fortinet ereditato da un amico allo scopo di impratichirmi col brand. Anche nell'ottica di prendere una certificazione.
Qui viene gestito 
## Nas
Il mio server è un NAS synology. Di nuovo: la fortuna di essere informatico. É quello che ho scoperto essere un modello molto famoso nell'ambito del self hosting e del modding: il DS220+.
![[DS220+ 2.jpg]]
Qui vengono ospitati la gran parte dei servizi (che voglio esplorare ulteriormente in [[What's on my server]]).
## DNS & Ad blocker
Viene ospitato un container docker nel NAS. [AdGuard](https://adguard.com/) è stata la mia scelta. È stato proprio set and forget, consigliatissimo. Funge anche da DNS. È impostato anche nel firewall come DNS.
Nota di merito per la la disattivazione delle pubblicità invasive nell'homepage della TV samsung. È inaccettabile dover pagare per un prodotto e ritrovarsi poi la schermata iniziale intasata da annunci pubblicitari di prodotti che l'azienda ha interesse a spingere.
==inserire foto menu samsung mio e menu samsung tipo==
