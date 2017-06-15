'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = "amzn1.ask.skill.17eb6555-42e2-40f8-841d-f5a1774126b7";

var SKILL_NAME = "Physics Constants";
var GET_FACT_MESSAGE = "";
var HELP_MESSAGE = "Ask me a physics constant, like: What is the Planck Constant?";
var HELP_REPROMPT = "I didn't catch that. " + HELP_MESSAGE;
var STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
var data = {
    // Universal Constants
    "electric constant": {
        "value": "8.854187 * 10^-12 farads per meter",
        "prefix": "The Electric Constant is "
    },
    "magnetic constant": {
        "value": "12.566370 * 10^-7 newtons per ampere squared",
        "prefix": "The Magnetic Constant is "
    },
    "newtonian constant of gravitation": {
        "value": "6.67408 * 10^-11 meters cubed per kilogram second squared",
        "prefix": "The Newtonian Constant of Gravitation is "
    },
    "planck constant": {
        "value": "6.626070 * 10-34 joule seconds",
        "prefix": "The Planck Constant is "
    },
    "planck length": {
      "value": "1.616229 * 10^-35 meters",
      "prefix": "Planck Length is "
    },
    "planck mass": {
      "value": "2.176470 * 10^-8 kilograms",
      "prefix": "Planck Mass is "
    },
    "planck temperature": {
        "value": "1.416808 * 10^32 kelvin",
        "prefix": "Planck Temperature is "
    },
    "planck time": {
        "value": "5.39116 * 10^-44 seconds",
        "prefix": "Planck Time is "
    },
    "speed of light": {
        "value": "299792458 meters per second",
        "prefix": "The speed of light in a vacuum is "
    },
    // Electromagnetic Constants
    "bohr magneton": {
        "value": "927.400999 * 10^-26 joules per tesla",
        "prefix": "The Bohr Magneton is "
    },
    "conductance quantum": {
        "value": "7.748092 * 10^-5 siemens",
        "prefix": "The conductance quantum is "
    },
    "elementary charge": {
        "value": "1.602177 * 10^-19 coulombs",
        "prefix": "The elementary charge constant is "
    },
    "josephson constant": {
        "value": "483597.8525 * 10^9 hertz per volt",
        "prefix": "The Josephson Constant is "
    },
    "magnetic flux quantum": {
        "value": "2.067833 * 10^-15 webers",
        "prefix": "The Magnetic Flux Quantum is "
    },
    "nuclear magneton": {
        "value": "3.152451 * 10^-8 electronvolts per tesla",
        "prefix": "The Nuclear Magneton is "
    },
    "von klitzing constant": {
        "value": "25812.807455 ohms",
        "prefix": "The von Klitzing constant is "
    },
    // Chemistry Constants
    "atomic mass constant": {
        "value": "1.660539 * 10^-27 kilograms",
        "prefix": "The Atomic Mass Constant is "
    },
    "avogadro's constant": {
        "value": "6.022140 * 10^23 inverse moles",
        "prefix": "Avogadro's constant is "
    },
    "boltzmann constant": {
        "value": "1.380648 * 10^-23 joules per kelvin",
        "prefix": "Boltzmann's constant is "
    },
    "faraday constant": {
        "value": "96485.33289 coulombs per mole",
        "prefix": "The Faraday Constant is "
    },
    "first radiation constant": {
        "value": "3.741771 watt meters squared",
        "prefix": "The First Radiation Constant is "
    },
    "loschmidt constant": {
        "value": "2.686781 * 10^25 inverse meters cubed",
        "prefix": "The Loschmidt Constant at 0 degrees celsius and 1 atmosphere of pressure is "
    },
    "gas constant": {
        "value": "8.3144598 joules per mole kelvin",
        "prefix": "The Gas Constant, R, is "
    },
    "molar planck constant": {
        "value": "3.990312 joule seconds per mole",
        "prefix": "The Molar Planck Constant is "
    },
    "molar volume of ideal gas": {
        "value": "222.413962 * 10^-3 meters cubed per mole",
        "prefix": "The Molar Volume of Ideal Gas at 0 degrees celsius and 1 atmosphere of pressure is "
    },
    "sackur-tetrode constant": {
        "value": "-1.1648714",
        "prefix": "The Sackur-Tetrode constant at 0 degrees celsius and 1 atmosphere of pressure is "
    },
    "second radiation constant": {
        "value": "1.438777 * 10^-2 meter kelvins",
        "prefix": "The second radiation constant is "
    },
    "stefan boltzmann constant": {
        "value": "5.670367 * 10^-8 watts per meter squared kelvin to the power of four",
        "prefix": "The Stefan-Boltzmann constant is "
    },
    "wien frequency displacement law constant ": {
        "value": "5.8789238 * 10^10 hertz per kelvin",
        "prefix": "The Wien Frequency Displacement Law Constant is "
    },
    "wien wavelength displacement law constant": {
        "value": "2.8977729 * 10^-3 meter kelvins",
        "prefix": "The Wien Wavelength Displacement Law Constant is "
    },
    // Other
    "gravity": {
        "value": "9.81 meters per second squared",
        "prefix": "Standard gravity is "
    },
    "alpha particle mass": {
        "value": "6.644657 * 10^-27 kilograms",
        "prefix": "Alpha Particle Mass is "
    },
    "bohr radius": {
        "value": "0.529177 * 10^-10 meters",
        "prefix": "The Bohr Radius is "
    },
    "classical electron radius": {
        "value": "2.817940 * 10^-15 meters",
        "prefix": "The Classical Electron Radius is "
    },
    "compton wavelength": {
        "value": "2.426310 * 10^-12 meters",
        "prefix": "The Compton Wavelength is "
    },
    "deuteron mass": {
        "value": "3.343583 * 10^-27 kilograms",
        "prefix": "Deuteron mass is "
    },
    "electron mass": {
        "value": "9.109383 * 10^-31 kilograms",
        "prefix": "Electron mass is "
    },
    "fermi coupling constant": {
        "value": "1.1663787 * 10-5 inverse gigaelectronvolts squared",
        "prefix": "The Fermi Coupling Constant is "
    },
    "fine structure constant": {
        "value": "7.2973526 * 10^-3",
        "prefix": "The Fine-structure constant is "
    },
    "hartree energy": {
        "value": "4.359744 * 10^18 joules",
        "prefix": "Hartree Energy is "
    },
    "helion mass": {
        "value": "5.006412 * 10^-27 kilograms",
        "prefix": "Helion Mass is "
    },
    "muon mass": {
        "value": "1.883531 * 10^-28 kilograms",
        "prefix": "Muon mass is "
    },
    "proton mass": {
        "value": "1.672621 * 10^-27 kilograms",
        "prefix": "Proton mass is "
    },
    "neutron mass": {
        "value": "1.674927 * 10^-27 kilograms",
        "prefix": "Neutron mass is "
    },
    "rydberg constant": {
        "value": "10973731.568508 inverse meters",
        "prefix": "The Rydberg Constant is "
    },
    "tau mass": {
        "value": "3.16747 * 10^-27 kilograms",
        "prefix": "Tau mass is "   
    },
    "triton mass": {
        "value": "5.007357 * 10^-27 kilograms",
        "prefix": "Trion mass is "
    }
};

//=========================================================================================================================================
//Editing anything below this line might break your skill.  
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;         
        this.emit(':ask', speechOutput, reprompt);
    },
    'GetConstant': function () {
        var constant = this.event.request.intent.slots.Constant.value.toLowerCase();
        if (!data[constant]) this.emit(':ask', "Sorry, I can't find " + constant + ". Please try it again.", HELP_REPROMPT);
        
        var speechOutput = data[constant].prefix + data[constant].value;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, constant);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    }
};