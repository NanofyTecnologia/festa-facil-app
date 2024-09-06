import * as React from 'react'

export default function Grill(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width={64}
      height={64}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <path fill="url(#pattern0_10_51)" d="M0 0H64V64H0z" />
      <defs>
        <pattern
          id="pattern0_10_51"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use xlinkHref="#image0_10_51" transform="scale(.01563)" />
        </pattern>
        <image
          id="image0_10_51"
          width={64}
          height={64}
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  )
}
