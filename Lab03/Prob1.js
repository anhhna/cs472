"use strict"

// a
function computeSumOfSquares(arr) {
    return arr.reduce((acc, item) => acc + item * item, 0)
}

const computeSumOfSquaresExp = function(arr) {
    return arr.reduce((acc, item) => acc + item * item, 0)
}

const computeSumOfSquaresArrow = (arr) => {
    return arr.reduce((acc, item) => acc + item * item, 0)
}

console.log(computeSumOfSquares([1, 2, 3]))
console.log(computeSumOfSquaresExp([1, 2, 3]))
console.log(computeSumOfSquaresArrow([1, 2, 3]))


// b
function printOddNumbersOnly(arr) {
    return arr.filter(x => x % 2 !== 0)
}

const printOddNumbersOnlyExp = function(arr) {
    return arr.filter(x => x % 2 !== 0)
}

const printOddNumbersOnlyArrow = (arr) => {
    return arr.filter(x => x % 2 !== 0)
}

console.log(printOddNumbersOnly([1, 2, 3, 4, 5, 6, 7, 8]))
console.log(printOddNumbersOnlyExp([1, 2, 3, 4, 5, 6, 7, 8]))
console.log(printOddNumbersOnlyArrow([1, 2, 3, 4, 5, 6, 7, 8]))

// c
function printFibo(n, a = 0, b = 1) {
    if (n <= 0) {
        return
    }
    else if (n === 1) {
        console.log(a)
        return
    }
    else if (n === 2) {
        console.log(`${a}, ${b}`)
        return
    }
    
    let fiboSeq = [a, b]
    for (let i = 2; i < n; i++) {
        const nextNum = fiboSeq[i - 1] + fiboSeq[i - 2]
        fiboSeq.push(nextNum)
    }

    console.log(fiboSeq.join(", "))
}

printFibo(1)
printFibo(2)
printFibo(3)
printFibo(6)
printFibo(10)