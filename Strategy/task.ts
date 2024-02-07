export interface ISortType {
  sortTasks(tasks: Task[]): Task[];
}

export class UrgencyStrategy implements ISortType {
  sortTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => b.urgency - a.urgency);
  }
}

export class ImportanceStrategy implements ISortType {
  sortTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => b.importance - a.importance);
  }
}

export class DueDateStrategy implements ISortType {
  sortTasks(tasks: Task[]): Task[] {
    return tasks.sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  }
}

export class Task {
  constructor(
    public name: string,
    public urgency: number, // 1 to 10
    public importance: number, // 1 to 10
    public dueDate: string // YYYY-MM-DD
  ) {}
}

export class TaskManager {
  private tasks: Task[] = [];
  private sortType: ISortType = new UrgencyStrategy(); // Type de tri par défaut

  setSortType(sortType: ISortType) {
    this.sortType = sortType;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  sortTasks(): Task[] {
    return this.sortType.sortTasks(this.tasks);
  }
}
