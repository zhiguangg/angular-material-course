## All rights belong to angular material course.
### This is the notes that I took along the learning process.

## 1. Introduction.
### Set up for local development
Install Node.js LTS. my version: V16.14.0
Optional. Install Git. my version: 2.39.2
IDE. VS Code.
clone the repo from course site: https://github.com/angular-university/angular-material-course
git clone https://github.com/angular-university/angular-material-course.git

cd angular-material-course # go to project folder

git checkout 1-start

git branch

npm ci # Install code dependency. This is to ensure use the exact version as specified in package-lock.json (instead of npm install).

npm install -g @angular/cli # Angular CLI: 16.0.3

what is material design. https://m3.material.io/
A specification from google to define good user interface.

add angular material to an existing project.
details steps and of what changes introduced are documented @material homepage https://material.angular.io/guide/getting-started.

create a new angular project: ng new project-name

add angular material: ng add @angular/material

import the specific module to where it's going to be used.

run with npm start # preferred to ng serve.

npm run server #run backend server

## Publish local VSCode changes to personal github account/repository 
### go to VSCode git plugin, remote, add remote
### click add remote from github
### allow checkin, after signin, choose repository name and click

# 2. material navigation and material component.
## build navigation with angular material
### mat-sidenav-container
1. mat-sidenav

    .open() .close()

2. mat-toolbar

    dropdown menu
    matMenuTriggerFor

3. outerLink

4. mat-tab-group

5. mat-card

6. mat-stepper

7. mat-table

8. multiTemplateDataRows    # data selection

24. mat-table * sort doesn't work
25. expansion doesn't work
