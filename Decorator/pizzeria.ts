interface IPizza {
    pizzaName: string;
    cuire(): string;
    prix(): number;
}

class Margherita implements IPizza {
    pizzaName: string = 'Margherita';
    cuire(): string {
        return 'Cuire la Margherita';
    }
    prix(): number {
        return 10;
    }
}

class Carbonara implements IPizza {
    pizzaName: string = 'Carbonara';
    cuire(): string {
        return 'Cuire la Carbonara';
    }
    prix(): number {
        return 11;
    }
}

// jusqu'ici, rien de nouveau, mais maintenant
// on va aussi définir une nouvelle interface: ICalzone
interface ICalzone extends IPizza {
    plier(): string;
}

// et on va créer des variantes de nos pizze qui implémentent cette interface

class MargheritaCalzone implements ICalzone {
    //correction: voir plus bas!
    
    pizzaName: string = 'Calzone Margherita';
    cuire(): string {
        this.plier();
        return 'Cuire la Calzone Margherita';
    }
    plier(): string {
        return 'Plier la Calzone Margherita';
    }
    prix(): number {
        return 12;
    }
}

class CarbonaraCalzone implements ICalzone {
    pizzaName: string = 'Calzone Carbonara';
    cuire(): string {
        this.plier();
        return 'Cuire la Calzone Carbonara';

        // correction: était attendu un safeguard et un state pour savoir si la calzone est pliée ou non
        // if (this.pliée) {
        //     return 'Cuire la Calzone Carbonara';
        // } else {
        //    throw new Error('La calzone doit être pliée avant d\'être cuite');
        // }
    }
    plier(): string {
        return 'Plier la Calzone Carbonara';

        // correction:
        // this.pliée = true;
        // return 'Plier la Calzone Carbonara';
    }
    prix(): number {
        return 13;
    }
}


abstract class FourÀPizza {
    abstract réaliser(): IPizza;
    commander(suppléments: (new(pizza: IPizza) => ISupplément)[] = []): string {
        let pizza = this.réaliser();
        for (let supplément of suppléments) {
            pizza = new supplément(pizza);
        }
        return pizza.cuire();
    }

    // nos fours à pizza doivent maintenant être en mesure de réaliser des calzones
    abstract réaliserCalzone(): ICalzone;
    commanderCalzone(suppléments: (new(pizza: IPizza) => ISupplément)[] = []): string {
        let pizza = this.réaliserCalzone() as IPizza;
        for (let supplément of suppléments) {
            pizza = new supplément(pizza);
        }
        return pizza.cuire();
    }
}

class FourÀMargherita extends FourÀPizza {
    réaliser(): IPizza {
        return new Margherita();
    }
    réaliserCalzone(): ICalzone {
        return new MargheritaCalzone();
    }
}

class FourÀCarbonara extends FourÀPizza {
    réaliser(): IPizza {
        return new Carbonara();
    }
    réaliserCalzone(): ICalzone {
        return new CarbonaraCalzone();
    }
}


// toppings (décorateurs)

abstract class ISupplément implements IPizza {
    abstract pizzaName: string;

    protected pizza: IPizza;
    constructor(pizza: IPizza) {
        this.pizza = pizza;
    }
    abstract cuire(): string;
    abstract prix(): number;
}

class Viande extends ISupplément {
    pizzaName: string = 'Supplément viande';
    constructor(pizza: IPizza) {
        super(pizza);
        this.pizzaName = `${pizza.pizzaName} + Viande`;
    }
    cuire(): string {
        return `${this.pizza.cuire()} + Cuire la viande`;
    }
    prix(): number {
        return this.pizza.prix() + 2;
    }
}

class Fromage extends ISupplément {
    pizzaName: string = 'Supplément fromage';
    constructor(pizza: IPizza) {
        super(pizza);
        this.pizzaName = `${pizza.pizzaName} + fromage`;
    }
    cuire(): string {
        return `${this.pizza.cuire()} + Cuire le fromage`;
    }
    prix(): number {
        return this.pizza.prix() + 1;
    }
}

class Burrata extends ISupplément {
    pizzaName: string = 'Supplément burrata';
    constructor(pizza: IPizza) {
        super(pizza);
        this.pizzaName = `${pizza.pizzaName} + burrata`;
    }
    cuire(): string {
        return `${this.pizza.cuire()} + Cuire la burrata`;
    }
    prix(): number {
        return this.pizza.prix() + 2;
    }
}

class Raclette extends ISupplément {
    pizzaName: string = 'Supplément raclette';
    constructor(pizza: IPizza) {
        super(pizza);
        this.pizzaName = `${pizza.pizzaName} + raclette`;
    }
    cuire(): string {
        return `${this.pizza.cuire()} + Cuire la raclette`;
    }
    prix(): number {
        return this.pizza.prix() + 3;
    }
}

class SansViande extends ISupplément {
    pizzaName: string = 'Supplément sans viande';
    constructor(pizza: IPizza) {
        super(pizza);
        this.pizzaName = `${pizza.pizzaName} - viande`;
    }
    cuire(): string {
        return `${this.pizza.cuire()} + Cuire sans viande`;
    }
    prix(): number {
        return this.pizza.prix() - 2;
    }
}

class SansFromage extends ISupplément {
    pizzaName: string = 'Supplément sans fromage';
    constructor(pizza: IPizza) {
        super(pizza);
        this.pizzaName = `${pizza.pizzaName} - fromage`;
    }
    cuire(): string {
        return `${this.pizza.cuire()} + Cuire sans fromage`;
    }
    prix(): number {
        return this.pizza.prix() - 2;
    }
}


export {
/*                  Variété 1              Variété 2       Factories         */
/* Interfaces */       IPizza,              ICalzone,      FourÀPizza,
/*  Produit 1 */   Margherita,     MargheritaCalzone,      FourÀMargherita,
/*  Produit 2 */    Carbonara,      CarbonaraCalzone,      FourÀCarbonara


/*                 Interface      Variétés positives...                 Variétés négatives...   */
/* Supplément */ , ISupplément,   Viande, Fromage, Burrata, Raclette,   SansViande, SansFromage
};