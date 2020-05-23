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

    describe('history', (done) => {
        let data = {}
        beforeEach((done) => {
            data = {
                email: 'email@dsfdf.com'
            };
            done();
        });
        it('should get history', (done) => {
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
            dbFake.getHistoryByEmail('mail@mail.com')
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
                                return Promise.reject();
                            },
                            release: () => {
                                return;
                            }
                        })
                    }
                }
            });
            dbFake.getHistoryByEmail('mail@mail.com')
            .catch(() =>{
                expect(true).to.be.true;
                done();
            });
        });
        it('should throw error if not exist data', (done) => {
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
            dbFake.getHistoryByEmail('mail@mail.com')
            .then((response) =>{
                expect(response).to.deep.equal([]);
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
            dbFake.getHistoryByEmail('mail@mail.com')
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
            dbFake.getHistoryByEmail('mail@mail.com')
            .catch(() =>{
                expect(true).to.be.true;
                done();
            });
        });    
    });

    describe('insertAction', (done) => {
        let data = {}
        beforeEach((done) => {
            data = {
                email: 'email@dsfdf.com'
            };
            done();
        });
        it('should insert a action', (done) => {
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
            dbFake.insertAction('mail@mail.com', 4)
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
                                return Promise.reject();
                            },
                            release: () => {
                                return;
                            }
                        })
                    }
                }
            });
            dbFake.insertAction('mail@mail.com', 4)
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
            dbFake.insertAction('mail@mail.com', 4)
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
            dbFake.insertAction('mail@mail.com', 4)
            .catch(() =>{
                expect(true).to.be.true;
                done();
            });
        });
    
    });
});