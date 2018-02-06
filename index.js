#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const CURR_DIR = process.cwd();
const editFile = require("edit-file");


const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
    {
        name: 'project-choice',
        type: 'list',
        message: 'What project template would you like to generate?',
        choices: CHOICES
    },
    {
        name: 'project-name',
        type: 'input',
        message: 'Project name:',
        validate: function (input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else return 'Project name may only include letters, numbers, underscores and hashes.';
        }
    },
    {
        name: 'project-namespace',
        type: 'input',
        message: 'Namespace:',
        validate: function (input) {
            if (/^\w[\w\.]+\w$/.test(input)) return true;
            else return 'Project name may only include letters & dots.';
        }
    }
];


inquirer.prompt(QUESTIONS)
    .then(answers => {
    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];
    const projectNameSpace = answers['project-namespace'];
    const templatePath = `${__dirname}/templates/${projectChoice}`;

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    createDirectoryContents(templatePath, projectName, projectNameSpace);
});

function createDirectoryContents (templatePath, newProjectPath, nameSpace) {
    const filesToCreate = fs.readdirSync(templatePath);
    const nameSpaceFilePath = nameSpace.replace(/\./g, '/');

    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
        let contents = fs.readFileSync(origFilePath, 'utf8');
        contents =  contents.replace(/ui5expresstemplate/g, nameSpace);
        contents =  contents.replace(/templatepath/g, nameSpaceFilePath);


        const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
        fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
        fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

        // recursive call
        createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`, nameSpace);
    }
});
}