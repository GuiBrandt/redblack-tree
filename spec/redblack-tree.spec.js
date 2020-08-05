const RedBlack = require('../src/redblack-tree');
const Tree = require('../src/tree');

const TreeStructure = require('../src/structure/standard');

describe('Red Black Tree', () => {
    const less = (x, y) => x < y;
    const createRedBlack = RedBlack(less, TreeStructure);

    describe('Adding an element', () => {
        describe('When the tree is empty', () => {
            const value = 123;
            const t = createRedBlack();
            t.add(value);

            it('Makes the inserted element the root', () => {
                expect(t.get(t.root())).toBe(value);
                expect(t.empty(t.parent(t.root()))).toBeTrue();
            });

            it('Makes the new root a leaf', () => {
                expect(t.empty(t.left(t.root()))).toBeTrue();
                expect(t.empty(t.right(t.root()))).toBeTrue();
            });
        });

        describe('When the tree has a single element', () => {
            describe('Greater than existing', () => {
                const value = 123;
                const t = createRedBlack();
                t.add(value);
                t.add(value + 1);

                it('Inserts to the right', () => {
                    expect(t.get(t.right(t.root()))).toBe(value + 1);
                    expect(t.empty(t.left(t.root()))).toBeTrue();
                });
                
                it('Makes the existing node the parent of the inserted', () => {
                    expect(t.parent(t.right(t.root()))).toBe(t.root());
                });
            });

            describe('Less than existing', () => {
                const value = 123;
                const t = createRedBlack();
                t.add(value);
                t.add(value - 1);

                it('Inserts to the left', () => {
                    expect(t.get(t.left(t.root()))).toBe(value - 1);
                    expect(t.empty(t.right(t.root()))).toBeTrue();
                });
                
                it('Makes the existing node the parent of the inserted', () => {
                    expect(t.parent(t.left(t.root()))).toBe(t.root());
                });
            });
        });

        describe('When the tree would become unbalanced', () => {
            describe('To the right', () => {
                const value = 123;
                const t = createRedBlack();
                t.add(value - 1);
                t.add(value);
                t.add(value + 1);

                it('Rotates the tree to make it balanced', () => {
                    expect(t.get(t.root())).toBe(value);
                    expect(t.get(t.left(t.root()))).toBe(value - 1);
                    expect(t.get(t.right(t.root()))).toBe(value + 1);
                });
            });

            describe('To the left', () => {
                const value = 123;
                const t = createRedBlack();
                t.add(value + 1);
                t.add(value);
                t.add(value - 1);

                it('Rotates the tree to make it balanced', () => {
                    expect(t.get(t.root())).toBe(value);
                    expect(t.get(t.left(t.root()))).toBe(value - 1);
                    expect(t.get(t.right(t.root()))).toBe(value + 1);
                });
            });
        });
    });

    describe('Removing an element', () => {
        describe('When it does not exist on the tree', () => {
            const t = createRedBlack();
            t.add(2);
            t.add(1);
            t.add(3);
            const value = t.remove(123);

            it('Returns null', () => {
                expect(value).toBeNull();
            });

            it('Does not change the tree', () => {
                expect(Tree.contains(t, 1)).toBeTrue();
                expect(Tree.contains(t, 2)).toBeTrue();
                expect(Tree.contains(t, 3)).toBeTrue();
            });
        });
        
        describe('When it exists on the tree', () => {
            describe('When the children of the node are leaves', () => {
                const t = createRedBlack();
                t.add(2);
                t.add(1);
                t.add(3);
    
                const value = t.remove(2);
                
                it('Returns such element', () => {
                    expect(value).toBe(2);
                });
    
                it('Removes the element from the tree', () => {
                    expect(Tree.contains(t, 2)).toBeFalse();
                });
    
                it('Removes only that element from the tree', () => {
                    expect(Tree.contains(t, 1)).toBeTrue();
                    expect(Tree.contains(t, 3)).toBeTrue();
                });
    
                it('Preserves order', () => {
                    expect(t.get(t.root())).toBe(1);
                    expect(t.get(t.right(t.root()))).toBe(3);
                });
            });
            
            describe('When the children of the node are not leaves', () => {
                const t = createRedBlack();
                t.add(3);
                t.add(1);
                t.add(5);
                t.add(2);
                t.add(4);
                
                const value = t.remove(3);
                
                it('Returns such element', () => {
                    expect(value).toBe(3);
                });
    
                it('Removes the element from the tree', () => {
                    expect(Tree.contains(t, 3)).toBeFalse();
                });
    
                it('Removes only that element from the tree', () => {
                    expect(Tree.contains(t, 1)).toBeTrue();
                    expect(Tree.contains(t, 2)).toBeTrue();
                    expect(Tree.contains(t, 4)).toBeTrue();
                    expect(Tree.contains(t, 5)).toBeTrue();
                });
    
                it('Preserves order by swapping the removed node with the next element', () => {
                    expect(t.get(t.root())).toBe(2);
                    expect(t.get(t.right(t.root()))).toBe(5);
                    expect(t.get(t.left(t.root()))).toBe(1);
                    expect(t.get(t.left(t.right(t.root())))).toBe(4);
                });
            });
        });
    });
});
