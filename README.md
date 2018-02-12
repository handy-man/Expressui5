# expressui5

CLI tool to create UI5 projects quickly from templates.

## install

`npm install -g expressui5`

## Usage

Run 'expressui5' inside of the directory you wish to create your ui5 application

Follow the prompts on screen which include selecting a template to use, giving a project name and the namespace for the application.

## New Local Custom Templates

Goto your global node_modules directory:

`npm root -g`

copy your template application into the folder:

`expressui5/templates/`

Templates must have the following changes made to them for automated namespace changes to take place:

Edit all namespaces with the "." notation to instead read "ui5expresstemplate" and all namespaces with the '/' to read "templatepath".

Examples of this can be seen inside of the included templates.