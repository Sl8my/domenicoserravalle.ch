import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

// @ts-ignore
import script from "./scripts/beverage.inline"

function stripMarkdown(text: string): string {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
}

function scoreTier(score: number): string {
  if (score >= 8) return "excellent"
  if (score >= 6) return "good"
  return "curious"
}

function dateValue(value: unknown, fallback?: Date): Date | undefined {
  if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
    const date = new Date(value)
    if (!Number.isNaN(date.getTime())) return date
  }
  return fallback
}

function imageFocalPoint(image?: string): string {
  const focalPoints: Record<string, string> = {
    "img/chupa-chups.jpeg": "50% 38%",
    "img/fanta-lemon.jpeg": "50% 40%",
    "img/fizzy-mandarino.jpeg": "50% 36%",
    "img/red-bull.JPG": "50% 40%",
    "img/smoothie-red.jpeg": "50% 38%",
    "img/sprite.jpeg": "50% 38%",
    "img/true-fruits-green.jpeg": "50% 38%",
    "img/well.jpeg": "50% 38%",
    "img/exotic.jpeg": "50% 38%",
    "img/white.jpeg": "50% 38%",
  }

  return focalPoints[image ?? ""] ?? "50% 50%"
}

export default (() => {
  function BeverageList({ allFiles, fileData }: QuartzComponentProps) {
    if (fileData.slug !== "bevande/index") return null

    const beverages = allFiles
      .filter((file) => file.frontmatter?.type === "bevanda")
      .sort((a, b) => {
        const dateA = dateValue(a.frontmatter?.created, a.dates?.created)?.getTime() ?? 0
        const dateB = dateValue(b.frontmatter?.created, b.dates?.created)?.getTime() ?? 0
        return dateB - dateA
      })

    return (
      <main class="beverage-page">
        <header class="bev-hero">
          <div class="bev-title-row">
            <h1>Bevande</h1>
            <span class="bev-total" aria-label={`${beverages.length} bevande recensite`}>
              {beverages.length}
            </span>
          </div>
        </header>

        {beverages.length === 0 ? (
          <p class="bev-empty">Nessuna bevanda trovata.</p>
        ) : (
          <>
            <div class="bev-toolbar">
              <label class="bev-sort-label">
                <span>Ordina</span>
                <select class="bev-sort" aria-label="Ordina le bevande">
                  <option value="recent">Più recenti</option>
                  <option value="score-desc">Voto più alto</option>
                  <option value="score-asc">Voto più basso</option>
                </select>
              </label>
            </div>

            <div class="bev-grid">
              {beverages.map((beverage) => {
                const slug = beverage.slug ?? ""
                const name =
                  (beverage.frontmatter?.title as string | undefined) ??
                  slug.split("/").pop()?.replace(/-/g, " ") ??
                  "Bevanda"
                const score = Number.parseFloat(String(beverage.frontmatter?.score ?? "0"))
                const image = beverage.frontmatter?.img as string | undefined
                const description = stripMarkdown(beverage.description ?? "")
                const created = dateValue(beverage.frontmatter?.created, beverage.dates?.created)

                return (
                  <article
                    class="bev-card"
                    data-score={score}
                    data-date={created?.getTime() ?? 0}
                    data-tier={scoreTier(score)}
                  >
                    <div class="bev-img-wrap">
                      {image ? (
                        <img
                          src={`/${image.split("/").map(encodeURIComponent).join("/")}`}
                          alt=""
                          class="bev-img"
                          loading="lazy"
                          style={{ objectPosition: imageFocalPoint(image) }}
                        />
                      ) : (
                        <div class="bev-img-placeholder" aria-hidden="true">
                          🥤
                        </div>
                      )}
                      <span class="bev-score" aria-label={`Valutazione ${score.toFixed(1)} su 10`}>
                        {score.toFixed(1)}
                      </span>
                    </div>
                    <div class="bev-body">
                      <h2 class="bev-name">{name}</h2>
                      {description && <p class="bev-desc">{description}</p>}
                      {created && (
                        <time class="bev-card-meta" datetime={created.toISOString()}>
                          {created.toLocaleDateString("it-IT", {
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </>
        )}
      </main>
    )
  }

  BeverageList.css = `
    .beverage-page {
      padding-top: 3.75rem;
    }

    .bev-hero {
      display: block;
      margin: 0 0 2rem;
    }

    .bev-title-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: end;
      gap: 2rem;
    }

    .bev-title-row h1 {
      margin: 0;
      font-size: clamp(2.4rem, 6vw, 3.5rem);
      font-weight: 550;
      letter-spacing: -0.05em;
      line-height: 1;
    }

    .bev-total {
      color: var(--lightgray);
      font-family: var(--codeFont);
      font-size: clamp(3.5rem, 9vw, 7rem);
      font-weight: 600;
      letter-spacing: -0.08em;
      line-height: 0.72;
      user-select: none;
    }

    .bev-toolbar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 1rem;
      padding: 1rem 0;
      border-top: 1px solid var(--lightgray);
      border-bottom: 1px solid var(--lightgray);
    }

    .bev-sort {
      color: var(--darkgray);
      background: transparent;
      border: 1px solid transparent;
      border-radius: 999px;
      font: inherit;
      font-size: 0.78rem;
    }

    .bev-sort-label {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      color: var(--gray);
      font-size: 0.75rem;
      white-space: nowrap;
    }

    .bev-sort {
      padding: 0.4rem 1.8rem 0.4rem 0.65rem;
      border-color: var(--lightgray);
      border-radius: 0.45rem;
      cursor: pointer;
    }

    .bev-sort:focus-visible {
      outline: 2px solid var(--secondary);
      outline-offset: 2px;
    }

    .bev-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 1.1rem;
      margin: 1rem 0 3rem;
    }

    .bev-card {
      min-width: 0;
      overflow: hidden;
      color: var(--dark);
      background: color-mix(in srgb, var(--light) 92%, var(--dark) 8%);
      border: 1px solid var(--lightgray);
      border-radius: 0.85rem;
      display: flex;
      flex-direction: column;
      font-weight: 400;
    }

    .bev-img-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      background: var(--lightgray);
    }

    .bev-img {
      width: 100%;
      height: 100%;
      margin: 0;
      border-radius: 0;
      display: block;
      object-fit: cover;
      object-position: center;
    }

    .bev-img-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
    }

    .bev-score {
      --score-color: #d77762;
      position: absolute;
      top: 0.65rem;
      right: 0.65rem;
      min-width: 2.25rem;
      padding: 0.3rem 0.48rem;
      color: #11110f;
      background: var(--score-color);
      border: 1px solid rgba(255, 255, 255, 0.28);
      border-radius: 999px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.22);
      font-family: var(--codeFont);
      font-size: 0.7rem;
      font-weight: 700;
      line-height: 1;
      text-align: center;
    }

    .bev-card[data-tier="excellent"] .bev-score {
      --score-color: #72c68c;
    }

    .bev-card[data-tier="good"] .bev-score {
      --score-color: #e5bd58;
    }

    .bev-body {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 1rem;
    }

    .bev-name {
      margin: 0;
      color: var(--dark);
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: -0.015em;
      line-height: 1.3;
      text-transform: none;
    }

    .bev-desc {
      margin: 0.55rem 0 1.1rem;
      color: var(--darkgray);
      font-size: 0.82rem;
      line-height: 1.5;
    }

    .bev-card-meta {
      display: flex;
      align-items: center;
      margin-top: auto;
      color: var(--gray);
      font-family: var(--codeFont);
      font-size: 0.68rem;
      text-transform: lowercase;
    }

    @media (max-width: 820px) {
      .bev-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 560px) {
      .beverage-page {
        padding-top: 3.15rem;
      }

      .bev-title-row {
        gap: 1rem;
      }

      .bev-total {
        display: none;
      }

      .bev-toolbar {
        justify-content: flex-start;
      }

      .bev-sort-label {
        justify-content: space-between;
      }

      .bev-grid {
        grid-template-columns: 1fr;
      }

      .bev-img-wrap {
        aspect-ratio: 16 / 10;
      }

    }
  `

  BeverageList.afterDOMLoaded = script
  return BeverageList
}) satisfies QuartzComponentConstructor
