interface IPizza {
    getName(): String;
    getMinuteCuisson(): number;
}

interface IFourElectrique {
    ouvrir(porte: Number): Promise<Boolean>;
    cuire(pizza: IPizza): Promise<Boolean>;
}

interface IVoiceCommand {
    speak(phrase: String): void;
}

class Pizza implements IPizza {
    private name: string;
    private minutesCuisson: number;
    constructor(name: string, minutesCuisson: number) {
        this.name = name;
        this.minutesCuisson = minutesCuisson;
    }

    getName() {
        return this.name;
    }

    getMinuteCuisson() {
        return this.minutesCuisson;
    }
}

class VoiceCommand implements IVoiceCommand {
    speak(phrase: String) {
        console.log(phrase);
    }
}

class FourABois {
    private VoiceCommand: IVoiceCommand;
    private pizzasCuisson: { pizza: IPizza; date: Date }[];

    constructor(VoiceCommander: IVoiceCommand) {
        this.VoiceCommand = VoiceCommander;
        this.pizzasCuisson = [];
    }

    public deverouiller() {
        return new Promise((resolve, reject) => {
            this.VoiceCommand.speak('Le four est désormais déverrouillé');
            resolve(true);
        });
    }

    public enclencher(porte: Number) {
        return new Promise((resolve, reject) => {
            this.VoiceCommand.speak(`La porte n° ${porte} est ouverte.`);
            resolve(true);
        });
    }

    public placer(pizza: IPizza) {
        return new Promise((resolve, reject) => {
            const pizzaItem = {
                pizza,
                date: new Date(),
            };
            this.pizzasCuisson.push(pizzaItem);
            this.VoiceCommand.speak(
                `La pizza ${pizza.getName()} est placée pour ${pizza.getMinuteCuisson()} minutes de cuisson sortie prévue à ${new Date(
                    pizzaItem.date.getTime() + pizza.getMinuteCuisson() * 60000
                )}.`
            );
            resolve(true);
        });
    }

    public faireTourner() {
        return new Promise((resolve, reject) => {
            this.VoiceCommand.speak(`La plaque tourne`);
            resolve(true);
        });
    }

    public chaleur() {
        return new Promise((resolve, reject) => {
            this.VoiceCommand.speak(`La chaleur est remise en route`);
            resolve(true);
        });
    }
}

class AdapteurFourABois implements IFourElectrique {
    private fourABois: FourABois;
    constructor(fourABois: FourABois) {
        this.fourABois = fourABois;
    }

    async ouvrir(porte: Number) {
        return !!(
            await this.fourABois.deverouiller() &&
            await this.fourABois.enclencher(porte)
        );
    }

    async cuire(pizza: IPizza) {
        return !!(
            await this.fourABois.placer(pizza) &&
            await this.fourABois.faireTourner() &&
            await this.fourABois.chaleur()
        );
    }
}

export { Pizza, FourABois, AdapteurFourABois, VoiceCommand };