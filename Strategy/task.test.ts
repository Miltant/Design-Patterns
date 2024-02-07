import { expect, test } from "vitest";
import {
  ISortType,
  UrgencyStrategy,
  ImportanceStrategy,
  DueDateStrategy,
  Task,
  TaskManager,
} from "./task";

const tasks = [
  new Task("Task 1", 8, 5, "2023-03-01"),
  new Task("Task 2", 6, 7, "2023-02-20"),
  new Task("Task 3", 9, 6, "2023-02-25"),
];

test("TaskManager integration", () => {
  const taskManager = new TaskManager();

  tasks.forEach((task) => taskManager.addTask(task));

  taskManager.setSortType(new ImportanceStrategy());
  expect(taskManager.sortTasks().map((t) => t.name)).toEqual([
    "Task 2",
    "Task 3",
    "Task 1",
  ]);

  taskManager.setSortType(new DueDateStrategy());
  expect(taskManager.sortTasks().map((t) => t.name)).toEqual([
    "Task 2",
    "Task 3",
    "Task 1",
  ]);
});

test("UrgencyStrategy", () => {
  const strategy = new UrgencyStrategy();
  const sortedTasks = strategy.sortTasks(tasks);
  expect(sortedTasks.map((t) => t.name)).toEqual([
    "Task 3",
    "Task 1",
    "Task 2",
  ]);
});

test("ImportanceStrategy", () => {
  const strategy = new ImportanceStrategy();
  const sortedTasks = strategy.sortTasks(tasks);
  expect(sortedTasks.map((t) => t.name)).toEqual([
    "Task 2",
    "Task 3",
    "Task 1",
  ]);
});


test("DueDateStrategy", () => {
  const strategy = new DueDateStrategy();
  const sortedTasks = strategy.sortTasks(tasks);
  expect(sortedTasks.map((t) => t.name)).toEqual([
    "Task 2",
    "Task 3",
    "Task 1",
  ]);
});