export const getConfig = () => {
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
  };
};
