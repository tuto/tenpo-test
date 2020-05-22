const chai = require('chai');
const users = require('../../controllers/users');
const proxyquire = require('proxyquire');

const { expect } = chai;

describe('users', () => {
    describe('register', (done) => {
        const req = {
            body: {
                email: 'email@email.com',
                password: 'XXXX',
                name: 'NAME',
                lastName:'LASTNAME'
            }
        }
        it('should register a user', (done) => {            
            const res = {
                status: (status) => {
                    expect(status).to.equal(201)
                    return {
                        send:(message)=> {
                            expect(message).to.equal(undefined);
                            done();
                        }
                    }
                }
            }
            users.register(req, res);
        });
        it('should save in db a user data', (done) => {

            const res = {
                status: (status) => {
                    return {
                        send:(message)=> {
                        }
                    }
                }
            }

            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    registerUser: (data) => {
                        expect(data).deep.equal(req.body);
                        done();
                    }
                }
            })

            usersFake.register(req, res);
        });

        it('should return http code 409 if user exist', (done) => {

            const res = {
                status: (status) => {
                    expect(status).to.equal(409);
                    done();
                    return {
                        send:(message)=> {
                        }
                    }
                }
            }

            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    userExist: (data) => {
                        return true;
                    }
                }
            })

            usersFake.register(req, res);
        });

        it('should return http code 400 if data isnt correct', (done) => {

            const res = {
                status: (status) => {
                    expect(status).to.equal(400);
                    done();
                    return {
                        send:(message)=> {
                        }
                    }
                }
            }

            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    userExist: (data) => {
                        return true;
                    }
                },
                '../utils/validates': {
                    registerData: (data) => {
                        return false;
                    }
                }
            })

            usersFake.register(req, res);
        });
    });  
});