export interface IListInput {
  query: {
    appCode: string;
    serviceCode?: string;
    storageType?: string;
    tenantId?: string;
  };
}
