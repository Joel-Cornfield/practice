function knightMoves(start, end) {
    const queue = [start];
    const moves = [
        [1, 2],
        [2, 1],
        [-1, 2],
        [1, -2],
        [-2, 1],
        [-2, -1],
        [-1, -2],
        [2, -1],
    ];
    const previousMoves = {};
    const visited = new Set();

    while (queue) {
        const current = queue.shift();

        for (const move of moves) {
            const possibleMove = [current[0] + move[0], current[1] + move[1]];
            if (!visited.has(possibleMove.toString())) {
                if (Math.min(...possibleMove) >= 0 && Math.max(...possibleMove) <= 7) {
                    if (!previousMoves[possibleMove]) {
                        previousMoves[possibleMove] = [];
                    }
                    visited.add(possibleMove.toString());
                    previousMoves[possibleMove].push(current);
                    queue.push(possibleMove);
                }
            }
        }

        if (current.toString() === end.toString()) {
            let pathLog = [end];
            let previous = previousMoves[end];
            while (previous !== previousMoves[start]) {
                pathLog = pathLog.concat(previous);
                previous = previousMoves[previous];
            }

            console.log(
                `You made it in ${pathLog.length - 1} moves! Here is your path:`
            );
            return pathLog.reverse();
        }
    }
}

console.log(knightMoves([3,3],[4,3])); /* You made it in 3 moves! Here is your path: [ [ 3, 3 ], [ 4, 5 ], [ 2, 4 ], [ 4, 3 ] ] */