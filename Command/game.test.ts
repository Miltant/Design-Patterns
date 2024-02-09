import { expect, test, vi } from "vitest";
import {
  Player,
  PlayerController,
  Command,
  MoveCommand,
  JumpCommand,
  AttackCommand,
  isCommand,
  isAction,
  isDirection,
  ActionError,
} from "./game";

const consoleLSpy = vi.spyOn(console, "log");
const consoleESpy = vi.spyOn(console, "error");

const moveSpy = vi.spyOn(MoveCommand.prototype, "execute");
const jumpSpy = vi.spyOn(JumpCommand.prototype, "execute");
const attackSpy = vi.spyOn(AttackCommand.prototype, "execute");

const playerMoveSpy = vi.spyOn(Player.prototype, "move");
const playerJumpSpy = vi.spyOn(Player.prototype, "jump");
const playerAttackSpy = vi.spyOn(Player.prototype, "attack");

test("Player should be implemented", () => {
  const player = new Player();
  expect(player).toBeInstanceOf(Player);
  expect(player).toHaveProperty("move");
  expect(player).toHaveProperty("jump");
  expect(player).toHaveProperty("attack");
});

test("Player should move", () => {
  const player = new Player();
  player.move("gauche");
  expect(consoleLSpy).toHaveBeenNthCalledWith(
    1,
    "Le joueur se déplace vers la gauche"
  );
  player.move("droite");
  expect(consoleLSpy).toHaveBeenNthCalledWith(
    2,
    "Le joueur se déplace vers la droite"
  );
  player.move("haut");
  expect(consoleLSpy).toHaveBeenNthCalledWith(
    3,
    "Le joueur se déplace vers le haut"
  );
  player.move("bas");
  expect(consoleLSpy).toHaveBeenNthCalledWith(
    4,
    "Le joueur se déplace vers le bas"
  );

  consoleLSpy.mockClear();
});

test("Player should jump", () => {
  const player = new Player();
  player.jump();
  expect(consoleLSpy).toHaveBeenNthCalledWith(1, "Le joueur saute");
  consoleLSpy.mockClear();
});

test("Player should attack", () => {
  const player = new Player();
  player.attack();
  expect(consoleLSpy).toHaveBeenNthCalledWith(1, "Le joueur attaque");
  consoleLSpy.mockClear();
});


test("PlayerController should be implemented", () => {
  const player = new Player();
  const playerController = new PlayerController(player);
  expect(playerController).toBeInstanceOf(PlayerController);
  expect(playerController).toHaveProperty("executeAction");
  expect(playerController).toHaveProperty("createCommand");
});

test("PlayerController should execute action", () => {
  const player = new Player();
  const playerController = new PlayerController(player);

  playerController.executeAction("move", "gauche");
  expect(moveSpy).toHaveBeenCalled();

  playerController.executeAction("jump");
  expect(jumpSpy).toHaveBeenCalled();

  playerController.executeAction("attack");
  expect(attackSpy).toHaveBeenCalled();

  moveSpy.mockClear();
  jumpSpy.mockClear();
  attackSpy.mockClear();
});

test("PlayerController should create command", () => {
  const player = new Player();
  const playerController = new PlayerController(player);

  // @ts-ignore (private method)
  const moveCommand = playerController.createCommand("move", "haut");
  expect(moveCommand).toBeInstanceOf(MoveCommand);

  // @ts-ignore (private method)
  const jumpCommand = playerController.createCommand("jump");
  expect(jumpCommand).toBeInstanceOf(JumpCommand);

  // @ts-ignore (private method)
  const attackCommand = playerController.createCommand("attack");
  expect(attackCommand).toBeInstanceOf(AttackCommand);
});

test("PlayerController should log errors", () => {
  const player = new Player();
  const playerController = new PlayerController(player);

  playerController.executeAction("unknown");
  expect(consoleESpy).toHaveBeenNthCalledWith(1, "Action inconnue");

  playerController.executeAction("move");
  expect(consoleESpy).toHaveBeenNthCalledWith(2, "Direction inconnue");

  playerController.executeAction("move", "unknown");
  expect(consoleESpy).toHaveBeenNthCalledWith(3, "Direction inconnue");

  consoleESpy.mockClear();
});

