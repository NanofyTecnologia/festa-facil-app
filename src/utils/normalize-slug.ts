export function normalizeSlug(slug: string[]) {
  const isEditing = slug.includes('editar')

  const idRegex = /^c[a-z0-9]{24,32}/

  const hasId = idRegex.test(slug[0])

  const id = hasId ? slug[0] : undefined

  return { isEditing, id }
}
