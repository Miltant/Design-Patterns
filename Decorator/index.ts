import { FourÀPizza, FourÀMargherita, FourÀCarbonara, IPizza, ISupplément } from './pizzeria';
import { Burrata, Raclette, SansViande, SansFromage } from './pizzeria';

/************/
/* Pizzeria */
/************/

const fourÀMargherita = new FourÀMargherita();
const fourÀCarbonara = new FourÀCarbonara();

function commanderPlate(four: FourÀPizza, suppléments: (new(pizza: IPizza) => ISupplément)[] = []) {
    console.log(four.commander(suppléments));
}

function commanderCalzone(four: FourÀPizza, suppléments: (new(pizza: IPizza) => ISupplément)[] = []) {
    console.log(four.commanderCalzone(suppléments));
}

commanderPlate(fourÀMargherita);
commanderPlate(fourÀCarbonara, [Burrata, SansViande]);

commanderCalzone(fourÀMargherita, [SansFromage]);
commanderCalzone(fourÀCarbonara);