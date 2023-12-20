interface IProduit {
    prix: number;
    quantite: number;
    poids: number;
    nutriscore: Nutriscore;
    taille: {
        largeur: number;
        hauteur: number;
        profondeur: number 
    }
}

enum Nutriscore {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E"
}

interface INewApiProduit {
    data: {
        price: number;
        quantity: number
        quality: {
            nutriscore: Nutriscore,
        }
        size: string;
        weight: number;
    }
}

interface ICodeBarreApi {
    makeRequest(barreCode: string): Promise<IProduit>;
}

class NewCodeBarreApi {
    fetch(code: string) : Promise<INewApiProduit> {
        return new Promise((resolve, reject) => {
            resolve({
                data: {
                    price: 12,
                    quantity: 1,
                    quality: {
                        nutriscore: Nutriscore.B,
                    },
                    size: "12x24x3",
                    weight: 222
                }
            });
        })
    }
}

class AdapteurCodeBarreApi implements ICodeBarreApi {
    #api: NewCodeBarreApi;
    constructor(api: NewCodeBarreApi) {
        this.#api = api;
    }

    makeRequest(code: string): Promise<IProduit> {
        return this.#api.fetch(code)
            .then(({data}) => {
                const taille = data.size.split('x').map(parseFloat);

                return {
                    prix:       data.price,
                    quantite:   data.quantity,
                    poids:      data.weight,
                    nutriscore: data.quality.nutriscore,
                    taille: {
                        largeur:    taille[0],
                        hauteur:    taille[1],
                        profondeur: taille[2]
                    }
                };
            }
        );
    }
}

export { ICodeBarreApi, IProduit, Nutriscore, NewCodeBarreApi, AdapteurCodeBarreApi }