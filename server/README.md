# Real-time Cryptocurrency Tracker server/API

The primary purpose of this API is to provide basic user management in addition to cryptocurrency transaction tracking. _The API is not intended to provide real-time currency pair tracking. Refer to third-party APIs (like [CryptoCompare's API](https://www.cryptocompare.com/api/#)) for that functionality._

## Prerequisites
* [Docker](https://www.docker.com/)

## To run
* For development:
  - Run the command `npm run docker-start` in this README's directory
    - The result of this command is a running API container that is connected to a running MongoDB container. Ready to go on the port specified by port mapping in `docker-compose.yml`.
    - This command uses the `docker-compose.yml` file to compose the MongoDB docker container and the application container. The `docker-compose.yml` file uses the `Dockerfile` file by default when creating the application container.
* For testing:
  - Run the command `npm run docker-test` in this README's directory
    - The result of this command is a running API testing container that is connected to a running MongoDB container. Ready to go on the port specified by port mapping in `docker-compose.test.yml`. *Tests run automatically.*
    - This command uses the `docker-compose.test.yml` file to compose the MongoDB docker container and the application container. The separate `docker-compose.test.yml` file is used to specify usage of the `Dockerfile.test` file when creating the application container. The `Dockerfile.test` file ensures that the `npm` script `test` is run to execute the application's tests.
* TODO: For production

## Directory structure
* `/bin` - Contains `www` file which initializes the application when executed via `node` command
* `/config` - Contains environment variable values to be accessed using the `npm` package `config`
* `/controllers` - Application logic
* `/enums` - General-purpose application enumerations
* `/models` - Mongoose data models
* `/routes` - API routes
* `/test` - API Mocha tests

## Required environment variables
  - `RCT_SECRET` - Used for signing JWTs. It is **imperative** that a secret is used (by setting the environment variable value on the host machine) in production environments
    * Default value: `SET_SECRET_FOR_PRODUCTION`
  - `RCT_MONGODB_CONNECTION_URL_BASE` - Used for connecting to running instance of MongoDB on host machine.
    * Default value: `mongodb://mongo`
      - `mongo` is used because it is the MongoDB Docker container's "URL" (image name)

## Acknowledgements
  - [Docker Documentation](https://docs.docker.com/)
  - [Dockerizing a Node.js web app](https://goo.gl/8r2qwN)
  - [Docker development workflow: Node, Express, Mongo](https://goo.gl/z1hvJJ)