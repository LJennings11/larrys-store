# LarryStore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.4.

## Development backend server

Run `node server.js` for the development backend server. This will start a server on port 3000. 

The server saves data locally to a data.json file. When it starts, this data is retrieved when the server tarts. The file is updated
when the data is changed successfuly while running. A data.backup.json exists in case things go wrong

## Searching

You can search buy specifiying a full category, or buy specifiying a partial name. The search is case-insensitive.

## Admin actions

Administrators can edit add items, remove members, and view all previous transactions. Adminstrator actions are require a token. This token is passed on the REST calls.

A default admin account is created: username=admin, password=admin

## Non-Admin actions

Anyone can view the shop.
Members, when logged in, can add items to their cart and buy things. User specific actions require a token. This token is passed on the REST calls.

## Token Based Authentication

A very basic token is created during login, and passed back to the client side. This token is required for specific actions. The token
and username are saved in local storage for somewhat persistent states.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
