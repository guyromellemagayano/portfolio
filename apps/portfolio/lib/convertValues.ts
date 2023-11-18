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

// Convert string to lowercase
export function convertStringToLowercase(str: string): string {
  return !isEmpty(str) ? toLower(str) : str
}

// Convert string to uppercase
export function convertStringToUppercase(str: string): string {
  return !isEmpty(str) ? toUpper(str) : str
}

// Convert string to title case
export function convertStringToTitleCase(str: string): string {
  return !isEmpty(str) ? startCase(camelCase(str)) : str
}

// Convert string to camel case
export function convertStringToCamelCase(str: string): string {
  return !isEmpty(str) ? camelCase(str) : str
}

// Convert string to snake case
export function convertStringToSnakeCase(str: string): string {
  return !isEmpty(str) ? snakeCase(str) : str
}

// Convert string to kebab case
export function convertStringToKebabCase(str: string): string {
  return !isEmpty(str) ? kebabCase(str) : str
}

// Convert string to constant case
export function convertStringToConstantCase(str: string): string {
  return !isEmpty(str) ? toUpper(str).replace(/ /g, '_') : str
}

// Convert string to sentence case
export function convertStringToSentenceCase(str: string): string {
  return !isEmpty(str) ? upperFirst(toLower(str)) : str
}

// Convert string to number
export function convertStringToNumber(str: string): string | number {
  return !isEmpty(str) ? toNumber(str) : str
}

// Convert string to boolean
export function convertStringToBoolean(str: string): string | boolean {
  return !isEmpty(str) ? str === 'true' : str
}

// Convert string to array
export function convertStringToArray(str: string): string | any[] {
  return !isEmpty(str) ? toArray(str) : str
}

// Convert string to object
export function convertStringToObject(str: string): string | object {
  try {
    return !isEmpty(str) ? JSON.parse(str) : str
  } catch {
    return str
  }
}

// Convert object to string
export function convertObjectToString(obj: object): object | string {
  return !isEmpty(obj) ? JSON.stringify(obj) : obj
}

// Convert array to string
export function convertArrayToString(arr: any[]): string | any[] {
  return !isEmpty(arr) ? join(arr, ' ') : arr
}

// Convert number to string
export function convertNumberToString(num: number): string | number {
  return !isEmpty(num) ? toString(num) : num
}

// Convert string to HTML
export function convertStringToHTML(str: string): string | React.ReactNode {
  return !isEmpty(str) ? unescape(str) : str
}
