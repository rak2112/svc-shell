import { isValidObjectId, isValidArrayOfIds, isValidArrayOfStrings, isValidDate, HttpRequestLocation } from "../libs";

export const commonValidations = Object.freeze({
  checkDate(paramName, HttprequestLocation = HttpRequestLocation.params, isRequired = true) {
    return {
      in: [HttprequestLocation],
      optional: !isRequired,
      custom: {
        options: (val: string) => isValidDate(val),
        errorMessage: `${paramName} should be a Valid Date!`
      }
    };
  },
  checkNumber(paramName, HttprequestLocation = HttpRequestLocation.params, isRequired = true) {
    return {
      in: [HttprequestLocation],
      optional: !isRequired,
      custom: {
        options: id => {
          const regex = RegExp(/\d/);
          return regex.test(id);
        },
        errorMessage: `${paramName} should be a number!`
      }
    };
  },
  checkObjectId(paramName, HttprequestLocation = HttpRequestLocation.params, isRequired = true) {
    return {
      in: [HttprequestLocation],
      optional: !isRequired,
      custom: {
        options: (id: string) => isValidObjectId(id),
        errorMessage: `${paramName} should be an ObjectId!`
      }
    };
  },
  checkObjectIds(paramName, HttprequestLocation = HttpRequestLocation.body, isRequired = true) {
    return {
      in: [HttprequestLocation],
      errorMessage: `${paramName} should be an array of ObjectIds!`,
      optional: !isRequired,
      isArray: true,
      custom: {
        options: (ids: string[]) => isValidArrayOfIds(ids),
        errorMessage: `${paramName} Bad Format!`
      }
    };
  },
  checkString(paramName, HttprequestLocation, isRequired = true) {
    return {
      in: [HttprequestLocation],
      errorMessage: `${paramName} should be a string!`,
      optional: !isRequired,
      isString: true
    };
  },
  checkStrings(paramName, HttprequestLocation = HttpRequestLocation.body, isRequired = true) {
    return {
      in: [HttprequestLocation],
      errorMessage: `${paramName} should be an Array of strings!`,
      optional: !isRequired,
      isArray: true,
      custom: {
        options: (names: string[]) => isValidArrayOfStrings(names),
        errorMessage: `${paramName} should be a string!`
      }
    };
  }
});
