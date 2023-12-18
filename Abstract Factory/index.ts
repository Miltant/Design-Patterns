import { FourÀPizza, FourÀMargherita, FourÀCarbonara } from './pizzeria';
import { ElfGameFactory, OrcGameFactory } from './jeu';

/************/
/* Pizzeria */
/************/

const fourÀMargherita = new FourÀMargherita();
const fourÀCarbonara = new FourÀCarbonara();

function commanderPlate(four: FourÀPizza) {
    console.log(four.commander());
}

function commanderCalzone(four: FourÀPizza) {
    console.log(four.commanderCalzone());
}

commanderPlate(fourÀMargherita);
commanderPlate(fourÀCarbonara);

commanderCalzone(fourÀMargherita);
commanderCalzone(fourÀCarbonara);


/***********/
/*   RPG   */
/***********/

function getFactory(type: string) {
    switch (type) {
        case 'elf':
            return new ElfGameFactory();
        case 'orc':
            return new OrcGameFactory();
        default:
            throw new Error('Invalid type');
    }
}

const gameFactory = getFactory('elf');

const weapon = gameFactory.createWeapon();
const character = gameFactory.createCharacter();

console.log(`L'${character.display()} attaque avec son/sa ${weapon.display()}!`);