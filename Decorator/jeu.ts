interface IWeapon {
    getDamage(): number;
    getMaxLongevity(): number;
    getLongevity(): number;
    getSpeed(): number;
    getInRange(radius: number): boolean;
    getDisplayName(): string;
    getFullDisplay(): string;
}

abstract class ConcreteWeapon implements IWeapon {
    protected damage: number;
    protected longevity: number;
    protected maxLongevity: number;
    protected speed: number;

    constructor(d: number, l: number, m: number, s: number) {
        this.damage = d;
        this.longevity = l;
        this.maxLongevity = m;
        this.speed = s;
    }

    public getDamage(): number {
        return this.damage;
    }

    public getMaxLongevity(): number {
        return this.maxLongevity;
    }

    public getLongevity(): number {
        return this.longevity;
    }

    public getSpeed(): number {
        return this.speed;
    }

    abstract getInRange(radius: number): boolean;
    
    public getDisplayName(): string {
        return this.constructor.name;
    }

    public getFullDisplay(): string {
        return `${this.getDisplayName()} (${this.getDamage()} dmg, ${this.getSpeed()} speed, ${this.getLongevity()}/${this.getMaxLongevity()} longevity)`;
    }
}

class Sword extends ConcreteWeapon {
    constructor() {
        super(10, 100, 100, 2);
    }

    getInRange(radius: number): boolean {
        return radius < 5;
    }
}

class CrossBow extends ConcreteWeapon {
    constructor(ammo = 3, maxAmmo = 3) {
        if (ammo > maxAmmo) {
            throw new Error("Cannot have more ammo than max ammo");
        }
        super(15, ammo, maxAmmo, 1);
    }
    
    getInRange(radius: number): boolean {
        return radius > 4 && radius < 120;
    }
}

interface IEnchantement extends IWeapon {
}

abstract class ConcreteEnchantement implements IEnchantement {
    protected weapon: IWeapon;

    constructor(weapon: IWeapon) {
        this.weapon = weapon;
    }

    public getDamage(): number {
        return this.weapon.getDamage();
    }

    public getMaxLongevity(): number {
        return this.weapon.getMaxLongevity();
    }

    public getLongevity(): number {
        return this.weapon.getLongevity();
    }

    public getSpeed(): number {
        return this.weapon.getSpeed();
    }

    public getInRange(radius: number): boolean {
        return this.weapon.getInRange(radius);
    }

    abstract getDisplayName(): string;
    public getFullDisplay() {
        return `${this.getDisplayName()} (${this.getDamage()} dmg, ${this.getSpeed()} speed, ${this.getLongevity()}/${this.getMaxLongevity()} longevity)`;
    }
}

class StrengthEnchantement extends ConcreteEnchantement {
    constructor(weapon: IWeapon) {
        super(weapon);
    }

    public getDamage(): number {
        return this.weapon.getDamage() * 2;
    }

    public getDisplayName(): string {
        return `Strong Charm ~ ${this.weapon.getDisplayName()}`;
    }
}

class InfernoEnchantement extends ConcreteEnchantement {
    constructor(weapon: IWeapon) {
        super(weapon);
    }

    public getDamage(): number {
        return this.weapon.getDamage() + 10;
    }

    public getMaxLongevity(): number {
        return this.weapon.getMaxLongevity() / 3;
    }

    public getLongevity(): number {
        return Math.max(this.weapon.getLongevity() / 2, this.getMaxLongevity());
    }

    public getDisplayName(): string {
        return `${this.weapon.getDisplayName()} ~ On Fire`;
    }
}

class FlyWeightEnchantement extends ConcreteEnchantement {
    constructor(weapon: IWeapon) {
        super(weapon);
    }

    public getDamage(): number {
        return Math.max(this.weapon.getDamage() - 5, 2);
    }

    public getSpeed(): number {
        return this.weapon.getSpeed() * 1.2 + 0.5;
    }

    public getInRange(radius: number): boolean {
        return this.weapon.getInRange(radius * 0.9);
    }

    public getDisplayName(): string {
        return ` 🪶  ${this.weapon.getDisplayName()} 🪶 `;
    }
}

export { Sword, CrossBow, StrengthEnchantement, InfernoEnchantement, FlyWeightEnchantement };