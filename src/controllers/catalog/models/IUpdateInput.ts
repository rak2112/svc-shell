export interface IUpdateInput {
  params: {
    id: string;
  };
  body: {
    credential: string;
    resourceName: string;
    credentialExpiryTime: Date;
  };
}
