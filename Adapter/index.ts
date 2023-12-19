import { Pizza, FourABois, AdapteurFourABois, VoiceCommand } from "./pizzeria";
import { ICodeBarreApi, AdapteurCodeBarreApi, NewCodeBarreApi } from "./produits";

// pizzeria

console.log(`Préparation d'une pizza !`);
const pizza = new Pizza('marguerita', 7);

const four = new AdapteurFourABois(new FourABois(new VoiceCommand()));

four.ouvrir(1);
four.cuire(pizza);



// produits

console.log('Je vais chercher le produit BE49RJ2UFR sur l\'api');
  
const apiCodeBarre : ICodeBarreApi = new AdapteurCodeBarreApi(new NewCodeBarreApi());

apiCodeBarre.makeRequest('BE49RJ2UFR')
    .then((product) => {
        console.log(product.prix, product.nutriscore, product.taille.hauteur)
    }
)