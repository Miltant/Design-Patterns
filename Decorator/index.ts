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


/*************/
/* Jeu vidéo */
/*************/

// TODO
// Dans cet exercice, nous allons créer un système d’arme enchantée pour un jeu en ligne.
// Chaque arme peut être composée d’un ou plusieurs enchantements ajoutés par le joueur,
// des enchantements tels que “Enchantements de force” qui donne plus de dégats,
// “enchantement de feu” qui augmente beaucoup des dégats mais réduits la durabilité,
// “Enchantement poids plume” qui permet d’augmenter considérablement a vitesse d’attaque mais réduit les dégats.

// Vous pouvez en imaginer autant que vous le souhaitez.
// L’utilisation du pattern Decorator nous permettra de dynamiquement construire des armes
// avec enchantements personnalisés en tenant compte des dégâts, la durabilité, et la vitesse d’attaque.