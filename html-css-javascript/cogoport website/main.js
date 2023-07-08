element = document.getElementById("stats_counter");
var number = 0;
var target1 = 180;
var interval1 = setInterval(function() {
    element.innerText = number+'+';
    if (number >= target1) clearInterval(interval1);
    number++;
}, 1);


var number2 = 0;
element1 = document.getElementById("stats_counter2");
var target2 = 10000
var interval2 = setInterval(function() {
    element1.innerText = number2;
    if (number2 >= target2) {
        clearInterval(interval2);
        element1.innerText = '10,000'
    }
    number2+=50;
}, 1);


var number3 = 0;
element2 = document.getElementById("stats_counter3");
var target3 = 30000
var interval3 = setInterval(function() {
    element2.innerText = number3+'+';
    if (number3 >= target3) 
    {
        clearInterval(interval3);
        element2.innerText = '30,000';
    }
    number3+= 100;
}, 1);


var number4 = 0;
element3 = document.getElementById("stats_counter4");
var target4 = 700000
var interval4 = setInterval(function() {
    element3.innerText = number4;
    if (number4 >= target4) {
        clearInterval(interval4);
        element3.innerText = '700,000'
    }
    number4+= 2000;
}, 1);

