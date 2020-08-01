// Esse aqui é o padrão, e funciona melhor com Red-Black por conta das
// rotações em tempo constante (com Eytzinger é O(n) :S)
const StandardTreeStructure = () => {
    const Node = (data, parent, left, right) =>
        ({
            data,
            parent,
            left,
            right
        });

    const Nil = (parent) => Node(null, parent, null, null);

    let rootNode = Nil(null);

    const root = () => rootNode;
    const parent = node => node.parent;
    
    const child = direction => node => {
        if (!node[direction]) node[direction] = Nil(node);
        return node[direction];
    }
    const left = child('left');
    const right = child('right');
    
    const get = node => node.data.value;
    const set = (node, value) => {
        node.data = {
            value
        };
        return node;
    }

    const empty = node => !node || !node.data;

    const rotation = (from, to) => node => {
        if (empty(node)) return;

        const q = node[from];
        if (!q) return;

        const p = parent(node);

        node[from] = q[to];
        q[to] = node;
        node.parent = q;

        if (node[from]) node[from].parent = node;

        if (p) {
            if (node === left(p)) p.left = q;
            else p.right = q;
        }

        q.parent = p;

        if (rootNode === node) rootNode = q;
    }

    const rotateLeft = rotation('right', 'left');
    const rotateRight = rotation('left', 'right');

    const pop = (direction, other) => {
        const f = (node) => {
            let current = node;
            while (current[direction]) current = current[direction];
            let data = current.data;
            if (current[other]) {
                current.data = { value: f(current[other]) };
            } else {
                current.data = null;
            }
            return data ? data.value : null;
        };
        return f;
    };

    const popMin = pop('left', 'right');
    const popMax = pop('right', 'left');

    return {
        root,
        parent,
        left,
        right,
        get,
        set,
        empty,
        rotateLeft,
        rotateRight,
        popMin,
        popMax
    };
};

module.exports = StandardTreeStructure;
