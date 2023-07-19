// Create the following function 

const add = (number1 , number2  ) => {
    return parseFloat(number1)+parseFloat(number2);
}

const multiply = (num1 , num2)=>{
    return parseFloat(num1)*parseFloat(num2);
}

const substract = (num1 , num2 ) =>{
    return parseFloat(num1) - parseFloat(num2);
}

const calculator = (num1 , num2 , operator) => {return operator(parseFloat(num1),parseFloat(num2))};


console.log(calculator(2.5 , 6 , substract))