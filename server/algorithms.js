///////////////// TENSORFLOW FUNCTION (Mean Absoulute Error) /////////////////////////

// Importing the tensorflow library
//import * as tf from "@tensorflow/tfjs"

const tf = require('@tensorflow/tfjs')

/*
const c = [0,1,4,9];
const d = [0.1,0.9,3.5,10];

// Defining the value of the tensors
const True = tf.tensor(c);
const Prediction = tf.tensor(d);
  
// Calculating mean absolute error
const error_t = tf.metrics.meanAbsoluteError(True, Prediction);
  
// Printing the tensor
console.log("Mean Absolute Error:")
error_t.print();
*/

///////////////// CALCULATION (Mean Absolute Error) /////////////////////////

const calculateMeanAbsoluteError = (y, x) => {
    if (y.length === 0 || y.length !== x.length) {
      	return NaN;
    }
    let sum = 0;
    for (let i = 0; i < y.length; ++i) {
        sum += Math.abs(y[i] - x[i]);
    }
    return sum / y.length;
};


// Usage example:

const y = [0,   1,   4,    9]; // actual values
const x = [0.1, 0.9, 3.5, 10]; // predicted values

const error_c = calculateMeanAbsoluteError(y, x); // MAE

console.log("Mean Absolute Error: ")
console.log('Calculation: ', error_c, '\n');  // 0.425


///////////////// TENSORFLOW FUNCTION (Mean Squared Error) /////////////////////////

/*
// Defining label tensor
const y_true = tf.tensor2d([
	y
]);

// Defining prediction tensor
const y_pred = tf.tensor2d([
	x
]);

// Calculating mean squared error
const mse = tf.losses.meanSquaredError(y_true,y_pred)

// Printing the output
console.log("Mean Squared Error:")
mse.print()
*/

///////////////// NPM FUNCTION (Mean Squared Error) /////////////////////////

/*
//import MSE from 'mse';
const MSE = require('mse')
var data_1 = y;
var data_2 = x;

var result = MSE(data_1, data_2); // results in a calcuation of 5.3125
if (result != 0) {
    console.log('NPM: ' + result);
}
*/

///////////////// CALCULATION (Mean Squared Error) /////////////////////////

function mse_c(a, b) {
	let error = 0
	for (let i = 0; i < a.length; i++) {
		error += Math.pow((a[i] - b[i]), 2)
	}
	return error / a.length
}

const a = [0,   1,   4,    9]
const b = [0.1, 0.9, 3.5, 10]

console.log("Mean Squared Error:")
console.log('Calculation: ', mse_c(a, b), '\n')

///////////////// NPM FUNCTION (Root Mean Absoulute Error) /////////////////////////

/*
//import RMSE from 'rmse';
const RMSE = require('rmse');
 var dataset = [{
      actual: 0,
      predicted: 0.1
    }, {
      actual: 1,
      predicted: 0.9
    }, {
      actual: 4,
      predicted: 3.5
    }, {
        actual: 9,
        predicted: 10
    }];
    
    console.log("Root Mean Squared Error:")
    console.log('NPM: ', RMSE.rmse(dataset))
*/

///////////////// CALCULATION (Root Mean Squared Error) /////////////////////////

function rmse_c() {
    aa = arguments[0];
    bb = arguments[1];
	let error = 0
	for (let i = 0; i < aa.length; i++) {
		error += Math.sqrt(mse_c(aa, bb))
	}

	return error / aa.length
}

console.log("Root Mean Squared Error:")
console.log('Calculation: ', rmse_c(y, x), '\n')


///////////////// CALCULATION (R Square) /////////////////////////

function rsq(a, b) {
    let regressionSquaredError = 0
    let totalSquaredError = 0

    let mean = a.reduce((x, y) => x + y) / a.length

    for (let i = 0; i < a.length; i++) {
        regressionSquaredError += Math.pow((a[i] - b[i]), 2)
        totalSquaredError += Math.pow((a[i] - mean), 2)
    }

    return 1 - (regressionSquaredError / totalSquaredError)
}

console.log("R Square:")
console.log('Calculation: ', rsq(a, b), '\n')


///////////////// NPM (F-Score) /////////////////////////

//import fscore from 'fscore';
const fscore = require('fscore');

console.log('F-Score: ')
console.log('NPM: ', fscore(a, b), '\n');


///////////////// TENSORFLOW (Recall) /////////////////////////

function recallTest(a, b){
    // Creating 2-D tensor of true values
    const yTrue = tf.tensor2d([
        a
    ]);

    // Creating 2-D tensor of predicted values
    const yPred = tf.tensor2d([
        b
    ]);

    console.log('Recall: ')
    var string = JSON.stringify(fscore(a, b, { beta : 1, format : 'detailed'}));
    string = string.replace(/.*(?=recall)/g, "");
    string = string.replace("recall", "");
    string = string.replace("\"", "");
    string = string.replace(":", "");
    string = string.replace("}", "");
    console.log(parseFloat(string));

    // Getting the result from the recall function
    return parseFloat(string);
}

console.log('Recall: ')
console.log(recallTest(a, b));

module.exports = {calculateMeanAbsoluteError, mse_c, rmse_c, rsq, fscore, recallTest}
