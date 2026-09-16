import { QuartzPluginData } from "../plugins/vfile"
import { resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

function pageDate(page: QuartzPluginData): Date | undefined {
  return page.dates?.created ?? page.dates?.modified
}

export default (() => {
  const HomePage: QuartzComponent = ({ allFiles, fileData }: QuartzComponentProps) => {
    if (fileData.slug !== "index") return null

    const notes = allFiles
      .filter((page) => {
        const slug = page.slug ?? ""
        return slug !== "index" && !slug.startsWith("bevande/") && slug !== "404"
      })
      .sort((a, b) => (pageDate(b)?.getTime() ?? 0) - (pageDate(a)?.getTime() ?? 0))

    return (
      <main class="home-page">
        <section class="home-introduction" aria-labelledby="home-title">
          <h1 id="home-title">Welcome 🌱</h1>
          <p>
            Questo sito è essenzialmente un pretesto didattico per sperimentare sulla pubblicazione
            delle mie note.md di <a href="https://obsidian.md/">Obsidian</a>.
          </p>
        </section>

        <section class="notes-index" id="note" aria-labelledby="notes-title">
          <div class="section-heading">
            <h2 id="notes-title">Note</h2>
            <span>{notes.length}</span>
          </div>
          <ol>
            {notes.map((note) => {
              const date = pageDate(note)
              return (
                <li>
                  <a href={resolveRelative(fileData.slug!, note.slug!)}>
                    <time datetime={date?.toISOString()}>
                      {date
                        ? date.toLocaleDateString("it-IT", { year: "numeric", month: "2-digit" })
                        : "—"}
                    </time>
                    <span>{note.frontmatter?.title}</span>
                    <span class="note-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              )
            })}
          </ol>
        </section>
      </main>
    )
  }

  HomePage.css = `
    .home-page {
      display: flex;
      flex-direction: column;
      gap: 3.25rem;
      padding-top: 3.5rem;
    }

    .home-introduction {
      max-width: 38rem;
    }

    .home-introduction h1 {
      margin: 0;
      color: var(--dark);
      font-size: 2rem;
      font-weight: 600;
      letter-spacing: -0.035em;
      line-height: 1.15;
    }

    .home-introduction p {
      margin: 1.15rem 0 0;
      color: var(--darkgray);
      font-size: 1rem;
      line-height: 1.7;
    }

    .home-introduction a {
      color: var(--dark);
      text-decoration: underline;
      text-decoration-color: var(--gray);
      text-underline-offset: 0.22em;
    }

    .home-introduction a:hover {
      color: var(--secondary);
      text-decoration-color: var(--secondary);
    }

    .notes-index {
      scroll-margin-top: 2rem;
    }

    .section-heading {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 0.8rem;
    }

    .section-heading h2 {
      margin: 0;
      color: var(--darkgray);
      font-size: 0.88rem;
      font-weight: 500;
    }

    .section-heading > span {
      color: var(--gray);
      font-family: var(--codeFont);
      font-size: 0.7rem;
    }

    .notes-index ol {
      margin: 0;
      padding: 0;
      border-top: 1px solid var(--lightgray);
      list-style: none;
    }

    .notes-index li {
      margin: 0;
      border-bottom: 1px solid var(--lightgray);
    }

    .notes-index li a {
      display: grid;
      grid-template-columns: 5.4rem minmax(0, 1fr) auto;
      align-items: baseline;
      gap: 1.25rem;
      padding: 0.95rem 0;
      color: var(--dark);
      font-weight: 500;
    }

    .notes-index li a:hover {
      color: var(--secondary);
    }

    .notes-index time {
      color: var(--gray);
      font-family: var(--codeFont);
      font-size: 0.72rem;
      font-variant-numeric: tabular-nums;
    }

    .note-arrow {
      color: var(--gray);
      opacity: 0;
      transform: translateX(-4px);
      transition: opacity 160ms ease, transform 160ms ease;
    }

    .notes-index li a:hover .note-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    @media (max-width: 560px) {
      .home-page {
        gap: 2.75rem;
        padding-top: 2.75rem;
      }

      .home-introduction h1 {
        font-size: 1.8rem;
      }

      .notes-index li a {
        grid-template-columns: 4.35rem minmax(0, 1fr) auto;
        gap: 0.75rem;
      }

      .note-arrow {
        opacity: 1;
        transform: none;
      }
    }
  `

  return HomePage
}) satisfies QuartzComponentConstructor
