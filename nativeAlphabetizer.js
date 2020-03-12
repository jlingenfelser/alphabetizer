function nativeSort(inputStr){
    return(inputStr.slice(2).join("").replace(/[^A-Za-z]+/g, '').split("").sort().join(""));
}

console.log(nativeSort(process.argv));