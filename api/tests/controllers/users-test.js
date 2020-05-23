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
                    },
                    insertAction: (data) => {
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
                    },
                    insertAction: (data) => {
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
                     },
                     insertAction: (data) => {
                         return Promise.resolve();
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
                     },
                     insertAction: (data) => {
                         return Promise.resolve();
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
        it('should return http code 500 if register fail', (done) => {

            const res = {
                status: (status) => {
                    expect(status).to.equal(500);
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
                        return Promise.reject()
                     },
                     insertAction: (data) => {
                         return Promise.resolve();
                     }
                },
                '../utils/validates': {
                    registerData: (data) => {
                        return true;
                    }
                }
            })

            usersFake.register(req, res);
        });
        it('should return http code 500 if register fail', (done) => {

            const res = {
                status: (status) => {
                    expect(status).to.equal(500);
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
                     },
                     insertAction: (data) => {
                         return Promise.reject();
                     }
                },
                '../utils/validates': {
                    registerData: (data) => {
                        return true;
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
                    },
                    insertAction: (data) => {
                        return Promise.resolve();
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
                    },
                    insertAction: (data) => {
                        return Promise.resolve();
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
                    },
                    insertAction: (data) => {
                        return Promise.resolve();
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

    describe('sum', (done) => {
        let req = {
            body: {
                n1: 1,
                n2: 3,
                token:"TOKEN"
            }
        }
        it('should sum 2 numbers', (done) => {
            const res = {
                status: (status) => {
                    expect(status).to.equal(200);
                    return {
                        send:(message)=> {
                            expect(message).to.deep.equal({suma:4});
                            done();
                        }
                    }
                }
            }
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    insertAction: (data) => {
                        return Promise.resolve();
                    }
                },
                '../utils/crypter': {
                    getEmailFromToken: (token) => {
                        return "mail@mail.com";
                    }
                }
            });
            usersFake.sum(req, res)
         });

         it('should return error if get email fail', (done) => {
            const res = {
                status: (status) => {
                    expect(status).to.equal(500);
                    done()
                    return {
                        send:(message)=> {
                        }
                    }
                }
            }
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    insertAction: (data) => {
                        return Promise.resolve();
                    }
                },
                '../utils/crypter': {
                    getEmailFromToken: (token) => {
                        throw "error obteniendo mail del token";
                    }
                }
            });
            usersFake.sum(req, res)
         });

         it('should return error if insert action fail', (done) => {
            const res = {
                status: (status) => {
                    expect(status).to.equal(500);
                    done()
                    return {
                        send:(message)=> {
                        }
                    }
                }
            }
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    insertAction: (data) => {
                        return Promise.reject();
                    }
                },
                '../utils/crypter': {
                    getEmailFromToken: (token) => {
                        return "mail@mail.com";
                    }
                }
            });
            usersFake.sum(req, res)
         });
    });

    describe('logout', (done) => {
        let req = {
            body: {
                token:"TOKEN"
            }
        }
        it('should logout error if token isnt pass', (done) => {
            const res = {
                status: (status) => {
                    expect(status).to.equal(400);
                    done()
                    return {
                        send:(message)=> {
                        }
                    }
                }
            }
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    insertAction: (data) => {
                        return Promise.resolve();
                    }
                },
                '../utils/crypter': {
                    getEmailFromToken: (token) => {
                        throw "no se pudo obtener el email desde el token";
                    }
                },
                '../utils/validates': {
                    logoutData: (data) => {
                        return false;
                    }
                }
            });
            usersFake.logout(req, res)
         });

         it('should logout error if is not posible obtain de email from token', (done) => {
            const res = {
                status: (status) => {
                    expect(status).to.equal(403);
                    done()
                    return {
                        send:(message)=> {
                        }
                    }
                }
            }
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    insertAction: (data) => {
                        return Promise.resolve();
                    }
                },
                '../utils/crypter': {
                    getEmailFromToken: (token) => {
                        throw "no se pudo obtener el email desde el token";
                    }
                },
                '../utils/validates': {
                    logoutData: (data) => {
                        return true;
                    }
                }
            });
            usersFake.logout(req, res)
         });

         it('should logout error if is not posible delete token', (done) => {
            const res = {
                status: (status) => {
                    expect(status).to.equal(403);
                    done()
                    return {
                        send:(message)=> {
                        }
                    }
                }
            }
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    insertAction: (data) => {
                        return Promise.resolve();
                    }
                },
                '../utils/crypter': {
                    getEmailFromToken: (token) => {
                        return "mail@mail.com";
                    },
                    deleteToken: (token) => {
                        throw "no es posible eliminar token";
                    }
                },
                '../utils/validates': {
                    logoutData: (data) => {
                        return true;
                    }
                }
            });
            usersFake.logout(req, res)
         });

         it('should logout error if isnt possible insert action', (done) => {
            const res = {
                status: (status) => {
                    expect(status).to.equal(403);
                    done()
                    return {
                        send:(message)=> {
                        }
                    }
                }
            }
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    insertAction: (data) => {
                        return Promise.reject();
                    }
                },
                '../utils/crypter': {
                    getEmailFromToken: (token) => {
                        return "mail@mail.com";
                    },
                    deleteToken: (token) => {
                        return;
                    }
                },
                '../utils/validates': {
                    logoutData: (data) => {
                        return true;
                    }
                }
            });
            usersFake.logout(req, res)
         });
        
         it('should logout', (done) => {
            const res = {
                status: (status) => {
                    expect(status).to.equal(200);
                    done()
                    return {
                        send:(message)=> {
                        }
                    }
                }
            }
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    insertAction: (data) => {
                        return Promise.resolve();
                    }
                },
                '../utils/crypter': {
                    getEmailFromToken: (token) => {
                        return "mail@mail.com";
                    },
                    deleteToken: (token) => {
                        return;
                    }
                },
                '../utils/validates': {
                    logoutData: (data) => {
                        return true;
                    }
                }
            });
            usersFake.logout(req, res)
         });
    });

    describe('history', (done) => {
        let req = {
            query: {
                email:"mail@mail.com"
            }
        }
        it('should history error if email isnt valid', (done) => {
            const res = {
                status: (status) => {
                    expect(status).to.equal(400);
                    done()
                    return {
                        send:(message)=> {
                        }
                    }
                }
            }
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    insertAction: (data) => {
                        return Promise.resolve();
                    }
                },
                '../utils/crypter': {
                    getEmailFromToken: (token) => {
                        throw "no se pudo obtener el email desde el token";
                    }
                },
                '../utils/validates': {
                    historyData: (data) => {
                        return false;
                    }
                }
            });
            usersFake.history(req, res)
         });

         it('should history error if is not posible obtain history', (done) => {
            const res = {
                status: (status) => {
                    expect(status).to.equal(403);
                    done()
                    return {
                        send:(message)=> {
                        }
                    }
                }
            }
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    getHistoryByEmail: (data) => {
                        return Promise.reject();
                    },
                    insertAction: (data) => {
                        return Promise.reject();
                    }
                },
                '../utils/crypter': {
                    getEmailFromToken: (token) => {
                        throw "no se pudo obtener el email desde el token";
                    }
                },
                '../utils/validates': {
                    historyData: (data) => {
                        return true;
                    }
                }
            });
            usersFake.history(req, res)
         });

        it('should logout error if isnt possible insert action', (done) => {
            const res = {
                status: (status) => {
                    expect(status).to.equal(403);
                    done()
                    return {
                        send:(message)=> {
                        }
                    }
                }
            }
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    getHistoryByEmail: (data) => {
                        return Promise.resolve();
                    },
                    insertAction: (data) => {
                        return Promise.reject();
                    }
                },
                '../utils/crypter': {
                    getEmailFromToken: (token) => {
                        return "mail@mail.com";
                    },
                    deleteToken: (token) => {
                        return;
                    }
                },
                '../utils/validates': {
                    historyData: (data) => {
                        return true;
                    }
                }
            });
            usersFake.history(req, res)
         });
        
         it('should obtain the user history', (done) => {
            const res = {
                status: (status) => {
                    expect(status).to.equal(200);
                    return {
                        send:(message)=> {
                            expect(message).to.deep.equal({ history: [ { description: 'REGISTER' } ] });
                            done()
                        }
                    }
                }
            }
            const usersFake = proxyquire('../../controllers/users', {
                '../clients/db': {
                    getHistoryByEmail: (data) => {
                        return Promise.resolve([{description:"REGISTER"}]);
                    },
                    insertAction: (data) => {
                        return Promise.resolve();
                    }
                },
                '../utils/crypter': {
                    getEmailFromToken: (token) => {
                        return "mail@mail.com";
                    },
                    deleteToken: (token) => {
                        return;
                    }
                },
                '../utils/validates': {
                    historyData: (data) => {
                        return true;
                    }
                }
            });
            usersFake.history(req, res)
         });
    });
    
    
});