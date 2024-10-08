import { FourÀMargherita, FourÀCarbonara } from './pizzeria';
import { CarVerticalCreator, CamionVerticalCreator, TracteurVerticalCreator, VehicleCreator } from './vehicles';

/************/
/* Pizzeria */
/************/

const fourÀMargherita = new FourÀMargherita();
const fourÀCarbonara = new FourÀCarbonara();

class Pizzaïolo {
    static commander(four: FourÀMargherita | FourÀCarbonara) {
        return four.commander();
    }

}

console.log('Client: Commande de pizza margherita:');
console.log(Pizzaïolo.commander(fourÀMargherita));

console.log('Client: Commande de pizzas carbo:');
console.log(Pizzaïolo.commander(fourÀCarbonara));


/*************/
/* Véhicules */
/*************/


async function main(vin: string, creator: VehicleCreator) {
    // votre système de création du bon element juste en dessous
    // la classe doit être enregistrée dans une variable const
    const api = creator.implement();

    // ne pas toucher
    const authSuccess = await api.authenticate(vin);
    if (!authSuccess) throw new Error('Could not authenticate with the api');

    const response = await api.getInformation(vin);

    console.log(response);
}

main('123F234', new CarVerticalCreator());
main('282FYF274FA023YFH', new CamionVerticalCreator());
main('J87UY4HJRUIFYH', new TracteurVerticalCreator());