import { QueueTask } from './task';

export abstract class QueueProvider {
  abstract enqueue<T>(task: QueueTask<T>): Promise<void>;
}
