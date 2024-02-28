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
export const convertStringToLowercase = (str: string) =>
  !isEmpty(str) ? toLower(str) : str

// Convert string to uppercase
export const convertStringToUppercase = (str: string) =>
  !isEmpty(str) ? toUpper(str) : str

// Convert string to title case
export const convertStringToTitleCase = (str: string) =>
  !isEmpty(str) ? startCase(camelCase(str)) : str

// Convert string to camel case
export const convertStringToCamelCase = (str: string) =>
  !isEmpty(str) ? camelCase(str) : str

// Convert string to snake case
export const convertStringToSnakeCase = (str: string) =>
  !isEmpty(str) ? snakeCase(str) : str

// Convert string to kebab case
export const convertStringToKebabCase = (str: string) =>
  !isEmpty(str) ? kebabCase(str) : str

// Convert string to constant case
export const convertStringToConstantCase = (str: string) =>
  !isEmpty(str) ? toUpper(str).replace(/ /g, '_') : str

// Convert string to sentence case
export const convertStringToSentenceCase = (str: string) =>
  !isEmpty(str) ? upperFirst(toLower(str)) : str

// Convert string to number
export const convertStringToNumber = (str: string) =>
  !isEmpty(str) ? toNumber(str) : str

// Convert string to boolean
export const convertStringToBoolean = (str: string) =>
  !isEmpty(str) ? str === 'true' : str

// Convert string to array
export const convertStringToArray = (str: string) =>
  !isEmpty(str) ? toArray(str) : str

// Convert string to object
export const convertStringToObject = (str: string) =>
  !isEmpty(str) ? JSON.parse(str) : str

// Convert object to string
export const convertObjectToString = (obj: object) =>
  !isEmpty(obj) ? JSON.stringify(obj) : obj

// Convert array to string
export const convertArrayToString = (arr: any[]) =>
  !isEmpty(arr) ? join(arr, ' ') : arr

// Convert number to string
export const convertNumberToString = (num: number) =>
  !isEmpty(num) ? toString(num) : num

// Convert string to HTML
export const convertStringToHTML = (str: string) =>
  !isEmpty(str) ? unescape(str) : str
