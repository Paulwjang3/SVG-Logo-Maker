const inquirer = require('inquirer');

const fs = require('fs');

const { Triangle, Circle, Square } = require('./lib/shapes');

function writeToFile(fileName, response) {
    let svgText = '';
    svgText = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';

    svgText += "<g>";

    svgText += `${answers.shape}`;

    let shapeChoice;

    if (answers.shape === "Triangle") {
        shapeChoice = new Triangle();
        svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
      } else if (answers.shape === "Square") {
        shapeChoice = new Square();
        svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
      } else {
        shapeChoice = new Circle();
        svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
      }

      svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
      svgString += "</g>";
      svgString += "</svg>";

      fs.writeFile(fileName, svgString, (err) => {
        err ? console.log(err) : console.log("Generated logo.svg");
      });
}



function questions() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: "What text do you want on your logo? (Enter three characters)",
            name: "text",
        },
        {
            type: 'input',
            message: 'Input desired color of text (Enter color keyword or a hexadecimal number)',
            name: 'textColor',
        },
        {
            type: 'list',
            message: 'Please select the desired shape of your logo',
            choices: ['Triangle', 'Circle', 'Square'],
            name: 'shape',
        },
        {
            type: 'input',
            message: 'Input desired color of the shape (Enter color keyword or a hexadecimal number)',
            name: 'shapeColor',
        },
    ])
    .then((response) => {
        if (response.text.length > 3) {
            console.log('Please enter a value that is no more than 3 characters');
            questions();
        } else {
            writeToFile('logo.svg', response);
        }
    });
}

questions();