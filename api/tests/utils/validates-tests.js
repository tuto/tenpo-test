const chai = require('chai');
const validates = require('../../utils/validates');

const { expect } = chai;

describe('validates', () => {
    describe('registerData', (done) => {
        let data = {}
        beforeEach((done) => {
            data = {
                email: 'email@dsfdf.com',
                password: 'XXXX',
                name: 'NAME',
                last_name:'LASTNAME'
            };
            done();
        });
        it('should validate true if data is correct', (done) => {
            const result = validates.registerData(data);
            expect(result).to.be.true;
            done();
        });
        it('should validate false if email is wrong', (done) => {
            data.email = 'dsfdsf@';
            const result = validates.registerData(data);
            expect(result).to.be.false;
            done();
        });
        it('should validate false if password is wrong', (done) => {
            data.password = 'dsfdsf@_';
            const result = validates.registerData(data);
            expect(result).to.be.false;
            done();
        });
        it('should validate false if name is wrong', (done) => {
            data.name = 324324;
            const result = validates.registerData(data);
            expect(result).to.be.false;
            done();
        });
        it('should validate false if lastName is wrong', (done) => {
            data.last_name = 324324;
            const result = validates.registerData(data);
            expect(result).to.be.false;
            done();
        });
    });

    describe('loginData', (done) => {
        let data = {}
        beforeEach((done) => {
            data = {
                email: 'email@dsfdf.com',
                password: 'XXXX'
            };
            done();
        });
        it('should validate true if data is correct', (done) => {
            const result = validates.loginData(data);
            expect(result).to.be.true;
            done();
        });
        it('should validate false if email is wrong', (done) => {
            data.email = 'dsfdsf@';
            const result = validates.loginData(data);
            expect(result).to.be.false;
            done();
        });
        it('should validate false if password is wrong', (done) => {
            data.password = 'dsfdsf@_';
            const result = validates.loginData(data);
            expect(result).to.be.false;
            done();
        });
    });
});