// J'ai fait un peu plus de modifications que demandé
// J'ai ajouté une classe SecretManagement pour gérer les Easter Eggs et compagnie
// J'ai ajouté un autre observer pour les achievements

export interface Item {
  name: string;
  quantity: number;
}

export interface INotifiable {
  notify(property: string, key: string | undefined, value: any): void;
}

export class SecretManagement {
  static isSecret(property: string, key?: string, value?: any): boolean {
    return property === "inventory" && key === "Easter Egg";
  }
}

// on pourrait imaginer un observer qui envoie les mises à jour de l'état du jeu à un serveur WebSocket
export class WebSocketObserver implements INotifiable {
  private socket?: WebSocket;

  constructor(socket?: WebSocket) {
    this.socket = socket;
  }

  notify(property: string, key: string | undefined, value: any): void {
    if (SecretManagement.isSecret(property, key, value)) {
      return;
    }

    this.socket?.send(JSON.stringify({ property, key, value }));
  }
}

// on pourrait imaginer un observer qui s'occupe des achievements
export class AchievementObserver implements INotifiable {
  private positionTracker: { x?: number; y?: number } = { x: undefined, y: undefined };
  private achievements: string[] = [];

  notify(property: string, key: string | undefined, value: any): void {
    switch (property) {
      case "position":
        if (key !== "x" && key !== "y") return;
        if (this.positionTracker[key as "x" | "y"] === value) return;

        this.positionTracker[key as "x" | "y"] = value;

        if (this.positionTracker.x === 0 && this.positionTracker.y === 0) {
          this.achievements.push("Home Sweet Home");
        }
        break;
      case "inventory":
        if (key === "Sword" && value >= 10) {
          this.achievements.push("Sword Master");
        }
        if (key === "Potion" && value >= 10) {
          this.achievements.push("Obelix");
        }
        if (key === "Easter Egg" && value >= 1) {
          this.achievements.push("Easter Rabbit");
        }
        break;
    }
  }
}

export class GameState {
  private observers: INotifiable[] = [];
  private state: {
    position: { x: number; y: number };
    inventory: Item[];
    easterEggPosition: { x: number; y: number };
  };

  constructor() {
    this.state = {
      position: { x: 0, y: 0 },
      inventory: [],
      easterEggPosition: { x: 10, y: 20 }, // Position fixe de l'Easter Egg pour cet exemple
    };
  }

  addObserver(observer: INotifiable): void {
    this.observers.push(observer);
  }

  removeObserver(observer: INotifiable): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  private notifyObservers(
    property: string,
    key: string | undefined,
    value: any
  ): void {
    for (const observer of this.observers) {
      observer.notify(property, key, value);
    }
  }

  getState(): any {
    return this.state;
  }

  setPosition(x: number, y: number): void {
    this.state.position = { x, y };
    console.log(`Player position updated to: (${x}, ${y})`);
    this.notifyObservers("position", "x", x);
    this.notifyObservers("position", "y", y);
    this.checkEasterEgg();
  }

  addItem(item: Item): void {
    const existingItem = this.state.inventory.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.state.inventory.push(item);
    }
    console.log(
      `Added item to inventory: ${item.name} (Quantity: ${item.quantity})`
    );
    this.notifyObservers("inventory", item.name, item.quantity);
  }

  private checkEasterEgg(): void {
    if (
      this.state.position.x === this.state.easterEggPosition.x &&
      this.state.position.y === this.state.easterEggPosition.y
    ) {
      this.state.inventory.push({ name: "Easter Egg", quantity: 1 });
      console.log("Easter Eggs in your pockets!");
      this.notifyObservers("inventory", "Easter Egg", 1);
    }
  }
}
