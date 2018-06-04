Required environment variables:
  - RCT_SECRET - Used for signing JWTs. It is **imperative** that a secret is used (by setting the environment variable value on the host machine) in production environments
    * Default value: SET_SECRET_FOR_PRODUCTION
  - RCT_MONGODB_CONNECTION_URL_BASE - Used for connecting to running instance of MongoDB on host machine.
    * Default value: mongodb://localhost