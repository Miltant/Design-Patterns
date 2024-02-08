import { expect, test, vi } from "vitest";
import { SecretManagement, GameState, Item, INotifiable, WebSocketObserver, AchievementObserver } from "./game";

test("Item should be implemented", () => {
  const item: Item = {
    name: "Item",
    quantity: 1,
  };
  expect(item).toHaveProperty("name");
  expect(item).toHaveProperty("quantity");
});

test("GameState should be implemented", () => {
  const gameState = new GameState();
  expect(gameState).toBeInstanceOf(GameState);
  expect(gameState).toHaveProperty("getState");
  expect(gameState).toHaveProperty("setPosition");
  expect(gameState).toHaveProperty("addItem");
});

test("GameState should change position", () => {
  const gameState = new GameState();
  gameState.setPosition(5, 10);
  expect(gameState.getState().position).toEqual({ x: 5, y: 10 });
});

test("GameState should add item to inventory", () => {
  const gameState = new GameState();
  gameState.addItem({ name: "Sword", quantity: 1 });
  expect(gameState.getState().inventory).toEqual([
    { name: "Sword", quantity: 1 },
  ]);
});

test("GameState should find easter egg", () => {
  const gameState = new GameState();
  const consoleSpy = vi.spyOn(console, "log");
  gameState.setPosition(10, 20);
  expect(consoleSpy).toHaveBeenNthCalledWith(
    1,
    "Player position updated to: (10, 20)"
  );
  expect(consoleSpy).toHaveBeenNthCalledWith(2, "Easter Eggs in your pockets!");
});

test("GameState should not find easter egg", () => {
  const gameState = new GameState();
  const consoleSpy = vi.spyOn(console, "log");
  gameState.setPosition(5, 10);
  expect(consoleSpy).toHaveBeenNthCalledWith(
    1,
    "Player position updated to: (5, 10)"
  );
  expect(consoleSpy).not.toHaveBeenNthCalledWith(
    2,
    "Easter Eggs in your pockets!"
  );
});

test("most events shouldn't be secret", () => {
  expect(SecretManagement.isSecret("position", "x", 5)).toBe(false);
  expect(SecretManagement.isSecret("position", "y", 10)).toBe(false);
  expect(SecretManagement.isSecret("position", "y", 0)).toBe(false);
  expect(SecretManagement.isSecret("inventory", "Sword", 1)).toBe(false);
  expect(SecretManagement.isSecret("inventory", "Potion", 1)).toBe(false);
});

test("Easter Egg should be secret", () => {
  expect(SecretManagement.isSecret("inventory", "Easter Egg")).toBe(true);
});

test("INotifiable should be implemented", () => {
  const notifiable: INotifiable = {
    notify: () => {},
  };
  expect(notifiable).toHaveProperty("notify");
});

test("WebSocketObserver should be implemented", () => {
  const observer = new WebSocketObserver();
  expect(observer).toBeInstanceOf(WebSocketObserver);
  expect(observer).toHaveProperty("notify");
});

test("AchievementObserver should be implemented", () => {
  const observer = new AchievementObserver();
  expect(observer).toBeInstanceOf(AchievementObserver);
  expect(observer).toHaveProperty("notify");
});

test("GameState should add and remove observers", () => {
  const gameState = new GameState();
  const observer1 = new WebSocketObserver();
  const observer2 = new AchievementObserver();
  gameState.addObserver(observer1);
  gameState.addObserver(observer2);
  // @ts-ignore (private property)
  expect(gameState.observers).toEqual([observer1, observer2]);
  gameState.removeObserver(observer1);
  // @ts-ignore (private property)
  expect(gameState.observers).toEqual([observer2]);
});

