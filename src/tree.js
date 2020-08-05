/**
 * @template T,N
 * @typedef Tree
 * @prop {() => N} root - Return the left node of `n`.
 * @prop {(n: N) => N} left - Return the left node of `n`.
 * @prop {(n: N) => N} right - Return the right node of `n`.
 * @prop {(n: N, v: T) => N} next
 *  - Return the next node to go from `n` for value `v` when doing a search.
 * @prop {(n: N) => T} get - Get the data stored on node `n`.
 * @prop {(n: N) => boolean} empty - True if `n` is an empty node.
 */

/**
 * @template T,N
 * @function
 * @param {Tree<T,N>} tree
 * @param {N} node
 * @param {(v: T) => void} predicate
 */
const eachRecurse = (tree, node, predicate) => {
    const l = tree.left(node);
    const r = tree.right(node);
    if (!tree.empty(l)) eachRecurse(tree, l, predicate);
    predicate(tree.get(node));
    if (!tree.empty(r)) eachRecurse(tree, r, predicate);
};

/**
 * @template T,N
 * @function
 * @param {Tree<T,N>} tree - The tree to traverse.
 * @param {(v: T) => void} predicate - Predicate to execute.
 */
module.exports.forEach = (tree, predicate) =>
    eachRecurse(tree, tree.root(), predicate);

/**
 * @template T,N
 * @function
 * @param {Tree<T,N>} tree - The tree to traverse.
 * @param {(v: T) => boolean} predicate - Predicate to match.
 */
module.exports.findNode = (tree, predicate) => {
    if (tree.empty(tree.root())) return null;

    const stack = [tree.root()];
    while (stack.length > 0) {
        const current = stack.pop();
        if (predicate(tree.get(current))) return current;
        const left = tree.left(current);
        const right = tree.right(current);
        if (!tree.empty(left)) stack.push(left);
        if (!tree.empty(right)) stack.push(right);
    }

    return null;
};

/**
 * @template T,N
 * @function
 * @param {Tree<T,N>} tree - The tree to traverse.
 * @param {T} value - Value to find.
 */
module.exports.nodeOf = (tree, value) => {
    let current = tree.root();
    while (!tree.empty(current)) {
        const next = tree.next(current, value);
        if (next) current = next;
        else return current;
    }
    return null;
};

/**
 * @template T,N
 * @function
 * @param {Tree<T,N>} tree - The tree to traverse.
 * @param {T} value - Value to find.
 */
module.exports.contains = (tree, value) => this.nodeOf(tree, value) !== null;

/**
 * @template T,N
 * @function
 * @param {Tree<T,N>} tree - The tree to traverse.
 * @param {(v: T) => boolean} predicate - Predicate to match.
 */
module.exports.every = (tree, predicate) =>
    this.findNode(tree, (value) => !predicate(value)) === null;

/**
 * @template T,N
 * @function
 * @param {Tree<T,N>} tree - The tree to traverse.
 * @param {(v: T) => boolean} predicate - Predicate to match.
 */
module.exports.some = (tree, predicate) =>
    this.findNode(tree, predicate) !== null;
