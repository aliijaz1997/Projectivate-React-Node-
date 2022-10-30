import { ISSERVER } from "../utils/is-server";

class LocalStorageService {
  setToken(token: string) {
    if (!ISSERVER) localStorage.setItem("token", token);
  }

  getToken(): string | null {
    if (ISSERVER) return null;
    return localStorage.getItem("token");
  }

  removeToken() {
    if (!ISSERVER) localStorage.removeItem("token");
  }
}

export const localStorageService = new LocalStorageService();
