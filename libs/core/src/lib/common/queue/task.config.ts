export interface IQueueTaskRepeatConfig {
  cron?: string;
  tz?: string;
  startDate?: Date | string | number;
  endDate?: Date | string | number;
  limit?: number;
  every?: number;
  count?: number;
}

export interface IQueueTaskBackoffConfig {
  type: string;
  delay: number;
}

export interface IQueueTaskDeduplicationConfig {
  ttl?: number;
  id: string;
}

export interface IQueueTaskConfig {
  jobId: string;
  priority: number;
  delay: number;
  attempts: number;
  repeat: IQueueTaskRepeatConfig;
  backoff: number | IQueueTaskBackoffConfig;
  lifo: boolean;
  removeOnComplete: boolean | number;
  removeOnFail: boolean | number;
  stackTraceLimit: number;
  deduplication: IQueueTaskDeduplicationConfig;
}
