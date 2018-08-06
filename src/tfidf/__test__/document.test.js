const {Document, NAMEISREQUIRED} = require('../document');
describe('document class', () => {
  test('document name is required', () => {
    expect(() => new Document()).toThrowError(NAMEISREQUIRED);
  });

  test('document name property', () => {
    let document = new Document('a.txt');
    expect(document.name).toBe('a.txt');
  });
});
