
const Token = require("./Token")

function assert(token) {
  expect(token.token).not.toBeNull();
  expect(token.studentId).toBe(1);
  expect(token.projectId).toBe(2);
}

test('Sinlge token genereated with success', () => {
  let token = Token.generateTokens(1, 2)[0];
  assert(token)
});

test('Multiple token genereated with success', () => {
  let tokens = Token.generateTokens([1,1,1], 2);
  tokens.forEach(assert);
});
