const chai = require('chai');
const proxyquire = require('proxyquire');

const { expect } = chai;

describe('db', () => {
    describe('registerUser', (done) => {
        let data = {}
        beforeEach((done) => {
            data = {
                email: 'email@dsfdf.com',
                password: 'XXXX',
                name: 'NAME',
                lastName:'LASTNAME'
            };
            done();
        });
        it('should insert a new user in db', (done) => {
            const dbFake = proxyquire('../../clients/db', {
                './pool': {
                    getConnection: () => {
                        return Promise.resolve({
                            query:()=> {
                                return Promise.resolve();
                            },
                            release: () => {
                                return;
                            }
                        })
                    }
                }
            })

            dbFake.registerUser(data)
            .then(() => {
                expect(true).to.be.true;
                done();
            })           
        });
        it('should throw error if connection fail', (done) => {
            const dbFake = proxyquire('../../clients/db', {
                './pool': {
                    getConnection: () => {
                        return Promise.reject()
                    }
                }
            })

            dbFake.registerUser(data)
            .catch(() => {
                expect(true).to.be.true;
                done();
            })           
        });
        it('should throw error if query fail', (done) => {
            const dbFake = proxyquire('../../clients/db', {
                './pool': {
                    getConnection: () => {
                        return Promise.resolve({
                            query:()=> {
                                return Promise.reject();
                            },
                            release: () => {
                                return;
                            }
                        })
                    }
                }
            })

            dbFake.registerUser(data)
            .catch(() => {
                expect(true).to.be.true;
                done();
            })           
        });

        it('should release connection if all ok', (done) => {
            const dbFake = proxyquire('../../clients/db', {
                './pool': {
                    getConnection: () => {
                        return Promise.resolve({
                            query:()=> {
                                return Promise.resolve();
                            },
                            release: () => {
                                expect(true).to.be.true;
                                done();
                            }
                        })
                    }
                }
            })
            dbFake.registerUser(data);
        });     
    });
    describe('userNotExist', (done) => {
        let data = {}
        beforeEach((done) => {
            data = {
                email: 'email@dsfdf.com',
                password: 'XXXX',
                name: 'NAME',
                lastName:'LASTNAME'
            };
            done();
        });
        it('should throw error if user exist', (done) => {
            const dbFake = proxyquire('../../clients/db', {
                './pool': {
                    getConnection: () => {
                        return Promise.resolve({
                            query:()=> {
                                return Promise.resolve({rows:['1']});
                            },
                            release: () => {
                                return;
                            }
                        })
                    }
                }
            });
            dbFake.userNotExist('mail@mail.com')
            .catch(() =>{
                expect(true).to.be.true;
                done();
            });
        });
        it('should correct result if user not exist', (done) => {
            const dbFake = proxyquire('../../clients/db', {
                './pool': {
                    getConnection: () => {
                        return Promise.resolve({
                            query:()=> {
                                return Promise.resolve({rows:[]});
                            },
                            release: () => {
                                return;
                            }
                        })
                    }
                }
            });
            dbFake.userNotExist('mail@mail.com')
            .then(() =>{
                expect(true).to.be.true;
                done();
            });
        });
    
    });
    describe('login', (done) => {
        let data = {}
        beforeEach((done) => {
            data = {
                email: 'email@dsfdf.com',
                password: 'XXXX'
            };
            done();
        });
        it('should login a user if exist', (done) => {
            const dbFake = proxyquire('../../clients/db', {
                './pool': {
                    getConnection: () => {
                        return Promise.resolve({
                            query:()=> {
                                return Promise.resolve({rows:['1']});
                            },
                            release: () => {
                                return;
                            }
                        })
                    }
                }
            });
            dbFake.login('mail@mail.com')
            .then(() =>{
                expect(true).to.be.true;
                done();
            });
        });
        it('should throw error if user not exist', (done) => {
            const dbFake = proxyquire('../../clients/db', {
                './pool': {
                    getConnection: () => {
                        return Promise.resolve({
                            query:()=> {
                                return Promise.resolve({rows:[]});
                            },
                            release: () => {
                                return;
                            }
                        })
                    }
                }
            });
            dbFake.login('mail@mail.com')
            .catch(() =>{
                expect(true).to.be.true;
                done();
            });
        });
        it('should throw error if connection fail', (done) => {
            const dbFake = proxyquire('../../clients/db', {
                './pool': {
                    getConnection: () => {
                        return Promise.reject()
                    }
                }
            });
            dbFake.login('mail@mail.com')
            .catch(() =>{
                expect(true).to.be.true;
                done();
            });
        });

        it('should throw error if query fail', (done) => {
            const dbFake = proxyquire('../../clients/db', {
                './pool': {
                    getConnection: () => {
                        return Promise.resolve({
                            query:()=> {
                                return Promise.reject();
                            },
                            release: () => {
                                return;
                            }
                        })
                    }
                }
            });
            dbFake.login('mail@mail.com')
            .catch(() =>{
                expect(true).to.be.true;
                done();
            });
        });
    
    });
});