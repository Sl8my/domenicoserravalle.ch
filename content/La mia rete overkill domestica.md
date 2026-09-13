---
created: 2026-08-06
modified: 2026-09-13
---
Overkill perché è nella pratica una rete aziendale. Perché in quanto informatico ho accesso ad hardware di questo livello, buon per me, e il motivo di fondo è sempre quello di impratichirmi sul tema. 
## Host
Ho un dominio il cui *vpn.sottodominio.ch* punta al mio ip pubblico di quel momento. Ho già fatto la tiritera del DDNS con [duckDNS,](https://www.duckdns.org/)ma ho scoperto essere più comodo speculare sul fatto che il mio ISP mi cambi poco frequentemente l'IP del mio router. Dunque ho un record di tipo A che punta al mio router. Mi è toccato di cambiarlo manualmente, ma tipo dopo 3/4 mesi.
## Router
Ho un classico router Swisscom. Ho anche provato ad attivare il DDNS e impostare infomaniak, ma mi trovo meglio come spiegato precedentemente. Limito il suo DHCP da 0.3 a 0.14. Tecnicamente è un double NAT. Praticamente segmento la rete in due sottoreti distinte. Solo il firewall è direttamente collegato. 
## Firewall
Ho un firewall Fortinet ereditato da un amico allo scopo di impratichirmi col brand. Anche nell'ottica di prendere una certificazione.
Qui viene gestita la mia rete principale, 0.0. Il DHCP assegna dal 0.10 al 0.200. Ho qualche IP statico assegnato direttamente dal dispositivo, ma ho anche qualche riservazione DHCP. Ho impostato le policy per la navigazione e per la VPN SSL. Distribuisce come DNS AdGuard che gira su un altro IP nella stessa rete.
## Wifi AP
Come Access Point utilizzo un'antenna tp-link. 
## Nas
Il mio server è un NAS synology. Di nuovo: la fortuna di essere informatico. É quello che ho scoperto essere un modello molto famoso nell'ambito del self hosting e del modding: il DS220+.
![[img/DS220+ 2.jpg]]
Qui vengono ospitati la gran parte dei servizi (che voglio esplorare ulteriormente in [[What's on my server]]). Vi è collegato h24 un hard disk esterno. Chiaramente in [RAID1](https://www.google.com/search?q=NAS+RAID&sca_esv=2987630c083893fb&rlz=1C1RXQR_itCH1050CH1050&biw=1745&bih=828&sxsrf=APpeQns7MeR3tQrhZLCrxSZmCLCEe9Jecw%3A1786122987853&ei=6xJ2aorcM-397_UPiv37mA8&ved=0ahUKEwjK_dzRgo-WAxXt_rsIHYr-HvMQ4dUDCBA&uact=5&oq=NAS+RAID&gs_lp=Egxnd3Mtd2l6LXNlcnAiCE5BUyBSQUlEMgUQABiABDIKEAAYgAQYFBiHAjIKEAAYgAQYigUYQzIKEAAYgAQYFBiHAjIFEAAYgAQyChAAGIAEGIoFGEMyChAAGIAEGIoFGEMyBRAAGIAEMgUQABiABDIKEAAYgAQYigUYQ0ifKlAAWPIlcAR4AZABAJgBsAGgAYAJqgEDNS42uAEDyAEA-AEBmAIPoALXCcICBxAjGPAFGCfCAgQQIxgnwgIEEC4YJ8ICEBAuGIAEGIoFGEMYxwEY0QPCAgoQIxjJAhjwBRgnwgINEAAYgAQYigUYQxixA8ICCxAAGIAEGIoFGJECwgIGEAAYFhgewgIKEC4YgAQYigUYQ8ICCRAuGIAEGAoYC8ICCRAAGIAEGAoYC8ICGRAuGIAEGIoFGEMYlwUY3AQY3gQY3wTYAQGYAwC6BgYIARABGBSSBwM4LjegB-pWsgcDNC43uAfGCcIHCDAuMy4xMS4xyAdDgAgB&sclient=gws-wiz-serp) per sfruttare i due bay per gli HDD da 8 TB. Ho aggiunto una stick aggiuntiva di RAM ([so-dimm DDR4](https://www.corsair.com/us/en/explorer/diy-builder/memory/how-to-upgrade-ram-in-your-pc/), a memoria).
## DNS & Ad blocker
Viene ospitato un container docker nel NAS. [AdGuard](https://adguard.com/) è stata la mia scelta. È stato proprio set and forget, consigliatissimo. Funge anche da DNS. È impostato anche nel firewall come DNS.
Nota di merito per la la disattivazione delle pubblicità invasive nell'homepage della TV samsung. È inaccettabile dover pagare per un prodotto e ritrovarsi poi la schermata iniziale intasata da annunci pubblicitari di prodotti che l'azienda ha interesse a spingere. ([samsung forces ads in homescreen](https://adage.com/article/digital/samsung-smart-tv-update-forces-ads/307246/))
![[img/TV-samsung-ad.jpg]]
Mio menu samsung:
![[img/tv-samsung-mia.jpg]]
