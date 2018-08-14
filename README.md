# expressui5

CLI tool to create UI5 projects quickly from templates.

The intention here is to speed along initial development of applications NOT create fully functional 'out of the box' applications that you can plug and play into a clients landscape.

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

## How to contribute

Clone the github repo, once installed in your local system if you run the command 'npm link /pathtoexpressui5' you can then use the command 'expressui5' from your local version rather than the NPM version. 

To make new templates I suggest copying one of the already existing ones (which one might depend on your template) and then editing accordingly. Once complete submit a PR to merge into the master branch and I will review and publish to NPM as needed. 

# Template explanations

## simple-ui5 template

The simple-ui5 template is just that, no routing and nothing else setup but a single page application.

## simple-routing template

the simple-routing template is very similar to the simple-ui5 template but routing has been put in place and a very simple button to navigate to the next view has been implementated. This template has no data included.

## master-detail-flexible-columns

This template makes use of the newer flexible column layout control which allows for a master & 2 detail levels if required. The template makes use of both detail levels and uses ODATA from Northwind to show examples of data binding.