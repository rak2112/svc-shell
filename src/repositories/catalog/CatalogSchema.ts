import { VersionableSchema } from "../versionable/VersionableSchema";

export class CatalogSchema extends VersionableSchema {
  constructor(options: any, collections: any) {
    const schema = {
      appCode: {
        required: true,
        type: String
      },
      correlationId: {
        required: true,
        type: String
      },
      credential: {
        required: true,
        type: String
      },
      credentialExpiryTime: {
        required: true,
        type: Date
      },
      resourceName: {
        required: true,
        type: String
      },
      serviceCode: {
        required: true,
        type: String
      },
      storageType: {
        required: true,
        type: String
      },
      tenantId: {
        required: true,
        type: String
      }
    };

    super(schema, collections);
  }
}
