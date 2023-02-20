import { IClampProps } from '@/interfaces/utils'

// Return a number between min and max
const clamp = ({ number, a, b }: IClampProps): number => {
  const min = Math.min(a, b)
  const max = Math.max(a, b)

  return Math.min(Math.max(number, min), max)
}

export default clamp
