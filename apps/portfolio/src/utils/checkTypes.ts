import isArray from 'lodash/isArray'
import isBoolean from 'lodash/isBoolean'
import isFinite from 'lodash/isFinite'
import isNull from 'lodash/isNull'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import isUndefined from 'lodash/isUndefined'
import size from 'lodash/size'

// Check if the given value is not null or undefined
export const isNotNullOrUndefined = <T>(
  value: T | null | undefined
): value is T => {
  return !isNull(value) && !isUndefined(value)
}

// Check if the given value is a object and not null or undefined
export const isObjectType = <T>(value: T): value is T & object => {
  return isNotNullOrUndefined(value) && isPlainObject(value)
}

// Check if the given value is a array and not null or undefined
export const isArrayType = <T>(value: T): value is T & any[] => {
  return isNotNullOrUndefined(value) && isArray(value)
}

// Check if the given value is a string and not null or undefined
export const isStringType = (value: unknown): value is string => {
  return isNotNullOrUndefined(value) && isString(value)
}

// Check if the given value is a number and not null or undefined
export const isNumberType = (value: unknown): value is number => {
  return isNotNullOrUndefined(value) && isFinite(value as number)
}

// Check if the given value is a boolean and not null or undefined
export const isBooleanType = (value: unknown): value is boolean => {
  return isNotNullOrUndefined(value) && isBoolean(value)
}

// Check if the given valid value is empty
export const isEmpty = (value: unknown): boolean => {
  if (isObjectType(value) || isArrayType(value) || isStringType(value)) {
    return size(value) === 0
  } else if (isNumberType(value)) {
    return value === 0
  } else {
    return !isNotNullOrUndefined(value)
  }
}
