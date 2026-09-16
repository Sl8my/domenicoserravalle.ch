document.addEventListener("nav", () => {
  const page = document.querySelector<HTMLElement>(".beverage-page")
  if (!page) return

  const grid = page.querySelector<HTMLElement>(".bev-grid")
  const sort = page.querySelector<HTMLSelectElement>(".bev-sort")
  const cards = Array.from(page.querySelectorAll<HTMLElement>(".bev-card"))
  if (!grid || !sort) return

  const applySort = () => {
    const sorted = [...cards].sort((a, b) => {
      if (sort.value === "score-desc") {
        return Number(b.dataset.score ?? 0) - Number(a.dataset.score ?? 0)
      }
      if (sort.value === "score-asc") {
        return Number(a.dataset.score ?? 0) - Number(b.dataset.score ?? 0)
      }
      return Number(b.dataset.date ?? 0) - Number(a.dataset.date ?? 0)
    })

    sorted.forEach((card) => grid.appendChild(card))
  }

  sort.addEventListener("change", applySort)
  applySort()

  window.addCleanup(() => sort.removeEventListener("change", applySort))
})
