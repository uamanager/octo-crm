import { SourceModel } from './source.model';
import { UpdateSourceModel } from './update-source.model';

export abstract class SourceRepository {
  abstract findByKey(key: string): Promise<SourceModel | null>;

  abstract upsertByKey(key: string, data: UpdateSourceModel): Promise<SourceModel>;
}
