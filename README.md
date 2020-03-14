# challenge-voting

Challenge to implement a product voting UI which closely matched a pretty hideous design spec.
The design for this is as close as possible to the spec that was provided.  I still lose sleep over how ugly it is.

## Getting Started

This app was built using Razzle (https://github.com/jaredpalmer/razzle) so I can't take the credit for the lovely SSR or the build tools!

### `npm install` or `yarn install`

To install all the packages.

### `npm start` or `yarn start`

To run the project locally. The application is accessible at `http://localhost:3000`.

### `npm run build` or `yarn build`

Produces the production build. This is taken straight from Razzle.

### `npm run start:prod` or `yarn start:prod`

Run this after a build and it will serve up the production built code. Also accessible at `http://localhost:3000`.

### `npm test` or `yarn test`

Will run the sample unit tests. I added some plain jests tests and others using
react-testing-library

### `npm run test:e2e` or `yarn test:e2e`

This will launch Cypress in interactive mode to run the example BDD tests.

Ensure the app is running on http://localhost:3000 first as Cypress will run against this URL.
