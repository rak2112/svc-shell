import { IBaseUpdateInput } from "../../base/models";

export interface IVersionableUpdateInput extends IBaseUpdateInput {
  originalId: string;
}
