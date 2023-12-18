interface ICharacter {
    display(): string;
}

interface IWeapon {
    display(): string;
}

class ElfCharacter implements ICharacter {
    display(): string {
        return 'elfe';
    }
}

class OrcCharacter implements ICharacter {
    display(): string {
        return 'orque';
    }
}

class ElfWeapon implements IWeapon {
    display(): string {
        return 'arc';
    }
}

class OrcWeapon implements IWeapon {
    display(): string {
        return 'hache';
    }
}


interface IGameFactory {
    createCharacter(): ICharacter;
    createWeapon(): IWeapon;
}

class ElfGameFactory implements IGameFactory {
    createCharacter(): ICharacter {
        return new ElfCharacter();
    }
    createWeapon(): IWeapon {
        return new ElfWeapon();
    }
}

class OrcGameFactory implements IGameFactory {
    createCharacter(): ICharacter {
        return new OrcCharacter();
    }
    createWeapon(): IWeapon {
        return new OrcWeapon();
    }
}

export { ElfGameFactory, OrcGameFactory };