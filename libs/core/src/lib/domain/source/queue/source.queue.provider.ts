import { QueueProvider } from '../../../common/queue';

export const SOURCE_QUEUE = 'source';

export abstract class SourceQueueProvider extends QueueProvider {
  abstract fetch(key: string): Promise<void>;

  abstract refresh(key: string): Promise<void>;
}
