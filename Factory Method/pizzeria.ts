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

abstract class FourÀPizza {
    abstract réaliser(): IPizza;

    commander(): string {
        const pizza = this.réaliser();
        return pizza.cuire();
    }
}

class FourÀMargherita extends FourÀPizza {
    réaliser(): IPizza {
        return new Margherita();
    }
}

class FourÀCarbonara extends FourÀPizza {
    réaliser(): IPizza {
        return new Carbonara();
    }
}

export { FourÀPizza, IPizza, Margherita, FourÀMargherita, Carbonara, FourÀCarbonara };