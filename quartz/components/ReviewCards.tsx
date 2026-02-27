import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, simplifySlug } from "../util/path"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

export default (() => {
  const ReviewCards: QuartzComponent = ({ allFiles, displayClass, fileData }: QuartzComponentProps) => {
    // Filtriamo solo i file nella cartella 'Bevande' e che hanno il tipo 'bevanda'
    const reviews = allFiles.filter((file) => 
      file.slug?.startsWith("bevande/") && file.frontmatter?.type === "bevanda"
    )

    return (
      <div className={classNames(displayClass, "review-grid")}>
        {reviews.map((review) => (
          <div key={review.slug} className="review-card">
            {review.frontmatter?.img && (
              <img 
                src={review.frontmatter.img} 
                alt={review.frontmatter.title} 
                className="card-img" 
              />
            )}
            <div className="card-content">
              <h3><a href={simplifySlug(review.slug as FullSlug)}>{review.frontmatter?.title}</a></h3>
              <div className="score-badge">⭐ {review.frontmatter?.score}</div>
              <p>{review.content.substring(0, 100)}...</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Aggiungiamo un po' di CSS specifico
  ReviewCards.css = `
  .review-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }
  .review-card {
    border: 1px solid var(--lightgray);
    border-radius: 8px;
    overflow: hidden;
    background: var(--light);
    transition: transform 0.2s ease;
  }
  .review-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
  .card-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  .card-content {
    padding: 1rem;
  }
  .score-badge {
    background: var(--secondary);
    color: white;
    display: inline-block;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
  `
  return ReviewCards
}) satisfies QuartzComponentConstructor