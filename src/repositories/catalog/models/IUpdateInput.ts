import { IVersionableUpdateInput } from "../../versionable/models";

export interface IUpdateInput extends IVersionableUpdateInput {
  credential: string;
  credentialExpiryTime: Date;
  resourceName: string;
}
