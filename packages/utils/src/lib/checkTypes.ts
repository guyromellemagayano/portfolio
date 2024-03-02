import isArray from 'lodash/isArray'
import isBoolean from 'lodash/isBoolean'
import isFinite from 'lodash/isFinite'
import isNull from 'lodash/isNull'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import isUndefined from 'lodash/isUndefined'
import size from 'lodash/size'

/**
 * Check if the given value is not null or undefined
 * @param value - The value to check if not null or undefined.
 * @returns The result if the value is not null or undefined.
 */
export const isNotNullOrUndefined = <T>(
  value: T | null | undefined
): value is T => !isNull(value) && !isUndefined(value)

/**
 * Check if the given value is a object and not null or undefined
 * @param value - The value to check if object and not null or undefined.
 * @returns The result if the value is object and not null or undefined.
 */
export const isObjectType = <T>(value: T): value is T & object =>
  isNotNullOrUndefined(value) && isPlainObject(value)

/**
 * Check if the given value is a array and not null or undefined
 * @param value - The value to check if array and not null or undefined.
 * @returns The result if the value is array and not null or undefined.
 */
export const isArrayType = <T>(value: T): value is T & any[] =>
  isNotNullOrUndefined(value) && isArray(value)

/**
 * Check if the given value is a string and not null or undefined
 * @param value - The value to check if string and not null or undefined.
 * @returns The result if the value is string and not null or undefined.
 */
export const isStringType = (value: unknown): value is string =>
  isNotNullOrUndefined(value) && isString(value)

/**
 * Check if the given value is a number and not null or undefined
 * @param value - The value to check if number and not null or undefined.
 * @returns
 */
export const isNumberType = (value: unknown): value is number =>
  isNotNullOrUndefined(value) && isFinite(value as number)

/**
 * Check if the given value is a boolean and not null or undefined
 * @param value - The value to check if boolean and not null or undefined.
 * @returns The result if the value is boolean and not null or undefined.
 */
export const isBooleanType = (value: unknown): value is boolean =>
  isNotNullOrUndefined(value) && isBoolean(value)

/**
 * Check if the given valid value is empty
 * @param value - The value to check if empty.
 * @returns The result if the value is empty.
 */
export const isEmpty = (value: unknown): value is boolean =>
  isObjectType(value) || isArrayType(value) || isStringType(value)
    ? size(value) === 0
    : isNumberType(value)
      ? value === 0
      : !isNotNullOrUndefined(value)
