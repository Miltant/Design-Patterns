class Character {
    name: string = '';
    force: number = 0;
    charisme: number = 0;
    intelligence: number = 0;
    discretion: number = 0;
    agilite: number = 0;
    rapidite: number = 0;
    equipement: string = ''; // correction/todo: array

    display() {
        console.log(`${this.name} :\tforce ${this.force},\tcharisme ${this.charisme},\tintelligence ${this.intelligence},\tdiscretion ${this.discretion},\tagilite ${this.agilite},\trapidite ${this.rapidite},\tequipement ${this.equipement}`);
    }
}

interface ICharacterBuilder {
    setName(name: string): ICharacterBuilder;
    setForce(value: number): ICharacterBuilder;
    setCharisme(value: number): ICharacterBuilder;
    setIntelligence(value: number): ICharacterBuilder;
    setDiscretion(value: number): ICharacterBuilder;
    setAgilite(value: number): ICharacterBuilder;
    setRapidite(value: number): ICharacterBuilder;
    setEquipement(value: string): ICharacterBuilder; // correction/todo: addEquipement à la place, pour push dans l'array
    getCharacter(): Character;
}

class ConcreteCharacterBuilder implements ICharacterBuilder {
    #character: Character;

    constructor() {
        this.#character = new Character();
    }

    reset() {
        this.#character = new Character();
    }

    getCharacter() {
        const character = this.#character;
        this.reset();
        return character;
    }

    setName(name: string) {
        this.#character.name = name;
        return this;
    }

    setForce(value: number) {
        this.#character.force = value;
        return this;
    }

    setCharisme(value: number) {
        this.#character.charisme = value;
        return this;
    }

    setIntelligence(value: number) {
        this.#character.intelligence = value;
        return this;
    }

    setDiscretion(value: number) {
        this.#character.discretion = value;
        return this;
    }

    setAgilite(value: number) {
        this.#character.agilite = value;
        return this;
    }

    setRapidite(value: number) {
        this.#character.rapidite = value;
        return this;
    }

    setEquipement(value: string) {
        this.#character.equipement = value;
        return this;
    }
}

class WarriorBuilder implements ICharacterBuilder {
    #character: Character;

    constructor() {
        this.#character = new Character();
        this.#character.force = 10;
        this.#character.intelligence = 7;
        this.#character.agilite = 7;
        this.#character.rapidite = 5;
    }

    reset() {
        this.#character = new Character();
    }

    getCharacter() {
        const character = this.#character;
        this.reset();
        return character;
    }

    setName(name: string) {
        this.#character.name = name;
        return this;
    }

    setForce(value: number) {
        this.#character.force = Math.min(value, 9);
        return this;
    }

    setCharisme(value: number) {
        this.#character.charisme = value;
        return this;
    }

    setIntelligence(value: number) {
        this.#character.intelligence = Math.max(value, 7);
        return this;
    }

    setDiscretion(value: number) {
        this.#character.discretion = value;
        return this;
    }
    
    setAgilite(value: number) {
        this.#character.agilite = Math.min(value, 7);
        return this;
    }

    setRapidite(value: number) {
        this.#character.rapidite = Math.min(value, 3);
        return this;
    }

    setEquipement(value: string) {
        const forbiddenWeapons = ['arc', 'sarbacanne'];
        this.#character.equipement = forbiddenWeapons.includes(value) ? 'hache' : value;
        return this;
    }
}

// on pourrait continuer ainsi...
//
// class MageBuilder implements ICharacterBuilder {
// ...
// }
//
// class RogueBuilder implements ICharacterBuilder {
// ...
// }

class CharacterDirector {
    #builder: ICharacterBuilder;

    constructor(builder: ICharacterBuilder) {
        this.#builder = builder;
    }

    createElf() {
        return this.#builder
            .setForce(6)
            .setCharisme(8)
            .setIntelligence(10)
            .setDiscretion(8)
            .setAgilite(10)
            .setRapidite(7)
            .setEquipement('arc')
    }

    createOrc() {
        return this.#builder
            .setForce(10)
            .setCharisme(6)
            .setIntelligence(6)
            .setDiscretion(5)
            .setAgilite(5)
            .setRapidite(5)
            .setEquipement('hache')
    }
}

export {
    Character, CharacterDirector,
    ICharacterBuilder, ConcreteCharacterBuilder, WarriorBuilder
}
