import { IBaseDeleteInput } from "../../base/models";

export interface IVersionableDeleteInput extends IBaseDeleteInput {
  originalId: string;
}
