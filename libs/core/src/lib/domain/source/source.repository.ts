import { SourceModel } from './source.model';
import { UpdateSourceModel } from './update-source.model';

export abstract class SourceRepository {
  abstract findOrCreateByKey(key: string): Promise<SourceModel>;

  abstract upsertByKey(key: string, data: UpdateSourceModel): Promise<SourceModel>;
}
