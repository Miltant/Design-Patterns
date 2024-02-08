export class Server {
  public state: string = "";
  private subs: INotifiable[] = [];

  constructor(subs: INotifiable[]) {
    this.subs = subs;
  }

  public changeState(newState: string): void {
    this.state = newState;
    console.log(`Server state changed to: ${this.state}`);
    this.notifySubs();
  }

  public addSub(sub: INotifiable): void {
    this.subs.push(sub);
  }

  public removeSub(sub: INotifiable): void {
    this.subs = this.subs.filter((a) => a !== sub);
  }

  private notifySubs(): void {
    for (const sub of this.subs) {
      sub.notify(this.state);
    }
  }
}

export interface INotifiable {
  notify(state: string): void;
}

export class SystemAdmin implements INotifiable {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public notify(state: string): void {
    console.log(`Admin ${this.name} notified. New Server State: ${state}`);
  }
}
