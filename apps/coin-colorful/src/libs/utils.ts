export type OmitCustom<T, K> = Pick<T, Exclude<keyof T, K>>
export type OmitRecursive<T, K> = OmitCustom<
  { [P in keyof T]: OmitDistributive<T[P], K> },
  K
>
export type OmitDistributive<T, K> = T extends any
  ? T extends object
    ? Id<OmitRecursive<T, K>>
    : T
  : never
export type Id<T> = Record<string, never> & { [P in keyof T]: T[P] }

/**
 * Executes the provided expression and returns its value if it is not null or undefined.
 * If an error occurs during the execution of the expression, the default value is returned.
 * @template T - The type of the value returned by the expression.
 * @param {() => T} exp - The expression to execute.
 * @param {T | undefined | null} [d=undefined] - The default value to return if the expression is null or undefined.
 * @returns The value returned by the expression, or the default value if the expression is null or undefined.
 */
export const tryGet = <T>(
  exp: () => T,
  d: T | undefined | null = undefined
): T | undefined | null => {
  try {
    const val = exp()

    if (val != null) {
      return val
    }
  } catch {
    /* noop */
  }

  return d
}

/**
 * Optimizes line breaks in a string by replacing the last space with a non-breaking space.
 * @param str - The input string to optimize.
 * @returns The optimized string with a non-breaking space.
 */
export const optimizeLineBreak = (str: string): string => {
  const tokens = str?.split(' ') ?? []

  if (tokens && tokens?.length < 3) {
    return str
  }

  const lastToken = tokens.pop()

  return `${tokens.join(' ')}\u00A0${lastToken}`
}
