import DBError from "./DBError";
import { StatusCodes } from "../../libs/constants";
import { getEnumKeyOrValue } from "../../libs/utilities";

export default class DuplicateKeyError extends DBError {
  constructor(column: string, value: string = "") {
    super(
      getEnumKeyOrValue(StatusCodes, StatusCodes.UNPROCESSABLE),
      [
        {
          location: column,
          msg: "One record with this name already exist and it can not be duplicated.",
          param: column,
          value
        }
      ],
      DuplicateKeyError.name
    );
  }
}

// class DuplicateError implements IError {

//   public static ERROR_TYPE = 'DuplicateError';
//   public static ERROR_VALUE = 'Duplicate Value';
//   public static ERROR_MSG = 'One record with this name already exist and it can not be duplicated.';
//   public msg: string;
//   public param: string;
//   public value: any;
//   public type: string;
//   public location: string;
//   /**
//    * Creates an API error.
//    * @param {string} message - Error message.
//    * @param {string} duplicateVariable - Variable being duplicate.
//    * @param {string} duplicateValue - Value of the variable being duplicate.
//    * @param {boolean} isPublic - Whether the message should be visible to user or not.
//    */
//   constructor(
//     param: string
//   ) {
//     this.msg = DuplicateError.ERROR_MSG;
//     this.param = param;
//     this.value = DuplicateError.ERROR_VALUE;
//     this.type = DuplicateError.ERROR_TYPE;
//   }
// }

// export default DuplicateError;
