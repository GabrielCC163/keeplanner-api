export interface AppConfig {
  node_env: string;
  database: {
    user: string;
    password: string;
    name: string;
    host: string;
    port: number;
  };
  salt_rounds: number;
}

export const getConfig = (): AppConfig => {
  const env = process.env;

  return {
    node_env: env.NODE_ENV,
    database: {
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      name: env.DB_NAME,
      host: env.DB_HOST,
      port: Number(env.DB_PORT),
    },
    salt_rounds: Number(env.SALT_ROUNDS),
  };
};
