const { createRedBlack } = require('../src/redblack-tree');

const TreeStructure = require('../src/structure/standard');

describe('Red Black Tree', () => {
    const less = (x, y) => x < y;

    describe('Adding an element', () => {
        describe('When the tree is empty', () => {
            const value = 123;
            const t = createRedBlack(less, TreeStructure());

            t.add(value);

            it('Makes the inserted element the root', () => {
                expect(t.get(t.root())).toBe(value);
            });
        });
    });
});
