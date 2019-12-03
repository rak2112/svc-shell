import { logger } from "../../libs";

import { catalogModel } from "./catalogModel";
import { ICatalogDocument } from "./ICatalogDocument";
import { ICreateInput, IGetAllInput, IGetResourceNamesInput, IUpdateInput } from "./models";
import { VersionableRepository } from "../versionable/VersionableRepository";

export class CatalogRepository extends VersionableRepository<ICatalogDocument> {
  constructor() {
    super(catalogModel);
  }

  public async getAll(input: IGetAllInput): Promise<ICatalogDocument[]> {
    logger.debug("CatalogRepository - get:", JSON.stringify(input));

    return super.getAll(input);
  }

  public create(input: ICreateInput): Promise<ICatalogDocument> {
    logger.debug("CatalogRepository - create:", JSON.stringify(input));

    return super.create(input);
  }

  public update(input: IUpdateInput): Promise<ICatalogDocument> {
    logger.debug("CatalogRepository - update:", JSON.stringify(input));

    return super.update(input);
  }

  public async getResourceNames(input: IGetResourceNamesInput): Promise<ICatalogDocument[]> {
    logger.debug("CatalogRepository - getResourceNames:", JSON.stringify(input));

    return super.getAll(input);
  }
}
