//Create variables
let firstNumber='';
let secondNumber='';
let currentOperation=null;
let clearScreen=false;

const numbers=document.querySelectorAll(".number");
const operators=document.querySelectorAll(".operator")
const equals=document.querySelector("#equals");
const del=document.querySelector("#del");
const clear=document.querySelector("#clear");
const point=document.querySelector("#point");
const opperation=document.querySelector(".opperation");
const result=document.querySelector(".result");

//Creating events
window.addEventListener("keydown", keyboardNumber);
equals.addEventListener("click",evaluate);
clear.addEventListener("click", clearFields);
del.addEventListener("click",deleteLast);
point.addEventListener("click",addPoint);

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click",function(){
        append(numbers[i].textContent);
    });
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click",function(){
        operatorSet(operators[i].textContent);
    });
}



//Creating functions
function append(number){
   
    if(result.textContent==="0" || clearScreen ){
        reset();
    }
        result.textContent+=number;

}

function reset(){
    result.textContent='';
    clearScreen=false;

}

function clearFields(){
    result.textContent="0";
    opperation.textContent='';
    firstNumber='';
    secondNumber='';
    currentOperation=null;

}

function addPoint(){
    if (clearScreen) {
        reset();
    }

    if (result.textContent==='') {
        result.textContent='0';
    }

    if (result.textContent.includes('.')) {
        return;
    }

    result.textContent+=".";
}

function deleteLast() {
    result.textContent=result.textContent.toString().slice(0,-1);
}

function operatorSet(operator){
 
    firstNumber=result.textContent;
    opperation.textContent=firstNumber;
    if (currentOperation!==null) {
        evaluate()
    }
    
   
    currentOperation=operator;
    opperation.textContent+=` ${currentOperation}`;
    clearScreen=true;
    
}

function evaluate(){
    if(result===null || clearScreen){
        return;
    }

    if(currentOperation=='÷' && opperation.textContent==="0" ){
        clearFields();
        result.textContent="ERROR";
        return;
    }

    secondNumber=result.textContent;
    result.textContent=roundResult(
        operate(currentOperation,firstNumber,secondNumber)
    );
    opperation.textContent=`${firstNumber} ${currentOperation} ${secondNumber} =`;
    currentOperation=null;
}


function roundResult(number){
    return Math.round(number*1000) /1000;
}

function operate(operator, a, b){
    a=Number(a);
    b=Number(b);

    switch (operator) {
        case "+":
            
            return add(a, b);
            
        case "-":
            
            return substract(a,b);
        case "x":
            return multiply(a,b);
            
       case "÷":
            
            if (b===0) {
                return null;
            }else{
                return devide(a,b);
            };   

    
        default:
            return null;
    }
}


function add(a,b) {
    return a+b;
}

function substract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function devide(a,b) {
    return a/b;
}


function keyboardNumber(e){

    if(e.key >= 0 && e.key<=9){
        append(e.key);
    }else if(e.key==='.'){
        addPoint();

    }else if(e.key==='=' || e.key==='Enter'){

        evaluate();
    }else if(e.key==="Backspace"){
        deleteLast();
    }else if(e.key === "Escape"){
        clearFields();
    }else if(e.key==='+' || e.key==='-' || e.key==='*' || e.key==='/'){
        operatorSet(convert(e.key));
    }
}

function convert(key){
    if (key==='+') {
        return "+";
    } else if(key==='-'){
        return "-";
    }else if(key==='*'){
        return "x";
    }else{
        return "÷";
    }
}