import { IArticle, RealArticle, ProxyArticle } from './articles'

async function testArticle(article: IArticle) {
    const start = performance.now();
    
    for (let i = 0; i < 5; i++) {
        await article.getArticle();
        await article.setArticle(`Article ${i}`);
    }

    const end = performance.now();
    console.log(`Time elapsed: ${end - start} ms`);
}

(async function main() {
    console.log('Test with RealArticle');
    await testArticle(new RealArticle(1));

    console.log('Test with ProxyArticle');
    await testArticle(new ProxyArticle(1));
})();