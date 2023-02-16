import _ from "lodash";
import React from "react";
import { isEmpty } from "./checkTypes";

// Convert string to lowercase
export const convertStringToLowercase = (e: string): String => (!isEmpty(e) ? _.toLower(e) : e);

// Convert string to uppercase
export const convertStringToUppercase = (e: string): String => (!isEmpty(e) ? _.toUpper(e) : e);

// Convert string to title case
export const convertStringToTitleCase = (e: string): String => (!isEmpty(e) ? _.startCase(_.camelCase(e)) : e);

// Convert string to camel case
export const convertStringToCamelCase = (e: string): String => (!isEmpty(e) ? _.camelCase(e) : e);

// Convert string to snake case
export const convertStringToSnakeCase = (e: string): String => (!isEmpty(e) ? _.snakeCase(e) : e);

// Convert string to kebab case
export const convertStringToKebabCase = (e: string): String => (!isEmpty(e) ? _.kebabCase(e) : e);

// Convert string to constant case
export const convertStringToConstantCase = (e: string): String => (!isEmpty(e) ? _.toUpper(e).replace(/ /g, "_") : e);

// Convert string to sentence case
export const convertStringToSentenceCase = (e: string): String => (!isEmpty(e) ? _.upperFirst(_.toLower(e)) : e);

// Convert string to number
export const convertStringToNumber = (e: string): String | Number => (!isEmpty(e) ? _.toNumber(e) : e);

// Convert string to boolean
export const convertStringToBoolean = (e: string): String | Boolean => (!isEmpty(e) ? e === "true" : e);

// Convert string to array
export const convertStringToArray = (e: string): String | any[] => (!isEmpty(e) ? _.toArray(e) : e);

// Convert string to object
export const convertStringToObject = (e: string): String | Object => (!isEmpty(e) ? JSON.parse(e) : e);

// Convert object to string
export const convertObjectToString = (e: object): Object | String => (!isEmpty(e) ? JSON.stringify(e) : e);

// Convert array to string
export const convertArrayToString = (e: any[]): String | any[] => (!isEmpty(e) ? _.join(e, " ") : e);

// Convert number to string
export const convertNumberToString = (e: number): String | Number => (!isEmpty(e) ? _.toString(e) : e);

// Convert string to HTML
export const convertStringToHTML = (e: string): String | React.ReactNode => (!isEmpty(e) ? _.unescape(e) : e);
