# Chicken Resource Manager
I took a lot of liberties with the design, and I imagined three different user scenarios. 
1. A farm worker who is looking at the status of each individual chicken on a farm and deciding what actions to take for the day. 
2. A vet who is measuring and assessing the chickens and deciding what needs to be done for their health.
3. An administrator who is looking at farms overall health and risks.  They are more interested in statistics of each individual farm.

## TODO
[X] Create app framework - pages and navbar
[X] Setup auth
[X] Start and seed DB
[X] Write API - add Farm & Chicken endpoint
[X] Create a farm list page
[X] Create a Chicken list page
[ ] Create a chicken detail modal
[ ] Add checkup API
[ ] Create a Checkup add page
[ ] Post endpoint for each checkup
[ ] Create a Chicken Timeline table page
[ ] Create landing page for Farm data - capacity & % full - charts
[ ] Change the chicken table to pageable & sortable
[ ] Add ability to filter the chicken table
[ ] Refactor copy/paste code sections
[ ] Create a "Vet" persona - give access to add check-ins but not see the farm tab or edit chickens
[ ] Create a changelog - record all admin actions w/ datestamp & username

## Project setup

Use `yarn` to install the project dependencies:

```bash
yarn install
```

## Technologies used
### Frontend
React.js with Material.ui components
### API
Node.js
### Data
PostgreSQL Alpine 16.4 running in a Docker container on port 5432

### Create an API

For the ["call an API"](https://auth0.com/docs/quickstart/spa/react/02-calling-an-api) page to work, you will need to [create an API](https://auth0.com/docs/apis) using the [management dashboard](https://manage.auth0.com/#/apis). This will give you an API identifier that you can use in the `audience` configuration field below.

If you do not wish to use an API or observe the API call working, you should not specify the `audience` value in the next step. Otherwise, you will receive a "Service not found" error when trying to authenticate.

### Configure credentials

The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work.

To do this, first copy `src/auth_config.json.example` into a new file in the same folder called `src/auth_config.json`, and replace the values with your own Auth0 application credentials, and optionally the base URLs of your application and API:

```json
{
  "domain": "{YOUR AUTH0 DOMAIN}",
  "clientId": "{YOUR AUTH0 CLIENT ID}",
  "audience": "{YOUR AUTH0 API_IDENTIFIER}",
  "appOrigin": "{OPTIONAL: THE BASE URL OF YOUR APPLICATION (default: http://localhost:3000)}",
  "apiOrigin": "{OPTIONAL: THE BASE URL OF YOUR API (default: http://localhost:3001)}"
}
```

## Run the sample

### DB Setup
You will need to have Postgres Alpine available - the default server is "localhost:5432".  Once the server is running, there are 2 script files in the .\SQL subfolder:
1. Create.sql = this will create the DB and the tables required for the app
2. Seed.sql = this will populate the DB with test data

### Compile and hot-reload for development

This compiles and serves the React app and starts the backend API server on port 3001.

```bash
yarn run dev
```

## Deployment

### Compiles and minifies for production

```bash
yarn run build
```

### Docker build

To build and run the Docker image, run `exec.sh`, or `exec.ps1` on Windows.

### Run your tests

```bash
yarn run test
```

## Create a Free Auth0 Account

1. Go to [Auth0](https://auth0.com) and click **Sign Up**.
2. Use Google, GitHub, or Microsoft Account to login.
