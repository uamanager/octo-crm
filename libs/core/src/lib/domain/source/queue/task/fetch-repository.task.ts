import { IQueueTaskConfig, QueueTask } from '../../../../common/queue';

export const FETCH_REPOSITORY_SOURCE_QUEUE_TASK = 'FETCH_REPOSITORY_SOURCE_QUEUE_TASK';

export interface IFetchRepositorySourceQueueTask {
  key: string;
}

export class FetchRepositorySourceQueueTask extends QueueTask<IFetchRepositorySourceQueueTask> {
  constructor(key: string, options: Partial<IQueueTaskConfig> = {}) {
    super(FETCH_REPOSITORY_SOURCE_QUEUE_TASK, { key }, options);
  }
}
