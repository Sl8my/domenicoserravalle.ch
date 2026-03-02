Questo sito è una collezione di file.md nel mio vault di Obsidian. Tramite [quartz4](https://quartz.jzhao.xyz/) in una cartella locale, punto alla cartella nel mio vault "sito-web" tramite [symlink](https://www.google.com/search?q=symlink&oq=symlink&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDE0MzhqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8). Il deploy è fatto verso una mia [repo](https://github.com/Sl8my/domenicoserravalle.ch) di github che con le github actions prima builda (convertendo i file .md in un sito statico html, css, js) e poi deploya su [github pages](https://quartz.jzhao.xyz/hosting#github-pages).
Nelle impostazioni della repo ho inserito questo dominio come custom domain, quindi pushando verso github, viene letto il workflows/deploy.yml che ripesca il mio custom domain.
```yml
[...]
deploy:
	needs: build
	environment:
		name: github-pages
		url: ${{ steps.deployment.outputs.page_url }} //here
[...]	
```
A questo punto ho inserito nel mio [hosting web](https://www.infomaniak.com/) i dns che puntano nuovamente verso le github pages.
## but why?
Un sito statico di questo tipo era veramente semplice da sviluppare con mille altre tecnologie più semplici. Questo mi permette di compilare direttamente le mie note già esistenti, impratichirmi con le 