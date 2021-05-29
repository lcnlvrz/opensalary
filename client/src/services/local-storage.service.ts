export class LocalStorageService {
  static setToken(token: string) {
    localStorage.setItem("accessToken", token);
  }

  static removeToken() {
    localStorage.removeItem("accessToken");
  }

  static setExternalUserId(userId: string) {
    localStorage.setItem("externalId", userId);
  }

  static getToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  static getExternalId(): string | null {
    return localStorage.getItem("externalId");
  }

  static removeExternalId(): void {
    localStorage.removeItem("externalId");
  }
}
