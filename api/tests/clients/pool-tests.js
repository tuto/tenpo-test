const chai = require('chai');
const proxyquire = require('proxyquire');

const { expect } = chai;

describe('pool', () => {
    describe('getConnection', (done) => {
        it('should get a connection', (done) => {
            const poolFake = proxyquire('../../clients/pool', {
                'pg': {
                    Pool: function(){
                        this.connect = () => {
                            return Promise.resolve()
                        }
                    }
                },
                '../utils/config': {
                    JWT_PASSWORD: 'password',
                    DB_USER:  'tenpo-api',
                    DB_PASSWORD: 'tenpo-api-pass',
                    DB_HOST: 'localhost',
                    DB_DATABASE: 'tenpo-api',
                    DB_PORT:  5432
                }
            })

            poolFake.getConnection()
            .then(() => {
                expect(true).to.be.true;
                done();
            })           
        });
        it('should error if connection isnt stablished', (done) => {
            const poolFake = proxyquire('../../clients/pool', {
                'pg': {
                    Pool: function(){
                        this.connect = () => {
                            return Promise.reject("ERROR")
                        }
                    }
                },
                '../utils/config': {
                    JWT_PASSWORD: 'password',
                    DB_USER:  'tenpo-api',
                    DB_PASSWORD: 'tenpo-api-pass',
                    DB_HOST: 'localhost',
                    DB_DATABASE: 'tenpo-api',
                    DB_PORT:  5432
                }
            })

            poolFake.getConnection()
            .catch((err) => {
                expect(err).to.be.equal("ERROR");
                done();
            })           
        });
    })
});