const chai = require('chai');
const proxyquire = require('proxyquire');

const { expect } = chai;

describe('crypter', () => {
    describe('crypt', (done) => {
        it('should crypt a text', (done) => {
            const crypterFake = proxyquire('../../utils/crypter', {
                'crypto': {
                    createHash: () => {
                       return {
                           update: () => {
                            return {
                                digest: () => {
                                 return "CRYPTED"
                                }
                            }
                           }
                       }
                    }
                }
            });
            const crypted = crypterFake.crypt("DSFDSF")
            expect(crypted).to.equal("CRYPTED");
            done();            
        });
    });

    describe('createToken', (done) => {
        it('should create a text', (done) => {
            const crypterFake = proxyquire('../../utils/crypter', {
                'jsonwebtoken': {
                    sign: () => {
                        return "XXXXX"
                    }
                }
            });
            const token = crypterFake.createToken("DSFDSF")
            expect(token).to.equal("XXXXX");
            done();            
        });
    });

    describe('validateToken', (done) => {
        it('should validate a token', (done) => {
            const crypterFake = proxyquire('../../utils/crypter', {
                'jsonwebtoken': {
                    verify: () => {
                        return true
                    },
                    sign: () => {
                        return "XXXXX"
                    }
                }
            });
            const token = crypterFake.createToken("DSFDSF")            
            expect(crypterFake.validateToken(token)).to.be.true;
            done();            
        });
        it('should invalidate a token is isnt whitlise', (done) => {
            const crypterFake = proxyquire('../../utils/crypter', {
                'jsonwebtoken': {
                    verify: () => {
                        return true
                    },
                    sign: () => {
                        return "XXXXX"
                    }
                }
            });
            expect(crypterFake.validateToken("DSFSDFds")).to.be.false;
            done();            
        });
        it('should invalidate a token is isnt not verify', (done) => {
            const crypterFake = proxyquire('../../utils/crypter', {
                'jsonwebtoken': {
                    verify: () => {
                        throw "error"
                    },
                    sign: () => {
                        return "XXXXX"
                    }
                }
            });
            const token = crypterFake.createToken("DSFDSF")            
            expect(crypterFake.validateToken(token)).to.be.false;
            done();            
        });
    });

    describe('getEmailFromToken', (done) => {
        it('should get email from token', (done) => {
            const crypterFake = proxyquire('../../utils/crypter', {
                'jsonwebtoken': {
                    decode: () => {
                        return {email:"email@email.com"}
                    }
                }
            });
            const email = crypterFake.getEmailFromToken("DSFDSF")
            expect(email).to.equal("email@email.com");
            done();            
        });
        it('should error if is imposible decode', (done) => {
            const crypterFake = proxyquire('../../utils/crypter', {
                'jsonwebtoken': {
                    decode: () => {
                        throw "error"
                    }
                }
            });
            try {
                crypterFake.getEmailFromToken("DSFDSF")
            }
            catch(e) {
                expect(e).to.equal("error")
                done(); 
            }
                       
        });
    });
});