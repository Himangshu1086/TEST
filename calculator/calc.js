const add = () =>{
    var num1 = document.getElementById('num1').value
var num2 = document.getElementById('num2').value
    let ans =  parseInt(num1) + parseInt(num2);
    document.getElementById('result').innerHTML = ans
}

const sub = () =>{
    var num1 = document.getElementById('num1').value
var num2 = document.getElementById('num2').value
    let ans =  parseInt(num1) - parseInt(num2);
    document.getElementById('result').innerHTML = ans
}
const mul = () =>{
    var num1 = document.getElementById('num1').value
var num2 = document.getElementById('num2').value
    let ans =  parseInt(num1) * parseInt(num2);
    document.getElementById('result').innerHTML = ans
}

const div = () =>{
    var num1 = document.getElementById('num1').value
var num2 = document.getElementById('num2').value
    let ans =  parseInt(num1) / parseInt(num2);
    if(ans==Infinity)
        alert('Num2 cannot be 0')
    else
        document.getElementById('result').innerHTML = ans
}
