import { Fragment } from 'react'
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5'

type RatingStarsProps = {
  rating: number
}

export default function RatingStars(props: RatingStarsProps) {
  const { rating } = props

  const ratingRounded = Math.round(rating * 2) / 2
  const fullStars = Math.floor(ratingRounded)
  const halfStars = ratingRounded % 1 !== 0
  const emptyStar = 5 - Math.ceil(ratingRounded)

  return (
    <>
      {Array.from({ length: fullStars }).map((_, index) => (
        <Fragment key={index + 'fullstar'}>
          <IoStar className="size-4 text-yellow-500" />
        </Fragment>
      ))}

      {halfStars && <IoStarHalf className="size-4 text-yellow-500" />}

      {Array.from({ length: emptyStar }).map((_, index) => (
        <Fragment key={index + 'empty'}>
          <IoStarOutline className="size-4 text-yellow-500" />
        </Fragment>
      ))}
    </>
  )
}
