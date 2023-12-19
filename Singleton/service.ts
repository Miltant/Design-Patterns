class AppConfig {
    private static instance: AppConfig;
    #apiKey: string = '';
    #databaseUrl: string = '';

    private constructor() {
        if (AppConfig.instance) {
            throw new Error('Error - use AppConfig.getInstance()');
        }
    }
    
    static getInstance(): AppConfig {
        if (!AppConfig.instance) {
            AppConfig.instance = new AppConfig();
        }
        return AppConfig.instance;
    }

    init(apiKey: string, databaseUrl: string) {
        if (this.#apiKey !== '' || this.#databaseUrl !== '')
            throw new Error('Error - config already set');
        
        this.#apiKey = apiKey;
        this.#databaseUrl = databaseUrl;
    }

    get apiKey() {
        if (this.#apiKey === '' || this.#databaseUrl === '')
            throw new Error('Error - missing config');

        return this.#apiKey;
    }
    get databaseUrl() {
        if (this.#apiKey === '' || this.#databaseUrl === '')
            throw new Error('Error - missing config');

        return this.#databaseUrl;
    }
}

class ApiService {
    constructor(private config: AppConfig) {}

    getData() {
        return `data fetched from ${this.config.databaseUrl} with key ${this.config.apiKey}`;
    }
}

export { AppConfig, ApiService };