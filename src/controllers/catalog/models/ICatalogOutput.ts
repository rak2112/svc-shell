import { IEntity } from "../../../models/IEntity";

export interface ICatalogOutput extends IEntity {
  appCode: string;
  correlationId: string;
  credential: string;
  credentialExpiryTime: Date;
  resourceName: string;
  serviceCode: string;
  storageType: string;
  tenantId: string;
}
