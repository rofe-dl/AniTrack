const assert = require('chai').assert;
const jikan_API = require('../../../server/utils/jikan_API');

describe('Jikan API', () => {
    it('getFrontPageAnime should return arrays of 5 anime objects each', async () => {
        const result = await jikan_API.getFrontPageAnime();
        assert.equal(result.comedy.length, 5);
    });

    it('getAnimeInfo should return details of Cowboy Bebop', async() => {
        const result = await jikan_API.getAnimeInfo(1);
        assert.equal(result.title, 'Cowboy Bebop');
    });
});