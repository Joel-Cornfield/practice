/* iterative fibonacci */
function fibs(n) {
    if(n <= 0) return 0;
    if (n===1) return 1;
    let sequence = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i-1] + sequence[i-2]);
    }
    return sequence;
}

/* recursive fibonacci */
function fibsRec(n, sequence = [0, 1]) {
    if (n <= 0) return 0;
    if (n===1) return 1;
    if (sequence.length >= n) return sequence.slice(0, n);
    sequence.push(sequence.at(-1) + sequence.at(-2));
    return fibsRec(n, sequence);
}

/* merge sort */
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const lhs = mergeSort(arr.slice(0, mid));
    const rhs = mergeSort(arr.slice(mid));
    return merge(lhs, rhs);
}

function merge(left, right) {
    let sortedArray = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sortedArray.push(left.shift());
        } else {
            sortedArray.push(right.shift());
        }
    }
    return [...sortedArray, ...left, ...right];
}

console.log(fibs(8));
console.log(fibsRec(8));
console.log(mergeSort([1,4,2,8,9,10,3]));