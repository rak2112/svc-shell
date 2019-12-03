export default {
  mockTenantCatalogData: {
    appCode: "appCode",
    correlationId: "correlationId",
    credential: "credential",
    credentialExpiryTime: "2019-11-24T11:55:09.675Z",
    resourceName: "resourceName",
    serviceCode: "serviceCode",
    storageType: "SQL",
    tenantId: "tenantId"
  },
  mockIncorrectStorageType: {
    appCode: "appCode",
    tenantId: "tenantId"
  },
  mockTenantCatalogGetData: {
    appCode: "appCode",
    serviceCode: "serviceCode",
    storageType: "SQL",
    tenantId: "tenantId"
  },
  mockTenantCatalogGetErrorData: {
    appCode: "appCode1",
    tenantId: "tenantId"
  },
  mockTenantCatalogGetMissingErrorData: {
    storageType: "SQL"
  },
  mockTenantCatalogResourceNamesData: {
    appCode: "appCode",
    storageType: "SQL",
    serviceCode: "serviceCode"
  },
  mockTenantCatalogResourceNamesErrorData: {
    appCode: "appCode1",
    storageType: "SQL",
    serviceCode: "serviceCode"
  }
};
