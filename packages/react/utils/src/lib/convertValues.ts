import camelCase from 'lodash/camelCase'
import join from 'lodash/join'
import kebabCase from 'lodash/kebabCase'
import snakeCase from 'lodash/snakeCase'
import startCase from 'lodash/startCase'
import toArray from 'lodash/toArray'
import toLower from 'lodash/toLower'
import toNumber from 'lodash/toNumber'
import toString from 'lodash/toString'
import toUpper from 'lodash/toUpper'
import unescape from 'lodash/unescape'
import upperFirst from 'lodash/upperFirst'

import { isEmpty } from './checkTypes'

/**
 * Convert string to lowercase
 * @param str - The string to convert to lowercase.
 * @returns The converted string to lowercase.
 */
export const convertStringToLowercase = (str: string) =>
  !isEmpty(str) ? toLower(str) : str

/**
 * Convert string to uppercase
 * @param str - The string to convert to uppercase.
 * @returns The converted string to uppercase.
 */
export const convertStringToUppercase = (str: string) =>
  !isEmpty(str) ? toUpper(str) : str

/**
 * Convert string to title case
 * @param str - The string to convert to title case.
 * @returns The converted string to title case.
 */
export const convertStringToTitleCase = (str: string) =>
  !isEmpty(str) ? startCase(camelCase(str)) : str

/**
 * Convert string to camel case
 * @param str - The string to convert to camel case.
 * @returns The converted string to camel case.
 */
export const convertStringToCamelCase = (str: string) =>
  !isEmpty(str) ? camelCase(str) : str

/**
 * Convert string to snake case
 * @param str - The string to convert to snake case.
 * @returns The converted string to snake case.
 */
export const convertStringToSnakeCase = (str: string) =>
  !isEmpty(str) ? snakeCase(str) : str

/**
 * Convert string to kebab case
 * @param str - The string to convert to kebab case.
 * @returns The converted string to kebab case.
 */
export const convertStringToKebabCase = (str: string) =>
  !isEmpty(str) ? kebabCase(str) : str

/**
 * Convert string to constant case
 * @param str - The string to convert to constant case.
 * @returns The converted string to constant case.
 */
export const convertStringToConstantCase = (str: string) =>
  !isEmpty(str) ? toUpper(str).replace(/ /g, '_') : str

/**
 * Convert string to sentence case
 * @param str - The string to convert to sentence case.
 * @returns - The converted string to sentence case.
 */
export const convertStringToSentenceCase = (str: string) =>
  !isEmpty(str) ? upperFirst(toLower(str)) : str

/**
 * Convert string to number
 * @param str - The string to convert to number.
 * @returns The converted string to number.
 */
export const convertStringToNumber = (str: string) =>
  !isEmpty(str) ? toNumber(str) : str

/**
 * Convert string to boolean
 * @param str - The string to convert to boolean.
 * @returns The converted string to boolean.
 */
export const convertStringToBoolean = (str: string) =>
  !isEmpty(str) ? str === 'true' : str

/**
 * Convert string to array
 * @param str - The string to convert to array.
 * @returns The converted string to array.
 */
export const convertStringToArray = (str: string) =>
  !isEmpty(str) ? toArray(str) : str

/**
 * Convert string to object
 * @param str - The string to convert to object.
 * @returns The converted string to object.
 */
export const convertStringToObject = (str: string) =>
  !isEmpty(str) ? JSON.parse(str) : str

/**
 * Convert object to string
 * @param obj - The object to convert to string.
 * @returns The converted object to string.
 */
export const convertObjectToString = (obj: object) =>
  !isEmpty(obj) ? JSON.stringify(obj) : obj

/**
 * Convert array to string
 * @param arr - The array to convert to string.
 * @returns The converted array to string.
 */
export const convertArrayToString = (arr: any[]) =>
  !isEmpty(arr) ? join(arr, ' ') : arr

/**
 * Convert number to string
 * @param num - The number to convert to string.
 * @returns The converted number to string.
 */
export const convertNumberToString = (num: number) =>
  !isEmpty(num) ? toString(num) : num

/**
 * Convert string to HTML
 * @param str - The string to convert to HTML.
 * @returns The converted string to HTML.
 */
export const convertStringToHTML = (str: string) =>
  !isEmpty(str) ? unescape(str) : str
