import { logger } from "../../libs";
import { CreatedResponse, IResponse, OKResponse } from "../../entities";

import { convertToCatalogOutput, convertToCatalogResourceNamesOutput } from "./helpers";
import { ICreateInput, IListInput, IGetResourceNamesInput, IUpdateInput } from "./models";
import { CatalogRepository } from "../../repositories/catalog/CatalogRepository";

class CatalogController {
  private catalogRepository: CatalogRepository;

  constructor() {
    this.catalogRepository = new CatalogRepository();
  }

  public async list({ query }: IListInput): Promise<IResponse> {
    logger.debug("CatalogController - list:", JSON.stringify(query));

    const catalogs = await this.catalogRepository.getAll(query);

    return new OKResponse(catalogs.map(convertToCatalogOutput));
  }

  public async create({ body }: ICreateInput): Promise<IResponse> {
    logger.debug("CatalogController - create:", JSON.stringify(body));

    const catalog = await this.catalogRepository.create(body);

    return new CreatedResponse({
      id: catalog.id
    });
  }

  public async update({ body, params: { id } }: IUpdateInput): Promise<IResponse> {
    logger.debug("CatalogController - update:", JSON.stringify(body));

    await this.catalogRepository.update({
      originalId: id,
      ...body
    });

    return new OKResponse();
  }

  public async getResourceNames({ query }: IGetResourceNamesInput): Promise<IResponse> {
    logger.debug("CatalogController - getResourceNames:", JSON.stringify(query));

    const resourceNames = await this.catalogRepository.getResourceNames(query);

    return new OKResponse(resourceNames.map(convertToCatalogResourceNamesOutput));
  }
}

export default new CatalogController();
