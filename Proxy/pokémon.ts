interface ICard {
    getCard(): Promise<string>;
    createCard(name: string): Promise<void>;
    updateCard(name: string): Promise<void>;
    deleteCard(): Promise<void>;
}

class RealCard implements ICard {
    #id: number;
    // on imagine une initialisation un peu plus complexe
    private name = 'dummy card: ' + Math.random().toString(36).substring(7);

    constructor(id: number = -1) {
        this.#id = id;
    }

    public async createCard(name: string): Promise<void> {
        if (this.id !== -1) {
            throw new Error('Card already exists');
        }
        await new Promise(r => setTimeout(r, 120));

        // [on imagine qu'on sauvegarde la carte dans la db] = card;
        // on imagine que l'id est généré automatiquement
        this.name = name;
        this.#id = Math.floor(Math.random() * 2000);
    }

    public async getCard(): Promise<string> {
        if (this.id === -1) {
            throw new Error('Card does not exist');
        }

        // this.card = [on imagine qu'on récupère la carte depuis la db];
        await new Promise(r => setTimeout(r, 120));
        return this.name;
    }

    public async updateCard(name: string): Promise<void> {
        if (this.id === -1) {
            throw new Error('Card does not exist');
        }

        // [on imagine qu'on sauvegarde la carte dans la db] = card;
        await new Promise(r => setTimeout(r, 120));
        this.name = name;
    }

    public async deleteCard(): Promise<void> {
        if (this.id === -1) {
            throw new Error('Card does not exist');
        }

        // [on imagine qu'on supprime la carte dans la db];
        await new Promise(r => setTimeout(r, 120));
        this.name = '';
    }

    public get id(): number {
        return this.#id;
    }
}

type EAction = 'get' | 'create' | 'update' | 'delete';

class ProxyCard implements ICard {
    private realCard: RealCard;
    private allowed: Map<EAction, boolean> = new Map<EAction, boolean>([['get', true]]);

    constructor(id: number = -1) {
        this.realCard = new RealCard(id);
    }

    public allow(action: EAction): void {
        this.allowed.set(action, true);
    }

    public deny(action: EAction): void {
        this.allowed.set(action, false);
    }

    public checkPermission(action: EAction): boolean {
        // on imagine une vérification de permission
        return this.allowed.get(action) || false;
    }

    public async getCard(): Promise<string> {
        if (this.checkPermission('get')) {
            return await this.realCard.getCard();
        } else {
            throw new Error('Permission denied');
        }
    }

    public async createCard(name: string): Promise<void> {
        if (this.checkPermission('create')) {
            await this.realCard.createCard(name);
        } else {
            throw new Error('Permission denied');
        }
    }

    public async updateCard(name: string): Promise<void> {
        if (this.checkPermission('update')) {
            await this.realCard.updateCard(name);
        } else {
            throw new Error('Permission denied');
        }
    }

    public async deleteCard(): Promise<void> {
        if (this.checkPermission('delete')) {
            await this.realCard.deleteCard();
        } else {
            throw new Error('Permission denied');
        }
    }
}

export { RealCard, EAction, ProxyCard };