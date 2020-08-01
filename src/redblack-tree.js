/**
 * @file redblack-tree.js
 * @author GuiBrandt
 * 
 * @abstract Red-black tree implementation.
 * @license Zlib
 */

/**
 * @template T
 * @typedef {(a: T, b: T) => boolean} Comparator<T>
 */

/**
 * @template T - Data type stored on the tree.
 * @template N - Tree node data type.
 * 
 * @typedef {Object} TreeStructure - Tree structure type.
 * @prop {() => N} root - The tree root.
 * @prop {(n: N) => N} parent - Returns the parent node of `n`.
 * @prop {(n: N) => N} left - Returns the left child of `n`.
 * @prop {(n: N) => N} right - Returns the right child of `n`.
 * @prop {(n: N) => T} get - Returns the value stored in node `n`.
 * @prop {(n: N, v: T) => N} set - Sets the data for node `n` to `v`.
 * @prop {(n: N) => boolean} empty - Returns true if `n` is empty (Nil).
 * @prop {(n: N) => N} rotateLeft - Performs a left rotation in `n`.
 * @prop {(n: N) => N} rotateRight - Performs a right rotation in `n`.
 * @prop {(n: N) => T} popMin - Pops the minimum element from a subtree.
 * @prop {(n: N) => T} popMax - Pops the maximum element from a subtree.
 */

/** @enum {number} - Red-black tree node colors. */
const Color = {
    Red: 1,
    Black: 0
};

/**
 * @template T
 * @typedef NodeData
 * @prop {T} value - Node data.
 * @prop {Color} color - Node color.
 */

/**
 * @template T,N
 * 
 * @typedef RedBlackTree
 * @prop {() => N} root - Return the root node.
 * @prop {(n: N) => N} parent - Returns the parent node of `n`.
 * @prop {(n: N) => N} left - Returns the left child of `n`.
 * @prop {(n: N) => N} right - Returns the right child of `n`.
 * @prop {(n: N) => boolean} empty - Returns true if `n` is empty (Nil).
 * @prop {(v: T) => N} add - Add a value to the tree and return the new node.
 */

/**
 * @template T,N
 * @function
 * @param {Comparator<T>} less - Comparator.
 * @param {TreeStructure<NodeData<T>,N>} structure - Tree structure object.
 * @return {RedBlackTree<T,N>}
 */
const createRedBlack =
    (less, structure) => {
        const {
            root,
            parent,
            left,
            right,
            get: getData,
            set,
            empty,
            rotateLeft,
            rotateRight
        } = structure;

        /** @constructor */
        const NodeData = (value, color) =>
            ({
                value,
                color
            });


        /**
         * @function
         * @param {N} node 
         */
        const get = (node) => getData(node).value;

        /**
         * @function
         * @param {N} node 
         * @return {Color}
         */
        const getColor = (node) => getData(node).color;

        /**
         * @function
         * @param {N} node
         * @param {Color} color
         */
        const setColor = (node, color) =>
            set(node, NodeData(get(node).value, color));

        /**
         * @function
         * @param {N} node
         */
        const uncle = (node) => {
            const p = parent(node);
            const g = parent(p);
            if (!g) return null;
            else {
                let l = left(g);
                return p === l ? right(g) : l;
            }
        }

        /**
         * @function
         * @param {N} node
         */
        const rebalance = (node) => {
            let p = parent(node);
            if (!p) { // Root
                setColor(node, Color.Black);
                return node;
            }

            if (getColor(p) === Color.Black) return node;

            let g = parent(p);
            let u = uncle(node);
            const uColor = (!empty(u) && getColor(u)) || Color.Black;

            if (uColor === Color.Red) {
                setColor(p, Color.Black);
                setColor(u, Color.Black);
                setColor(g, Color.Red);
                rebalance(g);
            } else {
                if (node === right(p) && p === left(g)) {
                    rotateLeft(p);
                    node = left(node);
                } else if (node === left(p) && p === right(g)) {
                    rotateRight(p);
                    node = right(node);
                }

                if (node === left(p)) {
                    rotateRight(g);
                } else {
                    rotateLeft(g);
                }

                setColor(p, Color.Black);
                setColor(g, Color.Red);
            }

            return node;
        };

        /**
         * @function
         * @param {T} value
         */
        const add = (value) => {
            let current = root();
            while (!empty(current)) {
                if (less(value, get(current))) {
                    current = left(current);
                } else {
                    current = right(current);
                }
            }

            set(current, NodeData(value, Color.Red));
            return rebalance(current);
        };

        /**
         * @function
         * @param {N} node
         */
        const replaceWithChild = (node) => {
            const l = left(node);
            const r = right(node);

            /** @type N */
            let replace;

            if (empty(l)) replace = popMin(r);
            else replace = popMin(l);

            set(node, replace);
        }
        
        /**
         * @function
         * @param {T} value 
         * @return {T}
         */
        const remove = (value) => {
            let current = root();
            while (!empty(current)) {
                const currentValue = get(current);
                if (less(value, currentValue)) {
                    current = left(current);
                } else if (less(currentValue, value)) {
                    current = right(current);
                } else {
                    replaceWithChild(current);
                    return currentValue;
                }
            }
            return null;
        };

        return {
            root,
            parent,
            left,
            right,
            get,
            add,
            remove
        };
    };

module.exports = {
    createRedBlack
};