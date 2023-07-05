function fib(n){
    ans = [0,1]
    for (var i = 2;i<n;i++)
    {
        ans[i] = ans[i-1] + ans[i-2];
    }
    return ans;
}

ans = fib(100);

ans.forEach((ele) => {
    console.log(ele)
})