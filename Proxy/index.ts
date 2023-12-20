import { IArticle, RealArticle, ProxyArticle } from './articles'
import { RealCard, EAction, ProxyCard } from './pokémon'

(async function main() {
    // Test Articles

    async function testArticle(article: IArticle) {
        const start = performance.now();
        
        for (let i = 0; i < 5; i++) {
            await article.getArticle();
            await article.setArticle(`Article ${i}`);
        }
    
        const end = performance.now();
        console.log(`Time elapsed: ${end - start} ms`);
    }

    console.log('Test with RealArticle');
    await testArticle(new RealArticle(1));

    console.log('Test with ProxyArticle');
    await testArticle(new ProxyArticle(1));
    

    console.log('---------');
    // Test Pokémon

    const cardForBanned = new ProxyCard(495);
    cardForBanned.deny('get');

    const cardForUser = new ProxyCard(134);

    const cardForModerator = new ProxyCard(863);
    cardForModerator.allow('create');
    cardForModerator.allow('update');

    const cardForAdmin = new ProxyCard();
    cardForAdmin.allow('create');
    cardForAdmin.allow('update');
    cardForAdmin.allow('delete');

    cardForBanned.createCard('Snivy')       .then(_=>console.log('succes 1')).catch(e=>console.error('1) ' + e.message)); // Should throw an error
    cardForBanned.getCard()                 .then(_=>console.log('succes 2')).catch(e=>console.error('2) ' + e.message)); // Should throw an error

    cardForUser.getCard()                   .then(_=>console.log('succes 3')).catch(e=>console.error('3) ' + e.message)); // Should work
    cardForUser.updateCard('Vappy:3')       .then(_=>console.log('succes 4')).catch(e=>console.error('4) ' + e.message)); // Should throw an error

    cardForModerator.updateCard('Obstagoon').then(_=>console.log('succes 5')).catch(e=>console.error('5) ' + e.message)); // Should work
    cardForModerator.deleteCard()           .then(_=>console.log('succes 6')).catch(e=>console.error('6) ' + e.message)); // Should throw an error

    try {
        console.log(await cardForAdmin.createCard('Bulbizarre'), 'succes 7'); // Should work
    } catch (e) { console.error('7', e) }
    try {
        console.log(await cardForAdmin.updateCard('Bulbizarre'), 'succes 8'); // Should work
    } catch (e) { console.error('8', e) }
    try {
        console.log(await cardForAdmin.deleteCard(), 'succes 9'); // Should work
    } catch (e) { console.error('9', e) }
})();