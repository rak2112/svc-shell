import * as mongoose from "mongoose";
import { Document, DocumentQuery } from "mongoose";

/****************************************************************************************
 * MONGODB VALIDATIONS*
 ****************************************************************************************/
export const generateObjectId = () => mongoose.Types.ObjectId();

export const isValidObjectId = (id: any): boolean => new RegExp("^[0-9a-fA-F]{24}$").test(id);

export async function lean<D extends Document>(document: DocumentQuery<D | null, D>): Promise<D> {
  try {
    return leanObject(await document.lean());
  } catch (err) {
    return err;
  }
}

export function leanObject<E extends any>(obj: E): E {
  try {
    if (obj && obj._id) {
      obj.id = obj._id;

      delete obj._id;
      delete obj.__v;
    }

    return obj;
  } catch (err) {
    return err;
  }
}

export function isNullOrUndefined(x): boolean {
  return x === null || x === undefined;
}

export function isEmpty(val) {
  if (typeof val === "string") {
    return !val || 0 === val.trim().length;
  }
  if (val === 0) {
    return false;
  }
  return !val || 0 === val.length;
}

export const isBoolean = (item): boolean => typeof item === "boolean";
export const isObject = (item): boolean => item && typeof item === "object" && item.constructor === Object && Object.keys(item).length > 0;
export const isPositiveInteger = (skip: string): boolean => new RegExp("^(0*[1-9]+[0-9]*)$").test(skip);
export const isString = (item): boolean => typeof item === "string";
export const isValidEmail = (email: string): boolean => new RegExp("[a-zA-Z0-9_]+.[a-zA-Z0-9_]+@[a-zA-Z0-9]+.[a-z]{1,8}").test(email);
export const isValidUTCDate = date => /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z$/.test(date);

export function isValidDate(value, format = null) {
  try {
    if (isNullOrUndefined(format)) {
      return isNaN(new Date(value).getTime()) ? false : true;
    } else {
      const parms = value.split(/[\-\/]/);
      const yyyy = parseInt(parms[2], 10);
      const mm = parseInt(parms[1], 10);
      const dd = parseInt(parms[0], 10);
      const date = new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
      return mm === date.getMonth() + 1 && dd === date.getDate() && yyyy === date.getFullYear();
    }
  } catch (err) {
    return false;
  }
}

export function isValidArrayOfIds(arr) {
  if (Array.isArray(arr)) {
    return arr.every(item => isValidObjectId(item));
  }
  return false;
}

export function isValidArrayOfNumbers(arr) {
  if (Array.isArray(arr)) {
    return arr.every(item => typeof item === "number");
  }
  return false;
}

export function isValidArrayOfStrings(arr) {
  if (Array.isArray(arr)) {
    return arr.every(item => typeof item === "string");
  }
  return false;
}

export async function mapSync(arr: any[], func: Function) {
  const result = [];

  for (const item of arr) {
    result.push(await func(item));
  }

  return result;
}

/**
 * Returns true if existing entity has the specified id.
 * @param id 'id' to test.
 * @returns A Function that takes the object to test
 */
export function negate(fn) {
  return function negated(...args) {
    return !fn(...args);
  };
}

/**
 * Returns the value of a key in a given object
 * @param key 'key' to test.
 * @returns A Function that takes the object to test
 */
export function pluck(key: string) {
  return function(obj: any) {
    return obj[key];
  };
}

/**
 * Returns true if an item is the same as the other one.
 * @param x Item 1 to test.
 * @returns A Function that takes the second item to test
 */
export function isSame(x) {
  return function(y) {
    return x === y;
  };
}

export function isSameString(a: string, isCaseSensitive: boolean = false) {
  return function(b: string) {
    return a && b && (isCaseSensitive ? a === b : a.toLowerCase() === b.toLowerCase());
  };
}

/**
 * Returns true if existing entity has the specified id.
 * @param id 'id' to test.
 * @returns A Function that takes the object to test
 */
export function isSameEntity(id, isCaseSensitive: boolean = false) {
  return function isSameId(entity) {
    return id && entity && (isCaseSensitive ? entity.id === id : entity.id.toLowerCase() === id.toLowerCase());
  };
}

/**
 * Returns true if a field of an object is same as the item.
 * @param item Item to test.
 * @returns A Function that takes the field of the object to test
 */
export function isSameItemAsField(item) {
  return function(field) {
    return function(obj) {
      return obj[field] === item;
    };
  };
}

export function convertToCodeNameOutput(entity: any) {
  return {
    code: entity.code,
    name: entity.name
  };
}
/**
 * Returns string representation of the key or value of the item in the enum list.
 * @param enums Enum list.
 * @param enumKeyOrValue Key or Value in the enum list.
 * @returns A new object that has same structure as the input.
 */
export function getEnumKeyOrValue(enums: any, enumKeyOrValue: any): string {
  return enums[enumKeyOrValue];
}

// export function getInvalidUserIds(users: any, userIds: string[]): string[] {
//   return userIds.filter(userId => !users.some(isSameItemAsField(userId)("internalId")));
// }

/**
 * Sorts a list of data (case-insensitive)
 * @param data The data to sort
 * @param sortBy The field that will be used in sorting
 * @param isAsc Indicates if sort direction ascending or non-ascengind (descending)
 */
export function sort(data: any[], sortBy?: string, isAsc: boolean = true) {
  return data.sort((a, b) => {
    return isAsc ? (sortBy ? compare(a[sortBy], b[sortBy]) : compare(a, b)) : sortBy ? compare(b[sortBy], a[sortBy]) : compare(b, a);
  });
}

/**
 * Compares two items (case-insensitive - used mainly for sorting).
 * @param a The first item to compare
 * @param b The second item to compare
 * @returns -1, 0 or 1
 */
export function compare(a: string | number, b: string | number) {
  if (typeof a === "string" && typeof b === "string") {
    a = a.toLowerCase();
    b = b.toLowerCase();
  }

  return a === b ? 0 : a < b ? -1 : 1;
}

// export function getUniqueElements(items): any[] {
//   const uniqueSet = new Set();
//   items.forEach(item => uniqueSet.add(item));
//   return Array.from(uniqueSet.values());
// }

/**
 * Converts array of objects to Object
 * @param array array of object
 * @param key unique key present in each object in array
 */
// export function arrayToObject(array: any[], key: string) {
//   return array.reduce((result, item) => {
//     const id = item[key];
//     result[id] = item;
//     return result;
//   }, {});
// }

// function isSameSimpleArrays(arr1, arr2): boolean {
//   if (!Array.isArray(arr1) || !Array.isArray(arr2) || arr1.length !== arr2.length) {
//     return false;
//   }

//   if (arr1.length === 0 && arr2.length === 0) {
//     return true;
//   }

//   return arr1.every(item => arr2.includes(item));
// }

interface ISlice {
  skip?: number;
  limit?: number;
}
export function sliceData(data: any[], { limit = 1000, skip = 0 }: ISlice) {
  return limit === -1 ? data.slice(skip) : data.slice(skip, skip + limit);
}