test("GameState should notify observers", () => {
  const gameState = new GameState();
  const observer1 = new WebSocketObserver();
  const observer2 = new AchievementObserver();
  const notifySpy1 = vi.spyOn(observer1, "notify");
  const notifySpy2 = vi.spyOn(observer2, "notify");
  gameState.addObserver(observer1);
  gameState.addObserver(observer2);
  gameState.setPosition(5, 10);
  expect(notifySpy1).toHaveBeenNthCalledWith(1, "position", "x", 5);
  expect(notifySpy1).toHaveBeenNthCalledWith(2, "position", "y", 10);
  expect(notifySpy2).toHaveBeenNthCalledWith(1, "position", "x", 5);
  expect(notifySpy2).toHaveBeenNthCalledWith(2, "position", "y", 10);
  gameState.addItem({ name: "Sword", quantity: 1 });
  expect(notifySpy1).toHaveBeenNthCalledWith(3, "inventory", "Sword", 1);
  expect(notifySpy2).toHaveBeenNthCalledWith(3, "inventory", "Sword", 1);
});

test("GameState should notify observers of secrets", () => {
  const gameState = new GameState();
  const observer1 = new WebSocketObserver();
  const observer2 = new AchievementObserver();
  const notifySpy1 = vi.spyOn(observer1, "notify");
  const notifySpy2 = vi.spyOn(observer2, "notify");

  gameState.addObserver(observer1);
  gameState.addObserver(observer2);

  gameState.setPosition(10, 20);
  expect(notifySpy1).toHaveBeenNthCalledWith(1, "position", "x", 10);
  expect(notifySpy1).toHaveBeenNthCalledWith(2, "position", "y", 20);
  expect(notifySpy2).toHaveBeenNthCalledWith(1, "position", "x", 10);
  expect(notifySpy2).toHaveBeenNthCalledWith(2, "position", "y", 20);
  expect(notifySpy1).toHaveBeenNthCalledWith(3, "inventory", "Easter Egg", 1);
  expect(notifySpy2).toHaveBeenNthCalledWith(3, "inventory", "Easter Egg", 1);
});

test("WebSocketObserver should forward notifications to the websocket `send` method", () => {
  const webSocketMock = {
    send: vi.fn(),
  } as unknown as WebSocket;
  const observer = new WebSocketObserver(webSocketMock);

  observer.notify("position", "x", 5);
  expect(webSocketMock.send).toHaveBeenCalledWith(
    JSON.stringify({ property: "position", key: "x", value: 5 })
  );

  observer.notify("inventory", "Sword", 1);
  expect(webSocketMock.send).toHaveBeenCalledWith(
    JSON.stringify({ property: "inventory", key: "Sword", value: 1 })
  );
  expect(webSocketMock.send).toHaveBeenCalledTimes(2);
});

test("WebSocketObserver should not handle secret notifications", () => {
  const webSocketMock = {
    send: vi.fn(),
  } as unknown as WebSocket;
  const secretMock = vi.spyOn(SecretManagement, "isSecret").mockReturnValue(true);
  const observer = new WebSocketObserver(webSocketMock);

  observer.notify("position", "x", 1);
  expect(webSocketMock.send).not.toHaveBeenCalled();

  secretMock.mockRestore();
  observer.notify("position", "x", 1);
  expect(webSocketMock.send).toHaveBeenCalledWith(
    JSON.stringify({ property: "position", key: "x", value: 1 })
  );
});

test("AchievementObserver should handle notifications", () => {
  const observer = new AchievementObserver();

  observer.notify("position", "x", 0);
  observer.notify("position", "y", 0);
  observer.notify("inventory", "Sword", 10);
  observer.notify("inventory", "Potion", 10);
  expect(observer["achievements"]).toEqual([
    "Home Sweet Home",
    "Sword Master",
    "Obelix",
  ]);
});

test("AchievementObserver should handle Easter Rabbit notification", () => {
  const observer = new AchievementObserver();

  observer.notify("inventory", "Easter Egg", 1);
  expect(observer["achievements"]).toEqual(["Easter Rabbit"]);
});