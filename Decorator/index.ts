import { FourÀPizza, FourÀMargherita, FourÀCarbonara, IPizza, ISupplément } from './pizzeria';
import { Burrata, Raclette, SansViande, SansFromage } from './pizzeria';

import { Sword, CrossBow, StrengthEnchantement, InfernoEnchantement, FlyWeightEnchantement } from './jeu';

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


console.log('------------------');
/*************/
/* Jeu vidéo */
/*************/

const sword = new Sword();
const specialSword = new FlyWeightEnchantement(new StrengthEnchantement(sword));

const crossBow = new CrossBow();
const specialCrossBow = new InfernoEnchantement(crossBow);

console.log('Basic sword: \t\t' + sword.getFullDisplay());
console.log('Enchanted sword: \t' + specialSword.getFullDisplay());

console.log('Basic crossbow: \t' + crossBow.getFullDisplay());
console.log('Enchanted crossbow: \t' + specialCrossBow.getFullDisplay());