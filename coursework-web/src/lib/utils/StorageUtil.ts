class StorageUtil {
  setToken(accessToken: string) {
    localStorage.setItem("ACCESS_TOKEN", accessToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem("ACCESS_TOKEN") || null;
  }

  removeToken() {
    localStorage.removeItem("ACCESS_TOKEN");
  }
}

export default new StorageUtil();
