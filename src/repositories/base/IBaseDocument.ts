import { Document } from "mongoose";

import { IEntity } from "../../models/IEntity";

export interface IBaseDocument extends Document, IEntity {
  id: string;
}
