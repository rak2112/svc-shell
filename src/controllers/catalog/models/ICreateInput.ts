export interface ICreateInput {
  body: {
    appCode: string;
    correlationId: string;
    credential: string;
    credentialExpiryTime: Date;
    resourceName: string;
    serviceCode: string;
    storageType: string;
    tenantId: string;
  };
}
