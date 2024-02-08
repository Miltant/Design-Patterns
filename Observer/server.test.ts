import { expect, test, vi } from "vitest";
import { Server, SystemAdmin, INotifiable } from "./server";

test("Server should change state", () => {
  const server = new Server([]);
  server.changeState("New State");
  expect(server.state).toBe("New State");

  server.changeState("Another State");
  expect(server.state).toBe("Another State");
});

test("Server should add and remove subscribers", () => {
  const server = new Server([]);
  const admin1 = new SystemAdmin("Admin1");
  const admin2 = new SystemAdmin("Admin2");
  server.addSub(admin1);
  server.addSub(admin2);
  // @ts-ignore (private property)
  expect(server.subs).toEqual([admin1, admin2]);
  server.removeSub(admin1);
  // @ts-ignore (private property)
  expect(server.subs).toEqual([admin2]);
});

test("Server/SystemAdmin Observer Pattern integration", () => {
  const admin1 = new SystemAdmin("Admin1");
  const admin2 = new SystemAdmin("Admin2");
  const notifySpy1 = vi.spyOn(admin1, "notify");
  const notifySpy2 = vi.spyOn(admin2, "notify");

  const server = new Server([admin1, admin2]);

  server.changeState("New State");
  expect(server.state).toBe("New State");

  server.removeSub(admin1);
  server.changeState("Another State");
  expect(server.state).toBe("Another State");

  expect(notifySpy1).toHaveBeenNthCalledWith(1, "New State");
  expect(notifySpy2).toHaveBeenNthCalledWith(1, "New State");
  expect(notifySpy1).not.toHaveBeenNthCalledWith(2, "Another State");
  expect(notifySpy2).toHaveBeenNthCalledWith(2, "Another State");
});

test("Server should be observer pattern compliant", () => {
  const server = new Server([]);
  expect(server).toBeInstanceOf(Server);
  expect(server).toHaveProperty("addSub");
  expect(server).toHaveProperty("removeSub");
});

test("SystemAdmin should be observer pattern compliant", () => {
  const admin = new SystemAdmin("Admin");
  expect(admin).toBeInstanceOf(SystemAdmin);
  expect(admin).toHaveProperty("notify");
});

test("INotifiable should be observer pattern compliant", () => {
  const notifiable: INotifiable = {
    notify: (state: string) => {},
  };
  expect(notifiable).toHaveProperty("notify");
});

test("SystemAdmin should be able to notify", () => {
  const admin = new SystemAdmin("Admin");
  const notifySpy = vi.spyOn(admin, "notify");
  admin.notify("State");
  expect(notifySpy).toHaveBeenCalledOnce();
});

test("Server should notify all subscribers", () => {
  const admin1 = new SystemAdmin("Admin1");
  const admin2 = new SystemAdmin("Admin2");
  const notifySpy1 = vi.spyOn(admin1, "notify");
  const notifySpy2 = vi.spyOn(admin2, "notify");

  const server = new Server([admin1, admin2]);

  server.changeState("New State");
  expect(notifySpy1).toHaveBeenCalledOnce();
  expect(notifySpy2).toHaveBeenCalledOnce();

  server.removeSub(admin1);
  server.changeState("Another State");
  expect(notifySpy1).toHaveBeenCalledTimes(1);
  expect(notifySpy2).toHaveBeenCalledTimes(2);
});