test("PlayerController should replay commands", () => {
  const player = new Player();
  const playerController = new PlayerController(player);

  playerController.executeAction("move", "bas");
  playerController.executeAction("jump");
  playerController.executeAction("attack");
  
  expect(moveSpy).toHaveBeenNthCalledWith(1);
  expect(jumpSpy).toHaveBeenNthCalledWith(1);
  expect(attackSpy).toHaveBeenNthCalledWith(1);

  playerController.replay();
  expect(moveSpy).toHaveBeenNthCalledWith(2);
  expect(jumpSpy).toHaveBeenNthCalledWith(2);
  expect(attackSpy).toHaveBeenNthCalledWith(2);

  moveSpy.mockClear();
  jumpSpy.mockClear();
  attackSpy.mockClear();
});

test("isCommand should be implemented", () => {
  const command = new MoveCommand(new Player(), "gauche");
  expect(isCommand(command)).toBe(true);
  expect(isCommand({})).toBe(false);
});

test("isCommand should accept strings", () => {
  const command = "move";
  expect(isCommand(command)).toBe(false);
});

test("isAction should be implemented", () => {
  expect(isAction("move")).toBe(true);
  expect(isAction("jump")).toBe(true);
  expect(isAction("attack")).toBe(true);
  expect(isAction("unknown")).toBe(false);
});

test("isDirection should be implemented", () => {
  expect(isDirection("gauche")).toBe(true);
  expect(isDirection("droite")).toBe(true);
  expect(isDirection("haut")).toBe(true);
  expect(isDirection("bas")).toBe(true);
  expect(isDirection("unknown")).toBe(false);
});

test("ActionError should be implemented", () => {
  const error: ActionError = "Action inconnue";
  expect(error).toBe("Action inconnue");
});

test("ActionError should be logged", () => {
  const player = new Player();
  const playerController = new PlayerController(player);

  playerController.executeAction("unknown");
  expect(consoleESpy).toHaveBeenNthCalledWith(1, "Action inconnue");

  playerController.executeAction("move");
  expect(consoleESpy).toHaveBeenNthCalledWith(2, "Direction inconnue");

  playerController.executeAction("move", "unknown");
  expect(consoleESpy).toHaveBeenNthCalledWith(3, "Direction inconnue");

  consoleESpy.mockClear();
});

test("Command interface should be implemented", () => {
  const command: Command = {
    execute: () => {},
  };
  expect(command).toHaveProperty("execute");
});

test("MoveCommand should be implemented", () => {
  const player = new Player();
  const moveCommand = new MoveCommand(player, "gauche");
  expect(moveCommand).toBeInstanceOf(MoveCommand);
  expect(moveCommand).toHaveProperty("execute");
});

test("MoveCommand should move player", () => {
  const player = new Player();
  const moveCommand = new MoveCommand(player, "gauche");

  moveCommand.execute();
  expect(playerMoveSpy).toHaveBeenNthCalledWith(1, "gauche");

  playerMoveSpy.mockClear();
});


test("JumpCommand should be implemented", () => {
  const player = new Player();
  const jumpCommand = new JumpCommand(player);
  expect(jumpCommand).toBeInstanceOf(JumpCommand);
  expect(jumpCommand).toHaveProperty("execute");
});

test("JumpCommand should make player jump", () => {
  const player = new Player();
  const jumpCommand = new JumpCommand(player);

  jumpCommand.execute();
  expect(playerJumpSpy).toHaveBeenCalled();

  playerJumpSpy.mockClear();
});


test("AttackCommand should be implemented", () => {
  const player = new Player();
  const attackCommand = new AttackCommand(player);
  expect(attackCommand).toBeInstanceOf(AttackCommand);
  expect(attackCommand).toHaveProperty("execute");
});

test("AttackCommand should make player attack", () => {
  const player = new Player();
  const attackCommand = new AttackCommand(player);

  attackCommand.execute();
  expect(playerAttackSpy).toHaveBeenCalled();

  playerAttackSpy.mockClear();
});