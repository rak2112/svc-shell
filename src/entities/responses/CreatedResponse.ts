import IResponse, { IData, IMetadata } from "./IResponse";
import { StatusCodes } from "../../libs";
export default class CreatedResponse implements IResponse {
  constructor(public data: IData = null, public metadata: IMetadata = { code: StatusCodes.OK, message: "", timestamp: new Date() }) {}
}
