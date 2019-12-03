import { Model, Query } from "mongoose";
import { logger } from "../../libs";
import { Nullable } from "../../entities";

import { IVersionableCreateInput, IVersionableDeleteInput, IVersionableUpdateInput } from "./models";
import { BaseRepository } from "../base/BaseRepository";
import { IVersionableDocument } from "./IVersionableDocument";
import { generateObjectId, lean } from "../../libs/utilities";

export class VersionableRepository<D extends IVersionableDocument> extends BaseRepository<D> {
  constructor(modelType: Model<D>) {
    super(modelType);
  }

  /**
   * Create new application
   * @property {string} body.name - The name of record.
   * @returns {Application}
   */
  public async create(input: IVersionableCreateInput): Promise<D> {
    logger.debug("VersionableRepository - create:", JSON.stringify(input));

    const id = input.id || generateObjectId();

    const model = new this.modelType({
      ...input,
      _id: id,
      originalId: id
    });

    return await model.save();
  }

  /**
   * Insert Many
   * @returns {Documents[]}
   */
  public async insertMany(docs: IVersionableCreateInput[], options?: any | null): Promise<D[]> {
    logger.debug("VersionableRepository - insertMany:");

    const docsToInsert: any = docs.map(item => {
      const id = item.id || generateObjectId();
      return { ...item, _id: id, originalId: id };
    });

    return super.insertMany(docsToInsert, options);
  }

  /**
   * Create new application
   * @property {string} id - Record unique identifier.
   * @returns {Application}
   */
  public async update(input: IVersionableUpdateInput): Promise<D> {
    logger.debug("VersionableRepository - update:", JSON.stringify(input));

    logger.debug("Searching for previous valid object...");
    const previous = await this.getById(input.originalId);

    logger.debug("Invalidating previous valid object...");
    await this.invalidate(input.originalId);

    const newInstance = Object.assign({}, previous, input);
    newInstance["_id" as string] = generateObjectId();
    delete previous.deletedAt;
    const model = new this.modelType(newInstance);

    logger.debug("Creating new object...");

    return await model.save();
  }

  public async delete(input: IVersionableDeleteInput): Promise<D> {
    logger.debug("VersionableRepository - delete:", JSON.stringify(input));

    logger.debug("Searching for previous valid object...");
    const previous = await this.getById(input.originalId);

    logger.debug("Invalidating previous valid object...");
    await this.invalidate(input.originalId);

    const newId = generateObjectId();
    const newInstance = Object.assign({}, previous, { _id: newId, isSoftDeleted: true });
    const model = new this.modelType(newInstance);

    return model.save();
  }

  protected getAll(conditions: any, projection?: any | null, options?: any | null, populate?: any | null): Promise<D[]> {
    logger.debug("VersionableRepository - getAll:", JSON.stringify(conditions));

    const updatedQuery = {
      deletedAt: null,
      ...conditions
    };

    return super.getAll(updatedQuery, projection, options, populate);
  }

  protected getById(originalId: string, populate?: any | null): Promise<Nullable<D>> {
    logger.debug("VersionableRepository - getById:", originalId, populate);

    return super.getOne({ originalId, deletedAt: null }, populate);
  }

  protected getByIds(originalIds: string[]): Promise<D[]> {
    logger.debug("VersionableRepository - getByIds:", originalIds);

    return this.getAll({ originalId: { $in: originalIds } });
  }

  public count(conditions: any): Query<number> {
    logger.debug("VersionableRepository - count:", JSON.stringify(conditions));

    const updatedQuery = {
      deletedAt: null,
      ...conditions
    };

    return super.count(updatedQuery);
  }

  protected invalidate(originalId: string): Promise<D> {
    const now = new Date();
    return lean(this.modelType.update({ originalId, deletedAt: null }, { deletedAt: now }));
  }
}
