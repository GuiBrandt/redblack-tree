const StandardTreeStructure = require('../src/structure/standard');
const EytzingerTreeStructure = require('../src/structure/eytzinger');

let testBinaryTreeStructure = (name, type) => {
    describe(`${name} binary tree structure`, () => {
        describe('Getting the root node', () => {
            describe('On an empty tree', () => {
                const t = type();

                it('Returns an empty node', () => {
                    expect(t.empty(t.root())).toBeTrue();
                });
            });

            describe('On a tree with a single element', () => {
                const value = 123;

                const t = type();
                t.set(t.root(), value);

                it('Returns a node with such value', () => {
                    expect(t.get(t.root())).toBe(value);
                });

                it('Returns a node with empty children', () => {
                    expect(t.empty(t.left(t.root()))).toBeTrue();
                    expect(t.parent(t.left(t.root()))).toBe(t.root());

                    expect(t.empty(t.right(t.root()))).toBeTrue();
                    expect(t.parent(t.left(t.root()))).toBe(t.root());
                });
            });

            describe('On a tree with more elements', () => {
                const value = 123;
                const t = type();
                t.set(t.root(), value);
                t.set(t.left(t.root()), value - 1);
                t.set(t.right(t.root()), value + 1);

                it('Returns a node with such value', () => {
                    expect(t.get(t.root())).toBe(value);
                });

                it('Returns a node with children', () => {
                    expect(t.empty(t.left(t.root()))).toBeFalse();
                    expect(t.parent(t.left(t.root()))).toBe(t.root());

                    expect(t.empty(t.right(t.root()))).toBeFalse();
                    expect(t.parent(t.left(t.root()))).toBe(t.root());
                });
            });
        });

        describe('Rotating a tree node', () => {
            describe('When it is empty', () => {
                const t = type();

                describe('Left', () => {
                    it('Keeps the tree empty', () => {
                        t.rotateLeft(t.root());

                        expect(t.empty(t.root())).toBeTrue();
                    });
                });

                describe('Right', () => {
                    it('Keeps the tree empty', () => {
                        t.rotateRight(t.root());

                        expect(t.empty(t.root())).toBeTrue();
                    });
                });
            });

            describe('When it has a single element', () => {
                const value = 123;

                const t = type();
                t.set(t.root(), value);
                t.rotateLeft(t.root());

                describe('Left', () => {
                    it('Keeps the single element as the root with empty children', () => {
                        expect(t.get(t.root())).toBe(value);

                        expect(t.empty(t.left(t.root()))).toBeTrue();
                        expect(t.parent(t.left(t.root()))).toBe(t.root());

                        expect(t.empty(t.right(t.root()))).toBeTrue();
                        expect(t.parent(t.right(t.root()))).toBe(t.root());
                    });
                });

                describe('Right', () => {
                    it('Keeps the single element as the root with empty children', () => {
                        expect(t.get(t.root())).toBe(value);
                        
                        expect(t.empty(t.left(t.root()))).toBeTrue();
                        expect(t.parent(t.left(t.root()))).toBe(t.root());

                        expect(t.empty(t.right(t.root()))).toBeTrue();
                        expect(t.parent(t.right(t.root()))).toBe(t.root());
                    });
                });
            });

            describe('When it has two elements', () => {
                describe('Left', () => {
                    describe('When root has a right child', () => {
                        const value = 123;
                
                        const t = type();
                        t.set(t.root(), value);
                        t.set(t.right(t.root()), value + 1);

                        t.rotateLeft(t.root());

                        const root = t.root();
                        const oldRoot = t.left(t.root());

                        it('Makes right child the root and the old root its left child', () => {
                            expect(t.get(root)).toBe(value + 1);

                            expect(t.left(root)).toBe(oldRoot);
                            expect(t.parent(oldRoot)).toBe(root);
                        });

                        it('Keeps root without parent and right child', () => {
                            expect(t.empty(t.parent(root))).toBeTrue();
                            expect(t.empty(t.right(root))).toBeTrue();
                        });

                        it('Makes the old root a leaf', () => {
                            expect(t.empty(t.left(oldRoot))).toBeTrue();
                            expect(t.empty(t.right(oldRoot))).toBeTrue();
                        });
                    });

                    describe('When root has a left child', () => {
                        const value = 123;
                
                        const t = type();
                        t.set(t.root(), value);
                        t.set(t.left(t.root()), value - 1);

                        t.rotateLeft(t.root());

                        const root = t.root();
                        const leftChild = t.left(root);

                        it('Does nothing', () => {
                            expect(t.get(root)).toBe(value);
                            expect(t.empty(t.parent(root))).toBeTrue();
                            expect(t.empty(t.right(root))).toBeTrue();

                            expect(t.get(leftChild)).toBe(value - 1);
                            expect(t.parent(leftChild)).toBe(root);
                            expect(t.empty(t.right(leftChild))).toBeTrue();
                            expect(t.empty(t.left(leftChild))).toBeTrue();
                        });
                    });
                });

                describe('Right', () => {

                    describe('When root has a left child', () => {
                        const value = 123;
                
                        const t = type();
                        t.set(t.root(), value);
                        t.set(t.left(t.root()), value - 1);

                        t.rotateRight(t.root());

                        const root = t.root();
                        const oldRoot = t.left(t.root());

                        it('Makes left child the root and the old root its right child', () => {
                            expect(t.get(root)).toBe(value - 1);

                            expect(t.left(root)).toBe(oldRoot);
                            expect(t.parent(oldRoot)).toBe(root);
                        });

                        it('Keeps root without parent and left child', () => {
                            expect(t.empty(t.parent(root))).toBeTrue();
                            expect(t.empty(t.left(root))).toBeTrue();
                        });

                        it('Makes the old root a leaf', () => {
                            expect(t.empty(t.left(oldRoot))).toBeTrue();
                            expect(t.empty(t.right(oldRoot))).toBeTrue();
                        });
                    });

                    describe('When root has a right child', () => {
                        const value = 123;
                
                        const t = type();
                        t.set(t.root(), value);
                        t.set(t.right(t.root()), value + 1);

                        t.rotateRight(t.root());

                        const root = t.root();
                        const rightChild = t.right(root);

                        it('Does nothing', () => {
                            expect(t.get(root)).toBe(value);
                            expect(t.empty(t.parent(root))).toBeTrue();
                            expect(t.empty(t.left(root))).toBeTrue();

                            expect(t.get(rightChild)).toBe(value + 1);
                            expect(t.parent(rightChild)).toBe(root);
                            expect(t.empty(t.right(rightChild))).toBeTrue();
                            expect(t.empty(t.left(rightChild))).toBeTrue();
                        });
                    });
                });
            });

            describe('When it has five or more elements', () => {
                describe('Left', () => {
                    const t = type();

                    const parent = t.root();
                    t.set(parent, 'R');

                    let node = t.left(t.root());
                    t.set(node, 'P');
                    t.set(t.left(node), 'A');
                    t.set(t.right(node), 'Q');
                    t.set(t.left(t.right(node)), 'B');
                    t.set(t.right(t.right(node)), 'C');

                    t.rotateLeft(node);

                    node = t.left(t.root());

                    it('Swaps the right child with the node', () => {
                        expect(t.get(node)).toBe('Q');
                        expect(t.parent(node)).toBe(parent);
                    });

                    it('Makes the node the left child of the old right child', () => {
                        expect(t.get(t.left(node))).toBe('P');
                        expect(t.parent(t.left(node))).toBe(node);
                    });

                    it('Preserves the left child', () => {
                        const oldNode = t.left(node);
                        expect(t.get(t.left(oldNode))).toBe('A');
                        expect(t.parent(t.left(oldNode))).toBe(oldNode);
                    });

                    it('Preserves the right child of the right child', () => {
                        expect(t.get(t.right(node))).toBe('C');
                        expect(t.parent(t.right(node))).toBe(node);
                    });

                    it('Makes the right child of the node the left child of the old right node', () => {
                        const oldNode = t.left(node);
                        expect(t.get(t.right(oldNode))).toBe('B');
                        expect(t.parent(t.right(oldNode))).toBe(oldNode);
                    });
                });

                describe('Right', () => {
                    const t = type();

                    const parent = t.root();
                    t.set(parent, 'R');

                    let node = t.right(t.root());
                    t.set(node, 'Q');
                    t.set(t.right(node), 'C');
                    t.set(t.left(node), 'P');
                    t.set(t.left(t.left(node)), 'A');
                    t.set(t.right(t.left(node)), 'B');

                    t.rotateRight(node);
                    node = t.right(parent);

                    it('Swaps the left child with the node', () => {
                        expect(t.get(node)).toBe('P');
                        expect(t.parent(node)).toBe(parent);
                    });

                    it('Makes the node the right child of the old left child', () => {
                        expect(t.get(t.right(node))).toBe('Q');
                        expect(t.parent(t.right(node))).toBe(node);
                    });

                    it('Preserves the right child', () => {
                        const oldNode = t.right(node);
                        expect(t.get(t.right(oldNode))).toBe('C');
                        expect(t.parent(t.right(oldNode))).toBe(oldNode);
                    });

                    it('Preserves the left child of the left child', () => {
                        expect(t.get(t.left(node))).toBe('A');
                        expect(t.parent(t.left(node))).toBe(node);
                    });

                    it('Makes the left child of the node the right child of the old left node', () => {
                        const oldNode = t.right(node);
                        expect(t.get(t.left(oldNode))).toBe('B');
                        expect(t.parent(t.left(oldNode))).toBe(oldNode);
                    });
                });
            });
        });

        describe('Removing the minimum element from a subtree', () => {
            describe('When the tree is empty', () => {
                const t = type();

                it('Returns null', () => {
                    expect(t.popMin(t.root())).toBeNull();
                });
            });

            describe('When the root is the minimum element', () => {
                const value = 123;

                const t = type();
                t.set(t.root(), value);

                const min = t.popMin(t.root());

                it('Returns the root value', () => {
                    expect(min).toBe(value);
                });

                it('Makes the tree empty', () => {
                    expect(t.empty(t.root())).toBeTrue();
                });
            });

            describe('When the minimum element has a right child', () => {
                const value = 123;

                const t = type();
                const parent = t.set(t.root(), value + 3);

                let left = t.set(t.left(parent), value);
                t.set(t.right(left), value + 1);
                t.set(t.right(t.right(left)), value + 2);

                const min = t.popMin(parent);

                left = t.left(parent);

                it('Returns the minimum value', () => {
                    expect(min).toBe(value);
                });

                it('Swaps the minimum node with its right child', () => {
                    expect(t.get(left)).toBe(value + 1);
                    expect(t.parent(left)).toBe(parent);

                    expect(t.get(t.right(left))).toBe(value + 2);
                    expect(t.parent(t.right(left))).toBe(left);
                });
            });

            describe('When the minimum element is a leaf', () => {
                const value = 123;

                const t = type();
                const parent = t.set(t.root(), value + 1);

                let left = t.set(t.left(parent), value);

                const min = t.popMin(parent);

                left = t.left(parent);
                
                it('Returns the minimum value', () => {
                    expect(min).toBe(value);
                });

                it('Drops the minimum node', () => {
                    expect(t.empty(left)).toBeTrue();
                });
            });
        });

        describe('Removing the maximum element from a subtree', () => {
            describe('When the tree is empty', () => {
                const t = type();
                
                it('Returns null', () => {
                    expect(t.popMax(t.root())).toBeNull();
                });
            });

            describe('When the root is the maximum element', () => {
                const value = 123;

                const t = type();
                t.set(t.root(), value);

                const max = t.popMax(t.root());

                it('Returns the root value', () => {
                    expect(max).toBe(value);
                });

                it('Makes the tree empty', () => {
                    expect(t.empty(t.root())).toBeTrue();
                });
            });

            describe('When the maximum element has a left child', () => {
                const value = 123;

                const t = type();
                const parent = t.set(t.root(), value - 3);

                let right = t.set(t.right(parent), value);
                t.set(t.left(right), value - 1);
                t.set(t.left(t.left(right)), value - 2);

                const max = t.popMax(parent);

                right = t.right(parent);

                it('Returns the maximum value', () => {
                    expect(max).toBe(value);
                });

                it('Swaps the maximum node with its right child', () => {
                    expect(t.get(right)).toBe(value - 1);
                    expect(t.parent(right)).toBe(parent);

                    expect(t.get(t.left(right))).toBe(value - 2);
                    expect(t.parent(t.left(right))).toBe(right);
                });
            });

            describe('When the maximum element is a leaf', () => {
                const value = 123;

                const t = type();
                const parent = t.set(t.root(), value - 1);

                let right = t.set(t.right(parent), value);

                const max = t.popMax(parent);

                right = t.right(parent);
                
                it('Returns the maximum value', () => {
                    expect(max).toBe(value);
                });

                it('Drops the maximum node', () => {
                    expect(t.empty(right)).toBeTrue();
                });
            });
        });
    });
};

testBinaryTreeStructure('Standard', StandardTreeStructure);
testBinaryTreeStructure('Eytzinger', EytzingerTreeStructure);
