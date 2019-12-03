import IResponse, { IData, IMetadata } from "./IResponse";
import { StatusCodes } from "../../libs/constants";

export default class OKResponse implements IResponse {
  constructor(public data: IData = null, public metadata: IMetadata = { code: StatusCodes.OK, message: "", timestamp: new Date() }) {}
}
