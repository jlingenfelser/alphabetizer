/*
input @string inputStr: string to sort
input @int tickRate:
output @string: returns bubble-sorted string
*/
function bubbleSort(inputStr) {
    var splitStr = inputStr.replace(/[^A-Za-z]+/g, '').split("");
    var length = splitStr.length;
    var correct = 0;

    while (correct < length) {
        for (var i = 1; i < length; i++) {
            var val = alphabetical(splitStr[i - 1], splitStr[i]);
            if (val === 1) {
                arrayMove(splitStr, i - 1, i);
                correct = 0;
            } else {
                correct++;
            }
        }
    }
    return (splitStr.join(""));
}

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
input @array arr: array
input @int oldIndex: old position in array
input @int newIndex: new position in array
output @array arr: array with swapped positions
*/
function arrayMove(arr, oldIndex, newIndex) {
    if (newIndex >= arr.length) {
        var k = newIndex - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
    return arr;
}

/*
Cleans up submit button / enter key functionality
input @string str: string value
input @type str: what sort to perform
output: n/a
*/
function ret(str) {
    $('#name').html('Results: ');

    var t0 = performance.now();
    $('#result_native').html(nativeSort(str));
    var t1 = performance.now();
    $('#time_native').html("Call to do sort [native (Merge Sort)] took " + (t1 - t0) + " milliseconds." + "<br />" + "<br />" + "Note: Javascript's native sort gives capitalized letters a different value than letters uncapitalized and so does not meet the product requirements.");

    var t0 = performance.now();
    $('#result_bubble').html(bubbleSort(str));
    var t1 = performance.now();
    $('#time_bubble').html("Call to do sort [bubble] took " + (t1 - t0) + " milliseconds." + "<br />" + "<br />" + "Initial implementation.");

    var t0 = performance.now();
    $('#result_combined').html(combinedSort(str));
    var t1 = performance.now();
    $('#time_combined').html("Call to do sort [combined + native] took " + (t1 - t0) + " milliseconds.");

    var t0 = performance.now();
    var splitStr = str.replace(/[^A-Za-z]+/g, '').split("");
    $('#result_pivot').html(pivotSort(splitStr));
    var t1 = performance.now();
    $('#time_pivot').html("Call to do sort [pivot] took " + (t1 - t0) + " milliseconds.");

    var t0 = performance.now();
    $('#result_pivot_combined').html(combinedPivotSort(str));
    var t1 = performance.now();
    $('#time_pivot_combined').html("Call to do sort [combined + pivot] took " + (t1 - t0) + " milliseconds.");
}


//////////////////////////////////////////////////////////////////////////////////////

/*
JS built in sort function
input @string inputStr: input string
output @string: alphabetized string
*/
function nativeSort(inputStr) {
    return (inputStr.replace(/[^A-Za-z]+/g, '').split("").sort().join(""));
}

//////////////////////////////////////////////////////////////////////////////////////

/*
Combination of JS built in sort function
input @string inputStr: input string
output @string: alphabetized string
*/
function combinedSort(inputStr) {
    var regex = /^[a-z]+$/;
    //Validate test value against the Regex.
    var isValid = regex.test(inputStr);
    if (!isValid) {
        return (bubbleSort(inputStr));
    } else {
        return (nativeSort(inputStr));
    }

}

//////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////

/*
Combination of JS built in sort function and pivot sort
input @string inputStr: input string
output @string: alphabetized string
*/
function combinedPivotSort(inputStr) {
    var regex = /^[a-z]+$/;
    //Validate test value against the Regex.
    var isValid = regex.test(inputStr);
    if (!isValid) {
        var splitStr = inputStr.replace(/[^A-Za-z]+/g, '').split("");
        return (pivotSort(splitStr));
    } else {
        return (nativeSort(inputStr));
    }
}

//////////////////////////////////////////////////////////////////////////////////////
////// FOR TESTING
//////////////////////////////////////////////////////////////
/*
makes a string of length containing characters from var characters
input @int length: length of string you want
output @string: the returns string of length
*/
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_] [';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/*
populate the sorters
input @int numStrings: the number of test strings you want to apply to data
input @int lenStrings: how long you want the strings to be
output @array: array for each sort type containing the types average length of time it took to run.
*/
function populateSorts(numStrings, lenStrings) {
    var native = [];
    var bubble = [];
    var combinedBubble = [];
    var pivot = [];
    var combinedPivot = [];
    var example = makeid(lenStrings);

    var arrStrings = [];
    for (var j = 0; j < numStrings; j++) {
        arrStrings.push(makeid(lenStrings));
    }
    for (var i = 0; i < arrStrings.length; i++) {
        var t0 = performance.now();
        nativeSort(arrStrings[i]);
        var t1 = performance.now();
        var x = t1 - t0;
        native.push(x);

        var t0 = performance.now();
        bubbleSort(arrStrings[i]);
        var t1 = performance.now();
        var x = t1 - t0;
        bubble.push(x);

        var t0 = performance.now();
        combinedSort(arrStrings[i]);
        var t1 = performance.now();
        var x = t1 - t0;
        combinedBubble.push(x);

        var t0 = performance.now();
        var splitStr = arrStrings[i].replace(/[^A-Za-z]+/g, '').split("");
        pivotSort(splitStr);
        var t1 = performance.now();
        var x = t1 - t0;
        pivot.push(x);

        var t0 = performance.now();
        combinedPivotSort(arrStrings[i]);
        var t1 = performance.now();
        var x = t1 - t0;
        combinedPivot.push(x);
    }


    var all = [];
    all.push(avg(native),
        avg(bubble),
        avg(combinedBubble),
        avg(pivot),
        avg(combinedPivot),
        example,
        combinedPivotSort(example));
    return (all);

}

/*
find the average
input @array arr: array to find avg of
ouput @int: average value of array
*/
function avg(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return (sum / arr.length);
}


//////////////////////////////////////////////////////////////////////////////////////


/*
Listener events enabled once page loads
*/
window.onload = function () {
    $('#submit').click(function () {
        str = $('#str').val();
        ret(str);
    });

    $('#submit_test').click(function () {
        $('#test_name').html("Average time spent by sort technique:")
        //$('#string_header').html("Data points: " + ' ' + "<br />" + "Length of strings within data point: " + ' ' + "<br />");
        var numSample = $('#num_samples').val();
        var length = $('#length').val();
        var info = populateSorts(numSample, length);
        $('#string_info').html("Native Sort: " + info[0] + " milliseconds." + "<br />" + "Bubble Sort: " + info[1] + " milliseconds." + "<br />" + "Combined Bubble Sort: " + info[2] + " milliseconds." + "<br />" + "Pivot Sort: " + info[3] + " milliseconds." + "<br />" + "Combined Pivot Sort: " + info[4] + " milliseconds." + "<br />");
        $('#example_string').html("Example string: " + info[5] + "<br />" + "Sorted:" + info[6]);
    });

    $('#str').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            str = $('#str').val();
            ret(str);
        }
    });
};