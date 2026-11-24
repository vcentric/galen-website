/** Pages that belong to the college side of the site (navbar and footer show the college version). */
export const isCollegePath = (p: string) =>
  p.startsWith("/institutions") || p.startsWith("/how-to-use/faculty") || p.startsWith("/how-to-use/administration");
