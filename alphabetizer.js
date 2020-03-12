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
function ret(str){
    $('#name').html('Results: ');
    
    var t0 = performance.now();
    $('#result_native').html(nativeSort(str));
    var t1 = performance.now();
    $('#time_native').html("Call to do sort [native (Merge Sort)] took " + (t1 - t0) + " milliseconds." + "<br />" + "<br />" + "Note: Javascript's native sort gives capitalized letters a different value than letters uncapitalized and so does not meet the produce requirements.");

    var t0 = performance.now();
    $('#result_bubble').html(bubbleSort(str)); 
    var t1 = performance.now();
    $('#time_bubble').html("Call to do sort [bubble] took " + (t1 - t0) + " milliseconds." + "<br />" + "<br />" + "My Implementation");

    var t0 = performance.now();
    $('#result_pivot').html(pivotSort(str));
    var t1 = performance.now();
    $('#time_pivot').html("Return input string took " + (t1 - t0) + " milliseconds.");
}


//////////////////////////////////////////////////////////////////////////////////////

/*
JS built in sort function
input @string inputStr: input string
output @string: alphabetized string
*/
function nativeSort(inputStr){
    return(inputStr.replace(/[^A-Za-z]+/g, '').split("").sort().join(""));
}

//////////////////////////////////////////////////////////////////////////////////////

/*
Pivot sort
*/
function pivotSort(inputStr){
    return inputStr;
}


/*
Listener events enabled once page loads
*/
window.onload = function () {
    $('#submit').click(function () {
        str = $('#str').val();
        ret(str);
    });

    $('#str').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            str = $('#str').val();
            ret(str);
        }
    });
};