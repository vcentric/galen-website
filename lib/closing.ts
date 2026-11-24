/**
 * The page's own closing call to action: the last dark block inside the page content that carries a primary button.
 * The sticky phone button hides while it is on screen, and the footer does not repeat its buttons on phones.
 */
export function findClosingCta(): Element | null {
  const blocks = [...document.querySelectorAll("main .tone-dark")].filter((el) => el.querySelector(".btn-primary"));
  const last = blocks[blocks.length - 1];
  if (!last) return null;
  // only counts if it sits in the final part of the page, not a dark panel half-way down
  const fromEnd = document.documentElement.scrollHeight - (last.getBoundingClientRect().bottom + window.scrollY);
  const footer = document.querySelector("footer")?.getBoundingClientRect().height ?? 0;
  return fromEnd - footer < 600 ? last : null;
}
