/* binary search tree */

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        // Remove duplicates, sort the array, and build a balanced binary search tree
        this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
    }

    buildTree(array) {
        if (array.length === 0) return null;
        
        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));
        
        return root;
    }

    insert(value, node = this.root) {
        if (!node) return new Node(value) 
        if (value <= node.data) {
            node.left = this.insert(value, node.left);
        } else if (value > node.data) {
            node.right = this.insert(value, node.right);
        }
        return node;
    }

    deleteItem(value, node = this.root) {
        if (!node) return null;

        if (value < node.data) {
            node.left = this.deleteItem(value, node.left);
        } else if (value > node.data) {
            node.right = this.deleteItem(value, node.right);        
        } else {
            // Node to be deleted found

            // Case 1: No chil
            if (!node.left && !node.right) return null;

            // Case 2: One child
            if (!node.left) return node.right;
            if (!node.right) return node.left;

            // Case 3: Two children
            const minLargerNode = this.findMin(node.right);
            node.data = minLargerNode.data;
            node.right = this.deleteItem(minLargerNode.data);
        }
        return node;
    }

    /* find the in-order successor (the smallest node in the right subtree) */
    findMin(node) {
        while (node.left) node = node.left;
        return node;
    }

    find(value, node = this.root) {
        if (!node || node.data === value) return node;
        if (value < node.data) return this.find(value, node.left);
        return this.find(value, node.right);
    }

    levelOrder(callback) {
        if (!this.root) return;
        if (!callback) throw new Error("Callback function is required.");

        const queue = [this.root];
        while (queue.length) {
            const current = queue.shift();
            callback(current);
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
    }

    inOrder(callback, node = this.root) {
        if (!callback) throw new Error("Callback function is required.");
        if (!node) return;

        this.inOrder(callback, node.left);
        callback(node);
        this.inOrder(callback, node.right);
    }

    preOrder(callback, node = this.root) {
        if (!callback) throw new Error("Callback function is required.");
        if (!node) return;

        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
    }

    postOrder(callback, node = this.root) {
        if (!callback) throw new Error("Callback function is required.");
        if (!node) return;

        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);
    }

    height(node) {
        if (!node) return -1;
        return 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    depth(node, current = this.root, depthCount = 0) {
        if (!current || !node) return -1;
        if (node.data === current.data) return depthCount;
        if (node.data < current.data) {
            return this.depth(node, current.left, depthCount + 1);
        } else {
            return this.depth(node, current.right, depthCount + 1);
        }
    }

    isBalanced(node = this.root) {
        if (!node) return true;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return (
            Math.abs(leftHeight - rightHeight) <= 1 &&
            this.isBalanced(node.left) &&
            this.isBalanced(node.right)
        );
    }

    rebalance() {
        const nodes = [];
        this.inOrder(node => nodes.push(node.data));
        this.root = this.buildTree(nodes);
    }
}

// Driver script

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const randomArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
const tree = new Tree(randomArray);
prettyPrint(tree.root);
console.log("Is Balanced:", tree.isBalanced());

console.log("Level Order:");
tree.levelOrder(node => console.log(node.data));

console.log("Pre Order:");
tree.preOrder(node => console.log(node.data));

console.log("Post Order:");
tree.postOrder(node => console.log(node.data));

console.log("In Order:");
tree.inOrder(node => console.log(node.data));

// Unbalance the tree by adding values
[150, 200, 300].forEach(value => tree.insert(value));
prettyPrint(tree.root);
console.log("Is Balanced After Insert:", tree.isBalanced());

// Rebalance the tree
tree.rebalance();
prettyPrint(tree.root);
console.log("Is Balanced After Rebalance:", tree.isBalanced());


