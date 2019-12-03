import { Document, Model, Query } from "mongoose";
import { logger } from "../../libs";
import { Nullable } from "../../entities";

import { IBaseCreateInput } from "./models";
import { lean, leanObject } from "../../libs/utilities";

export abstract class BaseRepository<D extends Document> {
  /**
   * Create new application
   * @property {string} id - Record unique identifier.
   * @returns {Application}
   */
  protected modelType: Model<D>;
  constructor(modelType) {
    this.modelType = modelType;
  }

  /**
   * Insert Many
   * @returns {Documents[]}
   */
  public async insertMany(input: IBaseCreateInput[], options?: any | null): Promise<D[]> {
    logger.debug("BaseRepository - insertMany:");
    return this.modelType.insertMany(input, options);
  }

  public count(conditions: any = {}): Query<number> {
    logger.debug("BaseRepository - count");
    return this.modelType.count(conditions);
  }

  protected async getAll(conditions: any, projection?: any | null, options?: any | null, populate?: any | null): Promise<D[]> {
    logger.debug("BaseRepository - getAll:");
    return populate
      ? (
          await this.modelType
            .find(conditions, projection, options)
            .populate(populate)
            .lean()
        ).map(leanObject)
      : (await this.modelType.find(conditions, projection, options).lean()).map(leanObject);
  }

  protected getOne(conditions: any, populate?: any | null): Promise<Nullable<D>> {
    return populate ? lean(this.modelType.findOne(conditions).populate(populate)) : lean(this.modelType.findOne(conditions));
  }
}
