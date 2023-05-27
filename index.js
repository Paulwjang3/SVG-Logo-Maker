const inquirer = require('inquirer');

const fs = require('fs');

const { Triangle, Circle, Square } = require('./lib/shapes');

function writeToFile(fileName, response) {
    let svgText = '';
    svgText = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';

    svgText += "<g>";

    svgText += `${response.shape}`;

    let shapeChoice;

    if (response.shape === "Triangle") {
        shapeChoice = new Triangle();
        svgText += `<polygon points="150, 18 244, 182 56, 182" fill="${response.shapeBackgroundColor}"/>`;
      } else if (response.shape === "Square") {
        shapeChoice = new Square();
        svgText += `<rect x="73" y="40" width="160" height="160" fill="${response.shapeBackgroundColor}"/>`;
      } else {
        shapeChoice = new Circle();
        svgText += `<circle cx="150" cy="115" r="80" fill="${response.shapeBackgroundColor}"/>`;
      }

      svgText += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${response.textColor}">${response.text}</text>`;
      svgText += "</g>";
      svgText += "</svg>";

      fs.writeFile(fileName, svgText, (err) => {
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