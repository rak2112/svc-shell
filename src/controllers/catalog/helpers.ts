import { ICatalogOutput, IListOutput, IGetResourceNamesOutput } from "./models";

export function convertToCatalogOutput(catalog: any): ICatalogOutput {
  return {
    id: catalog.id,
    appCode: catalog.appCode,
    correlationId: catalog.correlationId,
    credential: catalog.credential,
    credentialExpiryTime: catalog.credentialExpiryTime,
    resourceName: catalog.resourceName,
    serviceCode: catalog.serviceCode,
    storageType: catalog.storageType,
    tenantId: catalog.tenantId
  };
}

export function convertToCatalogResourceNamesOutput(catalog: any): IGetResourceNamesOutput {
  return {
    credential: catalog.credential,
    resourceName: catalog.resourceName
  };
}
