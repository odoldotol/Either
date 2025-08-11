describe('Module', () => {
  const indexModule = require('./index');
  const functionModule = require('./function/index');

  it('should be defined', () => {
    expect(indexModule).toBeDefined();
  });

  it('should export Either', () => {
    expect(indexModule["Either"]).toBeDefined();
  });

  it('should export Either as default', () => {
    expect(indexModule["default"]).toBeDefined();
    expect(indexModule["default"]).toBe(indexModule["Either"]);
  });

  it('should export function', () => {
    for (const key in functionModule) {
      expect(indexModule[key]).toBeDefined();
    }
  });
});