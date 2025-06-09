# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Install [Docker](https://docs.docker.com/engine/install/)
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

### Application image on DockerHub

https://hub.docker.com/r/katherinas/nodejs2025q2-service-app

## Downloading

```
git clone https://github.com/KatherinaSl/nodejs2025Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm run docker:start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Running scan for vulnerabilities

To scan only apllication

```
npm run scan-app
```

To scan postgresSQl

```
npm run scan-postgres
```

To scan both 
```
npm run scan-all
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
