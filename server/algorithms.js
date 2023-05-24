///////////////// TENSORFLOW FUNCTION (Mean Absoulute Error) /////////////////////////

// Importing the tensorflow library
import * as tf from "@tensorflow/tfjs"
  
// Defining the value of the tensors
const True = tf.tensor([0,1,4,9]);
const Prediction = tf.tensor([0.1,0.9,3.5,10]);
  
// Calculating mean absolute error
const error_t = tf.metrics.meanAbsoluteError(True, Prediction);
  
// Printing the tensor
console.log("Mean Absolute Error:")
error_t.print();

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

console.log('Calculation: ', error_c, '\n');  // 0.425


///////////////// TENSORFLOW FUNCTION (Mean Absoulute Error) /////////////////////////

// Defining label tensor
const y_true = tf.tensor2d([
	[0,   1,   4,    9]
]);

// Defining prediction tensor
const y_pred = tf.tensor2d([
	[0.1, 0.9, 3.5, 10]
]);

// Calculating mean squared error
const mse = tf.losses.meanSquaredError(y_true,y_pred)

// Printing the output
console.log("Mean Squared Error:")
mse.print()

///////////////// NPM FUNCTION (Mean Absoulute Error) /////////////////////////

import MSE from 'mse';
var data_1 = [
    0,   1,   4,    9
]; 

var data_2 = [
    0.1, 0.9, 3.5, 10
]; 

var result = MSE(data_1, data_2); /* results in a calcuation of 5.3125 */
if (result != 0) {
    console.log('NPM: ' + result);
}

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

console.log('Calculation: ', mse_c(a, b), '\n')


///////////////// NPM FUNCTION (Root Mean Absoulute Error) /////////////////////////

import RMSE from 'rmse';
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

///////////////// CALCULATION (Root Mean Squared Error) /////////////////////////

function rmse_c(a, b) {
	let error = 0
	for (let i = 0; i < a.length; i++) {
		error += Math.sqrt(mse_c(a, b))
	}
	return error / a.length
}

console.log('Calculation: ', rmse_c(a, b), '\n')


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

import fscore from 'fscore';

console.log('F-Score: ')
console.log('NPM: ', fscore(a, b), '\n');


///////////////// TENSORFLOW (Recall) /////////////////////////

// Creating 2-D tensor of true values
const yTrue = tf.tensor2d([
	[0,   1,   4,    9]
]);

// Creating 2-D tensor of predicted values
const yPred = tf.tensor2d([
	[0.1, 0.9, 3.5, 10]
]);

// Getting the result from the recall function
const recallResult = tf.metrics.recall(yTrue, yPred);
console.log('Recall: ')
recallResult.print();
