import { AppConfig, ApiService } from "./service";

const config = AppConfig.getInstance();
config.init('987654321', 'mysql://localhost:3306');

const api = new ApiService(config);

console.log(api.getData());