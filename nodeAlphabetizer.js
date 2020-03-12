/*
input @string inputStr: string to sort
input @int tickRate:
output @string: returns bubble-sorted string
*/
function bubbleSort(inputStr) {
    var splitStr = inputStr.slice(2).join("").replace(/[^A-Za-z]+/g, '').split("");
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

console.log(bubbleSort(process.argv));