// quartz/components/BeverageList.tsx
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function scoreColor(score: number): string {
  if (score >= 8.5) return "#4ade80"
  if (score >= 7)   return "#facc15"
  if (score >= 5)   return "#fb923c"
  return "#f87171"
}

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .trim()
}

export default (() => {
  function BeverageList({ allFiles, fileData }: QuartzComponentProps) {
    // Renderizza solo nella pagina bevande/index
    if (fileData.slug !== "bevande/index") return null

    const beverages = allFiles
      .filter((f) => f.frontmatter?.type === "bevanda")
      .sort((a, b) => {
        const dateA = new Date(a.frontmatter?.created ?? "0").getTime()
        const dateB = new Date(b.frontmatter?.created ?? "0").getTime()
        return dateB - dateA
      })

    if (beverages.length === 0) {
      return <p style={{ color: "var(--darkgray)" }}>Nessuna bevanda trovata.</p>
    }

    return (
      <div class="bev-grid">
        {beverages.map((bev) => {
          const slug   = bev.slug ?? ""
          const name   = (bev.frontmatter?.title as string | undefined)
                          ?? slug.split("/").pop()?.replace(/-/g, " ")
                          ?? "Bevanda"
          const score  = parseFloat(String(bev.frontmatter?.score ?? "0"))
          const img    = bev.frontmatter?.img as string | undefined
          const desc   = stripMarkdown(bev.description ?? "")

          return (
            <div class="bev-card" key={slug}>
              <div class="bev-img-wrap">
                {img
                  ? <img src={`/${img.split("/").map(encodeURIComponent).join("/")}`} alt={name} class="bev-img" loading="lazy" />
                  : <div class="bev-img-placeholder">🥤</div>
                }
                <span
                  class="bev-score"
                  style={`background:${scoreColor(score)}`}
                >
                  {score.toFixed(1)}
                </span>
              </div>
              <div class="bev-body">
                <h3 class="bev-name">{name}</h3>
                {desc && <p class="bev-desc">{desc}</p>}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  BeverageList.css = `
    .bev-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1.25rem;
      margin-top: 1.5rem;
      margin-bottom: 3rem;
    }

    .bev-card {
      background: var(--light);
      border: 1px solid var(--lightgray);
      border-radius: 14px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform .2s ease, box-shadow .2s ease;
    }
    .bev-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 28px rgba(0,0,0,.10);
    }

    .bev-img-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      background: var(--lightgray);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .bev-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    .bev-img-placeholder {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      font-size: 3rem;
    }

    .bev-score {
      position: absolute;
      top: 8px; right: 8px;
      padding: 3px 9px;
      border-radius: 999px;
      font-size: .8rem;
      font-weight: 700;
      color: #111;
      box-shadow: 0 2px 6px rgba(0,0,0,.18);
    }

    .bev-body {
      padding: .75rem .9rem 2rem;
      display: flex; flex-direction: column; gap: .3rem;
      flex: 1;
    }
    .bev-name {
      margin: 0;
      font-size: .95rem;
      font-weight: 600;
      color: var(--dark);
      text-transform: capitalize;
      line-height: 1.3;
    }
    /* nasconde il listing automatico di Quartz nella pagina bevande */
    .bev-grid ~ * .page-listing,
    .page-listing { display: none; }

    .bev-desc {
      margin: 0 0 0.8rem 0;
      font-size: .8rem;
      color: var(--darkgray);
      line-height: 1.5;
    }
  `

  return BeverageList
}) satisfies QuartzComponentConstructor