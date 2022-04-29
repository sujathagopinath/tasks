// import { server } from './server'
// describe('Hapi Healthchecks', () => {
//     // let server;
//     // beforeEach(async () => {
//     //     server = await server();
//     // });
//     test('Hapi Healthchecks respond correctly', async () => {
//         const response = await server.inject({
//             method: 'GET',
//             url: '/',
//         });
//         expect.assertions(1);
//         expect(response.statusCode).toBe(200);
//     });
// });
'use strict';
const Server = require('./server');
describe('ping controller', () => {
    const options = {
        method: 'GET',
        url: '/'
    };
    beforeAll((done) => {
        Server.on('start', () => {
            done();
        });
    });
    afterAll((done) => {
        Server.on('stop', () => {
            done();
        });
        Server.stop();
    });
    test('responds with success for ping', (done) => {
        Server.inject(options, (response) => {
            expect(response.statusCode).toBe(200);
            // expect(response.result).toBeInstanceOf(Object);
            done();
        });
    });
});
