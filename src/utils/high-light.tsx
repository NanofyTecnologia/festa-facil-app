import { Fragment } from 'react'

import { normalize } from './normalize'

export const highLight = (text: string, search: string) => {
  if (!search.length) return <>{text}</>

  const normalizeTitle = normalize(text)
  const normalizeSearch = normalize(search)

  if (!normalizeTitle.includes(normalizeSearch)) return <>{text}</>

  const split = normalizeTitle.split(normalizeSearch)
  let cursor = 0

  return split.map((sl, index) => {
    const fragment = text.substring(cursor, cursor + sl.length)

    if (index !== split.length - 1) {
      cursor += sl.length

      const final = (
        <Fragment key={Date.now().toString() + index}>
          {fragment}

          <span className="rounded-md bg-app-cyan/50">
            {text.substring(cursor, cursor + normalizeSearch.length)}
          </span>
        </Fragment>
      )

      cursor += normalizeSearch.length
      return final
    }

    return fragment
  })
}
