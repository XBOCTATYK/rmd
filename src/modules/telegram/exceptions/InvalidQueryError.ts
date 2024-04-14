export class InvalidQueryError extends Error {
  constructor(data: unknown) {
    super(`Invalid telegram query: [${JSON.stringify(data)}]`);
    this.name = 'InvalidQueryError';
  }
}
