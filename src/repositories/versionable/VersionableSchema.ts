import { Schema } from "mongoose";

export class VersionableSchema extends Schema {
  constructor(options: any, collections: any) {
    const versionedOptions = Object.assign(
      {
        createdAt: {
          type: Date,
          default: Date.now
        },
        deletedAt: {
          type: Date,
          default: null
        },
        originalId: {
          type: String,
          required: true
        }
      },
      options
    );

    super(versionedOptions, collections);
  }
}
