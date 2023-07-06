function fib(n){
    ans = [0,1]
    for (var i = 2;i<n;i++)
    {
        ans[i] = ans[i-1] + ans[i-2];
    }
    return ans;
}
// ans = fib(100);
// ans.forEach((ele) => {
//     console.log(ele)
// })


const isEven = (n)=>{
    return (n&1)== 0
}
// console.log(isEven(20))


const factorial = (n) =>{
    if(n==0)
        return 1;
    return ans = n*factorial(n-1)
}
console.log(factorial(6))


// make a text thats changes color dynamically to random colors every 2 second 

element = document.getElementById('text')
setInterval(
  () =>{
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    element.style.color = "#" + randomColor;
  }  
, 2000);


// Create a javascript that auto creates boxes of random or different colors every 2 seconds.Change the color of the earlier boxes when a new box is created.

boxes_div = document.getElementById('box')
num = 0;
setInterval(
    () =>{
        num++;
      const randomColor = Math.floor(Math.random()*16777215).toString(16);
      boxes_div.innerHTML += `<div class='box_created' style="width: 50px;height: 50px; background-color: ${'#'+randomColor};margin:10px"></div>`
      boxes_ele = document.getElementsByClassName('box_created')  
      changeColor(boxes_ele)
    }  
  , 2000);


  console.log(boxes_ele)


