const ACCESS_TOKEN = 'access_token';

const authStorageService = () => {
  return {
    setToken: (token?: string) => {
      if (token) {
        localStorage.setItem(ACCESS_TOKEN, token);
      }
    },

    getToken: () => localStorage.getItem(ACCESS_TOKEN),

    removeToken: () => {
      localStorage.removeItem(ACCESS_TOKEN);
    },
  };
};

export default authStorageService;
