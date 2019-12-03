import * as mongoose from "mongoose";

import { ICatalogDocument } from "./ICatalogDocument";
import { CatalogSchema } from "./CatalogSchema";

/**
 * Client Schema
 */
const catalogSchema = new CatalogSchema(
  {
    id: String
  },
  {
    collection: "Catalogs",
    versionKey: false
  }
);

/**
 * indexes
 */
catalogSchema.index({ tenantId: 1, appCode: 1, serviceCode: 1, storageType: 1, deletedAt: 1 }, { unique: true });

/**
 * @typedef Catalog
 */
export const catalogModel: mongoose.Model<ICatalogDocument> = mongoose.model<ICatalogDocument>("Catalog", catalogSchema);
