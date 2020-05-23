const chai = require('chai');
const proxyquire = require('proxyquire');

const { expect } = chai;

describe('server', () => {
  it('should run in port 3000', (done) => {
    const server = proxyquire('../server', {
        'express': () => {
            return {
                json:()=> {
                  return;  
                },
                use: () => {
                    return;
                },
                get: (path, callback) => {
                    return;
                },
                post: (path, callback) => {
                    return;
                },
                listen: (port, host) => {
                    expect(port).to.equal(3000)
                    done();
                }
            }
        },
        './controllers/users': {
            register: (req, res) => {
                return;
            }
        }
    });
  });
});