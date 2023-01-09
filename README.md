# NT File Sharing Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

This project is a front-end side of "NT File Sharing Demo". It needs to be used with
nt_file_sharing_demo_backend and nt_file_sharing_demo_infra repositories.

## Prerequisites

This project requires Node version 14.18.2
and Angular CLI version 13.1.4

Make sure you have these two requirements in your machine. If not, please follow these sites to install all dependencies. 

Node : https://nodejs.org/ja/blog/release/v14.18.2/
Angular CLI : https://www.npmjs.com/package/@angular/cli/v/13.1.4

## Installation

After your environment is setup properly, please clone this repository into your local machine.

```
cd /to/your/desire/directory
git clone https://github.com/narindech/nt_file_sharing_demo_frontend.git
```

Then, please go to project folder and install required packages.
```
cd /nt_file_sharing_demo_frontend/
npm install 
```

## Troubleshooting
If you experience some errors about permission denied when create or access files, folders or anything. You can fix with this command.
```
sudo chown -R $USER:$GROUP ~<directory>
```
replace it with your project folder. 

## Run Demo

You need to go into your project folder. (In case you are already there, skip this command.)
```
cd /nt_file_sharing_demo_frontend/
```
Run this command to start server,
```
ng serve
```
Open any web browser and navigate to this url, `http://localhost:4200/`.
You should see your site.
**Remark: To run this demo properly, you should start API server as well (nt_file_sharing_demo_backend)**.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
