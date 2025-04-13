'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Star } from 'lucide-react'
import clsx from 'clsx'

type StarRatingContextType = {
  value: number
  hovered: number | null
  setHovered: (value: number | null) => void
  onChange?: (value: number) => void
  readOnly?: boolean
}

const StarRatingContext = createContext<StarRatingContextType | null>(null)

function useStarRating() {
  const context = useContext(StarRatingContext)
  if (!context) {
    throw new Error(
      'StarRating components must be used within <StarRating.Root>'
    )
  }
  return context
}

type StarRatingRootProps = {
  value: number
  onChange?: (value: number) => void
  readOnly?: boolean
  children: ReactNode
}

function StarRatingRoot({
  value,
  onChange,
  readOnly = false,
  children
}: StarRatingRootProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <StarRatingContext.Provider
      value={{ value, hovered, setHovered, onChange, readOnly }}
    >
      <div className="flex gap-1">{children}</div>
    </StarRatingContext.Provider>
  )
}

type StarProps = {
  starValue: number
}

function StarRatingStar({ starValue }: StarProps) {
  const { value, hovered, setHovered, onChange, readOnly } = useStarRating()

  const isFilled = hovered !== null ? starValue <= hovered : starValue <= value

  return (
    <Star
      className={clsx(
        'h-6 w-6 transition-colors',
        readOnly ? 'cursor-default' : 'cursor-pointer',
        isFilled
          ? 'fill-yellow-200 text-yellow-200'
          : 'text-muted-foreground fill-zinc-200 text-zinc-200'
      )}
      onMouseEnter={() => !readOnly && setHovered(starValue)}
      onMouseLeave={() => !readOnly && setHovered(null)}
      onClick={() => !readOnly && onChange?.(starValue)}
    />
  )
}

// Exportando como namespace pattern
export const StarRating = {
  Root: StarRatingRoot,
  Star: StarRatingStar
}
