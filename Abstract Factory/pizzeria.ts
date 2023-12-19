interface IPizza {
    pizzaName: string;
    cuire(): string;
}

class Margherita implements IPizza {
    pizzaName: string = 'Margherita';
    cuire(): string {
        return 'Cuire la Margherita';
    }
}

class Carbonara implements IPizza {
    pizzaName: string = 'Carbonara';
    cuire(): string {
        return 'Cuire la Carbonara';
    }
}

// jusqu'ici, rien de nouveau, mais maintenant
// on va aussi définir une nouvelle interface: ICalzone
interface ICalzone extends IPizza {
    plier(): string;
}

// et on va créer des variantes de nos pizze qui implémentent cette interface

class MargheritaCalzone implements ICalzone {
    pizzaName: string = 'Calzone Margherita';
    cuire(): string {
        return 'Cuire la Calzone Margherita';
    }
    plier(): string {
        return 'Plier la Calzone Margherita';
    }
}

class CarbonaraCalzone implements ICalzone {
    pizzaName: string = 'Calzone Carbonara';
    cuire(): string {
        return 'Cuire la Calzone Carbonara';
    }
    plier(): string {
        return 'Plier la Calzone Carbonara';
    }
}


abstract class FourÀPizza {
    abstract réaliser(): IPizza;
    commander(): string {
        const pizza = this.réaliser();
        return pizza.cuire();
    }

    // nos fours à pizza doivent maintenant être en mesure de réaliser des calzones
    abstract réaliserCalzone(): ICalzone;
    commanderCalzone(): string {
        const pizza = this.réaliserCalzone();
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

export {
/*                  Variété 1              Variété 2       Factories         */
/* Interfaces */       IPizza,              ICalzone,      FourÀPizza,
/*  Produit 1 */   Margherita,     MargheritaCalzone,      FourÀMargherita,
/*  Produit 2 */    Carbonara,      CarbonaraCalzone,      FourÀCarbonara
};