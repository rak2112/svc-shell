import { IEntity } from "../../models/IEntity";
import { IVersionableDocument } from "../versionable/IVersionableDocument";

export interface ICatalogDocument extends IVersionableDocument {
  appCode: string;
  correlationId: string;
  credential: string;
  credentialExpiryTime: Date;
  resourceName: string;
  serviceCode: string;
  storageType: string;
  tenantId: string;
}
