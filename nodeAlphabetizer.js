/*
input @char a: first char to compare
input @char b: second char to compare
output @int: returns if value is >, <, or == to its neighbor
*/
function alphabetical(a, b) {
    var A = a.toLowerCase();
    var B = b.toLowerCase();
    //if char a is less than the char b (probably char to the right of it, return -1 (or lower than))
    //else if char a is greater than char b (return 1 (higher than))
    //else the two chars are the same character so do nothing
    if (A < B) {
        return -1;
    } else if (A > B) {
        return 1;
    } else {
        return 0;
    }
}

/*
JS built in sort function
input @string inputStr: input string
output @string: alphabetized string
*/
function nativeSort(inputStr) {
    return (inputStr.replace(/[^A-Za-z]+/g, '').split("").sort().join(""));
}

/*
Pivot sort implementation using recursion
input @array inputArr: array to sort
output @string: string concatination of gradually more sorted array
*/
function pivotSort(inputArr) {
    if (inputArr.length < 2) {
        return inputArr.join("");
    }

    var pivot = inputArr[0]
    var lesserArray = [];
    var greaterArray = [];

    //loop through entirety of array
    for (var i = 1; i < inputArr.length; i++) {
        //if the character we are on is of a value >= the pivot. push the char to an array of larger values
        if (alphabetical(inputArr[i], pivot) === 1 || alphabetical(inputArr[i], pivot) === 0) {
            greaterArray.push(inputArr[i]);
        }
        //other wise push it to an array of smaller values 
        else {
            lesserArray.push(inputArr[i]);
        }
    }
    //Combines the lesser array + the 0th character + (each time the function runs the new greater array)
    return pivotSort(lesserArray).concat(pivot, pivotSort(greaterArray));
}


/*
Combination of JS built in sort function and pivot sort
input @string inputStr: input string
output @string: alphabetized string
*/
function combinedPivotSort(inputStr) {
    var str = inputStr.slice(2).join("")
    var regex = /^[a-z]+$/;
    //Validate test value against the Regex.
    var isValid = regex.test(str);
    if (!isValid) {
        var splitStr = str.replace(/[^A-Za-z]+/g, '').split("");
        return (pivotSort(splitStr));
    } else {
        return (nativeSort(str));
    }
}

console.log(combinedPivotSort(process.argv));