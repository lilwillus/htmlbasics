var input1 = document.getElementById("txtInput1");
var input2 = document.getElementById("txtInput2");
var inputOp = document.getElementById("txtOperator");
var operand1;
var operand2;

/**

*Function to give input. 
* @param evt: Will have event information. 
* This will help us findout which button is clicked 
*/
function onClick(evt) {
var char = evt.target.innerText;
//if what user entered is an operator
if (isOperator(char)) {
//if first input exist
if (input1.value) {
//assign input1.value to var operand1
operand1 = input1.value;
//assign inputOp.value to char
inputOp.value = char;
}
}
else {
//if user already entered the first operand
if (operand1) {
//then update then keep adding to the 
//second input with whatever with value user entered
input2.value = input2.value + char;
}
else {
//else update 
input1.value = input1.value + char;
}
}
}

/**
* 
* @param char: To know whether user has clicked on operator buttons such as +,-,* and / 
*/
function isOperator(char) {
if (char === '+' || char == '-' || char == '*' || char == '/') {
return true;
}
else {
return false;
}
}

/** 
* Click event handler for button "C". This resets the calculator
*/
function reset() {
input1.value = "";
input2.value = "";
operand1 = null;
operand2 = null;
inputOp.value = "";
}

/** Event handler for delete key. works like a backspace*/
function del() {
if (!operand1) {
var val = input1.value;
input1.value = removeChar(val);
}
else {
var val = input2.value;
input2.value = removeChar(val);
}
}

//function to handle dot(.) button. Only one decimal is allowed
function onDecimal() {
if (operand1) {
var val = input2.value;
if (val.indexOf('.') > -1) return;
input2.value += ".";
}
else {
var val = input1.value;
if (val.indexOf('.') > -1) return;
input1.value += ".";
}
}

function removeChar(val) {
if (val) {
//if more than one number exists then 
//return everything between 0th and last but one - exclusive
return val.substring(0, val.length - 1);
}
return "";
}

//calculates the result when user clicks on (=) button
function calculate() {
if (operand1 && input2.value) {
var op1 = +operand1;
var op2 = +input2.value;
var op = inputOp.value;

reset();
input1.value = calculateResult(op1, op2, op);
}
}

function calculateResult(op1, op2, operator) {

switch (operator) {

case '+':
return op1 + op2;
case '-':
return op1 - op2;
case '*':
return op1 * op2;
case '/':
if (op2 == 0) {
alert("Can not divide by zero");
return 0;
}
var result = op1 / op2;
if (Number.isInteger(result)) return result;
return result.toFixed(2);

default:
return 0;
}
}