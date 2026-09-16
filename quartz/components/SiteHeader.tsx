import { FullSlug, pathToRoot, resolveRelative } from "../util/path"
import { concatenateResources } from "../util/resources"
import DarkmodeConstructor from "./Darkmode"
import SearchConstructor from "./Search"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Search = SearchConstructor({ enablePreview: false })
const Darkmode = DarkmodeConstructor()

const SiteHeader: QuartzComponent = (props: QuartzComponentProps) => {
  const { fileData, cfg } = props
  const slug = fileData.slug ?? ("index" as FullSlug)
  const isHome = slug === "index"
  const isBeverage = slug === "bevande/index" || slug.startsWith("bevande/")

  return (
    <div class="site-header">
      <a class="site-wordmark" href={pathToRoot(slug)} aria-label={`${cfg.pageTitle}, home`}>
        <span class="wordmark-full">Domenico Serravalle</span>
        <span class="wordmark-short">Domenico</span>
      </a>
      <nav class="site-nav" aria-label="Navigazione principale">
        <a href={pathToRoot(slug)} class="site-nav-link" aria-current={isHome ? "page" : undefined}>
          Note
        </a>
        <a
          href={resolveRelative(slug, "bevande/index" as FullSlug)}
          class="site-nav-link"
          aria-current={isBeverage ? "page" : undefined}
        >
          Bevande
        </a>
        <Search {...props} />
        <Darkmode {...props} />
      </nav>
    </div>
  )
}

SiteHeader.css = concatenateResources(
  Search.css,
  Darkmode.css,
  `
  .site-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    min-height: 2rem;
    padding: 0 0 1.15rem;
    border-bottom: 1px solid var(--lightgray);
  }

  .site-wordmark {
    color: var(--dark);
    font-family: var(--headerFont);
    font-size: 1rem;
    font-weight: 650;
    letter-spacing: -0.015em;
    white-space: nowrap;
  }

  .site-wordmark:hover {
    color: var(--secondary);
  }

  .wordmark-short {
    display: none;
  }

  .site-nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1.15rem;
  }

  .site-nav-link {
    color: var(--gray);
    font-size: 0.88rem;
    font-weight: 500;
    line-height: 2rem;
  }

  .site-nav-link:hover,
  .site-nav-link[aria-current="page"] {
    color: var(--dark);
  }

  .site-header .search {
    width: 2rem;
    min-width: 2rem;
  }

  .site-header .search > .search-button {
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: 0;
    border-radius: 50%;
    justify-content: center;
  }

  .site-header .search > .search-button:hover {
    background: var(--highlight);
  }

  .site-header .search > .search-button > p {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .site-header .search > .search-button svg {
    width: 17px;
    min-width: 17px;
    margin: 0;
  }

  .site-header .darkmode {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  .site-header .darkmode:hover {
    background: var(--highlight);
  }

  .site-header .darkmode svg {
    left: 6px;
  }

  .site-header .search-space {
    max-width: 46rem;
  }

  @media (max-width: 560px) {
    .site-header {
      gap: 1rem;
    }

    .site-wordmark {
      max-width: none;
    }

    .wordmark-full {
      display: none;
    }

    .wordmark-short {
      display: inline;
    }

    .site-nav {
      gap: 0.72rem;
    }

    .site-nav-link {
      font-size: 0.82rem;
    }
  }
  `,
)

SiteHeader.afterDOMLoaded = Search.afterDOMLoaded
SiteHeader.beforeDOMLoaded = Darkmode.beforeDOMLoaded

export default (() => SiteHeader) satisfies QuartzComponentConstructor
