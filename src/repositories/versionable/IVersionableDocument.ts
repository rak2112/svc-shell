import { Document } from "mongoose";
import { Nullable } from "../../entities";

import { IBaseDocument } from "../base/IBaseDocument";
export interface IVersionableDocument extends Document, IBaseDocument {
  id: string;
  createdAt: Date;
  deletedAt: Nullable<Date>;
  originalId: string;
}
