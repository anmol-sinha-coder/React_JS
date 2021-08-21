export function fetchRepos(id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res([
        {
          name: "Electron-React-TS",
          handle: "sdc224",
          stars: 2,
          url: "https://github.com/sdc224/electron-react-ts"
        },
        {
          name: "Logger-TS",
          handle: "sdc224",
          stars: 1,
          url: "https://github.com/sdc224/logger-ts"
        },
        {
          name: "Eslint-Config-ETS",
          handle: "sdc224",
          stars: 3,
          url: "https://github.com/sdc224/eslint-config-ets"
        }
      ]);
    }, 2000);
  });
}
