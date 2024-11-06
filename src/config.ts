interface Config {
  API_URL: string;
  SOCKET_URL: string;
}

const config: Config = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000'
};

export default config;