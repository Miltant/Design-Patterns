interface ExternalInfoService {
    url: string;
    authenticate(vinVehicule: string): Promise<boolean>;
    getInformation(vinVehicule: string): Promise<string>;
}

class CarVertical implements ExternalInfoService {
    url: string = 'https://carvertical.api.example.com';
    authenticate(vinVehicule: string): Promise<boolean> {
        console.log(`Authentification CarVertical vin : ${vinVehicule}`);
        return Promise.resolve(true);
    }
    getInformation(vinVehicule: string): Promise<string> {
        return Promise.resolve(`Récupération des données CarVertical : ${vinVehicule}`);
    }
}

class CamionVertical implements ExternalInfoService {
    url: string = 'https://camionvertical.api.example.com';
    authenticate(vinVehicule: string): Promise<boolean> {
        console.log(`Authentification CamionVertical vin : ${vinVehicule}`);
        return Promise.resolve(true);
    }
    getInformation(vinVehicule: string): Promise<string> {
        return Promise.resolve(`Récupération des données CamionVertical : ${vinVehicule}`);
    }
}

class TracteurVertical implements ExternalInfoService {
    url: string = 'https://tracteurvertical.api.example.com';
    authenticate(vinVehicule: string): Promise<boolean> {
        console.log(`Authentification TracteurVertical vin : ${vinVehicule}`);
        return Promise.resolve(true);
    }
    getInformation(vinVehicule: string): Promise<string> {
        return Promise.resolve(`Récupération des données TracteurVertical : ${vinVehicule}`);
    }
}

abstract class VehicleCreator {
    abstract implement(): ExternalInfoService;
}

class CarVerticalCreator extends VehicleCreator {
    implement(): ExternalInfoService {
        return new CarVertical();
    }
}

class CamionVerticalCreator extends VehicleCreator {
    implement(): ExternalInfoService {
        return new CamionVertical();
    }
}

class TracteurVerticalCreator extends VehicleCreator {
    implement(): ExternalInfoService {
        return new TracteurVertical();
    }
}


export { CarVerticalCreator, CamionVerticalCreator, TracteurVerticalCreator, VehicleCreator };