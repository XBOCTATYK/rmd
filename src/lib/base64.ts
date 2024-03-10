export const base64 = {
  encode(string: string) {
    return Buffer.from(string).toString('base64').replace(/=/g, '');
  },
};
