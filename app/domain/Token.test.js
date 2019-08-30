
const Token = require("./Token")

jest.mock('./Repository', () => ({
      saveTokens: jest.fn()
  }));
const Repository = require('./Repository');

function assert(token) {
  expect(token.token).not.toBeNull();
  expect(token.studentId).toBe(1);
  expect(token.projectId).toBe(2);
}

test('Generate and save', () => {
  callback = function(){};
  Token.generateAndSaveTokens(1, 2, callback)
  expect(Repository.saveTokens).toBeCalledWith(expect.any(Array) ,callback);
});

test('Sinlge token genereated with success', () => {
  let token = Token.generateTokens(1, 2)[0];
  assert(token)
});

test('Multiple token genereated with success', () => {
  let tokens = Token.generateTokens([1,1,1], 2);
  tokens.forEach(assert);
});
