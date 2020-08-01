/**
 * @template T,N
 * @typedef Tree
 * @prop {(n: N) => N} left - Return the left node of `n`.
 * @prop {(n: N) => N} right - Return the right node of `n`.
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
