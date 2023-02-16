import _ from "lodash";

// Check if the given value is not null or undefined
export const isNotNullOrUndefined = (e: any): Boolean => !_.isNull(e) && !_.isUndefined(e);

// Check if the given value is a object and not null or undefined
export const isObjectType = (e: object): Boolean => isNotNullOrUndefined(e) && _.isPlainObject(e);

// Check if the given value is a array and not null or undefined
export const isArrayType = (e: any[]): Boolean => isNotNullOrUndefined(e) && _.isArray(e);

// Check if the given value is a string and not null or undefined
export const isStringType = (e: string): Boolean => isNotNullOrUndefined(e) && _.isString(e);

// Check if the given value is a number and not null or undefined
export const isNumberType = (e: number): Boolean => isNotNullOrUndefined(e) && _.isFinite(e);

// Check if the given value is a boolean and not null or undefined
export const isBooleanType = (e: boolean): Boolean => isNotNullOrUndefined(e) && _.isBoolean(e);

// Check if the given valid value is empty
export const isEmpty = (e: any): Boolean => {
	if (isStringType(e) || isArrayType(e) || isObjectType(e)) {
		return _.size(e) === 0;
	} else if (isNumberType(e)) {
		return e === 0;
	} else {
		return true;
	}
};
