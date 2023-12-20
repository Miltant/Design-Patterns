interface IArticle {
    getArticle(): Promise<string>;
    setArticle(article: string): Promise<void>;
}

class RealArticle implements IArticle {
    readonly id: number;
    private article = 'dummy article: ' + Math.random().toString(36).substring(7);

    constructor(id: number = -1) {
        this.id = id;
    }

    public async getArticle(): Promise<string> {
        // this.article = [on imagine qu'on récupère l'article depuis la db];
        await new Promise(r => setTimeout(r, 120));
        return this.article;
    }

    public async setArticle(article: string): Promise<void> {
        // [on imagine qu'on sauvegarde l'article dans la db] = article;
        await new Promise(r => setTimeout(r, 120));
        this.article = article;
    }
}

class ProxyArticle implements IArticle {
    private realArticle: RealArticle;
    private static cacheArticles = new Map<number, string>();

    constructor(id: number = -1) {
        if (ProxyArticle.cacheArticles.has(id)) {
            this.realArticle = new RealArticle(id);
        } else {
            this.realArticle = new RealArticle();
        }
    }

    public async getArticle(): Promise<string> {
        let article = ProxyArticle.cacheArticles.get(this.realArticle.id);
        if (!article) {
            article = await this.realArticle.getArticle();
            ProxyArticle.cacheArticles.set(this.realArticle.id, article);
        }
        return article;
    }

    public async setArticle(article: string): Promise<void> {
        await this.realArticle.setArticle(article);
        ProxyArticle.cacheArticles.set(this.realArticle.id, article);
    }
}

export { IArticle, RealArticle, ProxyArticle };