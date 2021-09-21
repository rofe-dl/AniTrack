const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// const user_controller = require('../../../server/controller/user_controller');
const router = require('../../../server');

describe('User Controller', () => {
    it('logout should redirect to home page', (done) => {
        chai.request(router)
            .get('/logout')
            .redirects(1)
            .end((err, res) => {
                if (err) throw err;
                done();
            });
    });

    it('removeAnime without logging in should redirect to home page', (done) => {
        chai.request(router)
            .get('/remove-anime/1')
            .redirects(1)
            .end((err, res) => {
                if (err) throw err;
                done();
            });
    });
});