const chai = require('chai');
const lib = require('../index');

const { should } = chai;

const { expect } = chai;
// eslint-disable-next-line no-undef
describe('test suit', () => {
  // eslint-disable-next-line no-undef
  it('test the add method', () => {
    expect(lib.sum(1, 8)).to.be.equal(9);
  });
});
// eslint-disable-next-line no-undef
describe('test suit', () => {
  // eslint-disable-next-line no-undef
  it('test the multiply method', () => {
    expect(lib.multiply(4, 3)).to.be.equal(12);
  });
});
