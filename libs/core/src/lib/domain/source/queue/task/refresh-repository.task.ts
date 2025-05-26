import { IQueueTaskConfig, QueueTask } from '../../../../common/queue';

export const REFRESH_REPOSITORY_SOURCE_QUEUE_TASK =
  'REFRESH_REPOSITORY_SOURCE_QUEUE_TASK';

export interface IRefreshRepositorySourceQueueTask {
  key: string;
}

export class RefreshRepositorySourceQueueTask extends QueueTask<IRefreshRepositorySourceQueueTask> {
  constructor(key: string, options: Partial<IQueueTaskConfig> = {}) {
    super(REFRESH_REPOSITORY_SOURCE_QUEUE_TASK, { key }, options);
  }
}
