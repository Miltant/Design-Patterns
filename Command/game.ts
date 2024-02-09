export class Player {
  move(direction: string): void {
    const article = ["droite", "gauche"].includes(direction) ? "la" : "le";
    console.log(`Le joueur se déplace vers ${article} ${direction}`);
  }

  jump(): void {
    console.log("Le joueur saute");
  }

  attack(): void {
    console.log("Le joueur attaque");
  }
}

export type Direction = "gauche" | "droite" | "haut" | "bas";
export type Action = "move" | "jump" | "attack";
export type ActionError = "Action inconnue" | "Direction inconnue";
export interface Command {
  execute(): void;
}

export function isAction(action: string): action is Action {
  return ["move", "jump", "attack"].includes(action);
}

export function isDirection(direction?: string): direction is Direction {
  return (
    direction != null && ["gauche", "droite", "haut", "bas"].includes(direction)
  );
}

export function isCommand(command: any): command is Command {
  return command.execute !== undefined;
}

export class MoveCommand implements Command {
  constructor(private player: Player, private direction: Direction) {}

  execute(): void {
    this.player.move(this.direction);
  }
}

export class JumpCommand implements Command {
  constructor(private player: Player) {}

  execute(): void {
    this.player.jump();
  }
}

export class AttackCommand implements Command {
  constructor(private player: Player) {}

  execute(): void {
    this.player.attack();
  }
}

export class PlayerController {
  private history: Command[] = [];
  constructor(private player: Player) {}

  executeAction(action: string, direction?: string): void {
    const command = this.createCommand(action, direction);
    if (isCommand(command)) {
      this.executeCommand(command);
    } else {
      console.error(command);
    }
  }

  private createCommand(
    action: string,
    direction?: string
  ): Command | ActionError {
    if (!isAction(action)) return "Action inconnue";

    switch (action) {
      case "move":
        if (!isDirection(direction)) return "Direction inconnue";
        return new MoveCommand(this.player, direction);
      case "jump":
        return new JumpCommand(this.player);
      case "attack":
        return new AttackCommand(this.player);
    }
  }

  private executeCommand(command: Command): void {
    command.execute();
    this.history.push(command);
  }

  replay(): void {
    this.history.forEach((cmd) => cmd.execute());
  }
}