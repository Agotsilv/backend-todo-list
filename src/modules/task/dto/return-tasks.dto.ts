import { TaskEntity } from '../entities/task.entity';

export class returnTasks {
  title: string;
  description?: string;
  created_at: Date;

  constructor(task: TaskEntity) {
    this.title = task.title;
    this.description = task.description;
    this.created_at = task.created_at;
  }
}
