import { IVersionableCreateInput } from "../../versionable/models";

export interface ICreateInput extends IVersionableCreateInput {
  appCode: string;
  correlationId: string;
  credential: string;
  resourceName: string;
  serviceCode: string;
  storageType: string;
  tenantId: string;
}
