export class UserAuthService {
  private readonly clientSecretHash: string;

  // App sends its client secret hash to match the value in the storage
  constructor(clientSecretHash: string) {
    this.clientSecretHash = clientSecretHash;
  }
}
