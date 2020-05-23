const chai = require('chai');
const proxyquire = require('proxyquire');

const { expect } = chai;

describe('users', () => {
    describe('register', (done) => {
        let req = {
            body: {
                email: 'email@email.com',
                password: 'XXXX',
                name: 'NAME',
                last_name:'LASTNAME'
            },
            session: {
                user: ""
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
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    registerUser: () => {
                       return Promise.resolve()
                    },
                    userNotExist: (data) => {
                        return Promise.resolve();
                    }
                }
            })
            usersFake.register(req, res);
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
                        expect(data).deep.equal([req.body.email, 'ezRpBPY8wH8djMLYjX2uCKPwiKDkFZ1SFMJ6ZXGlHrQ=', req.body.name, req.body.last_name]);
                        done();
                    },
                    userNotExist: (data) => {
                        return Promise.resolve();
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
                    userNotExist: (data) => {
                        return Promise.reject();
                    },
                    registerUser: () => {
                        return Promise.resolve()
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
                    userNotExist: (data) => {
                        return Promise.resolve();
                    },
                    registerUser: () => {
                        return Promise.resolve()
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

    describe('login', (done) => {
        let req = {
            body: {
                email: 'email@email.com',
                password: 'XXXX'
            },
            session: {

            }
        }
        it('should login a user', (done) => {
            const res = {
                status: (status) => {
                    expect(status).to.equal(200);
                    done();
                    return {
                        send:(message)=> {
                        }
                    }
                }
            }
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    login: (data) => {
                        return Promise.resolve({name:"fdsfsdf", last_name:"dsfdsf"})
                    }
                },
                '../utils/validates': {
                    loginData: (data) => {
                        return true;
                    }
                }
            });
            usersFake.login(req, res)
         });
         it('shouldnt login a user with invalidate data', (done) => {
            const res = {
                status: (status) => {
                    expect(status).to.equal(400);
                    done();
                    return {
                        send:(message)=> {
                        }
                    }
                },
                cookie: () => {return}
            }
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    login: (data) => {
                        return Promise.resolve()
                    }
                },
                '../utils/validates': {
                    loginData: (data) => {
                        return false;
                    }
                }
            });
            usersFake.login(req, res)
         });
         it('shouldnt login is user not exist', (done) => {
            const res = {
                status: (status) => {
                    expect(status).to.equal(403);
                    done();
                    return {
                        send:(message)=> {
                        }
                    }
                },
                cookie: () => {return}
            }
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    login: (data) => {
                        return Promise.reject()
                    }
                },
                '../utils/validates': {
                    loginData: (data) => {
                        return true;
                    }
                }
            });
            usersFake.login(req, res)
         });
    });
});