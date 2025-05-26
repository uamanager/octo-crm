import { IQueueTaskConfig } from './task.config';

export abstract class QueueTask<T> {
  static type = 'QUEUE_TASK';

  constructor(
    public type: string,
    public data: T,
    public options?: Partial<IQueueTaskConfig>,
  ) {}
}
