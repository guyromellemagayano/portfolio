/**
 * Check if the given value is not null or undefined
 * @param value - The value to check if not null or undefined.
 * @returns The result if the value is not null or undefined.
 */
export const isNotNullOrUndefined = <T>(
  value: T | null | undefined
): value is T => {
  return value !== null && value !== undefined
}

/**
 * Check if the given value is an object and not null or undefined
 * @param value - The value to check if object and not null or undefined.
 * @returns The result if the value is object and not null or undefined.
 */
export const isObjectType = <T>(value: T): value is T & object => {
  return (
    isNotNullOrUndefined(value) &&
    typeof value === 'object' &&
    !Array.isArray(value)
  )
}

/**
 * Check if the given value is an array and not null or undefined
 * @param value - The value to check if array and not null or undefined.
 * @returns The result if the value is array and not null or undefined.
 */
export const isArrayType = <T>(value: T): value is T & any[] => {
  return isNotNullOrUndefined(value) && Array.isArray(value)
}

/**
 * Check if the given value is a string and not null or undefined
 * @param value - The value to check if string and not null or undefined.
 * @returns The result if the value is string and not null or undefined.
 */
export const isStringType = (value: unknown): value is string => {
  return isNotNullOrUndefined(value) && typeof value === 'string'
}

/**
 * Check if the given value is a number and not null or undefined
 * @param value - The value to check if number and not null or undefined.
 * @returns The result if the value is number and not null or undefined.
 */
export const isNumberType = (value: unknown): value is number => {
  return (
    isNotNullOrUndefined(value) && typeof value === 'number' && !isNaN(value)
  )
}

/**
 * Check if the given value is a boolean and not null or undefined
 * @param value - The value to check if boolean and not null or undefined.
 * @returns The result if the value is boolean and not null or undefined.
 */
export const isBooleanType = (value: unknown): value is boolean => {
  return isNotNullOrUndefined(value) && typeof value === 'boolean'
}

/**
 * Check if the given value is empty
 * @param value - The value to check if empty.
 * @returns The result if the value is empty.
 */
export const isEmpty = (value: unknown): boolean => {
  if (isObjectType(value)) {
    return Object.keys(value).length === 0
  }

  if (isArrayType(value) || isStringType(value)) {
    return value.length === 0
  }

  if (isNumberType(value)) {
    return value === 0
  }

  return !isNotNullOrUndefined(value)
}

/**
 * Utility function to check if a value matches a specific type and is not null or undefined.
 * @param value - The value to be checked.
 * @param type - The type to check the value against ('object', 'array', 'string', 'number', 'boolean').
 * @returns A boolean indicating whether the value matches the specified type and is not null or undefined.
 */
export const isValidData = <T>(value: T, type: string): boolean => {
  switch (type) {
    case 'object':
      return isObjectType(value)
    case 'array':
      return isArrayType(value)
    case 'string':
      return isStringType(value)
    case 'number':
      return isNumberType(value)
    case 'boolean':
      return isBooleanType(value)
    default:
      return isNotNullOrUndefined(value)
  }
}
